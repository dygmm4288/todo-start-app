import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type TodoHook = {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  fetchTodo: () => Promise<void>;
  isEmpty: () => boolean;
  isLoading: boolean;
};

const DOC_TODO = "todo";

const useTodo = create<TodoHook>()((set, get) => ({
  todos: [],
  isLoading: false,
  addTodo: async (text: string) => {
    set(() => ({ isLoading: true }));
    const docRef = await addDoc(collection(db, DOC_TODO), {
      text,
      done: false,
    });

    set((state) => ({
      todos: [...state.todos, { id: docRef.id, text, done: false }],
      isLoading: false,
    }));
  },
  removeTodo: async (id: string) => {
    const docRef = doc(db, DOC_TODO, id);

    set(() => ({ isLoading: true }));
    await deleteDoc(docRef);

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      isLoading: false,
    }));
  },
  toggleTodo: async (id: string) => {
    const docRef = doc(db, DOC_TODO, id);
    const { findTodo, nextTodos } = get().todos.reduce(
      (acc, cur) => {
        if (cur.id === id) {
          cur.done = !cur.done;
          acc.findTodo = cur;
        }
        acc.nextTodos.push(cur);
        return acc;
      },
      { findTodo: null as Todo | null, nextTodos: [] as Todo[] },
    );

    if (!findTodo) throw new Error("not found todo");

    set(() => ({ isLoading: true }));
    await updateDoc(docRef, { done: findTodo.done });

    set(() => ({
      todos: nextTodos,
      isLoading: false,
    }));
  },
  isEmpty: () => get().todos.length === 0,
  fetchTodo: async () => {
    set(() => ({ isLoading: true }));
    const snapshot = await getDocs(collection(db, DOC_TODO));
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];

    set({
      todos,
      isLoading: false,
    });
  },
}));

export default useTodo;
