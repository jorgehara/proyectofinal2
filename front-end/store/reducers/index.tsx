import { combineReducers } from 'redux'
import empresa1Reducer, { IEmpresa1State, initialEmpresa1State } from './empresa1Reducer'
import productosReducer, { initialProductosState, IProductosState } from './productosReducer'
import ventasReducer, { initialVentasState, IVentasState } from './ventasReducer'

export interface IState {
  empresa1: IEmpresa1State
  productos: IProductosState
  ventas: IVentasState
}

export const initialState: IState = {
  empresa1: initialEmpresa1State,
  productos: initialProductosState,
  ventas: initialVentasState,
}

export default combineReducers({
  empresa1: empresa1Reducer,
  productos: productosReducer,
  ventas: ventasReducer,
})
