import { describe, it, expect } from "vitest";

describe("asincronismo", () => {
  it("Promesas", () => {
    /**
     * Cree una promesa que se cumpla pasados 3seg
     */

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 3000);
    });

    promise.then((res) => expect(res).toBe("success"));
  });

  it("Async Await", async () => {
    /**
     * Consuma la misma promesa del test anterior pero utilizando async await y almacene el resultado en 'res'
     */

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 3000);
    });

    let res = await promise;

    expect(res).toBe("success");
  });

  it("Consumo de API", async () => {
    /**
     * Use fetch() para consumir la api de "https://www.thecocktaildb.com/" y consulte la informacion del trago "Gin and Tonic"
     * NOTA: para buscar el trago por nombre utilice el siguiente parámetro de búsqueda: "Gin%20And%20Tonic"
     */

    const URL = "https://www.thecocktaildb.com/api/json/v1/1/";

    const response = await fetch(`${URL}search.php?s=Gin%20And%20Tonic`);
    const data = await response.json();

    expect(data.drinks[0].idDrink).toBe("11403");
    expect(data.drinks[0].strDrink).toBe("Gin And Tonic");
  });

  it("Manejo de excepciones", async () => {
    /**
     * En caso que la promesa fracase guarde ":(" en la variable res. En caso de éxito guarde ":)". Idem en caso de éxito. Use Async Await.
     */

    const promise = new Promise((resolve, reject) => {
      Math.random() > 0.5 ? resolve("Buena suerte") : reject("Mala suerte");
    });

    let res;

    try {
      res = await promise;
      res = ":)";
    } catch (error) {
      res = ":(";
    }

    expect(res == ":)" || res == ":(").toBe(true);
  });
});
