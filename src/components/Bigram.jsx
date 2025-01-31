import React from "react";
import useAppContext from "../hooks/use-app-context";
import { createBigramPl } from "../utils/bigram";

const Bigram = () => {
  const { plInput , setBigramIndex , bigramIndex} = useAppContext();

  const bigramPl = createBigramPl(plInput);

  return (
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
  );
};

export default Bigram;
