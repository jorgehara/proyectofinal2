import produce from 'immer'
import { VentasAction, VentasActionTypes } from '../actions/ventasActions'
import { ApiStatus, IVentasItem } from '../models'

export const initialVentasState: IVentasState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  ventas: [],
  foundventas: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function ventasReducer(state: IVentasState = initialVentasState, action: VentasAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case VentasActionTypes.SEARCH_VENTAS:
        draft.searchString = action.searchOptions.searchString
        break
      case VentasActionTypes.SEARCHING_VENTAS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case VentasActionTypes.SEARCHING_VENTAS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case VentasActionTypes.FOUND_VENTAS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundventas.push(...action.payload.ventas.docs) : (draft.foundventas = action.payload.ventas.docs)
        draft.totalDocs = action.payload.ventas.totalDocs
        break

      case VentasActionTypes.LOAD_VENTAS:
      case VentasActionTypes.LOADING_VENTAS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundventas = []
        break

      case VentasActionTypes.LOADING_VENTAS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case VentasActionTypes.LOADED_VENTAS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.ventas = action.payload.ventas.docs
        draft.totalDocs = action.payload.ventas.totalDocs
        break

      case VentasActionTypes.ADD_VENTAS:
      case VentasActionTypes.ADDING_VENTAS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case VentasActionTypes.ADDING_VENTAS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case VentasActionTypes.ADDED_VENTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.ventas.push(action.payload.ventas.docs[0])
        if (draft.searchString) draft.foundventas.push(action.payload.ventas.docs[0])
        break

      case VentasActionTypes.REMOVE_VENTA:
        draft.ventas.splice(
          draft.ventas.findIndex((venta) => venta._id === action.payload._id),
          1
        )
        break

      case VentasActionTypes.EDIT_VENTAS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.ventas[draft.ventas.findIndex((venta) => venta._id === action.payload._id)] = action.payload
        break

      case VentasActionTypes.EDITED_VENTAS:
        draft.addingStatus = ApiStatus.LOADED
        draft.ventas[draft.ventas.findIndex((venta) => venta._id === action.payload._id)] = action.payload
        draft.foundventas[draft.foundventas.findIndex((venta) => venta._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IVentasState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  ventas: IVentasItem[]
  foundventas: IVentasItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
