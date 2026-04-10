import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import theme from '../../config/theme';

/**
 * =========================
 * LOGIN (Email OR Phone)
 * =========================
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      if (!phone || !password) {
        return rejectWithValue('Phone and password are required');
      }

      const res = await api.post('/user/signin', { phone, password, role: theme.defaultRole });

      return {
        token: res.data.token,
        user: {
          ...res.data.user,
          role: res.data.user?.role?.toLowerCase() || 'fpo',
        },
        profile: res.data.profile || null,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Login failed'
      );
    }
  }
);


