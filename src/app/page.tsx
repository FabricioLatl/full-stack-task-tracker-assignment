export const dynamic = 'force-dynamic'

// src/app/page.tsx
import { adminDb } from './lib/firebaseAdmin'
import TaskTracker from './components/TaskTracker'

export default async function HomePage() {
  // SERVER-SIDE FETCH (SSR):
  // Pull tasks directly from Firestore here.
  try {
    const snap = await adminDb
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .get()
    const tasks: any[] = []
    snap.forEach((doc) => tasks.push({ id: doc.id, ...doc.data() }))

    return (
      <main>
        {/* Pass tasks to the client component */}
        <TaskTracker initialTasks={tasks} />
      </main>
    )
  } catch (err) {
    return (
      <main className="p-4">
        <h1>Failed to load tasks.</h1>
      </main>
    )
  }
}