export const translateSchedule = (scheduleData) => {
  // Map of numeric day values to their corresponding day names.
  const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
  };

  // Array to store the translated schedule.
  const translatedSchedule = [];

  // Check if scheduleData is an array before iterating through it.
  if (Array.isArray(scheduleData)) {
    // Iterate through each day in the raw schedule data.
    scheduleData.forEach((daySchedule) => {
      // Get the corresponding day name from the map.
      const dayOfWeek = daysOfWeek[daySchedule.day];
      // Create an object with the day property initialized.
      const dayObject = { day: dayOfWeek };

      // Iterate through each period (morning, afternoon, etc.) in the day's schedule.
      daySchedule.periods.forEach((period) => {
        // Extract the time of day (morning, afternoon, etc.).
        const timeOfDay = Object.keys(period)[0];
        // Extract the start and end times for the period.
        const startTime = period[timeOfDay].start;
        const endTime = period[timeOfDay].end;

        // Add a property to the day object for the current time of day with its time range.
        dayObject[timeOfDay] = `${startTime} - ${endTime}`;
      });

      // Add the completed day object to the translated schedule array.
      translatedSchedule.push(dayObject);
    });
  }

  // Return the final translated schedule array.
  return translatedSchedule;
};
