"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileScraper() {
  const [ssoKey, setSsoKey] = useState("");
  const [susSession, setSusSession] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrapeOne = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/scrape-one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, ssoKey, susSession }),
      });

      if (!response.ok) toast.error("Failed to fetch profile");
      else toast.success("Profile fetched successfully");
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ssoKey, susSession }),
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      await response.json();
      // console.log("data: ", data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          value={ssoKey}
          onChange={(e) => setSsoKey(e.target.value)}
          placeholder="Enter SSO Key"
          className="flex-1 p-2 border rounded"
        />
        <input
          type="text"
          value={susSession}
          onChange={(e) => setSusSession(e.target.value)}
          placeholder="Enter SUS Session"
          className="flex-1 p-2 border rounded"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Startup School profile URL"
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-4 mb-8">
        <button
          onClick={handleScrapeOne}
          disabled={loading || ssoKey === "" || susSession === "" || url === ""}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "Scrape One"}
        </button>
        {!loading && (
          <button
            onClick={handleScrape}
            disabled={loading || ssoKey === "" || susSession === ""}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Loading..." : "Scrape Many"}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
    </div>
  );
}
