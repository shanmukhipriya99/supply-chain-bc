import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const AddAsset = React.lazy(() => import('pages/addAsset'));
const AddTxn = React.lazy(() => import('pages/addTxn'));
const CustDashboard = React.lazy(() => import('pages/CustDashboard'));
const CustAssets = React.lazy(() => import('pages/CustAssets'));
const Transactions = React.lazy(() => import('pages/Transactions'));
const TrackAsset = React.lazy(() => import('pages/TrackAsset'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/addAsset" component={AddAsset} />
                <Route exact path="/transferAsset/:id" component={AddTxn} />
                <Route exact path="/txns" component={Transactions} />
                <Route exact path="/trackAsset/:id" component={TrackAsset} />
                <Route exact path="/dropdowns" component={CustDashboard} />
                <Route exact path="/progress" component={CustAssets} />
              </React.Suspense>
              
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
