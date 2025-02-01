import React, { useState } from "react";
import useAppContext from "../hooks/use-app-context";
import { createBigramPl } from "../utils/bigram";
const Text = () => {
  const {
    keyInput,
    setKeyInput,
    plInput,
    setPlInput,
    cipherOutput,
    bigramIndex,
    setBigramIndex
  } = useAppContext();
  const bigramPl = createBigramPl(plInput);
  return (
    <>
      <div id="text" className="w-screen text-center h-[250px]">
        <div
          id="key-input"
          className="h-[80px] flex flex-row gap-x-4 justify-center items-center"
        >
          <label htmlFor="key" className="text-4xl">
            Key:
          </label>
          <input
            type="text"
            id="key"
            name="key"
            className="border border-black h-[50px] w-[400px] rounded-xl text-4xl"
            value={keyInput}
            onChange={(e) =>
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setKeyInput(e.target.value.toUpperCase())
            }
          />
        </div>
        <div
          id="pl-input"
          className="h-[80px] flex flex-row gap-x-4 justify-center items-center"
        >
          <label htmlFor="plaintext" className="text-[40px]">
            Plaintext:
          </label>
          <input
            type="text"
            id="plaintext"
            name="plaintext"
            className="border border-black h-[50px] w-[400px] rounded-xl text-[30px]"
            value={plInput}
            onChange={(e) =>
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setPlInput(e.target.value.toUpperCase())
            }
          />
        </div>
        {cipherOutput.length ? (
          <div
            id="ciphertext"
            className="flex flex-row gap-x-4 justify-center items-center"
          >
            <label htmlFor="ciphertext" className="text-[40px]">
              Ciphertext:
            </label>
            {
              // setCipherOutput((prevCipher)=>prevCipher.map((item , index) => (
              //   if(index == bigramIndex)
              // )));
            }
            <span id="ciphertext" className="text-[40px]">
              {cipherOutput.split("").map(
                (item, index) => {
                const isCorrespIndex = bigramIndex >= 0 && index === bigramIndex || index === bigramIndex + 1
                const isFirstIndexBigram = bigramIndex >= 0 && index === bigramIndex;
                const isSecondIndexBigram = bigramIndex >= 0 && index === bigramIndex + 1;
                return (<span
                  key={index}
                  className={
                    isCorrespIndex
                      ? "text-blue-500 underline"
                      : "text-black"
                  }
                >
                  {
                    isFirstIndexBigram ? '[' : ''
                  }
                  {item}
                  {
                    isSecondIndexBigram ? ']' : ''
                  }
                </span>)
            })}
            </span>
          </div>
        ) : null}
      </div>
      
    <div>
      <div
        id="bigrams"
        className="text-center text-xl mt-[30px] flex flex-row gap-x-2 justify-center align-center"
      >
        {
        bigramPl.map(
          (item, index) =>{
          const isSelectedBigram = (index === bigramIndex || index === bigramIndex + 1)
            return !(index & 1) && (
              <button key={index} onClick={()=>setBigramIndex(index)} className={`hover:cursor-pointer ${isSelectedBigram && " text-red-500 font-bold underline"}`}>
                <span className="text-2xl" key={index}>
                  [{item}
                  {bigramPl[index + 1]}]
                </span>
              </button>
            )
      })}
      </div>
    </div>
    </>
  );
};

export default Text;
