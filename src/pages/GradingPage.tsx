
import { useState } from "react";
import { Layout } from "@/components/Layout/Layout";
import { TextCompare } from "@/components/Grading/TextCompare";
import { GradingResults } from "@/components/Grading/GradingResults";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const GradingPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [gradingComplete, setGradingComplete] = useState(false);
  const [scoreData, setScoreData] = useState({
    score: 0,
    totalPossible: 100,
    matches: [] as string[],
    misses: [] as string[]
  });

  const handleGradeComplete = (
    score: number,
    totalPossible: number,
    matches: string[],
    misses: string[]
  ) => {
    setScoreData({
      score,
      totalPossible,
      matches,
      misses
    });
    setGradingComplete(true);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin">⏳</div>
          <span className="ml-2">Loading...</span>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Auto Grading</h1>
          <p className="text-muted-foreground mt-2">
            Upload reference and student answers to automatically grade submissions
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Text Comparison
              </CardTitle>
              <CardDescription>
                Compare student answers against a reference solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TextCompare onGradeComplete={handleGradeComplete} />
            </CardContent>
          </Card>

          {gradingComplete && (
            <GradingResults
              score={scoreData.score}
              totalPossible={scoreData.totalPossible}
              matches={scoreData.matches}
              misses={scoreData.misses}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GradingPage;
