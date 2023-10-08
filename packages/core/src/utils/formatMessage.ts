export function formatMessage(
  message: string,
  options?: Record<string, string>
) {
  let finalMessage = message;
  if (!options) return finalMessage;
  Object.entries(options).forEach(([key, value]) => {
    finalMessage = finalMessage.replace(new RegExp(`/\\{${key}\\}/gi`), value);
  });
  return finalMessage;
}
