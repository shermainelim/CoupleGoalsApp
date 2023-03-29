import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";

const initialState = {

  registerLoading: false,
  
  isRegisterCreated: false,

  checkLoading: false,
  isCheckCreated: false,
};

const name = "appState";

export const register = createAsyncThunk(
  `${name}/register`,
  async ({ id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, secondPersonName, secondPersonEmail, secondPersonPassword }) => {
    try {
      const res = await axios.post("/register", {id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, secondPersonName, secondPersonEmail, secondPersonPassword});

      if (res.status !== 200) {
        alert("Register failed here.");
        return;
      }
      alert(res.data.message);
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
      state.isRegisterCreated = initialState.isCheckCreated;
    },
    completeCheck: (state) => {
      state.isCheckCreated = initialState.isCheckCreated;
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
export const { completeCheck } = appSlice.actions;

export default appSlice.reducer;


//register complete status
export const useRegisterCreated = () =>
  useSelector((state) => state.appState.isRegisterCreated);

  export const useCheckCreated = () =>
  useSelector((state) => state.appState.isCheckCreated);


