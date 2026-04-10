import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/authThunk';
import { getToken, setToken, clearToken } from '../../lib/tokenStorage';

// ✅ SAFE JSON PARSER
const safeParse = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (!value || value === 'undefined') return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const rawToken = getToken();
const validToken = rawToken && rawToken !== 'undefined' ? rawToken : null;

const initialState = {
  token: validToken,
  user: safeParse('user'),
  profile: safeParse('profile'),
  isAuthenticated: !!validToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
      clearToken();
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
    },

    clearAuthState: (state) => {
      state.error = null;
      state.registerSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user, profile } = action.payload;

        if (!token) {
          state.loading = false;
          state.error = 'Login failed: no token received';
          return;
        }

        state.loading = false;
        state.token = token;
        state.user = user;
        state.profile = profile;
        state.isAuthenticated = true;

        setToken(token);
        localStorage.setItem('user', JSON.stringify(user ?? null));
        localStorage.setItem('profile', JSON.stringify(profile ?? null));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

;
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
