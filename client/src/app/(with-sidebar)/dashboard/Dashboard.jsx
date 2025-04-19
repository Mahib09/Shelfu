"use client";
import CardComponent from "@/components/app-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useManga } from "@/context/mangaContext";
import {
  Book,
  Clipboard,
  DollarSign,
  MonitorCheck,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { motion } from "motion/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { collection, fetchUserCollection } = useManga();

  const getTotalOwnedVolumes = () => {
    console.log(collection);
    if (collection.length === 0) {
      return {
        total: 0,
        change: 0,
      };
    }
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

    return {
      total: totalOwned,
      change: currentMonthOwned,
    };
  };
  const getTotalMangaSeries = () => {
    if (collection.length === 0) {
      return {
        total: 0,
        change: 0,
      };
    }
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
      change: seriesChange > 0 ? seriesChange : 0,
    };
  };
  const getVolumesToBuy = () => {
    if (collection.length === 0) {
      return {
        total: 0,
        change: 0,
      };
    }
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

    let toBuyChange = currentMonthToBuy - previousMonthToBuy;
    if (toBuyChange < 0) {
      toBuyChange = 0;
    }
    return {
      total: totalToBuy,
      change: toBuyChange,
    };
  };
  const getVolumesForSale = () => {
    if (collection.length === 0) {
      return {
        total: 0,
        change: 0,
      };
    }
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

    let forSaleChange = currentMonthForSale - previousMonthForSale;
    if (forSaleChange < 0) {
      forSaleChange = 0;
    }
    return {
      total: totalForSale,
      change: forSaleChange,
    };
  };
  const getRecentAddition = () => {
    if (collection.length === 0) {
      return []; // or you can return a default value like an empty object or message
    }
    // Sort the collection based on the createdAt date
    const sortedCollection = collection.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Get the most recent 30 items
    const recentAdditions = sortedCollection.slice(0, 10);

    // Map over the items added this month to format them
    const formattedRecentAdditions = recentAdditions.map((item) => {
      const createdAt = new Date(item.createdAt);
      const date = createdAt.getDate();
      const month = createdAt.toLocaleString("default", { month: "short" }); // Get the abbreviated month name
      const year = createdAt.getFullYear(); // Get the year

      return {
        userCollectionId: item.userCollectionId,
        title: item.volume.seriesName,
        volumeNumber: item.volume.volumeNumber,
        author: item.volume.author,
        image: item.volume.coverImageUrl,
        addedDate: `${month} ${date}, ${year}`, // Format: "Mar 6, 2025"
      };
    });

    return formattedRecentAdditions;
  };

  const getLastSixMonths = () => {
    const months = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get current month and previous 5 months
    const currentMonth = new Date().getMonth(); // Current month index (0-11)
    for (let i = 0; i < 6; i++) {
      months.push(monthNames[(currentMonth - i + 12) % 12]);
    }

    return months.reverse(); // To ensure they are from 6 months ago to now
  };
  const prepareData = (year) => {
    const lastSixMonths = getLastSixMonths();
    const grouped = {};
    if (collection.length === 0) {
      return lastSixMonths.map((month) => ({
        month,
        volumesOwned: 0,
      }));
    }

    collection.forEach((entry) => {
      const createdAt = new Date(entry.createdAt);
      const month = createdAt.toLocaleString("default", { month: "short" });
      const entryYear = createdAt.getFullYear();

      if (entryYear === year && entry.status === "Owned") {
        if (grouped[month]) {
          grouped[month]++;
        } else {
          grouped[month] = 1;
        }
      }
    });

    // Create data with 0 for months without data, but only for the last 6 months
    const chartData = lastSixMonths.map((month) => ({
      month,
      volumesOwned: grouped[month] || 0,
    }));

    return chartData;
  };
  const calculatePercentageIncrease = (data) => {
    if (collection.length === 0) {
      return 0;
    }

    const ownedCollection = collection.filter(
      (entry) => entry.status === "Owned"
    );

    // Get the total owned volumes added this month (from data)
    const volumesAddedThisMonth = data[data.length - 1].volumesOwned; // Last month's volumes owned

    // Get the total owned volumes in the collection before this month
    const ownedCollectionBeforeThisMonth =
      ownedCollection.length - volumesAddedThisMonth;

    // If no volumes were added, return 0%
    if (ownedCollectionBeforeThisMonth === 0) return 100;

    // Calculate the percentage increase based on the owned volumes added this month
    const percentageIncrease =
      (volumesAddedThisMonth / ownedCollectionBeforeThisMonth) * 100;

    return percentageIncrease;
  };

  const totalOwned = getTotalOwnedVolumes();
  const totalSeries = getTotalMangaSeries();
  const volumesToBuy = getVolumesToBuy();
  const volumesForSale = getVolumesForSale();
  const recentAddition = getRecentAddition();
  const currentYear = new Date().getFullYear();
  const chartData = prepareData(currentYear);

  const overallPercentageIncrease = calculatePercentageIncrease(
    chartData,
    collection
  );
  const chartConfig = {
    volumesOwned: {
      label: "Volumes Added: ",
      color: "hsl(var(--chart-neutral))",
    },
  };
  const listVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };
  return (
    <div className="content-container flex flex-col gap-5 b border-t-0">
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
          } volumes to collection this month`}
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
          } new series this month`}
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
          } volumes to buy this month`}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Volumes Owned</CardTitle>
            <CardDescription>January - March 2025</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="volumesOwned"
                    fill="currentColor"
                    className="fill-primary"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div>No data available for the last 6 months.</div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by {overallPercentageIncrease}% this month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total volumes added over the last 6 months
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-4 xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Addition</CardTitle>
            <CardDescription>
              You added {totalOwned.change} Volumes to your collection this
              month
            </CardDescription>
            <CardContent className="p-0">
              <ScrollArea className="h-96 lg:h-[27rem]">
                {recentAddition.map((item, index) => (
                  <motion.div
                    className=" flex  gap-4 items-center p-2"
                    key={item.userCollectionId}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <Image
                      src={item.image}
                      width={40}
                      height={50}
                      alt="cover"
                      className="rounded-md"
                    />
                    <div className="flex justify-center flex-col">
                      <p className="text-md font-medium line-clamp-1">
                        {`${item.title} Volume ${item.volumeNumber}`}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.author}
                      </p>
                    </div>
                    <p className="text-sm font-medium ml-auto line-clamp-1">
                      {item.addedDate}
                    </p>
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
