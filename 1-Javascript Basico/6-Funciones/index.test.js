import { describe, it, expect } from "vitest";
// import { sum, pot, isMultiple, fibonacci, removeSpaces, mayusMinus, oldDate } from "../answer";

describe("Funciones", () => {
  it("Matematicas", () => {
    /**
     * Programar una funcion que reciba 2 numeros enteros y devuelva la suma de los mismos
     */
    const sum = (a, b) => a + b;

    /**
     * Programar una funcion que reciba un numero entero n y un numero entero x.
     * Esta funcion debe retornar la x potencia del numero n, es decir n^x
     */
    const pot = (a, b) => a ** b;

    /**
     * Programar una funcion que reciba un numero entero n y un arreglo de numeros enteros arr
     * Esta funcion debe devolver true si si n es multiplo de todos los numeros en arr
     */
    const isMultiple = (n, arr) => arr.every((e) => n % e === 0);

    // f(n) = f(n-1) + f(n-2)
    /**
     * Programar una funcion que reciba un numero entero n
     * Esta funcion deve devolver un arreglo con todos los numeros de fibonacci hasta n inclusive
     */
    const fibonacci = (n) => {
      const arr = [1, 1];
      while (arr[arr.length - 1] + arr[arr.length - 2] <= n) {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
      }
      return arr;
    };

    expect(sum(2, 2)).toBe(4);
    expect(pot(2, 4)).toBe(16);
    expect(isMultiple(8, [2, 4])).toBe(true);
    expect(isMultiple(8, [2, 3])).toBe(false);
    expect(fibonacci(21)).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21]);
  });

  it("Strings", () => {
    /**
     * Programar una funcion que reciba un String str
     * Esta funcion debe retortar el mismo string pero sin espacios
     */
    const removeSpaces = (str) => str.replace(/\s/g, "");

    /**
     * Programar una funcion que reciba un String str
     * Esta funcion debe hacer que todas las palabras pares comiencen con mayuscula y tengan el resto en minuscula
     * y las palabras inpares deben comenzar con minuscula y tener el resto en mayuscula
     */
    const mayusMinus = (str) => {
      return str
        .split(" ")
        .map((word, i) => {
          if (i % 2 === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          return word.charAt(0).toLowerCase() + word.slice(1).toUpperCase();
        })
        .join(" ");
    };

    expect(removeSpaces("Hola soy una cadena de caracteres")).toBe("Holasoyunacadenadecaracteres");
    expect(mayusMinus("Hola soy una cadena de caracteres")).toBe("hOLA Soy uNA Cadena dE Caracteres");
  });

  it("Fechas", () => {
    /**
     * Programar una funcion que reciba 2 fechas en formato string, date1 y date2
     * Esta funcion debe retornar true si date1 es mas vieja que date2
     * Ademas debe retornar error si el formato de la fecha es erroneo
     *  Nota: debe usar la clase Date() de JS
     */
    const oldDate = (date1, date2) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error("Formato de fecha incorrecto");
      }
      return d1 < d2;
    };

    expect(() => oldDate("2022-01-01", "2020-01-01")).toThrowError("Formato de fecha incorrecto");
    expect(oldDate("2022-01-01", "2023-01-01")).toBe(false);
  });
});
