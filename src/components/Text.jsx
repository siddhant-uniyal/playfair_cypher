import React, { useState } from "react";
const Text = ({ keyInput, setKeyInput, plInput, setPlInput, cipherOutput }) => {
  return (
    <>
      <div id="text" className="w-[100vw] text-center h-[250px]">
        <div
          id="key-input"
          className="h-[80px] flex flex-row gap-x-4 justify-center items-center"
        >
          <label htmlFor="key" className="text-[40px]">
            Key:
          </label>
          <input
            type="text"
            id="key"
            name="key"
            className="border border-black h-[50px] w-[400px] rounded-xl text-[30px]"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
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
            onChange={(e) => setPlInput(e.target.value.toUpperCase())}
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
            <span id="ciphertext" className="text-[40px]">
              {cipherOutput}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Text;
