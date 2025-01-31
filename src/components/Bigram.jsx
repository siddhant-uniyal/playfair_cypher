import React from "react";
import useAppContext from "../hooks/use-app-context";

const Bigram = () => {
  const { plInput } = useAppContext();
  let bigramPl = [];
  for (let i = 0; i < plInput.length; ) {
    bigramPl.push(plInput[i]);
    if (i + 1 == plInput.length || plInput[i] == plInput[i + 1]) {
      bigramPl.push("X");
      ++i;
    } else {
      bigramPl.push(plInput[i + 1]);
      i += 2;
    }
  }
  return (
    <div>
      <div
        id="bigrams"
        className="text-center text-xl mt-[30px] flex flex-row gap-x-2 justify-center align-center"
      >
        {bigramPl.map((item, index) => {
          if (!(index & 1))
            return (
              <span className="text-2xl" key={index}>
                [{item}
                {bigramPl[index + 1]}]
              </span>
            );
        })}
      </div>
    </div>
  );
};

export default Bigram;
