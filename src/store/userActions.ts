import { createAction } from "@reduxjs/toolkit";

export const updateUser = createAction<IAuthenticatedUser | null>(
  "user/updateUser"
);
