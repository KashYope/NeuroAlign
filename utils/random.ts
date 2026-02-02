export function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function shuffle<T>(array: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const m = array.length;
  const t = array.slice(); // Copy
  let i;
  let r;

  // Fisher-Yates shuffle
  for (i = m - 1; i > 0; i--) {
      r = Math.floor(rng() * (i + 1));
      [t[i], t[r]] = [t[r], t[i]];
  }
  return t;
}
