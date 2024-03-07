export const getPostHeader = (date, username) => {
  // Extracting username from the user object
  const newUsername = username || "Unknown";

  // Parsing the date string to create a Date object
  const postDate = new Date(date);

  // Array of month names to use for formatting
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extracting date, month, year, hours, and minutes from the post date
  const day = postDate.getDate();
  const month = monthNames[postDate.getMonth()];
  const year = postDate.getFullYear();
  let hours = postDate.getHours();
  const minutes = postDate.getMinutes();
  let period = "AM";

  // Convert hours to 12-hour format and determine the period (AM/PM)
  if (hours > 12) {
    hours -= 12;
    period = "PM";
  }

  // Pad single-digit minutes with leading zero
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Constructing the final header string
  const header = `By ${newUsername} on ${month} ${day}, ${year} at ${hours}:${formattedMinutes} ${period}`;

  return header;
};

// Example usage:
// const date = "2024-02-09T12:00:00Z"; // Example date string
// const user = { username: "John" }; // Example user object

// const postHeader = getPostHeader(date, user);
// console.log(postHeader); // Output: By John on February 9, 2024 at 12:00 PM
