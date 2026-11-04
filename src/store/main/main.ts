import { create } from 'zustand';

type State = {
  count: number;
  setCount: () => void;
};

export const useMainStore = create<State>(set => ({
  count: 0,

  setCount: () => set(state => ({ ...state, count: state.count + 1 })),
}));
