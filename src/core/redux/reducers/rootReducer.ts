import { combineReducers } from 'redux';

import getLayoutReducer from './get-layout.reducer';
import getItemByIdReducer from './get-item-by-id.reducer';

export const rootReducer = combineReducers({
  getLayout: getLayoutReducer,
  getItemById: getItemByIdReducer
});
