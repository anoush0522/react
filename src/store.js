import { configureStore } from '@reduxjs/toolkit'
import contract from '../src/contract/config'
import userId from '../src/session/activeUser'

export default configureStore({
     
    reducer: {
      contract: contract,
      userId : userId
    },
  })