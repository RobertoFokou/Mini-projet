import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// REDUX
import { Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { getTaches } from "./actions/tache.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getTaches());
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
