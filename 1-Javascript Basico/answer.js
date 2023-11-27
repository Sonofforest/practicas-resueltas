const sum = (n1, n2) => n1 + n2;

const pot = (n, x) => {
  return Math.pow(n, x);
};

const isMultiple = (n, arr) => {
  return arr.every((num) => n % num === 0);
};

const fibonacci = (n) => {
  const fibArr = [1, 1];
  for (let i = 2; i <= n; i++) {
    fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
  }
  return fibArr.slice(0, n);
};

const removeSpaces = (str) => {
  return str.replace(/\s/g, "");
};

const mayusMinus = (str) => {
  const words = str.split(" ");
  const result = words.map((word, index) => {
    return index % 2 === 0
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word.charAt(0).toLowerCase() + word.slice(1).toUpperCase();
  });
  return result.join(" ");
};

const oldDate = (date1, date2) => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
    throw new Error("Invalid date format");
  }

  return firstDate < secondDate;
};


export { sum, pot, isMultiple, fibonacci, removeSpaces, mayusMinus, oldDate };
