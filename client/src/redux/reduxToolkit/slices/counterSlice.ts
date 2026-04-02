import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  isLoading: boolean;
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
};

// Async thunks
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount: number) => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(amount);
      }, 1000);
    });
  }
);

export const decrementAsync = createAsyncThunk(
  'counter/decrementAsync',
  async (amount: number) => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(-amount);
      }, 1000);
    });
  }
);

// Counter slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(decrementAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value += action.payload;
      })
      .addCase(decrementAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
