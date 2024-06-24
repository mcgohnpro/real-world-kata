/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import { useState } from 'react'

import styles from './TagListItem.module.scss'

// TODO добавить дефолтные пропсы и проптайпсы
export default function TagListItem({ value: { tagName }, onChange, onBlur, addTag, removeTag, index }) {
  return (
    <li className={styles['tag-list-item']}>
      <input
        onBlur={onBlur}
        onChange={(e) => {
          onChange({ tagName: e.target.value })
        }}
        value={tagName}
        type="text"
        placeholder="Tag"
        className={styles['form-item-input']}
      />
      <input
        onClick={() => {
          removeTag(index)
        }}
        value="Delete"
        type="button"
        className={`${styles['form-button']} ${styles['form-button--remove']}`}
      />
      <input
        onClick={() => {
          addTag({ tagName })
          onChange({ tagName: '' })
        }}
        value="Add tag"
        type="button"
        className={`${styles['form-button']} ${styles['form-button--add-tag']}`}
      />
    </li>
  )
}

TagListItem.defaultProps = {
  removeTag: () => {},
}
