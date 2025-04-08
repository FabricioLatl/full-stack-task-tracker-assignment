import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/app/lib/firebaseAdmin'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const doc = await adminDb.collection('tasks').doc(params.id).get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to get task' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, description, status, dueDate } = await req.json()
    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status
    if (dueDate !== undefined) updateData.dueDate = dueDate
    if (!Object.keys(updateData).length) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
    }
    await adminDb.collection('tasks').doc(params.id).update(updateData)
    return NextResponse.json({ id: params.id, ...updateData }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await adminDb.collection('tasks').doc(params.id).delete()
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
