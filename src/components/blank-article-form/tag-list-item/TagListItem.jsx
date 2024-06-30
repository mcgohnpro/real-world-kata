import PropTypes from 'prop-types'

import styles from './TagListItem.module.scss'

export default function TagListItem({ value: { tagName }, onChange, onBlur, addTag, removeTag, index, length }) {
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
          if (length > 1) {
            removeTag(index)
          } else {
            onChange({ tagName: '' })
          }
        }}
        value="Delete"
        type="button"
        className={`${styles['form-button']} ${styles['form-button--remove']}`}
      />
      <input
        onClick={() => {
          if (tagName !== '') {
            addTag({ tagName: '' })
          }
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
  tagName: '',
  onChange: () => {},
  onBlur: () => {},
  addTag: () => {},
  index: 0,
  length: 1,
}

TagListItem.propTypes = {
  removeTag: PropTypes.func,
  tagName: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  addTag: PropTypes.func,
  index: PropTypes.number,
  length: PropTypes.number,
}
