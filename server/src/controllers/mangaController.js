const { Request, Response } = require("express");
const prisma = require("../services/prismaService");
const axios = require("axios");

const fetchFromApi = async (query, res) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: process.env.ISBNDB_API_KEY,
    };
    const booksUrl = `https://api2.isbndb.com/books/${query}`;

    const response = await axios.get(booksUrl, {
      headers: headers,
    });
    const books = response.data.books;
    if (!books || books.length === 0) {
      return []; // Return empty if no results
    }

    const formattedResults = books
      .filter((book) => {
        const title = book.title.toLowerCase();
        const language = book.language;

        const unwantedKeywords = [
          "coloring book",
          "art book",
          "illustrations",
          "sketch",
          "guidebook",
          "fanbook",
          "concept art",
          "compendium",
          "encyclopedia",
          "animation book",
          "how to",
          "chinese",
          "french",
          "collection set",
        ];

        const volumeRegex = /(vol\.?\s*|\bvolume\s*|\bvol\s*)(\d+)/i;
        const hasVolumeNumber = volumeRegex.test(title);

        const containsUnwantedKeyword = unwantedKeywords.some((keyword) =>
          title.includes(keyword)
        );

        return (
          hasVolumeNumber && !containsUnwantedKeyword && language.includes("en")
        );
      })
      .map((book) => {
        const title = book.title;
        const volumeMatch = title.match(
          /(vol\.?\s*|\bvolume\s*|\bvol\s*)(\d+)/i
        );
        const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;

        const seriesTitle = title
          .replace(/(vol\.?\s*\d+|\bvolume\s*\d+)/i, "")
          .trim(); // Normalize series title

        return {
          seriesTitle,
          title: book.title,
          volumeNumber,
          author: book.authors,
          booksApiId: book.isbn,
          description: book.synopsis || "No description available",
          publisher: book.publisher,
          isbn: book.isbn,
          releaseDate: book.date_published,
          image: book.image || "https://default-image-url.com",
        };
      })
      .reduce((uniqueBooks, book) => {
        const key = `${book.seriesTitle.toLowerCase()}-vol-${
          book.volumeNumber
        }`;

        if (!uniqueBooks.has(key)) {
          uniqueBooks.set(key, book);
        }

        return uniqueBooks;
      }, new Map());

    const uniqueFormattedResults = Array.from(formattedResults.values()).sort(
      (a, b) =>
        a.seriesTitle.localeCompare(b.seriesTitle) ||
        a.volumeNumber - b.volumeNumber
    );

    return uniqueFormattedResults;
  } catch (error) {
    console.log(error);
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
const checkIfVolumeExists = async (isbn) => {
  return await prisma.volumes.findUnique({
    where: {
      isbn: isbn,
    },
  });
};

const getMangaDetails = async (req, res) => {
  try {
    const { isbn } = req.params;

    const volumeExists = await checkIfVolumeExists(isbn);

    if (volumeExists) {
      res.status(200).json(volumeExists);
    } else {
      const booksUrl = `https://api2.isbndb.com/books/${isbn}`;
      const response = await axios.get(booksUrl);
      const book = response.data.books[0];

      const title = book.title || "Unknown";
      let author = book.author;
      const volumeMatch = title.match(/(vol\.?\s*|\bvolume\s*|\bvol\s*)(\d+)/i);
      const volumeNumber = volumeMatch ? parseInt(volumeMatch[2], 10) : null;
      const responseDetails = {
        title: title,
        volumeNumber: volumeNumber,
        author: author,
        image: book.image,
        booksApiId: book.isbn,
        description: book.synopsis || "No description available", // Description is often an object
        publisher: book.publisher || "Unknown",
        isbn: book.isbn,
        releaseDate: book.date_published,
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
