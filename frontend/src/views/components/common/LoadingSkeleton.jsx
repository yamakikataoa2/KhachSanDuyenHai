import React from 'react';

function SkeletonBlock({ className = '' }) {
  return <div className={`bg-surface-container-high animate-skeleton rounded-lg ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden">
      <SkeletonBlock className="h-56 rounded-none" />
      <div className="p-6 space-y-4">
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonBlock className="h-4 w-1/2" />
        <SkeletonBlock className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-4 p-4">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonBlock key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 p-4">
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonBlock key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl space-y-3">
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-8 w-2/3" />
      <SkeletonBlock className="h-3 w-1/2" />
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="animate-fade-in space-y-8 p-2">
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-1/3" />
        <SkeletonBlock className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonStat key={i} />)}
      </div>
      <SkeletonTable rows={6} cols={5} />
    </div>
  );
}

export default SkeletonBlock;
