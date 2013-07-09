/* *
 * ---------------------------------------- *
 * 城市选择组件 v1.0
 * Author: VVG
 * QQ: 83816819
 * Mail: mysheller@163.com
 * http://www.cnblogs.com/NNUF/
 * ---------------------------------------- *
 * Date: 2012-07-10
 * ---------------------------------------- *
 * */

/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity =['北京市|beijingshi|bjs','天津市|tianjinshi|tjs','石家庄市|shijiazhuangshi|sjzs','唐山市|tangshanshi|tss','秦皇岛市|qinhuangdaoshi|qhds','邯郸市|handanshi|hds','邢台市|xingtaishi|xts','保定市|baodingshi|bds','张家口市|zhangjiakoushi|zjks','承德市|chengdeshi|cds','沧州市|cangzhoushi|czs','廊坊市|langfangshi|lfs','衡水市|hengshuishi|hss','太原市|taiyuanshi|tys','大同市|datongshi|dts','阳泉市|yangquanshi|yqs','长治市|changzhishi|czs','晋城市|jinchengshi|jcs','朔州市|shuozhoushi|szs','晋中市|jinzhongshi|jzs','运城市|yunchengshi|ycs','忻州市|xinzhoushi|xzs','临汾市|linfenshi|lfs','吕梁市|lvliangshi|lls','呼和浩特市|huhehaoteshi|hhhts','包头市|baotoushi|bts','乌海市|wuhaishi|whs','赤峰市|chifengshi|cfs','通辽市|tongliaoshi|tls','鄂尔多斯市|eerduosishi|eedss','呼伦贝尔市|hulunbeiershi|hlbes','巴彦淖尔市|bayannaoershi|bynes','乌兰察布市|wulanchabushi|wlcbs','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳市|shenyangshi|sys','大连市|dalianshi|dls','鞍山市|anshanshi|ass','抚顺市|fushunshi|fss','本溪市|benxishi|bxs','丹东市|dandongshi|dds','锦州市|jinzhoushi|jzs','营口市|yingkoushi|yks','阜新市|fuxinshi|fxs','辽阳市|liaoyangshi|lys','盘锦市|panjinshi|pjs','铁岭市|tielingshi|tls','朝阳市|chaoyangshi|cys','葫芦岛市|huludaoshi|hlds','长春市|changchunshi|ccs','吉林市|jilinshi|jls','四平市|sipingshi|sps','辽源市|liaoyuanshi|lys','通化市|tonghuashi|ths','白山市|baishanshi|bss','松原市|songyuanshi|sys','白城市|baichengshi|bcs','延边朝鲜族自治州|yanbianchaoxianzuzizhizhou|ybcxzzzz','哈尔滨市|haerbinshi|hebs','齐齐哈尔市|qiqihaershi|qqhes','鸡西市|jixishi|jxs','鹤岗市|hegangshi|hgs','双鸭山市|shuangyashanshi|syss','大庆市|daqingshi|dqs','伊春市|yichunshi|ycs','佳木斯市|jiamusishi|jmss','七台河市|qitaiheshi|qths','牡丹江市|mudanjiangshi|mdjs','黑河市|heiheshi|hhs','绥化市|suihuashi|shs','大兴安岭地区|daxinganlingdiqu|dxaldq','上海市|shanghaishi|shs','南京市|nanjingshi|njs','无锡市|wuxishi|wxs','徐州市|xuzhoushi|xzs','常州市|changzhoushi|czs','苏州市|suzhoushi|szs','南通市|nantongshi|nts','连云港市|lianyungangshi|lygs','淮安市|huaianshi|has','盐城市|yanchengshi|ycs','扬州市|yangzhoushi|yzs','镇江市|zhenjiangshi|zjs','泰州市|taizhoushi|tzs','宿迁市|suqianshi|sqs','杭州市|hangzhoushi|hzs','宁波市|ningboshi|nbs','温州市|wenzhoushi|wzs','嘉兴市|jiaxingshi|jxs','湖州市|huzhoushi|hzs','绍兴市|shaoxingshi|sxs','金华市|jinhuashi|jhs','衢州市|?zhoushi|?zs','舟山市|zhoushanshi|zss','台州市|taizhoushi|tzs','丽水市|lishuishi|lss','合肥市|hefeishi|hfs','芜湖市|wuhushi|whs','蚌埠市|bangbushi|bbs','淮南市|huainanshi|hns','马鞍山市|maanshanshi|mass','淮北市|huaibeishi|hbs','铜陵市|tonglingshi|tls','安庆市|anqingshi|aqs','黄山市|huangshanshi|hss','滁州市|chuzhoushi|czs','阜阳市|fuyangshi|fys','宿州市|suzhoushi|szs','巢湖市|chaohushi|chs','六安市|liuanshi|las','亳州市|?zhoushi|?zs','池州市|chizhoushi|czs','宣城市|xuanchengshi|xcs','福州市|fuzhoushi|fzs','厦门市|xiamenshi|xms','莆田市|putianshi|pts','三明市|sanmingshi|sms','泉州市|quanzhoushi|qzs','漳州市|zhangzhoushi|zzs','南平市|nanpingshi|nps','龙岩市|longyanshi|lys','宁德市|ningdeshi|nds','南昌市|nanchangshi|ncs','景德镇市|jingdezhenshi|jdzs','萍乡市|pingxiangshi|pxs','九江市|jiujiangshi|jjs','新余市|xinyushi|xys','鹰潭市|yingtanshi|yts','赣州市|ganzhoushi|gzs','吉安市|jianshi|jas','宜春市|yichunshi|ycs','抚州市|fuzhoushi|fzs','上饶市|shangraoshi|srs','济南市|jinanshi|jns','青岛市|qingdaoshi|qds','淄博市|ziboshi|zbs','枣庄市|zaozhuangshi|zzs','东营市|dongyingshi|dys','烟台市|yantaishi|yts','潍坊市|weifangshi|wfs','济宁市|jiningshi|jns','泰安市|taianshi|tas','威海市|weihaishi|whs','日照市|rizhaoshi|rzs','莱芜市|laiwushi|lws','临沂市|linyishi|lys','德州市|dezhoushi|dzs','聊城市|liaochengshi|lcs','滨州市|binzhoushi|bzs','菏泽市|hezeshi|hzs','郑州市|zhengzhoushi|zzs','开封市|kaifengshi|kfs','洛阳市|luoyangshi|lys','平顶山市|pingdingshanshi|pdss','安阳市|anyangshi|ays','鹤壁市|hebishi|hbs','新乡市|xinxiangshi|xxs','焦作市|jiaozuoshi|jzs','濮阳市|?yangshi|?ys','许昌市|xuchangshi|xcs','漯河市|?heshi|?hs','三门峡市|sanmenxiashi|smxs','南阳市|nanyangshi|nys','商丘市|shangqiushi|sqs','信阳市|xinyangshi|xys','周口市|zhoukoushi|zks','驻马店市|zhumadianshi|zmds','济源市|jiyuanshi|jys','武汉市|wuhanshi|whs','黄石市|huangshishi|hss','十堰市|shiyanshi|sys','宜昌市|yichangshi|ycs','襄阳市|xiangyangshi|xys','鄂州市|ezhoushi|ezs','荆门市|jingmenshi|jms','孝感市|xiaoganshi|xgs','荆州市|jingzhoushi|jzs','黄冈市|huanggangshi|hgs','咸宁市|xianningshi|xns','随州市|suizhoushi|szs','恩施土家族苗族自治州|enshitujiazumiaozuzizhizhou|estjzmzzzz','省直辖县级行政单位|shengzhixiaxianjixingzhengdanwei|szxxjxzdw','长沙市|changshashi|css','株洲市|zhuzhoushi|zzs','湘潭市|xiangtanshi|xts','衡阳市|hengyangshi|hys','邵阳市|shaoyangshi|sys','岳阳市|yueyangshi|yys','常德市|changdeshi|cds','张家界市|zhangjiajieshi|zjjs','益阳市|yiyangshi|yys','郴州市|chenzhoushi|czs','永州市|yongzhoushi|yzs','怀化市|huaihuashi|hhs','娄底市|loudishi|lds','湘西土家族苗族自治州|xiangxitujiazumiaozuzizhizhou|xxtjzmzzzz','广州市|guangzhoushi|gzs','韶关市|shaoguanshi|sgs','深圳市|shen?shi|s?s','珠海市|zhuhaishi|zhs','汕头市|shantoushi|sts','佛山市|foshanshi|fss','江门市|jiangmenshi|jms','湛江市|zhanjiangshi|zjs','茂名市|maomingshi|mms','肇庆市|zhaoqingshi|zqs','惠州市|huizhoushi|hzs','梅州市|meizhoushi|mzs','汕尾市|shanweishi|sws','河源市|heyuanshi|hys','阳江市|yangjiangshi|yjs','清远市|qingyuanshi|qys','东莞市|dong?shi|d?s','中山市|zhongshanshi|zss','潮州市|chaozhoushi|czs','揭阳市|jieyangshi|jys','云浮市|yunfushi|yfs','南宁市|nanningshi|nns','柳州市|liuzhoushi|lzs','桂林市|guilinshi|gls','梧州市|wuzhoushi|wzs','北海市|beihaishi|bhs','防城港市|fangchenggangshi|fcgs','钦州市|qinzhoushi|qzs','贵港市|guigangshi|ggs','玉林市|yulinshi|yls','百色市|baiseshi|bss','贺州市|hezhoushi|hzs','河池市|hechishi|hcs','来宾市|laibinshi|lbs','崇左市|chongzuoshi|czs','海口市|haikoushi|hks','三亚市|sanyashi|sys','省直辖县级行政单位|shengzhixiaxianjixingzhengdanwei|szxxjxzdw','重庆市|zhongqingshi|zqs','成都市|chengdushi|cds','自贡市|zigongshi|zgs','攀枝花市|panzhihuashi|pzhs','泸州市|?zhoushi|?zs','德阳市|deyangshi|dys','绵阳市|mianyangshi|mys','广元市|guangyuanshi|gys','遂宁市|suiningshi|sns','内江市|neijiangshi|njs','乐山市|leshanshi|lss','南充市|nanchongshi|ncs','眉山市|meishanshi|mss','宜宾市|yibinshi|ybs','广安市|guanganshi|gas','达州市|dazhoushi|dzs','雅安市|yaanshi|yas','巴中市|bazhongshi|bzs','资阳市|ziyangshi|zys','阿坝藏族羌族自治州|abacangzuqiangzuzizhizhou|abczqzzzz','甘孜藏族自治州|ganzicangzuzizhizhou|gzczzzz','凉山彝族自治州|liangshanyizuzizhizhou|lsyzzzz','贵阳市|guiyangshi|gys','六盘水市|liupanshuishi|lpss','遵义市|zunyishi|zys','安顺市|anshunshi|ass','铜仁地区|tongrendiqu|trdq','黔西南布依族苗族自治州|qianxinanbuyizumiaozuzizhizhou|qxnbyzmzzzz','毕节地区|bijiediqu|bjdq','黔东南苗族侗族自治州|qiandongnanmiaozudongzuzizhizhou|qdnmzdzzzz','黔南布依族苗族自治州|qiannanbuyizumiaozuzizhizhou|qnbyzmzzzz','昆明市|kunmingshi|kms','曲靖市|qujingshi|qjs','玉溪市|yuxishi|yxs','保山市|baoshanshi|bss','昭通市|zhaotongshi|zts','丽江市|lijiangshi|ljs','普洱市|puershi|pes','临沧市|lincangshi|lcs','楚雄彝族自治州|chuxiongyizuzizhizhou|cxyzzzz','红河哈尼族彝族自治州|honghehanizuyizuzizhizhou|hhhnzyzzzz','文山壮族苗族自治州|wenshanzhuangzumiaozuzizhizhou|wszzmzzzz','西双版纳傣族自治州|xishuangbannadaizuzizhizhou|xsbndzzzz','大理白族自治州|dalibaizuzizhizhou|dlbzzzz','德宏傣族景颇族自治州|dehongdaizujingpozuzizhizhou|dhdzjpzzzz','怒江傈僳族自治州|nujianglisuzuzizhizhou|njlszzzz','迪庆藏族自治州|diqingcangzuzizhizhou|dqczzzz','拉萨市|lasashi|lss','昌都地区|changdudiqu|cddq','山南地区|shannandiqu|sndq','日喀则地区|rikazediqu|rkzdq','那曲地区|naqudiqu|nqdq','阿里地区|alidiqu|aldq','林芝地区|linzhidiqu|lzdq','西安市|xianshi|xas','铜川市|tongchuanshi|tcs','宝鸡市|baojishi|bjs','咸阳市|xianyangshi|xys','渭南市|weinanshi|wns','延安市|yananshi|yas','汉中市|hanzhongshi|hzs','榆林市|yulinshi|yls','安康市|ankangshi|aks','商洛市|shangluoshi|sls','兰州市|lanzhoushi|lzs','嘉峪关市|jiayuguanshi|jygs','金昌市|jinchangshi|jcs','白银市|baiyinshi|bys','天水市|tianshuishi|tss','武威市|wuweishi|wws','张掖市|zhangyeshi|zys','平凉市|pingliangshi|pls','酒泉市|jiuquanshi|jqs','庆阳市|qingyangshi|qys','定西市|dingxishi|dxs','陇南市|longnanshi|lns','临夏回族自治州|linxiahuizuzizhizhou|lxhzzzz','甘南藏族自治州|gannancangzuzizhizhou|gnczzzz','西宁市|xiningshi|xns','海东地区|haidongdiqu|hddq','海北藏族自治州|haibeicangzuzizhizhou|hbczzzz','黄南藏族自治州|huangnancangzuzizhizhou|hnczzzz','海南藏族自治州|hainancangzuzizhizhou|hnczzzz','果洛藏族自治州|guoluocangzuzizhizhou|glczzzz','玉树藏族自治州|yushucangzuzizhizhou|ysczzzz','海西蒙古族藏族自治州|haiximengguzucangzuzizhizhou|hxmgzczzzz','银川市|yinchuanshi|ycs','石嘴山市|shizuishanshi|szss','吴忠市|wuzhongshi|wzs','固原市|guyuanshi|gys','中卫市|zhongweishi|zws','乌鲁木齐市|wulumuqishi|wlmqs','克拉玛依市|kelamayishi|klmys','吐鲁番地区|tulufandiqu|tlfdq','哈密地区|hamidiqu|hmdq','昌吉回族自治州|changjihuizuzizhizhou|cjhzzzz','博尔塔拉蒙古自治州|boertalamengguzizhizhou|betlmgzzz','巴音郭楞蒙古自治州|bayinguolengmengguzizhizhou|byglmgzzz','阿克苏地区|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kezilesukeerkezizizhizhou|kzlskekzzzz','喀什地区|kashidiqu|ksdq','和田地区|hetiandiqu|htdq','伊犁哈萨克自治州|yilihasakezizhizhou|ylhskzzz','塔城地区|tachengdiqu|tcdq','阿勒泰地区|aletaidiqu|altdq','省直辖县级行政单位|shengzhixiaxianjixingzhengdanwei|szxxjxzdw','台湾|taiwan|tw','香港特别行政区|xianggangtebiexingzhengqu|xgtbxzq','澳门特别行政区|aomentebiexingzhengqu|amtbxzq']
;

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */

