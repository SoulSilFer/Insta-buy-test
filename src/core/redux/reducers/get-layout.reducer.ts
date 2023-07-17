import { createSlice } from '@reduxjs/toolkit';

import { HttpErrorResponsePreValidation, LayoutRes } from 'core/entities';

type GetLayout_StateProps = {
  getLayout: LayoutRes | undefined;
  getLayoutLoad: boolean;
  getLayoutError: HttpErrorResponsePreValidation | undefined;
};

const initialState: GetLayout_StateProps = {
  getLayout: undefined,
  getLayoutLoad: false,
  getLayoutError: undefined
};

const getLayoutSlice = createSlice({
  name: 'getLayout',
  initialState: initialState,
  reducers: {
    onGetLayout() {},

    onGetLayoutLoad(state, action) {
      return { ...state, getLayoutLoad: action.payload };
    },

    onGetLayoutClear(state) {
      return {
        ...state,
        getLayout: undefined,
        getLayoutError: undefined
      };
    },

    onGetLayoutSuccess(state, action) {
      return {
        ...state,
        getLayout: action.payload,
        getLayoutError: undefined
      };
    },

    onGetLayoutError(state, action) {
      return {
        ...state,
        getLayout: undefined,
        getLayoutError: action.payload
      };
    }
  }
});

export const {
  onGetLayout,
  onGetLayoutError,
  onGetLayoutLoad,
  onGetLayoutClear,
  onGetLayoutSuccess
} = getLayoutSlice.actions;

export default getLayoutSlice.reducer;
