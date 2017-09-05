import { call, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, fetchSucceeded, fetchFailed } from '../actions/actions';
import { fetchGet } from '../../utils/asyncTransport';
import { dataUrl } from '../../constants';

export function* watchFetchDataAsync() {  
	yield takeEvery(actionTypes.FETCH_DATA, fetchData);  
}

export function* fetchData() {
	try {
		const data = yield call(fetchGet, dataUrl.cars);
		yield put(fetchSucceeded(data));
	} catch (err) {
		yield put(fetchFailed(err));
	}
}