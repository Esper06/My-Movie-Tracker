const log = console.log;

const searchBtn = $("#searchBtn");
const youtubeApiKey = "AIzaSyB9ILII2-SnkQFm4eEVSNcNMXvhmg_FcEs";
const omdbApiKey = "bcb8a4fa";

const viewMore = async (movieName) => {
  const searchTypeTitle = `t=${movieName}`;
  const urlTitle = `http://www.omdbapi.com/?${searchTypeTitle}&apikey=${omdbApiKey}&Type=movie`;
  const movieDetail = await findMovie(urlTitle);
  return movieDetail;
};
searchBtn.on("click", async (ev) => {
  ev.preventDefault();
  const movieName = $("#movieName").val();
  log("the movie is ", movieName);

  const searchType = `s=${movieName}`;
  log("the movie is ", movieName);
  const url = `http://www.omdbapi.com/?${searchType}&plot=full&apikey=${omdbApiKey}&Type=movie`;
  const movieList = await findMovie(url);

  log("the movie is ", movieName);

  const movieDetail = await viewMore(movieName);
  const searchTypeTitle = `t=${movieName}`;
  log("the movie is ", movieName);
  const urlTitle = `http://www.omdbapi.com/?${searchTypeTitle}&apikey=${omdbApiKey}&Type=movie`;
  const movieListTitle = await findMovie(urlTitle);
  log(movieListTitle);
  $("#myMovieList").append(
    `<li class="list-group-item active">${movieList.Search[0].Title}</li>`
  );
  for (var i = 1; i < movieList.Search.length; i++) {
    $("#myMovieList").append(
      `<li class="list-group-item">${movieList.Search[i].Title}</li>`
    );
  }
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieList.Search[0].Title}  trailer&type=video&key=${youtubeApiKey}`;
  const vieoLink = await findMovie(youtubeUrl);
  log(movieList);
  log(
    `https://www.youtube.com/results?search_query=${vieoLink.items[0].id.videoId}`
  );
  $(".trailer").append(
    `
    <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${vieoLink.items[0].id.videoId}" allowfullscreen style="width:600px ; height:400px"></iframe>
</div>`);
$(".result").append(
  `<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${movieListTitle.Poster}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${movieListTitle.Title}<small class="text-muted text-justify-right"> Release Date: ${movieListTitle.Released}</small></h5>
    <h6 class="card-text">Stars: <small class="text-muted text-justify-right">${movieListTitle.Actors}</small></h6>
    <h6 class="card-text">Genre: <small class="text-muted text-justify-right">${movieListTitle.Genre}</small></h6>
    <i class="fa fa-star" aria-hidden="true"></i><span class="card-text">${movieListTitle.Ratings[1].Value}</span>
    <p class="card-text">${movieListTitle.Plot}</p>
    <button type="button" class="btn btn-light position-relative mx-3">
    <i class="fas fa-thumbs-up fs-3 text-success"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
      99+
    </span>
</button>
<button type="button" class="btn btn-light position-relative mx-3">
    <i class="fas fa-thumbs-down fs-3 text-danger"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
      22
    </span>
</button>
  </div>
</div>`
);
});

const findMovie = async (url) => {
  movieList = [];
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
