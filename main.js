$(".search-button").on("click", function () {
  $.ajax({
    url:
      "https://www.omdbapi.com/?apikey=e8a4152&s=" + $(".input-keyword").val(),
    success: (results) => {
      const mvs = results.Search;
      let cards = "";
      mvs.forEach((m) => {
        cards += showMovies(m);
      });
      $("#card").html(cards);

      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "https://www.omdbapi.com/?apikey=e8a4152&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMoviesDetail(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e);
          },
        });
      });
    },
    error: (e) => {
      console.log(e);
    },
  });
});

function showMovies(m) {
  return `<div class="col-md-4">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
                 <h5 class="card-title">${m.Title}</h5>
                 <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
            data-bs-target="#exampleModal" data-imdbid="${m.imdbID}">Details</a>
        </div>
    </div>
</div>`;
}

function showMoviesDetail(m) {
  let ratingsArray = m.Ratings;
  return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-4">
        <img src="${m.Poster}" class="img-fluid"/>
        </div>
        <div class="col">
        <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
            <li class="list-group-item">Genre : ${m.Genre}</li>
            <li class="list-group-item">Director : ${m.Director}</li>
            <li class="list-group-item">Actors : ${m.Actors}</li>
            <li class="list-group-item">Plot : ${m.Plot}</li>
            <li class="list-group-item">Runtime : ${m.Runtime}</li>
            <li class="list-group-item">Ratings : ${ratingsArray[0].Source} | ${ratingsArray[0].Value} <br> ${ratingsArray[1].Source} | ${ratingsArray[1].Value}<br>${ratingsArray[2].Source} | ${ratingsArray[2].Value}</li>
        </ul>
        </div>
    </div>
    </div>`;
}
