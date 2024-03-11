export const styles = (value) => {
  return {
    placeholder: (base) => ({
      ...base,
      paddingLeft: "2px",
      color: value ? "#666666 !important" : "#bdbdbd !important",
    }),
  };
};
