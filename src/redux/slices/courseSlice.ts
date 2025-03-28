
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../models/Course';

interface CourseState {
  currentCourse: Course | null;
  courseCode: string;
}

const initialState: CourseState = {
  currentCourse: null,
  courseCode: '',
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourseData(state, action: PayloadAction<Course>) {
      state.currentCourse = action.payload;
    },
    setCourseCode(state, action: PayloadAction<string>) {
      state.courseCode = action.payload;
    },
    clearCourseData(state) {
      state.currentCourse = null;
      state.courseCode = '';
    },
  },
});

export const { setCourseData, setCourseCode, clearCourseData } = courseSlice.actions;
export default courseSlice.reducer;
