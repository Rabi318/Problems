export function parseMove(input: string): { row: number; col: number } | null {
  const rows = { A: 0, B: 1, C: 2 };
  const match = input.toUpperCase().match(/^([ABC])([123])$/);
  if (!match) return null;

  const row = rows[match[1] as keyof typeof rows];
  const col = parseInt(match[2]) - 1;
  return { row, col };
}
