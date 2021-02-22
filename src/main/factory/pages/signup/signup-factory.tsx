import React from 'react'
import { SignUp } from '@/presentation/pages/'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/usecases/save-access-token/local-update-current-account-factory'
import { makeRemoteAddAccount } from '@/main/usecases/add-account/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
