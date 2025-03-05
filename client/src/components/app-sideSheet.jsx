"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import { Button } from "./ui/button"; // Import your button component if needed
import Image from "next/image";
import AlertDai from "./app-alertDialog";
import { useManga } from "@/context/mangaContext";
import { toast } from "sonner";

const SheetComponent = ({ item, children }) => {
  const [status, setStatus] = useState(item.status || "Owned");
  const [note, setNote] = useState(item.notes || "");
  const [isOpen, setIsOpen] = useState(false);
  const { updateMangaStatusOrNote, deleteMangaFromCollection } = useManga();

  const handleSubmit = async () => {
    const bodyInfo = {
      status: status,
      notes: note,
    };
    const response = await updateMangaStatusOrNote(
      bodyInfo,
      item.userCollectionId
    );
    if (response) {
      toast("Updated Sucessfully");
      setStatus(item.status);
      setNote("");
      setIsOpen(false);
    } else {
      toast("Error Updating");
    }
  };
  const handleDelete = async () => {
    const response = await deleteMangaFromCollection(item.userCollectionId);
    if (response.status === 200) {
      toast("Deleted Succesfully");
      setStatus(item.status);
      setNote("");
      setIsOpen(false);
    } else {
      toast("Error Deleting");
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} key={item.userCollectionId}>
      <SheetTrigger asChild>
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-end gap-3">
              <div>
                <Image
                  src={item.volume.coverImageUrl}
                  alt="cover image"
                  width={100}
                  height={100}
                  className="rounded-md h-auto w-auto"
                />
              </div>
              <div className="flex flex-col">
                <span>
                  {item.volume.seriesName} Vol {item.volume.volumeNumber}
                </span>
                <span className="text-sm text-gray-500">
                  {item.volume.author}
                </span>
                <span className="text-sm text-gray-700">Status: {status}</span>
                <span className="text-sm">Note: {note}</span>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>
            <span className="line-clamp-6">{item.volume.description}</span>
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-5 justify-center"
        >
          <div className="flex gap-5 items-center justify-center">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="border p-1 w-full"
            >
              <option value="Owned">Owned</option>
              <option value="Want_To_Buy">Want To Buy</option>
              <option value="For_Sale">For Sale</option>
            </select>
          </div>

          <div className="flex gap-5 items-center justify-center mb-5">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border p-1 w-full"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <Button type="submit">Save changes</Button>
          </div>
        </form>

        <SheetFooter>
          <AlertDai
            onCloseSheet={() => setIsOpen(false)}
            handleDelete={handleDelete}
          >
            <Button variant="destructive" className="w-full mt-2">
              Delete Volume
            </Button>
          </AlertDai>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
