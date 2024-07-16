import { GoArrowLeft } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { RiDivideFill } from "react-icons/ri";
import { PiPlusMinusLight } from "react-icons/pi";
import { AiOutlinePercentage } from "react-icons/ai";

function App() {

  return (
    <>
      <div className="flex justify-center items-center w-svw h-svh bg-[#42444D] text-white">
        <div className="bg-black w-[360px] h-[640px] p-3">
          <div className="relative  flex flex-col justify-end items-center gap-3 h-full">
            <input type="text" className="absolute top-0 bg-transparent text-5xl text-end outline-none w-full mt-7 px-1 pt-20 caret-color_two" />
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad bg-color_one not-italic">mc</button>
              <button type="button" className="btnPad bg-color_one not-italic">m+</button>
              <button type="button" className="btnPad bg-color_one not-italic">m-</button>
              <button type="button" className="btnPad bg-color_one not-italic">mr</button>
            </div>
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad bg-color_one text-color_two not-italic">AC</button>
              <button type="button" className="btnPad bg-color_one text-color_two"><GoArrowLeft /></button>
              <button type="button" className="btnPad bg-color_one"><PiPlusMinusLight /></button>
              <button type="button" className="btnPad bg-color_one"><RiDivideFill /></button>
            </div>
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad">7</button>
              <button type="button" className="btnPad">8</button>
              <button type="button" className="btnPad">9</button>
              <button type="button" className="btnPad bg-color_one"><RxCross1 /></button>
            </div>
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad">4</button>
              <button type="button" className="btnPad">5</button>
              <button type="button" className="btnPad">6</button>
              <button type="button" className="btnPad bg-color_one not-italic"> - </button>
            </div>
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad">1</button>
              <button type="button" className="btnPad">2</button>
              <button type="button" className="btnPad">3</button>
              <button type="button" className="btnPad bg-color_one not-italic">+</button>
            </div>
            <div className="flex justify-between item-center w-full">
              <button type="button" className="btnPad"><AiOutlinePercentage /></button>
              <button type="button" className="btnPad">0</button>
              <button type="button" className="btnPad">.</button>
              <button type="button" className="btnPad bg-color_two"> = </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
