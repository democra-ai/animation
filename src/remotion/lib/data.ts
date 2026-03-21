import type { LLMModel, ModelCapabilities, RoleConfig } from "./types";

export const roles: RoleConfig[] = [
  {
    id: "doctor",
    emoji: "🩺",
    label: "Doctor",
    desc: "Clinical experience",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  {
    id: "developer",
    emoji: "💻",
    label: "Developer",
    desc: "Coding knowledge",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#93C5FD",
  },
  {
    id: "designer",
    emoji: "🎨",
    label: "Designer",
    desc: "Aesthetic sense",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#C4B5FD",
  },
  {
    id: "student",
    emoji: "📚",
    label: "Student",
    desc: "Basic knowledge",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },
];

export const modelInfo: Record<
  LLMModel,
  { name: string; color: string; bgColor: string }
> = {
  claude: { name: "Claude", color: "#D97706", bgColor: "#FFFBEB" },
  gpt4: { name: "GPT-4", color: "#10A37F", bgColor: "#ECFDF5" },
  gemini: { name: "Gemini", color: "#4285F4", bgColor: "#EFF6FF" },
};

export const modelCapabilities: Record<LLMModel, ModelCapabilities> = {
  claude: {
    doctor: {
      label: "Super Doctor",
      desc: "Diagnosis + research + treatment plan in seconds",
      capabilities: [
        { name: "Diagnosis", value: 0.92 },
        { name: "Research", value: 0.88 },
        { name: "Treatment", value: 0.85 },
      ],
    },
    developer: {
      label: "10x Developer",
      desc: "Architecture + code + deploy at system scale",
      capabilities: [
        { name: "Architecture", value: 0.9 },
        { name: "Coding", value: 0.95 },
        { name: "Review", value: 0.88 },
      ],
    },
    designer: {
      label: "Super Designer",
      desc: "Brand systems + 3D + motion in any style",
      capabilities: [
        { name: "Visual", value: 0.85 },
        { name: "UX", value: 0.9 },
        { name: "Motion", value: 0.82 },
      ],
    },
    student: {
      label: "Super Learner",
      desc: "Personalized tutor + knowledge graph + practice",
      capabilities: [
        { name: "Learning", value: 0.88 },
        { name: "Research", value: 0.85 },
        { name: "Writing", value: 0.9 },
      ],
    },
  },
  gpt4: {
    doctor: {
      label: "AI Clinician",
      desc: "Multi-modal diagnosis + patient communication",
      capabilities: [
        { name: "Diagnosis", value: 0.88 },
        { name: "Research", value: 0.9 },
        { name: "Treatment", value: 0.82 },
      ],
    },
    developer: {
      label: "Full-Stack AI",
      desc: "Rapid prototyping + multi-language mastery",
      capabilities: [
        { name: "Architecture", value: 0.85 },
        { name: "Coding", value: 0.92 },
        { name: "Review", value: 0.8 },
      ],
    },
    designer: {
      label: "Creative Engine",
      desc: "Image generation + layout + brand consistency",
      capabilities: [
        { name: "Visual", value: 0.92 },
        { name: "UX", value: 0.82 },
        { name: "Motion", value: 0.88 },
      ],
    },
    student: {
      label: "Study Buddy",
      desc: "Conversational tutor + Socratic method",
      capabilities: [
        { name: "Learning", value: 0.85 },
        { name: "Research", value: 0.82 },
        { name: "Writing", value: 0.88 },
      ],
    },
  },
  gemini: {
    doctor: {
      label: "Research MD",
      desc: "Cross-database research + evidence synthesis",
      capabilities: [
        { name: "Diagnosis", value: 0.85 },
        { name: "Research", value: 0.95 },
        { name: "Treatment", value: 0.8 },
      ],
    },
    developer: {
      label: "Cloud Architect",
      desc: "Infrastructure + scalability + GCP integration",
      capabilities: [
        { name: "Architecture", value: 0.92 },
        { name: "Coding", value: 0.88 },
        { name: "Review", value: 0.85 },
      ],
    },
    designer: {
      label: "Multi-Modal Creator",
      desc: "Cross-medium design + video + interactive",
      capabilities: [
        { name: "Visual", value: 0.88 },
        { name: "UX", value: 0.85 },
        { name: "Motion", value: 0.92 },
      ],
    },
    student: {
      label: "Knowledge Explorer",
      desc: "Deep search + cross-reference + visualization",
      capabilities: [
        { name: "Learning", value: 0.82 },
        { name: "Research", value: 0.92 },
        { name: "Writing", value: 0.85 },
      ],
    },
  },
};
