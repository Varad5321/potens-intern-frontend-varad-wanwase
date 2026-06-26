import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  return (
    <button
      type="button"
      onClick={() =>
        i18n.changeLanguage(i18n.language === "en" ? "mr" : "en")
      }
      aria-label={
        i18n.language === "en" ? "Switch to Marathi" : "Switch to English"
      }
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
    >
      <FaGlobe className="text-sky-600" />
      {i18n.language === "en" ? "मराठी" : "English"}
    </button>
  );
};

export default LanguageToggle;