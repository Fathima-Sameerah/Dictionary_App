import React, { useState } from "react";
import { fetchWordData } from "./utils/api";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(""); // Audio URL state
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (word) {
      const data = await fetchWordData(word);
      if (data && data.length > 0) {
        const firstResult = data[0]; // Take the first result
        setWordData(firstResult);
        setError(null);

        // Extract pronunciation audio for the new word
        const audio = firstResult.phonetics?.find((phonetic) => phonetic.audio)?.audio;
        setAudioUrl(audio || ""); // Set the audio URL or clear it if none is found
      } else {
        setError("Word not found");
        setWordData(null);
        setAudioUrl(""); // Clear audio when no word is found
      }
    }
  };

  return (
    <div className="App">
      <h1>Dictionary App</h1>
      <div className="search-container">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search for a word"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {wordData && (
        <div className="result-container">
          <h2>{wordData.word}</h2>
          <p><strong>Definition:</strong> {wordData.meanings[0]?.definitions[0]?.definition}</p>
          {wordData.meanings[0]?.synonyms?.length > 0 && (
            <p><strong>Synonyms:</strong> {wordData.meanings[0].synonyms.join(", ")}</p>
          )}
          {wordData.phonetic && <p><strong>Phonetic:</strong> {wordData.phonetic}</p>}
          {audioUrl ? (
            <div className="audio-container">
              <strong>Pronunciation:</strong>
              <audio key={audioUrl} controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <p>No pronunciation available</p>
          )}
        </div>
      )}
      <footer>Designed By Fathima Sameerah</footer>
    </div>
  );
}

export default App;
