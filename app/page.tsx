import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, MessageCircle, Trophy } from 'lucide-react'

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
      <section className="py-20 bg-secondary w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我们的特色功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-primary" />}
              title="聊天分析"
              description="上传聊天记录，获得AI专业点评，洞察交流技巧"
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-primary" />}
              title="夸赞生成器"
              description="上传照片，获得量身定制的夸赞话术，提升交流魅力"
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-primary" />}
              title="舔狗排行榜"
              description="查看你的进步，与其他用户良性竞争，激励自我提升"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">用户心得</h2>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>小明，25岁</CardTitle>
              <CardDescription>软件工程师</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic">
                "使用舔狗救赎后，我学会了如何正确表达自己的感受。现在我不仅找到了女朋友，
                而且建立了更健康的人际关系。这个平台真的改变了我的生活！"
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>小红，23岁</CardTitle>
              <CardDescription>学生</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-lg italic">
                "舔狗救赎帮助我更好地理解了舔狗行为的根源，并提供了有效的解决方案。
                我现在能够更自信地表达自己，不再害怕失去。"
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

