import CourseCard from "./CourseCard";
import { COURSES, matchCourse } from "../data/courses";

interface TrendingCoursesProps {
  searchQuery?: string;
}

/**
 * TrendingCourses — section header + course cards + "View All Batches".
 * Cards are filtered against the search query when one is provided.
 */
export default function TrendingCourses({ searchQuery = "" }: TrendingCoursesProps) {
  const filteredCourses = COURSES.filter((c) => matchCourse(c, searchQuery));
  const isSearching = searchQuery.trim() !== "";

  return (
    <section
      data-component="TrendingCourses"
      className="flex flex-col gap-16 px-16 pt-16 pb-16"
    >
      <h2 className="text-h3 font-semibold text-heading">
        {isSearching ? "Search Results" : "Trending Courses"}
      </h2>

      <div className="flex flex-col gap-12">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              variant={course.variant}
              classTag={course.classTag}
              langBadge={course.langBadge}
              title={course.title}
              batchName={course.batchName}
              startDate={course.startDate}
              price={course.price}
              oldPrice={course.oldPrice}
              discount={course.discount}
              cta={course.cta}
              flagLine={course.flagLine}
            />
          ))
        ) : (
          <div className="py-12 text-center text-body1 text-gray-500">
            No courses found matching "{searchQuery}"
          </div>
        )}
      </div>

      {!isSearching && (
        <button
          data-component="ViewAllBatchesButton"
          className="rounded border border-brand-primary py-10 text-regular font-semibold text-brand-primary"
        >
          View All Batches
        </button>
      )}
    </section>
  );
}
