import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchRegisterNewUser } from '../../../api'
import { addError } from '../../../store/slices/commonStateSlice'
import Input from '../input-form-item'
import styles from '../AuthFormCommonStyles.module.scss'
import { updateCurrentUser } from '../../../store/slices/currentUserSlice'
import translateResponse from '../../../utils/translateResponse'

export default function SignUpForm({ history }) {
  const dispatch = useDispatch()
  const {
    register,
    setError,
    clearErrors,
    control,
    formState: { isSubmitted, errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur' })
  const onSubmit = async (formData) => {
    try {
      const data = await fetchRegisterNewUser(formData)
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
      <h2 className={styles.title}>Create new account</h2>
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
            if (isSubmitted && errors.username?.type === '422') {
              clearErrors()
            }
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
          onChange: () => {
            if (isSubmitted && errors.email?.type === '422') {
              clearErrors()
            }
          },
        }}
        defaultValue=""
      />
      <Controller
        render={({ field, fieldState: { error } }) => {
          return (
            <Input field={field} label="Password" id="password" placeholder="Password" error={error} type="password" />
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
              label="Repeat Password"
              id="repeat-password"
              placeholder="Password"
              error={error}
              type="password"
            />
          )
        }}
        name="repeat-password"
        control={control}
        rules={{
          required: 'Обязательное поле',
          validate: (value, form) => value === form.password || 'Пароли не совпадают',
        }}
        defaultValue=""
      />
      <div className={styles.divider} />
      <label
        className={`${styles['data-processing-checkbox-wrapper']} ${errors['data-processing'] ? styles.invalid : null}`}
        htmlFor="data-processing-checkbox"
      >
        <div className={styles['data-processing-checkbox']}>
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('data-processing', { required: true })}
            className={styles['data-processing-input']}
            type="checkbox"
            id="data-processing-checkbox"
          />
          <span className={styles['data-processing-decore']} />
        </div>
        I agree to the processing of my personal <br />
        information
      </label>
      <p className={styles['form-items-group']}>
        <input className={styles['form-submit']} type="submit" value="Create" />
        <span className={styles['form-login-message']}>
          Already have an account?{' '}
          <Link className={styles['form-login-message-link']} to="/sign-in">
            Sign In.
          </Link>
        </span>
      </p>
    </form>
  )
}
