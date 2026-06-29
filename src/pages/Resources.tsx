import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { Button } from '@/components/ui/button';
import { learningResources, analyticsData } from '@/data/mockData';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Gamepad2,
  Star,
  Clock,
  Filter,
  Sparkles
} from 'lucide-react';

export default function Resources() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const weakConcepts = analyticsData.conceptMastery
    .filter((c) => c.mastery < 60)
    .map((c) => c.concept);

  const concepts = ['all', ...new Set(learningResources.map((r) => r.concept))];
  const types = ['all', 'video', 'interactive', 'article', 'practice'];

  const filteredResources = learningResources.filter((resource) => {
    const matchesConcept = selectedConcept === 'all' || resource.concept === selectedConcept;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesConcept && matchesType;
  });

  const recommendedResources = filteredResources.filter((r) => r.recommended);
  const otherResources = filteredResources.filter((r) => !r.recommended);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'interactive':
        return <Gamepad2 className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'practice':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-destructive/10 text-destructive';
      case 'interactive':
        return 'bg-primary/10 text-primary';
      case 'article':
        return 'bg-secondary/10 text-secondary';
      case 'practice':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/10 text-success';
      case 'Intermediate':
        return 'bg-warning/10 text-warning';
      case 'Advanced':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Learning Resources
          </h1>
          <p className="text-muted-foreground text-lg">
            Personalized materials to help you master challenging concepts
          </p>
        </div>

        {/* Weak Concepts Alert */}
        {weakConcepts.length > 0 && (
          <div className="bg-gradient-to-r from-warning/10 to-accent/10 rounded-2xl border border-warning/20 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Focus on These Concepts</h3>
                <p className="text-muted-foreground mb-3">
                  Based on your quiz performance, we recommend focusing on:
                </p>
                <div className="flex flex-wrap gap-2">
                  {weakConcepts.map((concept, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedConcept(concept)}
                      className="px-4 py-2 rounded-full bg-warning/20 text-warning font-medium hover:bg-warning/30 transition-colors"
                    >
                      {concept}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              <Filter className="w-4 h-4 inline mr-1" />
              Concept
            </label>
            <div className="flex flex-wrap gap-2">
              {concepts.map((concept) => (
                <button
                  key={concept}
                  onClick={() => setSelectedConcept(concept)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedConcept === concept
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {concept === 'all' ? 'All Concepts' : concept}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Resources */}
        {recommendedResources.length > 0 && (
          <div className="mb-10">
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              Recommended for You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  getTypeIcon={getTypeIcon}
                  getTypeColor={getTypeColor}
                  getDifficultyColor={getDifficultyColor}
                  isRecommended
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Resources */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {recommendedResources.length > 0 ? 'More Resources' : 'All Resources'}
          </h2>
          {otherResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  getTypeIcon={getTypeIcon}
                  getTypeColor={getTypeColor}
                  getDifficultyColor={getDifficultyColor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more resources.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface ResourceCardProps {
  resource: typeof learningResources[0];
  getTypeIcon: (type: string) => JSX.Element;
  getTypeColor: (type: string) => string;
  getDifficultyColor: (difficulty: string) => string;
  isRecommended?: boolean;
}

function ResourceCard({ resource, getTypeIcon, getTypeColor, getDifficultyColor, isRecommended }: ResourceCardProps) {
  return (
    <div className={`bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${
      isRecommended ? 'border-warning/30 ring-2 ring-warning/20' : 'border-border'
    }`}>
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isRecommended && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-warning text-warning-foreground text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Recommended
          </div>
        )}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getTypeColor(resource.type)}`}>
          {getTypeIcon(resource.type)}
          {resource.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
            {resource.concept}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {resource.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {resource.duration}
          </span>
          <Button variant="default" size="sm">
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
}
