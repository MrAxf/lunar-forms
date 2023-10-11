const toReplaceRegExp = /\{([^}]+)\}/g;

export function formatMessage(
  message: string,
  replacements?: Record<string, string>,
  formatters?: Record<string, (value: string) => string>
) {
  let finalMessage = message;
  if (!replacements) return finalMessage;

  Array.from(new Set(message.match(toReplaceRegExp))).forEach((toReplace) => {
    const toReplaceInner = toReplace.substring(1, toReplace.length - 1);
    const [replacementKey, formatterKey] = toReplaceInner.split(':').reverse();

    if (!formatters || !formatterKey || !formatters[formatterKey]) {
      if (!replacements[toReplaceInner]) return;

      finalMessage = finalMessage.replace(
        new RegExp(toReplace, 'gi'),
        replacements[toReplaceInner]
      );
    } else {
      if (!replacements[replacementKey]) return;
      finalMessage = finalMessage.replace(
        new RegExp(toReplace, 'gi'),
        formatters[formatterKey](replacements[replacementKey])
      );
    }
  });
  return finalMessage;
}
