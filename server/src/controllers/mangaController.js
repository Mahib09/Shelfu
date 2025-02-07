const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

const fetchFromApi = async (query) => {
  try {
    const booksUrl = `https://openlibrary.org/search.json?q=${query} vol`;

    const response = await axios.get(booksUrl);
    const books = response.data.docs; // Extract book list

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
        ];

        // Check if title has a volume number (e.g., "Vol. 1" or "Volume 2")
        const volumeRegex = /(vol\.?\s?|volume\s?)(\d+)/i;
        const hasVolumeNumber = volumeRegex.test(title);

        // Strictly remove books if title contains unwanted keywords
        const containsUnwantedKeyword = unwantedKeywords.some((keyword) =>
          title.includes(keyword)
        );

        // Exclude books with unwanted keywords and non-English editions
        return (
          hasVolumeNumber &&
          !containsUnwantedKeyword &&
          !language.includes("jpn")
        );
      })
      .map((book) => {
        // Extract volume number
        const title = book.title;
        const volumeMatch = title.match(/(vol\.?\s?|volume\s?)(\d+)/i);
        const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;

        return {
          title: book.title,
          author: book.author_name?.join(", ") || "Unknown",
          coverImageUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          booksApiId: book.key,
          description: book.first_sentence || "No description available",
          publisher: book.publisher?.join(", ") || "Unknown",
          volumeNumber: volumeNumber, // Store volume number
        };
      })
      .sort((a, b) => a.volumeNumber - b.volumeNumber); // Numeric sorting of volumes

    return formattedResults;
  } catch (error) {
    return [];
  }
};

const getSearchResults = async (req, res) => {
  try {
    const searchQuery = req.query.query;
    const results = await prisma.manga.findMany({
      where: {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });
    if (results.length > 0) {
      return res.json(results);
    }
    const formattedBooksApiResults = await fetchFromApi(searchQuery);
    return res.json(formattedBooksApiResults);

    return res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getSearchResults };
