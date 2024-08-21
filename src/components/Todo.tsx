import React, { ChangeEvent } from "react";
import styles from "./Todo.module.css";
import { TrashIcon } from "@heroicons/react/24/outline";

interface todoProps {
  text: string;
  count: (value: number | ((prevCount: number) => number)) => void;
  list: string[];
  setList: (newList: string[]) => void;
}

export const Todo = ({ text, count, list, setList }: todoProps) => {
  const [radioCheck, setRadioCheck] = React.useState(false);

  function handleRadioCheck({ target }: ChangeEvent<HTMLInputElement>) {
    if (!radioCheck) {
      count((prevCount) => prevCount + 1);
      const newlist = list.filter((element) => element != target.value);
      setList([target.value, ...newlist]);
    } else {
      count((prevCount) => prevCount - 1);
      const newlist = list.filter((element) => element != target.value);
      setList([...newlist, target.value]);
    }

    setRadioCheck(!radioCheck);
  }

  function handleDeleteTodo() {
    const newTodoList = list.filter((item) => item !== text);

    if (radioCheck) {
      count((prevCount) => prevCount - 1);
    }

    setList(newTodoList);
  }

  return (
    <div className={styles.todoWrapper}>
      <div className={styles.leftContent}>
        <input
          type="checkbox"
          checked={radioCheck}
          value={text}
          onChange={handleRadioCheck}
        />
        <label className={radioCheck ? styles.checkedText : ""}>{text}</label>
      </div>
      <div>
        <button onClick={handleDeleteTodo} value={text}>
          <TrashIcon className={styles.trashIcon} />
        </button>
      </div>
    </div>
  );
};
