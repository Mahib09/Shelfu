export const getTotalOwnedVolumes = ({ collection }) => {
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
      createdAt.getMonth() === new Date().getMonth() && entry.status === "Owned"
    );
  }).length;

  return {
    total: totalOwned,
    change: currentMonthOwned,
  };
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
export const getVolumesForSale = ({ collection }) => {
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
export const getRecentAddition = ({ collection }) => {
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
export const prepareData = ({ year, collection }) => {
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
export const calculatePercentageIncrease = ({ data, collection }) => {
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

  return percentageIncrease.toFixed(2);
};
