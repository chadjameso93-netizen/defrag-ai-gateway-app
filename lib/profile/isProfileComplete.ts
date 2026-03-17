export function isProfileComplete(profile: any) {
  if (!profile) return false;
  return Boolean(profile.birth_date && profile.birth_place);
}
