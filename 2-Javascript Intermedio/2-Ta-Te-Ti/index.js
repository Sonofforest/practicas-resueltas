let jugador = "X";
let tablero = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  function dibujarTablero() {
    console.log("-------------");
    for (let i = 0; i < 3; i++) {
      let fila = "| ";
      for (let j = 0; j < 3; j++) {
        fila += tablero[i][j] + " | ";
      }
      console.log(fila);
      console.log("-------------");
      
    }
  }
  
  function Movimiento(fila, columna) {
  
    if (tablero[fila][columna] === " ") {
      tablero[fila][columna] = jugador;
      dibujarTablero();
      if (verganador()) return true;
      cambiarJugador();
     

    } else {
      console.log("¡Movimiento inválido! Intenta de nuevo.");
    }
  }
  
  
  function cambiarJugador() {
    jugador = jugador === "X" ? "O" : "X";
    console.log("Es el turno del jugador " + jugador);
  }
  
  
  function verganador() {
    for (let i = 0; i < 3; i++) {
      if (
        tablero[i][0] === tablero[i][1] &&
        tablero[i][0] === tablero[i][2] &&
        tablero[i][0] !== " "
      ) {
        console.log("ganó"+ jugador);
        return true;
      }
    }
  
    //COLUMNAS Y DIAGONALES
    for (let i = 0; i < 3; i++) {
      if (
        tablero[0][i] === tablero[1][i] &&
        tablero[0][i] === tablero[2][i] &&
        tablero[0][i] !== " "
      ) {
        console.log("ganó"+ jugador);
        return true;
      }
    }
  
    
    if (
      (tablero[0][0] === tablero[1][1] &&
        tablero[0][0] === tablero[2][2] &&
        tablero[0][0] !== " ") ||
      (tablero[0][2] === tablero[1][1] &&
        tablero[0][2] === tablero[2][0] &&
        tablero[0][2] !== " ")
    ) {
      console.log("ganó"+ jugador);
    
      return true;
    }
  
    //empate
    let empate = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] === " ") {
          empate = false;
          break;
        }
      }
    }
    if (empate) {
  console.log("¡Empate!");
  return true;
  }
  }
   

  console.log("¡TATETI PARA VIDEOJUGADORES!");
  console.log("Para realizar un movimiento, ingresa las coordenadas de la celda (fila, columna, ejemplo:0,0/0,1/0,2).");
  console.log("El jugador X inicia el juego.");
  dibujarTablero();
  console.log("Es el turno del jugador " + jugador);
  
  // esto lee la entrada del jugador
  const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
  });
  
  readline.on("line", (input) => {
  const [fila, columna] = input.split(",");
  if (Movimiento(parseInt(fila), parseInt(columna))) readline.close();
  });
  


