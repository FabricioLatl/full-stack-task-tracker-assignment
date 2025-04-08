// src/app/page.tsx
import { adminDb } from './lib/firebaseAdmin'
import TaskTracker from './components/TaskTracker'

export default async function HomePage() {
  // SERVER-SIDE FETCH (SSR/SSG):
  // Pull tasks directly from Firestore here.
  try {
    const snap = await adminDb
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .get()
    const tasks: any[] = []
    snap.forEach((doc) => tasks.push({ id: doc.id, ...doc.data() }))

    // Optionally: If you want SSG with revalidation, you can
    // export const revalidate = 60 // re-generate this page every 60s

    return (
      <main>
        {/* Pass tasks to the client component */}
        <TaskTracker initialTasks={tasks} />
      </main>
    )
  } catch (err) {
    // If Firestore fails, you can gracefully handle it
    return (
      <main className="p-4">
        <h1>Failed to load tasks.</h1>
      </main>
    )
  }
}
