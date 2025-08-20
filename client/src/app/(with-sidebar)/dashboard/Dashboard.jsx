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
import {
  calculatePercentageIncrease,
  getRecentAddition,
  getTotalMangaSeries,
  getTotalOwnedVolumes,
  getVolumesForSale,
  getVolumesToBuy,
  prepareData,
} from "@/lib/dashboard";

const Dashboard = () => {
  const { collection, fetchUserCollection } = useManga();

  const totalOwned = getTotalOwnedVolumes({ collection });
  const totalSeries = getTotalMangaSeries({ collection });
  const volumesToBuy = getVolumesToBuy({ collection });
  const volumesForSale = getVolumesForSale({ collection });
  const recentAddition = getRecentAddition({ collection });
  const currentYear = new Date().getFullYear();
  const chartData = prepareData({ year: currentYear, collection });

  const overallPercentageIncrease = calculatePercentageIncrease({
    data: chartData,
    collection,
  });
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
