export interface IEmpresa1Item {
  _id?: String
  createdAt: Date

  nombre: string

  razonsocial: string

  direccion: string

  descripciongral: string
  contactocelu: Number
  // Empresa1 - Productos - Empresa1 - Empresa1 - nombre
  Productos: IProductosItem[]
}

export interface IpaginatedEmpresa1 {
  docs: IEmpresa1Item[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IProductosItem {
  _id?: String
  createdAt: Date

  marca: string

  modelo: string
  fechadecompra: Date
  fechavencimiento: Boolean

  paginaproducto: string
  valoraciones: Number

  descripciongral: string
  Empresa1: IEmpresa1Item

  imagen: string
  precio: Number

  nombredelproducto: string
  cantidadcomprada: Number
  // Productos - Ventas - Nombre_del_producto - Productos - nombre_del_producto
  Ventas: IVentasItem[]
  // Productos - Ventas - Precio - Productos - precio
  Ventas: IVentasItem[]
}

export interface IpaginatedProductos {
  docs: IProductosItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IVentasItem {
  _id?: String
  createdAt: Date
  Nombredelproducto: IProductosItem
  cantidad: Number
  Precio: IProductosItem
}

export interface IpaginatedVentas {
  docs: IVentasItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
