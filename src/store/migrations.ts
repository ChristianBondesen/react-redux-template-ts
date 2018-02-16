import { IAppState } from '../state/ducks';

const TAG = 'migrations.ts';

export const migrations = {
  0: (state: IAppState): IAppState => {
    return state;
  },
  1: (state: IAppState): IAppState => {
    // Modify state to include any new props or remove unused
    const newState: IAppState = {
      ...state,
      // newDuck: {
      //   ...state.newDuck,
      //   showFunnyImage: false,
      // },
    };
    return newState;
  },
};
