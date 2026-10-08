import { ImageResponse } from "next/og";
import dishes from "../../data/dishes";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

export default async function Image({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => d.id.toString() === id) || dishes[0];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141211",
          color: "white",
          fontFamily: "sans-serif",
          padding: 60,
          border: "12px solid #221c17",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 800,
              color: "#e59e2a",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {`Addis Eats • ${dish.category}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#e59e2a",
              backgroundColor: "#2a221a",
              padding: "8px 18px",
              borderRadius: 9999,
              fontWeight: 700,
            }}
          >
            {`Rating: ${dish.rating || "4.8"} / 5.0`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {dish.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a1a1aa",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {dish.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #2b2520",
            paddingTop: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 900,
              color: "#e59e2a",
            }}
          >
            {`ETB ${dish.price}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#d4d4d8",
            }}
          >
            Served Fresh with Authentic Injera
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
