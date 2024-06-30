import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'
import isValidHttpUrl from '../../../utils/isValidHttpUrl'
import { fetchUpdateProfile } from '../../../api'
import { updateCurrentUser } from '../../../store/slices/currentUserSlice'
import translateResponse from '../../../utils/translateResponse'
import { addError } from '../../../store/slices/commonStateSlice'
import { ROUTE_PATH } from '../../../constants/routes-constants'

export default function EditProfileForm({ history }) {
  const { username, email, image, token } = useSelector((store) => {
    return store.currentUser
  })
  const dispatch = useDispatch()

  const { setError, control, handleSubmit, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username,
      email,
      image,
    },
  })

  const onSubmit = async (formData) => {
    try {
      const data = await fetchUpdateProfile({ ...formData, token })
      data.user.authorized = true
      dispatch(updateCurrentUser(data))
      history.push(ROUTE_PATH.ROOT_PATH)
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
      <Controller
        render={({ field, fieldState: { error } }) => {
          return <Input field={field} label="Username" id="username" placeholder="Username" error={error} type="text" />
        }}
        name="username"
        control={control}
        rules={{
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
        defaultValue=""
      />

      <Controller
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              field={field}
              label="Email address"
              id="email"
              placeholder="Email address"
              error={error}
              type="email"
            />
          )
        }}
        name="email"
        control={control}
        rules={{
          required: 'Обязательное поле',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Некорректный email',
          },
        }}
        defaultValue=""
      />

      <Controller
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              field={field}
              label="New password"
              id="password"
              placeholder="New password"
              error={error}
              type="password"
            />
          )
        }}
        name="password"
        control={control}
        rules={{
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
        defaultValue=""
      />

      <Controller
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              field={field}
              label="Avatar image (url)"
              id="image"
              placeholder="Avatar image (url)"
              error={error}
              type="url"
            />
          )
        }}
        name="image"
        control={control}
        rules={{
          validate: (url) => url === '' || isValidHttpUrl(url) || 'Некорректный URL',
        }}
        defaultValue=""
      />

      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Save" />
      </p>
    </form>
  )
}
