'use client'
// src/app/components/Calendar.tsx

import { useState } from 'react'

type Task = {
  id: string
  title: string
  description: string
  status: string
  createdAt: number
  dueDate: string
}

interface CalendarProps {
  tasks: Task[]
  onOpenModal: (task: Task) => void
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getCalendarMatrix(year: number, month: number) {
  // Monday = 0 ... Sunday = 6
  const startOfMonth = new Date(year, month, 1)
  const startDayIndex = (startOfMonth.getDay() + 6) % 7
  const totalDays = new Date(year, month + 1, 0).getDate()
  const weeks = []
  let currentDay = 1 - startDayIndex

  while (currentDay <= totalDays) {
    const week: Array<{ date: Date; dayNumber: number } | null> = []
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(year, month, currentDay)
      if (currentDay > 0 && currentDay <= totalDays) {
        week.push({ date: dayDate, dayNumber: currentDay })
      } else {
        week.push(null)
      }
      currentDay++
    }
    weeks.push(week)
  }
  return weeks
}

function isSameDate(taskDueDate: string, dateObj: Date) {
  if (!taskDueDate) return false
  const [y, m, d] = taskDueDate.split('-').map(Number)
  return (
    y === dateObj.getFullYear() &&
    m === dateObj.getMonth() + 1 &&
    d === dateObj.getDate()
  )
}

export default function Calendar({ tasks, onOpenModal }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const calendarMatrix = getCalendarMatrix(currentYear, currentMonth)

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={prevMonth}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &lt;
        </button>
        <p className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </p>
        <button
          onClick={nextMonth}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 border-b pb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-col gap-2">
        {calendarMatrix.map((week, wIndex) => (
          <div key={wIndex} className="grid grid-cols-7 gap-2">
            {week.map((cell, cIndex) => {
              if (!cell) {
                return (
                  <div
                    key={`empty-${wIndex}-${cIndex}`}
                    className="h-20 border p-2 text-gray-300"
                  />
                )
              }
              const dayTasks = tasks.filter((t) =>
                isSameDate(t.dueDate, cell.date)
              )
              return (
                <div
                  key={cell.dayNumber}
                  className="relative h-20 border p-2 hover:bg-gray-50"
                >
                  <div className="mb-1 text-sm font-semibold">
                    {dayNames[cIndex]} {cell.dayNumber}
                  </div>
                  {dayTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => onOpenModal(task)}
                      className="block w-full truncate rounded bg-gray-50 px-2 py-1 text-left text-xs hover:bg-gray-200"
                    >
                      {task.title}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
