export type Role = "doctor" | "developer" | "designer" | "student";
export type LLMModel = "claude" | "gpt4" | "gemini";

export interface RoleConfig {
  id: Role;
  emoji: string;
  label: string;
  desc: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface EnhancedConfig {
  label: string;
  desc: string;
  capabilities: { name: string; value: number }[];
}

export type ModelCapabilities = Record<Role, EnhancedConfig>;
