import { Link } from "react-router-dom";

const COOKIE_SECTIONS = [
  {
    title: "Strictly Necessary Cookies",
    points: [
      "Required for the website to work correctly.",
      "Includes login sessions, shopping carts, and security tokens.",
    ],
    note: "These load by default and do not require prior user consent.",
  },
  {
    title: "Functional Cookies",
    points: [
      "Remember user choices and preferences.",
      "Include language settings, region selections, or customized layouts.",
    ],
  },
  {
    title: "Analytics / Performance Cookies",
    points: [
      "Track how visitors use your site.",
      "Include tools like Google Analytics or heatmapping scripts.",
    ],
    note: "Must be blocked until the user gives explicit consent.",
  },
  {
    title: "Targeting / Advertising Cookies",
    points: [
      "Build user profiles to show personalized ads.",
      "Include social media tracking pixels, marketing tags, and ad networks.",
    ],
    note: "Must remain blocked until opt-in consent is recorded.",
  },
];

export default function CookiePolicy() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-orange-400 bg-amber-50 p-6 sm:p-8 shadow-xl">
        <Link
          to="/"
          aria-label="Close cookie policy"
          className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 transition-colors"
        >
          <i className="ri-close-circle-line text-2xl" aria-hidden="true" />
        </Link>

        <h1 className="mb-6 text-center text-2xl font-bold text-orange-500">
          Cookie Policy
        </h1>

        <ol className="list-decimal space-y-5 pl-5 font-semibold text-neutral-900">
          {COOKIE_SECTIONS.map((section) => (
            <li key={section.title} className="space-y-1">
              <span>{section.title}</span>
              <ul className="list-disc space-y-1 pl-5 text-sm font-normal text-neutral-700">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
                {section.note && (
                  <li>
                    <strong className="italic">Note: </strong>
                    {section.note}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}