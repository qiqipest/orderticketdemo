jQuery.noConflict();
$extend(Array.prototype, {
    each: function(a) {
        for (var b = 0,
        c = this.length; b < c; b++) if ((a ? a(this[b], b) : this[b]()) === !1) return ! 1;
        return ! 0
    },
    random: function() {
        if (!this.length) return null;
        return this[Math.floor(Math.random() * this.length)]
    },
    randomize: function() {
        for (var a = 0,
        b = this.length; a < b; ++a) {
            var c = Math.floor(Math.random() * b),
            d = this[a];
            this[a] = this[c];
            this[c] = d
        }
        return this
    },
    map: Array.prototype.map ||
    function(a) {
        for (var b = [], c = 0, d = this.length; c < d; c++) b.push(a(this[c], c));
        return b
    },
    indexOf: function(a) {
        for (var b = 0,
        c = this.length; b < c; b++) if (this[b] === a) return b;
        return - 1
    },
    remove: function(a) {
        a = this.indexOf(a);
        a >= 0 && this.splice(a, 1)
    }
});
$extend(String.prototype, {
    replaceWith: function(a) {
        return this.replace(/\{\$(\w+)\}/g,
        function(b, c) {
            return c in a ? a[c] : b
        })
    },
    trim: function() {
        return this.replace(/^\s+|\s+$/g, "")
    },
    isEmail: function() {
        return /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/.test(this)
    },
    isDateTime: function(a) {
        a = a === !1 ? this: this.parseStdDate(!1);
        if (!a) return ! 1;
        a = a.match(/^((19|20)\d{2})-(\d{1,2})-(\d{1,2})$/);
        if (!a) return ! 1;
        for (var b = 1; b < 5; b++) a[b] = parseInt(a[b], 10);
        if (a[3] < 1 || a[3] > 12 || a[4] < 1 || a[4] > 31) return ! 1;
        b = new Date(a[1], a[3] - 1, a[4]);
        return b.getDate() == a[4] ? b: null
    },
    toReString: function() {
        return this.replace(/([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g, "\\$1")
    },
    isChinaIDCard: function() {
        var a = this.toLowerCase().match(/\w/g);
        if (this.match(/^\d{17}[\dx]$/i)) {
            for (var b = 0,
            c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], d = 0; d < 17; d++) b += parseInt(a[d], 10) * c[d];
            if ("10x98765432".charAt(b % 11) != a[17]) return ! 1;
            return !! this.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3").isDateTime()
        }
        if (this.match(/^\d{15}$/)) return !! this.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3").isDateTime();
        return ! 1
    },
    parseStdDate: function(a) {
        var b = this.replace(/[ \-,\.\/]+/g, "-").replace(/(^|-)0+(?=\d+)/g, "$1");
        $$.status.version == "en" && (b = b.replace(/[a-z]{3,}/i,
        function(a) {
            return (_t_re = "January|1@February|2@March|3@April|4@May|5@June|6@July|7@August|8@September|9@October|10@November|11@December|12".match(RegExp("(^|@)" + a + "[^\\|]*\\|(\\d+)", "i"))) ? _t_re[2] : a
        }));
        b = b.replace(/^([^-]{1,2}-[^-]{1,2})-([^-]{4})$/, "$2-$1");
        return a === !1 || b.isDateTime(!1) ? b: null
    },
    parseEngDate: function() {
        var a = this.parseStdDate();
        if (!a) return null;
        a = a.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        return "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec".split("|")[parseInt(a[2]) - 1] + "-" + a[3] + "-" + a[1]
    }
});
function $isEmptyObj(a) {
    for (var b in a) return ! 1;
    return ! 0
}
function $doNothing() {}
function $type(a) {
    if (a === null) return "null";
    else {
        var b = Object.prototype.toString.call(a).slice(8, -1);
        return "Array Boolean Date RegExp String Number Function".indexOf(b) >= 0 ? b.toLowerCase() : typeof a
    }
}
//��ʾλ��
function $viewSize(a) {
    var a = a.ownerDocument || document,
    b = a.parentWindow || a.defaultView,
    c = a.documentElement;
    return {
        scrollLeft: b.pageXOffset || c.scrollLeft || a.body.scrollLeft || 0,
        scrollTop: b.pageYOffset || c.scrollTop || a.body.scrollTop || 0,
        clientTop: c.clientTop || 0,
        clientLeft: c.clientLeft || 0
    }
}
function $pageSize(a) {
    var b = {
        docWidth: ___.scrollWidth,
        docHeight: ___.scrollHeight,
        winWidth: ___.clientWidth,
        winHeight: ___.clientHeight,
        scrollLeft: $$.browser.WebKit ? __.body.scrollLeft: ___.scrollLeft,
        scrollTop: $$.browser.WebKit ? __.body.scrollTop: ___.scrollTop
    };
    if ($$.browser.WebKit) {
        var c = ___.$getStyle();
        b.docWidth += parseInt(c.marginLeft) + parseInt(c.marginRight);
        b.docHeight += parseInt(c.marginTop) + parseInt(c.marginBottom)
    }
    b.docWidth = Math.max(b.docWidth, b.winWidth);
    b.docHeight = Math.max(b.docHeight, b.winHeight);
    if (a) {
        var a = a == "win",
        d = $$.support.testIEZoom();
        b.left = a ? b.scrollLeft: 0;
        b.top = a ? b.scrollTop: 0;
        $$.browser.Moz && (c = ___.$getStyle(), b.left -= parseInt(c.borderLeftWidth) + parseInt(c.marginLeft), b.top -= parseInt(c.borderTopWidth) + parseInt(c.marginTop));
        b.width = a ? Math.round(b.winWidth / d) : Math.max(b.docWidth, b.winWidth);
        b.height = a ? Math.round(b.winHeight / d) : Math.max(b.docHeight, b.winHeight)
    }
    return b
}
function $fixE(a) {
	
    a = _.event || a;
    if (!a.target) a.target = a.srcElement || __;
    if (a.target.nodeType === 3) a.target = a.target.parentNode;
    if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement: a.fromElement;
    if (a.pageX == null && a.clientX != null) {
        var b = __.body;
        a.pageX = a.clientX + (___ && ___.scrollLeft || b && b.scrollLeft || 0) - (___ && ___.clientLeft || b && b.clientLeft || 0);
        a.pageY = a.clientY + (___ && ___.scrollTop || b && b.scrollTop || 0) - (___ && ___.clientTop || b && b.clientTop || 0)
    }
    a.$target = $(a.target);
	
    return a
}
var $contains = __.compareDocumentPosition ?
function(a, b) {
    return a == b || !!(a.compareDocumentPosition(b) & 16)
}: function(a, b) {
    return a.contains ? a.contains(b) : !0
};
function $c(a) {
    return a.constructor == Array ? $(__.createTextNode(a.join("\n"))) : $(__.createElement(a))
}
function $pageValue() {
    return $pageValue.get.apply(_, arguments)
}

function $stopEvent(a, b) {
    a = $fixE(a);
    b = b || 0;
    if (b >= 0) a.preventDefault ? a.stopPropagation() : a.cancelBubble = !0;
    if (b != 0) a.preventDefault ? a.preventDefault() : a.returnValue = !1
}
function $getUid() {
    return "uid_" + (new Date).getTime() + Math.random().toString().substr(2, 5)
}

var $createElement = $c;
function $toJson(a) {
    if (a === null) return "null";
    if ($isUndefined(a)) return "undefined";
    switch (a.constructor) {
    case Object:
        var b = [],
        c;
        for (c in a) b.push($toJson(c) + ":" + $toJson(a[c]));
        return "{" + b.join(",") + "}";
    case Array:
        return "[" + a.map(function(a) {
            return $toJson(a)
        }).join(",") + "]";
    case String:
        return '"' + a.replace(/([\n\r\\\/\'\"])/g,
        function(a) {
            return {
                "\n": "\\n",
                "\r": "\\r"
            } [a] || "\\" + a
        }) + '"';
    case Date:
        return "new Date(" + a.getTime() + ")";
    case Number:
    case Boolean:
    case Function:
    case RegExp:
        return a.toString();
    default:
        return "null"
    }
}
function $fromJson(a) {
    var b;
    try {
        b = eval("(" + a + ")")
    } catch(c) {}
    return b
}

$pageValue.set = function(a, b) {
    $$.status.pageValue.data[a] = b;
    $$.browser.Opera && $savePageValue()
};
$pageValue.get = function(a) {
    var b = $$.status.pageValue.data;
    return b && a in b ? b[a] : null
};
$pageValue.del = function(a) {
    delete $$.status.pageValue.data[a];
    $$.browser.Opera && $savePageValue()
};
function $savePageValue() {
    $$.status.saveStatus.value = $toJson($$.status.pageValue)
}
function $globalValue() {}
function $getQuery(a) {
    return (a = (location.search || "").match(RegExp("[\\?&]" + a + "=([^&]+)", "i"))) ? unescape(a[1]) : null
}
function $loadCss(a, b) {
    if ($$.browser.IE) __.createStyleSheet(a).charset = b || _.$$.status.charset;
    else {
        var c = _.__.createElement("link");
        with(c) type = "text/css",
        rel = "stylesheet",
        href = a;
        __.$("head")[0].appendChild(c)
    }
}
$$.cookie = {};
function $delCookie(a, b) {
    if (b) {
        var c = $getCookie(a, !1);
        if (c === null) return;
        if (c = c.replace(RegExp("(^|&)\\s*" + encodeURIComponent(b) + "=[^&]+"), "").replace(/^\s*&/, "")) {
            __.cookie = encodeURIComponent(a) + "=" + c;
            return
        }
    }
    c = new Date;
    c.setTime(c.getTime() - 1);
    __.cookie = encodeURIComponent(a) + "=;expires=" + c.toGMTString()
}
function $setCookie(a, b, c) {
    c || (c = b, b = null);
    var d = ($$.cookie.domain ? "; domain=" + $$.cookie.domain: "") + "; path=" + ($$.cookie.path || "/") + ($$.cookie.expires ? "; expires=" + (new Date((new Date).getTime() + $$.cookie.expires * 36E5)).toGMTString() : "");
    if (b) {
        var f = $getCookie(a, !1) || "";
        f && (f = (f + "&").replace(RegExp("(^|&)\\s*" + encodeURIComponent(b) + "=[^&]+&"), "$1"));
        __.cookie = encodeURIComponent(a) + "=" + f + encodeURIComponent(b) + "=" + encodeURIComponent(c) + d
    } else __.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(c) + d
}
function $getCookie(a, b) {
    var c = __.cookie.match(RegExp("(?:^|;)\\s*" + encodeURIComponent(a) + "=([^;]+)"));
    if (b === !1) return c ? c[1] : null;
    c && b && (c = c[1].match(RegExp("(?:^|&)\\s*" + encodeURIComponent(b) + "=([^&]+)")));
    return c ? decodeURIComponent(c[1]) : null
}
function $parserRe(a) {
    var b = [],
    c = /\sid=['"]?([^\s>'"]+)/i,
    d = null,
    f = null; (a && a.innerHTML ? a: __.body).innerHTML.replace(/<[^>]+\smod=['"]?([\w|]+)[^>]+/g,
    function(g, p) {
        try {
            if (p.toLowerCase() !== "jmpinfo" && (d = g.match(c)) && (f = $(d[1]))) p in Ctrip.module ? new Ctrip.module[p](f) : b.push(f)
        } catch(m) {
            $t("parserRe Error", [func, a])
        }
        return ""
    });
    var g = setInterval(function() {
        var a = b.shift();
        a ? $topWin.$d(a) : clearInterval(g)
    },
    50)
}
$$.module.queue = {};
function $d(a) { ($(a).getAttribute("mod") || "").replace(/\w+/ig,
    function(b) {
        Ctrip.module[b] ? new Ctrip.module[b](a) : $isUndefined($$.module.queue[b]) ? $$.module.queue[b] = [a] : $$.module.queue[b].push(a)
    })
}
var $dealElement = $d;
function $t(a, b) {
    typeof console !== "undefined" && console.error(typeof a === "string" ? a: a.message, b)
}

$$.access = {
    cache: {},
    uuid: 0,
    expando: "Tuna" + new Date * 1
};
var $data = function(a) {
    return {
        set: function(b, c, d) {
            var f = b[a.expando],
            g = $type(c);
            f || (b[a.expando] = f = ++a.uuid, a.cache[f] = {});
            if (g === "object") $extend(a.cache[f], c);
            else if (g === "string") a.cache[f][c] = d == null ? null: d;
            else return ! 1;
            return ! 0
        },
        get: function(b, c) {
            var d = b[a.expando];
            if (!d) return null;
            d = a.cache[d];
            return $isUndefined(c) ? d: d[c]
        },
        remove: function(b, c) {
            var d = b[a.expando];
            if (d) {
                var f = a.cache[d];
                $isUndefined(c) ? (delete f, a.cache[d] = {}) : delete f[c]
            }
            return ! 0
        }
    }
} ($$.access);
function $fixElement(a) {
    function b(a, b, c) {
        "attachEvent" in a ? a.attachEvent("on" + b, c) : a.addEventListener(b, c)
    }
    function c(a) {
        for (var a = a.getElementsByTagName("input"), b = 0; b < a.length; b++) if (/checkbox|radio/.test(a[b].type)) return a[b];
        return null
    }
    a = a && a.nodeType ? a: _.__;
    if ($$.browser.IE6) {
        var d = a.getElementsByTagName("label");
        for (i = 0; i < d.length; i++) {
            var f = c(d[i]);
            f && /checkbox|radio/.test(f.type) &&
            function(a, c) {
                a._for = c;
                b(a, "mouseover",
                function() {
                    var b = a._for;
                    if (b) a.htmlFor = b.id || (b.id = $getUid()),
                    a._for = null;
                    b = a.style;
                    b.borderBottom = "#aaa 1px dashed";
                    b.paddingBottom = "0px";
                    b.color = "#1E1A75"
                });
                b(a, "mouseout",
                function() {
                    var b = a.style;
                    b.borderBottom = "";
                    b.paddingBottom = "";
                    b.color = ""
                })
            } (d[i], f)
        }
    }
    if ($$.browser.IE) {
        a = a.getElementsByTagName("select");
        for (i = 0; i < a.length; i++) a[i].onmousewheel = function() {
            return ! 1
        }
    }
}
function $removeTextNode(a) {
    if (a) {
        for (var b = a.firstChild,
        c; b;) c = b.nextSibling,
        b.nodeType == 3 ? b.nodeValue.trim() || a.removeChild(b) : $removeTextNode(b),
        b = c;
        return a
    }
}

function $alert(a, b, c, d, f) {
    function g() {
        a.className = a.className.replace("pubGlobal_checkinfo_input01", "");
        $topWin.$$.status.alertDiv.style.display = "none";
        $topWin.$$.status.alertDiv.$clearIframe();
        a.$ur("onblur", g);
        __.body.$ur("onmousedown", g);
        a.clearAlert = null;
        $alert.element = null
    }
    var a = $(a),
    j = $("alertInfo");
    $("alertTable");
    var p = 1;
    j.innerHTML = b;
    $topWin.$$.status.alertDiv.style.display = "";
    $topWin.$$.status.alertDiv.$setPos(a, d || "tl", f || "tr");
    $topWin.$$.status.alertDiv.$setIframe();
    a.className += " pubGlobal_checkinfo_input01";
    c !== !1 && a.$setDisplay();
    a.disabled ? p = 0 : setTimeout(function() {
        try {
            a.focus()
        } catch(b) {
            p = 0
        }
    },
    0);
    p ? a.$r("onblur", g) : __.body.$r("onmousedown", g);
    $alert.element = a;
    a.clearAlert = g
}
function $toQuery(a, b) {
    var c = [],
    d;
    for (d in a) a.hasOwnProperty(d) && c.push([d, b ? b(a[d]) : a[d]].join("="));
    return c.join("&")
}
function $fromQuery(a, b) {
    for (var c = a.split("&"), d = {},
    f = 0; f < c.length; f++) {
        var g = c[f].split("=");
        g.length > 1 && (d[g[0]] = b ? b(g.slice(1).join("=")) : g.slice(1).join("="))
    }
    return d
}
function $trackEvent(a, b, c, d) {
    var f = arguments.callee._cnt || (arguments.callee._cnt = {
        tuna_total: 0,
        other_total: 0
    });
    if (! (f.other_total >= 80)) {++f.other_total;
        var f = ["http://www.", /\.ctrip\.com$/.test(document.domain) ? "ctrip": "dev.sh.ctriptravel", ".com/rp/uiServer2.asp"].join(""),
        g = $toQuery({
            action: "event",
            p: window.UIMonitor2 && window.UIMonitor2.bi && window.UIMonitor2.bi.pageview_id || "",
            u: document.URL,
            c: a,
            l: c,
            a: b,
            v: d,
            t: new Date * 1
        },
        function(a) {
            return encodeURIComponent(escape(a))
        }); (new Image).src = f + "?" + g
    }
}

var DOM = function() {
    function a(a) {
        return function(b) {
            for (var b = $fixE(b), c = a.module.event[b.type], d, f = 0; f < c.length; f++) if (c[f].enabled) try {
                if (d = c[f].func.call(a, b), d === !1) break
            } catch(h) {
                $t(h, [c[f].func, a])
            } else c.splice(f, 1),
            f--;
            return d
        }
    }
    function b() {
        var a = $pageSize("win");
        a.right = a.left + a.width;
        a.bottom = a.top + a.height;
        return a
    }
    function c(a, b) {
        for (var c = [], d = 0, f = a.length; d < f; d++) {
            var h;
            h = " " + b + " ";
            h = (" " + a[d].className + " ").replace(/[\n\t]/g, " ").indexOf(h) > -1 ? !0 : !1;
            h && (c[c.length] = a[d])
        }
        return c
    }
    function d(a, b, c) {
        if (!a) return null;
        b = b || "n";
        return b.match(RegExp({
            1 : "n",
            3 : "t",
            8 : "c"
        } [a.nodeType] || "o", "i")) ? a: c.call(a, b)
    }
    if (!this || this.nodeType === 3 || this.$) return this;
    if (this != _) this.module = {},
    this.module.event = {};
    var f = /^[\.#]?[^\.#]+/;
    this.$ = this.__ ?
    function(a, b) {
        if (typeof a == "object") return DOM.apply(a);
        var c;
        if (b) {
            var d = ___.innerHTML.match(RegExp("\\sid=([\\'\\\"]?)([\\w$]+?[_$]" + a.toReString() + ")\\1"), "g");
            if (d) for (var f = 0; f < d.length; f++) if (c = $(d[f])) return c;
            return $(a)
        } else c = __.getElementById(a);
        return c ? $(c) : null
    }: function(a) {
        var b = this.getElementsByTagName(a);
        b.$each = function(a) {
            var c;
            if ($isUndefined(b.length)) a.call(this, b, 0);
            else for (var g = 0; g < b.length && (c = a.call(this, b[g], g)) !== !1; g++);
            return c === !1 ? 0 : 1
        };
        for (a = 0; a < b.length; a++) $(b[a]);
        return b
    };
    if (this.nodeType == 1) {
        if (this.tagName == "INPUT" && /^(text|hidden)$/i.test(this.type) || this.tagName == "TEXTAREA") this.isNull = function() {
			
            return ! this.value.trim()
        };
        if (/^SELECT$/.test(this.tagName)) this.$setValue = function(a) {
            for (var b = 0; b < this.options.length; b++) if (this.options[b].value == a) return this.selectedIndex = b,
            !0;
            return ! 1
        }
    }
    if (!this.hasAttribute) this.hasAttribute = function(a) {
        return ! $isUndefined(this.attributes[a])
    };
    this.$parentNode = function(a) {
        var b = $(this.parentNode);
        a && b && b.tagName && b.tagName.toLowerCase() != a.toLowerCase() && (b = b.$parentNode(a));
        return b && b.tagName ? b: null
    };
    this.$firstChild = function() {
        return $(this.firstChild)
    };
    this.$lastChild = function() {
        return $(this.lastChild)
    };
    this.$childNodes = function() {
        for (var a = this.childNodes,
        b = 0; b < a.length; b++) $(a[b]);
        return a
    };
    this.$nSib = this.$nextSibling = function() {
        return $(this.nextSibling)
    };
    this.$pSib = this.$previousSibling = function() {
        return $(this.previousSibling)
    };
    this.$click = function() {
        if (this.click) this.click();
        else {
            var a = __.createEvent("MouseEvents");
            a.initMouseEvent("click", !0, !0, _, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, this);
            this.dispatchEvent(a)
        }
    };
    this.$getStyle = function(a) {
        var b = this.currentStyle || _.getComputedStyle(this, null);
        return a ? b[a] : b
    };
    this.$getPara = function() {
        var a, b = (a = this.getAttribute(arguments[0]) || "").split(a.indexOf("\u000c") > -1 ? "\u000c": "|");
        for (a = 0; a < Math.max(arguments.length - 1, b.length); a++) b[a] = b[a] || arguments[a + 1] || "";
        return b
    };
    this.$r = this.$regEvent = function(b, c, d, f) {
        f = f || 50;
        arguments.length == 3 && typeof d == "number" && (f = d, d = null);
        var n = this;
        b.constructor != Array && (b = [b]);
        c.constructor != Array && (c = [c]);
        b.each(function(b) {
            c.each(function(c) {
                b = b.replace(/^(on)?/i, "");
                b = b == "DOMContentLoaded" ? "domready": b.toLowerCase();
                b == "domready" && (n = _);
                var g = {
                    enabled: !0,
                    obj: n,
                    event: b,
                    func: c,
                    hash: d,
                    level: f,
                    id: _.$$.status.regEventCount++
                };
                b == "domready" && $$.status.domReady || b == "load" && (n == _ || n == __.body) && $$.status.load ? c() : (b in n.module.event || (n.module.event[b] = [], n.attachEvent ? n.attachEvent("on" + b, a(n)) : n.addEventListener(b, a(n), !1)), n.module.event[b].push(g), n.module.event[b].sort(function(a, b) {
																																																																														 			
                    return a.level - b.level || a.id - b.id
                }));
                d && (d in $$.status.regEventHash || ($$.status.regEventHash[d] = []), $$.status.regEventHash[d].push(g))
            })
        })
    };
    this.$ur = this.$unregEvent = function(b, c, d) {
        var f = this;
        b.constructor != Array && (b = [b]);
        c.constructor != Array && (c = [c]);
        b.each(function(b) {
            c.each(function(c) {
                b = b.replace(/^(on)?/i, "");
                b = b == "DOMContentLoaded" ? "domready": b.toLowerCase();
                b == "domready" && (f = _);
                if (b in f.module.event) {
                    for (var g = f.module.event[b], j = 0; j < g.length; j++) if (g[j].enabled && g[j].func == c && (!d || g[j].hash == d)) {
                        g[j].enabled = !1;
                        break
                    }
                    g.length || (delete f.module.event[b], f.detachEvent ? f.detachEvent(b, a) : f.removeEventListener(b, a, !1))
                }
            })
        })
    };
    this.$urh = this.$unregEventHash = function(a) {
        if (a in $$.status.regEventHash) {
            for (var b = $$.status.regEventHash[a], c; c = b.shift();) c.obj.$ur(c.event, c.func, a);
            delete $$.status.regEventHash[a]
        }
    };
    this.$getWin = function() {
        var a = this.ownerDocument,
        a = a.parentWindow || a.defaultView;
        return a == window && a !== window ? window: a
    };
    this.$getEl = function(a) {
        a || (a = "");
        var b = arguments[1],
        d = f.exec(a);
        if (!d) {
            if (!b) return null;
            for (var m = [], n = 0, h = b.length; n < h; n++) m[m.length] = $(b[n]);
            return m.length ? m: null
        }
        var h = d[0],
        n = h.substring(1),
        d = a.replace(h, ""),
        q = h.substring(0, 1),
        r = this;
        if (b) if (q === ".") m = c(b, n);
        else {
            q = $(n);
            n = 0;
            for (h = b.length; n < h; n++) b[n] === q && (m = [q])
        } else if (r = r.nodeName ? r: __, q === ".") {
            b = r.getElementsByTagName("*");
            if (!b) return null;
            m = c(b, n)
        } else m = q === "#" ? (q = $(n)) ? [q] : null: r.getElementsByTagName(h);
        if (!m || !m.length) return null;
        return arguments.callee(d, m)
    };
    this.$g = this.$selNode = function(a) {
        function b(a, c) {
            var d = [],
            g = a.match(/^([\.\#]*)([a-zA-Z0-9\-_*]+)(.*)$/i),
            f;
            if (!g) return [];
            if (g[1] == "#")(f = $(g[2])) && d.push(f);
            else if (g[1] == ".") c.each(function(a) {
                a.$("*").$each(function(a) {
                    RegExp("\\b" + g[2] + "\\b").test(a.className) && d.push($(a))
                })
            });
            else for (var v = 0; v < c.length; v++) if (f = c[v].$(g[2])) for (var w = 0; w < f.length; w++) d.push(f[w]);
            g[3].replace(/\[([^!=]+)(=|!=)([^\]]*)\]/gi,
            function(a, b, c, g) {
                a = d.slice(0);
                d = [];
                a.each(function(a) {
                    b = {
                        "class": "className",
                        "for": "htmlFor"
                    } [b] || b;
                    var h = a[b] || a.getAttribute(b),
                    h = b == "className" ? RegExp("\\b" + g + "\\b").test(h) : h == g;
                    c == "=" == h && d.push($(a))
                })
            });
            return d
        }
        var c = [this == _ ? _.__.body: this],
        d = [],
        f = [];
        a.replace(/[^\[,]([^\[,]*(\[[^\]]*\])*)+/g,
        function(a) {
            var g = c.slice(0);
            a.replace(/(#|\*)/gi, " $1").replace(/([^\^ ])\.(\w+)/gi, "$1[className=$2]").trim().split(/\s+/g).each(function(a) {
                g = b(a, g)
            });
            d = d.concat(g)
        });
        d.each(function(a) {
            if (!a.__selNodeFlag__) a.__selNodeFlag__ = !0,
            f.push(a)
        });
        f.each(function(a) {
            a.__selNodeFlag__ = !1;
            a.hasAttribute("__selNodeFlag__") && a.removeAttribute("__selNodeFlag__")
        });
        return f.length == 0 ? null: f
    };
    this.$getPos = function() {
        var a = this.$getWin();
        if (a == $topWin) return $offset(this);
        for (var b = $offsetWin(this), c = []; a != $topWin;) {
            if (a.parent != $topWin) c = $offsetWin(a.frameElement);
            else {
                var c = $(a.frameElement),
                d = c.ownerDocument,
                d = d.defaultView ? d.defaultView.getComputedStyle(c, null) : c.currentStyle,
                f = {
                    thin: 2,
                    medium: 4,
                    thick: 6
                },
                c = $offset(c);
                if (!/^none|hidden$/i.test(d.borderLeftStyle)) {
                    var h = d.borderLeftWidth;
                    c[0] += f[h] || parseFloat(h) || 0
                }
                if (!/^none|hidden$/i.test(d.borderTopStyle)) h = d.borderTopWidth,
                c[1] += f[h] || parseFloat(h) || 0;
                $$.browser.IE || (c[0] += parseFloat(d.paddingLeft), c[1] += parseFloat(d.paddingTop))
            }
            b[0] += c[0];
            b[1] += c[1];
            a = a.parent
        }
        return b
    };
    this.$setPos = function(a, c, d) {
        function f(b, v) {
            function q(a, b, c, d) {
                return c + {
                    l: 0,
                    c: b.offsetWidth / 2,
                    r: b.offsetWidth,
                    t: 0,
                    m: b.offsetHeight / 2,
                    b: b.offsetHeight
                } [a || "l"] * d
            }
            return q(c.match(b), this, q(d.match(b), a, h[v], 1), -1) + "px"
        }
        var n = !1,
        h = a.$getPos();
        c === "auto" ? (c = "lt", d = "lb", n = !0) : (c || (c = "lt"), d || (d = "lb"));
        if (n) {
            var n = b(),
            q = {
                x: a.offsetWidth,
                y: a.offsetHeight
            },
            r = {
                x: this.offsetWidth,
                y: this.offsetHeight
            },
            s = (c + d).split("");
            h[0] + r.x > n.right && h[0] + q.x - r.x >= n.left && (s[0] = "r", s[2] = "r");
            h[1] + q.y + r.y > n.bottom && h[1] - r.y >= n.top && (s[1] = "b", s[3] = "t");
            c = s.slice(0, -2).join("");
            d = s.slice(2).join("")
        }
        this.style.left = f.call(this, /[lcr]/i, 0);
        this.style.top = f.call(this, /[tmb]/i, 1)
    };
    this.$setIframe = function(a) {
        if (a === !0 || $$.browser.IE6) {
            if (this.module.iframe) a = this.module.iframe;
            else {
                a = function() {
                    for (var a = 0; a < $topWin.$$.module.iframe.length; a++) if ($topWin.$$.module.iframe[a].$getStyle("display") == "none") return $topWin.$$.module.iframe[a]
                } ();
                if (!a) {
                    a = $topWin.$c("iframe");
                    with(a.style) width = height = "0px",
                    background = "#FFF",
                    position = "absolute",
                    display = "none",
                    zIndex = 100;
                    a.frameBorder = 0;
                    a.id = a.name = $getUid();
                    $topWin.$$.status.container.appendChild(a);
                    $topWin.$$.module.iframe.push(a);
                    with($topWin.frames[a.id].document) open(),
                    write("<style>html,body{overflow:hidden}</style>"),
                    close()
                }
                this.module.iframe = a
            }
            a.$setPos(this, "tl", "tl");
            with(a.style) width = this.offsetWidth + "px",
            height = this.offsetHeight + "px",
            display = "";
            return a
        }
    };
    this.$clearIframe = function() {
        var a = this.module.iframe;
        if (a) a.style.display = "none",
        this.module.iframe = null;
        return a
    };
    this.$nAbs = function(a) {
        var b = this,
        c = b.firstChild || b.nextSibling;
        if (!c) {
            do {
                b = b.parentNode;
                if (b == __.body) return null;
                c = b.nextSibling
            } while (! c )
        }
        return $(d(c, a, arguments.callee))
    };
    this.$pAbs = function(a) {
        if (this == __.body) return null;
        var b = this.previousSibling;
        if (b) for (; b.lastChild;) b = b.lastChild;
        else b = this.parentNode;
        return $(d(b, a, arguments.callee))
    };
    this.$focusNext = function() {
        if (this.form) {
            try {
                this.blur()
            } catch(a) {}
            for (var b = this.form.elements,
            c, d = 0; d < b.length; d++) {
                if (c && !$(b[d]).disabled && b[d].$isDisplay()) try {
                    b[d].focus();
                    break
                } catch(f) {}
                b[d] == this && (c = !0)
            }
        }
    };
    this.$setDisplay = function() {
        var a = this.$getPos();
        with($topWin.___) scrollLeft = a[0] - 80,
        scrollTop = a[1] - 80
    };
    this.$isDisplay = function() {
        var a = this;
        do
        if (a.tagName == "INPUT" && a.type == "hidden" || a.$getStyle("display") == "none" || a.$getStyle("visibility") == "hidden") return ! 1;
        while ((a = a.$parentNode()) && a.nodeType == 1);
        return ! 0
    };
    this.$setData = function(a, b) {
        return $data.set(this, a, b)
    };
    this.$getData = function(a) {
        return $data.get(this, a)
    };
    this.$removeData = function(a) {
        return $data.remove(this, a)
    };
    this.$getModAttrs = function(a) {
        return Ctrip.support.getModAttrs(this, a)
    };
    this.$isMod = function(a) {
        return Ctrip.support.isMod(this, a)
    };
    return this
};
DOM.apply(_);
DOM.apply(__);
DOM.apply(___);
DOM.apply($$.status.alertDiv);
$$.support = {
    testCss: function() {
        var a = __.body,
        b = $c("div"),
        c,
        d,
        f,
        g = parseFloat($(a).$getStyle("marginTop")) || 0;
        b.style.cssText = "position:absolute; top: 0; left: 0; margin: 0; border: 0; width: 1px; height: 1px; visibility: hidden;";
        b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        a.insertBefore(b, a.firstChild);
        c = b.firstChild;
        d = c.firstChild;
        f = c.nextSibling.firstChild.firstChild;
        this.doesNotAddBorder = d.offsetTop !== 5;
        this.doesAddBorderForTableAndCells = f.offsetTop === 5;
        d.style.position = "fixed";
        d.style.top = "20px";
        this.supportsFixedPosition = d.offsetTop === 20 || d.offsetTop === 15;
        d.style.position = d.style.top = "";
        c.style.overflow = "hidden";
        c.style.position = "relative";
        this.subtractsBorderForOverflowNotVisible = d.offsetTop === -5;
        this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== g;
        a.removeChild(b);
        this.testCss = $doNothing
    },
    testIEZoom: function() {
        if (!$$.browser.IE7) return 1;
        var a = $$.support.zoomTester;
        if (!a) {
            var a = __.body,
            a = $$.status.container || a,
            b = __.createElement("div");
            b.style.cssText = "position:absolute;left:-10000px;top:-10000px;width:100px;height:100px;";
            a.appendChild(b);
            a = this.zoomTester = b
        }
        a = a.getBoundingClientRect();
        return (a.right - a.left) / 100 || 1
    },
    zoomTester: null
};
Ctrip.support = function() {
    return {
        getModAttrs: function(a, b) {
            for (var c = {},
            d = b.length; d--;) c[b[d].replace(/([^_]+_){1,2}/, "")] = a.getAttribute(b[d]);
            return c
        },
        isMod: function(a, b) {
            var c = a.getAttribute("mod");
            if (!c) return ! 1;
            if (!b) return ! 0;
            return RegExp("(||^)" + b.toLowerCase() + "(||$)", "i").test(c.toLowerCase())
        }
    }
} ();
var $offsetWin, $offset;
"getBoundingClientRect" in ___ ? ($offsetWin = function(a) {
    var b = [0, 0],
    c = a.ownerDocument,
    d = $$.support.testIEZoom();
    c && $contains(c.documentElement, a) && (a = a.getBoundingClientRect(), b[0] = Math.round(a.left / d), b[1] = Math.round(a.top / d));
    return b
},
$offset = function(a) {
    if (!a) return null;
    var b = [0, 0],
    c = $viewSize(a),
    a = $offsetWin(a),
    d = $$.support.testIEZoom();
    b[1] = a[1] + Math.round((c.scrollTop - c.clientTop) / d);
    b[0] = a[0] + Math.round((c.scrollLeft - c.clientLeft) / d);
    return b
}) : ($offset = function(a) {
    if (!a) return null;
    $$.support.testCss();
    var b = a.ownerDocument,
    c = b.documentElement,
    d = [a.offsetLeft, a.offsetTop],
    f = a.offsetParent,
    g;
    g = b.defaultView ? b.defaultView.getComputedStyle(a, null) : a.currentStyle;
    for (var j = $$.support,
    p = /^t(?:able|d|h)$/i; (a = a.parentNode) && a !== b.body && a !== c;) {
        if (j.supportsFixedPosition && g.position === "fixed") break;
        g = b.defaultView ? b.defaultView.getComputedStyle(a, null) : a.currentStyle;
        d[0] -= a.scrollLeft;
        d[1] -= a.scrollTop;
        if (a === f) {
            d[0] += a.offsetLeft;
            d[1] += a.offsetTop;
            if (j.doesNotAddBorder && (!j.doesAddBorderForTableAndCells || !p.test(a.nodeName))) d[1] += parseFloat(g.borderTopWidth) || 0,
            d[0] += parseFloat(g.borderLeftWidth) || 0;
            f = a.offsetParent
        }
        j.subtractsBorderForOverflowNotVisible && g.overflow !== "visible" && (d[1] += parseFloat(g.borderTopWidth) || 0, d[0] += parseFloat(g.borderLeftWidth) || 0)
    }
    if (g.position === "relative" || g.position === "static") d[1] += b.body.offsetTop,
    d[0] += b.body.offsetLeft;
    return d
},
$offsetWin = function(a) {
    var b = [0, 0],
    c = $viewSize(a),
    a = $offset(a);
    b[1] = a[1] - c.scrollTop + c.clientTop;
    b[0] = a[0] - c.scrollLeft + c.clientLeft;
    return b
});
Ctrip.module.recommend = function(a) {
    function b(a) {
        var b = ++p,
        f = a.innerHTML.trim(),
        a = a.getAttribute("page");
        d.innerHTML = f;
        var m = 'if(typeof(SetLink)=="function"){SetLink(setlink_isbig5, \'' + c + "Panel');}";
        f in j ? (g.innerHTML = j[f], eval(m)) : (g.innerHTML = '<div class="pic_loading"></div>', $ajax(a, null,
        function(a) {
            if (p == b && a !== !1) j[f] = g.innerHTML = a,
            eval(m)
        }))
    }
    var c = a.id,
    d = $(c + "Txt"),
    f = $(c + "Div"),
    g = $(c + "Panel");
    if (d && f && g) {
        var j = {};
        j[d.innerHTML.trim()] = g.innerHTML;
        var p = 0;
        a.hideFocus = !0;
        a.style.outline = "none";
        var m = !1;
        a.$r("focus",
        function() {
            m = !0;
            a.className = "choice_focus";
            f.style.display = ""
        });
        a.$r("blur",
        function() {
            m = !1;
            a.className = "choice_more";
            f.style.display = "none"
        });
        a.$r("mousedown",
        function() {
            m ? setTimeout(function() {
                a.blur()
            }) : ($$.browser.Safari || $$.browser.Chrome) && a.focus()
        });
        f.$r("mousedown",
        function(a) {
            var c = $fixE(a).$target;
            c.tagName == "A" && (b(c), $$.browser.IE && setTimeout(function() {
                c.outerHTML += ""
            }))
        })
    }
};
var c_allyes_text = {},
c_allyes_delay = 1E3;
Ctrip.module.allyes = function(a) {
    function b(b, c) {
        var d = a.getAttribute(b);
        if (!d) return null;
        return c ? c[d] || null: d
    }
    function c(a) {
        var b = location.pathname,
        b = b.slice(b.lastIndexOf("/") + 1);
        return /^(SearchFlights\.aspx|SearchHotels\.aspx|query\.asp)$/i.test(b) ? a[0] : a[1]
    }
    var d = b("user") || b("mod_allyes_user");
    if (!d) {
        var f = b("mod_allyes_buttons", window),
        g = b("mod_allyes_text", window.c_allyes_text);
        if (!f && !g) return
    }
    setTimeout(function() {
        if (d) d.indexOf("@") > -1 && (d = c(d.split("@"))),
        a.innerHTML = '<iframe marginheight="0" width="100%" height="100%" marginwidth="0" frameborder="0" scrolling="no" src="http://allyes.jikee.net/main/adfshow?user={$user}&db=ctrip&border=0&local=yes"></iframe>'.replace("{$user}", d);
        else {
            var b = [];
            f && (b = f.map(function(a) {
                a.button = a.button || ";";
                return '<div class="base_ad140x60" style="height:{$height}px">{$iframe}</div>'.replace("{$height}", a.height).replace("{$iframe}", '<iframe marginheight="0" width="100%" height="100%" marginwidth="0" frameborder="0" scrolling="no" src="http://allyes.jikee.net/main/adfshow?user={$user}&db=ctrip&border=0&local=yes"></iframe>'.replace("{$user}", a.user))
            }));
            g && b.push('<div class="base_adtxt140">{$text}</div>'.replace("{$text}", _.$s2t(g)));
            a.innerHTML = b.join("")
        }
    },
    window.c_allyes_delay)
};
Ctrip.module.notice = function(a) {
	
    var b;
    a.module.notice = new
    function() {
		
        this.enabled = !0;
        this.tip = a.getAttribute("mod_notice_tip") || "";
        this.check = function() {
            if (a.module.notice.enabled) with(a) isNull() ? (style.color = "#000000", value = module.notice.tip) : style.color = ""
        };
        this.isNull = a.isNull = function() {
			 
            return a.value.trim() == "" || a.value == a.module.notice.tip
        }
    };
    a.$r("focus",
    function() {
		
        b = !0;
        if (a.module.notice.enabled && (a.style.color = "", a.value == a.module.notice.tip)) a.value = ""
    },
    10);
    a.$r("blur",
    function() {
		
        b = !1;
		 //alert(a.value);
        a.module.notice.check()
    },
    90);
    a.form && ($(a.form).$r("submit",
    function() {
		
        if (a.isNull()) a.value = "";
        setTimeout(function() {
            b || a.module.notice.check()
        },
        1)
    }), $$.browser.IE || _.$r("beforeunload", a.module.notice.check));
    a.module.notice.check()
};
Ctrip.module.tab = function(a) {
    var b = _.$g(a.getAttribute("mod_tab_button") || ""),
    c = _.$g(a.getAttribute("mod_tab_panel") || ""),
    d = parseInt(a.getAttribute("mod_tab_select") || 1, 10),
    f = ((a.getAttribute("mod_tab_event") || "").match(/^mouseover$/i) || "click").toString();
    if (b && c) a.module.tab = new
    function() {
        this.funcListHash = {};
        this.select = function(a) {
            if (this.funcListHash[a - 1]) this.funcListHash[a - 1]()
        };
        this.index = d
    },
    b.each(function(d, j) {
        a.module.tab.funcListHash[j] = function() {
            b.each(function(a, b) {
                a.className = a.className.replace(/_(no)?current/g, "_" + (j == b ? "": "no") + "current");
                if (c[b]) c[b].style.display = j == b ? "": "none"
            });
            a.module.tab.index = j + 1
        };
        d.$r(f, a.module.tab.funcListHash[j])
    }),
    a.module.tab.select(d)
};
Ctrip.module.display = function(a) {
    var b = [];
    a.$getPara("mod_display_panel").each(function(a) { (a = _.$(a) || _.$selNode(a)) && (a.length ? a.each(function(a) {
            b.push(a)
        }) : b.push(a))
    });
    a.$r("click",
    function() { (function(a) {
						 
            for (var b = 0; b < a.childNodes.length; b++) with(a.childNodes[b]) if (nodeType == 3) {
                var f = RegExp($$.string.display.match(/[^@]+/g).join("|"), "gi");
                nodeValue = nodeValue.replace(f,
                function(a) {
                    a = $$.string.display.match(RegExp("@" + a + "\\|([^@]+)|([^@]+)\\|" + a + "@", "i"));
                    return a[1] || a[2]
                })
            } else arguments.callee(a.childNodes[b])
        })(a);
        b.each(function(a) {
            a.style.display = a.$getStyle("display") == "none" ? "": "none"
        })
    })
};
Ctrip.module.selectAll = function(a) {
    var b = _.$selNode(a.getAttribute("mod_selectAll_input") || "");
    b && (b.each(function(c) {
        c != a && c.$r("onclick",
        function() {
			
            a.checked = b.each(function(b) {
                if (b != a && !b.checked) return ! 1
            })
        })
    }), a.$r("click",
    function() {
	
        b.each(function(b) {
            b.checked = a.checked
        })
    }))
};
Ctrip.module.validate = function(a) {
	
    var b = _.$(a.getAttribute("mod_validate_true") || ""),
    c = _.$(a.getAttribute("mod_validate_false") || ""),
    d = a.getAttribute("mod_validate_function") || "";
    if (d) {
        var f = d.match(/^\/(.*?[^\\])\/([gmi]*?)$/),
        g,
        j,
        p,
        d = a[d] || _[d];
        if (f || d) a.module.validate = new
        function() {
            this.check = function() {
				
                a.value || !b && !c ? p = !(j = d ? d(a.value, a) : a.value.match(RegExp(f[1], f[2]))) : j = p = !1;
                if (b) b.style.display = j ? "": "none";
                if (c) c.style.display = p ? "": "none"
            }
        },
        a.$r("focus",
        function() {
            g = setInterval(a.module.validate.check, 200)
        }),
        a.$r("blur",
        function() {
            a.module.validate.check();
            clearInterval(g)
        })
    }
};
/*$$.module.jmpInfo = {
    timers: {
        show: 300,
        hide: 150,
        refresh: 200
    },
    container: $("tuna_jmpinfo") || $("z1"),
    template: {},
    array: {},
    load_timeout: 3E3,
    template_dir: $webresourceUrl("/code/js/resource/jmpinfo_tuna/"),
    data_dir: $webresourceUrl("/code/js/resource/jmpinfo_tuna/"),
    ready: 0
}; */(function(a) {
    function b(a) {
        this.direct = {
            t: /(.)t\1b/,
            r: /r(.)l\1/,
            b: /(.)b\1t/,
            l: /l(.)r\1/
        };
        this.setInfo(a)
    }
    function c(c) {
        f && clearTimeout(f);
        f = setTimeout(function() {
            if (g && $contains(g, p)) {
                c.getAttribute("mod");
                var a = j.jmpinfo;
                if (a) a.setInfo(c);
                else switch ("jmpinfo") {
                case "jmpinfo":
                    a = new b(c);
                    break;
                default:
                    throw "No this type jmpinfo yet!";
                }
                a.show()
            }
        },
        a.timers.show)
    }
    function d(a) {
        var a = p = $fixE(a).$target,
        b;
        if (b = a) {
            for (; ! Ctrip.support.isMod(b, "jmpinfo") && ___ != b;) b = b.parentNode;
            b = b == ___ ? null: $(b)
        } else b = null;
        if (b) {
            if (!g || !$contains(g, a)) c(b),
            g = b
        } else g = null
    }
    var f, g, j = {},
    p, m, n = {
        "align-center": "ctcb",
        "align-left": "ltlb",
        "corner-left": "ltrb",
        "align-right": "rtrb",
        "corner-right": "rtlb",
        "above-align-left": "lblt",
        "above-align-right": "rbrt"
    };
    b.prototype = {
        show: function() {
            if (this.ckStatus()) {
                a.ready = 1;
                if (m) m.style.display = "none";
                var b = a.container;
                this.fillHtml(b, this.toHtml());
                this.setPosition(b, this.elem, this.position);
                this.setIframe();
                this.countDownHide();
                $type(this.callback) === "function" && this.callback.call(null, "show", this.elem, this)
            } else setTimeout(arguments.callee.bind(this), a.timers.refresh)
        },
        ckStatus: function() {
            var b = this.query ? !!a.array[this.query.name] : !0;
            return !! a.template[this.page] && b
        },
        hide: function() {
            a.container.style.display = "none";
            g = null;
            this.clearIframe();
            $type(this.callback) === "function" && this.callback.call(null, "hide", this.elem, this)
        },
        setIframe: function() {
            m = (this.box || a.container).$setIframe()
        },
        clearIframe: function() { (this.box || a.container).$clearIframe();
            m = null
        },
        setPosition: function(a, b, c) {
            a.style.display = "";
            c && c.length == 2 || (c = this.exchangeDirction(a, b));
            this.setPos(a, b, c)
        },
        setPos: function(a, b, c) {
            this.arrow && this.exchangeClass(a, b, c.join(""));
            a.$setPos.apply(a, [b].concat(c))
        },
        exchangeDirction: function(a, b) {
            var c = b.$getPos(),
            d = this.view(),
            f = {
                x: b.offsetWidth,
                y: b.offsetHeight
            },
            v = {
                x: a.offsetWidth,
                y: a.offsetHeight
            },
            g = ["l", "t", "l", "b"];
            c[0] + v.x > d.right && c[0] + f.x - v.x >= d.left && (g[0] = "r", g[2] = "r");
            c[1] + f.y + v.y > d.bottom && c[1] - v.y >= d.top && (g[1] = "b", g[3] = "t");
            return [g.slice(0, -2).join(""), g.slice(2).join("")]
        },
        view: function() {
            var a = $pageSize("win");
            a.right = a.left + a.width;
            a.bottom = a.top + a.height;
            return a
        },
        fillHtml: function(a, b) {
            a.innerHTML = b;
            $parserRe(a);
            this.initElements()
        },
        initElements: function() {
            var b = a.container.$g(".base_jmp");
            this.box = b ? b[0] : a.container;
            this.arrow = (b = a.container.$("b")) ? b[0] : null
        },
        exchangeClass: function(a, b, c) {
            for (var d in this.direct) {
                var f = c.match(this.direct[d]);
                if (f) {
                    this.box.className = this.box.className.replace(/[trbl]$/, d);
                    this.arrow.className = this.arrow.className.replace(/[trbl]$/, d);
                    this.calculateArrow(a, b, d, f[1]);
                    return
                }
            }
            throw "This direction of jmpInfo is not support yet!";
        },
        calculateArrow: function(a, b, c, d) {
            if ("tb".indexOf(c) >= 0) if (a = a.offsetWidth, b = b.offsetWidth, c = this.arrow.offsetWidth, d === "l") this.arrow.style.left = (Math.min(a, b) - c) / 2 + "px";
            else if (d === "r") this.arrow.style.right = (Math.min(a, b) - c) / 2 + "px";
            else if (d === "c") this.arrow.style.left = (Math.max(a, b) - c) / 2 + "px"
        },
        getInfo: function() {},
        setInfo: function(a) {
            this.elem = a;
            var b = (a.getAttribute("mod_jmpInfo_page") || "default_normal").split("?");
            this.page = !/^#/.test(b[0]) ? b[0].replace(/\.asp$/i, "").toLowerCase() : b[0];
            this.query = this.parseQuery(b.slice(1).join(""));
            this.ready = Math.min(this.loadData(this.query), this.loadTemplate(this.page));
            this.content = (a.getAttribute("mod_jmpInfo_content") || "").split("|");
            b = a.getAttribute("mod_jmpInfo_position") || "auto";
            b in n && (b = n[b]);
            this.position = b.match(/[ltrbc]{2}/ig);
            if ((a = a.getAttribute("mod_jmpInfo_callback")) && $type(_[a]) === "function") this.callback = _[a];
            return this
        },
        toHtml: function() {
            var b = a.template[this.page],
            c = b.match(/<body.*?>([\s\S]+)<\/body>/i),
            b = (c ? c[1] : b).replace(/<\!--[\s\S]*?--\>/g, ""),
            c = {
                para: this.content
            };
            this.query && (c.array = this.queryData(this.query));
            return this.fillContent(b, c)
        },
        parseQuery: function(a) {
            if (!a) return null;
            a = a.split("=");
            if (a.length < 2) return null;
            return {
                name: a[0],
                value: a.slice(1).join("")
            }
        },
        loadData: function(b) {
            if (!b) return ! 0;
            var b = b.name,
            c = a.array;
            if (c.hasOwnProperty(b)) return !! c[b];
            c[b] = !1;
            $loadJs(a.data_dir + b + "_" + $$.status.charset + ".js", null,
            function(a) {
                if (a) return ! 0
            },
            a.load_timeout);
            return ! 1
        },
        loadTemplate: function(b) {
            var c = a.template;
            if (c.hasOwnProperty(b)) return !! c[b];
            c[b] = !1;
            if (b.charAt(0) === "#") {
                var d = __.$g(b);
                if (d) return c[b] = this.htmlOf(d[0]),
                !0
            } else $loadJs(a.template_dir + b + ".js", "gbk",
            function(a) {
                if (a) return ! 0
            },
            a.load_timeout);
            return ! 1
        },
        htmlOf: function(a) {
            if (!a || a.nodeType != 1) return "";
            a = a.cloneNode(!0);
            a.removeAttribute("id");
            a.style.cssText = a.style.cssText.replace(/\bdisplay:\s*none;?/i, "");
            if ("outerHTML" in a) return a.outerHTML.replace(/(<[^>]+\sid=)(\w+)/g, '$1"$2"');
            else {
                for (var b = [], c = a.attributes, d = 0; d < c.length; d++) c[d].name != "id" && b.push(c[d].name + '="' + c[d].value + '"');
                b = b.length ? " " + b.join(" ") : "";
                c = a.tagName.toLowerCase();
                return "<" + c + b + ">" + a.innerHTML + "</" + c + ">"
            }
        },
        fillContent: function(a, b) {
            var c = '(<(\\w+)[^>]*)\\bid="(' + $keys(b).join("|") + ')(\\d+)"([^>]*>)[\\s\\S]*?(<\\/\\2>)';
            return a.replace(RegExp(c, "gi"),
            function(a, c, d, f, g, h, m) {
                return c + h + (b[f][g - 1] || "") + m
            })
        },
        countDownHide: function() {
            var b = this,
            c = setInterval(function() {
                g && $contains(g, p) || $contains(a.container, p) || (b.hide(), clearInterval(c))
            },
            a.timers.hide)
        },
        queryData: function(b) {
            var c = a.array[b.name],
            b = c.indexOf("@" + b.value + "|") + 1;
            if (!b) return [];
            return c.slice(b, c.indexOf("@", b)).split("|")
        }
    };
    _.$r("domready",
    function() {
        a.container.style.visibility = "";
        ___.$r("mouseover", d)
    })
})($$.module.jmpInfo);
_.$r("domReady",
function() {
    var a = ".tuna_calendar{width:362px;font-size:12px;font-family:tahoma, Arial, Helvetica, simsun, sans-serif;position:absolute;z-index:1000;background-color:#fff;border:solid 1px #999;-moz-box-shadow:3px 4px 5px #ccc;-webkit-box-shadow:3px 4px 5px #ccc;box-shadow:3px 4px 5px #ccc;margin:0;padding:5px 6px 4px}.tuna_calendar dt,.tuna_calendar dd{margin:0;padding:0}.tuna_calendar dl,.tuna_calendar dt,.tuna_calendar dd { margin:0; padding:0; }.tuna_calendar .select_day,.tuna_calendar dd a:hover,.tuna_calendar .calendar_title01 a,.tuna_calendar .calendar_title02 a,.tuna_calendar .today{background:#FFF url(un_bg_calender.png) no-repeat}.tuna_calendar a{color:#005ead;font-weight:bold;text-decoration:none!important}.tuna_calendar dl{float:left;width:175px;padding:6px 0 0}.tuna_calendar #calendar_month2{position:absolute;top:28px;left:186px;z-index:2;padding-bottom:5px;padding-left:6px;border-left:2px solid #999}.tuna_calendar dt{float:left;width:25px;height:22px;background:#ececec;font-weight:normal;color:#666;font-size:12px;line-height:20px;text-align:center;cursor:default}.tuna_calendar .day0,.tuna_calendar .day6{color:#f90;font-weight:bold}.tuna_calendar .day6{width:24px}.tuna_calendar dd{clear:both;padding-top:1px;display:inline-block}.tuna_calendar dd a{font-size:11px;text-align:center;height:24px;width:22px;line-height:24px;float:left;outline-width:0;background-color:#fff;padding:0 2px 1px 1px}.tuna_calendar dd a:hover{background-color:#fff;background-position:-26px -48px}.tuna_calendar .today{font-weight:bold;background-position:0 -74px;}.tuna_calendar .today:hover{}.tuna_calendar .select_day,.tuna_calendar .select_day:hover{color:#fff;background-color:#629be0;background-position:0 -48px}.tuna_calendar .blank_day,.tuna_calendar .over_day{color:#dbdbdb;font-weight:normal;cursor:default}.tuna_calendar .blank_day:hover,.tuna_calendar .over_day:hover{background-color:#fff;background-image:none}.tuna_calendar div{float:left;width:181px;color:#fff;font-weight:bold;height:23px;background:#004fb8}.tuna_calendar div a{cursor:pointer;width:40px;line-height:20px}.tuna_calendar .calendar_title01 span,.tuna_calendar .calendar_title02 span{float:left;width:143px;text-align:center;line-height:23px}.tuna_calendar .calendar_title01 span{padding-right:14px}.tuna_calendar .calendar_title02 span{padding-left:14px}.tuna_calendar .calendar_title01 a,.tuna_calendar .calendar_title02 a{background-color:#2d7fdd;float:left;width:23px;height:23px;overflow:hidden;text-indent:-10em}.tuna_calendar .calendar_title01 a{float:left}.tuna_calendar .calendar_title02 a{background-position:right 0;float:right}.tuna_calendar .calendar_title01 a:hover{background-color:#4895ec;background-position:0 -24px}.tuna_calendar .calendar_title02 a:hover{background-color:#4895ec;background-position:right -24px}.tuna_calendar b,.tuna_calendar i{background-color:#fff;display:block;width:372px;height:1px;border-right:1px solid #c3c3c3;border-left:1px solid #c3c3c3;overflow:hidden;position:absolute;left:0;z-index:1}.tuna_calendar i{border-top:1px solid #999;top:-2px}.tuna_calendar b{border-bottom:1px solid #999;bottom:-2px;_bottom:-3px}address_hot li,.address_hot_abb,.address_hot_adress{list-style:none;margin:0;padding:0}.address_hot_adress a{text-decoration:none;text-align:left}#tuna_address{font-family: Arial,Simsun; font-size: 12px;}#tuna_address #address_warp{background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #7F9DB9; margin: 0; min-height: 305px; padding: 0 0 4px; text-align: left; width: 220px;}* html #tuna_address #address_warp{height: 305px;}#tuna_address #address_message{background-color: #67A1E2; border: medium none; color: #FFFFFF; display: block; font-family: Simyou; height: 1.7em; line-height: 20px; overflow: hidden; padding: 2px 0 2px 9px; width: auto; word-wrap: break-word;}#tuna_address #address_list{margin: 0; min-height: 277px; padding: 0;}* html #tuna_address #address_list{height: 277px;}#tuna_address #address_list span{float: right; font: 10px/22px verdana; margin: 0; overflow: hidden; padding: 0; text-align: right; white-space: nowrap; width: 110px;}#tuna_address #address_list a{border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: left; text-decoration: none;}* html #tuna_address #address_list a{height: 22px;}#tuna_address #address_list a:hover{background: none repeat scroll 0 0 #E8F4FF; border-bottom: 1px solid #7F9DB9; border-top: 1px solid #7F9DB9;}#tuna_address .address_selected{background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px;}#tuna_address .address_pagebreak{display: none; line-height: 25px; margin: 0; padding: 0; text-align: center;}#tuna_address .address_pagebreak a{color: #0055AA; display: inline-block; font-family: Arial,Simsun,sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px;}#tuna_address #address_arrowl, #tuna_address #address_arrowr{color: #0055AA;}#tuna_address a.address_current{color: #000000; text-decoration: none;}.address_hot{background-color: #FFFFFF; font-size: 12px; width: 283px;}.address_hotcity{background-color: #67A1E2; border-color: #2C7ECF; border-style: solid; border-width: 1px 1px 0; color: #CEE3FC; height: 24px; line-height: 24px; padding-left: 10px;}.address_hotcity strong{color: #FFFFFF;}.address_hotlist{border-color: #999999; border-style: solid; border-width: 0 1px 1px; overflow: hidden; padding: 5px;}.address_hot_abb{border-bottom: 1px solid #5DA9E2; padding-bottom: 20px;}.address_hot_abb li{color: #005DAA; cursor: pointer; float: left; height: 20px; line-height: 20px; list-style-type: none; text-align: center;}.address_hot_abb li span{padding:0 5px;}.address_hot_abb li .hot_selected{display:block; padding:0 5px; background-color: #FFFFFF; border-color: #5DA9E2; border-style: solid; border-width: 1px 1px 0; color: #000000; font-weight: bold;}.address_hot_adress{padding-top: 4px; width: 100%;}.address_hot_adress li{float: left; height: 24px; overflow: hidden; width: 67px;}.address_hot_adress li a{border: 1px solid #FFFFFF; color: #000000; display: block; height: 22px; line-height: 22px; padding-left: 5px;}.address_hot_adress li a:hover{background-color: #E8F4FF; border: 1px solid #ACCCEF; text-decoration: none;}.span_fest{text-indent:-9999px} .yuan_dan span, .chu_xi span, .chun_jie span, .yuan_xiao span, .qing_ming span, .lao_dong span, .duan_wu span, .zhong_qiu span, .guo_qing span { display:block; height:24px; background-image:url(icon_festival.png); background-repeat:no-repeat; } .tuna_calendar .yuan_dan:hover, .tuna_calendar .chu_xi:hover, .tuna_calendar .chun_jie:hover, .tuna_calendar .yuan_xiao:hover, .tuna_calendar .qing_ming:hover, .tuna_calendar .lao_dong:hover, .tuna_calendar .duan_wu:hover, .tuna_calendar .zhong_qiu:hover, .tuna_calendar .guo_qing:hover { background-image:url(icon_festival.png); background-repeat:no-repeat; background-position:0 -400px; cursor:pointer; } .tuna_calendar .festival_select, .tuna_calendar .festival_select:hover { background-image:url(icon_festival.png); background-repeat:no-repeat; background-position:0 -360px; } .yuan_dan span { background-position:0 6px; } .chu_xi span { background-position:0 -35px; } .chun_jie span { background-position:0 -74px; } .yuan_xiao span { background-position:0 -114px; } .qing_ming span { background-position:0 -155px; } .lao_dong span { background-position:0 -194px; } .duan_wu span { background-position:0 -234px; } .zhong_qiu span { background-position:0 -274px; } .guo_qing span { background-position:0 -314px; }".replaceWith({
       /* picserver: $picUrl("")*/
		
    }),
    b;
    $$.browser.IE ? (b = document.createStyleSheet(), b.cssText = a) : (b = document.createElement("style"), b.type = "text/css", b.textContent = a, document.getElementsByTagName("head")[0].appendChild(b))
});
$$.string.address = {
    "zh-cn": {
        b: "\u8f93\u5165\u4e2d\u6587/\u62fc\u97f3\u6216\u2191\u2193\u9009\u62e9.",
        i: "\u8f93\u5165",
        j: "\u6216\u2191\u2193\u9009\u62e9.",
        k: "\u4e2d\u6587/\u62fc\u97f3",
        e: "\u8bf7\u8f93\u5165\u81f3\u5c11\u4e24\u4e2a\u5b57\u6bcd\u6216\u4e00\u4e2a\u6c49\u5b57.",
        h: "",
        o: "\u6309\u62fc\u97f3\u6392\u5e8f",
        s: "\u5bf9\u4e0d\u8d77, \u627e\u4e0d\u5230: ",
        l: "\u7ed3\u679c\u5171",
        p: "\u9879,\u2190\u2192\u7ffb\u9875",
        a: ",\u5171"
    },
    "zh-tw": {
        b: "\u8f38\u5165\u4e2d\u6587/\u62fc\u97f3\u6216\u2191\u2193\u9078\u64c7.",
        i: "\u8f38\u5165",
        j: "\u6216\u2191\u2193\u9078\u64c7.",
        k: "\u4e2d\u6587/\u62fc\u97f3",
        e: "\u8acb\u8f38\u5165\u81f3\u5c11\u5169\u500b\u5b57\u6bcd\u6216\u4e00\u500b\u6f22\u5b57.",
        h: "",
        o: "\u6309\u62fc\u97f3\u6392\u5e8f",
        s: "\u5c0d\u4e0d\u8d77, \u627e\u4e0d\u5230: ",
        l: "\u7d50\u679c\u5171",
        p: "\u9805,\u2190\u2192\u7ffb\u9801",
        a: ",\u5171"
    },
    en: {
        b: "Type or scroll to select.",
        i: "Input ",
        j: " or use up or down to select.",
        k: "English",
        e: "Please Input at least two character.",
        h: "",
        o: "sort by spelling",
        s: "No match",
        l: "Results ",
        p: ",left or right to turn page",
        a: ",All"
    }
} [$$.status.version];
/*$$.module.address.sourceMap = {
    hotel: ["http://scriptres.jikee.net/hoteladdress/HotelCityAddress{$charset}.aspx", "utf-8"],
    hotelAll: ["http://scriptres.jikee.net/hoteladdress/HotelCityAddress{$charset}.aspx", "utf-8"]
};*/ (function() {
    function a(a, b) {
        return RegExp("\\b" + b + "\\b").test(a.className)
    }
    function b(a, b) {
        var c = a.match(/^[^\|]+/),
        d = b.match(/^[^\|]+/);
        return c > d ? 1 : c == d ? 0 : -1
    }
    function c() {
        var a = $c("div");
        a.style.width = "0px";
        a.style.height = "0px";
        a.innerHTML = '<div id="tuna_address" style="display:none;position:absolute;top:0;z-index:120;overflow:hidden;-moz-box-shadow:2px 2px 5px #333;-webkit-box-shadow:2px 2px 5px #333;"><div id="address_warp"><div id="address_message">&nbsp;</div><div id="address_list"><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a><a class="a1" href="###"><span>&nbsp;</span>&nbsp;</a></div><div class="address_pagebreak" id="address_p"><a id="address_arrowl" href="javascript:;" name="p">&lt;-</a><a id="address_p1" href="javascript:;" name="1" class="address_current">1</a><a id="address_p2" href="javascript:;" name="2">2</a><a id="address_p3" href="javascript:;" name="3">3</a><a id="address_p4" href="javascript:;" name="4">4</a><a id="address_p5" href="javascript:;" name="5">5</a><a id="address_arrowr" href="javascript:;" name="n">-&gt;</a></div></div></div>';
        $("jsContainer").appendChild(a);
        g = $("tuna_address");
        $$.module.address.source["default"] = "@@";
        j = $("address_warp");
        p = $("address_message");
        m = $("address_list");
        n = [$("address_p"), $("address_p1"), $("address_p2"), $("address_p3"), $("address_p4"), $("address_p5")];
        h = $("address_arrowl");
        q = $("address_arrowr");
        r = m.getElementsByTagName("a");
        for (a = 0; a < r.length; a++) r[a].cloneNode(!0)
    }
    var d = "_".toString() + "hotData",
    f = {
        target: null,
        hotTarget: null,
        data: null,
        selectedValue: null,
        hotSelected: "\u70ed\u95e8",
        tabTagName: "span",
        tabListTagName: "ol",
        cityListTagName: "ul",
        cityTagName: "span",
        hotData: {},
        hotTemplate: {
            container: '<div class="address_hot" style="display:none;top:0;-moz-box-shadow:2px 2px 5px #333;-webkit-box-shadow:2px 2px 5px #333;" id="address_hot">{$text}</div>',
            title: '<div class="address_hotcity"><strong>\u70ed\u95e8\u57ce\u5e02</strong>{$text}</div>',
            hotlist: '<div class="address_hotlist">{$text}</div>',
            tags: '<ol class="address_hot_abb" style="{$style}">{$text}</ol>',
            tag: "<li><span {$className}>{$text}</span></li>",
            items: '<ul class="address_hot_adress layoutfix" {$display} type="{$type}">{$text}</ul>',
            item: '<li><a href="###" data="{$data}">{$text}</a></li>'
        },
        hotClassNames: {
            tagSelected: "hot_selected"
        }
    },
    g,
    j,
    p,
    m,
    n,
    h,
    q,
    r,
    s = 0;
    Ctrip.module.address = function(k) {
        function v() {
            B && B.releaseCapture && (B.releaseCapture(), B = null)
        }
        function w() { (f.hotTarget || g).$setPos(k)
        }
        function R() {
            var a = [],
            b;
            for (b in f.hotData) s++,
            a.push(f.hotTemplate.tag.replaceWith({
                text: b,
                className: _.$s2t(k.hotSelected) == b ? "class=" + f.hotClassNames.tagSelected: ""
            }));
            return a.join("")
        }
        function S() {
            var a = [],
            b;
            for (b in f.hotData) {
                var c = [],
                c = f.hotData[b].replace(/@([^@]*)\|([^@]*)/g,
                function(a, b, c) {
                    return f.hotTemplate.item.replaceWith({
                        data: [b, c].join("|"),
                        text: c
                    })
                });
                a.push(f.hotTemplate.items.replaceWith({
                    text: c,
                    display: $s2t(k.hotSelected) == $s2t(b) ? "": "style='display:none'",
                    type: b
                }))
            }
            return a.join("")
        }
        function N() {
            for (var a = u.getElementsByTagName(f.cityListTagName), b = 0; b < a.length; b++) if (a[b].style.display == "") return a[b];
            return null
        }
        function T(a, b) {
            clearInterval(E);
			
            var c = b.$target.getAttribute("data");
			//alert(c);
            if (!c) return ! 1;
            c = c.split("|");
			
            focusTarget.value = c[1].trim();
            var d = focusTarget.getAttribute("mod_address_reference");
            if (d && $(d)) $(d).value = c[0].trim(),
            o.hook.change && o.hook.change($(k));
            u.$clearIframe();
            u.style.display = "none";
            k.blur();
            setTimeout(function() {
                o.focusNext && setTimeout(function() {
                    k.$focusNext()
                },
                1)
            },
            0);
            return ! 0
        }
        function U() {
            u.onmousedown = function(b) {
			
                var b = $fixE(b),
                c = b.$target;
				
                c.setCapture && (v(), c.setCapture(), B = c);
                f.olObj = c.$parentNode(f.tabListTagName);
                f.ulObj = c.$parentNode(f.cityListTagName);
                if (f.olObj) {
				
                    var b = f.olObj,
                    d = N();
                    if (b && d) {
                        N().style.display = "none";
                        k.hotSelected = c.innerText || c.textContent;
                        a: {
                            for (var d = _.$s2t(k.hotSelected), g = u.getElementsByTagName(f.cityListTagName), w = 0; w < g.length; w++) if (g[w].getAttribute("type") == d) {
                                d = g[w];
                                break a
                            }
                            d = null
                        }
                        d.style.display = "";
                        a: {
                            b = b.getElementsByTagName(f.cityTagName);
                            for (d = 0; d < b.length; d++) if (a(b[d], f.hotClassNames.tagSelected)) {
                                b = b[d];
                                break a
                            }
                            b = null
                        }
                        d = f.hotClassNames.tagSelected;
                        if (a(b, d)) d = RegExp("(\\s|^)" + d.toReString() + "(\\s|$)"),
                        b.className = b.className.replace(d, " ").split(" ").join(" ");
                        c = c.tagName == f.cityTagName.toUpperCase() ? c: c.getElementsByTagName(f.cityTagName)[0];
                        b = f.hotClassNames.tagSelected;
                        if (!a(c, b)) c.className = c.className + " " + b
                    }
                } else if (f.ulObj) return T(f.ulObj, b);
                else focusTarget.select();
                return ! 1
            };
            u.onmouseup = v
        }
        function V() {
            f.hotData = $$.module.address.source[o.source + d];
            if (f.hotData) {
                O = k;
                k.select();
                if (!k.hotSelected) k.hotSelected = f.hotSelected;
                var a = $("address_hot");
                a && a.parentNode.removeChild(a);
                var a = f.hotTemplate.container.replaceWith({
                    text: [f.hotTemplate.title.replaceWith({
                        text: $$.module.address.source[o.source + "_keyWord"] || " \uff08\u53ef\u76f4\u63a5\u8f93\u5165\u57ce\u5e02\u6216\u57ce\u5e02\u62fc\u97f3\uff09"
                    }), f.hotTemplate.hotlist.replaceWith({
                        text: [f.hotTemplate.tags.replaceWith({
                            text: R(),
                            style: s > 1 ? "": "display:none;"
                        }), S()].join("")
                    })].join("")
                }),
                b = "",
                a = a.replace(/\{guestId:(\w+)\}/g,
                function(a, c) {
                    b = c; ! k.guests[b] && $(b) && (k.guests[b] = $(b));
					
                    return '<div class="hot_guest" id="{id}"></div>'.replace("{id}", c + x)
                }),
                c = $c("div");
                c.innerHTML = a;
                u = $(c.removeChild(c.firstChild));
                __.body.appendChild(u);
                for (b in k.guests) a = $(b + x),
                a.parentNode.className = "",
                a.parentNode.replaceChild(k.guests[b], a);
                u.style.display = "";
                u.style.zIndex = 111;
                u.style.position = "absolute";
                u.$setPos(O);
                u.$setIframe();
                U();
                s = 0
            }
        }
        function H(a) {
            a && $stopEvent(a);
            switch (this) {
            case h:
                y.m_get(y.page - 1);
                break;
            case q:
                y.m_get(y.page + 1);
                break;
            default:
                y.m_get(parseInt(this.firstChild.nodeValue))
            }
            return ! 1
        }
        function K() {
            with(g.style) width = j.offsetWidth + "px",
            height = j.offsetHeight + "px";
            g.$setIframe()
        }
        function P() {
            if (o.suggest.length == 0) {
                if (g.style.display = "none", t !== null) r[t].className = "",
                t = null
            } else y.m_set(o.suggest),
            p.lastChild.nodeValue = $$.status.version.match(/^zh-/) ? $$.string.address.i + (k.module.notice ? k.module.notice.tip: $$.string.address.k) + $$.string.address.j: $$.string.address.b
        }
        function L() {
            focusTarget = k;
            var a = k.value.trim();
            if (a !== I) if (I = a, a = a.replace(/([\(\)\\\[\]\.\+\?\*\|\^\$])/gi, "\\$1").replace(/@|\|/gi, ""), C && $$.module.address.source[o.source + d]) V(),
            C = !1,
            f.hotTarget = u;
            else {
                if (u && !u.style.display) f.hotTarget = null,
                u.$clearIframe(),
                u.style.display = "none";
                if (a) {
                    if (u) u.$clearIframe(),
                    u.style.display = "none";
                    g.style.display = "";
                    var c = $$.module.address.source[o.source],
                    v = RegExp("@([^@]*\\|)?" + a + "[^@]*", "gi"),
                    w = RegExp("@[^@]*" + a + "[^@]*", "gi"),
                    h = [],
                    n = [],
                    j = [],
                    c = c.replace(RegExp("@([^\\|@]*\\|)?" + a + "[^@]*", "gi"),
                    function(a) {
                        h.push(a);
                        return ""
                    });
                    h && h.sort(b);
                    c = c.replace(v,
                    function(a) {
                        n.push(a);
                        return ""
                    });
                    n && n.sort(b);
                    c = c.replace(w,
                    function(a) {
                        j.push(a);
                        return ""
                    });
                    j && j.sort(b);
                    arr = h.concat(n).concat(j);
                    p.style.backgroundColor = arr.length ? "#67A1E2": "#0053AA";
                    if (!arr || !arr.length) {
                        p.lastChild.nodeValue = o.auto ? $$.string.address.s + ($$.status.version == "en" ? "": k.value) : $$.string.address.h + k.value + ", " + $$.string.address.o;
                        if (!o.auto && (g.style.display = "none", t !== null)) r[t].className = "",
                        t = null;
                        m.style.display == "none" && P();
                        K()
                    } else p.lastChild.nodeValue = $$.string.address.h + k.value + ", " + $$.string.address.o,
                    y.m_set(arr);
                    C = !1
                } else P(),
                K()
            }
        }
        function J(a, b) {
            k.value = D[a][1] || D[a][0];
            if (o.reference) o.reference.value = D[a][2];
            if (z) z.value = D.join("|");
            o.hook.change && o.hook.change(k);
            r[t].className = "";
            t = null;
            b !== !1 && o.focusNext && setTimeout(function() {
                k.$focusNext()
            },
            1)
        }
        var B = null;
        k.guests = {};
        var x = (new Date).getTime(),
        O,
        u,
        F,
        G = k.$getWin(),
        o = k.module.address = {},
        E,
        t = null,
        I,
        D = [],
        C = !1;
        o.ver = k.getAttribute("mod_address_ver");
        o.autoFilter = /^(true|1)$/.test(k.getAttribute("mod_address_autofilter"));
        g || c();
        k.setAttribute("autoComplete", "off");
        $r("beforeunload",
        function() {
            k.setAttribute("autoComplete", "on")
        });
        o.focusNext = k.getAttribute("mod_address_focusNext");
        o.focusNext = /^(1|true)$/i.test(o.focusNext || "");
        o.reference = k.getAttribute("mod_address_reference");
        var z = k.getAttribute("mod_address_cookie");
        if (z && (z = G.$(z), !z)) {
            var A = G.$c("input");
            with(A) type = "hidden",
            id = name = z;
            z = A;
            k.parentNode.insertBefore(z, k)
        }
        if (o.reference) o.reference = G.$(o.reference) || G.$(o.reference, !0);
        var A = k.getAttribute("mod_address_suggest"),
        Q = k.getAttribute("mod_address_cookieSuggest");
        o.suggest = [];
        if (Q) o.suggest = Q.match(/[^@]+@/gi),
        A && o.suggest._push(A.match(/[^@]+@/gi));
        else if (A) o.suggest = A.match(/[^@]+@/gi);
        if (o.suggest.length > 12) o.suggest = o.suggest.slice(0, 12);
        o.source = k.getAttribute("mod_address_source") || "default";
		/*alert(o.source);
        $$.module.address.source[o.source] || ($$.module.address.source[o.source] = "@@", $$.module.address.sourceMap[o.source] ? $loadJs($$.module.address.sourceMap[o.source][0].replace(/\{\$charset\}/gi, $$.status.charset), ($$.module.address.sourceMap[o.source][1] || "").replace(/\{\$charset\}/gi, $$.status.charset) || $$.status.charset) : $loadJs($webresourceUrl("/code/js/resource/address_tuna/") + o.source + "_" + $$.status.charset + ".js", $$.status.charset));
        o.auto = k.getAttribute("mod_address_auto");*/
        o.auto = o.auto && o.auto.match(/^(false|0)$/i) ? !1 : !0;
        o.redraw = function() {
            E && L()
        };
        o.hook = {}; (k.getAttribute("mod_address_hook") || "").replace(/(on)?([^;:]+):([^;]+)/gi,
        function(a, b, c, d) {
            o.hook[c.toLowerCase()] = G[d]
        });
        var M = !1,
        y = new
        function() {
            var a;
            this.maxpage = this.page = 1;
            this.m_get = function(b) {
                if (!a || !b || b < 1 || b > this.maxpage) return null;
                this.page = b;
                this.pagelist = a.slice((b - 1) * 12, Math.min(b * 12, a.length));
                for (b = 0; b < r.length; b++) if (b < this.pagelist.length) {
                    r[b].style.display = "block";
                    var c = this.pagelist[b].replace(/@/g, "").split("|");
                    r[b].lastChild.nodeValue = c[1];
                    r[b].firstChild.firstChild.nodeValue = c[0];
                    D[b] = c
                } else r[b].style.display = "none",
                D[b] = null;
                if (t !== null) {
                    if (t >= this.pagelist.length) r[t].className = "",
                    t = this.pagelist.length - 1,
                    r[t].className = "address_selected"
                } else t = 0,
                r[0].className = "address_selected";
                var b = this.maxpage < 6 || this.page < 3 ? 1 : this.page > this.maxpage - 2 ? this.maxpage - 4 : this.page - 2,
                c = Math.min(b + 4, this.maxpage),
                d;
                h.style.display = this.page == 1 ? "none": "";
                q.style.display = this.page == this.maxpage ? "none": "";
                for (var f = b; f < b + 5; f++) d = n[f - b + 1],
                f <= c ? (d.firstChild.nodeValue = f, d.className = f == this.page ? "address_current": "", d.style.display = "") : d.style.display = "none";
                n[0].style.display = this.maxpage > 1 ? "block": "none";
                m.style.display = p.style.display = "";
                if (!F) g.style.display = "",
                b = k.$getPos(),
                g.offsetWidth + b[0] > ___.offsetWidth ? g.$setPos(k, "tr", "br") : g.$setPos(k),
                g.$setIframe(),
                F = !0;
                K.call(this)
            };
            this.m_set = function(b) {
                a = b;
                this.maxpage = Math.ceil(b.length / 12);
                this.page = 1;
                this.m_get(1)
            }
        };
        o.check = function() {
            var a = k.value.trim();
            k.isNull && k.isNull() && (a = "");
            var c;
            I = a;
            if (a = a.replace(/([\(\)\\\[\]\.\+\?\*\|\^\$])/gi, "\\$1").replace(/@|\|/gi, "")) {
                c = $$.module.address.source[o.source];
                var d = o.auto ? RegExp("@([^@]*\\|)?" + a + "[^@]*", "gi") : RegExp("@([^@]*\\|)?" + a + "(\\|[^@]*)?(?=@)", "gi"),
                f = RegExp("@[^@]*" + a + "[^@]*", "gi"),
                v = [],
                g = [],
                w = [];
                c = c.replace(o.auto ? RegExp("@([^\\|@]*\\|)?" + a + "[^@]*", "gi") : RegExp("@([^\\|@]*\\|)?" + a + "(\\|[^@]*)?(?=@)", "gi"),
                function(a) {
                    v.push(a);
                    return ""
                });
                v && v.sort(b);
                c = c.replace(d,
                function(a) {
                    g.push(a);
                    return ""
                });
                g && g.sort(b);
                o.auto && (c = c.replace(f,
                function(a) {
                    w.push(a);
                    return ""
                }), w && w.sort(b));
                if ((c = v.concat(g).concat(w)) && c.length) F = !0,
                y.m_set(c),
                F = !1,
                J(0, !1)
            }
            k.module.notice && k.module.notice.check();
            return !! c
        };
        k.$r("onfocus",
        function() {
            function a(b) {
                r[b].onmousedown = function() {
                    J(b);
                    k.blur()
                }
            }
            if (!M) {
                M = !0;
                setTimeout(function() {
                    M = !1
                });
                C = !0;
                F = !1;
                m.style.display = p.style.display = n[0].style.display = "none";
                g.onmousedown = function(a) {
                    C = !1;
                    var a = $fixE(a),
                    b = a.$target;
                    b.setCapture && (v(), b.setCapture(), B = b);
                    $stopEvent(a, 1);
                    return ! 1
                };
                g.onmouseup = v;
                _.$r("resize", w);
                for (var b = 0; b < r.length; b++) new a(b);
                h.onmousedown = q.onmousedown = H;
                for (b = 1; b < n.length; b++) n[b].onmousedown = H;
                I = null;
                if (t !== null) r[t].className = "address_selected";
                o.hook.focus && o.hook.focus(k);
                L();
                E = setInterval(L, 150)
            }
        });
        k.blur();
        k.$r("onblur",
        function() {
            C = !1;
            clearInterval(E);
            E = null;
            if (u) u.$clearIframe(),
            u.style.display = "none";
            g.$clearIframe();
            g.style.display = "none";
            if (t !== null) k.value && (o.auto ? J(t, !1) : o.check()),
            r[t].className = "",
            t = null;
            g.onmousedown = null;
            g.onmouseup = null;
            v();
            _.$ur("resize", w)
        });
        k.$r("onkeydown",
        function(a) {
            var b = a ? a.keyCode: event.charCode,
            c = "|" + b + "|";
            if (t == null) return "|13|".indexOf(c) != -1 && ($stopEvent(a, 1), o.focusNext && setTimeout(function() {
                k.$focusNext()
            },
            1)),
            !0;
            if ("|13|".indexOf(c) != -1) $stopEvent(a, 1),
            J(t, void 0),
            k.blur();
            else if ("|33|37|188|219|".indexOf(c) != -1) H.call(h),
            $stopEvent(a, 1);
            else if ("|34|39|61|190|221|".indexOf(c) != -1) H.call(q),
            $stopEvent(a, 1);
            else if ("|38|40|".indexOf(c) != -1) r[t].className = "",
            t += y.pagelist.length - 39 + b,
            t %= y.pagelist.length,
            r[t].className = "address_selected",
            $stopEvent(a, 1)
        });
        k.$r("onkeyup",
        function() {
            if (o.autoFilter && k.value) k.value = k.value.replace(/[^a-zA-Z'\u4E00-\u9FA5]+/g, "");
            k.focus()
        });
        o.hook.load && o.hook.load(k)
    }
})();
$$.module.calendar = {
    string: {
        "zh-cn": {
            a: "\u5e74",
            b: "\u6708",
            weekday: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d",
            f: "yyyy-mm-dd"
        },
        "zh-tw": {
            a: "\u5e74",
            b: "\u6708",
            weekday: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d",
            f: "yyyy-mm-dd"
        },
        en: {
            a: "",
            b: "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec",
            weekday: "SMTWTFS",
            f: "mm-dd-yyyy"
        }
    } [$$.status.version],
    fest: {
        "2013-2-9": "\u9664\u5915",
        "2013-1-22": "\u9664\u5915",
        "2013-2-9": "\u9664\u5915",
        "2011-2-3": "\u6625\u8282",
        "2012-1-23": "\u6625\u8282",
        "2013-2-10": "\u6625\u8282",
        "2011-2-4": "\u521d\u4e8c",
        "2012-1-24": "\u521d\u4e8c",
        "2013-2-11": "\u521d\u4e8c",
        "2011-2-5": "\u521d\u4e09",
        "2012-1-25": "\u521d\u4e09",
        "2013-2-12": "\u521d\u4e09",
        "2011-2-6": "\u521d\u56db",
        "2012-1-26": "\u521d\u56db",
        "2013-2-13": "\u521d\u56db",
        "2011-2-7": "\u521d\u4e94",
        "2012-1-27": "\u521d\u4e94",
        "2013-2-14": "\u521d\u4e94",
        "2011-2-8": "\u521d\u516d",
        "2012-1-28": "\u521d\u516d",
        "2013-2-15": "\u521d\u516d",
        "2011-2-9": "\u521d\u4e03",
        "2012-1-29": "\u521d\u4e03",
        "2013-2-16": "\u521d\u4e03",
        "2011-2-10": "\u521d\u516b",
        "2012-1-30": "\u521d\u516b",
        "2013-2-17": "\u521d\u516b",
        "2011-1-1": "\u5143\u65e6",
        "2012-1-1": "\u5143\u65e6",
        "2013-1-1": "\u5143\u65e6",
        "2011-4-5": "\u6e05\u660e\u8282",
        "2012-4-4": "\u6e05\u660e\u8282",
        "2013-4-4": "\u6e05\u660e\u8282",
        "2011-6-6": "\u7aef\u5348\u8282",
        "2012-6-23": "\u7aef\u5348\u8282",
        "2011-5-1": "\u52b3\u52a8\u8282",
        "2012-5-1": "\u52b3\u52a8\u8282",
        "2013-5-1": "\u52b3\u52a8\u8282",
        "2011-10-1": "\u56fd\u5e86\u8282",
        "2012-10-1": "\u56fd\u5e86\u8282",
        "2013-10-1": "\u56fd\u5e86\u8282",
        "2011-9-12": "\u4e2d\u79cb\u8282",
        "2012-9-30": "\u4e2d\u79cb\u8282",
        "2013-9-19": "\u4e2d\u79cb\u8282",
        "2011-2-17": "\u5143\u5bb5\u8282",
        "2012-2-6": "\u5143\u5bb5\u8282",
        "2013-2-24": "\u5143\u5bb5\u8282"
    },
    festWidth: 120,
    festCls: {
        "\u5143\u65e6": "yuan_dan",
        "\u9664\u5915": "chu_xi",
        "\u6625\u8282": "chun_jie",
        "\u5143\u5bb5\u8282": "yuan_xiao",
        "\u6e05\u660e\u8282": "qing_ming",
        "\u7aef\u5348\u8282": "duan_wu",
        "\u52b3\u52a8\u8282": "lao_dong",
        "\u4e2d\u79cb\u8282": "zhong_qiu",
        "\u56fd\u5e86\u8282": "guo_qing"
    },
    template: '<div class="calendar_title01"><a id="calendar_lastmonth">&nbsp;</a><span id="calendar_title1">{$frontMonthStr}</span></div><div class="calendar_title02"><a id="calendar_nextmonth">&nbsp;</a><span id="calendar_title2">{$endMonthStr}</span></div><dl id="calendar_month1" t="{$frontMonth}">{$header}<dd>{$frontDay}</dd></dl><dl id="calendar_month2" t="{$endMonth}">{$header}<dd>{$endDay}</dd></dl><i>&nbsp;</i><b>&nbsp;</b>',
    className: {
        today: "today",
        over: "over_day",
        blank: "blank_day",
        select: "select_day"
    },
    attr: ["mod_calendar_rangeStart", "mod_calendar_rangeEnd", "mod_calendar_rangeException", "mod_calendar_permit", "mod_calendar_prohibit", "mod_calendar_weekday", "mod_calendar_hook", "mod_calendar_focusNext", "mod_calendar_reference", "mod_calendar_dateNote"],
    init: $doNothing,
    current: null
}; (function(a) {
    function b() {
        var b = a.string.weekday.split(""),
        b = b.map(function(a, b) {
            return '<dt class="day' + b + '">' + a + "</dt>"
        }).join("");
        a.template = a.template.replace(/\{\$header\}/g, b);
        b = b = null
    }
    function c(a) {
        if (!a.$getData("__inited__")) {
            a.$r("focus", f);
            a.$r("blur", g);
            a.addEventListener ? a.addEventListener("input", j, !1) : a.attachEvent("onpropertychange",
            function() {
                e = window.event;
                e.propertyName == "value" && j(e)
            });
            a.module.calendar = {
                hook: {},
                redraw: $doNothing,
                check: function() {
                    q.setConfig(a);
                    return q._check()
                }
            };
            r.push(a);
            a.$setData("__inited__", 1);
            var b = a.value.trim();
			
            b && b.isDateTime() && a.module.calendar.check()
        }
    }
    function d() {
        a.current && q.show()
    }
    function f(b) {
        b = $fixE(b);
        a.current = b.$target;
        q.setConfig(this);
        q.handleFocus(b)
    }
    function g(b) {
        a.current = null;
        q.handleBlur(b)
    }
    function j(a) {
        q.handleChange(a)
    }
    function p(a) {
        q.addCurrentMonth(a);
        q.fresh();
        return ! 1
    }
    function m(a) {
        a = new Date(a);
        a.setDate(1);
        return a
    }
    function n(b) {
        b = $fixE(b).$target;
        b.setCapture && (h(), b.setCapture(), k = b);
        if (!b || b.nodeName !== "A" && b.className != "span_fest" || b.className === a.className.blank || b.className === a.className.over) return ! 1;
        if (b.id === "calendar_nextmonth") return p(2);
        if (b.id === "calendar_lastmonth") return p( - 2);
        q.handleMousedown(b);
        return ! 1
    }
    function h() {
        k && k.releaseCapture && (k.releaseCapture(), k = null)
    }
    var q, r = [],
    s;
    b.prototype = {
        addCurrentMonth: function(a) {
            var b = this._data._current;
            a || (a = 0);
            b.setMonth(b.getMonth() + a);
            return b
        },
        setConfig: function(b) {
            this._elem = b;
            this._data = b.$getModAttrs(a.attr);
            this._transConfig()
        },
        handleFocus: function() {
            this._fresh()
        },
        handleBlur: function() {
            this.hide();
            h()
        },
        handleChange: function(a) {
            this.setDateNote(a.nodeType ? a: a.srcElement || a.target)
        },
        fresh: function() {
            this._toHtml(!0)
        },
        focusNext: function() {
            var a = this;
            a._data.focusNext && setTimeout(function() {
                a._elem.$focusNext()
            },
            1)
        },
        _transConfig: function() {
            var a = this._elem,
            b = this._data,
            c = $$.status.today.isDateTime();
            this._today = new Date(c);
            this._closeAutoComplete(a);
            b._current = m(c);
            b._select = null;
            if (b.rangeStart) b.rangeStart = b.rangeStart === "#" ? c: b.rangeStart.isDateTime();
            if (b.rangeEnd) b.rangeEnd = b.rangeEnd === "#" ? c: b.rangeEnd.isDateTime();
            b.weekday = b.weekday || "1234567";
            if (b.rangeException) b.rangeException = b.rangeException.split("|");
            if (b.permit) b.permit = b.permit.split("|");
            if (b.prohibit) b.prohibit = b.prohibit.split("|");
            if (b.hook) c = b.hook,
            b.hook = {},
            c.replace(/(on)?([^;:]+):([^;]+)/gi,
            function(a, c, d, f) {
                b.hook[d.toLowerCase()] = f
            });
            if (b.focusNext) b.focusNext = /^(1|true)$/i.test(b.focusNext);
            if (b.reference) b.reference = $(b.reference);
            b.check = this._check;
            b.redraw = $doNothing;
            var a = a.module.calendar,
            d;
            for (d in b) a[d] && !$isEmptyObj(a[d]) && (b[d] = a[d]),
            d.indexOf("_") !== 0 && (a[d] = b[d]);
            a = b = c = a = null
        },
        _closeAutoComplete: function(a) {
            a.setAttribute("autoComplete", "off");
            $r("beforeunload",
            function() {
                a.setAttribute("autoComplete", "on")
            })
        },
        _toMatrix: function(b, c) {
            var d = b.getFullYear(),
            f = this._data,
            g = b.getMonth(),
            h = 0,
            n = [31, d % 4 || d % 400 && !d % 100 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            m = a.className,
            k = b.getDay(),
            j = !1,
            p = [],
            q = [],
            r,
            s;
            for (s = 0; s < 6; s++) {
                p[s] = [];
                for (r = 0; r < 7; r++) {
                    for (;;) {
                        var x = {
                            n: 0,
                            c: null
                        },
                        h = s * 7 + r - k + 1;
                        if (h <= 0 || h > n[g]) {
                            x.c = m.blank;
                            break
                        }
                        x.n = h;
                        b = new Date(d, g, h);
                        if ( + b === +this._today) x.c = m.today;
                        if (this._check(b)) j = !0;
                        else {
                            x.c = m.over;
                            break
                        }
                        if ( + b === +f._select || f.reference && +f.reference.value.isDateTime() === +b) x.c = m.select;
                        if ((h = a.fest[b.toStdString()]) && a.festCls[h]) x.c ? x.c = "festival_select " + a.festCls[h] : x.c = a.festCls[h],
                        x.n = '<span class="span_fest">' + x.n + "</span>";
                        break
                    }
                    p[s][r] = x
                }
            }
            if (!j && c) return null;
            for (s = 0; s < 6; s++) for (r = 0; r < 7; r++) q.push('<a href="javascript:;" {$cls}>{$d}</a>'.replaceWith({
                cls: p[s][r].c ? 'class="' + p[s][r].c + '"': "",
                d: p[s][r].n || "&nbsp;"
            }));
            return q.join("")
        },
        _check: function(a) {
            var b = this._elem,
            c = this._data;
            if (a) b = a.toStdString();
            else {
                b = b.isNull && b.isNull() ? "": b.value.trim();
                a = b.isDateTime();
                if (!a) return ! 1;
                this.setDateNote()
            }
            if (c.rangeStart && a < c.rangeStart || c.rangeEnd && a > c.rangeEnd) return ! 1;
            b += "|";
            if ((c.rangeException && (c.rangeException.join("|") + "|").indexOf(b) !== -1 || c.prohibit && (c.prohibit.join("|") + "|").indexOf(b) !== -1 || c.weekday.indexOf(a.getDay() || 7) === -1) && !(c.permit && (c.permit.join("|") + "|").indexOf(b) !== -1)) return ! 1;
            return ! 0
        },
        _fresh: function() {
            var a = this._elem.value.isDateTime(),
            b = this._data;
            if (b.reference) {
                var c = b.reference.value.isDateTime();
                if (c && b.rangeStart && c > b.rangeStart) b._current = m(c)
            }
            if (a) {
                if (b.rangeStart && a > b.rangeStart) b._current = m(a);
                b._select = new Date(a)
            } else b._select = null;
            this._toHtml();
            this.show()
        },
        _toHtml: function(b) {
            var c = this._data._current,
            d = this._data.rangeEnd,
            f = [],
            g = [],
            h = l = 0;
            do {
                g[h] = new Date(c.getFullYear(), c.getMonth() + l++, 1);
                d && g[h] >= new Date(d.getFullYear(), d.getMonth(), 1) && (b = !0);
                var m = this._toMatrix(g[h], !b && !h);
                m && (f.push(m), h++)
            } while ( h <= 1 );
            l - h && c.setMonth(c.getMonth() + (l - h));
            s.innerHTML = a.template.replaceWith({
                frontMonthStr: this._toTitleString(g[0]),
                endMonthStr: this._toTitleString(g[1]),
                frontMonth: this._toYearMonth(g[0]),
                endMonth: this._toYearMonth(g[1]),
                frontDay: f[0],
                endDay: f[1]
            })
        },
        _toYearMonth: function(b) {
            var c = a.string,
            d = b.getMonth(),
            b = b.getFullYear();
            return c.f.replace("yyyy", b).replace("mm", $$.status.version === "en" ? c.b.split("|")[d] : d + 1)
        },
        _toTitleString: function(b) {
            return $$.status.version === "en" ? a.string.b.split("|")[b.getMonth()] + "&nbsp;" + b.getFullYear() : b.getFullYear() + a.string.a + "&nbsp;" + (b.getMonth() + 1) + a.string.b
        },
        show: function() {
            var b = s.style;
            if (b.display) b.display = "";
            s.$setPos(a.current, "auto");
            s.$setIframe()
        },
        hide: function() {
            s.$clearIframe();
            s.style.display = "none";
            a.current = null
        },
        callback: function() {
            var a = this._data.hook && this._data.hook.change;
            if (a) {
                if (Object.prototype.toString.call(a) === "[object String]") for (var b = a.split("."), a = b[0] === "this" ? this._elem: _[b[0]], c = 1, d = b.length; c < d; c++) if (a[b[c]]) a = a[b[c]];
                else throw b.slice(0, c).toString() + "is undefined";
                a.call(null, this._elem)
            }
        },
        setDateNote: function(b) {
            var b = b || this._elem,
            c = b.value.isDateTime(),
            c = c ? c.toStdString() : "",
            d = this._data ? this._data.dateNote: b.getAttribute("mod_calendar_dateNote") || "";
            if (c) {
                if (! (d == "off" || d != "on" && b.offsetWidth < a.festWidth || $$.status.version == "en")) {
                    if (d = a.fest[c]) c = d;
                    else {
                        var f = new Date,
                        d = f.getFullYear(),
                        g = f.getMonth(),
                        f = f.getDate(),
                        m = {};
                        m[(new Date(d, g, f)).toStdString()] = "\u4eca\u5929";
                        m[(new Date(d, g, f + 1)).toStdString()] = "\u660e\u5929";
                        m[(new Date(d, g, f + 2)).toStdString()] = "\u540e\u5929";
                        c = m[c] || "\u661f\u671f" + "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".substr((new Date(c.replace(/-/g, "/"))).getDay(), 1)
                    }
                    b.dateNoteElem ? b.dateNoteElem.innerHTML = c: (d = $c("span"), d.innerHTML = c, d.style.cssText = "position:absolute;color:#999;text-align:right;width:40px;padding-right:3px;height:" + b.offsetHeight + "px;line-height:" + (b.offsetHeight + 2) + "px;margin-left:" + (b.offsetWidth - 43) + "px;", b.dateNoteElem = d, d.onmousedown = function(a) {
                        a = $fixE(a);
                        a = a.$target;
                        a.setCapture && (h(), a.setCapture(), k = a);
                        return ! 1
                    },
                    d.onmouseup = h, b.parentNode.insertBefore(d, b), d.onclick = function() {
                        b.focus()
                    })
                }
            } else if (b && b.dateNoteElem) b.dateNoteElem.innerHTML = "\u3000"
        },
        handleMousedown: function(a) {
            var b = this._elem,
            c;
            var d = a.innerText || a.textContent; (a = a.$parentNode("dl")) && (c = a.getAttribute("t").replace("dd", d));
            b.value = c;
            this.setDateNote();
            this._elem.blur();
            this.focusNext();
            this.callback();
            return ! 1
        }
    };
    var k = null;
    Ctrip.module.calendar = function(a) {
        q || (q = new b);
        c(a);
        q.setDateNote(a);
        if (!s) s = $("tuna_calendar"),
        s.onmousedown = n,
        s.onmouseup = h,
        _.$r("resize", d)
    }
})($$.module.calendar); (function() {
    if ($$.browser.IE6) try {
        __.execCommand("BackgroundImageCache", !1, !0)
    } catch(a) {}
    $$.status.alertDiv.innerHTML = $$.status.version.match(/^zh-/) ? '<table border="0" cellspacing="0" cellpadding="0" class="base_popwindow01"><tr><td class="base_poptl"></td><td class="base_poptc"><div></div></td><td class="base_poptr"></td></tr><tr><td class="base_popml"></td><td id="alertInfo" class="base_popmc">\u5185\u5bb9</td><td class="base_popmr"></td></tr><tr><td class="base_popbl"></td><td class="base_popbc"><div></div></td><td class="base_popbr"></td></tr></table>': '<table id="alertTable" style="font-family:Arial;margin:0;" cellpadding="0" cellspacing="0"><tr><td style="margin:0;padding:0px 2px 2px 0px;background:#E7E7E7;"><div id="alertInfo" style="margin:0px;padding:10px;font-size:12px;text-align:left;background:#FFFFE8;border:1px solid #FFDF47;color:#000;white-space:nowrap;">\u5185\u5bb9</div></td></tr></table>';
    $r("domReady",
    function() {
        $(__.body);
        var a = $$.status.saveStatus.value;
        if (a) $$.status.back = !0;
        $$.status.pageValue = $fromJson(a || "{}");
        if (! ("data" in $$.status.pageValue)) $$.status.pageValue.data = {};
        $$.browser.Opera || $r("beforeunload", $savePageValue, 90)
    },
    10);
    $r("domready", [$parserRe, $fixElement,
    function() {
        try {
            __.body.focus()
        } catch(a) {}
    }]);
    $r("load", [evtDomReady,
    function() {
        $$.status.load = !0
    }])
})();
