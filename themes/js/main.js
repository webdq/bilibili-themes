var rclass = /[\t\r\n\f]/g;
var core_rnotwhite = /\S+/g;

function hasClass(ele,value) {
    var className = " " + value + " ";
    if ( ele.nodeType === 1 && (" " + ele.className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
        return true;
    }
    return false;
}

function addClass(ele,value){
    var cur,clazz,j;
    var classes = ( value || "" ).match( core_rnotwhite ) || [];

    cur = ele.nodeType === 1 && ( ele.className ?
        ( " " + ele.className + " " ).replace( rclass, " " ) :
        " "
    );

    if(cur){
        j = 0;
        while ( (clazz = classes[j++]) ) {
            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                cur += clazz + " ";
            }
        }
        ele.className = trim( cur );
    }
}

function removeClass(ele,value){
    var cur,clazz,j;
    var classes = ( value || "" ).match( core_rnotwhite ) || [];

    cur = ele.nodeType === 1 && ( ele.className ?
        ( " " + ele.className + " " ).replace( rclass, " " ) :
        ""
    );

    if ( cur ) {
        j = 0;
        while ( (clazz = classes[j++]) ) {
            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                cur = cur.replace( " " + clazz + " ", " " );
            }
        }
        ele.className = value ? trim( cur ) : "";
    }
}

function trim(text){
    return text.replace(/^\s+|\s+$/g,'');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var className = [];
    for(var i=0; i<=request.length; i++){
        className.push((request.prefix+i));
    }
    if(document.body){
        removeClass(document.body,className.join(' '));
        addClass(document.body,(request.prefix+request.theme));
    }
});