import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { HttpClient } from '@/data/protocols/http'

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
