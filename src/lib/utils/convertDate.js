export const convertDate = (data, separator = "-") => {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const parts = formattedDate.split(" ");
  const result = `${parts[0]}${separator}${parts[1]}${separator}${parts[2]}`;
  return result;
};

export const converDateRange = (data) => {
  const dateArr = data?.split(",");
  const dateStart = new Date(dateArr[0]);
  const dateEnd = new Date(dateArr[1]);
  const formattedDateStart = dateStart?.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedDateEnd = dateEnd?.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const result = `${formattedDateStart} - ${formattedDateEnd}`;

  return result;
};

export const convertToTime = (data) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const separator = ":";
  const parts = formattedDate.split(".");
  const result = `${parts[0]}${separator}${parts[1]}`;

  return result;
};

export const convertToDateNumeric = (data) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });

  const separator = "-";
  const parts = formattedDate.split("/");
  const result = `${parts[0]}${separator}${parts[1]}${separator}${parts[2]}`;
  return result;
};

export function convertToTimestamp(strDate) {
  const datum = Date.parse(strDate);
  const formattedDate = new Date(datum);

  return formattedDate;
}

export const getDateFromString = (str) => {
  const dateFormat = new Date(str);
  const [date, time] = dateFormat.split(" ");
  // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
  str = `${date}T${time}.000Z`;
  return new Date(str);
};
