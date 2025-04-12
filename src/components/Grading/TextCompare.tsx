
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  FileText, 
  Check, 
  Upload 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TextCompareProps {
  onGradeComplete: (score: number, totalPossible: number, matches: string[], misses: string[]) => void;
}

export function TextCompare({ onGradeComplete }: TextCompareProps) {
  const [referenceText, setReferenceText] = useState("");
  const [studentText, setStudentText] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState(100);
  const [matches, setMatches] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>([]);

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setReferenceText(text);
      toast.success("Reference answer loaded successfully");
    };
    reader.readAsText(file);
  };

  const handleStudentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setStudentText(text);
      toast.success("Student answer loaded successfully");
    };
    reader.readAsText(file);
  };

  const compareTexts = () => {
    if (!referenceText.trim() || !studentText.trim()) {
      toast.error("Please provide both reference and student answers");
      return;
    }

    setIsComparing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        // Split texts into sentences and normalize
        const refSentences = referenceText
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0)
          .map(s => s.toLowerCase());
        
        const studentSentences = studentText
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0)
          .map(s => s.toLowerCase());
        
        const foundMatches: string[] = [];
        const notFound: string[] = [];
        
        // Simple algorithm: check which reference sentences appear in student text
        for (const refSentence of refSentences) {
          let found = false;
          
          for (const studentSentence of studentSentences) {
            // Calculate similarity (very basic implementation)
            // In a real app, you'd use more sophisticated NLP techniques
            const similarity = calculateSimilarity(refSentence, studentSentence);
            
            if (similarity > 0.7) { // Arbitrary threshold
              found = true;
              foundMatches.push(refSentence);
              break;
            }
          }
          
          if (!found) {
            notFound.push(refSentence);
          }
        }
        
        // Calculate score as percentage of matches
        const calculatedScore = Math.round((foundMatches.length / refSentences.length) * totalPoints);
        
        setScore(calculatedScore);
        setMatches(foundMatches);
        setMisses(notFound);
        
        // Call the callback with the results
        onGradeComplete(calculatedScore, totalPoints, foundMatches, notFound);
        
        toast.success(`Grading complete! Score: ${calculatedScore}/${totalPoints}`);
      } catch (error) {
        console.error("Error comparing texts:", error);
        toast.error("An error occurred during grading");
      } finally {
        setIsComparing(false);
      }
    }, 1500);
  };

  // Very basic text similarity function
  // In a real app, you'd use more sophisticated NLP techniques
  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(/\s+/).filter(w => w.length > 3);
    const words2 = str2.split(/\s+/).filter(w => w.length > 3);
    
    let matches = 0;
    for (const word of words1) {
      if (words2.includes(word)) {
        matches++;
      }
    }
    
    return matches / Math.max(words1.length, 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Reference Answer
            </CardTitle>
            <CardDescription>
              Upload or paste the model answer text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste reference answer text here..."
              className="min-h-[200px]"
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <label className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                    <input 
                      type="file" 
                      accept=".txt" 
                      className="hidden" 
                      onChange={handleReferenceUpload} 
                    />
                  </label>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Student Answer
            </CardTitle>
            <CardDescription>
              Upload or paste the student's answer text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste student answer text here..."
              className="min-h-[200px]"
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <label className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                    <input 
                      type="file" 
                      accept=".txt" 
                      className="hidden" 
                      onChange={handleStudentUpload} 
                    />
                  </label>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={compareTexts} 
            disabled={isComparing || !referenceText || !studentText}
            className="px-8"
          >
            {isComparing ? "Grading..." : "Grade Submission"}
          </Button>
        </div>

        {isComparing && (
          <div className="w-full max-w-md">
            <Progress value={50} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              Analyzing texts...
            </p>
          </div>
        )}

        {score !== null && (
          <Card className={cn(
            "w-full max-w-md border-2",
            score >= 70 ? "border-success-500" : "border-destructive"
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                {score >= 70 ? (
                  <Check className="h-6 w-6 text-success-500" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                )}
                Score: {score}/{totalPoints}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Key points covered: {matches.length}
                </p>
                <p className="text-sm font-medium">
                  Missing points: {misses.length}
                </p>
                <Progress 
                  value={(score / totalPoints) * 100} 
                  className="h-2"
                  indicatorClassName={score >= 70 ? "bg-success-500" : "bg-destructive"}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
