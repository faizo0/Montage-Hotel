/**
 * Lightweight class-name utility without extra runtime dependencies.
 */
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter((value) => typeof value === 'string' && value.trim().length > 0)
    .join(' ');
}

export default cn;
