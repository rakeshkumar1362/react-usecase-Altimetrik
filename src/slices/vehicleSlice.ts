import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { vehiclesData } from "../data/vehicle-list";

type InitialState = {
  vehiclesData: {
    id: Number;
    model: String;
    yearOfManufacture: String;
    kms: String;
    noOfOwners: String;
    externalFitments: String;
    color: String;
    insuranceValidity: String;
    location: String;
    transmission: String;
  }[];
  loading: Boolean;
  error?: null;
};

// Action: Writting data into json file
export const createCar = createAsyncThunk(
  "createCar",
  async (data: {}, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8080/carRecords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Action: getting data from json file
export const showCar = createAsyncThunk("showCar", async () => {
  const response = await fetch("http://localhost:8080/carRecords");
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
});

const initialState: InitialState = {
  vehiclesData: [],
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createCar.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.vehiclesData.push(action.payload);
      }
    );
    builder.addCase(showCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showCar.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.vehiclesData = action.payload;
    });
  },
});

export default vehicleSlice.reducer;
