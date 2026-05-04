import { useRef } from "react";
import SearchDropdown from "./SearchDropdown";

interface TopNavProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchActive: boolean;
  setSearchActive: (active: boolean) => void;
}

/**
 * TopNav — hamburger menu (or back-arrow when searching) on the left,
 * rounded search field on the right with a live suggestion dropdown.
 */
export default function TopNav({
  searchQuery,
  setSearchQuery,
  isSearchActive,
  setSearchActive,
}: TopNavProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const closeSearch = () => {
    setSearchQuery("");
    setSearchActive(false);
    inputRef.current?.blur();
  };

  const handleSelect = (title: string) => {
    setSearchQuery(title);
    setSearchActive(false);
    inputRef.current?.blur();
  };

  return (
    <div
      data-component="TopNav"
      className="flex items-center gap-12 px-20 pt-8 pb-8"
    >
      <button
        aria-label={isSearchActive ? "Close search" : "Open menu"}
        onClick={isSearchActive ? closeSearch : undefined}
        className="flex h-40 w-40 items-center justify-center text-heading flex-shrink-0"
      >
        {isSearchActive ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 4L6.5 10L12.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
            <rect y="0" width="20" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>

      <div
        data-component="SearchBar"
        role="combobox"
        aria-expanded={isSearchActive}
        aria-haspopup="listbox"
        className="relative flex flex-1 items-center gap-6 rounded-sm bg-white px-12 py-8 border border-strokeMed focus-within:border-brand-primary"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="flex-shrink-0">
          <circle cx="9" cy="9" r="6.25" stroke="#7b7f86" strokeWidth="1.5" />
          <path d="M13.5 13.5L17 17" stroke="#7b7f86" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchActive(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSearch();
          }}
          placeholder="Search for Arjuna"
          className="text-regular text-body2 bg-transparent outline-none w-full"
        />
        {searchQuery !== "" && (
          <button
            type="button"
            aria-label="Clear search"
            onMouseDown={(e) => {
              e.preventDefault();
              setSearchQuery("");
              inputRef.current?.focus();
            }}
            className="flex h-20 w-20 items-center justify-center text-gray-500 flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {isSearchActive && (
          <SearchDropdown query={searchQuery} onSelect={handleSelect} />
        )}
      </div>
    </div>
  );
}
