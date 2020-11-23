import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factory/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factory/http/axios-http-client-factory'

export const makeRemoteAuthentication = (): Authentication => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
