import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Page from "./components/Page";
import { Provider } from "react-redux";
import { store } from "store";

const App = () => {
  return (
    <Provider store={store}>
      <Page>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Page>
    </Provider>
  );
};

export default App;
