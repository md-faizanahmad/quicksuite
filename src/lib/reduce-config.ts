export const REDUCE_TARGETS = [
  { label: "25KB", value: 25 },
  { label: "50KB", value: 50 },
  { label: "75KB", value: 75 },
  { label: "100KB", value: 100 },
];

export interface ReduceSettings {
  targetSizeKB: number;
  isCustom: boolean;
  type: "pdf" | "image";
}
