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
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "roadDamage", icon: <FaRoad size={24} /> },
    { id: "waterSupply", icon: <FaTint size={24} /> },
    { id: "garbageCollection", icon: <FaTrash size={24} /> },
    { id: "streetLight", icon: <FaLightbulb size={24} /> },
    { id: "publicSafety", icon: <FaShieldAlt size={24} /> },
    { id: "other", icon: <FaClipboardList size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(135deg,_#f7fbff_0%,_#eef5ff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              Civic Report
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Report local issues in minutes
            </h1>
          </div>
          <LanguageToggle />
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-sky-700">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
              {t("step1")}
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              {t("reportIssue")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              {t("selectCategory")}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative flex min-h-[138px] flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-200 ${
                    selectedCategory === category.id
                      ? "border-sky-500 bg-sky-50 shadow-sm"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {selectedCategory === category.id && (
                    <FaCheckCircle className="absolute right-3 top-3 text-sky-600" />
                  )}
                  <div className="rounded-full bg-sky-100 p-3 text-sky-700 transition group-hover:scale-105">
                    {category.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {t(category.id)}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={!selectedCategory}
              onClick={() =>
                navigate("/details", {
                  state: {
                    category: t(selectedCategory),
                  },
                })
              }
              className={`mt-8 flex w-full items-center justify-center rounded-2xl px-4 py-4 text-sm font-semibold text-white shadow-sm transition duration-200 ${
                selectedCategory
                  ? "bg-sky-600 hover:bg-sky-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              {t("continue")}
            </button>
          </section>

          <aside className="rounded-[28px] border border-slate-200/80 bg-slate-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              How it works
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              A simple 3-step path to get help faster
            </h3>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                1. Choose the category that best matches your concern.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                2. Add details, voice notes, or a photo for better context.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
                3. Submit and receive a reference ID for follow-up.
              </li>
            </ul>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;