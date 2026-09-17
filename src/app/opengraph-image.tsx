import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

export const alt = `${person.name} — Security Operations Consultant`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(900px 600px at 80% 10%, #16343b, #05070a 70%)",
          color: "#f2f7f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#72f3df" }}>
          SECURITY OPERATIONS → AI SECURITY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 140, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>Richesh</div>
          <div style={{ fontSize: 140, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9, color: "#5d6a70" }}>
            Yadav.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8b969d" }}>
          Incident investigation · Phishing response · Endpoint containment · SIEM
        </div>
      </div>
    ),
    size,
  );
}
