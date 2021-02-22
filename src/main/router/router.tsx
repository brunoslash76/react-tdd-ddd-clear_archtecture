import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factory/pages/login/login-factory'
import { makeSignUp } from '@/main/factory/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={makeLogin} />
        <Route path='/signup' exact component={makeSignUp} />
        <Route path='/' exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
