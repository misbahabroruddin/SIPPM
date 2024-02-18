export const convertDate = (data) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const separator = "-";
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
