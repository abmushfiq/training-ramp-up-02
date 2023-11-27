import { all } from 'redux-saga/effects';
import watchFetchStudent from './student/studentSaga';
function* rootSaga() {
  yield all([watchFetchStudent()]);
}

export default rootSaga;
