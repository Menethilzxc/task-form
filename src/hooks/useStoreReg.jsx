import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	secondPassword: '',
};

export const useStoreReg = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
