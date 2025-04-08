'use client'
// src/app/components/TaskModal.tsx

import { useState } from 'react'

type Task = {
  id: string
  title: string
  description: string
  status: string
  createdAt: number
  dueDate: string
}

interface TaskModalProps {
  task: Task
  onUpdateTask: (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: string
  ) => void
  onDeleteTask: (id: string) => void
  onClose: () => void
}

export default function TaskModal({
  task,
  onUpdateTask,
  onDeleteTask,
  onClose,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [status, setStatus] = useState(task.status)

  function handleSave() {
    onUpdateTask(task.id, title, description, dueDate, status)
  }

  function handleDelete() {
    onDeleteTask(task.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="w-full max-w-md rounded bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">
          Edit Task: {task.title}
        </h2>
        <p className="text-sm">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
        <p className="mb-4 text-sm">ID: {task.id}</p>
        <div className="mb-4 flex flex-col gap-2">
          <input
            className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleSave}
            className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:opacity-80"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
