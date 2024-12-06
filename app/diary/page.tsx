"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar as CalendarIcon, BarChart } from "lucide-react"

type DiaryEntry = {
  date: Date;
  content: string;
  score: number;
}

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [diaryEntry, setDiaryEntry] = React.useState("")
  const [diaryEntries, setDiaryEntries] = React.useState<DiaryEntry[]>([])
  const [score, setScore] = React.useState<number | null>(null)

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

  // 计算热力图颜色
  const getHeatMapColor = (score: number) => {
    if (score >= 80) return "bg-red-500/80"
    if (score >= 60) return "bg-orange-500/80"
    if (score >= 40) return "bg-yellow-500/80"
    return "bg-green-500/80"
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-500/10">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-2xl">舔狗日记</CardTitle>
          </div>
          <p className="text-muted-foreground">
            记录你的每日心情，查看舔狗指数变化趋势
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{selectedDate?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
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
                        "w-full h-full flex items-center justify-center rounded-full transition-colors",
                        entry ? getHeatMapColor(entry.score) : "hover:bg-accent"
                      )}
                    >
                      {date.getDate()}
                    </div>
                  )
                },
              }}
            />
            {diaryEntries.length > 0 && (
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4" />
                  <span>舔狗指数热力图</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span>低</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span>中</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500/80" />
                    <span>高</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span>极高</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="写下今天的舔狗日记..."
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              disabled={!diaryEntry.trim()}
            >
              提交日记
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedDateEntry && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedDate?.toLocaleDateString('zh-CN')} 的日记</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">舔狗指数:</span>
                <div className={cn(
                  "px-2 py-1 rounded-full text-white font-medium",
                  getHeatMapColor(selectedDateEntry.score)
                )}>
                  {selectedDateEntry.score}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{selectedDateEntry.content}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

