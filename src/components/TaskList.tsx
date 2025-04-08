
'use client'

type Task = {
  id: string
  title: string
  description: string
  status: string
}

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 bg-white rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs mt-1 text-gray-500">
              Status: {task.status}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
