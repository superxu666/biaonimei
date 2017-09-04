var BNM = window.BNM || {};
BNM.home = {
    init: function() {
        this.miniHeader(),
        this.typeText()
    },
    miniHeader: function() {
        var a = $("#js-mini-header")
          , b = $("#js-normal-header")
          , c = a.outerHeight();
        $(window).scroll(function() {
            var d = $(this).scrollTop();
            d > b.outerHeight() ? a.css({
                top: 0,
                opacity: 1
            }) : a.css({
                top: 0 - c - 10,
                opacity: 0
            })
        })
    },
    typeText: function() {
        function a(a) {
            for (var b, c = 0, d = 0, e = a.length; e > d; d++)
                h[d] = a.charAt(d);
            return b = setInterval(function() {
                return c == e ? void clearInterval(b) : (i.append(h[c]),
                k.text(j.width()),
                j.show(),
                void c++)
            }, 50)
        }
        var b, c, d, e = $("#js-type-text"), f = ".mark", b = ".slogan-text", g = ".mark-value", h = [], i = e.find(b), j = e.find(f), k = e.find(g), l = 0;
        b = ["一款自动化设计标注工具", "云端智能分析，全自动处理", "元素大小间距，颜色字体轻松获取", "px/dp/pt随意转换，不再困扰", "与团队成员分享，轻松方便"],
        c = b.length,
        d = a(b[l]),
        setInterval(function() {
            l == c - 1 && (l = -1),
            d && (clearInterval(d),
            d = null),
            i.html(""),
            l++,
            d = a(b[l])
        }, 4e3)
    }
},
BNM.login = {
    init: function(a) {
        this.mask = $("#js-login-mask"),
        this.dialog = $("#js-dialog-login"),
        this.$dom = a || $(".js-bnm-login"),
        this.doing = {},
        this.bindEvent()
    },
    bindEvent: function() {
        function a() {
            var a = ".login-tips";
            $(this).siblings(a).html("")
        }
        function b(a) {
            if (13 == a.keyCode) {
                var b = {
                    email: $.trim(h.val()),
                    password: $.trim(i.val()),
                    code: $.trim(j.val())
                };
                c.mailLogin(b, {
                    $mail: h,
                    $pwd: i,
                    $vcode: j
                })
            }
        }
        var c = this
          , d = this.dialog
          , e = ".login-tab li"
          , f = ".btn-login"
          , g = ".btn-refresh"
          , h = d.find(".in-mail")
          , i = d.find(".in-pwd")
          , j = d.find(".in-vcode")
          , k = $("#js-img-vcode");
        this.$dom.on("click", function() {
            return c.open.call(c),
            !1
        }),
        h.on("focus", a),
        i.on("focus", a),
        j.on("focus", a),
        h.on("keyup", b),
        i.on("keyup", b),
        j.on("keyup", b),
        this.mask.on("click", function() {
            c.close()
        }),
        d.on("click", ".js-close", function() {
            c.close()
        }),
        d.on("click", e, function() {
            var a = $(this).data("show")
              , b = $(this).data("hide");
            a && (d.find("." + a).show(),
            d.find("." + b).hide())
        }),
        d.on("click", f, function() {
            var a = {
                email: $.trim(h.val()),
                password: $.trim(i.val()),
                code: $.trim(j.val())
            };
            c.mailLogin(a, {
                $mail: h,
                $pwd: i,
                $vcode: j
            })
        }),
        d.on("click", g, function() {
            k.attr("src", "/identify?simp=" + Date.now())
        })
    },
    open: function() {
        this.mask.fadeIn(300),
        this.dialog.fadeIn(300)
    },
    close: function() {
        this.mask.fadeOut(300),
        this.dialog.fadeOut(300)
    },
    mailLogin: function(a, b) {
        var c, d = "/maillogin", e = this, f = ".login-tips", g = b.$mail.siblings(f), h = b.$pwd.siblings(f), i = b.$vcode.siblings(f);
        if (c = {
            12: {
                $dom: h,
                msg: "密码错误，请重新输入！"
            },
            9: {
                $dom: i,
                msg: "验证码过期，请刷新！"
            },
            10: {
                $dom: i,
                msg: "验证码输入错误，请重新输入！"
            },
            11: {
                $dom: g,
                msg: "用户名不存在"
            }
        },
        this.loginValidate(a, b)) {
            if (this.doing.mailLogin)
                return;
            $.post(d, a, function(a) {
                e.doing.mailLogin = !1,
                1 == a.status ? window.location.href = "/home" : 0 == a.status && e.loginTips(c[a.result])
            }, "json")
        }
    },
    loginValidate: function(a, b) {
        var c, d, e, f = BNM.define.mailReg, g = ".login-tips", h = b.$mail.siblings(g), i = b.$pwd.siblings(g), j = b.$vcode.siblings(g);
        return "" == a.email ? (h.html("邮箱不能为空！"),
        c = !1) : f.test(a.email) ? (h.html(""),
        c = !0) : (h.html("邮箱格式不对！"),
        c = !1),
        "" == a.password ? (d = !1,
        i.html("请输入密码！")) : (d = !0,
        i.html("")),
        "" == a.code ? (e = !1,
        j.html("请输入验证码！")) : (e = !0,
        j.html("")),
        e && c && d
    },
    loginTips: function(a) {
        a && a.$dom.html(a.msg)
    }
},
BNM.home.init(),
BNM.login.init();
