import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { analyticsData } from '@/data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  CheckCircle2,
  LineChart
} from 'lucide-react';

export default function Analytics() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const weakConcepts = analyticsData.conceptMastery.filter((c) => c.mastery < 60);
  const strongConcepts = analyticsData.conceptMastery.filter((c) => c.mastery >= 70);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground text-lg">
            Understand your learning patterns and identify areas for improvement
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Overall Mastery
            </h3>
            <div className="flex justify-center">
              <ProgressRing progress={analyticsData.overallProgress} size={160} strokeWidth={10} />
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              {analyticsData.overallProgress >= 70 
                ? "Great progress! Keep it up!" 
                : "Keep practicing to improve your mastery"}
            </p>
          </div>

          {/* Strengths */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              Your Strengths
            </h3>
            {strongConcepts.length > 0 ? (
              <div className="space-y-3">
                {strongConcepts.map((concept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-success/10">
                    <span className="font-medium text-foreground">{concept.concept}</span>
                    <span className="font-semibold text-success">{concept.mastery}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Complete more quizzes to identify your strengths
              </p>
            )}
          </div>

          {/* Areas to Improve */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              Focus Areas
            </h3>
            {weakConcepts.length > 0 ? (
              <div className="space-y-3">
                {weakConcepts.map((concept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-warning/10">
                    <span className="font-medium text-foreground">{concept.concept}</span>
                    <span className="font-semibold text-warning">{concept.mastery}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No weak areas detected. Great job!
              </p>
            )}
          </div>
        </div>

        {/* Detailed Concept Analysis */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Concept-wise Performance
          </h3>
          <div className="space-y-6">
            {analyticsData.conceptMastery.map((concept, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{concept.concept}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      concept.mastery >= 80 ? 'bg-success/10 text-success' :
                      concept.mastery >= 60 ? 'bg-primary/10 text-primary' :
                      concept.mastery >= 40 ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {concept.mastery >= 80 ? 'Excellent' :
                       concept.mastery >= 60 ? 'Good' :
                       concept.mastery >= 40 ? 'Needs Work' :
                       'Focus Area'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{concept.mastery}%</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      ({concept.correct}/{concept.questionsAttempted})
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      concept.mastery >= 80 ? 'bg-success' :
                      concept.mastery >= 60 ? 'bg-primary' :
                      concept.mastery >= 40 ? 'bg-warning' :
                      'bg-destructive'
                    }`}
                    style={{ width: `${concept.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Weekly Progress
            </h3>
            <div className="space-y-4">
              {analyticsData.weeklyProgress.map((week, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{week.week}</span>
                    <span className="font-semibold text-foreground">{week.progress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${week.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quiz Scores */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Recent Quiz Scores
            </h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {analyticsData.recentQuizzes.map((quiz, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      quiz.score >= 70 ? 'bg-success' : 'bg-warning'
                    }`}
                    style={{ height: `${quiz.score * 1.5}px` }}
                  />
                  <div className="mt-2 text-center">
                    <div className="font-semibold text-sm">{quiz.score}%</div>
                    <div className="text-xs text-muted-foreground truncate w-16">
                      {quiz.concept}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Learning Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card/50 rounded-xl p-4">
              <h4 className="font-medium text-foreground mb-2">📊 Pattern Detected</h4>
              <p className="text-muted-foreground text-sm">
                You perform better in abstract concepts (Algebra, Statistics) compared to visual concepts (Geometry). 
                Consider using more diagrams when studying geometry.
              </p>
            </div>
            <div className="bg-card/50 rounded-xl p-4">
              <h4 className="font-medium text-foreground mb-2">💡 Recommendation</h4>
              <p className="text-muted-foreground text-sm">
                Focus on Fractions this week. Your performance dropped from 60% to 45% recently. 
                We've added targeted resources to help you improve.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
