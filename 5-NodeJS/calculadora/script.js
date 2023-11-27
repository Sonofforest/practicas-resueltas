let isParenthesisOpen = false;

function handleParenthesis() {
  if (isParenthesisOpen) {
    // Agregar paréntesis de cierre
    document.getElementById("result").value += ")";
    isParenthesisOpen = false;
  } else {
    // Agregar paréntesis de apertura
    document.getElementById("result").value += "(";
    isParenthesisOpen = true;
  }
}



// Obtener el elemento de resultado y los botones
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".bot");
const equalButton = document.querySelector(".equal");
const deleteButton = document.querySelector(".delete");

// Agregar eventos de clic a los botones numéricos y operadores
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    console.log(buttonText);
    if (buttonText === "()") {
      handleParenthesis();
    } else {
      result.value += buttonText;
      lastButtonWasParenthesis = false;
    }
  });
});

// Evento de clic para el botón "=" para calcular el resultado
equalButton.addEventListener("click", () => {
  try {
    result.value = eval(result.value);
  } catch (error) {
    result.value = "Error";
  }
});

// Evento de clic para el botón "CE" para borrar el contenido del resultado
deleteButton.addEventListener("click", () => {
  result.value = "";
  openedParentheses = 0;
  lastButtonWasParenthesis = false;
});
function appendToDisplay(value) {
  if (value === '*') {
    value = 'x'; // Reemplazamos el operador de multiplicación "*" por "x"
  }
  if (value === '.' && displayValue.includes('.')) {
    return; // Evitamos agregar más de un punto decimal
  }
  displayValue += value;
  document.getElementById("result").value = displayValue;
}