import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// REDUX
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { getTaches } from "./actions/tache.action";
import { getAllTachesAPI, getTachesAPI } from "./actions/API_taches";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
const user = JSON.parse(localStorage.getItem("login"));
let privilege = user?.privilege;
if (privilege === "Admin") {
  store.dispatch(getAllTachesAPI());
} else {
  store.dispatch(getTachesAPI());
}

store.dispatch(getTaches());
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
