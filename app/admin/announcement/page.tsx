"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Megaphone, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

type Announcement = {
  id: number
  title: string
  content: string
  type: "notice" | "announcement" | "maintenance"
  status: "draft" | "published" | "archived"
  publishDate: string
  endDate?: string
  createdBy: string
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "系统升级通知",
    content: "系统将于本周六凌晨2点进行升级维护，预计持续2小时。",
    type: "maintenance",
    status: "published",
    publishDate: "2024-01-20",
    endDate: "2024-01-21",
    createdBy: "admin"
  },
  {
    id: 2,
    title: "新功能上线公告",
    content: "舔狗日记新增AI情感分析��能，欢迎体验！",
    type: "announcement",
    status: "published",
    publishDate: "2024-01-18",
    createdBy: "admin"
  }
]

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(mockAnnouncements)
  const [showForm, setShowForm] = React.useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = React.useState<Announcement | null>(null)

  // 处理发布/取消发布
  const togglePublishStatus = (id: number) => {
    setAnnouncements(announcements.map(ann => {
      if (ann.id === id) {
        return {
          ...ann,
          status: ann.status === "published" ? "archived" : "published"
        }
      }
      return ann
    }))
  }

  // 处理删除
  const handleDelete = (id: number) => {
    if (confirm("确定要删除这条公告吗？")) {
      setAnnouncements(announcements.filter(ann => ann.id !== id))
    }
  }

  // 处理编辑
  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setShowForm(true)
  }

  // 处理保存
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const announcementData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      type: formData.get("type") as Announcement["type"],
      publishDate: formData.get("publishDate") as string,
      endDate: formData.get("endDate") as string || undefined,
    }

    if (editingAnnouncement) {
      // 更新现有公告
      setAnnouncements(announcements.map(ann => 
        ann.id === editingAnnouncement.id 
          ? { ...ann, ...announcementData }
          : ann
      ))
    } else {
      // 添加新公告
      const newAnnouncement: Announcement = {
        id: Date.now(),
        ...announcementData,
        status: "draft",
        createdBy: "admin", // 应该从用户会话中获取
      }
      setAnnouncements([newAnnouncement, ...announcements])
    }

    setShowForm(false)
    setEditingAnnouncement(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-500/10">
            <Megaphone className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">通知公告管理</h1>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>发布公告</span>
        </Button>
      </div>

      {/* 公告列表 */}
      <Card>
        <CardHeader>
          <CardTitle>公告列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>标题</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>发布时间</TableHead>
                  <TableHead>结束时间</TableHead>
                  <TableHead>发布人</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium">{announcement.title}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.type === 'maintenance' ? 'bg-orange-100 text-orange-700' :
                        announcement.type === 'announcement' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {announcement.type === 'maintenance' ? '维护' :
                         announcement.type === 'announcement' ? '公告' : '通知'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.status === 'published' ? 'bg-green-100 text-green-700' :
                        announcement.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {announcement.status === 'published' ? '已发布' :
                         announcement.status === 'draft' ? '草稿' : '已归档'}
                      </div>
                    </TableCell>
                    <TableCell>{announcement.publishDate}</TableCell>
                    <TableCell>{announcement.endDate || '-'}</TableCell>
                    <TableCell>{announcement.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(announcement)}>
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublishStatus(announcement.id)}>
                          {announcement.status === 'published' ? 
                            <EyeOff className="h-4 w-4 text-orange-500" /> :
                            <Eye className="h-4 w-4 text-green-500" />
                          }
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(announcement.id)}>
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

      {/* 公告表单对话框 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>{editingAnnouncement ? "编辑公告" : "发布公告"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">标题</label>
                  <Input
                    name="title"
                    defaultValue={editingAnnouncement?.title}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">内容</label>
                  <Textarea
                    name="content"
                    defaultValue={editingAnnouncement?.content}
                    className="min-h-[200px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">类型</label>
                    <select
                      name="type"
                      defaultValue={editingAnnouncement?.type || "notice"}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="notice">通知</option>
                      <option value="announcement">公告</option>
                      <option value="maintenance">维护</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">发布时间</label>
                    <Input
                      type="date"
                      name="publishDate"
                      defaultValue={editingAnnouncement?.publishDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">结束时间（可选）</label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={editingAnnouncement?.endDate}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setShowForm(false)
                    setEditingAnnouncement(null)
                  }}>
                    取消
                  </Button>
                  <Button type="submit">
                    {editingAnnouncement ? "保存" : "发布"}
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