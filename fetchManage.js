let dataList = [];
let urlsList = [];
let movieList = [];

function makeUrls(pageNum) {

    let $url = 'https://api.themoviedb.org/3/movie/popular?api_key=34163d7ea9fbd06f7babbb2ce6e7363d&language=en-US&page='+pageNum;
    urlsList.push($url);

}

function getFetch(){

    for(let pageCnt = 1 ; pageCnt < 31 ; pageCnt++){
        makeUrls(pageCnt);
    }

    let requests = urlsList.map(url => fetch(url));

    Promise.all(requests)
    .then(responses => {

      // 모든 응답이 성공적으로 이행되었습니다.
      for(let response of responses) {
        // alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.

        console.log("url" + response.url);
         console.log("status" + response.status);
      }
  
      return responses;
    })
    // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
    .then(responses => Promise.all(responses.map(r => r.json())))
    // JSON 형태의 응답 메시지는 파싱 되어 배열 'movie'에 저장됩니다.

    .then(movies => movies.forEach(movie => {
        dataList.push(movie.results)

        movie.results.map(movieObj=>{
            movieList.push(movieObj);
            console.log("movieObj : " + movieObj);
        })

        console.log(movieList);
        
    }))

    .then(result => {
        apiDataValidation();
    })

    .then(result => {
        makeMovileListHtml(movieList);
    });
    

    
    

    

}




function apiDataValidation(){

}



function makeMovileListHtml(movieList){

    let $ulHtml = "";
    let $cardListEl = document.getElementById("cardList");

    movieList.map((movieObj,index) =>{

        let movieIndex = index + 1;

        if(movieIndex >= 1 && movieIndex <= 24) {
            // 하나의 ul에 4개
            if (movieIndex % 4 === 1) {
                $ulHtml += '<ul class="card01">';
            }

            $ulHtml += '<li>';
            $ulHtml += '<h2>' + movieObj.title + '</h2>';
            $ulHtml += '<a><img class="movieImg" src=https://image.tmdb.org/t/p/w500'
                + movieObj.backdrop_path + '></a>';
            $ulHtml += '<div class="card01Text">';
            $ulHtml += '<p>' + movieObj.release_date + '</p>';
            $ulHtml += '<form>';
            $ulHtml += '<img src="./img/Favorite.svg">';
            $ulHtml += '<span>' + movieObj.vote_average + '</span>';
            $ulHtml += '</form>';
            $ulHtml += '</div>';
            $ulHtml += '</li>';

            if (movieIndex % 4 === 0) {
                $ulHtml += '</ul>';
            }
        }

    })

    $cardListEl.innerHTML = $ulHtml;

    let $PopupBox1 = document.querySelector(".Popup-box1");
    const elLi = document.querySelectorAll('.card01 > li');

    elLi.forEach((el,k)=>{
        el.onclick = ()=>{
            
            $PopupBox1.classList.add('active');

            let $popHtml = "";
            
            
            movieList.map((movieObj,index) =>{
                
                let movieIndex = k;
                
                if(movieIndex == index) {
            
        
                    $popHtml += '<div class="Popup-box2">';
                    $popHtml += '<img src="./img/Close.svg" class="Cancel" onclick="popClose();">';
                    $popHtml += '<ul class="Popup-box-list">';
                    $popHtml += '<li>';
                    $popHtml += '<h3>' + movieObj.title + '</h3>';
                    $popHtml += '<a><img class="movieImg" src=https://image.tmdb.org/t/p/w500'
                                + movieObj.backdrop_path + '></a>';
        
                    $popHtml += '<div class="Popup-box-listText">';
                    $popHtml += '<p>' + movieObj.release_date + '</p>';
                    $popHtml += '<p>'+movieObj.popularity+'<span>'+'관객수'+'</span>'+'</p>';
                    $popHtml += '<form>';
                    $popHtml += '<img src="./img/Favorite.svg">';
                    $popHtml += '<span>' + movieObj.vote_average + '</span>';
                    $popHtml += '</form>';
                    $popHtml += '</div>';
        
                    $popHtml += '<p class="story">'+'줄거리'+'<span>'+
                                movieObj.overview
                                +'</span>' +'</p>';
        
                    $popHtml += '</li>';
                    $popHtml += '</ul>';
                    $popHtml += '</div>';
        
              
        
                    $PopupBox1.innerHTML = $popHtml;
                }
            })
            
        }
    })  
            
}