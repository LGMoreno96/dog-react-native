import React from "react";
import store from "./store";
import Navigation from "./navigation";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
