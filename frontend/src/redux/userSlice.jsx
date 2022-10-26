import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

export const login = createAsyncThunk(
  "user/login",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.post(url + "login", val, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.post(url + "register", val, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (val, { rejectWithValue }) => {
    try {
      const res = await axios.post(url + "logout", val, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      console.log("error.response.data: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {
          name: "",
          email: "",
          password: "",
        },
    userPending: null,
    userError: false,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.userPending = true;
      state.userError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.userPending = false;
      state.userError = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      alert("Successfully Logged In");
    },
    [login.rejected]: (state) => {
      state.userInfo.email = "";
      state.userPending = null;
      state.userError = true;
      alert("Wrong email or wrong password.");
    },

    [register.pending]: (state) => {
      state.userPending = true;
      state.userError = false;
    },
    [register.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.userPending = false;
      state.userError = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      alert("Successfully Registered");
    },
    [register.rejected]: (state) => {
      state.userInfo.email = "";
      state.userPending = null;
      state.userError = true;
      alert(
        "Email already existed.Change email.\n Đã có email này rồi.Hãy thay email khác."
      );
    },

    [logout.fulfilled]: (state) => {
      state.userInfo = {
        name: "",
        email: "",
        password: "",
      };
      localStorage.clear();
      state.userPending = false;
    },
  },
});

export default userSlice.reducer;
