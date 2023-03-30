import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";


const initialState = {
  loginLoadingFirstPerson: false,
  firstPersonData: [],
  isLoggedInFirstPerson: false,
  loginLoadingSecondPerson: false,
  secondPersonData: [],
  isLoggedInSecondPerson: false,
  registerLoading: false,
  isFirstPersonChecked: false,
  isRegisterCreated: false,

  checkLoading: false,
  isCheckCreated: false,
};

const name = "appState";
let results =""

//login first person
export const loginFirstPerson = createAsyncThunk(
  `${name}/loginFirstPerson`,
  async ({ spaceName, firstPersonEmail, firstPersonPassword }) => {
    try {
      const res = await axios.post("/loginFirstPerson", {
        spaceName, firstPersonEmail, firstPersonPassword
      });

      if (res.status !== 200) {
        alert("Login failed here.");
        return ;
      }

      if(res.data.message !=="User not found"){
       results=res?.data?.data[0];
        console.log("connected message", results)
     
        return results;
      }
     
      alert(res.data.message);

    } catch (err) {
      alert("Login failed");
    }
  }
);


//login second person
export const loginSecondPerson = createAsyncThunk(
  `${name}/loginSecondPerson`,
  async ({ spaceName, secondPersonEmail, secondPersonPassword }) => {
    try {
      const res = await axios.post("/loginSecondPerson", {
        spaceName, secondPersonEmail, secondPersonPassword
      });

      if (res.status !== 200) {
        alert("Login failed here.");
        return ;
      }

      if(res.data.message !=="User not found"){
       results=res?.data?.data[0];
        console.log("connected message", results)
     
        return results;
      }
     
      alert(res.data.message);

    } catch (err) {
      alert("Login failed");
    }
  }
);


export const register = createAsyncThunk(
  `${name}/register`,
  async ({ id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, firstPersonBirthday,secondPersonName, secondPersonEmail, secondPersonPassword , secondPersonBirthday, anniDate}) => {
    try {
      const res = await axios.post("/register", {id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, firstPersonBirthday,secondPersonName, secondPersonEmail, secondPersonPassword , secondPersonBirthday, anniDate});

      alert(res.data.message);
    } catch (err) {
      alert("err", err)
      alert("Register failed.");
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
    logOutFirstPerson: (state) => {

      state.firstPersonData= initialState.firstPersonData;
      state.isLoggedInFirstPerson = initialState.isLoggedInFirstPerson;
      state.isFirstPersonChecked = initialState.isFirstPersonChecked;
    },
    logOutSecondPerson: (state) => {

      state.secondPersonData= initialState.secondPersonData;
      state.isLoggedInSecondPerson = initialState.isLoggedInSecondPerson;
      state.isSecondPersonChecked = initialState.isSecondPersonChecked;
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

   //login first person
   builder.addCase(loginFirstPerson.fulfilled, (state , { payload }) => {
   state.firstPersonData= payload;

   //console.log("data", state.firstPersonData.id)
   console.log("firstPersonData payload", payload)

   if(payload){
    state.isLoggedInFirstPerson = true;
   }
      console.log("hit here")
    
    state.loginLoadingFirstPerson = false;
  });
  builder.addCase(loginFirstPerson.pending, (state) => {
    state.loginLoadingFirstPerson = true;
    console.log("hit here2")
  });
  builder.addCase(loginFirstPerson.rejected, (state) => {
    state.loginLoadingFirstPerson = false;
    console.log("hit here3")
  });

 //second person login
   builder.addCase(loginSecondPerson.fulfilled, (state , { payload }) => {
    state.secondPersonData= payload;

 
    if(payload){
     state.isLoggedInSecondPerson = true;
    }     
     state.loginLoadingSecondPerson = false;
   });
   builder.addCase(loginSecondPerson.pending, (state) => {
     state.loginLoadingSecondPerson = true;

   });
   builder.addCase(loginSecondPerson.rejected, (state) => {
     state.loginLoadingSecondPerson = false;
   });
  },
});

// each case under reducers becomes an action

export const { completeRegister } = appSlice.actions;
export const { completeCheck } = appSlice.actions;
export const { logOutFirstPerson } = appSlice.actions;
export const { logOutSecondPerson } = appSlice.actions;

export default appSlice.reducer;


//register complete status
export const useRegisterCreated = () =>
  useSelector((state) => state.appState.isRegisterCreated);

  export const useCheckCreated = () =>
  useSelector((state) => state.appState.isCheckCreated);


  export const useIsLoggedInFirstPerson = () =>
  useSelector((state) => state.appState.isLoggedInFirstPerson);

  export const useFirstPerson = () => useSelector((state) => state.appState.firstPersonData);

  export const useIsLoggedInSecondPerson = () =>
  useSelector((state) => state.appState.isLoggedInSecondPerson);

  export const useSecondPerson = () => useSelector((state) => state.appState.secondPersonData);