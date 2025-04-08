// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin' // using Firestore via firebase-admin

const TASKS_COLLECTION = 'tasks'

// GET /api/tasks — fetch all tasks
export async function GET() {
  try {
    const snapshot = await adminDb.collection(TASKS_COLLECTION).get()
    const tasks: any[] = []
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })

    return NextResponse.json({ tasks }, { status: 200 })
  } catch (error) {
    console.error('GET /api/tasks error:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

// POST /api/tasks — create a new task
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing title or description' }, { status: 400 })
    }

    const newTask = {
      title,
      description,
      status: 'pending',
      createdAt: Date.now(),
    }

    const docRef = await adminDb.collection(TASKS_COLLECTION).add(newTask)

    return NextResponse.json(
      { id: docRef.id, ...newTask },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/tasks error:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
