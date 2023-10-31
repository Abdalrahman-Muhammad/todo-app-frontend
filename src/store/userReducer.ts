import { createReducer } from "@reduxjs/toolkit";
import { updateUser } from "./userActions";

interface IUserState {
  user: IAuthenticatedUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateUser, (state, action) => {
    state.user = action.payload;
  });
});
export default userReducer;
