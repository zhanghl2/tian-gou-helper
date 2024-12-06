# 舔狗日记后端 API 文档

## 1. 用户认证模块 `/api/auth`

### 1.1 用户注册
```http
POST /api/auth/register
Request:
{
    "username": string,    // 用户名
    "email": string,      // 邮箱
    "password": string    // 密码
}
Response:
{
    "code": 200,
    "data": {
        "userId": number,
        "username": string,
        "email": string,
        "token": string    // JWT token
    }
}
```

### 1.2 用户登录
```http
POST /api/auth/login
Request:
{
    "email": string,      // 邮箱
    "password": string    // 密码
}
Response:
{
    "code": 200,
    "data": {
        "userId": number,
        "username": string,
        "role": string,    // 用户角色
        "token": string    // JWT token
    }
}
```

## 2. 日记管理模块 `/api/diary`

### 2.1 创建日记
```http
POST /api/diary
Request:
{
    "content": string,    // 日记内容
    "date": string,      // 日期 YYYY-MM-DD
}
Response:
{
    "code": 200,
    "data": {
        "id": number,
        "content": string,
        "date": string,
        "score": number,   // AI 分析得分
        "createdAt": string
    }
}
```

### 2.2 获取日记列表
```http
GET /api/diary
Query:
    startDate: string    // 开始日期 YYYY-MM-DD
    endDate: string      // 结束日期 YYYY-MM-DD
Response:
{
    "code": 200,
    "data": [{
        "id": number,
        "content": string,
        "date": string,
        "score": number,
        "createdAt": string
    }]
}
```

### 2.3 获取单个日记
```http
GET /api/diary/:id
Response:
{
    "code": 200,
    "data": {
        "id": number,
        "content": string,
        "date": string,
        "score": number,
        "createdAt": string
    }
}
```

## 3. 聊天分析模块 `/api/chat-analysis`

### 3.1 分析聊天记录
```http
POST /api/chat-analysis
Request:
{
    "content": string    // 聊天记录内容
}
Response:
{
    "code": 200,
    "data": {
        "analysis": string,    // 分析结果
        "score": number,       // 分析得分
        "suggestions": string[] // 建议列表
    }
}
```

## 4. 夸赞生成器模块 `/api/compliment`

### 4.1 生成夸赞话术
```http
POST /api/compliment
Request:
{
    "image": File,       // 图片文件
    "description": string // 补充说明（可选）
}
Response:
{
    "code": 200,
    "data": {
        "compliments": string[],  // 夸赞话术列表
        "tags": string[]          // 识别出的特点标签
    }
}
```

## 5. 管理员模块 `/api/admin`

### 5.1 用户管理

#### 5.1.1 获取用户列表
```http
GET /api/admin/users
Query:
    page: number        // 页码
    pageSize: number    // 每页数量
    search: string      // 搜索关键词（可选）
Response:
{
    "code": 200,
    "data": {
        "total": number,
        "users": [{
            "id": number,
            "username": string,
            "email": string,
            "status": "active" | "inactive",
            "role": string,
            "lastLogin": string,
            "diaryCount": number,
            "createdAt": string
        }]
    }
}
```

#### 5.1.2 更新用户状态
```http
PUT /api/admin/users/:id/status
Request:
{
    "status": "active" | "inactive"
}
Response:
{
    "code": 200,
    "data": {
        "id": number,
        "status": string
    }
}
```

### 5.2 通知公告管理

#### 5.2.1 创建公告
```http
POST /api/admin/announcements
Request:
{
    "title": string,
    "content": string,
    "type": "notice" | "announcement" | "maintenance",
    "publishDate": string,
    "endDate": string    // 可选
}
Response:
{
    "code": 200,
    "data": {
        "id": number,
        "title": string,
        "content": string,
        "type": string,
        "status": string,
        "publishDate": string,
        "endDate": string,
        "createdBy": string
    }
}
```

#### 5.2.2 获取公告列表
```http
GET /api/admin/announcements
Query:
    status: string      // 可选，筛选状态
Response:
{
    "code": 200,
    "data": [{
        "id": number,
        "title": string,
        "content": string,
        "type": string,
        "status": string,
        "publishDate": string,
        "endDate": string,
        "createdBy": string
    }]
}
```

### 5.3 数据管理

#### 5.3.1 创建备份
```http
POST /api/admin/backup
Response:
{
    "code": 200,
    "data": {
        "id": number,
        "filename": string,
        "size": string,
        "type": "manual",
        "status": "success",
        "createdAt": string
    }
}
```

#### 5.3.2 获取备份列表
```http
GET /api/admin/backup
Response:
{
    "code": 200,
    "data": [{
        "id": number,
        "filename": string,
        "size": string,
        "type": string,
        "status": string,
        "createdAt": string,
        "note": string
    }]
}
```

#### 5.3.3 导出数据
```http
POST /api/admin/export
Request:
{
    "format": "json" | "excel",
    "type": "users" | "diaries" | "all"
}
Response:
{
    "code": 200,
    "data": {
        "downloadUrl": string  // 文件下载链接
    }
}
```

## 错误码说明
```typescript
200: 成功
400: 请求参数错误
401: 未授权
403: 权限不足
404: 资源不存在
500: 服务器内部错误
```

## 通用响应格式
```typescript
interface ApiResponse<T> {
    code: number        // 状态码
    message?: string    // 错误信息
    data?: T           // 响应数据
}
```

## 认证方式
- 使用 JWT (JSON Web Token) 进行身份认证
- 在请求头中添加 `Authorization: Bearer <token>`

## 权限控制
- 普通用户：只能访问自己的数据
- 管理员：可以访问所有数据和管理功能
- 使用 RBAC (基于角色的访问控制) 进行权限管理 