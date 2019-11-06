function initialize() {
  let name = location.search.split("?q=")[1];
  document.getElementById("searchTitle").innerText = ` ${
    document.getElementById("searchTitle").innerText
  } "${name.split("+").join(" ")}"`;
  loadMovies();
}

function loadMovies() {
  let name = location.search.split("?q=")[1];
  let url = `http://www.omdbapi.com/?apikey=58d4cff4&s=${name}&type=movie&page=${page}`;
  fetch(url)
    .then(function(res) {
      return res.json();
    })
    .then(function(result) {
      console.log(result);
    });
}

