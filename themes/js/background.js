var STORAGE_KEY = 'bilibili-theme';
var THEME_LENGTH = 4;
var THEME_PREFIX = 'bilibili-theme-';
var TAB_REG = /^(https?:\/\/)?(.+\.)*bilibili\.com(\/.*)?$/;
var default_theme = '0';

function saveTheme(theme){
    default_theme = theme;
    var data = {};
    data[STORAGE_KEY] = theme;
    chrome.storage.local.set(data);
}

function setTheme(theme){
    default_theme = theme;
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab){
            checkTab(tab);
        });
    });
}

function getTheme(){
    var data = [];
    data[0] = STORAGE_KEY;
    chrome.storage.local.get(data,function(items){
        default_theme = items[STORAGE_KEY] || '0';
    });
}

function checkTab(tab){
    var flag = TAB_REG.test(tab.url);
    if(flag){
        chrome.browserAction.enable(tab.id);
        chrome.tabs.sendMessage(tab.id, {
            theme: default_theme,
            prefix: THEME_PREFIX,
            length: THEME_LENGTH
        });
    }else{
        chrome.browserAction.disable(tab.id);
    }
    return flag;
}

getTheme();

chrome.tabs.onCreated.addListener(function(tab){
    chrome.browserAction.disable(tab.id);
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    checkTab(tab);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        checkTab(tab);
    });
});