import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import { ApiError } from "../utils/ApiError";

export const searchToDocs = async (question: string) => {
  const apiKey = process.env.SERP_API_KEY;

  if (!apiKey) {
    throw new ApiError(400,"Api Key not found");
  }
  // Use SerpAPILoader to load web search results
  const loader = new SerpAPILoader({ q: question, apiKey });
  const docs = await loader.load();

  if (!Array.isArray(docs) || docs.length === 0) {
    console.error("Invalid or empty array returned by loader");
  }
  return docs;
};
