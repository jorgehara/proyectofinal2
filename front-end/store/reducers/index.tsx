import { combineReducers } from 'redux'
import empresa1Reducer, { IEmpresa1State, initialEmpresa1State } from './empresa1Reducer'
import productosReducer, { initialProductosState, IProductosState } from './productosReducer'
import usersReducer, { initialUsersState, IUsersState } from './usersReducer'
import ventasReducer, { initialVentasState, IVentasState } from './ventasReducer'

export interface IState {
  empresa1: IEmpresa1State
  productos: IProductosState
  ventas: IVentasState
  users: IUsersState
}

export const initialState: IState = {
  empresa1: initialEmpresa1State,
  productos: initialProductosState,
  ventas: initialVentasState,
  users: initialUsersState,
}

export default combineReducers({
  empresa1: empresa1Reducer,
  productos: productosReducer,
  ventas: ventasReducer,
  users: usersReducer,
})
