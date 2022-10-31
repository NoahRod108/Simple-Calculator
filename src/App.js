import { useReducer } from "react";
import "./styles.css"
import NumberButton from "./components/NumberButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
    ADD: 'ADD',
    OPERATION: 'OPERATION',
    CLEAR: 'CLEAR',
    DELETE: 'DELETE',
    EVALUATE: 'EVALUATE',
}

function reducer(state, { type, payload }) {
    switch(type){
        case ACTIONS.ADD:
            // stop multiple zeros
            if (payload.number === '.' && state.currentOperand.includes('.')) return state

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.number}`
            }
        case ACTIONS.OPERATION:
            console.log(state.previousOperand)
            if(state.currentOperand === undefined && state.previousOperand === undefined) return state;

            if(state.previousOperand === undefined){
                return{
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: undefined
                }
            }

            return{
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: undefined,
            }
        case ACTIONS.CLEAR:
            return {}
        default:
            return state
    }
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
    const prev = parseFloat(previousOperand);
    const cur = parseFloat(currentOperand);

    if(isNaN(prev) || isNaN(cur)) return ""

    let result = ""

    switch(operation){
        case "+":
            result = prev + cur
            break
        case "-":
            result = prev - cur
            break
        case "*":
            result = prev * cur
            break
        case "/":
            result = prev / cur
            break
    }

    return result.toString()
}

function App() {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calc-container">
        <div className="calc-grid">
            {/* output of calculator */}
            <div className="output">
                <div className="prev-operand">{previousOperand}</div>
                <div className="curr-operand">{currentOperand}</div>
            </div>
            {/* calculator buttons */}
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({type: ACTIONS.DELETE, payload: currentOperand})}>DEL</button>
            <OperationButton operation={'/'} dispatch={dispatch} />
            <NumberButton number={'1'} dispatch={dispatch} />
            <NumberButton number={'2'} dispatch={dispatch} />
            <NumberButton number={'3'} dispatch={dispatch} />
            <OperationButton operation={'*'} dispatch={dispatch} />
            <NumberButton number={'4'} dispatch={dispatch} />
            <NumberButton number={'5'} dispatch={dispatch} />
            <NumberButton number={'6'} dispatch={dispatch} />
            <OperationButton operation={'-'} dispatch={dispatch} />
            <NumberButton number={'7'} dispatch={dispatch} />
            <NumberButton number={'8'} dispatch={dispatch} />
            <NumberButton number={'9'} dispatch={dispatch} />
            <OperationButton operation={'+'} dispatch={dispatch} />
            <NumberButton number={'.'} dispatch={dispatch} />
            <NumberButton number={'0'} dispatch={dispatch} />
            <button className="span-two operation">=</button>
        </div>
    </div>
  );
}

export default App;
