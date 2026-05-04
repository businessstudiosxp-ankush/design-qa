import { COURSES, POPULAR_TITLES, matchCourse } from "../data/courses";

interface SearchDropdownProps {
  query: string;
  onSelect: (title: string) => void;
}

/**
 * SearchDropdown — suggestions panel anchored under the search input.
 * Empty query shows popular course titles; otherwise filters live.
 */
export default function SearchDropdown({ query, onSelect }: SearchDropdownProps) {
  const trimmed = query.trim();
  const matches = trimmed ? COURSES.filter((c) => matchCourse(c, trimmed)) : [];

  return (
    <div
      role="listbox"
      data-component="SearchDropdown"
      className="absolute left-0 right-0 top-full mt-4 z-20 bg-white rounded-sm border border-strokeMed shadow-card overflow-hidden"
    >
      {trimmed === "" ? (
        <div className="flex flex-col">
          <div className="px-12 pt-12 pb-6 text-body2 font-semibold text-gray-500 uppercase tracking-wide">
            Popular searches
          </div>
          {POPULAR_TITLES.map((title) => (
            <button
              key={title}
              role="option"
              aria-selected={false}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(title);
              }}
              className="flex items-center gap-8 px-12 py-10 text-left hover:bg-gray-100 active:bg-gray-200 text-body1 text-heading"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden className="flex-shrink-0">
                <circle cx="9" cy="9" r="6.25" stroke="#7b7f86" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="#7b7f86" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {title}
            </button>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="px-12 py-12 text-body1 text-gray-500">
          No courses match "{trimmed}"
        </div>
      ) : (
        <div className="flex flex-col">
          {matches.map((course) => (
            <button
              key={course.id}
              role="option"
              aria-selected={false}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(course.title);
              }}
              className="flex items-center gap-10 px-12 py-10 text-left hover:bg-gray-100 active:bg-gray-200"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden className="flex-shrink-0">
                <circle cx="9" cy="9" r="6.25" stroke="#7b7f86" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="#7b7f86" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col min-w-0">
                <span className="text-body1 text-heading truncate">{course.title}</span>
                <span className="text-body2 text-gray-500 truncate">{course.classTag} · {course.batchName}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
