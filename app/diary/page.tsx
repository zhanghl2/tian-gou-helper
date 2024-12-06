"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type DiaryEntry = {
  date: Date;
  content: string;
  score: number;
}

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [diaryEntry, setDiaryEntry] = useState("")
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [score, setScore] = useState<number | null>(null)

  const handleSubmit = () => {
    if (selectedDate && diaryEntry.trim() !== "") {
      const newScore = Math.floor(Math.random() * 100) // Placeholder scoring logic
      const newEntry: DiaryEntry = {
        date: selectedDate,
        content: diaryEntry,
        score: newScore,
      }
      setDiaryEntries([...diaryEntries, newEntry])
      setScore(newScore)
      setDiaryEntry("")
    }
  }

  const selectedDateEntry = diaryEntries.find(
    (entry) => entry.date.toDateString() === selectedDate?.toDateString()
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>舔狗日记</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <div className="w-1/2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              components={{
                day: ({ date }) => {
                  const entry = diaryEntries.find(
                    (e) => e.date.toDateString() === date.toDateString()
                  )
                  return (
                    <div
                      className={cn(
                        "w-full h-full flex items-center justify-center",
                        entry && "bg-primary text-primary-foreground rounded-full"
                      )}
                    >
                      {date.getDate()}
                    </div>
                  )
                },
              }}
            />
          </div>
          <div className="w-1/2 space-y-4">
            <Textarea
              placeholder="写下今天的舔狗日记..."
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
              rows={5}
            />
            <Button onClick={handleSubmit} className="w-full">
              提交日记
            </Button>
          </div>
        </CardContent>
      </Card>
      {selectedDateEntry && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedDate?.toLocaleDateString()} 的日记</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{selectedDateEntry.content}</p>
            <p className="mt-2 font-bold">舔的水平得分: {selectedDateEntry.score}</p>
          </CardContent>
        </Card>
      )}
      {score !== null && (
        <Card>
          <CardHeader>
            <CardTitle>最新舔的水平得分</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{score}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

