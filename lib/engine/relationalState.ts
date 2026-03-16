export type RelationalState =
  | "calm"
  | "tension"
  | "distance"
  | "activation"
  | "triangulation";

export function computeRelationalState(context: any): RelationalState {

  const pressure = context.pressure || 0;

  if (pressure > 0.75) {
    return "activation";
  }

  if (pressure > 0.55) {
    return "tension";
  }

  if (pressure < 0.2) {
    return "distance";
  }

  return "calm";
}
