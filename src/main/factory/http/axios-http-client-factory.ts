import { AxiosHttpClient } from '@/infra/http/axios-http-client/axio-http-client'
import React from 'react'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
