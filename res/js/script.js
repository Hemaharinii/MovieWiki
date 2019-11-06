function initialize() {
  //Get search term from URL
  let name = location.search.split("?q=")[1];
  document.getElementById("searchTitle").innerText = ` ${
    document.getElementById("searchTitle").innerText
  } "${name.split("+").join(" ")}"`;
  loadMovies();
}

function loadMovies() {
  //Get search term from URL
  let name = location.search.split("?q=")[1];
  let url = `https://www.omdbapi.com/?apikey=58d4cff4&s=${name}&type=movie&page=${page}`;
  addLoader();
  //Fetch API
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      // On Successfull API CALL
      if (result.Response === "True" && result.Search && result.Search.length > 0) {
        totalResults = result.totalResults;
        document.getElementById(
          "result"
        ).innerText = `About ${result.totalResults} results found`;
        //Add result to total movie results
        movies = [...movies, ...result.Search];
        movieList = result.Search;
        let resultContainer = document.getElementById("movies");
        movieList.forEach((movie, idx) => {
          //Create a DOM element and append to Movie Listing
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
            movie.Poster && movie.Poster != "N/A" ?
            movie.Poster :
            "res/img/movie.png";
          imageHolder.appendChild(movieImage);
          movieContainer.appendChild(imageHolder);
          let movieDetails = document.createElement("div");
          movieDetails.className = "inner";
          let movieName = document.createElement("div");
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
        showErrorAlert(result.Error);
      }

      resetLoader();
    }).catch((e) => {
      showErrorAlert(e);
    });
}

function redirectToMovie(movieId) {
  //Handle result on click
  window.location.href = `movie.html?movieId=${movieId}`;
}

function goBack() {
  //Handle go back
  window.history.back();
}

function getMovieData() {
  //   Get Movie ID
  let id = location.search.split("?movieId=")[1];
  let url = `https://www.omdbapi.com/?apikey=4b80c23d&i=${id}&plot=full`;
  addLoader();
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (result) {
      if (result.Response === "True") {
        //Add movie details Movie Detail Page
        document.getElementById("main").innerHTML = ` 
                    <div class="movieContentWrapper">
                        <div class="posterContent">
                                <img id="poster" class="poster" src="${
                                  result.Poster && result.Poster != "N/A"
                                    ? result.Poster
                                    : "res/img/movie.png"
                                }">
                        </div>
                        <div class="contentWrapper">
                            <h2 id="movieTitle">${result.Title}</h2>
                            <span id="movieReleaseYear" class="releaseYear"> ( ${
                              result.Year
                            } ) </span>
                            <div class="movieInfo">
                                 <span> ${result.Rated} | ${
            result.Runtime
          } | ${result.Genre} | ${result.Released}</span>
                            </div>
                            <div class="movieDetails">
                                <h3>Overview</h3>
                                <p>
                                    ${result.Plot}
                                </p>
                            </div>
                            <div class="movieDetails">
                                <h3>Director</h3>
                                <p>
                                    ${result.Director}
                                </p>
                            </div>
                            <div class="movieDetails">
                                <h3>Writer</h3>
                                <p>
                                    ${result.Writer}
                                </p>
                            </div>
                            <div class="movieDetails">
                                <h3>Cast</h3>
                                <p>
                                    ${result.Actors}
                                </p>
                            </div>
            
                        </div>
                </div>
                    `;
      } else {
        document.getElementById(
          "main"
        ).innerHTML = `<span> ${result.Error} </span>`;

        showErrorAlert(result.Error);
      }

      resetLoader();
    }).catch(e => {
      showErrorAlert(e);
    });
}