import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Text from "./Text";
import Grid from "./Grid";
import Bigram from "./Bigram";
const App = () => {
  const [keyInput , setKeyInput] = useState("");
  const [plInput , setPlInput] = useState("");
  const [cipherOutput , setCipherOutput] = useState("");
  return (
    <div id="body" className="bg-slate-600 h-screen flex flex-col items-center">
    <Text keyInput={keyInput} setKeyInput={setKeyInput} plInput={plInput} setPlInput={setPlInput} cipherOutput={cipherOutput}></Text>
    <Grid keyInput={keyInput} plInput={plInput} setCipherOutput={setCipherOutput}></Grid>
    <Bigram plInput={plInput}></Bigram>
</div>
  );
};

export default App;
