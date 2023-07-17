import { takeLatest } from 'redux-saga/effects';
import { makeApiURL } from 'core/infra/http/api-url-factory';
import { ApiClient } from 'core/infra';

import { Controller } from 'core/redux/controllers';
import { createSagaRequest } from '../handlers/request';
import {
  onGetLayout,
  onGetLayoutError,
  onGetLayoutLoad,
  onGetLayoutSuccess
} from '../reducers/get-layout.reducer';

const client = new ApiClient();
const controller = new Controller(makeApiURL('layout'), client);

export const rootGetLayoutSaga = [
  takeLatest(
    onGetLayout.type,
    createSagaRequest({
      request: async () => await controller.getLayout(),
      onError: onGetLayoutError,
      onLoad: onGetLayoutLoad,
      onSuccess: onGetLayoutSuccess
    })
  )
];
