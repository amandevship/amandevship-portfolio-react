# Redux-Thunk for reduxTraditional

## Overview
This folder contains Redux-Thunk action creators for handling asynchronous operations. Thunks provide an alternative to Redux-Saga for simpler async logic and side effects.

## When to Use Thunks vs Sagas

| Feature | Thunks | Sagas |
|---------|--------|-------|
| Simplicity | ✅ Simple & quick | More complex setup |
| API Calls | ✅ Great for single calls | Better for complex flows |
| Cancellation | ⚠️ Manual | ✅ Built-in |
| Testing | ✅ Easy | Requires saga test utils |
| Multiple Effects | Fixed logic | ✅ Very flexible |

## Available Thunks

### incrementAsyncThunk
Increments counter after 1 second delay using setTimeout.
```typescript
dispatch(incrementAsyncThunk(5)); // Increment by 5 after 1s
```

### decrementAsyncThunk
Decrements counter after 1 second delay using setTimeout.
```typescript
dispatch(decrementAsyncThunk(3)); // Decrement by 3 after 1s
```

### incrementAsyncFromAPI
Simulates an API call with async/await syntax.
```typescript
dispatch(incrementAsyncFromAPI(10)); // Await 1.5s then increment by 10
```

### incrementByBatchThunk
Increments counter multiple times at intervals.
```typescript
dispatch(incrementByBatchThunk(5, 500)); // Increment 5 times, 500ms apart
```

## Usage Example

```typescript
import { useAppDispatch, useAppSelector } from '@/redux/reduxTraditional/store';
import { 
  incrementAsyncThunk,
  incrementAsyncFromAPI,
  incrementByBatchThunk
} from '@/redux/reduxTraditional/thunks';

function CounterComponent() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector(state => state.counter);

  return (
    <div>
      <p>Count: {value}</p>
      
      {/* Simple thunk with timeout */}
      <button onClick={() => dispatch(incrementAsyncThunk(5))}>
        Increment Async (Thunk)
      </button>

      {/* API call simulation */}
      <button onClick={() => dispatch(incrementAsyncFromAPI(10))}>
        Increment from API
      </button>

      {/* Batch increment */}
      <button onClick={() => dispatch(incrementByBatchThunk(3, 300))}>
        Batch Increment
      </button>
    </div>
  );
}
```

## Creating New Thunks

1. Add new thunk to `counterThunks.ts`:
```typescript
export const myCustomThunk = (param: string) => {
  return (dispatch: AppDispatch) => {
    // Your async logic here
    dispatch(someAction());
  };
};
```

2. Export it from `index.ts`:
```typescript
export { myCustomThunk } from './counterThunks';
```

3. Use in your component as shown above

## Thunk Signature
```typescript
(param: Type) => (dispatch: AppDispatch) => void
```

## Notes
- Thunks receive `dispatch` and optionally `getState` from Redux-Thunk middleware
- Thunks can be used alongside Sagas in the same store
- Both middleware (thunk and saga) work together when enabled
- For load state tracking with thunks, manually dispatch additional actions
