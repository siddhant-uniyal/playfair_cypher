import React from "react";
import "./styles.css";
import Text from "./components/Text";
import Grid from "./components/Grid";
import Bigram from "./components/Bigram";
import AppContextProvider from "./context/app-context";
const App = () => {
  return (
    <div id="body" className="bg-slate-600 h-screen flex flex-col items-center">
      <AppContextProvider>
        <Text />
        <Grid></Grid>
      </AppContextProvider>
      
    </div>
  );
};

export default App;
