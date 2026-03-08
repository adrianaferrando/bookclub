const COLOR_PAIRS = [
  { strong: "#D64080", light: "#F5B8D0" }, // Fucsia
  { strong: "#E07028", light: "#FDDCAA" }, // Mandarina
  { strong: "#D4A017", light: "#F8EAAA" }, // Dorado
  { strong: "#2E9E6E", light: "#B5E8D0" }, // Jade
  { strong: "#2E7D9E", light: "#B0DDF0" }, // Océano
  { strong: "#6E5ECE", light: "#D0C8F5" }, // Iris
  { strong: "#D95050", light: "#F5C0B8" }, // Coral
  { strong: "#B06840", light: "#EACCB0" }, // Terracota
] as const;

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

export function getVoterColors(username: string): { strong: string; light: string } {
  const index = hashString(username) % COLOR_PAIRS.length;
  return COLOR_PAIRS[index];
}
