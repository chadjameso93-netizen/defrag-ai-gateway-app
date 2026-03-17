import { GeistSans } from "geist/font/sans";
import { Inter_Tight } from "next/font/google";

export const geist = GeistSans;

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
