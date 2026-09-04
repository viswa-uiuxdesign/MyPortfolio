import { experience } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// Experience Timeline
// Sigma List pattern — right column of Hero
// ─────────────────────────────────────────

export function ExperienceTimeline() {
  return (
    <section aria-label="Work experience">
      <h2
        className="text-label text-[var(--text-tertiary)] mb-6"
        style={{ letterSpacing: '0.08em' }}
      >
        Experience
      </h2>

      <ol className="flex flex-col gap-0">
        {experience.map((entry, index) => (
          <li key={`${entry.company}-${index}`} className="relative flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-2 h-2 rounded-full flex-shrink-0 mt-1.5',
                  entry.isCurrent
                    ? 'bg-[var(--primary)]'
                    : 'bg-[var(--border-primary)]'
                )}
                aria-hidden="true"
              />
              {index < experience.length - 1 && (
                <div
                  className="w-px flex-1 mt-1 mb-0"
                  style={{
                    backgroundColor: 'var(--border-secondary)',
                    minHeight: '2rem',
                  }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div className={cn('pb-6', index === experience.length - 1 && 'pb-0')}>
              <p className="text-caption text-[var(--text-tertiary)] font-medium mb-1">
                {entry.period}
              </p>
              <p
                className="text-body-m text-[var(--text-primary)] font-medium leading-snug"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {entry.role}
              </p>
              
              {entry.client ? (
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-body-s font-medium text-[var(--text-primary)]">
                    {entry.client}
                  </p>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)]">
                      <polyline points="15 10 20 15 15 20"></polyline>
                      <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                    </svg>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      Consulting via {entry.company}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 mt-0.5">
                  {entry.company === 'Sketch Brahma Technologies' && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 38 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="flex-shrink-0 opacity-50"
                    >
                      <path
                        d="M36.3194 16.4118L28.7525 23.9859L22.8635 18.0962L30.4308 10.5226C30.8173 10.1356 31.2762 9.82864 31.7813 9.61923C32.2864 9.40981 32.8277 9.30204 33.3744 9.30204C33.9211 9.30204 34.4624 9.40981 34.9675 9.61923C35.4726 9.82864 35.9315 10.1356 36.318 10.5226C37.098 11.3036 37.5363 12.3626 37.5365 13.4669C37.5368 14.5712 37.099 15.6305 36.3194 16.4118ZM28.2836 2.48191C27.897 2.09496 27.4381 1.78799 26.9331 1.57857C26.428 1.36915 25.8867 1.26138 25.34 1.26138C24.7933 1.26138 24.252 1.36915 23.7469 1.57857C23.2418 1.78799 22.7829 2.09496 22.3964 2.48191L6.78462 18.1076L12.6718 24L28.2836 8.37435C28.6702 7.98747 28.9769 7.52814 29.1861 7.02262C29.3953 6.5171 29.503 5.97528 29.503 5.4281C29.503 4.88093 29.3953 4.33911 29.1861 3.83359C28.9769 3.32807 28.6702 2.86879 28.2836 2.48191ZM7.10664 13.4665L14.674 5.89289L8.78629 0L1.21943 7.57404C0.832829 7.96092 0.526155 8.42025 0.316923 8.92577C0.107692 9.43129 0 9.97311 0 10.5203C0 11.0675 0.107692 11.6093 0.316923 12.1148C0.526155 12.6203 0.832829 13.0797 1.21943 13.4665C1.60612 13.8533 2.06514 14.1601 2.57029 14.3693C3.07544 14.5785 3.61681 14.6861 4.1635 14.6859C4.71019 14.6857 5.25148 14.5777 5.75647 14.368C6.26146 14.1584 6.72025 13.8514 7.10664 13.4643V13.4665Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  <p className="text-body-s text-[var(--text-secondary)]">
                    {entry.company}
                    {entry.type && (
                      <span className="text-[var(--text-tertiary)]"> · {entry.type}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
