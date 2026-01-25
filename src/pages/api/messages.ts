import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

/** psql 'postgresql://...' 형식이 들어오면 순수 URL만 추출 */
function sanitizeConnectionString(s: string | undefined): string | null {
  if (!s || typeof s !== "string") return null;
  let u = s.trim();
  if (u.startsWith("psql '") && u.endsWith("'")) {
    u = u.slice(6, -1).trim();
  } else if (u.startsWith('psql "') && u.endsWith('"')) {
    u = u.slice(6, -1).trim();
  }
  if (!u.startsWith("postgres://") && !u.startsWith("postgresql://")) return null;
  return u;
}

function getSql() {
  const raw = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  const connectionString = sanitizeConnectionString(raw ?? "");
  if (!connectionString) return null;
  return neon(connectionString);
}

async function ensureTable(sql: ReturnType<typeof neon>) {
  await sql`
    CREATE TABLE IF NOT EXISTS guestbook_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at BIGINT NOT NULL
    )
  `;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sql = getSql();
  if (!sql) {
    return res.status(500).json({
      error: "Database not configured. Vercel에서 DATABASE_URL을 설정했는지, **순수 연결 문자열**(postgresql://...)만 넣었는지 확인해 주세요. psql '...' 형식은 넣지 마세요.",
    });
  }

  try {
    await ensureTable(sql);
  } catch (e) {
    console.error("DB init error:", e);
    const msg = e instanceof Error ? e.message : String(e);
    return res.status(500).json({
      error: `DB 연결/테이블 오류: ${msg}. DATABASE_URL과 Neon 프로젝트를 확인해 주세요.`,
    });
  }

  try {
    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, name, message, created_at AS "timestamp"
        FROM guestbook_messages
        ORDER BY created_at DESC
      `;
      const messages: GuestMessage[] = (Array.isArray(rows) ? rows : []).map(
        (r: { id: string; name: string; message: string; timestamp: number }) => ({
          id: String(r.id),
          name: String(r.name),
          message: String(r.message),
          timestamp: Number(r.timestamp),
        })
      );
      return res.status(200).json(messages);
    }

    if (req.method === "POST") {
      const { name, message } = req.body || {};
      const text = typeof message === "string" ? message.trim() : "";
      if (!text) {
        return res.status(400).json({ error: "message required" });
      }
      const id = String(Date.now());
      const author = typeof name === "string" ? name.trim() || "익명" : "익명";
      const created_at = Date.now();

      await sql`
        INSERT INTO guestbook_messages (id, name, message, created_at)
        VALUES (${id}, ${author}, ${text}, ${created_at})
      `;

      return res.status(201).json({
        id,
        name: author,
        message: text,
        timestamp: created_at,
      });
    }

    if (req.method === "DELETE") {
      const id = typeof req.query.id === "string" ? req.query.id : null;
      if (!id) {
        return res.status(400).json({ error: "id required" });
      }
      await sql`DELETE FROM guestbook_messages WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.error("messages API error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: `요청 처리 실패: ${msg}` });
  }
}
