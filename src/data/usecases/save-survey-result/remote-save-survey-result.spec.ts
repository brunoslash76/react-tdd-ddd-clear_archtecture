import { RemoteLoadSurveyResult } from '@/data/usecases'
import faker from 'faker'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'
// import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    await sut.save({ answer: faker.random.word() })
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })

  // test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
  //   const { sut, httpClientSpy } = makeSut()
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCode.forbiden
  //   }
  //   const promise = sut.load()
  //   await expect(promise).rejects.toThrow(new AccessDeniedError())
  // })

  // test('Should throw UnexpectedError if HttpClient returns 404', async () => {
  //   const { sut, httpClientSpy } = makeSut()
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCode.notFound
  //   }
  //   const promise = sut.load()
  //   await expect(promise).rejects.toThrow(new UnexpectedError())
  // })

  // test('Should throw UnexpectedError if HttpClient returns 500', async () => {
  //   const { sut, httpClientSpy } = makeSut()
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCode.serverError
  //   }
  //   const promise = sut.load()
  //   await expect(promise).rejects.toThrow(new UnexpectedError())
  // })

  // test('Should return SurveyResult on 200', async () => {
  //   const { sut, httpClientSpy } = makeSut()
  //   const httpResult = mockRemoteSurveyResultModel()
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCode.ok,
  //     body: httpResult
  //   }
  //   const httpResponse = await sut.load()
  //   expect(httpResponse).toEqual({
  //     question: httpResult.question,
  //     answers: httpResult.answers,
  //     date: new Date(httpResult.date)
  //   })
  // })
})
