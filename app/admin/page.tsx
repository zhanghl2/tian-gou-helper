"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, BarChart2, TrendingUp, Search, UserX, UserCheck, Pencil, Trash2, Plus, Megaphone, Database } from "lucide-react"
import Link from "next/link"

type User = {
  id: number
  username: string
  email: string
  status: "active" | "inactive"
  lastLogin: string
  diaryCount: number
  role?: string
  createdAt?: string
}

// 模拟数据
const mockUsers: User[] = [
  { 
    id: 1, 
    username: "user1", 
    email: "user1@example.com", 
    status: "active", 
    lastLogin: "2024-01-20", 
    diaryCount: 15,
    role: "用户",
    createdAt: "2024-01-01"
  },
  { 
    id: 2, 
    username: "user2", 
    email: "user2@example.com", 
    status: "inactive", 
    lastLogin: "2024-01-15", 
    diaryCount: 8,
    role: "用户",
    createdAt: "2024-01-05"
  },
]

const mockStats = {
  totalUsers: 156,
  activeUsers: 89,
  totalDiaries: 1234,
  avgScoreToday: 75.5
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [users, setUsers] = React.useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = React.useState(mockUsers)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<User | null>(null)
  const [showUserForm, setShowUserForm] = React.useState(false)

  // 搜索用户
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setFilteredUsers(
      users.filter(user => 
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  // 切换用户状态
  const toggleUserStatus = (userId: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "active" ? "inactive" : "active"
        }
      }
      return user
    })
    setUsers(updatedUsers)
    setFilteredUsers(updatedUsers)
  }

  // 编辑用户
  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsEditing(true)
    setShowUserForm(true)
  }

  // 删除用户
  const handleDelete = (userId: number) => {
    if (confirm("确定要删除这个用户吗？")) {
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
    }
  }

  // 保存用户
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    }

    if (isEditing && editingUser) {
      // 更新现有用户
      const updatedUsers = users.map(user => {
        if (user.id === editingUser.id) {
          return { ...user, ...userData }
        }
        return user
      })
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
    } else {
      // 添加新用户
      const newUser: User = {
        id: users.length + 1,
        ...userData,
        status: "active",
        lastLogin: "-",
        diaryCount: 0,
        createdAt: new Date().toISOString().split("T")[0]
      }
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
    }

    setShowUserForm(false)
    setIsEditing(false)
    setEditingUser(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-purple-500/10">
            <Shield className="h-6 w-6 text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold">管理控制台</h1>
        </div>
      </div>

      {/* 快速访问卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/announcement">
          <Card className="hover:border-blue-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">通知公告</h3>
                  <p className="text-sm text-muted-foreground mt-1">管理系统公告</p>
                </div>
                <div className="p-2 rounded-full bg-blue-500/10">
                  <Megaphone className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/data">
          <Card className="hover:border-green-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">数据管理</h3>
                  <p className="text-sm text-muted-foreground mt-1">备份与恢复</p>
                </div>
                <div className="p-2 rounded-full bg-green-500/10">
                  <Database className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 统计卡片 */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">总用户数</p>
                <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">活跃用户</p>
                <p className="text-2xl font-bold">{mockStats.activeUsers}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 用户管理 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>用户管理</CardTitle>
            <Button onClick={() => setShowUserForm(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>添加用户</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">导出数据</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户名</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>注册时间</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead>日记数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status === 'active' ? '活跃' : '未活跃'}
                      </div>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>{user.diaryCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(user)}>
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleUserStatus(user.id)}>
                          {user.status === 'active' ? 
                            <UserX className="h-4 w-4 text-red-500" /> :
                            <UserCheck className="h-4 w-4 text-green-500" />
                          }
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 用户表单对话框 */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>{isEditing ? "编辑用户" : "添加用户"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">用户名</label>
                  <Input
                    name="username"
                    defaultValue={editingUser?.username}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">邮箱</label>
                  <Input
                    name="email"
                    type="email"
                    defaultValue={editingUser?.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">角色</label>
                  <Input
                    name="role"
                    defaultValue={editingUser?.role || "用户"}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setShowUserForm(false)
                    setIsEditing(false)
                    setEditingUser(null)
                  }}>
                    取消
                  </Button>
                  <Button type="submit">
                    {isEditing ? "保存" : "添加"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 