/* eslint-disable no-console */
export type RuntimeCacheArgs<T> = {
  key: unknown
  fallback: T
  callback: () => Promise<T>
}

export class RuntimeCache {
  store = new Map<number, unknown>()
  /**
   *
   * @param {unknown} key - The unique key to store values.
   * @param {T | null} fallback - The fallback value if fetching a cached request fail.
   * @param {T} callback - The async callback function that provides the value to store.
   * @returns {T} - The fetch, cached or fallback value
   */
  async get<T = unknown>({ key, fallback, callback }: RuntimeCacheArgs<T>): Promise<T> {
    const hash = this.getHash(JSON.stringify(key))
    const cached = this.store.get(hash)
    if (cached) {
      return cached as T
    }
    try {
      const value = await callback()
      this.store.set(hash, value)
      return value
    } catch (error) {
      console.error('Error fetching cached request', key, error)
      console.error(key)
      console.error(error)
      return fallback
    }
  }

  remove(key: unknown) {
    const hash = this.getHash(JSON.stringify(key))
    this.store.delete(hash)
  }

  // Fowler-Noll-Vo 1a hash
  private getHash = (str: string) => {
    let hash = 0x811c9dc5
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i)
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
    }
    return hash >>> 0
  }
}
