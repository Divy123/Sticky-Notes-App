document.addEventListener('DOMContentLoaded',function(){
 var closeBtn = document.getElementsByClassName('close')[0];
 var form = document.getElementsByClassName('form-wrap')[0]
 closeBtn.addEventListener('click',function(){
    form.style.marginTop='4%';
 })
})