import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import Swal from 'sweetalert2';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('is_authenticated')) || false,
  status: 'idle',
  error: null,
};

export const loginAsync = createAsyncThunk('auth/loginAsync', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Swal.fire({
      icon: 'success',
      title: 'Successfully logged in!',
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem('is_authenticated', JSON.stringify(true));
    dispatch(setAuthenticated(true));
    return true;
  } catch (error) {
    console.error('Login Error:', error);   
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message || 'An unexpected error occurred.',
      showConfirmButton: true,
    });
    return rejectWithValue(error.message || 'An unexpected error occurred.');
  }
});

export const registerAsync = createAsyncThunk('auth/registerAsync', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Swal.fire({
      icon: 'success',
      title: 'Successfully registered and logged in!',
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem('is_authenticated', JSON.stringify(true));
    dispatch(setAuthenticated(true));
    return true;
  } catch (error) {
    console.error('Registration Error:', error); // Log the error for debugging
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message || 'An unexpected error occurred.',
      showConfirmButton: true,
    });
    return rejectWithValue(error.message || 'An unexpected error occurred.');
  }
});

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, { rejectWithValue, dispatch }) => {
  try {
    await signOut(auth);
    localStorage.clear();
    Swal.fire({
      title: 'Logged out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(setAuthenticated(false));
    return false;
  } catch (error) {
    console.error('Logout Error:', error); 
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.message || 'An unexpected error occurred.',
      showConfirmButton: true,
    });
    return rejectWithValue(error.message || 'An unexpected error occurred.');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = 'succeeded';
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;