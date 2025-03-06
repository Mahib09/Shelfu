"use client";

import CardComponent from "@/components/app-card";

import { useManga } from "@/context/mangaContext";
import {
  Book,
  Clipboard,
  DollarSign,
  MonitorCheck,
  ShoppingCart,
} from "lucide-react";

export default function Dashboard() {
  const { collection } = useManga();
  const getTotalOwnedVolumes = (collection) => {
    const totalOwned = collection.filter(
      (entry) => entry.status === "Owned"
    ).length;

    const currentMonthOwned = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() &&
        entry.status === "Owned"
      );
    }).length;

    const previousMonthOwned = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() - 1 &&
        entry.status === "Owned"
      );
    }).length;

    const volumeChange = currentMonthOwned - previousMonthOwned;

    return {
      total: totalOwned,
      change: volumeChange,
    };
  };
  const getTotalMangaSeries = (collection) => {
    const totalSeries = [
      ...new Set(
        collection
          .filter((entry) => entry.status === "Owned")
          .map((entry) => entry.volume.seriesName)
      ),
    ].length;

    const currentMonthSeries = [
      ...new Set(
        collection
          .filter((entry) => {
            const createdAt = new Date(entry.createdAt);
            return (
              createdAt.getMonth() === new Date().getMonth() &&
              entry.status === "Owned"
            );
          })
          .map((entry) => entry.volume.seriesName)
      ),
    ].length;

    const previousMonthSeries = [
      ...new Set(
        collection
          .filter((entry) => {
            const createdAt = new Date(entry.createdAt);
            return (
              createdAt.getMonth() === new Date().getMonth() - 1 &&
              entry.status === "Owned"
            );
          })
          .map((entry) => entry.volume.seriesName)
      ),
    ].length;

    const seriesChange = currentMonthSeries - previousMonthSeries;

    return {
      total: totalSeries,
      change: seriesChange,
    };
  };
  const getVolumesToBuy = (collection) => {
    const totalToBuy = collection.filter(
      (entry) => entry.status === "Want_To_Buy"
    ).length;

    const currentMonthToBuy = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() &&
        entry.status === "Want_To_Buy"
      );
    }).length;

    const previousMonthToBuy = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() - 1 &&
        entry.status === "Want_To_Buy"
      );
    }).length;

    const toBuyChange = currentMonthToBuy - previousMonthToBuy;

    return {
      total: totalToBuy,
      change: toBuyChange,
    };
  };
  const getVolumesForSale = (collection) => {
    const totalForSale = collection.filter(
      (entry) => entry.status === "For_Sale"
    ).length;

    const currentMonthForSale = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() &&
        entry.status === "For_Sale"
      );
    }).length;

    const previousMonthForSale = collection.filter((entry) => {
      const createdAt = new Date(entry.createdAt);
      return (
        createdAt.getMonth() === new Date().getMonth() - 1 &&
        entry.status === "For_Sale"
      );
    }).length;

    const forSaleChange = currentMonthForSale - previousMonthForSale;

    return {
      total: totalForSale,
      change: forSaleChange,
    };
  };

  const totalOwned = getTotalOwnedVolumes(collection);
  const totalSeries = getTotalMangaSeries(collection);
  const volumesToBuy = getVolumesToBuy(collection);
  const volumesForSale = getVolumesForSale(collection);

  return (
    <div className="p-4 pt-2 flex flex-col gap-5">
      <h2 className="font-bold text-2xl md:text-3xl">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <CardComponent
          Icon={
            <Book className="text-muted-foreground" size={20} strokeWidth={1} />
          }
          Title="Total Volumes Owned"
          data={totalOwned.total}
          comparisondata={`${totalOwned.change >= 0 ? "+" : ""}${
            totalOwned.change
          } volumes added to collection this month`}
        />
        <CardComponent
          Icon={
            <Clipboard
              className="text-muted-foreground"
              size={20}
              strokeWidth={1}
            />
          }
          Title="Total Manga Series"
          data={totalSeries.total}
          comparisondata={`${totalSeries.change >= 0 ? "+" : ""}${
            totalSeries.change
          } new series added this month`}
        />
        <CardComponent
          Icon={
            <ShoppingCart
              className="text-muted-foreground"
              size={20}
              strokeWidth={1}
            />
          }
          Title="Volumes to Buy"
          data={volumesToBuy.total}
          comparisondata={`${volumesToBuy.change >= 0 ? "+" : ""}${
            volumesToBuy.change
          } volumes added to buy this month`}
        />
        <CardComponent
          Icon={
            <DollarSign
              className="text-muted-foreground"
              size={20}
              strokeWidth={1}
            />
          }
          Title="Volumes For Sale"
          data={volumesForSale.total}
          comparisondata={`${volumesForSale.change >= 0 ? "+" : ""}${
            volumesForSale.change
          } volumes added for sale this month`}
        />
      </div>
    </div>
  );
}
