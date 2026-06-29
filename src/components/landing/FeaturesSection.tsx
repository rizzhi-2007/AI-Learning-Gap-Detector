import { Brain, BarChart3, BookOpen, Lightbulb, Target, Zap } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI-Powered Analysis',
    description: 'Our intelligent system analyzes your quiz responses to identify exactly where you need help.',
    gradient: 'gradient-primary',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Concept-Level Gaps',
    description: 'Pinpoint specific concepts you struggle with, not just topics, enabling targeted improvement.',
    gradient: 'gradient-success',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Personalized Feedback',
    description: 'Receive meaningful insights and explanations tailored to your learning style and needs.',
    gradient: 'gradient-accent',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Progress Tracking',
    description: 'Visual analytics show your growth over time with detailed concept mastery reports.',
    gradient: 'gradient-primary',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Smart Resources',
    description: 'Get curated learning materials automatically recommended based on your weak areas.',
    gradient: 'gradient-success',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Adaptive Quizzes',
    description: 'Dynamic quizzes that adjust difficulty based on your performance for optimal learning.',
    gradient: 'gradient-accent',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Excel</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed to transform how you learn and identify areas for improvement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-5 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
