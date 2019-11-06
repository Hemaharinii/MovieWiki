function getErrorContainer() {
  return document.getElementById("errorContainer");
}

function showErrorAlert(message, duration=4000) {
  let errorContainer = getErrorContainer();
  if(!errorContainer.classList.contains("show")) {
    errorContainer.classList.add("show")
  }

  errorContainer.innerHTML = `
    <div class="errorText">${message}</div>
  `;

  setTimeout(function() {
    resetError();
  }, duration);
}

function resetError() {
  getErrorContainer().classList.remove("show");
}