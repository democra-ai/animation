import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Mirror: React.FC<{
  glowIntensity?: number;
  modelName?: string;
  modelColor?: string;
}> = ({ glowIntensity = 0, modelName = "LLM", modelColor = "#6366F1" }) => {
  const frame = useCurrentFrame();
  const shimmer = interpolate(frame % 120, [0, 60, 120], [0.15, 0.4, 0.15]);

  return (
    <div
      style={{
        width: 100,
        height: 400,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          borderRadius: 60,
          background: `radial-gradient(ellipse, ${modelColor}${Math.round(glowIntensity * 40).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />
      {/* Mirror frame */}
      <div
        style={{
          width: 80,
          height: 360,
          borderRadius: 40,
          background: `linear-gradient(180deg, ${modelColor}, #2563EB)`,
          padding: 4,
          position: "relative",
          boxShadow: `0 0 ${30 + glowIntensity * 40}px ${modelColor}40`,
        }}
      >
        {/* Mirror glass */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 36,
            background:
              "linear-gradient(180deg, rgba(224,231,255,0.6) 0%, rgba(248,250,255,0.9) 50%, rgba(219,234,254,0.6) 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer line */}
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 20,
              width: 2,
              height: "85%",
              background: `rgba(255,255,255,${shimmer})`,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 10,
              width: 1,
              height: "90%",
              background: `rgba(255,255,255,${shimmer * 0.6})`,
              borderRadius: 1,
            }}
          />
          {/* Label */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
              fontWeight: 800,
              fontSize: 13,
              color: modelColor,
              whiteSpace: "nowrap",
              letterSpacing: 1,
            }}
          >
            {modelName}
          </div>
        </div>
      </div>
    </div>
  );
};
