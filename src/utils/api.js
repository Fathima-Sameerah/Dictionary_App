import axios from "axios";

export const fetchWordData = async (word) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching word data:", error);
    return null;
  }
};
