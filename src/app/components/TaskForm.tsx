'use client'
// src/app/components/TaskForm.tsx

import React, { useState } from 'react'

interface TaskFormProps {
  onCreateTask: (
    title: string,
    description: string,
    dueDate: string,
    status: string
  ) => void
}

export default function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')

  function handleSubmit() {
    if (!title.trim()) return
    onCreateTask(title, description, dueDate, status)
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('pending')
  }

  return (
    <div className="mb-4 flex flex-col gap-2 md:flex-row">
      <input
        className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="rounded border p-2 hover:bg-gray-50 focus:outline-none"
        placeholder="Description"
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
      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
      >
        Add
      </button>
    </div>
  )
}
