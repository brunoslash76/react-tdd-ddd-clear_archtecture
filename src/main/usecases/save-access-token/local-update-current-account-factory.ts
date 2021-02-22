import { UpdateCurrentAccount } from '@/domain/usecases'
import { LocalUpdateCurrentAccount } from '@/data/usecases/save-access-token/local-update-current-account'
import { makeLocalStorageAdapter } from '@/main/factory/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
