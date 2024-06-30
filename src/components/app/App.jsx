import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { ROUTE_PATH } from '../../constants/routes-constants'
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
            path={ROUTE_PATH.ROOT_PATH}
            exact
            render={() => {
              return <ArticlesList />
            }}
          />
          <Route
            exact
            path={ROUTE_PATH.ARTICLES}
            render={() => {
              return <ArticlesList />
            }}
          />
          <Route
            exact
            path={ROUTE_PATH.ARTICLE_WITH_SLUG}
            render={({ match }) => {
              const { slug } = match.params
              return <ArticleListItem articleId={slug} withBody />
            }}
          />
          <PrivateRoute exact path={ROUTE_PATH.EDIT_ARTICLE} component={EditArticle} />
          <Route exact path={ROUTE_PATH.SIGN_IN} component={SignInForm} />
          <Route exact path={ROUTE_PATH.SIGN_UP} component={SignUpForm} />
          <PrivateRoute exact path={ROUTE_PATH.PROFILE} component={EditProfileForm} />
          <PrivateRoute exact path={ROUTE_PATH.NEW_ARTICLE} component={CreateArticle} />
          <Redirect to={ROUTE_PATH.ROOT_PATH} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
