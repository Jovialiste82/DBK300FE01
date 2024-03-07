// frontend/config/convertDate.js
export const convertDateFromUglyToNice = (uglyDate) => {
  // Check if the format is "YYYY"
  if (/^\d{4}$/.test(uglyDate)) {
    return uglyDate;
  }

  // Check if the format is "MM-DD"
  if (/^\d{2}-\d{2}$/.test(uglyDate)) {
    const [month, day] = uglyDate.split("-").map(Number);
    const date = new Date(2000, month - 1, day); // Year 2000 is a placeholder
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
    }).format(date);
  }

  // If the format is "YYYY-MM-DD"
  const [year, month, day] = uglyDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const convertDateFromNiceToUgly = (niceDate) => {
  // Directly return if the format is "YYYY"
  if (/^\d{4}$/.test(niceDate)) {
    return niceDate;
  }

  // Parse "4 MARCH 2004" or "4 MARCH" format
  const parts = niceDate.split(" ");
  if (parts.length === 3) {
    // "4 MARCH 2004"
    const [day, month, year] = parts;
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toISOString().substring(0, 10);
  } else if (parts.length === 2) {
    // "4 MARCH"
    const [day, month] = parts;
    const date = new Date(`${month} ${day}, 2000`); // Year 2000 as placeholder
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }
};
