import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import empresa1Epics from './empresa1Epics'
import productosEpics from './productosEpics'
import ventasEpics from './ventasEpics'

export const rootEpic = combineEpics(empresa1Epics, productosEpics, ventasEpics)

export function buildFormData(formData, data, parentKey = null) {
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined || typeof data[key] === 'boolean') {
      let savekey = key
      let value = data[key] === null && typeof data[key] === 'string' ? '' : data[key]
      if (data[key] && typeof data[key] === 'object' && !(data[key] instanceof Date) && !(data[key] instanceof File)) {
        value = JSON.stringify(data[key])
      }

      if (data[key] && Array.isArray(data[key]) && data[key][0] instanceof File) {
        // handle array of filess
        Object.keys(data[key]).forEach((subkey) => {
          formData.append(`${savekey}[${subkey}]`, data[key][subkey])
        })
      } else {
        formData.append(savekey, value)
      }
    }
  })
}

export default createEpicMiddleware<Action, Action, IState>()
