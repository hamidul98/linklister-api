export function validateApiKey(apiKey) {
  return apiKey && apiKey === process.env.VALID_API_KEY;
} 