import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050508",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        U
      </div>
    ),
    { ...size },
  );
}
