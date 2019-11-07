function getalertContainer() {
  return document.getElementById("alertContainer");
}

function showAlert(message, duration=4000, type="error") {
  let alertContainer = getalertContainer();
  if(!alertContainer.classList.contains(type, "show")) {
    alertContainer.classList.add(type, "show")
  }

  alertContainer.innerHTML = `
    <div class="alertText">${message}</div>
  `;

  setTimeout(function() {
    resetAlert(type);
  }, duration);
}

function resetAlert(type) {
  getalertContainer().classList.remove(type, "show");
}