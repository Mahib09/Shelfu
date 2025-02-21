const { Request, Response } = require("express");
const prisma = require("../services/prismaService");
const axios = require("axios");
require("dotenv").config();

const fetchFromApi = async (query, res) => {
  try {
    const booksUrl = `https://openlibrary.org/search.json?q=${query}
    // `;

    const response = await axios.get(booksUrl);
    const books = response.data.docs;

    if (!books || books.length === 0) {
      return []; // Return empty if no results
    }

    const formattedResults = response.data.docs
      .filter((book) => {
        const title = book.title.toLowerCase();
        const language = book.language || [];

        // Keywords to filter out unwanted books
        const unwantedKeywords = [
          "coloring book",
          "art book",
          "illustrations",
          "sketch",
          "light novel",
          "guidebook",
          "fanbook",
          "concept art",
          "compendium",
          "encyclopedia",
          "animation book",
          "how to",
          "japanese",
          "chinese",
          "french",
          "novel",
          "By",
          "le",
        ];

        // Check if title has a volume number (e.g., "Vol. 1" or "Volume 2")
        const volumeRegex = /(vol\.?\s*|\bvolume\s*)?(\d+)$/i;
        const hasVolumeNumber = volumeRegex.test(title);

        // Strictly remove books if title contains unwanted keywords
        const containsUnwantedKeyword = unwantedKeywords.some((keyword) =>
          title.includes(keyword)
        );

        // Exclude books with unwanted keywords and non-English editions
        return (
          (hasVolumeNumber &&
            !containsUnwantedKeyword &&
            language.includes("eng")) ||
          language.includes("jpn")
        );
      })
      .map((book) => {
        // Extract volume number
        const title = book.title;
        const volumeMatch = title.match(/(vol\.?\s*|\bvolume\s*)?(\d+)$/i);
        const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;

        return {
          title: book.title,
          author: book.author_name?.join("") || "Unknown",
          coverImageUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          booksApiId: book.key,
          description: book.first_sentence || "No description available",
          publisher: book.publisher ? book.publisher?.join(", ") : "Unknown", // Join publishers if it's an array
          volumeNumber: volumeNumber, // Store volume number
        };
      })
      .sort((a, b) => a.volumeNumber - b.volumeNumber); // Numeric sorting of volumes

    return formattedResults; // Return the formatted results to the response
  } catch (error) {
    return []; // Return error status in case of failure
  }
};

const getSearchResults = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const formattedBooksApiResults = await fetchFromApi(searchQuery);
    return res.status(200).json(formattedBooksApiResults);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const checkIfVolumeExists = async (bookId) => {
  return await prisma.volumes.findUnique({
    where: {
      booksApiId: bookId,
    },
  });
};

const getMangaDetails = async (req, res) => {
  try {
    const { bookId } = req.params;

    const volumeExists = await checkIfVolumeExists(bookId);

    if (volumeExists) {
      res.status(200).json(volumeExists);
    } else {
      const booksUrl = `https://openlibrary.org/works/${bookId}.json`;
      const response = await axios.get(booksUrl);
      const book = response.data;

      const title = book.title || "Unknown";
      let authorName = "Unknown";
      const authorKey = book.authors?.[0]?.author?.key;
      if (authorKey) {
        try {
          const authorResponse = await axios.get(
            `https://openlibrary.org${authorKey}.json`
          );
          authorName = authorResponse.data.name || "Unknown";
        } catch (error) {
          console.error("Error fetching author details:", error.message);
        }
      }
      // Extract volume number (e.g., "Naruto, Vol. 1" → 1)
      const volumeMatch = title.match(/(vol\.?\s?|volume\s?)(\d+)/i);
      const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;
      const responseDetails = {
        title: title,
        author: authorName, // Open Library authors are objects
        coverImageUrl: book.covers
          ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
          : null,
        booksApiId: book.key,
        description: book.description?.value || "No description available", // Description is often an object
        publisher: book.publishers?.[0] || "Unknown", // Open Library uses "publishers"
        volumeNumber: volumeNumber,
      };
      res.status(200).json(responseDetails);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(400).json({ message: "Manga not Found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getSearchResults, getMangaDetails };
