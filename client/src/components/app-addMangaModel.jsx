"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useManga } from "@/context/mangaContext";
import { toast } from "sonner";
import { useSidebar } from "./ui/sidebar";

const AddMangaModal = ({ volumeInfo, userId, onClose }) => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Owned"); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addMangaToCollection } = useManga();
  const { open, isMobile } = useSidebar();

  // Close modal function
  const closeModal = () => {
    setNote("");
    setStatus("Owned"); // Reset the status to default
    onClose(); // Close the modal
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const bodyInfo = {
      userId: userId,
      isbn: volumeInfo.isbn,
      status: status,
      notes: note,
      volumeInfo,
    };

    const response = await addMangaToCollection(bodyInfo);
    // Check if the response is successful
    if (response) {
      toast("Manga successfully added to your collection");
    } else {
      toast("Error adding Manga to your collection");
    }
    closeModal();
  };

  return (
    <div className="absolute flex items-center justify-center w-full top-0 left-0 h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`border ${
            open && !isMobile ? "ml-32" : ""
          } flex flex-col gap-3 p-5 w-[350px] md:w-[500px] bg-muted rounded-lg absolute left-1/2 transform -translate-x-1/2`}
        >
          <h2 className="font-medium text-lg">Add Manga to Your Collection</h2>
          {error && <p className="text-destructive">{error}</p>}{" "}
          {/* Display error */}
          <form
            onSubmit={handleModalSubmit}
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
                <option value="Want_To_Buy">Want To Buy</option>
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
