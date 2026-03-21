import { z } from "zod";

export const COMP_NAME = "MirrorOfLLMs";

export const CompositionProps = z.object({
  selectedModel: z.enum(["claude", "gpt4", "gemini"]).default("claude"),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  selectedModel: "claude",
};

export const DURATION_IN_FRAMES = 600;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
