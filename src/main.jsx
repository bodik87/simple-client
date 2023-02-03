import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddNote } from "./AddNote";
import App from "./App";
import { ChangeNote } from "./ChangeNote";
import "./index.css";
import { NoteItem } from "./NoteItem";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "add",
        element: <AddNote />,
      },
      {
        path: ":id",
        element: <NoteItem />,
      },
      {
        path: ":id/edit",
        element: <ChangeNote />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
