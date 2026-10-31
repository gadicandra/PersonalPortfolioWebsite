import { ImageResponse } from "next/og";

export const alt = "Garjita Adicandra — AI/ML & Full-Stack Engineer";
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
          background: "#ffffff",
          color: "#0b0b0c",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#52525b",
          }}
        >
          <div style={{ width: "48px", height: "2px", background: "#0b0b0c" }} />
          AI/ML & Full-Stack Engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Garjita Adicandra
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "34px",
              color: "#52525b",
              maxWidth: "900px",
            }}
          >
            Fine-tuning vision-language models and shipping production web apps.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "24px",
            color: "#6b6b74",
          }}
        >
          <span>Information Engineering · UGM</span>
          <span>github.com/gadicandra</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
