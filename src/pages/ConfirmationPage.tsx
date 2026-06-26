import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { category, description, imageName, referenceId } = location.state || {};

  useEffect(() => {
    navigator.vibrate?.(100);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(135deg,_#f7fbff_0%,_#eef5ff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex justify-end">
          <LanguageToggle />
        </div>

        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <FaCheckCircle className="mx-auto mb-5 text-emerald-500" size={70} />

          <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-sky-700">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            {t("step3")}
          </div>

          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t("issueSubmitted")}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            {t("complaintRegistered")}
          </p>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              {t("referenceId")}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-[0.2em] text-sky-700">
              {referenceId}
            </h2>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-left">
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">{t("selectedCategory")}:</span>{" "}
                {category}
              </p>
              <p>
                <span className="font-semibold text-slate-800">{t("describeIssue")}:</span>{" "}
                {description}
              </p>
              {imageName && (
                <p>
                  <span className="font-semibold text-slate-800">{t("uploadPhoto")}:</span>{" "}
                  {imageName}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 w-full rounded-2xl bg-sky-600 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            {t("reportAnother")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;