import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Ventas = React.lazy(() => import('./Pages/Ventas'))
const Productos = React.lazy(() => import('./Pages/Productos'))
const Empresa1 = React.lazy(() => import('./Pages/Empresa1'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/Ventas',
      name: 'Ventas',
      component: Ventas,
    },
    {
      path: '/Productos',
      name: 'Productos',
      component: Productos,
    },
    {
      path: '/Empresa1',
      name: 'Empresa1',
      component: Empresa1,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
