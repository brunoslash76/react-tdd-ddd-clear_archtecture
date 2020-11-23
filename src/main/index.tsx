import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factory/pages/login/login-factory'

ReactDOM.render(
  <Router makeLogin={makeLogin}/>,
  document.querySelector('#main')
)
