//API
window.getDataFromAPI = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=robot&min_height=500');
    xhr.responseType = 'json';
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.send();
}

getDataFromAPI(builBlock);

//построение блока
function builBlock(data) {
    localStorage.clear();
    var blockCount = 1;
    var hits = data.hits;
    pageContainer = document.body.getElementsByClassName('page-container')[0];
    hits.map(function (hits) {
        var div = createNode('div');
        div.classList.add('row', 'row-pageContainer');
        div.setAttribute("data-blockCount", blockCount);
        blockCount++;
        var buttons = [
            { textBnt: "Save" },
            { textBnt: "Approve" },
            { textBnt: "Decline" }
        ];
        var containers = [];
        var content = [
            {
                textCont: "Tags: ",
                linkCont: 'tags'
            },
            {
                textCont: "Likes: ",
                linkCont: 'likes'
            },
            {
                textCont: "Link: ",
                linkCont: 'pageURL'
            },
        ];
        createDeleteButton(containers);
        createImg(hits.userImageURL, containers);
        createContent(hits, content, containers);
        createButtonsList(buttons, containers);
        createCommentsBlock(containers);
        pushContainers(containers, div);
        append(pageContainer, div);
    });
    controllersBtn(pageContainer, document.body);
    modalView(document.body);
}


//создание узла
function createNode(element) {
    return document.createElement(element);
}

//установление род. связей
window.append = function (parent, el) {
    return parent.appendChild(el);
}

//контейнер кнопок
function createButtonsList(buttons, containers) {
    var container = createNode('div');
    container.classList.add('col-md-2');
    var ul = createNode('ul');
    buttons.map(function (buttons) {
        var btn = createNode('button');
        btn.textContent = buttons.textBnt;
        btn.classList.add('btn', 'btn-primary', 'btn-block');
        var li = createNode('li');
        append(li, btn);
        append(ul, li);
    });
    append(container, ul);
    containers.push(container);
    return container;
}

//контейтер с картинкой
function createImg(imgSrc, containers) {
    var container = createNode('div');
    container.classList.add('col-md-4', 'col-xs-12', 'col-sm-6');
    var img = createNode('img');
    img.src = imgSrc;
    img.classList.add('img-responsive', 'img-circle', 'mx-auto');
    append(container, img);
    containers.push(container);
    return container;
}

//контейнер с контентом
function createContent(hits, content, containers) {
    var container = createNode('div');
    container.classList.add('col-md-5', 'col-xs-12', 'col-sm-6', 'text-left');
    content.map(function (cont) {
        if (cont.linkCont == "pageURL") {
            var a = createNode('a');
            a.setAttribute("target", "_blank");
            a.href = hits[cont.linkCont];
            a.textContent = hits[cont.linkCont];
            append(container, a);
        }
        else {
            var p = createNode('p');
            p.innerHTML = cont.textCont + hits[cont.linkCont];
            append(container, p);
        }

    });
    containers.push(container);
    return container;
}

//кнопка удаления блока
function createDeleteButton(containers) {
    var container = createNode('div');
    container.classList.add('col-md-1', 'order-12', 'col-xs-2');
    var btn = createNode('button');
    btn.textContent = "X";
    btn.classList.add('btn', 'btn-danger');
    append(container, btn);
    containers.push(container);
    return container;
}

//коментарии
function createCommentsBlock(containers) {
    var container = createNode('div'),
        panel = createNode('div'),
        panelList = createNode('div'),
        panelHeading = createNode('h4'),
        panelListItem1 = createNode('a'),
        span = createNode('span'),
        labelComment = createNode('label'),
        commentsBox = createNode('textarea'),
        commentsLine = createNode('input'),
        inputGroup = createNode('div'),
        buttonAddComment = createNode('button');
    container.classList.add('col-12', 'form-group');
    inputGroup.classList.add('input-group');
    panel.classList.add('panel', 'panel-default');
    panelHeading.classList.add('panel-heading');
    panelHeading.textContent = "Comments";
    panelList.classList.add('list-group');
    panelListItem1.classList.add('list-group-item', 'first-list-item');
    panelListItem1.textContent = "Add your comments!";
    span.classList.add("badge");
    span.textContent = "3";

    buttonAddComment.classList.add('btn', 'btn-comment');
    commentsBox.setAttribute("row", "10");
    commentsBox.classList.add('form-control');
    commentsLine.classList.add('form-control');
    buttonAddComment.textContent = "Add comment";

    append(panelList, panelListItem1);
    append(panel, panelHeading);
    append(panel, panelList);
    append(container, panel);
    append(inputGroup, commentsLine);
    append(inputGroup, buttonAddComment);
    append(container, inputGroup);
    containers.push(container);
}
//добавление контейнеров в div.row
function pushContainers(containers, div) {
    containers.map(function (cont) {
        append(div, cont);
    });
};
