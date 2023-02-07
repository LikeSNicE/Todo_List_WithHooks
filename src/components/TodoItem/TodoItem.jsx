import React, { useState, useLayoutEffect, useRef } from "react";
import styles from './TodoItem.module.scss';


const TodoItem = ({
  title,
  onDone,
  id,
  onRemove,
  onEditMode
}) => {

  const [checked, setChecked] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef(null);

  useLayoutEffect(() => {
    if (isEditMode && editTitleInputRef) {
      editTitleInputRef.current.focus();
    }
  }, [isEditMode])

  return (
    <div className={styles.inputItem}>
      <label className={styles.inputItemLabel}>
        <input
          type='checkbox'
          className={styles.inputItemCheckbox}
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked)
            setTimeout(() => {
              onDone(id)
            }, 300)
          }}
        />
        {isEditMode ?
          (
            <input 
              value={value}
              className={styles.inputItemTitleEdit}
              onChange={(event) => {
                setValue(event.target.value)
              }}
              ref={editTitleInputRef}
            />)
          :
          (<h3 className={styles.inputItemTitle}>{title}</h3>)
        }
      </label>

      {
        isEditMode ?
          (<button
            className={styles.inputItemSave}
            aria-label='Save'
            onClick={() => {
              onEditMode(id,value)
              setEditMode(false)
            }}
          />
          )
          :
          (<button className={styles.inputItemEdit}
            onClick={() => setEditMode(!isEditMode)}
            aria-label='Edit' />)
      }
      
      <button
        className={styles.inputItemRemove}
        onClick={() => onRemove(id)}
        aria-label='Remove'
      />
    </div>
  )
}

export default TodoItem;