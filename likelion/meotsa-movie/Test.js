$(document).ready(function(){
    $('#get-movie-btn').on('click', function(){
        let movieDate = $('#movie-date').val().replace(/-/g, '');

        getMoviesFromRestAPI(movieDate);
    })
});

function getMoviesFromRestAPI(date){
    const api_key = '4fb4ac5979958df9010c0fd0d9dc11a1';

    $.ajax({
        url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',
        type: 'get',
        data: {
            key: api_key,
            targetDt: date
        },
        success: function(json){
            let movies = json.boxOfficeResult.dailyBoxOfficeList;
            
            $('#movie-list').empty();

            $.each(movies, function(index, movie){
                $('#movie-list').append(`
                    <tr>
                        <th scope="row">${movie.rank}</th>
                        <td>${movie.movieNm}</td>
                        <td>${movie.audiAcc} 명</td>
                        <td>${movie.openDt}</td>
                    </tr>
                `)
            })
        },
        error: function(){
            $('#movie-list').empty();

            alert('error!!');
        }
    })
}