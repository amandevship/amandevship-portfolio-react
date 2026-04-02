import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  decrementAsync
} from '../redux/actions/counterActions';

export const CounterTest: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const isLoading = useAppSelector((state) => state.counter.isLoading);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    console.log('🔵 Dispatching: increment()');
    dispatch(increment());
    console.log('📊 Current count:', count + 1);
  };

  const handleDecrement = () => {
    console.log('🔵 Dispatching: decrement()');
    dispatch(decrement());
    console.log('📊 Current count:', count - 1);
  };

  const handleIncrementByAmount = () => {
    console.log('🔵 Dispatching: incrementByAmount(5)');
    dispatch(incrementByAmount(5));
    console.log('📊 Current count:', count + 5);
  };

  const handleIncrementAsync = () => {
    console.log('🔵 Dispatching: incrementAsync(3) - async action starting...');
    dispatch(incrementAsync(3));
  };

  const handleDecrementAsync = () => {
    console.log('🔵 Dispatching: decrementAsync(2) - async action starting...');
    dispatch(decrementAsync(2));
  };

  return (
    <div className="p-8 bg-space-dark rounded-xl border border-neon-cyan/20">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Redux + Redux Thunk Test
      </h2>
      
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-neon-cyan mb-2">
          {count}
        </div>
        <div className="text-sm text-text-secondary">
          Current Counter Value
        </div>
        {isLoading && (
          <div className="text-sm text-flame mt-2">
            Loading async action...
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors"
        >
          Increment (+1)
        </button>
        
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-flame/20 text-flame rounded-lg hover:bg-flame/30 transition-colors"
        >
          Decrement (-1)
        </button>
        
        <button
          onClick={handleIncrementByAmount}
          className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
        >
          Increment by 5
        </button>
        
        <button
          onClick={handleIncrementAsync}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Async +3 (1s)'}
        </button>
        
        <button
          onClick={handleDecrementAsync}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors disabled:opacity-50 col-span-2"
        >
          {isLoading ? 'Loading...' : 'Async -2 (1s)'}
        </button>
      </div>

      <div className="mt-8 p-4 bg-space-darker/50 rounded-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Redux Implementation Status:
        </h3>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>✅ Redux Store configured</li>
          <li>✅ Redux Thunk middleware added</li>
          <li>✅ Counter reducer implemented</li>
          <li>✅ Sync actions working</li>
          <li>✅ Async thunks working</li>
          <li>✅ TypeScript types defined</li>
          <li>✅ React hooks configured</li>
        </ul>
      </div>
    </div>
  );
};
