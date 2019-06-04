function openMenu(event) {
    var elList = document.getElementsByClassName('more');
    var el;
    for (var i = 0; i < elList.length; i++) {
        el = elList[i];
        if (el.id === event.target.id)
            break;
    }

    var btn = el.querySelector('.more-btn');
    var menu = el.querySelector('.more-menu');
    var menuItems = el.querySelector('.more-menu-items');
    var visible = false;

    function showMenu(e) {
        e.preventDefault();
        if (!visible) {
            visible = true;
            el.classList.add('show-more-menu');
            menu.setAttribute('aria-hidden', false);
            menuItems.setAttribute('aria-hidden', false);
            // document.addEventListener('mousedown', hideMenu, false);
        }
    }

    function hideMenu(e) {
        if (btn.contains(e.target)) {
            return;
        }
        if (visible) {
            visible = false;
            el.classList.remove('show-more-menu');
            menu.setAttribute('aria-hidden', true);
            menuItems.setAttribute('aria-hidden', true);
            document.removeEventListener('mousedown', hideMenu);
        }
    }


    btn.addEventListener('click', showMenu, false);
    el.addEventListener('mouseleave', hideMenu, false)
}


function updateNote(event) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    console.log(e.target)
}

function deleteNote(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    var id = e.target.closest(".more").id
    const url = 'http://localhost:3000/list-note'
    return fetch(url + '/' + id, {
            method: 'delete'
        }).then(response =>
            response.json().then(json => {
                if (json.message == 'ok')
                    window.location.reload();
            })
        )
        .catch(err => console.log(err))

}

function toggleReminder(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    var id = e.target.closest(".more").id
    const url = 'http://localhost:3000/list-note'
    var remind = (e.target.innerHTML.trim() === 'Set reminder')?false:true;
    const body = JSON.stringify({remind})
    return fetch(url + '/' + id, {
            method: 'PATCH',
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response =>
            response.json().then(json => {
                if (json.message == 'ok') 
                    window.location.reload();
            })
        )
        .catch(err => console.log(err))
}