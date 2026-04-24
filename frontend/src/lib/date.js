export function todayISO() {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

export function isToday(iso) {
  return !!iso && iso === todayISO();
}

export function isOverdue(iso) {
  return !!iso && iso < todayISO();
}

export function todayKey() {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()];
}
