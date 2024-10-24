import React from "react";
import "./App.css";
import { MainRouter } from "./Routes/MainRouter";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { TestPage } from "./GUI/Account/Pages";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <TestPage />
        </ChakraProvider>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App;
