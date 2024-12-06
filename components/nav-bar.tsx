"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, User, Moon, Sun, MessageCircle, Sparkles, BookOpen, Trophy } from "lucide-react"
import { useTheme } from "next-themes"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function NavBar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Heart className="h-6 w-6 text-pink-500 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              舔狗救赎
            </span>
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1">
                <NavigationMenuItem>
                  <Button variant="ghost" asChild className="text-base">
                    <Link href="/chat-analysis" className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>聊天分析</span>
                    </Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild className="text-base">
                    <Link href="/compliment-generator" className="flex items-center space-x-1">
                      <Sparkles className="h-4 w-4" />
                      <span>夸赞生成器</span>
                    </Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild className="text-base">
                    <Link href="/diary" className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>舔狗日记</span>
                    </Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" asChild className="text-base">
                    <Link href="/leaderboard" className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>排行榜</span>
                    </Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Theme Toggle and Login */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">切换主题</span>
              </Button>
              <Button variant="default" asChild className="gap-2">
                <Link href="/login">
                  <User className="h-4 w-4" />
                  <span>登录</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

