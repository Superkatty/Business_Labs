//функционал модального окна
window.modalView = function (body) {
    var modalBtn = body.getElementsByClassName("modal-btn");
    body.addEventListener("click", function (event) {
        try {
            var x = body.getElementsByClassName("modal-btn")[0];
            x.textContent = "Launch modal " + JSON.parse(localStorage.getItem('localObject')).blocksCount.length;
        }
        catch (e) { }
    });
    var modalContent = body.getElementsByClassName("modal-content")[0];
    modalBtn[0].addEventListener("click", function (event) {
        var modalView = body.getElementsByClassName("modal-body")[0],
            savedBlocks = JSON.parse(localStorage.getItem('localObject')),
            newModal = createNode("div");
        try {
            body.getElementsByClassName("modal-body")[0].remove();
        } catch (e) { }
        newModal.classList.add('modal-body');
        try {
            if (savedBlocks.blocksCount.length != 0) {
                savedBlocks.blocksCount.map(function (blockNumber) {
                    var blockAttribyte = "div[data-blockCount='" + blockNumber + "']",
                        block = body.querySelectorAll(blockAttribyte)[0],
                        cloneBlock = block.cloneNode(true);
                    append(newModal, cloneBlock);
                });
                append(modalContent, newModal);
                $('#modalView').modal('toggle');
            }
            else {
                alert("No saved blocks!");
            }
        }
        catch (e) {
            alert("No saved blocks!");
        }
    });
    controllersBtn(modalContent, body);
}
