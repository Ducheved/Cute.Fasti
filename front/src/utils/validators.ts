export const validateUrl = (url: string): string | null => {
  let validatedUrl = url.trim();
  const urlPattern = /^(https?:\/\/)/;
  const hasProtocol = urlPattern.test(validatedUrl);
  if (!hasProtocol) {
    validatedUrl = `https://${validatedUrl}`;
  }
  try {
    new URL(validatedUrl);
  } catch (_) {
    return null;
  }
  return validatedUrl;
};
