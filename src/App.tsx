import React, { Fragment, ReactComponentElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
} from 'react-router'
import { setUserCreatorSync } from './store/actions/user'
import { getStorageItem } from './utils'
import { getToken } from './utils/auth'
import Profile from './views/Profile'
import SignIn from './views/SignIn'
import Welcome from './views/Welcome'

interface RouteMetaData {
  auth?: boolean
}

interface RouteOption extends RouteProps {
  component: any
  meta?: RouteMetaData
}

const routes: RouteOption[] = [
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: '/',
    component: Welcome,
  },
]

function App() {
  const ElRoutes = routes.map((route: RouteOption, index: number) => {
    return (
      <Route
        key={index}
        path={route.path}
        render={(props) => {
          const userInfo = getStorageItem('user')

          if (route.meta?.auth && !userInfo) {
            return (
              <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            )
          }
          return <route.component {...props} route={route} />
        }}
      />
    )
  })
  
  return (
    <div className="App">
      <Switch>{ElRoutes}</Switch>
    </div>
  )
}

export default App
