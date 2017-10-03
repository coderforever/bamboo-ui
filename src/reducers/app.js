import { APP_UPDATE_FILTER } from '../actions/app';

export const defaultState = {
	filter: '',
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case APP_UPDATE_FILTER:
			return { ...state, filter: action.filter };
	}
	return state;
};
