import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import AppBar from '@mui/material/AppBar'
import Checkbox from '@mui/material/Checkbox'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import FileUpload from '../components/FileUpload/FileUpload'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import minimum from '../components/Themes/minimum.module.scss'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addProductos, editProductos, loadProductos, removeProducto, searchProductos } from '../store/actions/productosActions'
import { IProductosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

export { RadioButtonUncheckedIcon }

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Productos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataProductos = {
    marca: '',
    modelo: '',
    fechadecompra: '',
    fechavencimiento: false,
    paginaproducto: '',
    valoraciones: '',
    descripciongral: '',
    Empresa1: [],
    imagen: '',
    Precio: '',
    nombredelproducto: '',
    cantidadcomprada: '',
  }
  const [Productosdata, setProductosData] = React.useState<any>(initialDataProductos)
  const handleProductosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setProductosData({
      ...Productosdata,
      [name]: value,
    })
  }
  const productosData = useSelector((state: IState) => state.productos)
  const theme = minimum
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForProductos = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogProductosAction, setdialogProductosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const empresa1AutocompleteData = useSelector((state: IState) => state.empresa1)
  const [Empresa1Options, setEmpresa1Options] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchEmpresa1Empresa1 = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'nombre', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/empresa1/search/', { params: searchOptions }).then((result) => {
      setEmpresa1Options(
        result.data.docs.map((empresa) => {
          return { label: empresa.nombre, value: empresa._id }
        })
      )
    })
  }
  const [Empresa1Value, setEmpresa1Value] = React.useState(null)
  React.useEffect(() => {
    if (!Productosdata.Empresa1) return undefined
    const asArray = Array.isArray(Productosdata.Empresa1) ? Productosdata.Empresa1 : [Productosdata.Empresa1]
    setEmpresa1Value(asArray.map((item) => ({ label: item.nombre, value: item._id })))
  }, [Productosdata.Empresa1])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          {currentUser && (
            <React.Fragment>
              <AppBar elevation={3} color="transparent" position="absolute" title="">
                <Toolbar>
                  <IconButton
                    onClickCapture={(event) => {
                      setprofileMenuAnchor(event.currentTarget)
                    }}
                    className={theme.profilePicture}
                  >
                    <picture>
                      <img src={`/img/${currentUser.ProfilePic}`} alt={`/img/${currentUser.ProfilePic}`} />
                    </picture>
                  </IconButton>

                  <Menu
                    anchorEl={profileMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(profileMenuAnchor)}
                    onClose={(params) => {
                      setprofileMenuAnchor(null)
                    }}
                  >
                    <div className={theme.menuProfileDetails}>
                      {currentUser.FirstName} {currentUser.LastName}
                    </div>

                    <MenuItem>Profile</MenuItem>
                    <MenuItem
                      onClick={(params) => {
                        AuthService.logout()
                        props.history.push('/')
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            </React.Fragment>
          )}

          <div className={theme.mainarea}>
            <Container maxWidth="lg">
              <div className={theme.tableHeading}>
                <Typography variant="h4">Producto list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Producto..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForProductos}
                    />

                    <LocalAddDialog
                      isOpen={dialogProductosAction !== ''}
                      onOpen={() => setdialogProductosAction('add')}
                      onSave={() => setdialogProductosAction('')}
                      onClose={() => setdialogProductosAction('')}
                      action={dialogProductosAction}
                      addOptions={{ title: 'Add Producto', text: 'Enter Producto data', button: 'Add' }}
                      editOptions={{ title: 'Edit Producto', text: 'Update Producto data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IProductosItem) => {
                        if (dialogProductosAction === 'delete') {
                          dispatch(removeProducto(data))
                        } else {
                          dialogProductosAction === 'add' ? dispatch(addProductos(data)) : dispatch(editProductos(data))
                        }
                      }}
                      color="primary"
                      data={Productosdata}
                      initialData={initialDataProductos}
                      setData={setProductosData}
                      allowMultipleSubmit={dialogProductosAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="marca"
                        type="text"
                        fullWidth
                        className={'field_marca'}
                        variant="standard"
                        value={Productosdata.marca || ''}
                        onChange={handleProductosChange('marca')}
                        error={productosData?.errField === 'marca'}
                        helperText={productosData?.errField === 'marca' && productosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="modelo"
                        type="text"
                        fullWidth
                        className={'field_modelo'}
                        variant="standard"
                        value={Productosdata.modelo || ''}
                        onChange={handleProductosChange('modelo')}
                        error={productosData?.errField === 'modelo'}
                        helperText={productosData?.errField === 'modelo' && productosData.errMessage}
                      />

                      <TextField
                        className={'field_fechadecompra'}
                        margin="dense"
                        label="fecha_decompra"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={Productosdata.fechadecompra?.slice(0, 10) || ''}
                        onChange={handleProductosChange('fechadecompra')}
                        error={productosData?.errField === 'fechadecompra'}
                        helperText={productosData?.errField === 'fechadecompra' && productosData.errMessage}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Productosdata.fechavencimiento}
                            color="primary"
                            onChange={(e) => handleProductosChange('fechavencimiento')(e.currentTarget.checked)}
                          />
                        }
                        label="fecha_vencimiento"
                      />

                      <TextField
                        margin="dense"
                        label="pagina_producto"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Productosdata.paginaproducto}
                        onChange={handleProductosChange('paginaproducto')}
                      />

                      <FormControlLabel
                        control={<Rating value={Productosdata.valoraciones || ''} onChange={handleProductosChange('valoraciones')} />}
                        label="valoraciones"
                      />

                      <TextField
                        margin="dense"
                        label="descripcion_gral"
                        type="text"
                        fullWidth
                        className={'field_descripciongral'}
                        variant="standard"
                        value={Productosdata.descripciongral || ''}
                        onChange={handleProductosChange('descripciongral')}
                        error={productosData?.errField === 'descripciongral'}
                        helperText={productosData?.errField === 'descripciongral' && productosData.errMessage}
                      />

                      <Autocomplete
                        value={Empresa1Value}
                        onType={typeInSearchEmpresa1Empresa1}
                        onChange={(newValue) =>
                          handleProductosChange('Empresa1')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, nombre: item.label })) : []
                          )
                        }
                        loading={empresa1AutocompleteData.loadingStatus === 'loading'}
                        options={Empresa1Options}
                        label="Empresa1"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <FileUpload label="imagen" value={Productosdata.imagen} onChange={handleProductosChange('imagen')} variant="standard" />

                      <TextField
                        margin="dense"
                        label="Precio"
                        className={'field_Precio'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Productosdata.Precio || ''}
                        onChange={handleProductosChange('Precio')}
                      />

                      <TextField
                        margin="dense"
                        label="nombre_del_producto"
                        type="text"
                        fullWidth
                        className={'field_nombredelproducto'}
                        variant="standard"
                        value={Productosdata.nombredelproducto || ''}
                        onChange={handleProductosChange('nombredelproducto')}
                        error={productosData?.errField === 'nombredelproducto'}
                        helperText={productosData?.errField === 'nombredelproducto' && productosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="cantidad_comprada"
                        className={'field_cantidadcomprada'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Productosdata.cantidadcomprada || ''}
                        onChange={handleProductosChange('cantidadcomprada')}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={[
                        'marca',
                        'modelo',
                        'fecha_decompra',
                        'fecha_vencimiento',
                        'pagina_producto',
                        'valoraciones',
                        'descripcion_gral',
                        'Empresa1',
                        'imagen',
                        'Precio',
                        'nombre_del_producto',
                        'cantidad_comprada',
                        'Actions',
                      ]}
                      tableData={productosData.foundproductos.length ? productosData.foundproductos : (productosData.productos as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.marca} />

                      <Field value={(fieldData: any) => fieldData.modelo} />

                      <Field value={(fieldData: any) => moment(fieldData.fechadecompra).utc().format('')} />

                      <Field value={(fieldData: any) => (fieldData.fechavencimiento ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />)} />

                      <Field value={(fieldData: any) => `<a href="${fieldData.paginaproducto}">${fieldData.paginaproducto}</a>`} />

                      <Field value={(fieldData: any) => <Rating value={fieldData.valoraciones} readOnly />} />

                      <Field value={(fieldData: any) => fieldData.descripciongral} />

                      <Field value={(fieldData: any) => (fieldData.Empresa1 ? fieldData.Empresa1.nombre : '')} />

                      <Field value={(fieldData: any) => (fieldData.imagen ? <img src={`/img/${fieldData.imagen}`} /> : <div />)} />

                      <Field value={(fieldData: any) => fieldData.Precio} />

                      <Field value={(fieldData: any) => fieldData.nombredelproducto} />

                      <Field value={(fieldData: any) => fieldData.cantidadcomprada} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setProductosData(e.element)
                            setdialogProductosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeProducto(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Productos
