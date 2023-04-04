import ElectronStore, { Schema } from 'electron-store'
import { IState } from '../models/State'

const schema: Schema<IState> = {
  cobaltToken: {
    type: 'string'
  },
  jwtToken: {
    type: 'string'
  },
  jwtDateTime: {
    type: 'string'
  }
}

export const StoreKeys = {
  cobaltToken: 'cobaltToken',
  jwtToken: 'jwtToken',
  jwtDateTime: 'jwtDateTime'
}

const store = new ElectronStore<IState>({ schema })
export default store
