import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ArticlesList from '../../pages/articles'
import EditProfileForm from '../../pages/auth/profile'
import SignInForm from '../../pages/auth/sign-in'
import SignUpForm from '../../pages/auth/sign-up'
import CreateArticle from '../../pages/create-article'
import EditArticle from '../../pages/edit-article'
import { loadArticles } from '../../store/slices/articleSlice'
import { loadCurrentUser } from '../../store/slices/currentUserSlice'
import ArticleListItem from '../article'
import Header from '../header'
import PrivateRoute from '../private-route/PrivateRoute'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadArticles())
    dispatch(loadCurrentUser())
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
          <Route
            exact
            path="/articles/:slug/edit"
            render={(routeProps) => {
              return <EditArticle routeProps={routeProps} />
            }}
          />
          <Route exact path="/sign-in" component={SignInForm} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <PrivateRoute exact path="/profile" component={EditProfileForm} />
          <Route path="/new-article" component={CreateArticle} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
