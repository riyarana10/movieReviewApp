const apiKey = "api_key=e01fd19f1f85be814964a327e5d142de";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const page = document.querySelector(".movies");
const form = document.getElementById("form");
const searchMovie = document.getElementById("search");
const searchUrl = baseUrl + "/search/movie?" + apiKey;
const trend = document.getElementById("trending");
const highrated = document.getElementById("highRate");
const popkid = document.getElementById("kids");
const genre = document.getElementById("genre");
const closeBtn = document.querySelector(".close-button");
const tags = document.querySelector(".page-info");
const page1 = document.getElementById("genre-page");
const hamburger = document.querySelector(".hamburger");
const navlink = document.querySelector(".burger");
const links = document.querySelectorAll(".nav-links li");
const searchName = searchMovie.value;
const mainHeading = document.querySelector(".main");
const genreList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const highratedurl =
  baseUrl +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  apiKey;
const kidsUrl =
  baseUrl +
  "/discover/movie?with_genres=18&primary_release_year=2014&" +
  apiKey;

hamburger.addEventListener("click", () => {
  navlink.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});
// var selectGenre = [];
setGenre();
function setGenre() {
  tags.innerHTML = "";
  genreList.forEach((gen) => {
    const element = document.createElement("div");
    element.classList.add("tag");
    element.id = gen.id;
    element.innerText = gen.name;
    element.addEventListener("click", function () {
      // if (selectGenre.length == 0) {
      //   selectGenre.push(gen.id);
      // } else {
      //   if (selectGenre.includes(gen.id)) {
      //     selectGenre.forEach((idd, idx) => {
      //       if (idd == gen.id) {
      //         selectGenre.splice(idx, 1);
      //       }
      //     });
      //   } else {
      //     selectGenre.push(gen.id);
      //   }
      // }
      getmovie(apiUrl + "&with_genres=" + gen.id);
      page1.classList.remove("active");
      overlay.classList.remove("active");
    });
    tags.append(element);
  });
}

getmovie(apiUrl);
function getmovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovie(data.results);
    });
}

function showMovie(data) {
  page.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `
        <img src="${
          poster_path
            ? imageUrl + poster_path
            : "http://via.placeholder.com/1080x1580"
        }" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getcolor(
                          vote_average
                        )}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>
        `;

    page.append(movieDiv);
  });
}

function getcolor(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  trend.classList.remove("Color");
  popkid.classList.remove("Color");
  highrated.classList.remove("Color");
  const searchName = searchMovie.value;
  console.log(searchName);
  if (searchName) {
    getmovie(searchUrl + "&query=" + searchName);
  } else {
    getmovie(apiUrl);
  }
});
highrated.addEventListener("click", function () {
  highrated.classList.add("Color");
  trend.classList.remove("Color");
  popkid.classList.remove("Color");
  genre.classList.remove("Color");
  navlink.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  getmovie(highratedurl);
});

trend.addEventListener("click", function () {
  trend.classList.add("Color");
  highrated.classList.remove("Color");
  popkid.classList.remove("Color");
  genre.classList.remove("Color");
  navlink.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  getmovie(apiUrl);
});

popkid.addEventListener("click", function () {
  popkid.classList.add("Color");
  trend.classList.remove("Color");
  highrated.classList.remove("Color");
  genre.classList.remove("Color");
  navlink.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  getmovie(kidsUrl);
});

genre.addEventListener("click", () => {
  navlink.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  openpage(page1);
});

closeBtn.addEventListener("click", () => {
  closepage(page1);
});

function openpage(page) {
  genre.classList.add("Color");
  highrated.classList.remove("Color");
  trend.classList.remove("Color");
  popkid.classList.remove("Color");
  page.classList.add("active");
  overlay.classList.add("active");
}

function closepage(page) {
  genre.classList.remove("Color");
  page.classList.remove("active");
  overlay.classList.remove("active");
}
