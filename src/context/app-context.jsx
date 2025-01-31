import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [keyInput, setKeyInput] = useState("");
  const [plInput, setPlInput] = useState("");
  const [cipherOutput, setCipherOutput] = useState("");

  return (
    <AppContext.Provider
      value={{
        keyInput,
        setKeyInput,
        plInput,
        setPlInput,
        cipherOutput,
        setCipherOutput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
