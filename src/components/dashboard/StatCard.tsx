import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export function StatCard({ icon, label, value, trend, trendUp, gradient = 'gradient-primary' }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            trendUp ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="font-display text-3xl font-bold text-foreground mb-1">
        {value}
      </div>
      <div className="text-muted-foreground text-sm">
        {label}
      </div>
    </div>
  );
}
