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
     movieContainer.innerHTML = "<p>Loading...</p>"   
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

                let htmlMovies = movieArray.map(movie => {
                    return `
                    <div class="movie-card" id ="${movie.imdbID}">
                        <img src="${movie.Poster}" alt="${movie.Title} poster">
                        <h2>${movie.Title}</h2>
                        <p>Release Year: ${movie.Year}</p>
                        <p>Genre: ${movie.Genre}</p>
                        <p>Director: ${movie.Director}</p>
                        <p>Plot: ${movie.Plot}</p>
                    </div>
                    `
                }).join("")
                
                movieContainer.innerHTML += htmlMovies
               
            
            
            })
       
     })
    
    })

}
