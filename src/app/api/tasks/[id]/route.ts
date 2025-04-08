import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/app/lib/firebaseAdmin'

// Define a context type that wraps params in a promise.
type RouteContext = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    // Await the params so that the extracted id has the correct type.
    const { id } = await context.params
    const doc = await adminDb.collection('tasks').doc(id).get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to get task' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const { title, description, status, dueDate } = await req.json()
    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status
    if (dueDate !== undefined) updateData.dueDate = dueDate

    if (!Object.keys(updateData).length) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
    }
    await adminDb.collection('tasks').doc(id).update(updateData)
    return NextResponse.json({ id, ...updateData }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    await adminDb.collection('tasks').doc(id).delete()
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
