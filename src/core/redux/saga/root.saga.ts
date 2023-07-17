import { all } from 'redux-saga/effects';

import { rootGetLayoutSaga } from './get-layout.saga';
import { rootGetItemByIdSaga } from './get-task-by-id.saga';

export function* watcherSaga(): any {
  yield all([...rootGetLayoutSaga, ...rootGetItemByIdSaga]);
}
