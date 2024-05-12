/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Header from '../header'
import ArticlesListPage from '../pages/articles'

import styles from './App.module.scss'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={ArticlesListPage} />
        <Route path="/articles/" exact component={ArticlesListPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
