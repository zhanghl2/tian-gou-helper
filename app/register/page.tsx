"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      // TODO: 实现注册API调用
      console.log("注册数据:", data)
      router.push("/login?registered=true")
    } catch (error) {
      console.error("注册失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">创建账号</CardTitle>
          <CardDescription>
            填写以下信息创建你的舔狗救赎账号
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                placeholder="输入你的用户名"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="输入你的邮箱"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="设置你的密码"
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "注册中..." : "注册"}
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              已有账号？{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                立即登录
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 