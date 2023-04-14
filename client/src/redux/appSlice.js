import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const initialState = {
  loginLoadingFinanceFetch: false,
  financeFetchData: [],
  isLoggedInFinanceFetched: false,
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
  uniqueLoading: false,
  isUniqueCreated: false,
  financePostLoading: false,
  isFinancePostCreated: false,
  goalPostLoading: false,
  isGoalPostCreated: false,
  goalDeleteLoading: false,
  isFinanceDeleteCreated: false,
  financeDeleteLoading: false,
  isSpaceDeleteCreated: false,
  spaceDeleteLoading: false,
  isGoalDeleteCreated: false,
  goalDoneLoading: false,
  isGoalDoneCreated: false,
  checkLoading: false,
  isCheckCreated: false,
};

const name = "appState";
let results = "";

//Finance Fetch
export const fetchFinance = createAsyncThunk(
  `${name}/fetchFinance`,
  async ({ spaceName }) => {
    try {
      const res = await axios.post("/fetchFinance", {
        spaceName,
      });

      if (res.status !== 200) {
        cogoToast.success("Finance fetch failed");
        return;
      }

      if (res.data.message !== "Finance Fetch not found") {
        results = res?.data?.data;

        return results;
      }

      cogoToast.success(res.data.message);
    } catch (err) {
      //alert("Goal Fetch failed");
    }
  }
);

//Goal Fetch
export const fetchGoal = createAsyncThunk(
  `${name}/fetchGoal`,
  async ({ spaceName }) => {
    try {
      const res = await axios.post("/fetchGoal", {
        spaceName,
      });

      if (res.status !== 200) {
        cogoToast.success("Goal Fetch failed");
        return;
      }

      if (res.data.message !== "Goal Fetch not found") {
        results = res?.data?.data;

        return results;
      }

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.success("Goal fetch failed");
    }
  }
);

//login first person
export const loginFirstPerson = createAsyncThunk(
  `${name}/loginFirstPerson`,
  async ({ spaceName, firstPersonEmail, firstPersonPassword }) => {
    try {
      const res = await axios.post("/loginFirstPerson", {
        spaceName,
        firstPersonEmail,
        firstPersonPassword,
      });

      if (res.status !== 200) {
        cogoToast.success("Login failed");
        return;
      }

      if (res.data.message !== "User not found") {
        results = res?.data?.data;

        return results;
      } else if (res.data.message === "User not found") {
        cogoToast.error("User not found");
      } else if (res.data.message === "Login is Successful") {
        cogoToast.success("Login is Successful");
      }
    } catch (err) {
      cogoToast.success("Login failed");
    }
  }
);

//login second person
export const loginSecondPerson = createAsyncThunk(
  `${name}/loginSecondPerson`,
  async ({ spaceName, secondPersonEmail, secondPersonPassword }) => {
    try {
      const res = await axios.post("/loginSecondPerson", {
        spaceName,
        secondPersonEmail,
        secondPersonPassword,
      });

      if (res.status !== 200) {
        cogoToast.error("Login Failed");

        return;
      }

      if (res.data.message !== "User not found") {
        results = res?.data?.data;

        return results;
      } else if (res.data.message === "User not found") {
        cogoToast.error("User not found");
      } else if (res.data.message === "Login is Successful") {
        cogoToast.success("Login is Successful");
      }
    } catch (err) {
      cogoToast.error("Login failed");
    }
  }
);

export const register = createAsyncThunk(
  `${name}/register`,
  async ({
    id,
    spaceName,
    firstPersonName,
    firstPersonEmail,
    firstPersonPassword,
    firstPersonBirthday,
    secondPersonName,
    secondPersonEmail,
    secondPersonPassword,
    secondPersonBirthday,
    anniDate,
  }) => {
    try {
      const res = await axios.post("/register", {
        id,
        spaceName,
        firstPersonName,
        firstPersonEmail,
        firstPersonPassword,
        firstPersonBirthday,
        secondPersonName,
        secondPersonEmail,
        secondPersonPassword,
        secondPersonBirthday,
        anniDate,
      });

      if ((res.data.message === "Error, space not created.")) {
        cogoToast.error("Error, space not created.");
      } else if ((res.data.message === "Space name taken, space not created.")) {
        cogoToast.error("Space name taken, space not created.");
      } else if (
        (res.data.message === "Space name is unique, space created successfully")
      ) {
        cogoToast.success("Space name is unique, space created successfully");
      }
    } catch (err) {
      cogoToast.error("Register failed.");
    }
  }
);

