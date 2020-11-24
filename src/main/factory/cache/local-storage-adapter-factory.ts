import { SetStorage } from '@/data/protocols/cache/set-storage'
import { LocalStorageAdapter } from '@/infra/chache/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
