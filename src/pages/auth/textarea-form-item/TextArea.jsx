/* eslint-disable react/jsx-props-no-spreading */
import styles from '../AuthFormCommonStyles.module.scss'

// TODO проверить почему не работает валидация
export default function TextArea({ field, label, id, placeholder, error }) {
  return (
    <p className={styles['form-items-group']}>
      <label className={styles['form-item-label']} htmlFor={id}>
        {label}
      </label>
      <textarea
        {...field}
        id={id}
        className={`${styles['form-item-textarea']} ${error ? styles.invalid : null}`}
        placeholder={placeholder}
      />
      {error ? <span className={styles['validate-error']}>{error.message}</span> : null}
    </p>
  )
}
