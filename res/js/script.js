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
      if (result.Response === "True" && result.Search  && result.Search.length > 0) {
        totalResults = result.totalResults;
        document.getElementById(
          "result"
        ).innerText = `About ${result.totalResults} results found`;
        movies = [...movies, ...result.Search];
        movieList = result.Search;
        let resultContainer = document.getElementById("movies");
        movieList.forEach((movie, idx) => {
          let movieContainer = document.createElement("div");
          let containerAttr = document.createAttribute("onclick");
          containerAttr.value = `redirectToMovie('${movie.imdbID}')`;
          movieContainer.setAttributeNode(containerAttr);
          movieContainer.className = "box";
          let imageHolder = document.createElement("a");
          imageHolder.classList.add("image");
          imageHolder.classList.add("fit");
          let movieImage = document.createElement("img");
          movieImage.src =
            movie.Poster && movie.Poster != "N/A"
              ? movie.Poster
              : "img/movie.png";
          imageHolder.appendChild(movieImage);
          movieContainer.appendChild(imageHolder);
          let movieDetails = document.createElement("div");
          movieDetails.className = "inner";
          let movieName = document.createElement("h3");
          movieName.innerText = movie.Title;
          movieDetails.appendChild(movieName);
          let movieYear = document.createElement("p");
          movieYear.innerText = movie.Year;
          movieDetails.appendChild(movieYear);
          movieContainer.appendChild(movieDetails);
          resultContainer.appendChild(movieContainer);
        });
        if (movies.length !== Number(totalResults)) {
          page++;
          document.getElementById("loadMore").classList.remove("hide");
        } else {
          document.getElementById("loadMore").classList.add("hide");
        }
      } else {
        document.getElementById("result").innerText = `${result.Error}`;
      }
    });
}

function redirectToMovie(movieId) {
  window.location.href = `/movie.html?movieId=${movieId}`;
}