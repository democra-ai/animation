import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { CompositionProps } from "../../types/constants";
import { EnhancedPerson } from "./components/EnhancedPerson";
import { Mirror } from "./components/Mirror";
import { Person } from "./components/Person";
import { modelCapabilities, modelInfo, roles } from "./lib/data";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});

export const MirrorComposition: React.FC<
  z.infer<typeof CompositionProps>
> = ({ selectedModel }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const model = selectedModel;
  const info = modelInfo[model];
  const caps = modelCapabilities[model];

  // === PHASE TIMINGS ===
  const introEnd = 60; // 0-2s: title
  const rolesEnterEnd = 150; // 2-5s: roles walk in
  const mirrorActivateEnd = 210; // 5-7s: mirror glows
  const _enhancedRevealEnd = 360; // 7-12s: enhanced versions appear one by one
  void _enhancedRevealEnd;
  const outroStart = 480; // 16-20s: outro

  // === INTRO ===
  const titleOpacity = interpolate(frame, [0, 30, introEnd - 10, introEnd], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [15, 45, introEnd - 10, introEnd], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // === MIRROR ===
  const mirrorScale = spring({
    fps,
    frame: frame - introEnd + 20,
    config: { damping: 15, stiffness: 60 },
    durationInFrames: 40,
  });
  const mirrorGlow = interpolate(
    frame,
    [rolesEnterEnd, mirrorActivateEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // === ROLES ENTER (staggered) ===
  const roleEntries = roles.map((_, i) => {
    const delay = introEnd + i * 15;
    return spring({
      fps,
      frame: frame - delay,
      config: { damping: 15, stiffness: 80 },
      durationInFrames: 30,
    });
  });

  // === ENHANCED REVEAL (staggered) ===
  const enhancedDelays = roles.map((_, i) => mirrorActivateEnd + i * 30);

  // === OUTRO ===
  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const mainContentOpacity = interpolate(
    frame,
    [outroStart - 30, outroStart],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // === MODEL BADGE ===
  const badgeOpacity = interpolate(
    frame,
    [rolesEnterEnd - 10, rolesEnterEnd + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 50%, #FAFBFE 100%)",
        fontFamily,
      }}
    >
      {/* === INTRO TITLE === */}
      <Sequence durationInFrames={introEnd + 20}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#0F172A",
              opacity: titleOpacity,
              fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
            }}
          >
            AI Is a Mirror
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#64748B",
              opacity: subtitleOpacity,
            }}
          >
            It amplifies who you already are
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* === MAIN SCENE === */}
      <Sequence from={introEnd - 10}>
        <AbsoluteFill
          style={{
            opacity: frame < introEnd ? 0 : mainContentOpacity,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            padding: "60px 40px",
          }}
        >
          {/* LEFT: Real persons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#94A3B8",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 4,
                opacity: roleEntries[0],
              }}
            >
              YOU
            </div>
            {roles.map((role, i) => {
              const entry = roleEntries[i];
              return (
                <div
                  key={role.id}
                  style={{
                    opacity: entry,
                    transform: `translateX(${interpolate(entry, [0, 1], [-80, 0])}px)`,
                  }}
                >
                  <Person role={role} />
                </div>
              );
            })}
          </div>

          {/* Arrows left */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 70,
              marginTop: 24,
            }}
          >
            {roles.map((_, i) => {
              const arrowOpacity = interpolate(
                frame,
                [rolesEnterEnd + i * 5, rolesEnterEnd + i * 5 + 20],
                [0, 0.5],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 2,
                    background: "#94A3B8",
                    opacity: arrowOpacity,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: -3,
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid #94A3B8",
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* CENTER: Mirror */}
          <div style={{ transform: `scale(${mirrorScale})` }}>
            <Mirror
              glowIntensity={mirrorGlow}
              modelName={info.name}
              modelColor={info.color}
            />
          </div>

          {/* Arrows right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 70,
              marginTop: 24,
            }}
          >
            {roles.map((role, i) => {
              const arrowOpacity = interpolate(
                frame,
                [mirrorActivateEnd + i * 20, mirrorActivateEnd + i * 20 + 15],
                [0, 0.6],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <div
                  key={i}
                  style={{
                    width: 60,
                    height: 2,
                    background: role.color,
                    opacity: arrowOpacity,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: -3,
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: `6px solid ${role.color}`,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT: Enhanced persons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#6366F1",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 4,
                opacity: interpolate(
                  frame,
                  [mirrorActivateEnd, mirrorActivateEnd + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
              }}
            >
              AMPLIFIED YOU
            </div>
            {roles.map((role, i) => (
              <EnhancedPerson
                key={role.id}
                role={role}
                enhanced={caps[role.id]}
                animationDelay={enhancedDelays[i] - introEnd + 10}
              />
            ))}
          </div>
        </AbsoluteFill>

        {/* Model badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            opacity: badgeOpacity,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            background: info.bgColor,
            border: `1px solid ${info.color}30`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: info.color,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: info.color,
            }}
          >
            Powered by {info.name}
          </span>
        </div>
      </Sequence>

      {/* === OUTRO === */}
      <Sequence from={outroStart}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 16,
            opacity: outroOpacity,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#0F172A",
              textAlign: "center",
              fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
            }}
          >
            What if you could borrow
            <br />
            an expert&apos;s Skill?
          </div>
          <div style={{ fontSize: 18, color: "#64748B", textAlign: "center" }}>
            That&apos;s what{" "}
            <span style={{ fontWeight: 700, color: "#2563EB" }}>
              democra
              <span style={{ color: "#059669" }}>.ai</span>
            </span>{" "}
            makes possible.
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* democra.ai watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 32,
          fontSize: 12,
          fontWeight: 700,
          color: "#CBD5E1",
          fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
        }}
      >
        democra<span style={{ color: "#059669" }}>.ai</span>
      </div>
    </AbsoluteFill>
  );
};
