interface ConceptBarProps {
  concept: string;
  mastery: number;
  questionsAttempted: number;
  correct: number;
}

export function ConceptBar({ concept, mastery, questionsAttempted, correct }: ConceptBarProps) {
  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-success';
    if (mastery >= 60) return 'bg-primary';
    if (mastery >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  const getMasteryLabel = (mastery: number) => {
    if (mastery >= 80) return 'Excellent';
    if (mastery >= 60) return 'Good';
    if (mastery >= 40) return 'Needs Work';
    return 'Focus Area';
  };

  return (
    <div className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-foreground">{concept}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          mastery >= 80 ? 'bg-success/10 text-success' :
          mastery >= 60 ? 'bg-primary/10 text-primary' :
          mastery >= 40 ? 'bg-warning/10 text-warning' :
          'bg-destructive/10 text-destructive'
        }`}>
          {getMasteryLabel(mastery)}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${getMasteryColor(mastery)} rounded-full transition-all duration-700`}
          style={{ width: `${mastery}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{mastery}% mastery</span>
        <span>{correct}/{questionsAttempted} correct</span>
      </div>
    </div>
  );
}
