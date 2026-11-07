import styles from './Todo.module.css';
import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList';

export const Todo = () => {
  return (
    <div className={styles.todoContainer}>
      <h1>Todo лист</h1>

      <TodoForm />
      <TodoList />
    </div>
  );
};
