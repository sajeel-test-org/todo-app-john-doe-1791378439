import { createFileRoute } from '@tanstack/react-router';
import TodoBoard from '@/components/TodoBoard';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TodoBoard />
    </div>
  );
}
