$(document).ready(function(){

    $('#get-todo-btn').on('click', function(){
        const todoId = $('#todo-id').val();
    
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos/'+todoId,
            type: 'get',
            data: '',
            success:function(json){
    
                $('#todo-list').empty();

                let color = '';
                if(json.completed == true){
                    color = 'blue';
                    json.completed = '완료';
                }else{
                    color = 'red';
                    json.completed = '미완료';
                }

                $('#todo-list').append(`
                        <tr>
                            <th scope="row">${json.userId}</th>
                            <td>${json.id}</td>
                            <td>${json.title}</td>
                            <td style="color:${color}">${json.completed}</td>
                        </tr>
                    `)
    
            },
            error:function(error){
                $('#todo-list').empty();

                $('#todo-list').append(`
                    <tr>
                        <th scope="row">undifined</th>
                        <td>undifined</td>
                        <td>undifined</td>
                        <td>undifined</td>
                    </tr>
                `)
            }
        });
    });

});