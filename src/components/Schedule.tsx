import { Fragment } from "react";
import birthday from "@/assets/data/birthday.json";

const ICONS: Record<string, string> = {
  "🎂": "cake",
  "🐟": "set_meal",
  "🧶": "pets",
  "📸": "photo_camera",
};

function getIcon(activity: string): string {
  const emoji = activity.slice(0, 2);
  return ICONS[emoji] || "celebration";
}

export default function Schedule() {
  const d = new Date(birthday.date);
  const baseHour = d.getHours();
  const baseMin = d.getMinutes();
  const activities = birthday.activities as string[];

  return (
    <section id="event" className="schedule-section">
      <div className="schedule-card">
        <h2 className="schedule-title">
          <span className="icon material-symbols-outlined">schedule</span>
          파티 일정
        </h2>
        <div className="schedule-timeline">
          {activities.map((activity, i) => {
            const mins = baseMin + i * 30;
            const h = baseHour + Math.floor(mins / 60);
            const m = mins % 60;
            const time = `${h}:${String(m).padStart(2, "0")}`;
            const isLast = i === activities.length - 1;
            const icon = getIcon(activity);
            const label = activity.replace(/^[^\s]+\s*/, "");

            return (
              <Fragment key={i}>
                <div className="timeline-item">
                  <div className={`timeline-dot ${isLast ? "last" : ""}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                      {icon}
                    </span>
                  </div>
                  {!isLast && <div className="timeline-line" />}
                </div>
                <div className={`timeline-content ${isLast ? "last" : ""}`}>
                  <div className="timeline-time">
                    {time} – {label}
                  </div>
                  <div className="timeline-desc">{activity}</div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
