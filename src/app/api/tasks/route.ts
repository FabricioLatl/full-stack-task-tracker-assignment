import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '../../lib/firebaseAdmin'

export async function GET() {
  try {
    const snap = await adminDb.collection('tasks').orderBy('createdAt', 'desc').get()
    const tasks: any[] = []
    snap.forEach(d => tasks.push({ id: d.id, ...d.data() }))
    return NextResponse.json({ tasks }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, status, dueDate } = await req.json()
    if (!title || !description) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }
    const createdAt = Date.now()
    const docRef = await adminDb.collection('tasks').add({ title, description, status: status || 'pending', createdAt, dueDate: dueDate || '' })
    return NextResponse.json({ id: docRef.id, title, description, status: status || 'pending', createdAt, dueDate: dueDate || '' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
