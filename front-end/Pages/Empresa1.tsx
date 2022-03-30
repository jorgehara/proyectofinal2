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
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import minimum from '../components/Themes/minimum.module.scss'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addEmpresa1, editEmpresa1, loadEmpresa1, removeEmpresa, searchEmpresa1 } from '../store/actions/empresa1Actions'
import { IEmpresa1Item } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Empresa1: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataEmpresa1 = {
    nombre: '',
    razonsocial: '',
    direccion: '',
    descripciongral: '',
    contactocelu: '',
  }
  const [Empresa1data, setEmpresa1Data] = React.useState<any>(initialDataEmpresa1)
  const handleEmpresa1Change = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setEmpresa1Data({
      ...Empresa1data,
      [name]: value,
    })
  }
  const empresa1Data = useSelector((state: IState) => state.empresa1)
  const theme = minimum
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForEmpresa1 = (event) => {
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
    dispatch(options.searchString ? searchEmpresa1(options) : loadEmpresa1(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogEmpresa1Action, setdialogEmpresa1Action] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchEmpresa1(options) : loadEmpresa1(options))
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
                <Typography variant="h4">Empresa list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Empresa..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForEmpresa1}
                    />

                    <LocalAddDialog
                      isOpen={dialogEmpresa1Action !== ''}
                      onOpen={() => setdialogEmpresa1Action('add')}
                      onSave={() => setdialogEmpresa1Action('')}
                      onClose={() => setdialogEmpresa1Action('')}
                      action={dialogEmpresa1Action}
                      addOptions={{ title: 'Add Empresa', text: 'Enter Empresa data', button: 'Add' }}
                      editOptions={{ title: 'Edit Empresa', text: 'Update Empresa data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IEmpresa1Item) => {
                        if (dialogEmpresa1Action === 'delete') {
                          dispatch(removeEmpresa(data))
                        } else {
                          dialogEmpresa1Action === 'add' ? dispatch(addEmpresa1(data)) : dispatch(editEmpresa1(data))
                        }
                      }}
                      color="primary"
                      data={Empresa1data}
                      initialData={initialDataEmpresa1}
                      setData={setEmpresa1Data}
                      allowMultipleSubmit={dialogEmpresa1Action === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="nombre"
                        type="text"
                        fullWidth
                        className={'field_nombre'}
                        variant="standard"
                        value={Empresa1data.nombre || ''}
                        onChange={handleEmpresa1Change('nombre')}
                        error={empresa1Data?.errField === 'nombre'}
                        helperText={empresa1Data?.errField === 'nombre' && empresa1Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="razon_social"
                        type="text"
                        fullWidth
                        className={'field_razonsocial'}
                        variant="standard"
                        value={Empresa1data.razonsocial || ''}
                        onChange={handleEmpresa1Change('razonsocial')}
                        error={empresa1Data?.errField === 'razonsocial'}
                        helperText={empresa1Data?.errField === 'razonsocial' && empresa1Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="direccion"
                        type="text"
                        fullWidth
                        className={'field_direccion'}
                        variant="standard"
                        value={Empresa1data.direccion || ''}
                        onChange={handleEmpresa1Change('direccion')}
                        error={empresa1Data?.errField === 'direccion'}
                        helperText={empresa1Data?.errField === 'direccion' && empresa1Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="descripcion_gral"
                        type="text"
                        fullWidth
                        className={'field_descripciongral'}
                        variant="standard"
                        value={Empresa1data.descripciongral || ''}
                        onChange={handleEmpresa1Change('descripciongral')}
                        error={empresa1Data?.errField === 'descripciongral'}
                        helperText={empresa1Data?.errField === 'descripciongral' && empresa1Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="contacto_celu"
                        className={'field_contactocelu'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Empresa1data.contactocelu || ''}
                        onChange={handleEmpresa1Change('contactocelu')}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['nombre', 'razon_social', 'direccion', 'descripcion_gral', 'contacto_celu', 'Actions']}
                      tableData={empresa1Data.foundempresa1.length ? empresa1Data.foundempresa1 : (empresa1Data.empresa1 as any)}
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
                      <Field value={(fieldData: any) => fieldData.nombre} />

                      <Field value={(fieldData: any) => fieldData.razonsocial} />

                      <Field value={(fieldData: any) => fieldData.direccion} />

                      <Field value={(fieldData: any) => fieldData.descripciongral} />

                      <Field value={(fieldData: any) => fieldData.contactocelu} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setEmpresa1Data(e.element)
                            setdialogEmpresa1Action('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeEmpresa(e.element))
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

export default Empresa1
