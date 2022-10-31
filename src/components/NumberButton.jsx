import React from 'react'
import { ACTIONS } from "../App";

const NumberButton = ({ dispatch, number }) => {
    return (
      <button onClick={() => dispatch({type: ACTIONS.ADD, payload: { number }})}>{number}</button>
    )
}

export default NumberButton