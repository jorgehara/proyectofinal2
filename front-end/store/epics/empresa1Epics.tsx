import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedEmpresa1,
  addingEmpresa1,
  addingEmpresa1Failed,
  editedEmpresa1,
  editingEmpresa1,
  editingEmpresa1Failed,
  Empresa1Action,
  Empresa1ActionTypes,
  foundEmpresa1,
  loadedEmpresa1,
  loadingEmpresa1,
  loadingEmpresa1Failed,
  removedEmpresa,
  removingEmpresa,
  removingEmpresaFailed,
  searchingEmpresa1,
  searchingEmpresa1Failed,
} from '../actions/empresa1Actions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchEmpresa1Epic: Epic<Empresa1Action, Empresa1Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Empresa1ActionTypes.SEARCH_EMPRESA1)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/empresa1/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundEmpresa1(response.data, action.keep)),
        startWith(searchingEmpresa1()),
        catchError(() => of(searchingEmpresa1Failed()))
      )
    })
  )

const loadEmpresa1Epic: Epic<Empresa1Action, Empresa1Action, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(Empresa1ActionTypes.LOAD_EMPRESA1)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/empresa1/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedEmpresa1(response.data)),
        startWith(loadingEmpresa1()),
        catchError(() => of(loadingEmpresa1Failed()))
      )
    })
  )
}

const addEmpresa1Epic: Epic<Empresa1Action, Empresa1Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Empresa1ActionTypes.ADD_EMPRESA1)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/empresa1/`, data, config)).pipe(
        map((response) => addedEmpresa1(response.data)),
        startWith(addingEmpresa1()),
        catchError((err) => of(addingEmpresa1Failed(err.response)))
      )
    })
  )

const removeEmpresa1Epic: Epic<Empresa1Action, Empresa1Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Empresa1ActionTypes.REMOVE_EMPRESA)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/empresa1/${action.payload._id}`)).pipe(
        map((response) => removedEmpresa()),
        startWith(removingEmpresa()),
        catchError(() => of(removingEmpresaFailed()))
      )
    )
  )

const editEmpresa1Epic: Epic<Empresa1Action, Empresa1Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Empresa1ActionTypes.EDIT_EMPRESA1)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/empresa1/${action.payload._id}`, data, config)).pipe(
        map((response) => editedEmpresa1(response.data)),
        startWith(editingEmpresa1()),
        catchError(() => of(editingEmpresa1Failed()))
      )
    })
  )

export default combineEpics(searchEmpresa1Epic, loadEmpresa1Epic, addEmpresa1Epic, removeEmpresa1Epic, editEmpresa1Epic)
