/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../header'
import ArticlesListPage from '../pages/articles'
import { fetchArticles } from '../../store/slices/articleSlice'
import ArticleListItem from '../article'

import styles from './App.module.scss'

function fetchArticleBySlug(slug) {
  return fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Error fetch article by slug')
    })
    .then((json) => {
      return json.article
    })
}

export function withSlugArticle(WrappedComponent) {
  return function NewComp(props) {
    const { slug } = props
    const [article, setArticle] = useState()
    useEffect(() => {
      fetchArticleBySlug(slug).then((articleBySlug) => {
        setArticle(articleBySlug)
      })
    }, [])
    if (article) return <WrappedComponent article={article} withBody />
  }
}

const WC = withSlugArticle(ArticleListItem)

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
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <WC slug={slug} />
            }}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
