export const extractDay = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};

export const extractMonth = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const extractYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const extractTime = (dateString) => {
  const date = new Date(dateString);
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
