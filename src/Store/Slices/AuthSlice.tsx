import { noUnrecognized } from "zod";
import { User, UserCreationRequest, UserLoginRequest } from "../../Model/User";
import { Role } from "../../Model/Enums/Role";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  authenticate,
  createNewUser,
  getUserInfo,
  logout,
} from "../../API/UserApi";
import { userInfo } from "os";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  role: Role | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  role: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: UserCreationRequest) => {
    const response = await createNewUser(user);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authenticate(email, password);
    const auth = response.data;

    const accessToken = auth.token.toString();

    localStorage.setItem("accessToken", accessToken);

    const userInfo = await getUserInfo(accessToken);
    const user = userInfo.data;
    console.log(user);
    const roles = user.roles;

    //console.log(user);
    //console.log(roles);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", JSON.stringify(roles));

    return { response, accessToken, user, roles };
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ token }: { token: string | null }) => {
    const result = await logout({ token });
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticatedAction: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            user: User;
            roles: Role;
          }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.role = action.payload.roles;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
        state.role = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { authenticatedAction } = authSlice.actions;
export default authSlice.reducer;
