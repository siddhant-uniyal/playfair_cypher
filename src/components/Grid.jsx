import React, { useEffect, useState } from "react";
import useAppContext from "../hooks/use-app-context";
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
  const { keyInput, plInput, setCipherOutput } = useAppContext();
  const N = 5;
  const club = "J";
  const [cells, setCells] = useState(() => intializeCells(N));
  const updateCell = (index, element) => {
    setCells((prevCells) =>
      prevCells.map((item, idx) => (idx == index ? element : item))
    );
  };

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
    <div id="grid" className="grid grid-cols-5 w-[250px] h-[250px]">
      {cells.map((item, index) => (
        <div
          key={index}
          className={`border border-black flex items-center justify-center py-[10px] ${
            index < cleanedKey.length ? "bg-yellow-300" : "bg-slate-400"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Grid;