export const checkUnique = createAsyncThunk(
  `${name}/checkUnique`,
  async ({ spaceName }) => {
    try {
      const res = await axios.post("/checkUnique", {
        spaceName,
      });

      console.log("mess", res.data.message);
      if (res.data.message === "unique") {
        cogoToast.success("Space name is unique.");
      }
      if (res.data.message === "taken") {
        cogoToast.error("Space name taken.");
      }
    } catch (err) {
      cogoToast.error("Check failed.");
    }
  }
);

export const goalDone = createAsyncThunk(
  `${name}/goalDone`,
  async ({ status, spaceName, id }) => {
    try {
      const res = await axios.post("/goalDone", { status, spaceName, id });

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.errer("Goal done failed");
    }
  }
);

export const spaceDelete = createAsyncThunk(
  `${name}/spaceDelete`,
  async ({ spaceName }) => {
    try {
      const res = await axios.post("/spaceDelete", { spaceName});

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error("Couple Space delete failed");
    }
  }
);

export const financeDelete = createAsyncThunk(
  `${name}/financeDelete`,
  async ({ spaceName, id }) => {
    try {
      const res = await axios.post("/financeDelete", { spaceName, id });

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error("Finance delete failed");
    }
  }
);

export const goalDelete = createAsyncThunk(
  `${name}/goalDelete`,
  async ({ spaceName, id }) => {
    try {
      const res = await axios.post("/goalDelete", { spaceName, id });

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error("Goal Done failed.");
    }
  }
);

export const financePost = createAsyncThunk(
  `${name}/financePost`,
  async ({ spaceName, id, title, desc, startGoal, currentSaved, endGoal }) => {
    try {
      const res = await axios.post("/financePost", {
        spaceName,
        id,
        title,
        desc,
        startGoal,
        currentSaved,
        endGoal,
      });
      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error("Finance Post failed.");
    }
  }
);

