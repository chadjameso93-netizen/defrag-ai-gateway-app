import { z } from "zod";

export const birthTimeConfidenceSchema = z.enum([
  "exact",
  "morning",
  "afternoon",
  "evening",
  "unknown"
]);

export const userProfileSchema = z.object({
  fullName: z.string().min(1),
  birthDate: z.string().min(1),
  birthTime: z.string().optional().nullable(),
  birthTimeConfidence: birthTimeConfidenceSchema,
  birthPlace: z.string().min(1),
  currentLocation: z.string().optional().nullable(),
  onboardingFocus: z.enum(["one_person", "family_system", "team"]).optional(),
  advancedSymbolicView: z.boolean().optional()
});

export const relationshipProfileSchema = z.object({
  name: z.string().min(1),
  relationshipType: z.string().min(1),
  birthDate: z.string().min(1),
  birthTime: z.string().optional().nullable(),
  birthTimeConfidence: birthTimeConfidenceSchema,
  birthPlace: z.string().min(1),
  privacyMode: z.enum(["private_raw", "derived_only", "shared"]).default("private_raw")
});
