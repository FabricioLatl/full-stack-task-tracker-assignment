
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

const placeholderTasks = [
  { id: '1', title: 'Buy groceries', description: 'Milk, Eggs, Bread', status: 'pending' },
  { id: '2', title: 'Finish assignment', description: 'Full-Stack Task Tracker', status: 'completed' },
]

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Task Tracker</h1>

      <TaskForm />

      <div className="mt-8">
        <TaskList tasks={placeholderTasks} />
      </div>
    </div>
  )
}
