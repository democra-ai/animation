"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { MirrorComposition } from "../remotion/MirrorComposition";
import type { LLMModel } from "../remotion/lib/types";

const models: { id: LLMModel; name: string; color: string }[] = [
  { id: "claude", name: "Claude", color: "#D97706" },
  { id: "gpt4", name: "GPT-4", color: "#10A37F" },
  { id: "gemini", name: "Gemini", color: "#4285F4" },
];

const Home: NextPage = () => {
  const [selectedModel, setSelectedModel] = useState<LLMModel>("claude");

  const inputProps = useMemo(
    () => ({ selectedModel }),
    [selectedModel],
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        gap: 32,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "white",
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
            margin: 0,
          }}
        >
          AI Is a Mirror
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#94A3B8",
            marginTop: 8,
            fontFamily: "Inter, sans-serif",
          }}
        >
          See how different LLMs amplify different experts
        </p>
      </div>

      {/* Model Switcher */}
      <div style={{ display: "flex", gap: 12 }}>
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModel(m.id)}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border:
                selectedModel === m.id
                  ? `2px solid ${m.color}`
                  : "2px solid #334155",
              background:
                selectedModel === m.id ? `${m.color}20` : "transparent",
              color: selectedModel === m.id ? m.color : "#94A3B8",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.2s",
            }}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Player */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <Player
          component={MirrorComposition}
          inputProps={inputProps}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={{ width: "100%" }}
          controls
          autoPlay
          loop
        />
      </div>

      {/* Footer */}
      <div
        style={{
          fontSize: 14,
          color: "#475569",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Built by{" "}
        <span
          style={{
            fontWeight: 700,
            color: "#2563EB",
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
          }}
        >
          democra<span style={{ color: "#059669" }}>.ai</span>
        </span>
      </div>
    </div>
  );
};

export default Home;
