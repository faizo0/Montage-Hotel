/**
 * Hospitality formatting utilities with strict Pakistani Rupee (PKR) locale consistency.
 */
export function formatCurrency(amount, currency = 'PKR') {
  const numeric = Math.round(Number(amount) || 0);
  if (currency === 'PKR') {
    return `PKR ${numeric.toLocaleString('en-US')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function formatNightlyRate(amount, currency = 'PKR') {
  return `${formatCurrency(amount, currency)} / night`;
}

export function formatDailyRate(amount, currency = 'PKR') {
  return `${formatCurrency(amount, currency)} / 1 Night`;
}

export function formatPercentage(value) {
  return `${Number(value || 0).toFixed(1)}%`;
}

export function formatDateShort(isoDate) {
  if (!isoDate) return '—';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed);
}
