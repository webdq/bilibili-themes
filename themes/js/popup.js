chrome.runtime.getBackgroundPage(function(backgroundPage){
    var btnGroup = document.querySelector('#btnGroup');
    var btn = document.querySelectorAll('.btn');

    btnGroup.addEventListener('click',function(e){
        var index = [].indexOf.call(btn,e.target);
        var theme = e.target.getAttribute('theme');
        if(index > -1){
            backgroundPage.setTheme(theme);
            backgroundPage.saveTheme(theme);
        }
    });
})