import { IpaginatedVentas, IVentasItem } from '../models'

export enum VentasActionTypes {
  SEARCH_VENTAS = 'ventas/search',
  SEARCHING_VENTAS = 'ventas/searching',
  FOUND_VENTAS = 'ventas/found',
  SEARCHING_VENTAS_FAILED = 'ventas/searching_failed',

  LOAD_VENTAS = 'ventas/load',
  LOADING_VENTAS = 'ventas/loading',
  LOADED_VENTAS = 'ventas/loaded',
  LOADING_VENTAS_FAILED = 'ventas/loading_failed',

  ADD_VENTAS = 'ventas/add',
  ADDING_VENTAS = 'ventas/adding',
  ADDED_VENTAS = 'ventas/added',
  ADDING_VENTAS_FAILED = 'ventas/adding_failed',

  REMOVE_VENTA = 'ventas/remove',
  REMOVING_VENTA = 'ventas/removing',
  REMOVED_VENTA = 'ventas/removed',
  REMOVING_VENTA_FAILED = 'ventas/removing_failed',

  EDIT_VENTAS = 'ventas/edit',
  EDITING_VENTAS = 'ventas/editing',
  EDITED_VENTAS = 'ventas/edited',
  EDITING_VENTAS_FAILED = 'ventas/editing_failed',
}

export function searchVentas(searchOptions: TSearchOptions | string, keep?: boolean): ISearchVentasAction {
  return {
    type: VentasActionTypes.SEARCH_VENTAS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingVentas(): ISearchingVentasAction {
  return {
    type: VentasActionTypes.SEARCHING_VENTAS,
  }
}

export function foundVentas(ventas: IpaginatedVentas, keep?: boolean): IFoundVentasAction {
  return {
    type: VentasActionTypes.FOUND_VENTAS,
    keep: keep,
    payload: {
      ventas,
    },
  }
}

export function searchingVentasFailed(): ISearchingVentasFailedAction {
  return {
    type: VentasActionTypes.SEARCHING_VENTAS_FAILED,
  }
}

export function loadVentas(loadOptions: TSearchOptions): ILoadVentasAction {
  return {
    type: VentasActionTypes.LOAD_VENTAS,
    loadOptions: loadOptions,
  }
}

export function loadingVentas(): ILoadingVentasAction {
  return {
    type: VentasActionTypes.LOADING_VENTAS,
  }
}

export function loadedVentas(ventas: IpaginatedVentas): ILoadedVentasAction {
  return {
    type: VentasActionTypes.LOADED_VENTAS,
    payload: {
      ventas,
    },
  }
}

export function loadingVentasFailed(): ILoadingVentasFailedAction {
  return {
    type: VentasActionTypes.LOADING_VENTAS_FAILED,
  }
}

export function addVentas(venta: IVentasItem): IAddVentasAction {
  return {
    type: VentasActionTypes.ADD_VENTAS,
    payload: venta,
  }
}

export function addingVentas(): IAddingVentasAction {
  return {
    type: VentasActionTypes.ADDING_VENTAS,
  }
}

export function addedVentas(ventas: IpaginatedVentas): IAddedVentasAction {
  return {
    type: VentasActionTypes.ADDED_VENTAS,
    payload: {
      ventas,
    },
  }
}

export function addingVentasFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingVentasFailedAction {
  return {
    type: VentasActionTypes.ADDING_VENTAS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeVenta(venta: IVentasItem): IRemoveVentaAction {
  return {
    type: VentasActionTypes.REMOVE_VENTA,
    payload: venta,
  }
}

export function removingVenta(): IRemovingVentaAction {
  return {
    type: VentasActionTypes.REMOVING_VENTA,
  }
}

export function removedVenta(): IRemovedVentaAction {
  return {
    type: VentasActionTypes.REMOVED_VENTA,
  }
}

export function removingVentaFailed(): IRemovingVentaFailedAction {
  return {
    type: VentasActionTypes.REMOVING_VENTA_FAILED,
  }
}

export function editVentas(venta: IVentasItem): IEditVentasAction {
  return {
    type: VentasActionTypes.EDIT_VENTAS,
    payload: venta,
  }
}

export function editingVentas(): IEditingVentasAction {
  return {
    type: VentasActionTypes.EDITING_VENTAS,
  }
}

export function editedVentas(ventas: IVentasItem): IEditedVentasAction {
  return {
    type: VentasActionTypes.EDITED_VENTAS,
    payload: ventas,
  }
}

export function editingVentasFailed(): IEditingVentasFailedAction {
  return {
    type: VentasActionTypes.EDITING_VENTAS_FAILED,
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

export interface ISearchVentasAction {
  type: VentasActionTypes.SEARCH_VENTAS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingVentasAction {
  type: VentasActionTypes.SEARCHING_VENTAS
}

export interface IFoundVentasAction {
  type: VentasActionTypes.FOUND_VENTAS
  keep?: boolean
  payload: {
    ventas: IpaginatedVentas
  }
}

export interface ISearchingVentasFailedAction {
  type: VentasActionTypes.SEARCHING_VENTAS_FAILED
}

export interface ILoadVentasAction {
  type: VentasActionTypes.LOAD_VENTAS
  loadOptions: TSearchOptions
}

export interface ILoadingVentasAction {
  type: VentasActionTypes.LOADING_VENTAS
}

export interface ILoadedVentasAction {
  type: VentasActionTypes.LOADED_VENTAS
  payload: {
    ventas: IpaginatedVentas
  }
}

export interface ILoadingVentasFailedAction {
  type: VentasActionTypes.LOADING_VENTAS_FAILED
}

export interface IAddVentasAction {
  type: VentasActionTypes.ADD_VENTAS
  payload: IVentasItem
}

export interface IAddingVentasAction {
  type: VentasActionTypes.ADDING_VENTAS
}

export interface IAddedVentasAction {
  type: VentasActionTypes.ADDED_VENTAS
  payload: {
    ventas: IpaginatedVentas
  }
}

export interface IAddingVentasFailedAction {
  type: VentasActionTypes.ADDING_VENTAS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveVentaAction {
  type: VentasActionTypes.REMOVE_VENTA
  payload: IVentasItem
}

export interface IRemovingVentaAction {
  type: VentasActionTypes.REMOVING_VENTA
}

export interface IRemovedVentaAction {
  type: VentasActionTypes.REMOVED_VENTA
}

export interface IRemovingVentaFailedAction {
  type: VentasActionTypes.REMOVING_VENTA_FAILED
}

export interface IEditVentasAction {
  type: VentasActionTypes.EDIT_VENTAS
  payload: IVentasItem
}

export interface IEditingVentasAction {
  type: VentasActionTypes.EDITING_VENTAS
}

export interface IEditedVentasAction {
  type: VentasActionTypes.EDITED_VENTAS
  payload: IVentasItem
}

export interface IEditingVentasFailedAction {
  type: VentasActionTypes.EDITING_VENTAS_FAILED
}

export type VentasAction =
  | ISearchVentasAction
  | ISearchingVentasAction
  | IFoundVentasAction
  | ISearchingVentasFailedAction
  | ILoadVentasAction
  | ILoadingVentasAction
  | ILoadedVentasAction
  | ILoadingVentasFailedAction
  | IAddVentasAction
  | IAddingVentasAction
  | IAddedVentasAction
  | IAddingVentasFailedAction
  | IRemoveVentaAction
  | IRemovingVentaAction
  | IRemovedVentaAction
  | IRemovingVentaFailedAction
  | IEditVentasAction
  | IEditingVentasAction
  | IEditedVentasAction
  | IEditingVentasFailedAction
