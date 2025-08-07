export const messages = {
  en: {
    otpSubject: 'Your OTP Code',
    otpText: (otp: string) => `Your OTP code is: ${otp}`,
    otpHtml: (otp: string) => `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  },
  ar: {
    otpSubject: 'رمز التحقق الخاص بك',
    otpText: (otp: string) => `رمز التحقق الخاص بك هو: ${otp}`,
    otpHtml: (otp: string) => `<p>رمز التحقق الخاص بك هو: <strong>${otp}</strong></p>`,
  },
};
