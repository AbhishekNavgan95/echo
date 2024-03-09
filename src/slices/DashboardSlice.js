import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
}

const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    toggleDashboard : (state, action) => {
        state.isOpen = !state.isOpen
    },
  },
})

export const { toggleDashboard } = DashboardSlice.actions
export default DashboardSlice.reducer