import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRoad,
  FaTint,
  FaTrash,
  FaLightbulb,
  FaShieldAlt,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

const categories = [
  { id: "road", name: "Road Damage", icon: <FaRoad size={28} /> },
  { id: "water", name: "Water Supply", icon: <FaTint size={28} /> },
  { id: "garbage", name: "Garbage Collection", icon: <FaTrash size={28} /> },
  { id: "light", name: "Street Light", icon: <FaLightbulb size={28} /> },
  { id: "safety", name: "Public Safety", icon: <FaShieldAlt size={28} /> },
  { id: "other", name: "Other", icon: <FaClipboardList size={28} /> },
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedCategory) return;

    navigate("/details", {
      state: { category: selectedCategory },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="max-w-sm mx-auto">
        {/* Step Indicator */}
        <p className="text-sm font-medium text-blue-600 mb-2">
          Step 1 of 3
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          Report an Issue
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Select the category that best describes your issue.
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[140px]
              
              ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-50 shadow-md scale-105"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }`}
            >
              {/* Check Icon */}
              {selectedCategory === category.id && (
                <FaCheckCircle className="absolute top-3 right-3 text-blue-600 text-xl" />
              )}

              {/* Category Icon */}
              <div className="text-blue-600">{category.icon}</div>

              {/* Category Name */}
              <span className="text-center font-medium text-gray-800 text-sm">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedCategory}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-white transition-all duration-300
          
          ${
            selectedCategory
              ? "bg-blue-600 hover:bg-blue-700 shadow-md"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;