import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Text from "./Text";
import Grid from "./Grid";
const N = 5;
const App = () => {
  // const [digram , setDigram] = useState(["Y" , "K"]);


  // const updateDigram = (str) => {
  //   setDigram((prevDigram) => prevDigram.map((item , idx) => str[idx]))
  // }

  const [keyInput , setKeyInput] = useState("");
  const [plInput , setPlInput] = useState("");
  const [cipherOutput , setCipherOutput] = useState("");
  return (
    <div id="body" className="bg-slate-600 h-screen flex flex-col items-center">
    <Text keyInput={keyInput} setKeyInput={setKeyInput} plInput={plInput} setPlInput={setPlInput} cipherOutput={cipherOutput}></Text>
    <Grid keyInput={keyInput} plInput={plInput} setCipherOutput={setCipherOutput}></Grid>
    {/* <div id="body" className="bg-slate-600 h-screen">
      <div id="digrams"
        className="mx-auto max-w-[60vw] text-center text-xl mt-[30px]">
        {
        digramPl.map((item , index) => {
          if(!(index&1))
          return <span className="mr-[5px]" key={index}>[{item}{digramPl[index + 1]}]</span>
          // return <span onClick={updateDigram("AB")}className="mr-[5px]" key={index}>[{plInput[index]}{index + 1 == plInput.length ? 'X' : plInput[index + 1]}]</span>
        })
}
      </div>
      <div id="digram" className="max-w-[60vw] mx-auto text-center mt-[30px]">
        {
          digram.map((item , index)=>{
            return <span>{item}</span>
          })
        }
      </div>
    </div> */}
</div>
  );
};

export default App;
