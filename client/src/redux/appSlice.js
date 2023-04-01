import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";


const initialState = {
  loginLoadingGoalFetch: false,
  goalFetchData: [],
  isLoggedInGoalFetched: false,
  loginLoadingFirstPerson: false,
  firstPersonData: [],
  isLoggedInFirstPerson: false,
  loginLoadingSecondPerson: false,
  secondPersonData: [],
  isLoggedInSecondPerson: false,
  registerLoading: false,
  isRegisterCreated: false,
  financePostLoading: false,
  isFinancePostCreated: false,
  goalPostLoading: false,
  isGoalPostCreated: false,
  goalDeleteLoading: false,
  isGoalDeleteCreated: false,
  goalDoneLoading: false,
  isGoalDoneCreated: false,
  checkLoading: false,
  isCheckCreated: false,
};

const name = "appState";
let results =""


//Goal Fetch
export const fetchGoal = createAsyncThunk(
  `${name}/fetchGoal`,
  async ({ spaceName }) => {
    try {
      const res = await axios.post("/fetchGoal", 
      {
        spaceName
      });

      if (res.status !== 200) {
        alert("Goal Fetch failed here.");
        return ;
      }

      if(res.data.message !=="Goal Fetch not found"){
       results=res?.data?.data;
        console.log("connected Goal Fetch message", results)
     
        return results;
      }
     
      alert(res.data.message);

    } catch (err) {
      //alert("Goal Fetch failed");
    }
  }
);



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
       results=res?.data?.data;
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
        results=res?.data?.data;
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


export const goalDone = createAsyncThunk(
  `${name}/goalDone`,
  async ({  status ,spaceName, id}) => {
    try {
      const res = await axios.post("/goalDone", { status ,spaceName, id});

      alert(res.data.message);
    } catch (err) {
    
      alert("Goal done failed.");
    }
  }
);


export const goalDelete = createAsyncThunk(
  `${name}/goalDelete`,
  async ({ spaceName, id }) => {
    try {
      const res = await axios.post("/goalDelete", {spaceName, id});

      alert(res.data.message);
    } catch (err) {
    
      alert("Goal Delete failed.");
    }
  }
);

export const financePost = createAsyncThunk(
  `${name}/financePost`,
  async ({ spaceName, id , title, desc, startGoal, currentSaved, endGoal}) => {
   console.log("finance post" , spaceName, id , title, desc, startGoal, currentSaved, endGoal)
    try {
      //const res = await axios.post("/financePost", {spaceName, id , title, desc, startGoal, currentSaved, endGoal});
      //alert(res.data.message);
     
    const res = await axios.post("/financePost", {spaceName, id , title, desc, startGoal, currentSaved, endGoal});
    alert(res.data.message);

    } catch (err) {
     
      alert("Finance Post failed.");
    }
  }
);

