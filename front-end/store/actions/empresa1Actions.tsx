import { IEmpresa1Item, IpaginatedEmpresa1 } from '../models'

export enum Empresa1ActionTypes {
  SEARCH_EMPRESA1 = 'empresa1/search',
  SEARCHING_EMPRESA1 = 'empresa1/searching',
  FOUND_EMPRESA1 = 'empresa1/found',
  SEARCHING_EMPRESA1_FAILED = 'empresa1/searching_failed',

  LOAD_EMPRESA1 = 'empresa1/load',
  LOADING_EMPRESA1 = 'empresa1/loading',
  LOADED_EMPRESA1 = 'empresa1/loaded',
  LOADING_EMPRESA1_FAILED = 'empresa1/loading_failed',

  ADD_EMPRESA1 = 'empresa1/add',
  ADDING_EMPRESA1 = 'empresa1/adding',
  ADDED_EMPRESA1 = 'empresa1/added',
  ADDING_EMPRESA1_FAILED = 'empresa1/adding_failed',

  REMOVE_EMPRESA = 'empresa1/remove',
  REMOVING_EMPRESA = 'empresa1/removing',
  REMOVED_EMPRESA = 'empresa1/removed',
  REMOVING_EMPRESA_FAILED = 'empresa1/removing_failed',

  EDIT_EMPRESA1 = 'empresa1/edit',
  EDITING_EMPRESA1 = 'empresa1/editing',
  EDITED_EMPRESA1 = 'empresa1/edited',
  EDITING_EMPRESA1_FAILED = 'empresa1/editing_failed',
}

