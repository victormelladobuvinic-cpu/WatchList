/* star = <i class="fa-regular fa-star"></i> 
    plus= <i class="fa-solid fa-circle-plus"></i>
    minus = <i class="fa-solid fa-circle-minus"></i>*/


/* OMDb data */
    fetch("http://www.omdbapi.com/?apikey=1a88ff15&t=matrix")
         .then(res => res.json())
         .then ( data => console.log(data))
         