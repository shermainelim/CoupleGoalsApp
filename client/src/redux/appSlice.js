import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";

const initialState = {

  registerLoading: false,
  
  isRegisterCreated: false,
};

const name = "appState";

export const register = createAsyncThunk(
  `${name}/register`,
  async ({ username, password }) => {
    console.log("all", username,password)
    try {
      const res = await axios.post("/register", {
        username,
        password
      });

      if (res.status !== 200) {
        alert("Register failed here.");
        return;
      }

      alert("Register successful");
    } catch (err) {
      alert("err", err)
      alert("Register failed 2.");
    }
  }
);

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    completeRegister: (state) => {
      state.isRegisterCreated = initialState.isRegisterCreated;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state) => {
      state.isRegisterCreated = true;

      state.registerLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.registerLoading = false;
    });

  },
});

// each case under reducers becomes an action

export const { completeRegister } = appSlice.actions;

export default appSlice.reducer;


//register complete status
export const useRegisterCreated = () =>
  useSelector((state) => state.appState.isRegisterCreated);


