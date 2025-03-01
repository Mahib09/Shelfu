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

const SheetComponent = ({ item, children }) => {
  // Internal state for status and note
  const [status, setStatus] = useState(item.status || "Owned");
  const [note, setNote] = useState(item.notes || "");

  return (
    <Sheet key={item.userCollectionId}>
      <SheetTrigger asChild>
        <div className="cursor-pointer">{children}</div>
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
                  className="rounded-md"
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

        <div className="flex flex-col gap-3 mt-5 justify-center">
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
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <div className="flex flex-col">
              <Button type="submit">Save changes</Button>
              <AlertDai>
                <Button variant="destructive" className="m-3">
                  Delete Volume
                </Button>
              </AlertDai>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
