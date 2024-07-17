import {
  setClickCount,
  setHistory,
  setLoading,
  setMatchNumbers,
  setMatchOperators,
  setResult,
  setStatus,
} from "../slice/slice";

export const ParseExpression =
  (expression, history, setInp) => async (dispatch) => {
    dispatch(setLoading());
    const regex = /(\d+|\+|-|÷|×|%)/g;
    const matches = expression.match(regex);

    if (matches) {
      const numbers = [];
      const operators = [];

      matches.forEach((match) => {
        if (/\d+/.test(match)) {
          numbers.push(match);
        } else {
          let newMatch = "";
          if (match === "÷") newMatch = "/";
          if (match === "×") newMatch = "*";
          if (match === "%") newMatch = "%";
          operators.push(newMatch ? newMatch : match);
        }
      });
      dispatch(setMatchNumbers(numbers));
      dispatch(setMatchOperators(operators));
      dispatch(setStatus("go ahead"));
      const operatorsRegex = /[+\-×\\÷]/;
      const hasOperator = operatorsRegex.test(matches);
      if (hasOperator) {
        if (history.length === 0) {
          dispatch(setHistory([expression]));
        } else {
          dispatch(setHistory([expression, ...history]));
        }
      }
    } else {
      setInp("Error");
      dispatch(setStatus(""));
    }
  };

export const Calculation =
  (operator, val_one, val_two, count, setInp, res) => async (dispatch) => {
    dispatch(setLoading());
    if(res) dispatch(setResult(res))
    if (operator.length !== 0) {
      const result = eval(`${val_one} ${operator} ${val_two}`);
      dispatch(setResult(result));
      setInp(result)
      dispatch(setStatus(""));
      dispatch(setClickCount(0));
    } else {
      dispatch(setClickCount(count + 1));
    }
  };

export const Clear = (setInp) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(setMatchNumbers([]));
  dispatch(setMatchOperators([]));
  dispatch(setResult(""));
  dispatch(setStatus(""));
  dispatch(setHistory([]));
  setInp("");
  dispatch(setClickCount(0));
};

export const Backspace = (inp, setInp) => async () => {
  const str = inp.toString()
  const intoarray = str.split("");
  const arraylength = intoarray.length;
  const newarray = str.slice(0, arraylength - 1);
  const intoString = newarray.toString();
  setInp(intoString);
};
