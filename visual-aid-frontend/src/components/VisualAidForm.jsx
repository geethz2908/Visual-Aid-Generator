import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiDownload } from "react-icons/fi";
import "./VisualAidForm.css"; // we'll add this style file

const VisualAidForm = () => {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("Please enter a topic");

    setLoading(true);
    setImageSrc(null);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-visual-aid",
        { prompt: topic }, // ✳️ matches your backend structure
        { responseType: "json" }
      );

      if (response.data.image) {
        setImageSrc(`data:image/png;base64,${response.data.image}`);
      } else {
        setError("❌ Failed to generate image.");
      }
    } catch (err) {
      setError("⚠️ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="visual-aid-container">
      <div className="input-section">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g. Photosynthesis"
        />
        <button onClick={handleGenerate} className="generate-btn">
          <FiSend size={18} />
        </button>
      </div>

      {loading && <p className="loading">⏳ Generating...</p>}
      {error && <p className="error">{error}</p>}

      {imageSrc && (
        <div className="output-section">
          <img src={imageSrc} alt="Generated Visual Aid" />
          <a href={imageSrc} download="visual-aid.png">
            <button className="download-btn">
              <FiDownload size={16} />
              Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default VisualAidForm;
