import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import React, { FunctionComponent } from 'react'
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
      <div className={classes.mainPanel}>
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
      </div>
    </React.Fragment>
  )
}

export default Admin
