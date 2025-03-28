
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Screen } from '../../models/Screen';

interface UIState {
  currentScreen: Screen;
  showCourseCodeModal: boolean;
  errorMessage: string | null;
  loading: boolean;
}

const initialState: UIState = {
  currentScreen: 'Splash',
  showCourseCodeModal: false,
  errorMessage: null,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    goToScreen(state, action: PayloadAction<Screen>) {
      state.currentScreen = action.payload;
    },
    openModal(state) {
      state.showCourseCodeModal = true;
    },
    closeModal(state) {
      state.showCourseCodeModal = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { goToScreen, openModal, closeModal, setError, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