export function searchEmpresa1(searchOptions: TSearchOptions | string, keep?: boolean): ISearchEmpresa1Action {
  return {
    type: Empresa1ActionTypes.SEARCH_EMPRESA1,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingEmpresa1(): ISearchingEmpresa1Action {
  return {
    type: Empresa1ActionTypes.SEARCHING_EMPRESA1,
  }
}

export function foundEmpresa1(empresa1: IpaginatedEmpresa1, keep?: boolean): IFoundEmpresa1Action {
  return {
    type: Empresa1ActionTypes.FOUND_EMPRESA1,
    keep: keep,
    payload: {
      empresa1,
    },
  }
}

export function searchingEmpresa1Failed(): ISearchingEmpresa1FailedAction {
  return {
    type: Empresa1ActionTypes.SEARCHING_EMPRESA1_FAILED,
  }
}

export function loadEmpresa1(loadOptions: TSearchOptions): ILoadEmpresa1Action {
  return {
    type: Empresa1ActionTypes.LOAD_EMPRESA1,
    loadOptions: loadOptions,
  }
}

export function loadingEmpresa1(): ILoadingEmpresa1Action {
  return {
    type: Empresa1ActionTypes.LOADING_EMPRESA1,
  }
}

export function loadedEmpresa1(empresa1: IpaginatedEmpresa1): ILoadedEmpresa1Action {
  return {
    type: Empresa1ActionTypes.LOADED_EMPRESA1,
    payload: {
      empresa1,
    },
  }
}

export function loadingEmpresa1Failed(): ILoadingEmpresa1FailedAction {
  return {
    type: Empresa1ActionTypes.LOADING_EMPRESA1_FAILED,
  }
}

export function addEmpresa1(empresa: IEmpresa1Item): IAddEmpresa1Action {
  return {
    type: Empresa1ActionTypes.ADD_EMPRESA1,
    payload: empresa,
  }
}

export function addingEmpresa1(): IAddingEmpresa1Action {
  return {
    type: Empresa1ActionTypes.ADDING_EMPRESA1,
  }
}

export function addedEmpresa1(empresa1: IpaginatedEmpresa1): IAddedEmpresa1Action {
  return {
    type: Empresa1ActionTypes.ADDED_EMPRESA1,
    payload: {
      empresa1,
    },
  }
}

export function addingEmpresa1Failed(errData: { data: { message: string; field?: string }; status: number }): IAddingEmpresa1FailedAction {
  return {
    type: Empresa1ActionTypes.ADDING_EMPRESA1_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeEmpresa(empresa: IEmpresa1Item): IRemoveEmpresaAction {
  return {
    type: Empresa1ActionTypes.REMOVE_EMPRESA,
    payload: empresa,
  }
}

export function removingEmpresa(): IRemovingEmpresaAction {
  return {
    type: Empresa1ActionTypes.REMOVING_EMPRESA,
  }
}

export function removedEmpresa(): IRemovedEmpresaAction {
  return {
    type: Empresa1ActionTypes.REMOVED_EMPRESA,
  }
}

export function removingEmpresaFailed(): IRemovingEmpresaFailedAction {
  return {
    type: Empresa1ActionTypes.REMOVING_EMPRESA_FAILED,
  }
}

export function editEmpresa1(empresa: IEmpresa1Item): IEditEmpresa1Action {
  return {
    type: Empresa1ActionTypes.EDIT_EMPRESA1,
    payload: empresa,
  }
}

export function editingEmpresa1(): IEditingEmpresa1Action {
  return {
    type: Empresa1ActionTypes.EDITING_EMPRESA1,
  }
}

export function editedEmpresa1(empresa1: IEmpresa1Item): IEditedEmpresa1Action {
  return {
    type: Empresa1ActionTypes.EDITED_EMPRESA1,
    payload: empresa1,
  }
}

export function editingEmpresa1Failed(): IEditingEmpresa1FailedAction {
  return {
    type: Empresa1ActionTypes.EDITING_EMPRESA1_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchEmpresa1Action {
  type: Empresa1ActionTypes.SEARCH_EMPRESA1
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingEmpresa1Action {
  type: Empresa1ActionTypes.SEARCHING_EMPRESA1
}

export interface IFoundEmpresa1Action {
  type: Empresa1ActionTypes.FOUND_EMPRESA1
  keep?: boolean
  payload: {
    empresa1: IpaginatedEmpresa1
  }
}

export interface ISearchingEmpresa1FailedAction {
  type: Empresa1ActionTypes.SEARCHING_EMPRESA1_FAILED
}

export interface ILoadEmpresa1Action {
  type: Empresa1ActionTypes.LOAD_EMPRESA1
  loadOptions: TSearchOptions
}

export interface ILoadingEmpresa1Action {
  type: Empresa1ActionTypes.LOADING_EMPRESA1
}

export interface ILoadedEmpresa1Action {
  type: Empresa1ActionTypes.LOADED_EMPRESA1
  payload: {
    empresa1: IpaginatedEmpresa1
  }
}

export interface ILoadingEmpresa1FailedAction {
  type: Empresa1ActionTypes.LOADING_EMPRESA1_FAILED
}

export interface IAddEmpresa1Action {
  type: Empresa1ActionTypes.ADD_EMPRESA1
  payload: IEmpresa1Item
}

export interface IAddingEmpresa1Action {
  type: Empresa1ActionTypes.ADDING_EMPRESA1
}

export interface IAddedEmpresa1Action {
  type: Empresa1ActionTypes.ADDED_EMPRESA1
  payload: {
    empresa1: IpaginatedEmpresa1
  }
}

export interface IAddingEmpresa1FailedAction {
  type: Empresa1ActionTypes.ADDING_EMPRESA1_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveEmpresaAction {
  type: Empresa1ActionTypes.REMOVE_EMPRESA
  payload: IEmpresa1Item
}

export interface IRemovingEmpresaAction {
  type: Empresa1ActionTypes.REMOVING_EMPRESA
}

export interface IRemovedEmpresaAction {
  type: Empresa1ActionTypes.REMOVED_EMPRESA
}

export interface IRemovingEmpresaFailedAction {
  type: Empresa1ActionTypes.REMOVING_EMPRESA_FAILED
}

export interface IEditEmpresa1Action {
  type: Empresa1ActionTypes.EDIT_EMPRESA1
  payload: IEmpresa1Item
}

export interface IEditingEmpresa1Action {
  type: Empresa1ActionTypes.EDITING_EMPRESA1
}

export interface IEditedEmpresa1Action {
  type: Empresa1ActionTypes.EDITED_EMPRESA1
  payload: IEmpresa1Item
}

export interface IEditingEmpresa1FailedAction {
  type: Empresa1ActionTypes.EDITING_EMPRESA1_FAILED
}

export type Empresa1Action =
  | ISearchEmpresa1Action
  | ISearchingEmpresa1Action
  | IFoundEmpresa1Action
  | ISearchingEmpresa1FailedAction
  | ILoadEmpresa1Action
  | ILoadingEmpresa1Action
  | ILoadedEmpresa1Action
  | ILoadingEmpresa1FailedAction
  | IAddEmpresa1Action
  | IAddingEmpresa1Action
  | IAddedEmpresa1Action
  | IAddingEmpresa1FailedAction
  | IRemoveEmpresaAction
  | IRemovingEmpresaAction
  | IRemovedEmpresaAction
  | IRemovingEmpresaFailedAction
  | IEditEmpresa1Action
  | IEditingEmpresa1Action
  | IEditedEmpresa1Action
  | IEditingEmpresa1FailedAction
