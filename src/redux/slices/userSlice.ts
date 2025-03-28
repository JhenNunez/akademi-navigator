
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../models/Student';

interface UserState {
  selectedStudent: Student | null;
  isAuthenticated: boolean;
  birthDate: string | null;
}

const initialState: UserState = {
  selectedStudent: null,
  isAuthenticated: false,
  birthDate: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedStudent(state, action: PayloadAction<Student>) {
      state.selectedStudent = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setBirthDate(state, action: PayloadAction<string>) {
      state.birthDate = action.payload;
    },
    clearUserData(state) {
      state.selectedStudent = null;
      state.isAuthenticated = false;
    },
  },
});

export const { 
  setSelectedStudent, 
  setAuthenticated, 
  setBirthDate, 
  clearUserData 
} = userSlice.actions;
export default userSlice.reducer;
