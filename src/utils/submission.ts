import type { Submission } from "../types";

const SUBMISSIONS_KEY = "submissions";

export const generateReferenceId = () => {
  return `CIV-${new Date().getFullYear()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
};

export const saveSubmission = (submission: Submission) => {
  const existingSubmissions = JSON.parse(
    localStorage.getItem(SUBMISSIONS_KEY) || "[]"
  ) as Submission[];

  existingSubmissions.push(submission);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existingSubmissions));
};
