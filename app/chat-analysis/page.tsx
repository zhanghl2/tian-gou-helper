"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function ChatAnalysisPage() {
  const [chatContent, setChatContent] = React.useState("")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  async function onAnalyze() {
    setIsAnalyzing(true)
    try {
      // TODO: 实现聊天分析API调用
      console.log("分析聊天内容:", chatContent)
    } catch (error) {
      console.error("分析失败:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-pink-500/10">
              <MessageCircle className="h-6 w-6 text-pink-500" />
            </div>
            <CardTitle className="text-2xl">聊天分析</CardTitle>
          </div>
          <p className="text-muted-foreground">
            粘贴你的聊天记录，获得AI专业点评和建议
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="在这里粘贴聊天记录..."
            className="min-h-[200px]"
            value={chatContent}
            onChange={(e) => setChatContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={onAnalyze}
              disabled={!chatContent || isAnalyzing}
              className="w-32"
            >
              {isAnalyzing ? "分析中..." : "开始分析"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