export const goalPost = createAsyncThunk(
  `${name}/goalPost`,
  async ({ spaceName, id, title, status }) => {
    try {
      const res = await axios.post("/goalPost", {
        spaceName,
        id,
        title,
        status,
      });

      cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error("Goal Post failed.");
    }
  }
);

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    completeUnique: (state) => {
      state.isUniqueCreated = initialState.isUniqueCreated;
    },

    completeRegister: (state) => {
      state.isRegisterCreated = initialState.isCheckCreated;
    },
    completeSpaceDelete: (state) => {
      state.firstPersonData = initialState.firstPersonData;
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
    logOutFinanceFetch: (state) => {
      state.financeFetchData = initialState.financeFetchData;
      state.isLoggedInFinanceFetched = initialState.isLoggedInFinanceFetched;
    },
    logOutGoalFetch: (state) => {
      state.goalFetchData = initialState.goalFetchData;
      state.isLoggedInGoalFetched = initialState.isLoggedInGoalFetched;
    },
    logOutFirstPerson: (state) => {
      state.firstPersonData = initialState.firstPersonData;
      state.isLoggedInFirstPerson = initialState.isLoggedInFirstPerson;
    },
    logOutSecondPerson: (state) => {
      state.secondPersonData = initialState.secondPersonData;
      state.isLoggedInSecondPerson = initialState.isLoggedInSecondPerson;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkUnique.fulfilled, (state) => {
      state.is = true;

      state.uniqueLoading = false;
    });
    builder.addCase(checkUnique.pending, (state) => {
      state.uniqueLoading = true;
    });
    builder.addCase(checkUnique.rejected, (state) => {
      state.uniqueLoading = false;
    });

    builder.addCase(register.fulfilled, (state) => {
      state.isUniqueCreated = true;

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

     //space delete
     builder.addCase(spaceDelete.fulfilled, (state) => {
      state.isSpaceDeleteCreated = true;

      state.spaceDeleteLoading = false;
    });
    builder.addCase(spaceDelete.pending, (state) => {
      state.spaceDeleteLoading = true;
    });
    builder.addCase(spaceDelete.rejected, (state) => {
      state.spaceDeleteLoading = false;
    });

    //finance delete
    builder.addCase(financeDelete.fulfilled, (state) => {
      state.isFinanceDeleteCreated = true;

      state.financeDeleteLoading = false;
    });
    builder.addCase(financeDelete.pending, (state) => {
      state.financeDeleteLoading = true;
    });
    builder.addCase(financeDelete.rejected, (state) => {
      state.financeDeleteLoading = false;
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

    //login finance fetch
    builder.addCase(fetchFinance.fulfilled, (state, { payload }) => {
      state.financeFetchData = payload;

      if (payload) {
        state.isLoggedInFinanceFetched = true;
      }

      state.isLoggedInFinanceFetched = false;
    });
    builder.addCase(fetchFinance.pending, (state) => {
      state.loginLoadingFinanceFetch = true;
    });
    builder.addCase(fetchFinance.rejected, (state) => {
      state.loginLoadingFinanceFetch = false;
    });

    //login goal fetch
    builder.addCase(fetchGoal.fulfilled, (state, { payload }) => {
      state.goalFetchData = payload;

      if (payload) {
        state.isLoggedInGoalFetched = true;
      }

      state.isLoggedInGoalFetched = false;
    });
    builder.addCase(fetchGoal.pending, (state) => {
      state.loginLoadingGoalFetch = true;
    });
    builder.addCase(fetchGoal.rejected, (state) => {
      state.loginLoadingGoalFetch = false;
    });

    //login first person
    builder.addCase(loginFirstPerson.fulfilled, (state, { payload }) => {
      state.firstPersonData = payload;

      if (payload) {
        state.isLoggedInFirstPerson = true;
      }

      state.loginLoadingFirstPerson = false;
    });
    builder.addCase(loginFirstPerson.pending, (state) => {
      state.loginLoadingFirstPerson = true;
    });
    builder.addCase(loginFirstPerson.rejected, (state) => {
      state.loginLoadingFirstPerson = false;
    });

    //second person login
    builder.addCase(loginSecondPerson.fulfilled, (state, { payload }) => {
      state.secondPersonData = payload;
      if (payload) {
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
export const { completeIsUnique } = appSlice.actions;
export const { completeGoalDone } = appSlice.actions;
export const { completeGoalDelete } = appSlice.actions;
export const { completeFinanceDelete } = appSlice.actions;
export const { completeSpaceDelete } = appSlice.actions;
export const { completeFinancePost } = appSlice.actions;
export const { completeGoalPost } = appSlice.actions;
export const { completeCheck } = appSlice.actions;
export const { logOutFirstPerson } = appSlice.actions;
export const { logOutSecondPerson } = appSlice.actions;
export const { logOutGoalFetch } = appSlice.actions;
export const { logOutFinanceFetch } = appSlice.actions;

export default appSlice.reducer;

//register complete status
export const useRegisterCreated = () =>
  useSelector((state) => state.appState.isRegisterCreated);

export const useIsUniqueCreated = () =>
  useSelector((state) => state.appState.isUniqueCreated);

export const useGoalDoneCeated = () =>
  useSelector((state) => state.appState.isGoalDeleteCreated);

export const useGoalDeleteCreated = () =>
  useSelector((state) => state.appState.isGoalDeleteCreated);

  export const useSpaceDeleteCreated = () =>
  useSelector((state) => state.appState.isSpaceDeleteCreated);

export const useFinanceDeleteCreated = () =>
  useSelector((state) => state.appState.isFinanceDeleteCreated);

export const useGoalPostedCreated = () =>
  useSelector((state) => state.appState.isGoalPostCreated);

export const useCheckCreated = () =>
  useSelector((state) => state.appState.isCheckCreated);

export const useIsLoggedInGoalFetch = () =>
  useSelector((state) => state.appState.isLoggedInGoalFetched);

export const useIsLoggedInFinanceFetch = () =>
  useSelector((state) => state.appState.isLoggedInFinanceFetched);

export const useGoalFetch = () =>
  useSelector((state) => state.appState.goalFetchData);

export const useFinanceFetch = () =>
  useSelector((state) => state.appState.financeFetchData);

export const useIsLoggedInFirstPerson = () =>
  useSelector((state) => state.appState.isLoggedInFirstPerson);

export const useFirstPerson = () =>
  useSelector((state) => state.appState.firstPersonData);

export const useIsLoggedInSecondPerson = () =>
  useSelector((state) => state.appState.isLoggedInSecondPerson);

export const useSecondPerson = () =>
  useSelector((state) => state.appState.secondPersonData);
