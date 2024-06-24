/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../header'
import ArticlesList from '../../pages/articles'
import { loadArticles } from '../../store/slices/articleSlice'
import { loadCurrentUser } from '../../store/slices/currentUserSlice'
import ArticleListItem from '../article'
import SignInForm from '../../pages/auth/sign-in'
import SignUpForm from '../../pages/auth/sign-up'
import EditProfileForm from '../../pages/auth/profile'
import PrivateRoute from '../private-route/PrivateRoute'
import CreateArticle from '../../pages/create-article'
import EditArticle from '../../pages/edit-article'

import styles from './App.module.scss'

// TODO проверить все use селекторы, убрать всю деструктуризацию, привести к обычным переменным
// TODO убрать в проде busy
// TODO подумать как реализовать, чтобы загрузка показывалась, если только реально долго приходят данные, например через секунду

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
