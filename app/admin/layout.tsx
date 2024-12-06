"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// 这里应该从你的认证系统中获取用户信息
const isAdmin = () => {
  // TODO: 实现实际的管理员验证逻辑
  return true // 临时返回 true 用于演示
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/") // 如果不是管理员，重定向到首页
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
} 