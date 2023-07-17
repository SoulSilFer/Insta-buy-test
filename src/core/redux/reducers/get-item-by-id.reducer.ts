import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  GetItemByIdParams,
  GetItemByIdSuccess,
  HttpErrorResponsePreValidation
} from 'core/entities';

type GetItemById_StateProps = {
  getItemById: GetItemByIdSuccess | undefined;
  getItemByIdLoad: boolean;
  getItemByIdError: HttpErrorResponsePreValidation | undefined;
};

const initialState: GetItemById_StateProps = {
  getItemById: undefined,
  getItemByIdLoad: false,
  getItemByIdError: undefined
};

const getItemByIdSlice = createSlice({
  name: 'getItemById',
  initialState: initialState,
  reducers: {
    onGetItemById(_state, _action: PayloadAction<GetItemByIdParams>) {},

    onGetItemByIdLoad(state, action) {
      return { ...state, getItemByIdLoad: action.payload };
    },

    onGetItemByIdClear(state) {
      return {
        ...state,
        getItemById: undefined,
        getItemByIdError: undefined
      };
    },

    onGetItemByIdSuccess(state, action) {
      return {
        ...state,
        getItemById: action.payload,
        getItemByIdError: undefined
      };
    },

    onGetItemByIdError(state, action) {
      return {
        ...state,
        getItemById: undefined,
        getItemByIdError: action.payload
      };
    }
  }
});

export const {
  onGetItemById,
  onGetItemByIdError,
  onGetItemByIdLoad,
  onGetItemByIdClear,
  onGetItemByIdSuccess
} = getItemByIdSlice.actions;

export default getItemByIdSlice.reducer;
