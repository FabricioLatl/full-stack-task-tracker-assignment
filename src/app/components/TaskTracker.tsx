'use client'
// src/app/components/TaskTracker.tsx

import { useState } from 'react'
import dynamic from 'next/dynamic'
import TaskForm from './TaskForm'
import Calendar from './Calendar'

type Task = {
  id: string
  title: string
  description: string
  status: string
  createdAt: number
  dueDate: string
}

interface TaskTrackerProps {
  initialTasks: Task[]
}

// Lazy-load the TaskModal (speeds up initial load if the user rarely opens it)
const TaskModal = dynamic(() => import('./TaskModal'), { ssr: false })

export default function TaskTracker({ initialTasks }: TaskTrackerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  function openModal(task: Task) {
    setSelectedTask(task)
    setShowModal(true)
  }

  function closeModal() {
    setSelectedTask(null)
    setShowModal(false)
  }

  // CREATE a new task via /api/tasks
  async function handleCreateTask(
    title: string,
    description: string,
    dueDate: string,
    status: string
  ) {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status, dueDate }),
      })
      if (!res.ok) {
        throw new Error('Failed to create task')
      }
      const newTask = await res.json()
      setTasks((prev) => [newTask, ...prev])
    } catch (err) {
      console.error(err)
    }
  }

  // UPDATE a task
  async function handleUpdateTask(
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: string
  ) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, status }),
      })
      if (!res.ok) {
        throw new Error('Failed to update task')
      }
      const updated = await res.json()
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  // DELETE a task
  async function handleDeleteTask(id: string) {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        throw new Error('Failed to delete task')
      }
      setTasks((prev) => prev.filter((t) => t.id !== id))
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Task Tracker</h1>

      {/* Form to Create a New Task */}
      <TaskForm onCreateTask={handleCreateTask} />

      {/* Calendar to display tasks by day */}
      <Calendar tasks={tasks} onOpenModal={openModal} />

      {showModal && selectedTask && (
        <TaskModal
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
