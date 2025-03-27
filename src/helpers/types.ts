// Shared types used across multiple files

export type Unit = "gallons" | "cubic_feet" | "pounds" | "kilowatt_hours";

export interface Material {
  id: number;
  name: string;
  unit: Unit;
  health_hazard: string;
  fire_hazard: string;
  instability_hazard: string;
  quantity: string;
  location: string;
}

export interface ProcessedFile {
  content: string;
  name: string;
}

export interface Fees {
  aggregateAmounts: {
    healthLiquid: number;
    fireLiquid: number;
    instabilityLiquid: number;
    healthGas: number;
    fireGas: number;
    instabilityGas: number;
    healthSolid: number;
    fireSolid: number;
    instabilitySolid: number;
    ESS: number;
  };
  fees: {
    healthLiquid: number;
    fireLiquid: number;
    instabilityLiquid: number;
    healthGas: number;
    fireGas: number;
    instabilityGas: number;
    healthSolid: number;
    fireSolid: number;
    instabilitySolid: number;
    ESS: number;
  };
  total: number;
}
