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
