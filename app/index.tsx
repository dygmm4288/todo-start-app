import AddTodo from "@/components/todo/AddTodo";
import Empty from "@/components/todo/Empty";
import TodoList from "@/components/todo/TodoList";
import useTodo from "@/hooks/useTodo";

export default function Home() {
  const isEmpty = useTodo((state) => state.isEmpty());
  return (
    <>
      {isEmpty ? <Empty /> : <TodoList />}
      <AddTodo />
    </>
  );
}
