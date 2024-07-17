import { GoArrowLeft } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { RiDivideFill } from "react-icons/ri";
import { PiPlusMinusLight } from "react-icons/pi";
import { AiOutlinePercentage } from "react-icons/ai";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Backspace, Calculation, Clear, ParseExpression } from "./app/action/action";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const [inp, setInp] = useState('')

  const state = useSelector(state => state.CALC)
  const status = state.status
  const num_one = state.matchNumbers[0]
  const num_two = state.matchNumbers[1]
  const opr = state.matchOperators
  const result = state.result
  const history = state.history

  const ref_two = useRef(null)
  const ref_three = useRef(null)
  const ref_four = useRef(null)
  const ref_five = useRef(null)

  const dispatch = useDispatch()

  const handleClick = (e, ref) => {
    if (ref) {
      let value = ref.current.value
      if (value === '/') setInp(inp + '÷')
      if (value === '*') setInp(inp + '×')
      if (value === '%') setInp(inp + '%')
    } else {
      setInp(inp + e.target.value);
    }
  }

  const handleResult = () => {
    const inputValue = document.getElementById('input').value
    dispatch(ParseExpression(inputValue, history))
  }

  useEffect(() => {
    if (status === 'go ahead') {
      dispatch(Calculation(opr, num_one, num_two))
    }
    if(result){
      setInp(result)
    }
  }, [dispatch, num_one, num_two, opr, result, status]);

  return (
    <>
      <div className="flex justify-center items-center w-svw h-svh bg-[#42444D] text-white">
        <div className="bg-black w-[360px] h-[640px] p-3">
          <div className="relative flex flex-col justify-end items-center gap-3 h-full">
            <input type="text" id="input" value={inp} onChange={(e) => setInp(e.target.value)} className="absolute top-0 bg-transparent text-5xl text-end outline-none w-full mt-7 px-1 pt-20 caret-color_two" />
            <div className="flex justify-between items-center w-full">
              <button type="button" value="mc" onClick={handleClick} className="btnPad bg-color_one not-italic">mc</button>
              <button type="button" value="m+" onClick={handleClick} className="btnPad bg-color_one not-italic">m+</button>
              <button type="button" value="m-" onClick={handleClick} className="btnPad bg-color_one not-italic">m-</button>
              <button type="button" value="mr" onClick={handleClick} className="btnPad bg-color_one not-italic">mr</button>
            </div>
            <div className="flex justify-between items-center w-full">
              <button type="button" onClick={() => dispatch(Clear(setInp))} className="btnPad bg-color_one text-color_two not-italic">AC</button>
              <button type="button" onClick={() => dispatch(Backspace(inp, setInp))} className="btnPad bg-color_one text-color_two"><GoArrowLeft /></button>
              <button type="button" value="+/-" ref={ref_two} onClick={(e) => handleClick(e, ref_two)} className="btnPad bg-color_one"><PiPlusMinusLight /></button>
              <button type="button" value="/" ref={ref_three} onClick={(e) => handleClick(e, ref_three)} className="btnPad bg-color_one"><RiDivideFill /></button>
            </div>
            <div className="flex justify-between items-center w-full">
              <button type="button" value="7" onClick={handleClick} className="btnPad">7</button>
              <button type="button" value="8" onClick={handleClick} className="btnPad">8</button>
              <button type="button" value="9" onClick={handleClick} className="btnPad">9</button>
              <button type="button" ref={ref_four} value="*" onClick={(e) => handleClick(e, ref_four)} className="btnPad bg-color_one"><RxCross1 className="text-[24px]" /></button>
            </div>
            <div className="flex justify-between items-center w-full">
              <button type="button" value="4" onClick={handleClick} className="btnPad">4</button>
              <button type="button" value="5" onClick={handleClick} className="btnPad">5</button>
              <button type="button" value="6" onClick={handleClick} className="btnPad">6</button>
              <button type="button" value="-" onClick={handleClick} className="btnPad bg-color_one not-italic">-</button>
            </div>
            <div className="flex justify-between items-center w-full">
              <button type="button" value="1" onClick={handleClick} className="btnPad">1</button>
              <button type="button" value="2" onClick={handleClick} className="btnPad">2</button>
              <button type="button" value="3" onClick={handleClick} className="btnPad">3</button>
              <button type="button" value="+" onClick={handleClick} className="btnPad bg-color_one not-italic">+</button>
            </div>
            <div className="flex justify-between items-center w-full">
              <button type="button" value="%" ref={ref_five} onClick={(e) => handleClick(e, ref_five)} className="btnPad"><AiOutlinePercentage /></button>
              <button type="button" value="0" onClick={handleClick} className="btnPad">0</button>
              <button type="button" value="." onClick={handleClick} className="btnPad">.</button>
              <button type="button" onClick={handleResult} className="btnPad bg-color_two"> = </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
