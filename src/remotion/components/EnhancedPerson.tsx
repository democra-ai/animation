import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { EnhancedConfig, RoleConfig } from "../lib/types";

export const EnhancedPerson: React.FC<{
  role: RoleConfig;
  enhanced: EnhancedConfig;
  animationDelay?: number;
}> = ({ role, enhanced, animationDelay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    fps,
    frame: frame - animationDelay,
    config: { damping: 15, stiffness: 80 },
    durationInFrames: 30,
  });

  const scale = interpolate(appear, [0, 1], [0.6, 1]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Enhanced avatar with glow */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: role.bgColor,
          border: `3px solid ${role.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          boxShadow: `0 0 20px ${role.color}40`,
          position: "relative",
        }}
      >
        {role.emoji}
        {/* Glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `2px solid ${role.color}30`,
          }}
        />
      </div>

      {/* Enhanced label */}
      <div
        style={{
          fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: role.color,
          textAlign: "center",
        }}
      >
        {enhanced.label}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          color: role.color,
          textAlign: "center",
          maxWidth: 160,
          opacity: 0.8,
        }}
      >
        {enhanced.desc}
      </div>

      {/* Capability bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 140, marginTop: 4 }}>
        {enhanced.capabilities.map((cap, i) => {
          const barProgress = spring({
            fps,
            frame: frame - animationDelay - 10 - i * 5,
            config: { damping: 20, stiffness: 60 },
            durationInFrames: 30,
          });

          return (
            <div key={cap.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9,
                  color: "#64748B",
                  width: 55,
                  textAlign: "right",
                }}
              >
                {cap.name}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  background: "#E2E8F0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${cap.value * barProgress * 100}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(90deg, ${role.color}80, ${role.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
