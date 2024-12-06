import * as React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavBar } from "@/components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "舔狗救赎",
  description: "帮助舔狗走出困境的Web应用",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="container mx-auto p-4 mt-16 min-h-[calc(100vh-12rem)]">{children}</main>
          <footer className="border-t">
            <div className="container mx-auto p-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span>Developed by</span>
                  <a
                    href="https://github.com/bucaizhicai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    bucaizhicai
                  </a>
                </div>
                <p>© {new Date().getFullYear()} 舔狗救赎. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

