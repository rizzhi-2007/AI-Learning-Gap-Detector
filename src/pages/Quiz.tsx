import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { Button } from '@/components/ui/button';
import { quizQuestions } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Trophy,
  Brain,
  Lightbulb,
  Target
} from 'lucide-react';

interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function Quiz() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: 'Please select an answer',
        variant: 'destructive',
      });
      return;
    }

    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setAnswers([
      ...answers,
      {
        questionId: question.id,
        selectedAnswer,
        isCorrect,
      },
    ]);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    const correct = answers.filter((a) => a.isCorrect).length;
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const getConceptPerformance = () => {
    const concepts: { [key: string]: { correct: number; total: number } } = {};
    
    answers.forEach((answer, index) => {
      const concept = quizQuestions[index].concept;
      if (!concepts[concept]) {
        concepts[concept] = { correct: 0, total: 0 };
      }
      concepts[concept].total++;
      if (answer.isCorrect) {
        concepts[concept].correct++;
      }
    });

    return Object.entries(concepts).map(([concept, data]) => ({
      concept,
      percentage: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total,
    }));
  };

  if (!isAuthenticated) return null;

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">Ready to Test Your Knowledge?</h1>
            <p className="text-muted-foreground text-lg mb-8">
              This quiz contains {quizQuestions.length} questions across various math concepts. 
              After completing, you'll receive detailed feedback on your performance.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-display text-2xl font-bold text-primary">{quizQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-display text-2xl font-bold text-secondary">5</div>
                <div className="text-sm text-muted-foreground">Concepts</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="font-display text-2xl font-bold text-accent">~10</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
            </div>

            <Button variant="hero" size="xl" onClick={() => setQuizStarted(true)}>
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Results Screen
  if (showResult) {
    const score = calculateScore();
    const conceptPerformance = getConceptPerformance();
    const weakConcepts = conceptPerformance.filter((c) => c.percentage < 70);

    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Score Card */}
            <div className="bg-card rounded-2xl border border-border p-8 text-center mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                score >= 70 ? 'gradient-success' : 'gradient-accent'
              } shadow-lg`}>
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold mb-2">Quiz Complete!</h1>
              <div className="font-display text-6xl font-bold text-gradient mb-2">{score}%</div>
              <p className="text-muted-foreground">
                You got {answers.filter((a) => a.isCorrect).length} out of {quizQuestions.length} questions correct
              </p>
            </div>

            {/* Concept Performance */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-8">
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Concept Breakdown
              </h2>
              <div className="space-y-4">
                {conceptPerformance.map((concept, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{concept.concept}</span>
                      <span className={`font-semibold ${
                        concept.percentage >= 70 ? 'text-success' : 'text-warning'
                      }`}>
                        {concept.correct}/{concept.total} ({concept.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          concept.percentage >= 70 ? 'bg-success' : 'bg-warning'
                        }`}
                        style={{ width: `${concept.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Gaps Identified */}
            {weakConcepts.length > 0 && (
              <div className="bg-card rounded-2xl border border-warning/30 p-6 mb-8">
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-warning">
                  <Lightbulb className="w-5 h-5" />
                  Learning Gaps Identified
                </h2>
                <p className="text-muted-foreground mb-4">
                  Based on your performance, here are concepts that need more attention:
                </p>
                <div className="flex flex-wrap gap-2">
                  {weakConcepts.map((concept, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-warning/10 text-warning font-medium"
                    >
                      {concept.concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={handleRestartQuiz}>
                <RefreshCw className="w-5 h-5" />
                Retry Quiz
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/resources')}>
                View Recommended Resources
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Quiz Question Screen
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {question.concept}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-6">
            <h2 className="font-display text-2xl font-bold mb-8 text-foreground">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrectness = showExplanation;

                let optionClasses = 'p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ';
                
                if (showCorrectness) {
                  if (isCorrect) {
                    optionClasses += 'border-success bg-success/10';
                  } else if (isSelected && !isCorrect) {
                    optionClasses += 'border-destructive bg-destructive/10';
                  } else {
                    optionClasses += 'border-border bg-muted/30 opacity-50';
                  }
                } else if (isSelected) {
                  optionClasses += 'border-primary bg-primary/10';
                } else {
                  optionClasses += 'border-border hover:border-primary/50 hover:bg-muted/50';
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={optionClasses}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                        showCorrectness && isCorrect
                          ? 'bg-success text-success-foreground'
                          : showCorrectness && isSelected && !isCorrect
                          ? 'bg-destructive text-destructive-foreground'
                          : isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={`font-medium flex-1 ${
                        showCorrectness && isCorrect ? 'text-success' :
                        showCorrectness && isSelected && !isCorrect ? 'text-destructive' :
                        'text-foreground'
                      }`}>
                        {option}
                      </span>
                      {showCorrectness && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      )}
                      {showCorrectness && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Explanation
                </h4>
                <p className="text-muted-foreground">{question.explanation}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            {!showExplanation ? (
              <Button
                variant="hero"
                size="lg"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button variant="hero" size="lg" onClick={handleNextQuestion}>
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
