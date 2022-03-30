import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import minimum from '../components/Themes/minimum.module.scss'
import { loadEmpresa1, searchEmpresa1 } from '../store/actions/empresa1Actions'
import { loadProductos, searchProductos } from '../store/actions/productosActions'
import { loadUsers, searchUsers } from '../store/actions/usersActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = minimum
  const productosData = useSelector((state: IState) => state.productos)
  const empresa1Data = useSelector((state: IState) => state.empresa1)
  const usersData = useSelector((state: IState) => state.users)
  const dispatch = useDispatch()
  const [LoadfromUsersloadoptions, setLoadfromUsersloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromUsersload = (options) => {
    dispatch(options.searchString ? searchUsers(options) : loadUsers(options))
  }
  React.useEffect(() => {
    performLoadfromUsersload({
      ...LoadfromUsersloadoptions,
    })
  }, [LoadfromUsersloadoptions])
  const [LoadfromEmpresa1loadoptions, setLoadfromEmpresa1loadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromEmpresa1load = (options) => {
    dispatch(options.searchString ? searchEmpresa1(options) : loadEmpresa1(options))
  }
  React.useEffect(() => {
    performLoadfromEmpresa1load({
      ...LoadfromEmpresa1loadoptions,
    })
  }, [LoadfromEmpresa1loadoptions])
  const [LoadfromProductosloadoptions, setLoadfromProductosloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromProductosload = (options) => {
    dispatch(options.searchString ? searchProductos(options) : loadProductos(options))
  }
  React.useEffect(() => {
    performLoadfromProductosload({
      ...LoadfromProductosloadoptions,
    })
  }, [LoadfromProductosloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Sidebar color="Greens" open={true}>
          <NavLink exact to="/" key="d59xDuqo">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>
        </Sidebar>
        <div className={theme.mainarea}>
          <div className={classes.bigHello}>
            <Typography variant="h1">Hello!</Typography>

            <Typography variant="body1">I'm your Aptugo application</Typography>

            <span>(you can edit me at the Page Manager)</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
