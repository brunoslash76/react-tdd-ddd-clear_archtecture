import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import React from 'react'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
