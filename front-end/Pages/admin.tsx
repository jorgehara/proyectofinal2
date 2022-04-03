import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import minimum from '../components/Themes/minimum.module.scss'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import baseClasses from './layout.module.scss'

const Admin: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = minimum
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  // Theme selection

  return (
    <React.Fragment>
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

        <Sidebar color="Greens" open={true}>
          <NavLink exact to="/Empresa1" key="eFb6frbU">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Empresa1</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Users" key="cUMuRngy">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Ventas" key="EPT0RKuW">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Ventas</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Productos" key="danno9z7">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Productos</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Users" key="5e7tisMT">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Empresa1" key="6kr1WqN8">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Empresa1</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Productos" key="gaUqkAEI">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Productos</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Ventas" key="AxNQHLAs">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Ventas</ListItemText>
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

export default Admin
