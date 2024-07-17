import { setError, setHistory, setLoading, setMatchNumbers, setMatchOperators, setResult, setStatus } from "../slice/slice";

export const ParseExpression = (expression, history) => async (dispatch) => {
  dispatch(setLoading());
  const regex = /(\d+|\+|-|÷|×|%)/g
  const matches = expression.match(regex);

  if (matches) {
    const numbers = [];
    const operators = [];

    matches.forEach((match) => {
      if (/\d+/.test(match)) {
        numbers.push(match);
      } else {
        let newMatch = ''
        if(match === '÷') newMatch = '/'
        if(match === '×') newMatch = '*'
        if(match === '%') newMatch = '%'
        operators.push(newMatch ? newMatch : match);
      }
    });
    dispatch(setMatchNumbers(numbers))
    dispatch(setMatchOperators(operators))
    dispatch(setStatus('go ahead'))
    if(history.length === 0){
        dispatch(setHistory([expression]))
    } else {
        dispatch(setHistory([expression, ...history]))
    }
} else {
    dispatch(setError('Error'))
    dispatch(setStatus(''))
  }
};

export const Calculation = (operator, val_one, val_two) => async (dispatch) => {
    dispatch(setLoading())
    const result = eval(`${val_one} ${operator} ${val_two}`)
    dispatch(setResult(result))
    dispatch(setStatus(''))
}

export const Clear = (setInp) => async (dispatch) => {
    dispatch(setLoading())
    dispatch(setMatchNumbers([]))
    dispatch(setMatchOperators([]))
    dispatch(setResult(''))
    dispatch(setError(''))
    dispatch(setStatus(''))
    dispatch(setHistory([]))
    setInp('')
}

export const Backspace = (expression, setInp) => async () => {
    const intoarray = expression.split('')
    console.log(intoarray)
    const arraylength = intoarray.length
    console.log(arraylength)
    const newarray = expression.slice(0, arraylength-1)
    console.log(newarray)
    const intoString = newarray.toString()
    console.log(intoString)
    setInp(intoString)
}
