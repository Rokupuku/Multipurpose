$(document).ready(function() {
    $('#my-btn').on('click', function(){

        //input에서 값 가져오기
        let value = $('#input').val();
        $('#result').html(value);

    });

    //회원 목록 번호
    let number = 1;

    //회원등록
    $('#register-btn').on('click', function(){
        let name = $('#name').val();
        let age = $('#age').val();
        let address = $('#address').val();
        
        //입력 체크
        if(name.length == 0){
            alert('이름을 입력해주세요.');
            return;
        }
        if(age.length == 0){
            alert('나이를 입력해주세요.');
            return;
        }
        if(address.length == 0){
            alert('주소를 입력해주세요.');
            return;
        }

        //회원 목록 추가
        $('#user-list').append(`
            <tr>
                <th>${number}</th>
                <td>${name}</td>
                <td>${age}</td>
                <td>${address}</td>
                <!-- 삭제 버튼은 여러번 추가될 수 있으므로 클래스로 사용 -->
                <td><button class="delete-btn">삭제</button></td>
            </tr>
        `);

        //삭제 버튼 클릭 이벤트
        $('.delete-btn').on('click', function(){
            $(this).closest('tr').remove();
        });

        //입력 초기화
        $('#name').val('');
        $('#age').val('');
        $('#address').val('');

        //회원 목록 번호 증가
        number++;
    });
});