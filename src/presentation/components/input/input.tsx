import React, { useRef } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const error = state[`${props.name}Error`]
  const inputRef = useRef<HTMLInputElement>()

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
        title={error}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => inputRef.current.focus()}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
