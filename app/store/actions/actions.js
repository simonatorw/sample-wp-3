export const actionTypes = {
	FETCH_DATA: 'FETCH_DATA',
	FETCH_SUCCEEDED: 'FETCH_SUCCEEDED',
	FETCH_FAILED: 'FETCH_FAILED'
};

export const fetchData = () => ({ type: actionTypes.FETCH_DATA });

export const fetchSucceeded = (data) => ({ type: actionTypes.FETCH_SUCCEEDED, data });

export const fetchFailed = (err) => ({ type: actionTypes.FETCH_FAILED, err });
