export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const otpExpiry = (): Date => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 10); // valid for 10 minutes
  return expires;
};
