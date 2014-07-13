function vote() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/vote', true);
    var data = createVote();
    if (data == 0) {
        alert('Выберите вариант ответа и нажмите кнопку "Голосовать"');
        return;
    }
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert(xhr.responseText);
                return;
            }
        };
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                result();
            }
        }
    };
};
function createVote() {
    var value = [];
    var input = document.getElementsByTagName('input');
    for (var i = 0; i < input.length; i++) {
        if ((input[i].type === 'radio' && input[i].checked && input[i].name === 'radio') ||
            (input[i].type === 'checkbox' && input[i].checked && input[i].name === 'checkbox')) {
            value.push(input[i].value);
        }
    }
    if (value.length == 0) {
        return 0;
    }
    var s = window.location.pathname;
    var n = s.substring(1, s.length);
    return JSON.stringify({id: n, value: value});
}
function result() {
    var s = window.location.pathname;
    var n = s.substring(1, s.length);
    document.location.href = "http://localhost:3000/"+n+'/r'
};