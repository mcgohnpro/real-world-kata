/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'
import isValidHttpUrl from '../../../utils/isValidHttpUrl'
import { fetchUpdateProfile } from '../../../api'
import { updateCurrentUser } from '../../../store/slices/currentUserSlice'
import translateResponse from '../../../utils/translateResponse'
import { addError } from '../../../store/slices/commonStateSlice'

export default function EditProfileForm() {
  const { username, email, image, token, authorized } = useSelector((store) => {
    return store.currentUser
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    register,
    setError,
    clearErrors,
    reset,
    formState: { isSubmitted, errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username,
      email,
      image,
    },
  })

  useEffect(() => {
    setValue('username', username)
    setValue('email', email)
    setValue('image', image)
  }, [username])

  const onSubmit = async (formData) => {
    try {
      const data = await fetchUpdateProfile({ ...formData, token })
      data.user.authorized = true
      dispatch(updateCurrentUser(data))
      history.push('/')
    } catch ({ name, message, stack, response, response: { status, url } }) {
      if (status === 422) {
        const errorData = await response.json()
        Object.entries(errorData.errors).forEach((item) => {
          const [field, error] = item
          setError(field, { type: '422', message: translateResponse(error) })
        })
      } else {
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
      <h2 className={styles.title}>Edit Profile</h2>
      <Input
        id="username"
        label="Username"
        register={register}
        validation={{
          required: 'Обязательное поле',
          minLength: {
            value: 3,
            message: 'Поле должно содержать от 3 до 20 символов',
          },
          maxLength: {
            value: 20,
            message: 'Поле должно содержать от 3 до 20 символов',
          },
          onChange: (e) => {
            setValue('username', e.target.value.trim())
          },
        }}
        type="text"
        placeholder="Username"
        errors={errors}
      />
      <Input
        id="email"
        label="Email address"
        register={register}
        validation={{
          required: 'Обязательное поле',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Неверный email',
          },
        }}
        type="email"
        placeholder="Email address"
        errors={errors}
      />
      <Input
        id="password"
        label="New password"
        register={register}
        validation={{
          required: 'Обязательное поле',
          minLength: {
            value: 6,
            message: 'Поле должно содержать от 6 до 40 символов',
          },
          maxLength: {
            value: 40,
            message: 'Поле должно содержать от 6 до 40 символов',
          },
        }}
        type="password"
        placeholder="New password"
        errors={errors}
      />
      <Input
        id="image"
        label="Avatar image (url)"
        register={register}
        validation={{
          validate: (url) => url === '' || isValidHttpUrl(url) || 'Некорректный URL',
        }}
        type="url"
        placeholder="Avatar image (url)"
        errors={errors}
      />
      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Save" />
      </p>
    </form>
  )
}
