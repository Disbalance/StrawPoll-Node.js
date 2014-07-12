var items=4;

function AddItem(item) {
    if ((item == 30) || (item != items)) {
    return;
    }
    var div = document.getElementById("pollBody");
    var button = document.getElementById("Add");
    items++;
    var newitem = "<span>" + items + ". </span>";
    newitem += "<input type=\"text\" placeholder=\"Введите вариант ответа...\" onkeypress =\"AddItem(" + items + ")\" name=\"Option " + items;
    newitem += "\" size=\"20\">";
    newnode = document.createElement("div");
    newnode.className = "pollOption";
    newnode.innerHTML = newitem;
    div.insertBefore(newnode, button);
}

function createVoting() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/createPoll',true);
        var data = createData();
        if (data == 0) {
            return;
        }
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    var o = document.createElement('div');
                    o.className ="b-popup-content";
                    o.innerHTML = '<div class=\"b-popup\" id=\"popup1\"><div class=\"b-popup-content\"><span> Ваш вопрос был создан и теперь доступен:</span><div><a href="'+xhr.responseText+'">'+xhr.responseText+'</a></div></div></div>';
                    document.body.appendChild(o);
                }
            }
        };


    };
function createData(){
    var option = [];
    var space = false;
    $('input', '.pollOption').each(function(index, item) {
        if (item.value !="") {
            if (item.value != ' ') {
                option.push(item.value);
            }
        }
    });
    var multis=document.getElementById("pollMulti").checked;
    var ips = document.getElementById("pollPermissive").checked;
    if (($('#quest').val() =="") || (option.length <= 1)) {
        alert('Заполните поле вопрос и заполните более 2-х вариантов ответа');
        return 0;
    }
    return JSON.stringify({quest: $('#quest').val(), options: option, multi: multis, ip: ips});
};
