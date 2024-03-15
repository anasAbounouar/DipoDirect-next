interface SidebarState {
  isSideBarActive: boolean;
}
// store/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SidebarState = {
  isSideBarActive: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarActive = !state.isSideBarActive;
    },
    setSidebarActive: (state, action: PayloadAction<boolean>) => {
      state.isSideBarActive = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarActive } = sidebarSlice.actions;

export default sidebarSlice.reducer;
