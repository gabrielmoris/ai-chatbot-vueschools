import type { NitroFetchOptions } from "nitropack";
export async function fetchWithTimeout<T>(url: string, fetchOptions: NitroFetchOptions<any, any> = {}): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort();
    throw new Error("Requet timed out");
  }, 100_000);
  const res = await $fetch<T>(url, {
    ...fetchOptions,
    signal: controller.signal,
  });
  clearTimeout(id);
  return res;
}
