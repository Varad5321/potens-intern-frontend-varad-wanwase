import type { ReactElement } from "react";

export type CategoryId =
  | "roadDamage"
  | "waterSupply"
  | "garbageCollection"
  | "streetLight"
  | "publicSafety"
  | "other";

export interface CategoryOption {
  id: CategoryId;
  icon: ReactElement;
}

export interface Submission {
  referenceId: string;
  category: string;
  description: string;
  imageName: string;
  createdAt: string;
}
