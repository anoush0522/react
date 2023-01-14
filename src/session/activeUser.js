import { createSlice } from '@reduxjs/toolkit'
 
export const userInfo = createSlice({
  name: 'userId',
  initialState: {
    value: '',
  },
  reducers: {    
    changeId: (state, action) => {
        state.value = action.payload
      },
  },
})
 

// Action creators are generated for each case reducer function
export const { changeId } = userInfo.actions
export default userInfo.reducer
