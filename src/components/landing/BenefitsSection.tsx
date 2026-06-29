import { Award, Clock, Heart, Shield } from 'lucide-react';

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Inclusive Education',
    description: 'Every student learns differently. Our platform adapts to individual needs, ensuring no one is left behind.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Concept Mastery Over Marks',
    description: 'Focus on truly understanding concepts rather than memorizing for tests. Real learning that lasts.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Save Time & Effort',
    description: 'No more guessing what to study. Know exactly where to focus your limited study time for maximum impact.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Build Confidence',
    description: 'Understanding your gaps removes anxiety. Approach exams knowing you have addressed your weak areas.',
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Benefits
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Why Students
              <span className="text-gradient"> Love Us</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Traditional assessments give you a score. We give you a roadmap. Our AI-powered platform 
              transforms how you learn by providing actionable insights that lead to real improvement.
            </p>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-secondary/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 rounded-full border-2 border-dashed border-accent/20 animate-spin" style={{ animationDuration: '25s' }} />
              
              {/* Center content */}
              <div className="absolute inset-24 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <div className="text-center text-primary-foreground">
                  <div className="font-display text-4xl font-bold mb-1">85%</div>
                  <div className="text-sm opacity-90">Improvement Rate</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-8 left-0 px-4 py-2 rounded-full bg-card shadow-lg border border-border animate-float">
                <span className="text-sm font-medium">📚 5 Concepts</span>
              </div>
              <div className="absolute top-1/4 right-0 px-4 py-2 rounded-full bg-card shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-medium">✨ Personalized</span>
              </div>
              <div className="absolute bottom-1/4 left-0 px-4 py-2 rounded-full bg-card shadow-lg border border-border animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-sm font-medium">🎯 Targeted</span>
              </div>
              <div className="absolute bottom-8 right-0 px-4 py-2 rounded-full bg-card shadow-lg border border-border animate-float" style={{ animationDelay: '3s' }}>
                <span className="text-sm font-medium">📈 Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
