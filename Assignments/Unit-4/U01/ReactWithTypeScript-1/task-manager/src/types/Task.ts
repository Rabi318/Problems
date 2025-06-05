export const Priority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}
