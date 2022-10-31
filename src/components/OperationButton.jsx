import React from 'react'
import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, operation }) => {
    return (
      <button className='operation' onClick={() => dispatch({type: ACTIONS.OPERATION, payload: { operation }})}>{operation}</button>
    )
}

export default OperationButton