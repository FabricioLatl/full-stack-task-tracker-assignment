// src/app/page.tsx
'use client'

import { error } from 'console'
import { useEffect, useState } from 'react'

type Task = {
  id: string
  title: string
  description: string
  status: string
  createdAt?: number
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks')
      if (!res.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const data = await res.json()
      setTasks(data.tasks)
    } catch (error) {
      console.error(error)
    }
  }

  const createTask = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
      if (!res.ok) {
        console.error('Failed to create task:', res.statusText)
        throw new Error('Failed to create task')
        
      }
      const data = await res.json()
      // Add the new task to local state or re-fetch tasks
      setTasks((prev) => [data, ...prev])
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Task Tracker</h1>

      {/* Create Task Form */}
      <div className="mt-4 mb-8 flex flex-col">
        <input
          className="mb-2 border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="mb-2 border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={createTask}
          className="w-fit rounded bg-blue-600 px-4 py-2 font-medium text-white"
        >
          Create Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded bg-gray-100 p-4"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm">{task.description}</p>
              <p className="text-xs text-gray-500">Status: {task.status}</p>
            </div>
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`/api/tasks/${task.id}`, {
                    method: 'DELETE',
                  })
                  if (!res.ok) {
                    throw new Error('Failed to delete task')
                  }
                  // Remove from local state
                  setTasks((prev) => prev.filter((t) => t.id !== task.id))
                } catch (error) {
                  console.error(error)
                }
              }}
              className="rounded bg-red-500 px-2 py-1 text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
