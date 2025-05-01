$(document).ready(function(){

    $('#get-movie-btn').on('click', function(){
        let movieDate = $('#movie-date').val().replace(/-/g, '');

        getMoviesFromAPI(movieDate);
    });

    function getMoviesFromAPI(date){
        const api_key = '4fb4ac5979958df9010c0fd0d9dc11a1';

        $.ajax({
            url: 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',
            type: 'get',
            data: {
                key: api_key,
                targetDt: date
            },
            success: function(json){
                $('#movie-list').empty();
                
                let movies = json.boxOfficeResult.dailyBoxOfficeList;
                
                $.each(movies, function(index, movie){
                    $('#movie-list').append(`
                        <tr>
                            <th scope="row">${movie.rank}</th>
                            <td>${movie.movieNm}</td>
                            <td>${movie.openDt}</td>
                            <td>${movie.audiAcc}</td>
                        </tr>
                    `)
                });

            },
            error: function(error){ 
                $('#movie-list').empty();

                alert('error!');
            }
        });
    }
});