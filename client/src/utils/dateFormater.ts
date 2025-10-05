function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const month = date.toLocaleString("default", { month: "short" }); // "Feb"
  const year = date.getFullYear();

  return `${ordinal(day)} ${month} ${year}`;
}

export default formatDate