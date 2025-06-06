import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const FeedbackDashboard: React.FC = () => {
  const feedback = useSelector((state: RootState) => state.feedback.entries);

  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) => feedback.filter((f) => f.rating === rating).length
  );

  const data = {
    labels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
    datasets: [
      {
        label: "Feedback Count",
        data: ratingCounts,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Feedback Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default FeedbackDashboard;
