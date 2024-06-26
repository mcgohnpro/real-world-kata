import { useState, useEffect } from 'react'

import { fetchArticleBySlug } from '../../api'
import BlankArticleForm from '../../components/blank-article-form'

export default function EditArticle({ match }) {
  const { slug } = match.params
  const [article, setArticle] = useState()

  useEffect(() => {
    fetchArticleBySlug(slug).then(({ title, description, body, tagList }) => {
      setArticle({
        title,
        description,
        body,
        tagList: tagList.map((value) => {
          return { tagName: value }
        }),
      })
    })
  }, [])

  return article ? <BlankArticleForm defaultValues={article} title="Edit article" /> : null
}
