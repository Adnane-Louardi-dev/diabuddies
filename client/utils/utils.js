export const fakeDataProducts = [
  {
    name: "Product 1",
    id: "1",
  },
  {
    name: "Product 2",
    id: "2",
  },
  {
    name: "Product 1",
    id: "1",
  },
];
export const actingTimes = ["3h00min", "3h30min", "4h00min", "4h30min", "5h00min", "5h30min", "6h00min"];
export const colors = ["orange", "red", "pink", "purple", "gray"];

export const formatQty = (qty) => {
  if (qty) {
    if (qty.includes("mg")) {
      return parseFloat(qty.replace("mg", "")) / 1000;
    }
    if (qty.includes("ml")) {
      return parseFloat(qty.replace("ml", ""));
    }
    if (qty.includes("cl")) {
      return parseFloat(qty.replace("l", "")) * 10;
    }
    if (qty.includes("dl")) {
      return parseFloat(qty.replace("l", "")) * 100;
    }
    if (qty.includes("l")) {
      return parseFloat(qty.replace("l", "")) * 1000;
    }
    return parseFloat(qty.replace("g", "").replace("ml", ""));
  }
  return undefined;
};

export const kcalCalculate = (data) => {
  data = data ?? {
    protein: 0,
    fat: 0,
    carbs: 0,
  };
  return (data.protein * 4 + data.fat * 9 + data.carbs * 4).toFixed(0);
};

export const isAllEntriesAreNull = (object) => {
  return Object.entries(object).find(([_, val]) => typeof val !== "undefined" && val !== null && val !== 0) === undefined;
};

export const renderNumber = (num) => {
  return Math.round(100*num) / 100
}

export const getNumberFromTextInput = (value) => {
  value = value.trim();
  if(value.at(-1) === ","){
    value = value.slice(0,value.length-1) + "."
  }
  if(value.at(-1) !== ".") {
    value = value ? parseFloat(value) : 0
  }
  return value
}