export type CourseVariant = "green" | "yellow" | "gray";

export interface Course {
  id: number;
  variant: CourseVariant;
  classTag: string;
  langBadge: string;
  title: string;
  batchName: string;
  startDate: string;
  price: string;
  oldPrice?: string;
  discount: string;
  cta: string;
  flagLine: string;
}

export const COURSES: Course[] = [
  {
    id: 1,
    variant: "green",
    classTag: "Class 11 NEET",
    langBadge: "HINGLISH",
    title: "Arjuna",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹4,999",
    oldPrice: "₹5600",
    discount: "11% OFF",
    cta: "Buy Now",
    flagLine: "Multiple plans inside: Infinity & Infinity Pro",
  },
  {
    id: 2,
    variant: "yellow",
    classTag: "Class 11 NEET",
    langBadge: "हिंदी",
    title: "अर्जुना",
    batchName: "NEET 2026",
    startDate: "Starts on 14th Apr'25",
    price: "₹3,199",
    oldPrice: "₹5000",
    discount: "36% OFF",
    cta: "Buy Now",
    flagLine: "Limited Time Offer: Get it for ₹6,999 till 8th Feb",
  },
  {
    id: 3,
    variant: "gray",
    classTag: "NEET 2027",
    langBadge: "हिंglish",
    title: "Power Batch",
    batchName: "Small Group Online Classes",
    startDate: "Starts on 8th Jan'25",
    price: "₹499",
    discount: "For Seat Booking",
    cta: "Book A Seat",
    flagLine: "Power Batch: Small Group Online Classes",
  },
];

export function matchCourse(course: Course, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    course.title.toLowerCase().includes(q) ||
    course.classTag.toLowerCase().includes(q) ||
    course.batchName.toLowerCase().includes(q)
  );
}

export const POPULAR_TITLES = ["Arjuna", "अर्जुना", "Power Batch"];
