import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedVentas,
  addingVentas,
  addingVentasFailed,
  editedVentas,
  editingVentas,
  editingVentasFailed,
  foundVentas,
  loadedVentas,
  loadingVentas,
  loadingVentasFailed,
  removedVenta,
  removingVenta,
  removingVentaFailed,
  searchingVentas,
  searchingVentasFailed,
  VentasAction,
  VentasActionTypes,
} from '../actions/ventasActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchVentasEpic: Epic<VentasAction, VentasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(VentasActionTypes.SEARCH_VENTAS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/ventas/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundVentas(response.data, action.keep)),
        startWith(searchingVentas()),
        catchError(() => of(searchingVentasFailed()))
      )
    })
  )

const loadVentasEpic: Epic<VentasAction, VentasAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(VentasActionTypes.LOAD_VENTAS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/ventas/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedVentas(response.data)),
        startWith(loadingVentas()),
        catchError(() => of(loadingVentasFailed()))
      )
    })
  )
}

const addVentasEpic: Epic<VentasAction, VentasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(VentasActionTypes.ADD_VENTAS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/ventas/`, data, config)).pipe(
        map((response) => addedVentas(response.data)),
        startWith(addingVentas()),
        catchError((err) => of(addingVentasFailed(err.response)))
      )
    })
  )

const removeVentasEpic: Epic<VentasAction, VentasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(VentasActionTypes.REMOVE_VENTA)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/ventas/${action.payload._id}`)).pipe(
        map((response) => removedVenta()),
        startWith(removingVenta()),
        catchError(() => of(removingVentaFailed()))
      )
    )
  )

const editVentasEpic: Epic<VentasAction, VentasAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(VentasActionTypes.EDIT_VENTAS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/ventas/${action.payload._id}`, data, config)).pipe(
        map((response) => editedVentas(response.data)),
        startWith(editingVentas()),
        catchError(() => of(editingVentasFailed()))
      )
    })
  )

export default combineEpics(searchVentasEpic, loadVentasEpic, addVentasEpic, removeVentasEpic, editVentasEpic)
