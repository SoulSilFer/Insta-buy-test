import { takeLatest } from 'redux-saga/effects';
import { makeApiURL } from 'core/infra/http/api-url-factory';
import { ApiClient } from 'core/infra';

import { Controller } from 'core/redux/controllers';
import { createSagaRequest } from '../handlers/request';

import { GetItemByIdParams } from 'core/entities';
import {
  onGetItemById,
  onGetItemByIdError,
  onGetItemByIdLoad,
  onGetItemByIdSuccess
} from '../reducers';

const client = new ApiClient();
const controller = new Controller(makeApiURL('item'), client);

export const rootGetItemByIdSaga = [
  takeLatest(
    onGetItemById.type,
    createSagaRequest<GetItemByIdParams>({
      request: async (params) => await controller.getItemById(params),
      onError: onGetItemByIdError,
      onLoad: onGetItemByIdLoad,
      onSuccess: onGetItemByIdSuccess
    })
  )
];
