import { RemoteAccount as RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { AddAccountParams } from '@/domain/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAddAccoountParams } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAccount', () => {
  test('Should call HttpPostCliente with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccoountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
