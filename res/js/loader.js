getLoaderContainer = () => {
  return document.getElementById("loaderContainer");
}

addLoader = () => {
  let loader = `<div class="loader-wrapper">
                  <div class="loader" style="margin: auto"></div>
                </div>`;
  let resultContainer = getLoaderContainer();
  resultContainer.innerHTML = loader;
}

resetLoader = () => {
  getLoaderContainer().innerHTML = ""
}