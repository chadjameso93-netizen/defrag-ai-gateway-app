export function getParticipantStatus(participant: any) {
  const hasBirthDate = Boolean(participant.birth_date);
  const hasBirthPlace = Boolean(participant.birth_place);
  const hasBirthTime = Boolean(participant.birth_time);

  let completeness = "low";
  if (hasBirthDate && hasBirthPlace) completeness = "medium";
  if (hasBirthDate && hasBirthPlace && hasBirthTime) completeness = "high";

  return {
    completeness,
    privacyMode: participant.privacy_mode || "private_raw",
    dataStatus: participant.data_status || "pending_invite"
  };
}
