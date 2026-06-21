export type LegalProfile = {
  operatorName: string;
  ownerName: string;
  addressLines: string[];
  email: string;
};

export const legalProfile: LegalProfile = {
  operatorName: 'Epic Technic MB',
  ownerName: 'Benjamin Bagandi',
  addressLines: [],
  email: ''
};

export function isLegalProfileComplete(profile: LegalProfile = legalProfile) {
  return Boolean(profile.operatorName && profile.addressLines.length > 0 && profile.email);
}
