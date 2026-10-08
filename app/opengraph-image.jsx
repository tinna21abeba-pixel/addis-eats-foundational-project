import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Addis Eats - Authentic Ethiopian Food";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141211",
          color: "white",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#2a221a",
            border: "2px solid #e59e2a",
            color: "#e59e2a",
            fontSize: 36,
            fontWeight: 800,
            marginBottom: 24,
          }}
        >
          AE
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            marginBottom: 16,
            textAlign: "center",
            display: "flex",
          }}
        >
          Addis <span style={{ color: "#e59e2a", marginLeft: 12 }}>Eats</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#d4d4d8",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Authentic Ethiopian Cuisine & Fresh Doorstep Delivery
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e59e2a",
            color: "#181411",
            padding: "12px 28px",
            borderRadius: 9999,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Traditional Flavors
        </div>
      </div>
    ),
    { ...size }
  );
}
