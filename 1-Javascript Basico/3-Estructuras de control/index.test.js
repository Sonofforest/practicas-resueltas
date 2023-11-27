import { describe, it, expect } from "vitest";

describe("Estructuras de control", () => {
  //Utilizar un IF para que "y" tome el valor 10 solo si x es verdadera
  it("IF", () => {
    let x=true;
    let y=0;
    if (x) {
      y = 10;
    }
    expect(y).toBe(10);
  });

  //Utilizar un IF para que "y" tome el valor 10 o 20 dependiendo de si "x" es verdadera o falsa
  it("IF ELSE", () => {
    let x=true;
    let y=0;
    if (x) {
      y = 10;
    } else {
      y = 20;
    }

    expect(z).toBe(10);
  });

  //Utilizar un WHILE para que aumente el valor de "y" y disminuya el valor de "x", mientras "x" no sea 0
  it("WHILE", () => {
    let x=5;
    let y=0;
    while (x !== 0) {
      y += 2;
      x--;
    }

    expect(y).toBe(10);
  });

  //Utilizar un FOR para que aumente el valor de "y" una cantidad de veces igual a "x"
  it("FOR", () => {
    let x=5;
    let y=0;
    for (let i = 0; i < x; i++) {
      y += 2;
    }

    expect(y).toBe(10);
  });

  // Utilizar un Switch para que dependiendo del valor que tenga "x"(del 1 al 7), se setee a la variable "y" como un dia de la semana (Lunes,Martes,etc)
  it("SWITCH", () => {
    let x=1;
    let y;
    switch (x) {
      case 1:
        y = "Lunes";
        break;
      case 2:
        y = "Martes";
        break;
      case 3:
        y = "Miércoles";
        break;
      case 4:
        y = "Jueves";
        break;
      case 5:
        y = "Viernes";
        break;
      case 6:
        y = "Sábado";
        break;
      case 7:
        y = "Domingo";
        break;
      default:
        y = "Valor no válido";
    }

    expect(y).toBe("Lunes");
  });
});
