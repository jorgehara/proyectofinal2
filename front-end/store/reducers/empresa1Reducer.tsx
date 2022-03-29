import produce from 'immer'
import { Empresa1Action, Empresa1ActionTypes } from '../actions/empresa1Actions'
import { ApiStatus, IEmpresa1Item } from '../models'

export const initialEmpresa1State: IEmpresa1State = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  empresa1: [],
  foundempresa1: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function empresa1Reducer(state: IEmpresa1State = initialEmpresa1State, action: Empresa1Action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Empresa1ActionTypes.SEARCH_EMPRESA1:
        draft.searchString = action.searchOptions.searchString
        break
      case Empresa1ActionTypes.SEARCHING_EMPRESA1:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case Empresa1ActionTypes.SEARCHING_EMPRESA1_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case Empresa1ActionTypes.FOUND_EMPRESA1:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundempresa1.push(...action.payload.empresa1.docs) : (draft.foundempresa1 = action.payload.empresa1.docs)
        draft.totalDocs = action.payload.empresa1.totalDocs
        break

      case Empresa1ActionTypes.LOAD_EMPRESA1:
      case Empresa1ActionTypes.LOADING_EMPRESA1:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundempresa1 = []
        break

      case Empresa1ActionTypes.LOADING_EMPRESA1_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case Empresa1ActionTypes.LOADED_EMPRESA1:
        draft.loadingStatus = ApiStatus.LOADED
        draft.empresa1 = action.payload.empresa1.docs
        draft.totalDocs = action.payload.empresa1.totalDocs
        break

      case Empresa1ActionTypes.ADD_EMPRESA1:
      case Empresa1ActionTypes.ADDING_EMPRESA1:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case Empresa1ActionTypes.ADDING_EMPRESA1_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case Empresa1ActionTypes.ADDED_EMPRESA1:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.empresa1.push(action.payload.empresa1.docs[0])
        if (draft.searchString) draft.foundempresa1.push(action.payload.empresa1.docs[0])
        break

      case Empresa1ActionTypes.REMOVE_EMPRESA:
        draft.empresa1.splice(
          draft.empresa1.findIndex((empresa) => empresa._id === action.payload._id),
          1
        )
        break

      case Empresa1ActionTypes.EDIT_EMPRESA1:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.empresa1[draft.empresa1.findIndex((empresa) => empresa._id === action.payload._id)] = action.payload
        break

      case Empresa1ActionTypes.EDITED_EMPRESA1:
        draft.addingStatus = ApiStatus.LOADED
        draft.empresa1[draft.empresa1.findIndex((empresa) => empresa._id === action.payload._id)] = action.payload
        draft.foundempresa1[draft.foundempresa1.findIndex((empresa) => empresa._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IEmpresa1State {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  empresa1: IEmpresa1Item[]
  foundempresa1: IEmpresa1Item[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
