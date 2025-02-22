import { combineReducers } from '@reduxjs/toolkit';
import studentReducer from './student/studentSlice';

const rootReducer = combineReducers({
student: studentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;