import { GridRowModel } from '@mui/x-data-grid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
    students: GridRowModel[];
    loading: boolean;
    error: string | null;
    
}

const initialState: initialState = {
  loading: false,
  students: [],
  error: null,
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {

   fetchStudentRequest: (state) => {
    console.log("request")
      state.loading = true;
    },
    fetchStudentSuccess: (state, action: PayloadAction<any>) => {
      console.log("success")
      state.loading = false;
      state.students = action.payload;
    },
    fetchStudentFailure: (state) => {
      console.log("failure")
      state.loading = false;
      state.error = 'Error while fetching students';
    },
    addStudentRequest: (state,action:PayloadAction<any>) => {
      state.loading = true;
    },
    addStudentSuccess: (state,) => {
      state.loading = false;
      // console.log(action.payload)
      // state.students.push(action.payload);
    },
    addStudentFailure: (state) => {
      state.loading = false;
      state.error = 'Error while adding student';
    },
    updateStudentRequest: (state,action:PayloadAction<any>) => {
      state.loading = true;
    },
    updateStudentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.students = state.students.map((student) => student.id === action.payload.id ? action.payload : student);
    },
    updateStudentFailure: (state) => {
      state.loading = false;
      state.error = 'Error while updating student';
    },
    deleteStudentRequest: (state,action:PayloadAction<any>) => {
      state.loading = true;
    },
    deleteStudentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.students = state.students.filter((student) => student.id !== action.payload);
    },
    deleteStudentFailure: (state) => {
      state.loading = false;
      state.error = 'Error while deleting student';
    },
  },
});

export const { 
  fetchStudentRequest,
  fetchStudentSuccess,
  fetchStudentFailure,
  addStudentRequest,
  addStudentSuccess,
  addStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  deleteStudentFailure,
} = studentSlice.actions;
export default studentSlice.reducer;

