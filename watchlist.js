

const key = "1a88ff15"
const watchlistContainer = document.getElementById("watchlist-container")


 function renderWatchlist () { 
    const watchlistArrayOfIds = JSON.parse(localStorage.getItem("watchlist"))

    
    
    
    if (!watchlistArrayOfIds.length > 0) {
    watchlistContainer.innerHTML = `
            <h2 class="exploring-txt">Your watchlist is looking a little empty...</h2>
         <a href="/index.html"><i class="fa-solid fa-circle-plus"></i> Let’s add some movies!</a>
    `

    } else {

        
        watchlistArrayOfIds.map( movieId => { 

        fetch(`https://www.omdbapi.com/?apikey=${key}&i=${movieId}`)
            .then(response => response.json())
            .then(movieData => {
                
                let movieArray = []
                movieArray.push(movieData)

                let htmlMovies = movieArray.map(({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}) => {
                    return `
                   
                        <div class="movie-card" >
                            <img src="${Poster}" alt="${Title} poster" class="movie-poster">
                            <div class="info-container">
                                <div class="movie-details">
                                    <h2 class="movie-title">${Title}</h2>
                                    <p class="movie-rating"><i class="fa-regular fa-star"></i> ${imdbRating}</p>
                                </div>
                                <div class="movie-info">
                                    <p class="movie-runtime">Runtime: ${Runtime}</p>
                                    <p class="movie-genre">Genre: ${Genre}</p>
                                    <button class="remove-watchlist" data-imdbid="${imdbID}"><i class="fa-solid fa-circle-minus"></i> Remove</button>           
                                </div>
                                <p class="movie-plot">${Plot}</p>
                            </div>
                        </div>
                    `
                }).join("")
                
                watchlistContainer.innerHTML += htmlMovies
        })

        
        } 

        
 )}
}



renderWatchlist()




watchlistContainer.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".remove-watchlist")
    
    if (addBtn) {

        const movieId = addBtn.dataset.imdbid
        
        removeFromWatchlist(movieId)
    }
})


function removeFromWatchlist(idToRemove) {
      let watchlistArray = JSON.parse(localStorage.getItem("watchlist")) || []

    
            watchlistArray = watchlistArray.filter( id => id !== idToRemove)

            localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
           
    renderWatchlist()
}