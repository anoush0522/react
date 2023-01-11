import { configureStore } from '@reduxjs/toolkit'
import contract from '../src/contract/config'

export default configureStore({
     
    reducer: {
      contract: contract,

    },
  })