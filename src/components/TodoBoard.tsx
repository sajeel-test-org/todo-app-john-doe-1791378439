import { useState } from 'react';
import type { FormEvent } from 'react';
import TaskItem from '@/components/TaskItem';

export type Todo = {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD or ''
  done: boolean;
};

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  function addTodo(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, dueDate, done: false },
    ]);
    setTitle('');
    setDueDate('');
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
        <p className="mt-2 text-slate-400">
          {todos.length === 0
            ? 'Nothing here yet — add your first task below.'
            : `${remaining} of ${todos.length} left to do`}
        </p>
      </header>

      <form onSubmit={addTodo} className="mb-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-slate-100 [color-scheme:dark] focus:border-indigo-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onToggle={(id) =>
              setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
            }
            onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
          />
        ))}
      </ul>
    </div>
  );
}
