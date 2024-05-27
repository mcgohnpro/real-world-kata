/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import Header from '../header'
import ArticlesList from '../pages/articles'
import { loadArticles } from '../../store/slices/articleSlice'
import ArticleListItem from '../article'
import SignInForm from '../pages/sign-in'

import styles from './App.module.scss'

// убрать в проде
let busy = false

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!busy) {
      dispatch(loadArticles())
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
          <Route
            path="/"
            exact
            render={() => {
              return <ArticlesList />
            }}
          />
          <Route
            exact
            path="/articles/"
            render={() => {
              return <ArticlesList />
            }}
          />
          <Route
            exact
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <ArticleListItem articleId={slug} withBody />
            }}
          />
          <Route exact path="/sign-in" component={SignInForm} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
