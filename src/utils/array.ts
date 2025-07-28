export function array_match<T extends any>(a: Array<T>, b: Array<T>): boolean {
  if (a.length !== b.length) return false;
  else if (typeof a[0] !== typeof b[0]) return false;
  else return a.every(c => b.includes(c)) && b.every(c => a.includes(c))
}