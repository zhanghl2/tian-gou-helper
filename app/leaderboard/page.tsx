import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const leaderboardData = [
  { rank: 1, username: "舔王", score: 98, activity: "非常活跃" },
  { rank: 2, username: "舔神", score: 95, activity: "活跃" },
  { rank: 3, username: "舔圣", score: 92, activity: "非常活跃" },
  { rank: 4, username: "舔帝", score: 90, activity: "活跃" },
  { rank: 5, username: "舔皇", score: 88, activity: "较活跃" },
  { rank: 6, username: "舔霸", score: 85, activity: "活跃" },
  { rank: 7, username: "舔尊", score: 82, activity: "较活跃" },
  { rank: 8, username: "舔祖", score: 80, activity: "活跃" },
  { rank: 9, username: "舔师", score: 78, activity: "较活跃" },
  { rank: 10, username: "舔者", score: 75, activity: "活跃" },
]

export default function LeaderboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>舔狗排行榜</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">排名</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>得分</TableHead>
              <TableHead>活跃度</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-medium">{user.rank}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.score}</TableCell>
                <TableCell>{user.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

