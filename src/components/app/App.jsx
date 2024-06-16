/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import Header from '../header'
import ArticlesList from '../../pages/articles'
import { loadArticles } from '../../store/slices/articleSlice'
import { loadCurrentUser } from '../../store/slices/currentUserSlice'
import ArticleListItem from '../article'
import SignInForm from '../../pages/auth/sign-in'
import SignUpForm from '../../pages/auth/sign-up'
import EditProfileForm from '../../pages/auth/profile'

import styles from './App.module.scss'

// убрать в проде
let busy = false

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!busy) {
      dispatch(loadArticles())
      dispatch(loadCurrentUser())
    }
    return () => {
      busy = true
    }
  }, [])

  const { authorized } = useSelector((store) => {
    return store.currentUser
  })
  const { loadingProfileData } = useSelector((store) => {
    return store.commonState
  })

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
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route
            exact
            path="/profile"
            render={({ location, history, match }) => {
              return <EditProfileForm />
            }}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
