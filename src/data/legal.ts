export type LegalProfile = {
  operatorName: string;
  addressLines: string[];
  email: string;
};

export const legalProfile: LegalProfile = {
  operatorName: '',
  addressLines: [],
  email: ''
};

export function isLegalProfileComplete(profile: LegalProfile = legalProfile) {
  return Boolean(profile.operatorName && profile.addressLines.length > 0 && profile.email);
}
