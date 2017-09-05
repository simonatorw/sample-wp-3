import { all } from 'redux-saga/effects';

import { watchFetchDataAsync } from './fetchDataSagas';

export default function* rootSaga() {
	yield all([
		watchFetchDataAsync()
	]);
}