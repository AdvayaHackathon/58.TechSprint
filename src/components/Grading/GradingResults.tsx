
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
  Legend 
} from "recharts";
import { AlertTriangle, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GradingResultsProps {
  score: number;
  totalPossible: number;
  matches: string[];
  misses: string[];
}

export function GradingResults({ score, totalPossible, matches, misses }: GradingResultsProps) {
  const [showDetails, setShowDetails] = useState(false);

  const percentage = (score / totalPossible) * 100;
  const grade = percentage >= 90 ? 'A' :
               percentage >= 80 ? 'B' :
               percentage >= 70 ? 'C' :
               percentage >= 60 ? 'D' : 'F';

  const barChartData = [
    {
      name: "Student Score",
      score,
      fill: percentage >= 70 ? "#00e693" : "#ea384c"
    },
    {
      name: "Perfect Score",
      score: totalPossible,
      fill: "#0086e6"
    }
  ];

  const pieChartData = [
    { name: "Covered Points", value: matches.length, fill: "#00e693" },
    { name: "Missing Points", value: misses.length, fill: "#ea384c" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              {percentage >= 70 ? (
                <Check className="h-6 w-6 text-success-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-destructive" />
              )}
              Grading Results
            </CardTitle>
            <CardDescription className="text-center">
              Detailed analysis of the student's submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Score Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Points earned:</span>
                    <span className="font-bold">{score} / {totalPossible}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Percentage:</span>
                    <span className="font-bold">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Letter Grade:</span>
                    <span className={`text-xl font-bold ${
                      grade === 'A' || grade === 'B' ? 'text-success-500' : 
                      grade === 'C' ? 'text-brand-500' : 'text-destructive'
                    }`}>
                      {grade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Key points covered:</span>
                    <span className="font-bold">{matches.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Missing points:</span>
                    <span className="font-bold">{misses.length}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full"
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </div>

                {showDetails && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                        <Check className="h-4 w-4 text-success-500" />
                        Covered Points ({matches.length})
                      </h4>
                      <ul className="text-sm space-y-1 max-h-32 overflow-y-auto bg-muted/50 p-2 rounded">
                        {matches.map((match, index) => (
                          <li key={index} className="text-xs">• {match}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-1 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Missing Points ({misses.length})
                      </h4>
                      <ul className="text-sm space-y-1 max-h-32 overflow-y-auto bg-muted/50 p-2 rounded">
                        {misses.map((miss, index) => (
                          <li key={index} className="text-xs">• {miss}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Visualization</h3>
                <div className="space-y-6">
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={barChartData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, totalPossible]} />
                        <Tooltip 
                          formatter={(value) => [`${value} points`, ""]}
                          contentStyle={{ 
                            background: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)" 
                          }}
                        />
                        <Bar dataKey="score" fill="#0086e6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value} points`, ""]}
                          contentStyle={{ 
                            background: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)" 
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
