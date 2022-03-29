import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import minimum from '../components/Themes/minimum.module.scss'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = minimum

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
