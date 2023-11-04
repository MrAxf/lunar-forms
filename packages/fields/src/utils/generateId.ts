const ALPHABET =
  '92ORtBi4HTnCx68AMmohWapNvzKLy30ZeQDX7fFJqgdlwbPUIjsYk_SG1-EV5cru';
const ALPHABET_SIZE = ALPHABET.length;

export function generateId(size = 10) {
  let id = '';
  let i = size;
  while (i--) id += ALPHABET[(Math.random() * ALPHABET_SIZE) | 0];
  return id;
}
