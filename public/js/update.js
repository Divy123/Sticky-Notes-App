function cancelUpdate(e){
    console.log(e.target)
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    fetch('http://localhost:3000/list-note',{method:'get'})
    .then(res=>window.location.href = res.url)
    .catch(err=> console.log(err))
}

function makeUpdate(e){
    console.log(e.target)
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    
}