(function () {
    var citys = Vcity.allCity, match, letter,
        regEx = Vcity.regEx,
        reg2 = /^[a-h]$/i, reg3 = /^[i-p]$/i, reg4 = /^[q-z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},ABCDEFGH:{}, IJKLMNOP:{}, QRSTUVWXYZ:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCDEFGH[letter]) Vcity.oCity.ABCDEFGH[letter] = [];
                Vcity.oCity.ABCDEFGH[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.IJKLMNOP[letter]) Vcity.oCity.IJKLMNOP[letter] = [];
                Vcity.oCity.IJKLMNOP[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.QRSTUVWXYZ[letter]) Vcity.oCity.QRSTUVWXYZ[letter] = [];
                Vcity.oCity.QRSTUVWXYZ[letter].push(match[1]);
            }
            /* 热门城市 前16条 */
            if(i<16){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
            }
        }
    }
})();
/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">热门城市(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>ABCDEFGH</li>',
    '<li>IJKLMNOP</li>',
    '<li>QRSTUVWXYZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
            oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="javascript:">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        Vcity._m.on(this.input,'focus',function(){
            that.input.select();
            if(that.input.value == '城市名') that.input.value = '';
        });
        Vcity._m.on(this.input,'blur',function(){
            if(that.input.value == '') that.input.value = '城市名';
        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到数据 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};