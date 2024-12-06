import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, MessageCircle, Trophy, Sparkles, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">欢迎来到舔狗救赎</h1>
        <p className="text-xl mb-8">开启你的自我提升之旅，告别舔狗人生</p>
        <Button asChild size="lg">
          <Link href="/login">立即开始</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text mb-4">
              我们的特色功能
            </h2>
            <p className="text-xl text-muted-foreground">
              专业的功能设计，帮助你重塑社交关系，找回自我价值
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="p-2 rounded-full bg-pink-500/10 text-pink-500">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <CardTitle>聊天分析</CardTitle>
                </div>
                <CardDescription className="text-base">
                  上传聊天记录，获得AI专业点评，洞察交流技巧，避免社交误区
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-pink-500" asChild>
                  <Link href="/chat-analysis" className="flex items-center">
                    开始分析
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="p-2 rounded-full bg-violet-500/10 text-violet-500">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <CardTitle>夸赞生成器</CardTitle>
                </div>
                <CardDescription className="text-base">
                  上传照片，获得量身定制的夸赞话术，提升交流魅力和表达技巧
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-violet-500" asChild>
                  <Link href="/compliment-generator" className="flex items-center">
                    立即体验
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>舔狗日记</CardTitle>
                </div>
                <CardDescription className="text-base">
                  记录你的情感历程，AI分析你的进步，帮助你建立健康的情感认知
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-indigo-500" asChild>
                  <Link href="/diary" className="flex items-center">
                    开始写作
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle>排行榜</CardTitle>
                </div>
                <CardDescription className="text-base">
                  查看进步排名，与其他用户良性竞争，激励自我提升和成长
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-blue-500" asChild>
                  <Link href="/leaderboard" className="flex items-center">
                    查看排名
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">用户心得</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 max-w-6xl mx-auto">
          <Card className="min-w-[350px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row gap-4 items-start">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/avatar/xiaoming.jpg"
                  alt="小明的头像"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <CardTitle>小明，25岁</CardTitle>
                <CardDescription>软件工程师</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic">
                "使用舔狗救赎后，我学会了如何正确表达自己的感受。现在我不仅找到了女朋友，
                而且建立了更健康的人际关系。这个平台真的改变了我的生活！"
              </p>
            </CardContent>
          </Card>
          <Card className="min-w-[350px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row gap-4 items-start">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/avatar/xiaohong.jpg"
                  alt="小红的头像"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <CardTitle>小红，23岁</CardTitle>
                <CardDescription>学生</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic">
                "舔狗救赎帮助我更好地理解了舔狗行为的根源，并提供了有效的解决方案。
                我现在能够更自信地表达自己，不再害怕失去。"
              </p>
            </CardContent>
          </Card>
          <Card className="min-w-[350px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row gap-4 items-start">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/avatar/xiaoli.jpg"
                  alt="小李的头像"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <CardTitle>小李，27岁</CardTitle>
                <CardDescription>设计师</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic">
                "通过AI分析和建议，我学会了如何在保持真诚的同时不失自我。
                这让我在社交和工作中都获得了更多的尊重。"
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-4">准备好改变自己了吗？</h2>
        <p className="text-xl mb-8">加入我们，开始你的自我提升之旅</p>
        <Button asChild size="lg">
          <Link href="/register">立即注册 <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-4">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

