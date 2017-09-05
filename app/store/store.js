import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { dataReducer } from './reducers/dataReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
	dataReducer,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);