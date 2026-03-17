import crypto from "crypto";

export function generateInviteToken() {
  const raw = crypto.randomBytes(24).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, tokenHash };
}
