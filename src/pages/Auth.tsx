import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (isSignUp && !name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && !grade) {
      newErrors.grade = 'Please select your grade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let success: boolean;
      
      if (isSignUp) {
        success = await signup(name, email, password, grade);
      } else {
        success = await login(email, password);
      }

      if (success) {
        toast({
          title: isSignUp ? 'Account created!' : 'Welcome back!',
          description: isSignUp ? 'Your account has been created successfully.' : 'You have been logged in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl">AI Learning Gap</span>
          </div>

          {/* Header */}
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isSignUp
              ? 'Start your personalized learning journey today'
              : 'Log in to continue your learning journey'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="text-foreground font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`mt-1.5 h-12 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`mt-1.5 h-12 ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`h-12 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="grade" className="text-foreground font-medium">
                  Grade / Class
                </Label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className={`mt-1.5 flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    errors.grade ? 'border-destructive' : ''
                  }`}
                >
                  <option value="">Select your grade</option>
                  <option value="8th Grade">8th Grade</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                  <option value="College">College</option>
                </select>
                {errors.grade && (
                  <p className="text-destructive text-sm mt-1">{errors.grade}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Logging In...'}
                </>
              ) : (
                <>{isSignUp ? 'Create Account' : 'Log In'}</>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <p className="mt-8 text-center text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-primary-foreground">
            <h3 className="font-display text-4xl font-bold mb-6">
              Unlock Your Learning Potential
            </h3>
            <p className="text-lg opacity-90 max-w-md">
              Join thousands of students who are mastering concepts and filling their knowledge gaps with AI-powered insights.
            </p>
            
            {/* Decorative elements */}
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm opacity-80">Improvement Rate</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm opacity-80">Active Students</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background patterns */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white/10 rounded-full" />
      </div>
    </div>
  );
}
