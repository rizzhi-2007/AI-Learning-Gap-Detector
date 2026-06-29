import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { ConceptBar } from '@/components/dashboard/ConceptBar';
import { Button } from '@/components/ui/button';
import { dashboardStats, analyticsData } from '@/data/mockData';
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  Flame, 
  Clock, 
  Brain,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's an overview of your learning progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            label="Quizzes Completed"
            value={dashboardStats.quizzesCompleted}
            trend="+3 this week"
            trendUp
            gradient="gradient-primary"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            label="Total Questions"
            value={dashboardStats.totalQuestions}
            gradient="gradient-success"
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Correct Answers"
            value={dashboardStats.correctAnswers}
            trend="68% accuracy"
            trendUp
            gradient="gradient-accent"
          />
          <StatCard
            icon={<Flame className="w-6 h-6" />}
            label="Study Streak"
            value={`${dashboardStats.studyStreak} days`}
            trend="🔥 Keep it up!"
            trendUp
            gradient="gradient-primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-primary/20 mb-4"
                />
                <h2 className="font-display text-xl font-bold text-foreground">
                  {user.name}
                </h2>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {user.grade}
                </span>

                <div className="mt-6 pt-6 border-t border-border w-full">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">
                        {dashboardStats.hoursSpent}h
                      </div>
                      <div className="text-sm text-muted-foreground">Study Time</div>
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">
                        {dashboardStats.conceptsLearned}
                      </div>
                      <div className="text-sm text-muted-foreground">Concepts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Overall Progress
              </h3>
              <div className="flex justify-center mb-4">
                <ProgressRing progress={analyticsData.overallProgress} size={140} />
              </div>
              <p className="text-center text-muted-foreground text-sm">
                You're making great progress! Keep practicing to improve your mastery.
              </p>
            </div>
          </div>

          {/* Right Column - Concept Mastery & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concept Mastery */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Concept Mastery
                </h3>
                <Link to="/analytics">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {analyticsData.conceptMastery.map((concept, index) => (
                  <ConceptBar
                    key={index}
                    concept={concept.concept}
                    mastery={concept.mastery}
                    questionsAttempted={concept.questionsAttempted}
                    correct={concept.correct}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/quiz" className="block">
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Take a Quiz</h3>
                  <p className="text-muted-foreground text-sm">
                    Test your knowledge and identify new learning gaps
                  </p>
                </div>
              </Link>
              <Link to="/resources" className="block">
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">Study Resources</h3>
                  <p className="text-muted-foreground text-sm">
                    Access personalized learning materials
                  </p>
                </div>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Quizzes
              </h3>
              <div className="space-y-3">
                {analyticsData.recentQuizzes.slice(0, 4).map((quiz, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        quiz.score >= 70 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {quiz.score >= 70 ? '✓' : '!'}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{quiz.concept} Quiz</div>
                        <div className="text-sm text-muted-foreground">{quiz.date}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      quiz.score >= 70 ? 'text-success' : 'text-warning'
                    }`}>
                      {quiz.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
