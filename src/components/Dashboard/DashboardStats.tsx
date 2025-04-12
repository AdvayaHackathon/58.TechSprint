
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line
} from "recharts";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const recentSubmissions = [
  { id: 1, name: "Essay 1", score: 85, date: "2025-04-05" },
  { id: 2, name: "Quiz 2", score: 92, date: "2025-04-06" },
  { id: 3, name: "Assignment 3", score: 78, date: "2025-04-07" },
  { id: 4, name: "Final Paper", score: 65, date: "2025-04-08" },
  { id: 5, name: "Project", score: 90, date: "2025-04-09" },
];

const barChartData = recentSubmissions.map(item => ({
  name: item.name,
  score: item.score,
  fill: item.score >= 70 ? "#00e693" : "#ea384c"
}));

const lineChartData = recentSubmissions.map(item => ({
  name: item.name,
  score: item.score
}));

const pieChartData = [
  { name: "A (90-100%)", value: recentSubmissions.filter(s => s.score >= 90).length, fill: "#00e693" },
  { name: "B (80-89%)", value: recentSubmissions.filter(s => s.score >= 80 && s.score < 90).length, fill: "#0086e6" },
  { name: "C (70-79%)", value: recentSubmissions.filter(s => s.score >= 70 && s.score < 80).length, fill: "#FEC6A1" },
  { name: "D (60-69%)", value: recentSubmissions.filter(s => s.score >= 60 && s.score < 70).length, fill: "#FEF7CD" },
  { name: "F (Below 60%)", value: recentSubmissions.filter(s => s.score < 60).length, fill: "#ea384c" },
];

export function DashboardStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recentSubmissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                recentSubmissions.reduce((acc, curr) => acc + curr.score, 0) /
                  recentSubmissions.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                (recentSubmissions.filter((s) => s.score >= 70).length /
                  recentSubmissions.length) *
                  100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Submissions with 70% or higher
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Tabs defaultValue="bar">
                <TabsList className="mb-4">
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="line">Line Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="bar">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Score"]}
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={true}
                      >
                        {barChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="line">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lineChartData}
                      margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Score"]}
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} submissions`, name]}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
