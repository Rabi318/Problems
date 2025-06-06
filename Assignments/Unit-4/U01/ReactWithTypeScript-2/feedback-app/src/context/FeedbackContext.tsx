import type React from "react";
import { createContext, useState } from "react";

export interface FeedbackData {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
}

interface FeedbackContextType {
  feedbackData: FeedbackData;
  setFeedbackData: React.Dispatch<React.SetStateAction<FeedbackData>>;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  return (
    <FeedbackContext.Provider value={{ feedbackData, setFeedbackData }}>
      {children}
    </FeedbackContext.Provider>
  );
};
