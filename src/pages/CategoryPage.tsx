import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

import {
  FaRoad,
  FaTint,
  FaTrash,
  FaLightbulb,
  FaShieldAlt,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

const CategoryPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const categories = [
    {
      id: "roadDamage",
      icon: <FaRoad size={28} />,
    },
    {
      id: "waterSupply",
      icon: <FaTint size={28} />,
    },
    {
      id: "garbageCollection",
      icon: <FaTrash size={28} />,
    },
    {
      id: "streetLight",
      icon: <FaLightbulb size={28} />,
    },
    {
      id: "publicSafety",
      icon: <FaShieldAlt size={28} />,
    },
    {
      id: "other",
      icon: <FaClipboardList size={28} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="max-w-sm mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <p className="text-sm text-blue-600 mb-2">
          {t("step1")}
        </p>

        <h1 className="text-3xl font-bold">
          {t("reportIssue")}
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          {t("selectCategory")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.id)
              }
              className={`relative p-6 rounded-2xl border-2 min-h-[140px] flex flex-col justify-center items-center gap-4 transition-all

              ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-50 scale-105"
                  : "border-gray-200 bg-white"
              }`}
            >
              {selectedCategory === category.id && (
                <FaCheckCircle className="absolute top-3 right-3 text-blue-600" />
              )}

              <div className="text-blue-600">
                {category.icon}
              </div>

              <span className="text-center">
                {t(category.id)}
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!selectedCategory}
          onClick={() =>
            navigate("/details", {
              state: {
                category: t(selectedCategory),
              },
            })
          }
          className={`w-full mt-8 py-4 rounded-xl text-white

          ${
            selectedCategory
              ? "bg-blue-600"
              : "bg-gray-300"
          }`}
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;