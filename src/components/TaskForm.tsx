// src/components/TaskForm.tsx

'use client'

import { FormEvent, useState } from 'react'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('New Task:', { title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow"
    >
      <h2 className="font-semibold mb-2">Add New Task</h2>
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  )
}
