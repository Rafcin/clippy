// components/UrlExtractor.tsx
import React, { useState } from "react";

const UrlExtractor: React.FC = () => {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleUrlsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const urlArray = urls.split("\n").filter((url) => url.trim() !== "");
    console.log("Urls: ", urlArray);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls: urlArray }),
      });

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult("An error occurred while processing the documents.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>URL Extractor</h1>
      <textarea
        value={urls}
        onChange={handleUrlsChange}
        placeholder="Enter one URL per line..."
        rows={10}
        cols={50}
        style={{ resize: "none" }}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Extract Data"}
      </button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default UrlExtractor;
