import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
const N = 5;
function nextChar(key, insert, ptr) {
  if (ptr == key.length) insert = String.fromCharCode(insert.charCodeAt(0) + 1);
  else {
    ++ptr;
    insert = ptr == key.length ? "A" : key[ptr];
  }
  return [insert, ptr];
}
function intializeCells() {
  let cells = [];
  for (let i = 0; i <= N * N; ++i) {
    if (i + 65 == "J".charCodeAt(0)) continue;
    cells.push(String.fromCharCode(65 + i));
  }
  return cells;
}
const App = () => {
  const [keyInput, setKeyInput] = useState("");
  const [plInput, setPlInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");
  const [cells, setCells] = useState(() => intializeCells());
  const [digram , setDigram] = useState(["Y" , "K"]);

  const updateCell = (index, element) => {
    setCells((prevCells) =>
      prevCells.map((item, idx) => (idx == index ? element : item))
    );
  };

  const updateDigram = (str) => {
    setDigram((prevDigram) => prevDigram.map((item , idx) => str[idx]))
  }

  useEffect(() => {
    if (keyInput.length > 0) {
      var matrix = Array.from({ length: N }, () => new Array(N).fill(" "));
      var charToInd = new Array(26).fill(0);
      var ptr = 0,
        vis = 0;
      var insert = " ";
      const club = "J";
      console.log(keyInput, plInput, cipherOutput);
      insert = keyInput[0];
      for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
          while (
            insert == club ||
            vis & (1 << (insert.charCodeAt(0) - "A".charCodeAt(0)))
          )
            [insert, ptr] = nextChar(keyInput, insert, ptr);
          vis |= 1 << (insert.charCodeAt(0) - "A".charCodeAt(0));
          charToInd[insert.charCodeAt(0) - "A".charCodeAt(0)] = i * N + j;
          matrix[i][j] = insert;
          updateCell(i * N + j, insert);
          [insert, ptr] = nextChar(keyInput, insert, ptr);
        }
      }
      charToInd["J".charCodeAt(0) - "A".charCodeAt(0)] =
        charToInd["I".charCodeAt(0) - "A".charCodeAt(0)];
    }
    if(plInput.length > 0){
      var ciphertext = "";
      for (let i = 0; i < plInput.length; ) {
        var f = plInput[i];
        var s = i + 1 == plInput.length ? "X" : plInput[i + 1];
        if (s == f) (s = "X"), ++i;
        else i += 2;
        var fVal = charToInd[f.charCodeAt(0) - "A".charCodeAt(0)];
        var sVal = charToInd[s.charCodeAt(0) - "A".charCodeAt(0)];
        var fX = Math.floor(fVal / N),
          fY = fVal % N;
        var sX = Math.floor(sVal / N),
          sY = sVal % N;
        if (fX == sX) {
          ciphertext += matrix[fX][(fY + 1) % N];
          ciphertext += matrix[sX][(sY + 1) % N];
        } else if (fY == sY) {
          ciphertext += matrix[(fX + 1) % N][fY];
          ciphertext += matrix[(sX + 1) % N][sY];
        } else {
          ciphertext += matrix[fX][sY];
          ciphertext += matrix[sX][fY];
        }
      }
      setCipherOutput(ciphertext);
    
    }
  }, [keyInput, plInput]);

  return (
    <div id="body" className="bg-slate-600 h-screen">
    <div id="inputs" className="mx-auto max-w-[80vw] text-center my-[20px] my-[20px]">
      <label htmlFor="key">Key: </label>
      <input
        type="text"
        id="key"
        name="key"
        className = "border border-black mb-[10px]"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
      />
      <br></br>
      <label htmlFor="plaintext">Plaintext: </label>
      <input
        type="text"
        id="plaintext"
        name="plaintext"
        className = "border border-black mb-[10px]"
        value={plInput}
        onChange={(e) => setPlInput(e.target.value.toUpperCase())}
      />
      <br></br>
      <label htmlFor="ciphertext">Ciphertext: </label>
      <span id="ciphertext">{cipherOutput}</span>
      </div>
      <div
        id="grid"
        className = "grid grid-cols-5 max-w-[20vw] mt-[30px] mx-auto"
      >
        {cells.map((item, index) => (
          <div
            key={index}
            className =  {`border border-black text-center p-[10px] ${index < keyInput.length ? 'bg-yellow-300' : 'bg-white'}`}
          >
            {item}
          </div>
        ))}

      </div>
      <div id="digrams"
        className="mx-auto max-w-[60vw] text-center text-xl mt-[30px]">
        {[...plInput].map((item , index) => {
          if(!(index&1)){
          return <span className="mr-[5px]" key={index}>[{plInput[index]}{index + 1 == plInput.length ? 'X' : plInput[index + 1]}]</span>
          return <span onClick={updateDigram("AB")}className="mr-[5px]" key={index}>[{plInput[index]}{index + 1 == plInput.length ? 'X' : plInput[index + 1]}]</span>
          }
        })}
      </div>
      <div id="digram" className="max-w-[60vw] mx-auto text-center mt-[30px]">
        {
          digram.map((item , index)=>{
            return <span>{item}</span>
          })
        }
      </div>
    </div>

  );
};

export default App;
