import React, { useState,useCallback } from "react";
import styles from './TodoAdd.module.scss';

const TodoAdd = ({onAdd}) => {

  const[inputValue,setInputValue] = useState('');
  const onAddMemoized = useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  },[inputValue])

  return(
    <div className={styles.inputAdd}>
      <input
        className={styles.inputAddValue}
        type="text"
        placeholder="Type here for a magic"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if(event.key === 'Enter'){
            // onAdd(inputValue);
            onAddMemoized();
          }
        }}
      />
      <button
        className={styles.inputAddButton}
        onClick={() => {
          onAddMemoized()
          // onAdd(inputValue)
          // setInputValue('');
        }}
        aria-label="Add"
      />  
    </div>
  )
}

export default TodoAdd;
