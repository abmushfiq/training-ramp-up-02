// sagas/studentSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { GridRowModel } from '@mui/x-data-grid';
import { fetchStudentRequest,
    fetchStudentSuccess,
    fetchStudentFailure,
    addStudentRequest,
    addStudentSuccess,
    addStudentFailure,
    updateStudentRequest,
    deleteStudentRequest,
    updateStudentSuccess,
    updateStudentFailure,
} from './studentSlice';

const fetchStudentsApi = (): Promise<GridRowModel[]> =>
  fetch('http://localhost:3001/students')
    .then((response) => response.json())
    .catch((error) => {
      console.log("error",error)
      throw error;
    });


const addStudentApi = (student: GridRowModel): any =>
fetch('http://localhost:3001/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "name": student.name,
      "dof": student.dof,
      "gender": student.gender,
      "address": student.address,
      "mobile": student.mobile
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });

    const updateStudentApi = (student: any): any =>
    fetch(`http://localhost:3001/students/${student.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "name": student.name,
      "dof": student.dof,
      "gender": student.gender,
      "address": student.address,
      "mobile": student.mobile
    }),
  })

  const deleteStudentApi = (student: string): any =>
  fetch(`http://localhost:3001/students/${student}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json())
.then((response) => response.json())
.catch((error) => {
  throw error;
}); 

function* fetchStudentSaga(action: PayloadAction<void>) {
  try {
    const response: GridRowModel[] = yield call(fetchStudentsApi);
    console.log("saga")
    console.log({response})
    yield put(fetchStudentSuccess(response));
  } catch (e) {
    console.log("saga error")
    yield put(fetchStudentFailure());
  }
}

function* addStudentSaga(action: PayloadAction<any>) {
  console.log("saga")
  console.log(action.payload)
    try {
      const response: GridRowModel = yield call(addStudentApi, action.payload);
      console.log("saga")
      console.log({response})
      yield put(addStudentSuccess());
    } catch (e) {
        yield put(addStudentFailure());
    }
    }

  function* updateStudentSaga(action: PayloadAction<any>) {
    console.log("saga")
  console.log(action.payload)

    try {
      const response: GridRowModel = yield call(updateStudentApi,action.payload)
      console.log("saga")
      console.log({response})
      yield put(addStudentSuccess());
    } catch (e) {
        yield put(addStudentFailure());
    }
    }

  function* deleteStudentSaga(action: PayloadAction<any>) {
    try {
      const response: GridRowModel = yield call(deleteStudentApi,action.payload.id);
      console.log("saga")
      console.log({response})
      yield put(addStudentSuccess());
    } catch (e) {
        yield put(addStudentFailure());
    }
    }

// Starts fetchStudent on each dispatched `fetchStudent` action
function* watchFetchStudent() {
  yield takeLatest(fetchStudentRequest, fetchStudentSaga);
  yield takeLatest(addStudentRequest, addStudentSaga);
  yield takeLatest(updateStudentRequest, updateStudentSaga);
  yield takeLatest(deleteStudentRequest, deleteStudentSaga);
}

export default watchFetchStudent;
