import React, { ChangeEvent } from "react";
import "./global.css";
import "./container.css";
import "./header.css";
import "./s-todolist.css";
import TodoLogo from "./assets/todo-logo.svg";
import PlusIcon from "./assets/plus.svg";
import Clipboard from "./assets/Clipboard.svg";
import { Todo } from "./components/Todo";

function App() {
  const [todoItem, setTodoItem] = React.useState("");
  const [todolist, setTodoList] = React.useState<string[]>([]);
  const [checkCount, setCheckCount] = React.useState<number>(0);

  function handleInputTodo(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (todoItem != "") {
      setTodoList([...todolist, todoItem]);
    }

    setTodoItem("");
  }

  function handleInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    setTodoItem(target.value);
  }

  const revertedList = [...todolist].reverse();

  return (
    <>
      <header className="header">
        <div className="container">
          <img src={TodoLogo} alt="logo da todo-list" />
          <div className="formWrapper">
            <form className="" onSubmit={handleInputTodo}>
              <input
                type="text"
                placeholder="Adicione uma nova tarefa"
                value={todoItem}
                onChange={handleInputChange}
              />
              <button>
                Criar
                <img src={PlusIcon} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="s-todoslist">
        <div className="container">
          <div className="dataWrapper">
            <div className="createdTasks">
              <h3>Tarefas criadas</h3> <span>{todolist.length}</span>
            </div>
            <div className="finishedTasks">
              <h3>Concluídas</h3>
              <span>{`${checkCount} de ${todolist.length}`}</span>
            </div>
          </div>
          {todolist.length > 0 ? (
            <div className="todoList">
              {revertedList.map((todo) => {
                return (
                  <Todo
                    text={todo}
                    count={setCheckCount}
                    list={todolist}
                    setList={setTodoList}
                    key={todo + 1}
                  />
                );
              })}
            </div>
          ) : (
            <div className="defaultInfo">
              <img src={Clipboard} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
