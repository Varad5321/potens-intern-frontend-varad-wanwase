import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaMicrophone,
  FaCamera,
  FaArrowLeft,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/LanguageToggle";

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

      setDescription((prev) =>
        prev ? `${prev} ${transcript}` : transcript
      );
    };

    recognition.onerror = () => {
      alert("Voice recognition failed.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const generateReferenceId = () => {
    return `CIV-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    const referenceId = generateReferenceId();

    const submission = {
      referenceId,
      category,
      description,
      imageName: image?.name || "",
      createdAt: new Date().toISOString(),
    };

    const existingSubmissions = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );

    existingSubmissions.push(submission);

    localStorage.setItem(
      "submissions",
      JSON.stringify(existingSubmissions)
    );

    navigate("/confirmation", {
      state: submission,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="max-w-sm mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <p className="text-sm font-medium text-blue-600 mb-2">
          {t("step2")}
        </p>

        <h1 className="text-3xl font-bold text-gray-900">
          {t("issueDetails")}
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          {t("issueDetailsDesc")}
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-5">
            <p className="text-sm text-gray-500">
              {t("selectedCategory")}
            </p>

            <div className="mt-2 inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              {category}
            </div>
          </div>

          <label className="block font-medium mb-2">
            {t("describeIssue")}
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder={t("placeholder")}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-right text-sm text-gray-400 mt-1">
            {description.length}/500
          </p>

          <button
            onClick={startVoiceInput}
            className={`w-full mt-5 border rounded-xl p-4 flex items-center justify-center gap-3 transition
              ${
                isListening
                  ? "bg-red-50 border-red-300 text-red-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            <FaMicrophone />

            {isListening
              ? t("listening")
              : t("voiceInput")}
          </button>

          <label className="w-full mt-4 border border-dashed border-gray-300 rounded-xl p-5 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <FaCamera />
            {t("uploadPhoto")}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />
          </label>

          {image && (
            <p className="mt-3 text-sm text-green-600">
              ✓ {image.name}
            </p>
          )}

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 py-4 rounded-xl font-medium flex justify-center items-center gap-2"
            >
              <FaArrowLeft />
              {t("back")}
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium"
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