export const goalPost = createAsyncThunk(
  `${name}/goalPost`,
  async ({ spaceName, id , title, status}) => {
    try {
      const res = await axios.post("/goalPost", {spaceName, id , title, status});

      alert(res.data.message);
    } catch (err) {
     
      alert("Goal Post failed.");
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
    completeDeletePost: (state) => {
      state.isGoalDeleteCreated = initialState.isGoalDeleteCreated;
    },
    completeFinancePost: (state) => {
      state.isFinancePostCreated = initialState.isFinancePostCreated;
    },
    completeGoalPost: (state) => {
      state.isGoalPostCreated = initialState.isGoalPostCreated;
    },
    completeCheck: (state) => {
      state.isCheckCreated = initialState.isCheckCreated;
    },
    logOutGoalFetch: (state) => {

      state.goalFetchData= initialState.goalFetchData;
      state.isLoggedInGoalFetched = initialState.isLoggedInGoalFetched;

    },
    logOutFirstPerson: (state) => {

      state.firstPersonData= initialState.firstPersonData;
      state.isLoggedInFirstPerson = initialState.isLoggedInFirstPerson;

    },
    logOutSecondPerson: (state) => {

      state.secondPersonData= initialState.secondPersonData;
      state.isLoggedInSecondPerson = initialState.isLoggedInSecondPerson;
      
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


      //goal done
  builder.addCase(goalDone.fulfilled, (state) => {
    state.isGoalDoneCreated = true;

    state.goalDoneLoading = false;
  });
  builder.addCase(goalDone.pending, (state) => {
    state.goalDoneLoading = true;
  });
  builder.addCase(goalDone.rejected, (state) => {
    state.goalDoneLoading = false;
  });

  //goal delete
  builder.addCase(goalDelete.fulfilled, (state) => {
    state.isGoalDeleteCreated = true;

    state.goalDeleteLoading = false;
  });
  builder.addCase(goalDelete.pending, (state) => {
    state.goalDeleteLoading = true;
  });
  builder.addCase(goalDelete.rejected, (state) => {
    state.goalDeleteLoading = false;
  });

  //finance post
  builder.addCase(financePost.fulfilled, (state) => {
    state.isFinancePostCreated = true;

    state.financePostLoading = false;
  });
  builder.addCase(financePost.pending, (state) => {
    state.financePostLoading = true;
  });
  builder.addCase(financePost.rejected, (state) => {
    state.financePostLoading = false;
  });

    //goal post
    builder.addCase(goalPost.fulfilled, (state) => {
      state.isGoalPostCreated = true;

      state.goalPostLoading = false;
    });
    builder.addCase(goalPost.pending, (state) => {
      state.goalPostLoading = true;
    });
    builder.addCase(goalPost.rejected, (state) => {
      state.goalPostLoading = false;
    });

    //login goal fetch
   builder.addCase(fetchGoal.fulfilled, (state , { payload }) => {
    state.goalFetchData= payload;

    console.log("fetch goal payload", payload)
 
    if(payload){
     state.isLoggedInGoalFetched = true;
    }
       console.log("hit here")
     
     state.isLoggedInGoalFetched = false;
   });
   builder.addCase(fetchGoal.pending, (state) => {
     state.loginLoadingGoalFetch = true;
     console.log("hit here2")
   });
   builder.addCase(fetchGoal.rejected, (state) => {
     state.loginLoadingGoalFetch = false;
     console.log("hit here3")
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
export const { completeGoalDone } = appSlice.actions;
export const { completeGoalDelete } = appSlice.actions;
export const { completeGoalPost } = appSlice.actions;
export const { completeCheck } = appSlice.actions;
export const { logOutFirstPerson } = appSlice.actions;
export const { logOutSecondPerson } = appSlice.actions;
export const { logOutGoalFetch } = appSlice.actions;

export default appSlice.reducer;


//register complete status
export const useRegisterCreated = () =>
  useSelector((state) => state.appState.isRegisterCreated);

  export const useGoalDoneCeated = () =>
  useSelector((state) => state.appState.isGoalDeleteCreated);

  export const useGoalDeleteCreated = () =>
  useSelector((state) => state.appState.isGoalDeleteCreated);

  export const useGoalPostedCreated = () =>
  useSelector((state) => state.appState.isGoalPostCreated);

  export const useCheckCreated = () =>
  useSelector((state) => state.appState.isCheckCreated);

  export const useIsLoggedInGoalFetch = () =>
  useSelector((state) => state.appState.isLoggedInGoalFetched);

  export const useGoalFetch = () => useSelector((state) => state.appState.goalFetchData);

  export const useIsLoggedInFirstPerson = () =>
  useSelector((state) => state.appState.isLoggedInFirstPerson);

  export const useFirstPerson = () => useSelector((state) => state.appState.firstPersonData);

  export const useIsLoggedInSecondPerson = () =>
  useSelector((state) => state.appState.isLoggedInSecondPerson);

  export const useSecondPerson = () => useSelector((state) => state.appState.secondPersonData);