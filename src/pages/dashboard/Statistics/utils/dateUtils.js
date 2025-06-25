export const getMonthRange = (monthsAgo = 0) => {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth() - monthsAgo,
    1,
    0,
    0,
    0
  );
  const end = new Date(
    now.getFullYear(),
    now.getMonth() - monthsAgo + 1,
    0,
    23,
    59,
    59
  );
  return {
    startDate: start.toISOString().slice(0, 19).replace("T", " "),
    endDate: end.toISOString().slice(0, 19).replace("T", " "),
    label: start.toLocaleString("default", { month: "short", year: "numeric" }),
  };
};

export const getLastNMonthsRanges = (n) => {
  return Array.from({ length: n }, (_, i) => getMonthRange(n - i - 1));
};
