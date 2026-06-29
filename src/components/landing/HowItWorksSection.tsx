import { CheckCircle2, FileQuestion, LineChart, Rocket } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: <FileQuestion className="w-8 h-8" />,
    title: 'Take a Quiz',
    description: 'Answer questions across various concepts in mathematics, science, or any subject you want to improve.',
  },
  {
    step: 2,
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: 'AI Analyzes Your Responses',
    description: 'Our AI examines not just if you got it right, but how you approached each problem to find patterns.',
  },
  {
    step: 3,
    icon: <LineChart className="w-8 h-8" />,
    title: 'Discover Your Gaps',
    description: 'Get a detailed breakdown of concepts you struggle with, with explanations for why you might be struggling.',
  },
  {
    step: 4,
    icon: <Rocket className="w-8 h-8" />,
    title: 'Learn & Improve',
    description: 'Access personalized resources and practice materials designed to fill your specific knowledge gaps.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Simple Steps to
            <span className="text-gradient"> Master Any Concept</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process makes identifying and filling learning gaps effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-30" />

          {steps.map((item, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Step Number */}
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm flex items-center justify-center shadow-md">
                  {item.step}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
