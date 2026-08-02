const {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
} = require("./validacoes");

describe("Função firstName", () => {
  test("deve retornar apenas o primeiro nome", () => {
    expect(firstName("João Silva")).toBe("João");
  });

  test("deve retornar o próprio nome quando houver apenas um", () => {
    expect(firstName("Mateus")).toBe("Mateus");
  });
});

describe("Função checkStockAvailability", () => {
  test("deve retornar true quando houver estoque suficiente", () => {
    expect(checkStockAvailability("laptop", 5)).toBe(true);
  });

  test("deve retornar false quando não houver estoque", () => {
    expect(checkStockAvailability("book", 1)).toBe(false);
  });

  test("deve retornar false quando a quantidade solicitada for maior que o estoque", () => {
    expect(checkStockAvailability("headphone", 10)).toBe(false);
  });
});

describe("Função calculateTotalPrice", () => {
  test("deve calcular corretamente o valor total dos produtos", () => {
    const products = [
      { name: "Notebook", price: 1000, quantity: 2 },
      { name: "Mouse", price: 100, quantity: 3 },
    ];

    expect(calculateTotalPrice(products)).toBe(2300);
  });

  test("deve retornar 0 quando a lista estiver vazia", () => {
    expect(calculateTotalPrice([])).toBe(0);
  });
});