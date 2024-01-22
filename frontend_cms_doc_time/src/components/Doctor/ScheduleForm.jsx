import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ScheduleForm = ({ scheduleData, setScheduleData }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleCheckboxChange = (index) => {
    const updatedSelectedDays = [...selectedDays];
    if (updatedSelectedDays.includes(index)) {
      updatedSelectedDays.splice(updatedSelectedDays.indexOf(index), 1);
    } else {
      updatedSelectedDays.push(index);
    }

    return setSelectedDays(updatedSelectedDays);
  };

  const handleTimeChange = (index, period, type, value) => {
    const updatedScheduleData = [...scheduleData];
    const existingEntryIndex = updatedScheduleData.findIndex(
      (entry) => entry.day === index + 1
    );

    if (existingEntryIndex !== -1) {
      // Day already exists, update the periods
      const existingPeriodIndex = updatedScheduleData[
        existingEntryIndex
        // eslint-disable-next-line no-prototype-builtins
      ].periods.findIndex((p) => p.hasOwnProperty(period));

      if (existingPeriodIndex !== -1) {
        // Period already exists, update the specific type
        updatedScheduleData[existingEntryIndex].periods[existingPeriodIndex][
          period
        ][type] = value;
      } else {
        // Period doesn't exist, create a new one
        updatedScheduleData[existingEntryIndex].periods.push({
          [period]: { [type]: value },
        });
      }
    } else {
      // Day doesn't exist, create a new entry
      updatedScheduleData.push({
        day: index + 1,
        periods: [
          {
            [period]: { [type]: value },
          },
        ],
      });
    }

    // Update the state with the modified data
    return setScheduleData(updatedScheduleData);
  };

  useEffect(() => {
    // Log the updated scheduleData when it changes
    // console.log("-------scheduleData------", scheduleData);
    // console.log("-----selectedDays--------", selectedDays);
  }, [scheduleData, selectedDays]);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold  text-gray-500 pb-4">Select the Days</h3>
      <div className="flex flex-col">
        {weekDays.map((day, index) => (
          <div key={index + 1} className="form-control">
            <label className="cursor-pointer label">
              <span
                className={`label-text text-l font-bold ${
                  selectedDays.includes(index) ? "text-primary" : ""
                }`}
              >
                {day}
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                value={index + 1}
                onChange={() => handleCheckboxChange(index)}
              />
            </label>

            {selectedDays.includes(index) && (
              <ul className="p-4 flex flex-col justify-center items-center rounded-xl border border-primary pb-8">
                <li key="morning">
                  <div className="">
                    <h4 className="p-2 font-bold text-center">Mornings:</h4>
                    <div className="flex">
                      <input
                        name={`morning_start_${index + 1}`}
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
                      <p className="px-4 font-bold">to</p>
                      <input
                        name={`morning_end_${index + 1}`}
                        type="time"
                        onChange={(e) =>
                          handleTimeChange(
                            index,
                            "morning",
                            "end",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </li>
                <li key="afternoon">
                  <div>
                    <h4 className="p-2 font-bold text-center">Afternoon:</h4>
                    <div className="flex">
                      <input
                        name={`afternoon_start_${index + 1}`}
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
                      <p className="px-4 font-bold">to</p>
                      <input
                        name={`afternoon_end_${index + 1}`}
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
                  </div>
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleForm;
