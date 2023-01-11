import { createSlice } from '@reduxjs/toolkit'
import  BUSD_ABI  from './BUSD_ABI.json';
import  contractABI  from './contractABI.json';
const arr  = {contract:"0xe41C82120c8363a118A700718858A406aca63598",contractABI:contractABI,BUSD:"0x325a4deFFd64C92CF627Dd72d118f1b8361c5691",BUSD_ABI:BUSD_ABI} 

export const config = createSlice({
  name: 'config',
  initialState: {
    value: arr,
  },
  reducers: {    
     
  },
})
 
// Action creators are generated for each case reducer function

export default config.reducer

