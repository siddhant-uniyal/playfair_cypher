import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import Text from "./components/Text";
import Grid from "./components/Grid";
import Bigram from "./components/Bigram";
import AppProvider from "./context/app-context";
const App = () => {
  return (
    <div id="body" className="bg-slate-600 h-screen flex flex-col items-center">
      <AppProvider>
        <Text />
        <Grid></Grid>
        <Bigram></Bigram>
      </AppProvider>
    </div>
  );
};

export default App;
