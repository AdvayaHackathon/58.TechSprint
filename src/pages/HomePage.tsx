
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout/Layout";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Automated Grading
              <span className="block text-gradient">Made Simple</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Grade Genius helps educators evaluate student answers automatically by comparing 
              them to reference solutions, saving time and providing consistent feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="font-medium"
                onClick={() => navigate("/grading")}
              >
                Start Grading
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
            
            <div className="pt-6">
              <div className="flex items-center gap-2">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  ✓
                </div>
                <span className="text-muted-foreground">Easy text comparison</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  ✓
                </div>
                <span className="text-muted-foreground">Detailed score analytics</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  ✓
                </div>
                <span className="text-muted-foreground">Visualized results</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass p-6 rounded-xl shadow-xl transform rotate-3">
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <div className="h-4 w-24 bg-primary/20 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted rounded"></div>
                  <div className="h-3 w-4/5 bg-muted rounded"></div>
                  <div className="h-3 w-3/5 bg-muted rounded"></div>
                </div>
              </div>
              <div className="mt-4 p-2 bg-success-500/10 rounded border border-success-500/20 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-success-500"></div>
                <div className="h-3 w-20 bg-success-500/30 rounded"></div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl shadow-lg absolute -bottom-10 -left-10 transform -rotate-3">
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-16 bg-primary/30 rounded"></div>
                <div className="h-6 w-6 rounded-full bg-primary/20"></div>
              </div>
              <div className="h-24 bg-muted rounded-lg"></div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-3 w-3/12 bg-primary/30 rounded"></div>
                <div className="h-3 w-2/12 bg-success-500/30 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover p-6 bg-card rounded-xl border">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Reference</h3>
              <p className="text-muted-foreground">
                Provide a reference text with the correct answers that will be used for comparison.
              </p>
            </div>
            
            <div className="card-hover p-6 bg-card rounded-xl border">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Student Answer</h3>
              <p className="text-muted-foreground">
                Submit the student's text response that needs to be evaluated.
              </p>
            </div>
            
            <div className="card-hover p-6 bg-card rounded-xl border">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600 mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">View Results</h3>
              <p className="text-muted-foreground">
                Get instant scoring with detailed analysis and visual representation of results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
