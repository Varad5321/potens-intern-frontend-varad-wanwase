import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMicrophone, FaCamera, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";
import type { Submission } from "../types";
import { generateReferenceId, saveSubmission } from "../utils/submission";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const category = location.state?.category || "Unknown";

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onerror = () => {
      alert("Voice recognition failed.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    const referenceId = generateReferenceId();

    const submission: Submission = {
      referenceId,
      category,
      description,
      imageName: image?.name || "",
      createdAt: new Date().toISOString(),
    };

    saveSubmission(submission);
    navigate("/confirmation", { state: submission });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_40%),linear-gradient(135deg,_#f7fbff_0%,_#eef5ff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex justify-end">
          <LanguageToggle />
        </div>

        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-sky-700">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            {t("step2")}
          </div>

          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            {t("issueDetails")}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            {t("issueDetailsDesc")}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                {t("selectedCategory")}
              </p>
              <div className="mt-3 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                {category}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Clear details help the civic team understand the urgency and route the request correctly.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                {t("describeIssue")}
              </label>
              <textarea
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                placeholder={t("placeholder")}
                className="min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-inner transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                <span>Helpful details make the report easier to resolve.</span>
                <span>{description.length}/500</span>
              </div>

              <button
                type="button"
                onClick={startVoiceInput}
                className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-4 text-sm font-semibold transition duration-200 ${
                  isListening
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                }`}
              >
                <FaMicrophone />
                {isListening ? t("listening") : t("voiceInput")}
              </button>

              <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:bg-sky-50">
                <FaCamera />
                {t("uploadPhoto")}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>

              {image && (
                <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  ✓ {image.name}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FaArrowLeft />
              {t("back")}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex flex-1 items-center justify-center rounded-2xl bg-sky-600 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;