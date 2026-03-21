"use client";

import { Player, type PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { MirrorComposition } from "../remotion/MirrorComposition";
import type { LLMModel } from "../remotion/lib/types";

const models: { id: LLMModel; name: string; color: string; icon: string }[] = [
  { id: "claude", name: "Claude", color: "#D97706", icon: "✦" },
  { id: "gpt4", name: "GPT-4", color: "#10A37F", icon: "◆" },
  { id: "gemini", name: "Gemini", color: "#4285F4", icon: "✧" },
];

const Home: NextPage = () => {
  const [selectedModel, setSelectedModel] = useState<LLMModel>("claude");
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<PlayerRef>(null);

  const inputProps = useMemo(
    () => ({ selectedModel }),
    [selectedModel],
  );

  const handleModelSwitch = useCallback(
    (id: LLMModel) => {
      setSelectedModel(id);
      // Restart animation from the main scene when switching models
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.play();
        setIsPlaying(true);
      }
    },
    [],
  );

  const togglePlayback = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleReplay = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
  }, []);

  const currentModelInfo = models.find((m) => m.id === selectedModel)!;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Full-screen animation canvas */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Player
          ref={playerRef}
          component={MirrorComposition}
          inputProps={inputProps}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          compositionHeight={VIDEO_HEIGHT}
          compositionWidth={VIDEO_WIDTH}
          style={{
            width: "100%",
            height: "100%",
          }}
          autoPlay
          loop
          acknowledgeRemotionLicense
        />
      </div>

      {/* Floating model switcher — bottom center */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 8px",
          borderRadius: 999,
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {models.map((m) => {
          const isActive = selectedModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleModelSwitch(m.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                border: "none",
                background: isActive ? `${m.color}25` : "transparent",
                color: isActive ? m.color : "#64748B",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
                position: "relative",
              }}
            >
              <span style={{ fontSize: 11 }}>{m.icon}</span>
              {m.name}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 2,
                    borderRadius: 1,
                    background: m.color,
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 20,
            background: "rgba(255,255,255,0.1)",
            margin: "0 4px",
          }}
        />

        {/* Play/Pause */}
        <button
          onClick={togglePlayback}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.06)",
            color: "#94A3B8",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Replay */}
        <button
          onClick={handleReplay}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.06)",
            color: "#94A3B8",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          title="Replay"
        >
          ↺
        </button>
      </div>

      {/* Top-left brand */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 24,
          fontSize: 14,
          fontWeight: 700,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
          letterSpacing: 0.5,
        }}
      >
        democra<span style={{ color: "rgba(5, 150, 105, 0.5)" }}>.ai</span>
      </div>

      {/* Top-right current model indicator */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 24,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 999,
          background: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: currentModelInfo.color,
            boxShadow: `0 0 8px ${currentModelInfo.color}80`,
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Powered by {currentModelInfo.name}
        </span>
      </div>
    </div>
  );
};

export default Home;
