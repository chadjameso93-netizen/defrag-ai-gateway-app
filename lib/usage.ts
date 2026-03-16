type Bucket = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __defragUsage?: Map<string, Bucket>;
};

const store = globalStore.__defragUsage ?? new Map<string, Bucket>();
globalStore.__defragUsage = store;

const WINDOW_MS = 24 * 60 * 60 * 1000;
const FREE_LIMIT = 3;

export function getClientKey(ip: string | null, path: string) {
  return `${ip || "unknown"}:${path}`;
}

export function checkUsage(key: string) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    const fresh = { count: 0, resetAt: now + WINDOW_MS };
    store.set(key, fresh);
    return { allowed: true, remaining: FREE_LIMIT, resetAt: fresh.resetAt };
  }

  if (current.count >= FREE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  return { allowed: true, remaining: FREE_LIMIT - current.count, resetAt: current.resetAt };
}

export function incrementUsage(key: string) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  current.count += 1;
  store.set(key, current);
}
