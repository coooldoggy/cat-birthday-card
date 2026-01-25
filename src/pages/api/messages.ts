import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
const sql = connectionString ? neon(connectionString) : null;

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

async function ensureTable() {
  if (!sql) throw new Error("No database");
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

  if (!sql) {
    return res.status(500).json({
      error: "Database not configured. Set POSTGRES_URL or DATABASE_URL (e.g. Vercel Postgres / Neon).",
    });
  }

  try {
    await ensureTable();
  } catch (e) {
    console.error("DB init error:", e);
    return res.status(500).json({
      error: "Database error. Check POSTGRES_URL / DATABASE_URL.",
    });
  }

  try {
    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, name, message, created_at AS "timestamp"
        FROM guestbook_messages
        ORDER BY created_at DESC
      `;
      const messages: GuestMessage[] = (Array.isArray(rows) ? rows : []).map((r: { id: string; name: string; message: string; timestamp: number }) => ({
        id: String(r.id),
        name: String(r.name),
        message: String(r.message),
        timestamp: Number(r.timestamp),
      }));
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
    return res.status(500).json({ error: "Failed to process request" });
  }
}
