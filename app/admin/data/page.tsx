"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Download, Upload, RefreshCw, HardDrive, FileJson, FileSpreadsheet } from "lucide-react"

type BackupRecord = {
  id: number
  filename: string
  size: string
  type: "auto" | "manual"
  status: "success" | "failed"
  createdAt: string
  note?: string
}

const mockBackups: BackupRecord[] = [
  {
    id: 1,
    filename: "backup_20240120_auto.sql",
    size: "256MB",
    type: "auto",
    status: "success",
    createdAt: "2024-01-20 02:00:00",
    note: "自动备份"
  },
  {
    id: 2,
    filename: "backup_20240119_manual.sql",
    size: "255MB",
    type: "manual",
    status: "success",
    createdAt: "2024-01-19 15:30:00",
    note: "系统升级前备份"
  }
]

export default function DataManagementPage() {
  const [backups, setBackups] = React.useState<BackupRecord[]>(mockBackups)
  const [isExporting, setIsExporting] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<string>("")

  // 创建备份
  const handleCreateBackup = async () => {
    const newBackup: BackupRecord = {
      id: Date.now(),
      filename: `backup_${new Date().toISOString().split('T')[0].replace(/-/g, '')}_manual.sql`,
      size: "0MB",
      type: "manual",
      status: "success",
      createdAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      note: "手动备份"
    }
    setBackups([newBackup, ...backups])
  }

  // 导出数据
  const handleExportData = async () => {
    setIsExporting(true)
    try {
      // TODO: 实现数据导出逻辑
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("导出数据")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-green-500/10">
          <Database className="h-6 w-6 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">数据管理</h1>
      </div>

      {/* 操作卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">数据备份</h3>
                <p className="text-sm text-muted-foreground">创建数据库备份</p>
              </div>
              <Button onClick={handleCreateBackup} className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4" />
                <span>创建备份</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">导出数据</h3>
                <p className="text-sm text-muted-foreground">导出系统数据</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => handleExportData()} disabled={isExporting}>
                  <FileJson className="h-4 w-4 mr-2" />
                  JSON
                </Button>
                <Button variant="outline" onClick={() => handleExportData()} disabled={isExporting}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">数据恢复</h3>
                <p className="text-sm text-muted-foreground">从备份恢复</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-1"
                  id="fileInput"
                  accept=".sql"
                />
                <Button variant="outline" onClick={() => document.getElementById('fileInput')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  上传备份
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 备份记录 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>备份记录</CardTitle>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文件名</TableHead>
                  <TableHead>大小</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>备注</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">{backup.filename}</TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        backup.type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {backup.type === 'auto' ? '自动' : '手动'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        backup.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {backup.status === 'success' ? '成功' : '失败'}
                      </div>
                    </TableCell>
                    <TableCell>{backup.createdAt}</TableCell>
                    <TableCell>{backup.note || '-'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        下载
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 