import React from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Footer, Header } from '@/presentation/components'
import Loading from '@/presentation/components/loading/loading'
import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        {false &&
        (
          <>
            <hgroup>
              <Calendar className={Styles.calendarWrap} date={new Date()}/>
              <h2>Qual é seu framework web favorito?</h2>
            </hgroup>

            <FlipMove className={Styles.answersList}>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
