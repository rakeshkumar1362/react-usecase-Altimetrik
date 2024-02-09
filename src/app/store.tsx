import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "../slices/vehicleSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    app: vehicleReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
