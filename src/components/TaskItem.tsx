import type { Todo } from '@/components/TodoBoard';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function todayString(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatDate(value: string): string {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskItem({ todo, onToggle, onDelete }: Props) {
  const today = todayString();
  let badge: { label: string; className: string } | null = null;
  if (todo.dueDate) {
    if (todo.done) {
      badge = { label: formatDate(todo.dueDate), className: 'bg-white/5 text-slate-500' };
    } else if (todo.dueDate < today) {
      badge = { label: `Overdue · ${formatDate(todo.dueDate)}`, className: 'bg-rose-500/15 text-rose-300' };
    } else if (todo.dueDate === today) {
      badge = { label: 'Due today', className: 'bg-amber-500/15 text-amber-300' };
    } else {
      badge = { label: `Due ${formatDate(todo.dueDate)}`, className: 'bg-indigo-500/15 text-indigo-300' };
    }
  }

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.done ? 'not done' : 'done'}`}
        className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-500"
      />
      <div className="min-w-0 flex-1">
        <p className={`break-words ${todo.done ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
          {todo.title}
        </p>
        {badge && (
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
            {badge.label}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
        className="rounded-lg px-2 py-1 text-sm text-slate-500 transition hover:bg-rose-500/15 hover:text-rose-300"
      >
        Delete
      </button>
    </li>
  );
}
