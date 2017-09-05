import stateTree from '../stateTree';

export function dataReducer(state = stateTree, action) {
	switch (action.type) {
	case 'FETCH_SUCCEEDED':
		//console.log(action.data);
		return { ...state, data: action.data };
	default:
		return state;
	}
}
