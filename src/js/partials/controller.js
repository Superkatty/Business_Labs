//функционал кнопок
window.controllersBtn = function (container, body) {
    container.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn")) {
            if (event.target.textContent == "Approve") {
                approveCtrl(event);
            }
            else if (event.target.textContent == "Decline") {
                declineCtrl(event);
            }
            else if (event.target.textContent == "X") {
                //удаление блока               
                try {
                    updateLocalStorage(event, body);
                } catch (e) { }
                deleteBlock(event);
            }
            else if (event.target.textContent == "Add comment") {
                //добавление коментария  
                addComment(event);
            }
            else if (event.target.textContent == "Delete comment") {
                //удаление коментария
                event.path[1].remove();
            }
            else if (event.target.textContent == "Save") {
                //cохрранение блока
                saveToLocalStorage(event);
            }
            else if (event.target.textContent == "Delete") {
                //удаление блока
                if (event.path[5].classList.contains('modal-body')) {
                    event.path[0].setAttribute("disabled", "disabled");
                }
                else {
                    deleteFromLocalStorage(event);
                }
            }
        }
        try {
            body.getElementsByClassName("modal-btn")[0].textContent = "Launch modal " + JSON.parse(localStorage.getItem('localObject')).blocksCount.length;
        }
        catch (e) {
            body.getElementsByClassName("modal-btn")[0].textContent = "Launch modal 0";
        }
    });
}

//обновление Local Storage после удаления блока
function updateLocalStorage(event, body) {
    var rowPageContainer = findProperty(event.path, 'row-pageContainer');
    var retrievedObject = JSON.parse(localStorage.getItem('localObject'));
    retrievedObject.blocksCount.splice(retrievedObject.blocksCount.indexOf(event.path[rowPageContainer].attributes[1].value), 1);
    localStorage.setItem('localObject', JSON.stringify(retrievedObject));
    var pageContainerTemp = body.getElementsByClassName("page-container")[0],
        rowAttributeNameTemp = "div[data-blockCount='" + event.path[rowPageContainer].attributes[1].value + "']",
        rowTemp = pageContainerTemp.querySelectorAll(rowAttributeNameTemp)[0],
        saveBtn = rowTemp.getElementsByClassName("btn-block")[0];
    saveBtn.innerText = "Save";
}

//функционал кнопки "Save"
function saveToLocalStorage(event) {
    var btnModal = event.path[6].getElementsByTagName("body");
    event.path[0].innerText = "Delete";
    var retrievedObject = new Object();
    if (!localStorage.localObject) {
        retrievedObject = {
            blocksCount: []
        };
    }
    else if (localStorage.localObject) {
        retrievedObject = JSON.parse(localStorage.getItem('localObject'));
    }
    retrievedObject.blocksCount.push(event.path[4].attributes[1].value);
    localStorage.setItem('localObject', JSON.stringify(retrievedObject));
}

//функционал кнопки "Delete"
function deleteFromLocalStorage(event) {
    var rowPageContainer = findProperty(event.path, 'row-pageContainer');
    event.path[0].innerText = "Save";
    var retrievedObject = JSON.parse(localStorage.getItem('localObject'));
    retrievedObject.blocksCount.splice(retrievedObject.blocksCount.indexOf(event.path[rowPageContainer].attributes[1].value), 1);
    localStorage.setItem('localObject', JSON.stringify(retrievedObject));
}

//функционал кнопки "X"
function deleteBlock(event) {
    var rowIndex = findProperty(event.path, 'row-pageContainer');
    event.path[rowIndex].remove();
}

//функционал кнопки "Approve"
function approveCtrl(event) {
    var buttons = event.path[2].getElementsByTagName("button"),
        pLikes = event.path[4].getElementsByTagName("p"),
        likeCount = pLikes[1].textContent.slice(6, 9);
    buttons[1].setAttribute("disabled", "disabled");
    buttons[2].removeAttribute("disabled");
    event.path[4].classList.add("blockliteGreen");
    event.path[4].classList.remove("blockliteRed");
    likeCount++;
    pLikes[1].innerHTML = "Likes: " + likeCount;
}

//функционал кнопки "Decline"
function declineCtrl(event) {
    var buttons = event.path[2].getElementsByTagName("button"),
        pLikes = event.path[4].getElementsByTagName("p"),
        likeCount = pLikes[1].textContent.slice(6, 9);
    buttons[2].setAttribute("disabled", "disabled");
    buttons[1].removeAttribute("disabled");
    event.path[4].classList.add("blockliteRed");
    event.path[4].classList.remove("blockliteGreen");
    likeCount--;
    pLikes[1].innerHTML = "Likes: " + likeCount;
}

//добавление коментариев
function addComment(event) {
    var rowIndex = findProperty(event.path, 'row-pageContainer');
    var lineComment = event.path[rowIndex].getElementsByClassName("form-control")[0];
    if (lineComment.value != "") {
        var listGroup = event.path[2].childNodes[0].childNodes[1],
            panelListNewItem = createNode('a'),
            buttonAddComment = createNode('button'),
            buttonDeleteComment = createNode('button');
        buttonDeleteComment.textContent = "Delete comment";
        buttonDeleteComment.classList.add("deleteBtn", "btn");
        buttonAddComment.classList.add('btn');
        panelListNewItem.classList.add('list-group-item');
        panelListNewItem.textContent = event.path[1].firstChild.value;
        append(panelListNewItem, buttonDeleteComment);
        event.path[1].firstChild.value = "";
        try {
            if (event.path[2].childNodes[0].childNodes[1].childNodes[0].classList.contains('first-list-item')) {
                event.path[2].childNodes[0].childNodes[1].childNodes[0].remove();
            }
        }
        catch (e) { }
        listGroup.appendChild(panelListNewItem);
    }
    else {
        alert("Your comment is empty!");
    }
}

//нахождение класса
function findProperty(obj, findClass) {
    for (var i in obj) {
        if (obj[i].classList.contains(findClass)) {
            return i;
        }
    }
}