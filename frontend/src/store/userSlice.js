import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  email: "",
  password: "",
  auth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, username, email, password, auth } = action.payload;
      state._id = _id;
      state.username = username;
      state.email = email;
      state.password = password;
      state.auth = auth;
    },
    reSetUser: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
      state.password = "";
      state.auth = false;
    },
  },
});
export const { setUser, reSetUser } = userSlice.actions;

export default userSlice.reducer;