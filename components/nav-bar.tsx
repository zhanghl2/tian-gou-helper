"use client"

import * as React from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <NavigationMenu className="h-16">
          <NavigationMenuList className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-8">
              <NavigationMenuItem>
                <Link href="/" className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                    舔狗救赎
                  </span>
                </Link>
              </NavigationMenuItem>
              <div className="flex items-center space-x-1">
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="/chat-analysis">聊天分析</Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="/compliment-generator">夸赞生成器</Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="/diary">舔狗日记</Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href="/leaderboard">排行榜</Link>
                  </Button>
                </NavigationMenuItem>
              </div>
            </div>
            <NavigationMenuItem>
              <Button variant="default" asChild>
                <Link href="/login">登录</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

