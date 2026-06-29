import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning Analysis</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            Discover Your
            <span className="text-gradient block mt-2">Learning Gaps</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Our AI analyzes your quiz responses to identify concept-level gaps and provides 
            <span className="text-foreground font-semibold"> personalized feedback</span> instead of just marks. 
            Master concepts, not just scores.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/auth?signup=true">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                I Already Have an Account
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <StatCard icon={<Users className="w-5 h-5" />} value="10,000+" label="Students" />
            <StatCard icon={<Target className="w-5 h-5" />} value="50,000+" label="Concepts Mastered" />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} value="85%" label="Improvement Rate" />
            <StatCard icon={<Sparkles className="w-5 h-5" />} value="500+" label="Quizzes Available" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="p-4 rounded-2xl bg-card/50 glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <div className="font-display font-bold text-2xl text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
