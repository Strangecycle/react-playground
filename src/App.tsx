import { Route, Switch } from 'react-router'
import Profile from './views/Profile'
import SignIn from './views/SignIn'
import Welcome from './views/Welcome'

interface RouteOption {
  path: string
  comp: () => JSX.Element
}

const routes: RouteOption[] = [{
  path: '/sign-in',
  comp: SignIn,
}, {
  path: '/profile',
  comp: Profile,
}, {
  path: '/',
  comp: Welcome,
}]

function App() {
  const ElRoutes = routes.map((route: RouteOption) => {
    return <Route key={route.path} path={route.path} component={route.comp} />
  })

  return (
    <div className="App">
      <Switch>
        {ElRoutes}
      </Switch>
    </div>
  )
}

export default App
