export function formatMessage(
  message: string,
  options?: {
    value?: string;
  }
) {
  let finalMessage = message;
  if (options?.value)
    finalMessage = finalMessage.replace(/\{value\}/gi, options.value);
  return finalMessage;
}
