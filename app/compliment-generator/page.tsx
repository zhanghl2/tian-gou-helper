"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Upload } from "lucide-react"

export default function ComplimentGeneratorPage() {
  const [isGenerating, setIsGenerating] = React.useState(false)

  async function onGenerate() {
    setIsGenerating(true)
    try {
      // TODO: 实现夸赞生成API调用
      console.log("生成夸赞话术")
    } catch (error) {
      console.error("生成失败:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-violet-500/10">
              <Sparkles className="h-6 w-6 text-violet-500" />
            </div>
            <CardTitle className="text-2xl">夸赞生成器</CardTitle>
          </div>
          <p className="text-muted-foreground">
            上传照片，获得量身定制的夸赞话术
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="picture" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              上传照片
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" onClick={() => document.getElementById("picture")?.click()}>
                  选择照片
                </Button>
                <p className="text-sm text-muted-foreground">
                  支持 JPG, PNG 格式，最大 5MB
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              补充说明（可选）
            </label>
            <Textarea
              placeholder="添加一些背景信息或特定要求..."
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-32"
            >
              {isGenerating ? "生成中..." : "生成夸赞"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

