import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [keyInput, setKeyInput] = useState("");
  const [plInput, setPlInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");
  const [bigramIndex , setBigramIndex] = useState(25);

  return (
    <AppContext.Provider
      value={{
        keyInput,
        setKeyInput,
        plInput,
        setPlInput,
        cipherOutput,
        setCipherOutput,
        bigramIndex,
        setBigramIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
