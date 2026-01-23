import { useState, useEffect } from "react";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export default function GuestBook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 로컬 스토리지에서 메시지 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem("birthdayMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to load messages", e);
      }
    }
  }, []);

  // 메시지 저장
  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem("birthdayMessages", JSON.stringify(newMessages));
    setMessages(newMessages);
  };

  // 메시지 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim() || "익명",
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [newMessage, ...messages];
    saveMessages(updatedMessages);
    setName("");
    setMessage("");
    setIsSubmitting(false);
    
    // 저장 완료 피드백
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // 축하 애니메이션
    const confetti = () => {
      for (let i = 0; i < 15; i++) {
        const e = document.createElement("div");
        e.className = "confetti";
        e.innerText = ["🎉", "✨", "💖", "🎈", "🎊", "⭐"][i % 6];
        e.style.left = Math.random() * 100 + "%";
        e.style.top = "-10px";
        e.style.fontSize = (16 + Math.random() * 8) + "px";
        document.body.appendChild(e);
        setTimeout(() => e.remove(), 1200);
      }
    };
    confetti();
  };

  // 메시지 삭제 (더블클릭)
  const handleDelete = (id: string) => {
    if (confirm("메시지를 삭제하시겠어요?")) {
      const updatedMessages = messages.filter((msg) => msg.id !== id);
      saveMessages(updatedMessages);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="fade-in invitation-section" style={{ padding: "1.5rem", textAlign: "center" }}>
      <h2 style={{
        fontSize: "1.3rem",
        marginBottom: "1rem",
        color: "#3d2a1a",
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Comfortaa', sans-serif",
        letterSpacing: "0.05em"
      }}>
        💌 축하 메시지
      </h2>

      {/* 메시지 입력 폼 */}
      <div style={{
        background: "rgba(250, 248, 243, 0.95)",
        padding: "1.5rem",
        borderRadius: "1rem",
        border: "2px solid #1a1a1a",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        marginBottom: "1.5rem"
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="이름 (선택사항)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid #8b4513",
                background: "#faf8f3",
                fontSize: "0.95rem",
                color: "#1a1a1a",
                fontFamily: "'Poppins', sans-serif"
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <textarea
              placeholder="축하 메시지를 남겨주세요 💕"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid #8b4513",
                background: "#faf8f3",
                fontSize: "0.95rem",
                color: "#1a1a1a",
                fontFamily: "'Poppins', sans-serif",
                resize: "vertical",
                minHeight: "100px"
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            style={{
              width: "100%",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              opacity: isSubmitting || !message.trim() ? 0.6 : 1,
              cursor: isSubmitting || !message.trim() ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "전송 중..." : "메시지 남기기 🎉"}
          </button>
        </form>
        {showSuccess && (
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem",
            background: "linear-gradient(135deg, rgba(61, 42, 26, 0.15) 0%, rgba(139, 69, 19, 0.1) 100%)",
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            color: "#1a1a1a",
            fontWeight: "600",
            border: "2px solid #3d2a1a",
            animation: "fadeIn 0.5s ease-out"
          }}>
            ✅ 메시지가 저장되었습니다!
          </div>
        )}
      </div>

      {/* 메시지 목록 */}
      <div style={{
        maxHeight: "500px",
        overflowY: "auto",
        paddingRight: "0.5rem"
      }}>
        {messages.length === 0 ? (
          <div style={{
            padding: "2rem",
            color: "#8b4513",
            fontStyle: "italic",
            fontSize: "0.95rem"
          }}>
            아직 메시지가 없어요. 첫 번째 축하 메시지를 남겨주세요! 💕
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              onDoubleClick={() => handleDelete(msg.id)}
              style={{
                background: "linear-gradient(135deg, rgba(250, 248, 243, 0.95) 0%, rgba(245, 240, 232, 0.9) 100%)",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                marginBottom: "1rem",
                border: "2px solid #1a1a1a",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                textAlign: "left",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)";
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem"
              }}>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  fontFamily: "'Comfortaa', sans-serif"
                }}>
                  {msg.name}
                </div>
                <div style={{
                  fontSize: "0.75rem",
                  color: "#8b4513",
                  opacity: 0.7
                }}>
                  {formatDate(msg.timestamp)}
                </div>
              </div>
              <div style={{
                fontSize: "0.95rem",
                color: "#2c2c2c",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}>
                {msg.message}
              </div>
              <div style={{
                position: "absolute",
                bottom: "5px",
                right: "10px",
                fontSize: "0.7rem",
                color: "#8b4513",
                opacity: 0.5
              }}>
                더블클릭으로 삭제
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

