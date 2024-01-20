import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ScheduleForm = ({ onSubmit }) => {
  const [schedule, setSchedule] = useState([
    {
      day: 1,
      periods: {
        morning_start: "",
        morning_end: "",
        afternoon_start: "",
        afternoon_end: "",
      },
    },
  ]);

  const weekDays = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

  // const handleTimeChange = (dayIndex, periodType, timeType, value) => {
  //   setSchedule((prevSchedule) => {
  //     const newPeriods = [...prevSchedule.periods];
  //     newPeriods[dayIndex] = {
  //       ...newPeriods[dayIndex],
  //       [`${periodType}_${timeType}`]: value,
  //     };
  //     return { ...prevSchedule, periods: newPeriods };
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(schedule);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Select the Days</h3>
      <div className="flex flex-col">
        {weekDays.map((day, index) => (
          <div key={index}>
            <h3 className="btn m-1">{day}</h3>
            <ul value={index + 1} tabIndex={0}>
              <li key="morning">
                <div>
                  <h4>Mornings:</h4>
                  <input
                    name={`morning_start_${index}`}
                    type="time"
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "morning",
                        "start",
                        e.target.value
                      )
                    }
                  />
                  to
                  <input
                    name={`morning_end_${index}`}
                    type="time"
                    onChange={(e) =>
                      handleTimeChange(index, "morning", "end", e.target.value)
                    }
                  />
                </div>
              </li>
              <li key="afternoon">
                <div>
                  <h4>Afternoon:</h4>
                  <input
                    name={`afternoon_start_${index}`}
                    type="time"
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "afternoon",
                        "start",
                        e.target.value
                      )
                    }
                  />
                  to
                  <input
                    name={`afternoon_end_${index}`}
                    type="time"
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "afternoon",
                        "end",
                        e.target.value
                      )
                    }
                  />
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <button type="submit">Save Schedule</button>
    </form>
  );
};

export default ScheduleForm;
