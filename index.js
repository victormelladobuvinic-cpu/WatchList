/* star = <i class="fa-regular fa-star"></i> 
    plus= <i class="fa-solid fa-circle-plus"></i>
    minus = <i class="fa-solid fa-circle-minus"></i>*/

const key = "1a88ff15"
const searchBtn = document.getElementById("search-form")
const movieTitleInput = document.getElementById("movie-title")
const movieContainer = document.getElementById("movies-container")




searchBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const movieTitle = movieTitleInput.value;
    if (movieTitle) {
    movieContainer.innerHTML = `<p class="loading">Buscando películas...</p>`
    getMovieDataSearch(key,movieTitle)
    } else {
        alert("Please enter a movie title")
    }
})

function getMovieDataSearch(key, title) { 

    movieContainer.innerHTML = ""
    fetch(`https://www.omdbapi.com/?apikey=${key}&s=${title}`)
    .then(response => response.json())
    .then(data => {
        const movies = data.Search
        movies.map( movie =>  {

            fetch(`https://www.omdbapi.com/?apikey=${key}&i=${movie.imdbID}`)
            .then(response => response.json())
            .then(movieData => {
                
                let movieArray = []
                movieArray.push(movieData)

                let htmlMovies = movieArray.map(({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}) => {
                    return `
                   
                        <div class="movie-card" data-imdbid="${imdbID}">
                            <img src="${Poster}" alt="${Title} poster" class="movie-poster">
                            <div class="info-container">
                                <div class="movie-details">
                                    <h2 class="movie-title">${Title}</h2>
                                    <p class="movie-rating"><i class="fa-regular fa-star"></i> ${imdbRating}</p>
                                </div>
                                <div class="movie-info">
                                    <p class="movie-runtime">Runtime: ${Runtime}</p>
                                    <p class="movie-genre">Genre: ${Genre}</p>
                                    <button class="add-watchlist"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>           
                                </div>
                                <p class="movie-plot">${Plot}</p>
                            </div>
                        </div>
                    `
                }).join("")
                
                movieContainer.innerHTML += htmlMovies
               
            
            
            })
       
     })
    
    })

}



