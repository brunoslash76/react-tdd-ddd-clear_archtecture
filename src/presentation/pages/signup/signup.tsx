import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validations'
import { AddAccount } from '@/domain/usecases'
import { stat } from 'fs/promises'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SingUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmationError])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, setState }}>
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
          <button
            className={Styles.submit}
            type='submit'
            data-testid="submit"
            disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError }
          >
						Entrar
          </button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SingUp
