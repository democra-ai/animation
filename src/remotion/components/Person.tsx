import React from "react";
import type { RoleConfig } from "../lib/types";

export const Person: React.FC<{
  role: RoleConfig;
  scale?: number;
  opacity?: number;
}> = ({ role, scale = 1, opacity = 1 }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#F1F5F9",
          border: "2px solid #CBD5E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        {role.emoji}
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: "#64748B",
          textAlign: "center",
        }}
      >
        {role.label}
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          color: "#94A3B8",
          textAlign: "center",
        }}
      >
        {role.desc}
      </div>
    </div>
  );
};
