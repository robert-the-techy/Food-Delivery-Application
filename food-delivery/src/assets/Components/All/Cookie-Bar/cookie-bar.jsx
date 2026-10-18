import { Link } from "react-router-dom";
import CookiePath from "../../../Images/cookie.png";
import "../../../CSS/style.css";
import { useCookieContext } from "../../Contexts/CookieContext";

export default function CookieBar({ show }) {
  const { setShowCookie } = useCookieContext();

  const handleCookieChoice = (status) => {
    document.cookie = `CookieValue=${status}; max-age=31536000; path=/; SameSite=Lax`;
    setShowCookie(false);
  };

  return (
    <aside
      aria-label="Cookie consent banner"
      className={`h-fit w-80 bg-amber-100 border border-orange-400 rounded-sm p-4 space-y-4 cookie ${
        show ? "cookie-show" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <img src={CookiePath} alt="Cookie icon" className="w-16 h-16 object-contain" />
        <h2 className="text-xl font-bold text-neutral-900">We use Cookies</h2>
      </div>

      <p className="text-xs text-neutral-700 leading-relaxed">
        By clicking &quot;Accept all cookies&quot;, you agree that we can store cookies on your device
        and disclose information in accordance with our{" "}
        <Link to="/cookie-policy" className="underline font-medium hover:text-orange-600">
          Cookie Policy
        </Link>
        .
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={() => handleCookieChoice("Stored")}
            className="w-1/2 bg-orange-400 font-bold p-2 rounded-xl text-xs hover:bg-black hover:text-orange-400 transition-colors duration-200"
          >
            Accept all cookies
          </button>
          <button
            type="button"
            onClick={() => handleCookieChoice("Removed")}
            className="w-1/2 bg-orange-400 font-bold p-2 rounded-xl text-xs hover:bg-black hover:text-orange-400 transition-colors duration-200"
          >
            Reject all cookies
          </button>
        </div>

        <Link
          to="/cookie-customization"
          className="w-full block text-center bg-orange-400 font-bold p-2 rounded-xl text-xs hover:bg-black hover:text-orange-400 transition-colors duration-200"
        >
          Customize cookies
        </Link>
      </div>
    </aside>
  );
}