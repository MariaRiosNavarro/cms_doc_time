export function translateSchedule(scheduleData) {
  const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
  };

  const translatedSchedule = [];

  scheduleData.forEach((daySchedule) => {
    const dayOfWeek = daysOfWeek[daySchedule.day];
    const dayObject = { day: dayOfWeek };

    daySchedule.periods.forEach((period) => {
      const timeOfDay = Object.keys(period)[0]; // "morning", "afternoon", etc.
      const startTime = period[timeOfDay].start;
      const endTime = period[timeOfDay].end;

      dayObject[timeOfDay] = `${startTime} - ${endTime}`;
    });

    translatedSchedule.push(dayObject);
  });

  return translatedSchedule;
}
