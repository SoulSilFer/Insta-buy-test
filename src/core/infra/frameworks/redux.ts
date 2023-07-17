import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from 'core/redux/reducers/rootReducer';
import { watcherSaga } from 'core/redux/saga/root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});
sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
