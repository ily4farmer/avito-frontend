import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  count: number;
  setCount: () => void;
};

export const useAboutStore = create<State>()(
  persist(
    set => ({
      count: 0,

      setCount: () =>
        set(state => ({
          count: state.count + 1,
        })),
    }),
    {
      name: 'counter-storage',
    },
  ),
);
