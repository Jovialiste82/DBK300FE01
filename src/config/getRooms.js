// frontend/src/config/getRooms.js
export const getRooms = (dob) => {
  // Parse the date of birth string
  const dateOfBirth = new Date(dob);

  // Get year, month, and day components from the date of birth
  const year = dateOfBirth.getFullYear();
  // Ensure month and day are in the correct format (MM and DD)
  const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, "0");
  const day = dateOfBirth.getDate().toString().padStart(2, "0");

  // Prepare room labels according to the specified formats
  const yearRoom = `${year}`; // "YYYY"
  const fullDateRoom = `${year}-${month}-${day}`; // "YYYY-MM-DD"
  const monthDayRoom = `${month}-${day}`; // "MM-DD"

  // Return the array of formatted strings
  return [yearRoom, fullDateRoom, monthDayRoom];
};
