import React, { useEffect } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, currentAccountState } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validations'
import { AddAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Input, signupState, SubmitButton, FormStatus } from './components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SingUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetSignupState = useResetRecoilState(signupState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(signupState)

  useEffect(() => resetSignupState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({
        ...old,
        isLoading: true
      }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>
        <Input
          type='text'
          name='name'
          placeholder='Digite seu nome'
        />
        <Input
          type='email'
          name='email'
          placeholder='Digite seu e-mail'
        />
        <Input
          type='password'
          name='password'
          placeholder='Digite sua senha'
        />
        <Input
          type='password'
          name='passwordConfirmation'
          placeholder='Confirme sua senha'
        />
        <SubmitButton text="Cadastrar"/>
        <Link
          to="/login"
          replace
          data-testid="login-link"
          className={Styles.link}
        >
            Voltar para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default SingUp
