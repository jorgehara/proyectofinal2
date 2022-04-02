
import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

  import { loadUsers, searchUsers } from '../store/actions/usersActions'
  import { IState } from '../store/reducers/index'
  import { useDispatch } from 'react-redux'
  import { useSelector } from 'react-redux'
  import { loadEmpresa1, searchEmpresa1 } from '../store/actions/empresa1Actions'
  import { loadProductos, searchProductos } from '../store/actions/productosActions'
  import minimum from '../components/Themes/minimum.module.scss'
  import { mergeClasses } from '../services/utils'
  import { NavLink } from 'react-router-dom'
  import ListItem from '@mui/material/ListItem'
  import ListItemText from '@mui/material/ListItemText'
  import Sidebar from '../components/Sidebar/Sidebar'
  import Typography from '@mui/material/Typography'
  import IconButton from '@mui/material/IconButton'
  import Icon from '@mui/icons-material/'
  import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
  import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
  

import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'

const Dashboard: FunctionComponent = (props: any) => {
      const classes = baseClasses
        const theme = minimum
      const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
      const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
      const {productosData.productos.nombre_del_producto} = useSelector((state: IState) => state.productos).productos
      const productosData = useSelector((state: IState) => state.productos)
      const {empresa1Data.empresa1.razon_social} = useSelector((state: IState) => state.empresa1).empresa1
      const empresa1Data = useSelector((state: IState) => state.empresa1)
      const {usersData.users.FirstName} = useSelector((state: IState) => state.users).users
      const usersData = useSelector((state: IState) => state.users)
      const dispatch = useDispatch()
      const [LoadfromUsersloadoptions, setLoadfromUsersloadoptions] = React.useState<any>({ 
  page: 1,
  populate: true,
  limit: 25,
  sort: { field: null, method: 'DESC' },
    totalItems: 0
})
const performLoadfromUsersload = (options) => {
      dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
  }
      React.useEffect(() => {
  performLoadfromUsersload({
    ...LoadfromUsersloadoptions
                  })
},[LoadfromUsersloadoptions])
      const [LoadfromEmpresa1loadoptions, setLoadfromEmpresa1loadoptions] = React.useState<any>({ 
  page: 1,
  populate: true,
  limit: 25,
  sort: { field: null, method: 'DESC' },
    totalItems: 0
})
const performLoadfromEmpresa1load = (options) => {
      dispatch(options.searchString ? searchEmpresa1(options) : loadEmpresa1(options))
  }
      React.useEffect(() => {
  performLoadfromEmpresa1load({
    ...LoadfromEmpresa1loadoptions
                  })
},[LoadfromEmpresa1loadoptions])
      const [LoadfromProductosloadoptions, setLoadfromProductosloadoptions] = React.useState<any>({ 
  page: 1,
  populate: true,
  limit: 25,
  sort: { field: null, method: 'DESC' },
    totalItems: 0
})
const performLoadfromProductosload = (options) => {
      dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
      React.useEffect(() => {
  performLoadfromProductosload({
    ...LoadfromProductosloadoptions
                  })
},[LoadfromProductosloadoptions])
  
  




if (!authHeaders()) { 
  props.history.push("/Login")
}




// Theme selection
    



    











    











    











  return (<React.Fragment>


  <div className={ theme.pages } >

  { currentUser &&
  <React.Fragment>  

<AppBar
    elevation={ 3 }
    color='transparent'    position='absolute'    title=''
>
<Toolbar >



<IconButton
  onClickCapture={ (event) => { setprofileMenuAnchor(event.currentTarget) } }  className={ theme.profilePicture }>
    
<picture>
    <img
        src={`/img/${currentUser.ProfilePic}`}
    alt={`/img/${currentUser.ProfilePic}`}
          />
</picture>


</IconButton>


    <Menu
  anchorEl={ profileMenuAnchor }
  anchorOrigin={ {
    vertical: 'bottom',
    horizontal: 'center',
  } }
  transformOrigin={ {
    vertical: 'top',
    horizontal: 'center',
  } }
  open={ Boolean(profileMenuAnchor) }
  onClose={ (params) => { setprofileMenuAnchor(null)} }
>

<div
      className={ theme.menuProfileDetails }      >

{currentUser.FirstName} {currentUser.LastName}

</div>

<MenuItem
    >
Profile
</MenuItem>
<MenuItem
    onClick={ (params) => { AuthService.logout(); props.history.push('/') } }>
Logout
</MenuItem>
</Menu>
</Toolbar>
</AppBar>

  </React.Fragment>  }



<Sidebar
    color='Greens'
        open={ true }
>




<NavLink
  exact
  to="/"
      key='d59xDuqo'
>
  <ListItem button className={classes.itemLink}>
    <ListItemText>
      Home      
    </ListItemText>
  </ListItem>
</NavLink>
  					
</Sidebar>
<div
      className={ theme.mainarea }      >

<div
      className={ classes.bigHello }      >


<Typography
  variant="h1"
    >

Hello!

</Typography>


<Typography
  variant="body1"
    >

I'm your Aptugo application

</Typography>

<span>(you can edit me at the Page Manager)</span>

</div>

</div>

</div>


</React.Fragment>)}


export default Dashboard


