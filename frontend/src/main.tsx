import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { ParamContextProvider } from "./Context/SearchParam.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <ParamContextProvider>
          <App />
        </ParamContextProvider>
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);
