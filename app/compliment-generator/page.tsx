"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComplimentGeneratorPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [compliment, setCompliment] = useState("")

  const handleGenerate = () => {
    // TODO: Implement compliment generation logic
    setCompliment("这是一个示例夸赞。实际实现时，这里应该调用后端API生成夸赞。")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>夸赞生成器</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="输入图片URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button onClick={handleGenerate} className="mt-4">
            生成夸赞
          </Button>
        </CardContent>
      </Card>
      {compliment && (
        <Card>
          <CardHeader>
            <CardTitle>生成的夸赞</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={compliment} readOnly rows={4} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

