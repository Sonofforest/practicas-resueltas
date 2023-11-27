import { describe, it, expect } from "vitest";

describe("Manejo avanzado de arreglos", () => {
  it("forEach", () => {
    /**
     * Agregar todos los elementos del arreglo 'arr' al arreglo 'arr2' usando el forEach
     */
    const arr1 = [1, 2, 2];
    const arr2 = [];
    arr1.forEach((element) => {
      arr2.push(element);
    });

    expect(arr2).toStrictEqual([1, 2, 3]);
  });
  it("map", () => {
    /**
     * Usar el metodo map para mutar los valores del arreglo 'arr1' y almacenar el resultado en 'arr2'
     */

    const arr1 = [1, 2, 3];
    const arr2 = arr1.map((element) => element + 1);


    expect(arr2).toStrictEqual([2, 3, 4]);
  });
  it("filter", () => {
    /**
     * Utilizar el metodo filter para filtrar el arregloy dejar solo los numeros primos
     */
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = arr1.filter((element) => {
      for (let i = 2; i < element; i++) {
        if (element % i === 0) return false;
      }
      return element > 1;
    });
    expect(arr2).toStrictEqual([1, 3, 5, 7]);
  });
  it("Primos", () => {
    /**
     * Dado un array de numeros, obtener el primer numero primo que aparezca y guardarlo en una variable. Si la raiz cuadrada del numero es mayor a 5, ordenar el arreglo, sino invertirlo
     */
    const arr1 = [1, 4, 14, 25, 67, 2, 17, 23];
    let primo;
    for (let i = 0; i < arr1.length; i++) {
      if (isPrime(arr1[i])) {
        primo = arr1[i];
        break;
      }
    }

    if (Math.sqrt(primo) > 5) {
      arr1.sort((a, b) => a - b);
    } else {
      arr1.reverse();
    }

    expect(arr1).toStrictEqual([1, 2, 4, 14, 17, 23, 25, 67]);

    const arr2 = [32, 5, 27, 1, 8, 156, 20, 14];
    for (let i = 0; i < arr2.length; i++) {
      if (isPrime(arr2[i])) {
        primo = arr2[i];
        break;
      }
    }

    if (Math.sqrt(primo) > 5) {
      arr2.sort((a, b) => b - a);
    } else {
      arr2.reverse();
    }
    expect(arr2).toStrictEqual([14, 20, 156, 8, 1, 27, 5, 32]);
    
    function isPrime(num) {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    }
  });
});
