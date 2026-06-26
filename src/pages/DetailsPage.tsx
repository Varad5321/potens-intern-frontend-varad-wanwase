import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaMicrophone,
  FaCamera,
  FaArrowLeft,
} from "react-icons/fa";

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const category = location.state?.category || "Unknown";

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
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

  const handleSubmit = () => {
    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    navigate("/confirmation", {
      state: {
        category,
        description,
        imageName: image?.name,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="max-w-sm mx-auto">
        {/* Step */}
        <p className="text-sm font-medium text-blue-600 mb-2">
          Step 2 of 3
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          Issue Details
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Provide details to help us resolve the issue quickly.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Category */}
          <div className="mb-5">
            <p className="text-sm text-gray-500">
              Selected Category
            </p>

            <div className="mt-2 inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              {category}
            </div>
          </div>

          {/* Description */}
          <label className="block font-medium mb-2">
            Describe the Issue
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder="Please describe the issue in detail..."
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-right text-sm text-gray-400 mt-1">
            {description.length}/500
          </p>

          {/* Voice Input */}
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
              ? "Listening..."
              : "Start Voice Input"}
          </button>

          {/* Image Upload */}
          <label className="w-full mt-4 border border-dashed border-gray-300 rounded-xl p-5 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <FaCamera />
            Upload Photo

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

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 py-4 rounded-xl font-medium flex justify-center items-center gap-2"
            >
              <FaArrowLeft />
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;