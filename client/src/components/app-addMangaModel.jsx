"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

const AddMangaModal = ({ volumeData, userId, onClose }) => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Reading"); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit form and call API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mangaDetails = {
      userId: userId,
      isbn: volumeData.isbn,
      status: status,
      notes: note,
      volumeInfo: volumeData,
    };

    setLoading(true);
    setError("");

    try {
      const response = await addToCollectionAPI(mangaDetails);
      if (response.success) {
        alert("Manga added to collection!");
        onClose(); // Close the modal on success
      } else {
        setError("Failed to add manga to collection.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close modal function
  const closeModal = () => {
    setNote("");
    setStatus("Owned"); // Reset the status to default
    onClose(); // Close the modal
  };

  return (
    <div className="absolute flex items-center justify-center w-full top-0 left-0 h-screen">
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
        <div className="border m-auto flex flex-col gap-3 p-5 w-[500px] bg-white rounded-lg">
          <h2 className="font-medium text-lg">Add Manga to Your Collection</h2>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-2 justify-center "
          >
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="border p-1"
              >
                <option value="Owned">Owned</option>
                <option value="Want_To_Buy">Want_To_Buy</option>
                <option value="For_Sale">For_Sale</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border p-1"
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={closeModal} variant="destructive">
                Close
              </Button>
              <Button
                type="submit"
                className="border p-2 ml-auto"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMangaModal;
