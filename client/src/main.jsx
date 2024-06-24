import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Context } from "./context.js";
import UserStore from "./store/UserStore.js";
import DeviceStore from "./store/DeviceStore.js";

// console.log(import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
