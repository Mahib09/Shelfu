import { Label } from "recharts";
const monthRef = (offset = 0) => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + offset, 1);
};

const isSameMonth = (d, ref) =>
  d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();

const countByStatusInMonth = (collection, status, ref) =>
  collection.reduce((acc, entry) => {
    if (entry.status !== status) return acc;
    const createdAt = new Date(entry.createdAt);
    return acc + (isSameMonth(createdAt, ref) ? 1 : 0);
  }, 0);

const totalByStatus = (collection, status) =>
  collection.reduce((acc, entry) => acc + (entry.status === status ? 1 : 0), 0);

export const getTotalOwnedVolumes = ({ collection }) => {
  const total = totalByStatus(collection, "Owned");
  const change = countByStatusInMonth(collection, "Owned", monthRef(0)); // added this month

  return { total, change };
};

export const getTotalMangaSeries = ({ collection }) => {
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
export const getVolumesToBuy = ({ collection }) => {
  const total = totalByStatus(collection, "Want_To_Buy");

  const current = countByStatusInMonth(collection, "Want_To_Buy", monthRef(0));
  const prev = countByStatusInMonth(collection, "Want_To_Buy", monthRef(-1));

  return { total, change: Math.max(0, current - prev) };
};

export const getVolumesForSale = ({ collection }) => {
  const total = totalByStatus(collection, "For_Sale");

  const current = countByStatusInMonth(collection, "For_Sale", monthRef(0));
  const prev = countByStatusInMonth(collection, "For_Sale", monthRef(-1));

  return { total, change: Math.max(0, current - prev) };
};

export const getRecentAddition = ({ collection }) => {
  if (!collection.length) return [];

  const sorted = [...collection].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return sorted.slice(0, 10).map((item) => {
    const createdAt = new Date(item.createdAt);
    const date = createdAt.getDate();
    const month = createdAt.toLocaleString("en-US", { month: "short" });
    const year = createdAt.getFullYear();

    return {
      userCollectionId: item.userCollectionId,
      title: item.volume.seriesName,
      volumeNumber: item.volume.volumeNumber,
      author: item.volume.author,
      image: item.volume.coverImageUrl,
      addedDate: `${month} ${date}, ${year}`,
    };
  });
};

const getLastSixMonths = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      label: d.toLocaleString("en-US", { month: "short" }),
    });
  }

  return months;
};

export const prepareData = ({ collection }) => {
  const lastSixMonths = getLastSixMonths();
  const grouped = {};

  for (const entry of collection) {
    if (entry.status !== "Owned") continue;
    const d = new Date(entry.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    grouped[key] = (grouped[key] || 0) + 1;
  }

  const chartData = lastSixMonths.map(({ year, monthIndex, label }) => ({
    month: label,
    volumesOwned: grouped[`${year}-${monthIndex}`] || 0,
  }));

  return { chartData, lastSixMonths };
};

export const calculatePercentageIncrease = ({ data, collection }) => {
  const ownedCount =
    collection?.filter((e) => e.status === "Owned").length ?? 0;
  if (ownedCount === 0) return "0.00";
  if (!data?.length) return "0.00";

  const addedThisMonth = data[data.length - 1]?.volumesOwned ?? 0;
  const beforeThisMonth = ownedCount - addedThisMonth;

  // Nothing added this month
  if (addedThisMonth === 0) return "0.00";

  // All owned volumes were added this month (no baseline)
  // UX choice: show 100% instead of Infinity.
  if (beforeThisMonth <= 0) return "100.00";

  return ((addedThisMonth / beforeThisMonth) * 100).toFixed(2);
};
