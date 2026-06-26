import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() =>
        i18n.changeLanguage(
          i18n.language === "en" ? "mr" : "en"
        )
      }
      className="px-4 py-2 border rounded-xl bg-white"
    >
      {i18n.language === "en"
        ? "मराठी"
        : "English"}
    </button>
  );
};

export default LanguageToggle;