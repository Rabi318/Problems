import axios from "axios";

export const fetchMatches = async () => {
  const response = await axios.get(
    "https://jsonmock.hackerrank.com/api/football_matches?page=2"
  );
  return response.data.data;
};
