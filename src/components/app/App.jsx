import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../header'
import ArticlesListPage from '../pages/articles'
import { fetchArticles } from '../../store/slices/articleSlice'
import ArticleListItem from '../article'

import styles from './App.module.scss'

let busy = false

function App() {
  const dispatch = useDispatch()
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
          <Route
            path="/articles/:slug"
            render={({ match, location, history }) => {
              console.log('📢[App.jsx:35]: match: ', match)
              console.log('📢[App.jsx:36]: location: ', location)
              console.log('📢[App.jsx:37]: history: ', history)
              const { slug } = match.params
              return <ArticleListItem articleId={slug} withBody />
            }}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
