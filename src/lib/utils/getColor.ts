import { AMINO_COLORS } from "../constans/aminoColors";

export const getColor = (str: string): string => {
  return AMINO_COLORS[str.toLocaleUpperCase()] || "#E0E0E0";
};
