import React, { useEffect, useRef, useState } from "react";
import useAppContext from "../hooks/use-app-context";
import { createBigramPl } from "../utils/bigram";
function nextChar(key, insert, ptr) {
  if (ptr == key.length) insert = String.fromCharCode(insert.charCodeAt(0) + 1);
  else {
    ++ptr;
    if (ptr == key.length) {
      insert = "A";
    } else {
      insert = key[ptr];
    }
  }
  return [insert, ptr];
}
function intializeCells(N) {
  let cells = [];
  for (let i = 0; i <= N * N; ++i) {
    if (i + 65 == "J".charCodeAt(0)) continue;
    cells.push(String.fromCharCode(65 + i));
  }
  return cells;
}
const Grid = () => {
  const { keyInput, plInput, setCipherOutput, bigramIndex, cipherOutput } =
    useAppContext();
  // console.log(bigramIndex);
  const bigramPl = createBigramPl(plInput);
  const N = 5;
  const club = "J";
  const f = bigramPl[bigramIndex] == 'J' ? 'I' : bigramPl[bigramIndex],
    s = bigramPl[bigramIndex + 1] == 'J' ? 'I' : bigramPl[bigramIndex + 1];

  // console.log({ f, s });
  const [cells, setCells] = useState(() => intializeCells(N));
  const updateCell = (index, element) => {
    setCells((prevCells) =>
      prevCells.map((item, idx) => (idx == index ? element : item))
    );
  };
  // const canvasRef = useRef();

  // useEffect(()=>{
  //   const ctx = canvasRef.current.getContext("2d");
  //   ctx.clearRect(0 , 0 , 500 , 500);
  //   for(let i = 0 ; i < 2 ; ++i){
  //     const offsetY = i ? 20 : -20;
  //     let ff = bigramPl[bigramIndex + i] , ss = cipherOutput[bigramIndex + i]
  //   // s = cipherOutput[bigramIndex]
  //   // let ff = f , ss = cipherOutput[bigramIndex]
  //   // let fff = s , sss = cipherOutput[bigramIndex + 1]
  //   // console.log({ff , ss , fff , sss})
  //   // console.log({ff , ss})
  //   let fX , fY , sX , sY;
  //   for(let i = 0 ; i < N*N ; ++i){
  //     if(cells[i] === ff){
  //       fX = document.getElementById(`cell-${i}`).getBoundingClientRect().x - canvasRef.current.getBoundingClientRect().x;
  //       fY = document.getElementById(`cell-${i}`).getBoundingClientRect().y - canvasRef.current.getBoundingClientRect().y;
  //       // fX = document.getElementById(`cell-${i}`).getBoundingClientRect().x
  //       // fY = document.getElementById(`cell-${i}`).getBoundingClientRect().y
  //     }
  //     else if(cells[i] === ss){
  //       sX = document.getElementById(`cell-${i}`).getBoundingClientRect().x - canvasRef.current.getBoundingClientRect().x;
  //       sY = document.getElementById(`cell-${i}`).getBoundingClientRect().y - canvasRef.current.getBoundingClientRect().y;
  //       // sX = document.getElementById(`cell-${i}`).getBoundingClientRect().x
  //       // sY = document.getElementById(`cell-${i}`).getBoundingClientRect().y
  //     }
  //   }
  //   // console.log({fX , fY , sX , sY});
  //   // const canvas = document.getElementById
  //   // ctx.clearRect(0 , 0 , 500 , 500);
  //   ctx.beginPath();
  //   //i = 0 -> y - 20
  //   //i = 1 -> y + 20
  //   ctx.moveTo(fX + 60, fY + offsetY );
  //   ctx.lineTo(sX + 60, sY + offsetY);
  //   ctx.stroke();
  // }
  // } , [bigramIndex])

  let cleanedKey = [
    ...new Set(keyInput.replace(new RegExp(club, "g"), "I")),
  ].join("");

  useEffect(() => {
    var matrix = Array.from({ length: N }, () => new Array(N).fill(" "));
    var charToInd = new Array(26).fill(0);
    var ptr = 0,
      vis = 0;
    var insert = " ";
    insert = cleanedKey.length ? cleanedKey[0] : "A";
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        while (
          insert == club ||
          vis & (1 << (insert.charCodeAt(0) - "A".charCodeAt(0)))
        )
          [insert, ptr] = nextChar(cleanedKey, insert, ptr);
        vis |= 1 << (insert.charCodeAt(0) - "A".charCodeAt(0));
        charToInd[insert.charCodeAt(0) - "A".charCodeAt(0)] = i * N + j;
        matrix[i][j] = insert;
        updateCell(i * N + j, insert);
        [insert, ptr] = nextChar(cleanedKey, insert, ptr);
      }
    }
    charToInd["J".charCodeAt(0) - "A".charCodeAt(0)] =
      charToInd["I".charCodeAt(0) - "A".charCodeAt(0)];
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
  }, [keyInput, plInput]);

  return (
    <div id="grid" className="grid grid-cols-5 size-[250px] relative">
      {/* <canvas ref={canvasRef} className="absolute top-0 right-0 size-full" /> */}
      {cells.map((item, index) => {
        const isSelectedBigram = (item === f || item === s) && bigramIndex >= 0;
        const keyFinished = index < cleanedKey.length;
        const isTargetCell =
          (item === cipherOutput[bigramIndex] ||
            item === cipherOutput[bigramIndex + 1]) &&
          bigramIndex >= 0;
        const isFirstIndexBigram = item === f && bigramIndex >= 0;
        const isSecondIndexBigram = item === s && bigramIndex >= 0;
        const isFirstIndexTarget = bigramIndex >= 0 && item === cipherOutput[bigramIndex];
        const isSecondIndexTarget = bigramIndex >= 0 && item === cipherOutput[bigramIndex + 1];
        return (
          <div
            key={index}
            id={`cell-${index}`}
            className={
              `border border-black flex items-center justify-center py-[10px] relative text-xl 
              ${
                keyFinished ? "bg-green-200" : "bg-slate-400"
              }
              ${
                isSelectedBigram && " border-[2px] border-red-600 text-red-600"
              }
              ${
                isTargetCell && " border-[2px] border-blue-700 text-blue-700"
              }
              `
            }
          >
            {item}
          {
            isSelectedBigram && isTargetCell && (<div className="absolute inset-[1px] border-[2px] border-blue-700"></div>)
          }
          {
            isSelectedBigram && isFirstIndexBigram && (<span className="absolute top-[0%] right-[0%] bottom-[70%] left-[80%] text-xs">1</span>)
          }
          {
            isSelectedBigram && isSecondIndexBigram && (<span className="absolute top-[0%] right-[0%] bottom-[70%] left-[80%] text-xs">2</span>)
          }
          {
            isTargetCell && isFirstIndexTarget && (<span className="absolute top-[60%] right-[0%] bottom-[0%] left-[10%] text-xs text-blue-700">1</span>)
          }
          {
            isTargetCell && isSecondIndexTarget && (<span className="absolute top-[60%] right-[0%] bottom-[0%] left-[10%] text-xs text-blue-700">2</span>)
          }
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
