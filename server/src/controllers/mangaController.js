const { Request, Response } = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

const fetchFromApi = async (query) => {
  try {
    const booksUrl = `https://openlibrary.org/search.json?q=${query}`;

    const response = await axios.get(booksUrl);
    const books = response.data.docs; // Extract book list

    if (!books || books.length === 0) {
      return []; // Return empty if no results
    }

    const formattedResults = books
      .map((book) => {
        const title = book.title.toLowerCase();
        const volumeRegex = /(vol\.?\s?|volume\s?)(\d+)/i;
        const volumeMatch = title.match(volumeRegex);
        const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;

        return volumeNumber
          ? {
              title: book.title,
              author: book.author_name?.join(", ") || "Unknown",
              coverImageUrl: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : null,
              booksApiId: book.key, // Unique ID from Open Library
              description: book.first_sentence
                ? book.first_sentence[0]
                : "No description available",
              publisher: book.publisher?.[0] || "Unknown",
              volumeNumber: volumeNumber, // Store extracted volume number
            }
          : null;
      })
      .filter((book) => book !== null) // Remove books without volume number
      .sort((a, b) => a.volumeNumber - b.volumeNumber); // Sort by volume number

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
