/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

import styles from '../AuthFormCommonStyles.module.scss'

export default function Input({ field, label, id, placeholder, error, type }) {
  return (
    <p className={styles['form-items-group']}>
      <label className={styles['form-item-label']} htmlFor={id}>
        {label}
      </label>
      <input
        {...field}
        id={id}
        className={`${styles['form-item-input']} ${error ? styles.invalid : null}`}
        type={type}
        placeholder={placeholder}
      />
      {error ? <span className={styles['validate-error']}>{error.message}</span> : null}
    </p>
  )
}

Input.defaultProps = {
  label: '',
  register: () => {},
  placeholder: '',
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}
