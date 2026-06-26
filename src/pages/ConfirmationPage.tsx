import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const {
    category,
    description,
    imageName,
    referenceId,
  } = location.state || {};

  useEffect(() => {
    navigator.vibrate?.(100);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8 flex items-center">
      <div className="max-w-sm mx-auto w-full">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <FaCheckCircle
            className="mx-auto text-green-500 mb-5"
            size={70}
          />

          <p className="text-sm font-medium text-blue-600 mb-2">
            {t("step3")}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {t("issueSubmitted")}
          </h1>

          <p className="text-gray-500 mt-3">
            {t("complaintRegistered")}
          </p>

          <div className="bg-gray-100 rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-500">
              {t("referenceId")}
            </p>

            <h2 className="text-xl font-bold text-blue-600 mt-2">
              {referenceId}
            </h2>
          </div>

          <div className="text-left mt-6 space-y-3">
            <p>
              <strong>{t("selectedCategory")}:</strong>{" "}
              {category}
            </p>

            <p>
              <strong>{t("describeIssue")}:</strong>{" "}
              {description}
            </p>

            {imageName && (
              <p>
                <strong>{t("uploadPhoto")}:</strong>{" "}
                {imageName}
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
          >
            {t("reportAnother")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;