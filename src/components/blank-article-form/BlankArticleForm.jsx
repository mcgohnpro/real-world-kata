/* eslint-disable react/jsx-props-no-spreading */
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

import Input from '../../pages/auth/input-form-item/Input'
import TextArea from '../../pages/auth/textarea-form-item'
import { fetchCreateArticle, fetchUpdateArticle } from '../../api'
import { addError } from '../../store/slices/commonStateSlice'

import styles from './BlankArticleForm.module.scss'
import TagListItem from './tag-list-item'

export default function BlankArticleForm({ title, defaultValues }) {
  const { handleSubmit, control, setError } = useForm({ mode: 'onBlur', defaultValues })
  const token = useSelector((store) => store.currentUser.token)
  const history = useHistory()
  const {
    path,
    params: { slug },
  } = useRouteMatch()
  const dispatch = useDispatch()
  const { fields, append, remove } = useFieldArray({ control, name: 'tagList' })

  const onSubmit = async (formData) => {
    try {
      if (path === '/new-article') {
        await fetchCreateArticle({ ...formData, token })
        history.push('/')
      } else if (path === '/articles/:slug/edit') {
        await fetchUpdateArticle({ ...formData, token }, slug)
        history.push(`/articles/${slug}`)
      }
    } catch ({ name, message, stack, response, response: { status, url } }) {
      switch (status) {
        case 401:
          history.push('/')
          break
        case 422:
          {
            const errorData = await response.json()
            Object.entries(errorData.errors).forEach((item) => {
              const [field, errorMessage] = item
              setError(field, { type: '422', message: errorMessage })
            })
          }
          break
        default:
          dispatch(
            addError({
              name,
              message,
              stack,
              status,
              url,
            })
          )
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-in-form']}>
      <h2 className={styles.title}>{title}</h2>
      <Controller
        render={({ field, fieldState: { error } }) => {
          return <Input field={field} label="Title" id="title" placeholder="Title" error={error} type="text" />
        }}
        name="title"
        control={control}
        rules={{ required: 'Обязательнео поле' }}
        defaultValue=""
      />
      <Controller
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              field={field}
              label="Short description"
              id="short-description"
              placeholder="Text"
              error={error}
              type="text"
            />
          )
        }}
        name="description"
        control={control}
        rules={{ required: 'Обязательнео поле' }}
        defaultValue=""
      />
      <Controller
        render={({ field, fieldState: { error } }) => {
          return <TextArea field={field} label="Text" id="articleText" placeholder="Text" error={error} />
        }}
        name="body"
        control={control}
        rules={{ required: 'Обязательнео поле' }}
      />
      <div className={styles['form-tags-wrapper']}>
        <span className={styles['form-tags-header']}>Tags</span>
        <div className={styles['form-items-group']}>
          <ul className={styles['tag-list']}>
            {fields.map((field, index) => (
              <Controller
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <TagListItem onChange={onChange} onBlur={onBlur} value={value} removeTag={remove} index={index} />
                  )
                }}
                key={field.id}
                name={`tagList.${index}`}
                control={control}
              />
            ))}
            <Controller
              render={({ field: { onChange, onBlur, value } }) => {
                return <TagListItem onChange={onChange} onBlur={onBlur} value={value} addTag={append} />
              }}
              name="new-tag-input"
              control={control}
              defaultValue={{ tagName: '' }}
            />
          </ul>
        </div>
      </div>
      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Send" />
      </p>
    </form>
  )
}
