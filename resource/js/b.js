var BD_BRIDGE_OPEN = 1;
var BD_BRIDGE_ROOT = "http://qiao.baidu.com/";
var BD_BRIDGE_RCV_ROOT = "http://rqiao.baidu.com/";
var BD_BRIDGE_DATA = {mainid : "120108475",siteid : "1235812",SITE_ID : "5405767e69cb665983e706a9102487c1"};
var BD_BRIDGE_ICON_CONFIG = {
	background : {
		color : "",
		url   : "http://qiao.baidu.com/res/iconbg/08.jpg"
	},
	head : {
		url    : "http://qiao.baidu.com/res/iconhead/20.png",
		width  : 147,
		height : 70
	},
	button : {
		color : "#f7bd84",
		url   : "",
		text  : "#bd4b13"
	},
	flow     : 1,
	position : 2,
	special : "1"
};
var BD_BRIDGE_INVITE_CONFIG = {
	background : {
		color : "",
		url   : "http://qiao.baidu.com/res/invitebg/06.jpg"
	},
	head : {
		show : 1,
		size : 1,
		url  : "http://qiao.baidu.com/res/invitehead/09_big.jpg"
	},
	text   : "国际机票头等舱申请低50%；经济舱申请低2000元。有什么可以帮助您的吗？",
	button : "#f87a1a",
	mode   : 2,
	special : "0"
};
var BD_BRIDGE_INVITE = {
	invitetype   : 1,
	inviterepeat : 0,
	invitetime   : 90
};
var BD_BRIDGE_PIGEON_SOUL = {
	disableMess     : 0,
	messType        : 1,
	messFloatType   : 0,
	language        : 0,
	position        : 0,
	backgroundColor : "#6cadde",
	messItemName    : 0,
	messItemPhone   : 0,
	messItemAddress : 2,
	messItemEmail   : 0,
	extraMessItems  : [] 
};
if ((BD_BRIDGE_OPEN == 1) && (typeof window["BD_BRIDGE_LOADED"] == "undefined")) {
	window["BD_BRIDGE_LOADED"] = 1;
	var script = document.createElement("script");
    script.type="text/javascript";
    script.charset = "UTF-8";
    script.src = BD_BRIDGE_ROOT + "asset/js/bw.js?v=2363";
    document.getElementsByTagName("head")[0].appendChild(script);
}