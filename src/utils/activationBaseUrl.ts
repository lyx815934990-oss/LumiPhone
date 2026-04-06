const LOCAL_STORAGE_KEY = 'lumi.activationBaseUrl';

function trimValue(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function isLocalHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h === 'localhost' || h === '127.0.0.1' || h === '::1';
}

/**
 * 自动选择激活服务地址：
 * 1) 生产环境优先同域（玩家打开哪个域名就请求哪个域名）；
 * 2) 本地开发可用 localStorage 覆盖；
 * 3) 最后回退到环境变量。
 */
export function resolveActivationBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = trimValue(window.location.origin);
    const hostname = trimValue(window.location.hostname);
    if (origin && hostname && !isLocalHost(hostname)) {
      return origin;
    }
  }

  if (typeof window !== 'undefined') {
    const localOverride = trimValue(window.localStorage.getItem(LOCAL_STORAGE_KEY));
    if (localOverride) return localOverride;
  }

  const envBase = trimValue((import.meta as any).env?.VITE_ACTIVATION_SERVER_BASE_URL);
  if (envBase) return envBase;
  return '';
}

