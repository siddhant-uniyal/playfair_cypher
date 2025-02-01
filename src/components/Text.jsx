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
    setBigramIndex,
  } = useAppContext();
  const bigramPl = createBigramPl(plInput);
  // if(plInput.length === 0) setBigramIndex(-1);
  return (
    <>
      {/* <div id="text" className="w-screen text-center h-[250px] flex flex-col"> */}
      {/* <div id="text" className="flex flex-col border border-red-100 h-[500px]"> */}
      <div id="text" className="flex flex-col h-[300px]">
        <div
          id="key-input"
          className="flex flex-auto justify-center items-center  gap-x-2"
        >
          <label htmlFor="key" className="text-3xl">
            Key:
          </label>
          <input
            type="text"
            id="key"
            name="key"
            className="border border-black rounded-xl text-3xl"
            value={keyInput}
            placeholder="Enter key"
            onChange={(e) =>
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setKeyInput(e.target.value.toUpperCase())
            }
          />
        </div>
        <div
          id="pl-input"
          className="flex flex-auto justify-center items-center  gap-x-2"
        >
          <label htmlFor="plaintext" className="text-3xl">
            Plaintext:
          </label>
          <input
            type="text"
            id="plaintext"
            name="plaintext"
            className="border border-black rounded-xl text-3xl"
            value={plInput}
            placeholder="Enter plaintext"
            onChange={(e) =>
              /^[a-zA-Z]*$/.test(e.target.value) &&
              setPlInput(e.target.value.toUpperCase())
            }
          />
        </div>
      {
        plInput.length ?  (
      <div id="bigram" className="flex flex-auto justify-center items-center  gap-x-2">
        <label htmlFor="bigram-list" className="text-3xl">
          Bigrams:
        </label>
        <span
          id="bigram-list"
          // className="text-center text-xl mt-[30px] flex flex-row gap-x-2 justify-center align-center"
          className="text-center text-xl"
        >
          {bigramPl.map((item, index) => {
            const isSelectedBigram =
              index === bigramIndex || index === bigramIndex + 1;
            return (
              !(index & 1) && (
                <button
                  key={index}
                  onClick={() => setBigramIndex(index)}
                  className={`hover:cursor-pointer ${
                    isSelectedBigram && " text-red-500 font-bold underline"
                  }`}
                >
                  <span className="text-3xl" key={index}>
                    [{item}
                    {bigramPl[index + 1]}]
                  </span>
                </button>
              )
            );
          })}
        </span>
      </div>) : null
      }
        {cipherOutput.length ? (
          <div
            id="ciphertext"
            className="flex flex-auto justify-center items-center  gap-x-2"
          >
            <label htmlFor="ciphertext" className="text-3xl">
              Ciphertext:
            </label>
            {
              // setCipherOutput((prevCipher)=>prevCipher.map((item , index) => (
              //   if(index == bigramIndex)
              // )));
            }
            <span id="ciphertext" className="text-3xl">
              {cipherOutput.split("").map((item, index) => {
                const isCorrespIndex =
                  (bigramIndex >= 0 && index === bigramIndex) ||
                  index === bigramIndex + 1;
                const isFirstIndexBigram =
                  bigramIndex >= 0 && index === bigramIndex;
                const isSecondIndexBigram =
                  bigramIndex >= 0 && index === bigramIndex + 1;
                return (
                  <span
                    key={index}
                    className={
                      isCorrespIndex ? "text-blue-500 underline font-bold" : "text-black"
                    }
                  >
                    {isFirstIndexBigram ? "[" : ""}
                    {item}
                    {isSecondIndexBigram ? "]" : ""}
                  </span>
                );
              })}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Text;
