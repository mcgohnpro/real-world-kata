/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../header'
import ArticlesListPage from '../pages/articles'
import { fetchArticles } from '../../store/slices/articleSlice'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  let busy = false
  useEffect(() => {
    if (!busy) {
      dispatch(fetchArticles())
    }
    return () => {
      busy = true
    }
  }, [])

  return (
    <Router>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path="/" exact component={ArticlesListPage} />
          <Route path="/articles/" exact component={ArticlesListPage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
