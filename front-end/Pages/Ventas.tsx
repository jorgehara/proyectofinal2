import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AppBar from '@mui/material/AppBar'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import minimum from '../components/Themes/minimum.module.scss'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addVentas, editVentas, loadVentas, removeVenta, searchVentas } from '../store/actions/ventasActions'
import { IVentasItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Ventas: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataVentas = {
    Nombredelproducto: null,
    cantidad: '',
    Precio: null,
  }
  const [Ventasdata, setVentasData] = React.useState<any>(initialDataVentas)
  const handleVentasChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setVentasData({
      ...Ventasdata,
      [name]: value,
    })
  }
  const ventasData = useSelector((state: IState) => state.ventas)
  const theme = minimum
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForVentas = (event) => {
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
    dispatch(options.searchString ? searchVentas(options) : loadVentas(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogVentasAction, setdialogVentasAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const productosAutocompleteData = useSelector((state: IState) => state.productos)
  const [NombredelproductoOptions, setNombredelproductoOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchNombredelproductoProductos = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'nombredelproducto', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/productos/search/', { params: searchOptions }).then((result) => {
      setNombredelproductoOptions(
        result.data.docs.map((producto) => {
          return { label: producto.nombredelproducto, value: producto._id }
        })
      )
    })
  }
  const [NombredelproductoValue, setNombredelproductoValue] = React.useState(null)
  React.useEffect(() => {
    if (!Ventasdata.Nombredelproducto) return undefined
    const asArray = Array.isArray(Ventasdata.Nombredelproducto) ? Ventasdata.Nombredelproducto : [Ventasdata.Nombredelproducto]
    setNombredelproductoValue(asArray.map((item) => ({ label: item.nombredelproducto, value: item._id })))
  }, [Ventasdata.Nombredelproducto])
  const [PrecioOptions, setPrecioOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchPrecioProductos = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Precio', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/productos/search/', { params: searchOptions }).then((result) => {
      setPrecioOptions(
        result.data.docs.map((producto) => {
          return { label: producto.Precio, value: producto._id }
        })
      )
    })
  }
  const [PrecioValue, setPrecioValue] = React.useState(null)
  React.useEffect(() => {
    if (!Ventasdata.Precio) return undefined
    const asArray = Array.isArray(Ventasdata.Precio) ? Ventasdata.Precio : [Ventasdata.Precio]
    setPrecioValue(asArray.map((item) => ({ label: item.Precio, value: item._id })))
  }, [Ventasdata.Precio])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchVentas(options) : loadVentas(options))
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
                <Typography variant="h4">Venta list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Venta..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForVentas}
                    />

                    <LocalAddDialog
                      isOpen={dialogVentasAction !== ''}
                      onOpen={() => setdialogVentasAction('add')}
                      onSave={() => setdialogVentasAction('')}
                      onClose={() => setdialogVentasAction('')}
                      action={dialogVentasAction}
                      addOptions={{ title: 'Add Venta', text: 'Enter Venta data', button: 'Add' }}
                      editOptions={{ title: 'Edit Venta', text: 'Update Venta data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IVentasItem) => {
                        if (dialogVentasAction === 'delete') {
                          dispatch(removeVenta(data))
                        } else {
                          dialogVentasAction === 'add' ? dispatch(addVentas(data)) : dispatch(editVentas(data))
                        }
                      }}
                      color="primary"
                      data={Ventasdata}
                      initialData={initialDataVentas}
                      setData={setVentasData}
                      allowMultipleSubmit={dialogVentasAction === 'add'}
                    >
                      <Autocomplete
                        value={NombredelproductoValue}
                        onType={typeInSearchNombredelproductoProductos}
                        onChange={(newValue) =>
                          handleVentasChange('Nombredelproducto')(
                            newValue?.length
                              ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, nombredelproducto: item.label }))
                              : []
                          )
                        }
                        loading={productosAutocompleteData.loadingStatus === 'loading'}
                        options={NombredelproductoOptions}
                        label="Nombre_del_producto"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <TextField
                        margin="dense"
                        label="cantidad"
                        className={'field_cantidad'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Ventasdata.cantidad || ''}
                        onChange={handleVentasChange('cantidad')}
                      />

                      <Autocomplete
                        value={PrecioValue}
                        onType={typeInSearchPrecioProductos}
                        onChange={(newValue) =>
                          handleVentasChange('Precio')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Precio: item.label })) : []
                          )
                        }
                        loading={productosAutocompleteData.loadingStatus === 'loading'}
                        options={PrecioOptions}
                        label="Precio"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['Nombre_del_producto', 'cantidad', 'Precio', 'Actions']}
                      tableData={ventasData.foundventas.length ? ventasData.foundventas : (ventasData.ventas as any)}
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
                      <Field value={(fieldData: any) => (fieldData.Nombredelproducto ? fieldData.Nombredelproducto.nombredelproducto : '')} />

                      <Field value={(fieldData: any) => fieldData.cantidad} />

                      <Field value={(fieldData: any) => (fieldData.Precio ? fieldData.Precio.Precio : '')} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setVentasData(e.element)
                            setdialogVentasAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeVenta(e.element))
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

export default Ventas
