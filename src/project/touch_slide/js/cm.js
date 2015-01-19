!function(a) {
	var b, c, d = {
		version: 4.3
	};
	a.WeixinApi = d, "function" == typeof define && (define.amd || define.cmd) && (define.amd ? define(function() {
		return d
	}) : define.cmd && define(function(a, b, c) {
		c.exports = d
	})), b = function() {
		var a, b, c, d, e = {};
		for (c = 0, d = arguments.length; d > c; c++) if (a = arguments[c], "object" == typeof a) for (b in a) a[b] && (e[b] = a[b]);
		return e
	}, c = function(a, c, e) {
		var f, g;
		e = e || {}, f = function(a) {
			switch (!0) {
			case /\:
				cancel$ / i.test(a.err_msg): e.cancel && e.cancel(a);
				break;
			case /\:
				(confirm | ok) $ / i.test(a.err_msg): e.confirm && e.confirm(a);
				break;
			case /\:
				fail$ / i.test(a.err_msg): default:
				e.fail && e.fail(a)
			}
			e.all && e.all(a)
		}, g = function(b, c) {
			if ("menu:share:timeline" == a.menu || "general:share" == a.menu && "timeline" == c.shareTo) {
				var d = b.title;
				b.title = b.desc || d, b.desc = d || b.desc
			}!c || "favorite" != c.shareTo && "favorite" != c.scene ? "general:share" === a.menu ? "timeline" === c.shareTo ? WeixinJSBridge.invoke("shareTimeline", b, f) : "friend" === c.shareTo ? WeixinJSBridge.invoke("sendAppMessage", b, f) : "QQ" === c.shareTo ? WeixinJSBridge.invoke("shareQQ", b, f) : "weibo" === c.shareTo && WeixinJSBridge.invoke("shareWeibo", b, f) : WeixinJSBridge.invoke(a.action, b, f) : e.favorite === !1 ? WeixinJSBridge.invoke("sendAppMessage", b, new Function) : WeixinJSBridge.invoke(a.action, b, f)
		}, WeixinJSBridge.on(a.menu, function(a) {
			if (e.dataLoaded = e.dataLoaded || new Function, e.async && e.ready) d._wx_loadedCb_ = e.dataLoaded, d._wx_loadedCb_.toString().indexOf("_wx_loadedCb_") > 0 && (d._wx_loadedCb_ = new Function), e.dataLoaded = function(f) {
				e.__cbkCalled = !0;
				var h = b(c, f);
				h.img_url = h.imgUrl || h.img_url, delete h.imgUrl, d._wx_loadedCb_(h), g(h, a)
			}, (!a || "favorite" != a.shareTo && "favorite" != a.scene || e.favorite !== !1) && (e.ready && e.ready(a, c), e.__cbkCalled || (e.dataLoaded({}), e.__cbkCalled = !1));
			else {
				var f = b(c);
				(!a || "favorite" != a.shareTo && "favorite" != a.scene || e.favorite !== !1) && e.ready && e.ready(a, f), g(f, a)
			}
		})
	}, d.shareToTimeline = function(a, b) {
		c({
			menu: "menu:share:timeline",
			action: "shareTimeline"
		}, {
			appid: a.appId ? a.appId : "",
			img_url: a.imgUrl,
			link: a.link,
			desc: a.desc,
			title: a.title,
			img_width: "640",
			img_height: "640"
		}, b)
	}, d.shareToFriend = function(a, b) {
		c({
			menu: "menu:share:appmessage",
			action: "sendAppMessage"
		}, {
			appid: a.appId ? a.appId : "",
			img_url: a.imgUrl,
			link: a.link,
			desc: a.desc,
			title: a.title,
			img_width: "640",
			img_height: "640"
		}, b)
	}, d.shareToWeibo = function(a, b) {
		c({
			menu: "menu:share:weibo",
			action: "shareWeibo"
		}, {
			content: a.desc,
			url: a.link
		}, b)
	}, d.generalShare = function(a, b) {
		c({
			menu: "general:share"
		}, {
			appid: a.appId ? a.appId : "",
			img_url: a.imgUrl,
			link: a.link,
			desc: a.desc,
			title: a.title,
			img_width: "640",
			img_height: "640"
		}, b)
	}, d.disabledShare = function(a) {
		a = a ||
		function() {
			alert("当前页面禁止分享！")
		}, ["menu:share:timeline", "menu:share:appmessage", "menu:share:qq", "menu:share:weibo", "general:share"].forEach(function(b) {
			WeixinJSBridge.on(b, function() {
				return a(), !1
			})
		})
	}, d.imagePreview = function(a, b) {
		a && b && 0 != b.length && WeixinJSBridge.invoke("imagePreview", {
			current: a,
			urls: b
		})
	}, d.showOptionMenu = function() {
		WeixinJSBridge.call("showOptionMenu")
	}, d.hideOptionMenu = function() {
		WeixinJSBridge.call("hideOptionMenu")
	}, d.showToolbar = function() {
		WeixinJSBridge.call("showToolbar")
	}, d.hideToolbar = function() {
		WeixinJSBridge.call("hideToolbar")
	}, d.getNetworkType = function(a) {
		a && "function" == typeof a && WeixinJSBridge.invoke("getNetworkType", {}, function(b) {
			a(b.err_msg)
		})
	}, d.closeWindow = function(a) {
		a = a || {}, WeixinJSBridge.invoke("closeWindow", {}, function(b) {
			switch (b.err_msg) {
			case "close_window:ok":
				a.success && a.success(b);
				break;
			default:
				a.fail && a.fail(b)
			}
		})
	}, d.ready = function(b) {
		var c, d, e = function() {
				var a = {};
				Object.keys(WeixinJSBridge).forEach(function(b) {
					a[b] = WeixinJSBridge[b]
				}), Object.keys(WeixinJSBridge).forEach(function(b) {
					"function" == typeof WeixinJSBridge[b] && (WeixinJSBridge[b] = function() {
						try {
							var c = arguments.length > 0 ? arguments[0] : {},
								d = c.__params ? c.__params.__runOn3rd_apis || [] : [];
							["menu:share:timeline", "menu:share:appmessage", "menu:share:weibo", "menu:share:qq", "general:share"].forEach(function(a) {
								-1 === d.indexOf(a) && d.push(a)
							})
						} catch (e) {}
						return a[b].apply(WeixinJSBridge, arguments)
					})
				})
			};
		b && "function" == typeof b && (c = this, d = function() {
			e(), b(c)
		}, "undefined" == typeof a.WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", d, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", d), document.attachEvent("onWeixinJSBridgeReady", d)) : d())
	}, d.openInWeixin = function() {
		return /MicroMessenger/i.test(navigator.userAgent)
	}, d.sendEmail = function(a, b) {
		b = b || {}, WeixinJSBridge.invoke("sendEmail", {
			title: a.subject,
			content: a.body
		}, function(a) {
			"send_email:sent" === a.err_msg ? b.success && b.success(a) : b.fail && b.fail(a), b.all && b.all(a)
		})
	}, d.enableDebugMode = function(b) {
		a.onerror = function(a, c, d, e) {
			if ("function" == typeof b) b({
				message: a,
				script: c,
				line: d,
				column: e
			});
			else {
				var f = [];
				f.push("额，代码有错。。。"), f.push("\n错误信息：", a), f.push("\n出错文件：", c), f.push("\n出错位置：", d + "行，" + e + "列"), alert(f.join(""))
			}
		}
	}, d.share = function(a, b) {
		d.ready(function(c) {
			c.shareToFriend(a, b), c.shareToTimeline(a, b), c.shareToWeibo(a, b), c.generalShare(a, b)
		})
	}
}(window);
(function(a) {
	String.prototype.trim === a && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	}), Array.prototype.reduce === a && (Array.prototype.reduce = function(b) {
		if (this === void 0 || this === null) throw new TypeError;
		var c = Object(this),
			d = c.length >>> 0,
			e = 0,
			f;
		if (typeof b != "function") throw new TypeError;
		if (d == 0 && arguments.length == 1) throw new TypeError;
		if (arguments.length >= 2) f = arguments[1];
		else do {
			if (e in c) {
				f = c[e++];
				break
			}
			if (++e >= d) throw new TypeError
		} while (!0);
		while (e < d) e in c && (f = b.call(a, f, c[e], e, c)), e++;
		return f
	})
})();
var Zepto = function() {
		function E(a) {
			return a == null ? String(a) : y[z.call(a)] || "object"
		}

		function F(a) {
			return E(a) == "function"
		}

		function G(a) {
			return a != null && a == a.window
		}

		function H(a) {
			return a != null && a.nodeType == a.DOCUMENT_NODE
		}

		function I(a) {
			return E(a) == "object"
		}

		function J(a) {
			return I(a) && !G(a) && a.__proto__ == Object.prototype
		}

		function K(a) {
			return a instanceof Array
		}

		function L(a) {
			return typeof a.length == "number"
		}

		function M(a) {
			return g.call(a, function(a) {
				return a != null
			})
		}

		function N(a) {
			return a.length > 0 ? c.fn.concat.apply([], a) : a
		}

		function O(a) {
			return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}

		function P(a) {
			return a in j ? j[a] : j[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
		}

		function Q(a, b) {
			return typeof b == "number" && !l[O(a)] ? b + "px" : b
		}

		function R(a) {
			var b, c;
			return i[a] || (b = h.createElement(a), h.body.appendChild(b), c = k(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), c == "none" && (c = "block"), i[a] = c), i[a]
		}

		function S(a) {
			return "children" in a ? f.call(a.children) : c.map(a.childNodes, function(a) {
				if (a.nodeType == 1) return a
			})
		}

		function T(c, d, e) {
			for (b in d) e && (J(d[b]) || K(d[b])) ? (J(d[b]) && !J(c[b]) && (c[b] = {}), K(d[b]) && !K(c[b]) && (c[b] = []), T(c[b], d[b], e)) : d[b] !== a && (c[b] = d[b])
		}

		function U(b, d) {
			return d === a ? c(b) : c(b).filter(d)
		}

		function V(a, b, c, d) {
			return F(b) ? b.call(a, c, d) : b
		}

		function W(a, b, c) {
			c == null ? a.removeAttribute(b) : a.setAttribute(b, c)
		}

		function X(b, c) {
			var d = b.className,
				e = d && d.baseVal !== a;
			if (c === a) return e ? d.baseVal : d;
			e ? d.baseVal = c : b.className = c
		}

		function Y(a) {
			var b;
			try {
				return a ? a == "true" || (a == "false" ? !1 : a == "null" ? null : isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? c.parseJSON(a) : a : b) : a
			} catch (d) {
				return a
			}
		}

		function Z(a, b) {
			b(a);
			for (var c in a.childNodes) Z(a.childNodes[c], b)
		}
		var a, b, c, d, e = [],
			f = e.slice,
			g = e.filter,
			h = window.document,
			i = {},
			j = {},
			k = h.defaultView.getComputedStyle,
			l = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			m = /^\s*<(\w+|!)[^>]*>/,
			n = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
			o = /^(?:body|html)$/i,
			p = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			q = ["after", "prepend", "before", "append"],
			r = h.createElement("table"),
			s = h.createElement("tr"),
			t = {
				tr: h.createElement("tbody"),
				tbody: r,
				thead: r,
				tfoot: r,
				td: s,
				th: s,
				"*": h.createElement("div")
			},
			u = /complete|loaded|interactive/,
			v = /^\.([\w-]+)$/,
			w = /^#([\w-]*)$/,
			x = /^[\w-]+$/,
			y = {},
			z = y.toString,
			A = {},
			B, C, D = h.createElement("div");
		return A.matches = function(a, b) {
			if (!a || a.nodeType !== 1) return !1;
			var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
			if (c) return c.call(a, b);
			var d, e = a.parentNode,
				f = !e;
			return f && (e = D).appendChild(a), d = ~A.qsa(e, b).indexOf(a), f && D.removeChild(a), d
		}, B = function(a) {
			return a.replace(/-+(.)?/g, function(a, b) {
				return b ? b.toUpperCase() : ""
			})
		}, C = function(a) {
			return g.call(a, function(b, c) {
				return a.indexOf(b) == c
			})
		}, A.fragment = function(b, d, e) {
			b.replace && (b = b.replace(n, "<$1></$2>")), d === a && (d = m.test(b) && RegExp.$1), d in t || (d = "*");
			var g, h, i = t[d];
			return i.innerHTML = "" + b, h = c.each(f.call(i.childNodes), function() {
				i.removeChild(this)
			}), J(e) && (g = c(h), c.each(e, function(a, b) {
				p.indexOf(a) > -1 ? g[a](b) : g.attr(a, b)
			})), h
		}, A.Z = function(a, b) {
			return a = a || [], a.__proto__ = c.fn, a.selector = b || "", a
		}, A.isZ = function(a) {
			return a instanceof A.Z
		}, A.init = function(b, d) {
			if (!b) return A.Z();
			if (F(b)) return c(h).ready(b);
			if (A.isZ(b)) return b;
			var e;
			if (K(b)) e = M(b);
			else if (I(b)) e = [J(b) ? c.extend({}, b) : b], b = null;
			else if (m.test(b)) e = A.fragment(b.trim(), RegExp.$1, d), b = null;
			else {
				if (d !== a) return c(d).find(b);
				e = A.qsa(h, b)
			}
			return A.Z(e, b)
		}, c = function(a, b) {
			return A.init(a, b)
		}, c.extend = function(a) {
			var b, c = f.call(arguments, 1);
			return typeof a == "boolean" && (b = a, a = c.shift()), c.forEach(function(c) {
				T(a, c, b)
			}), a
		}, A.qsa = function(a, b) {
			var c;
			return H(a) && w.test(b) ? (c = a.getElementById(RegExp.$1)) ? [c] : [] : a.nodeType !== 1 && a.nodeType !== 9 ? [] : f.call(v.test(b) ? a.getElementsByClassName(RegExp.$1) : x.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b))
		}, c.contains = function(a, b) {
			return a !== b && a.contains(b)
		}, c.type = E, c.isFunction = F, c.isWindow = G, c.isArray = K, c.isPlainObject = J, c.isEmptyObject = function(a) {
			var b;
			for (b in a) return !1;
			return !0
		}, c.inArray = function(a, b, c) {
			return e.indexOf.call(b, a, c)
		}, c.camelCase = B, c.trim = function(a) {
			return a.trim()
		}, c.uuid = 0, c.support = {}, c.expr = {}, c.map = function(a, b) {
			var c, d = [],
				e, f;
			if (L(a)) for (e = 0; e < a.length; e++) c = b(a[e], e), c != null && d.push(c);
			else for (f in a) c = b(a[f], f), c != null && d.push(c);
			return N(d)
		}, c.each = function(a, b) {
			var c, d;
			if (L(a)) {
				for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
			} else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
			return a
		}, c.grep = function(a, b) {
			return g.call(a, b)
		}, window.JSON && (c.parseJSON = JSON.parse), c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
			y["[object " + b + "]"] = b.toLowerCase()
		}), c.fn = {
			forEach: e.forEach,
			reduce: e.reduce,
			push: e.push,
			sort: e.sort,
			indexOf: e.indexOf,
			concat: e.concat,
			map: function(a) {
				return c(c.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice: function() {
				return c(f.apply(this, arguments))
			},
			ready: function(a) {
				return u.test(h.readyState) ? a(c) : h.addEventListener("DOMContentLoaded", function() {
					a(c)
				}, !1), this
			},
			get: function(b) {
				return b === a ? f.call(this) : this[b >= 0 ? b : b + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					this.parentNode != null && this.parentNode.removeChild(this)
				})
			},
			each: function(a) {
				return e.every.call(this, function(b, c) {
					return a.call(b, c, b) !== !1
				}), this
			},
			filter: function(a) {
				return F(a) ? this.not(this.not(a)) : c(g.call(this, function(b) {
					return A.matches(b, a)
				}))
			},
			add: function(a, b) {
				return c(C(this.concat(c(a, b))))
			},
			is: function(a) {
				return this.length > 0 && A.matches(this[0], a)
			},
			not: function(b) {
				var d = [];
				if (F(b) && b.call !== a) this.each(function(a) {
					b.call(this, a) || d.push(this)
				});
				else {
					var e = typeof b == "string" ? this.filter(b) : L(b) && F(b.item) ? f.call(b) : c(b);
					this.forEach(function(a) {
						e.indexOf(a) < 0 && d.push(a)
					})
				}
				return c(d)
			},
			has: function(a) {
				return this.filter(function() {
					return I(a) ? c.contains(this, a) : c(this).find(a).size()
				})
			},
			eq: function(a) {
				return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
			},
			first: function() {
				var a = this[0];
				return a && !I(a) ? a : c(a)
			},
			last: function() {
				var a = this[this.length - 1];
				return a && !I(a) ? a : c(a)
			},
			find: function(a) {
				var b, d = this;
				return typeof a == "object" ? b = c(a).filter(function() {
					var a = this;
					return e.some.call(d, function(b) {
						return c.contains(b, a)
					})
				}) : this.length == 1 ? b = c(A.qsa(this[0], a)) : b = this.map(function() {
					return A.qsa(this, a)
				}), b
			},
			closest: function(a, b) {
				var d = this[0],
					e = !1;
				typeof a == "object" && (e = c(a));
				while (d && !(e ? e.indexOf(d) >= 0 : A.matches(d, a))) d = d !== b && !H(d) && d.parentNode;
				return c(d)
			},
			parents: function(a) {
				var b = [],
					d = this;
				while (d.length > 0) d = c.map(d, function(a) {
					if ((a = a.parentNode) && !H(a) && b.indexOf(a) < 0) return b.push(a), a
				});
				return U(b, a)
			},
			parent: function(a) {
				return U(C(this.pluck("parentNode")), a)
			},
			children: function(a) {
				return U(this.map(function() {
					return S(this)
				}), a)
			},
			contents: function() {
				return this.map(function() {
					return f.call(this.childNodes)
				})
			},
			siblings: function(a) {
				return U(this.map(function(a, b) {
					return g.call(S(b.parentNode), function(a) {
						return a !== b
					})
				}), a)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(a) {
				return c.map(this, function(b) {
					return b[a]
				})
			},
			show: function() {
				return this.each(function() {
					this.style.display == "none" && (this.style.display = null), k(this, "").getPropertyValue("display") == "none" && (this.style.display = R(this.nodeName))
				})
			},
			replaceWith: function(a) {
				return this.before(a).remove()
			},
			wrap: function(a) {
				var b = F(a);
				if (this[0] && !b) var d = c(a).get(0),
					e = d.parentNode || this.length > 1;
				return this.each(function(f) {
					c(this).wrapAll(b ? a.call(this, f) : e ? d.cloneNode(!0) : d)
				})
			},
			wrapAll: function(a) {
				if (this[0]) {
					c(this[0]).before(a = c(a));
					var b;
					while ((b = a.children()).length) a = b.first();
					c(a).append(this)
				}
				return this
			},
			wrapInner: function(a) {
				var b = F(a);
				return this.each(function(d) {
					var e = c(this),
						f = e.contents(),
						g = b ? a.call(this, d) : a;
					f.length ? f.wrapAll(g) : e.append(g)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					c(this).replaceWith(c(this).children())
				}), this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(b) {
				return this.each(function() {
					var d = c(this);
					(b === a ? d.css("display") == "none" : b) ? d.show() : d.hide()
				})
			},
			prev: function(a) {
				return c(this.pluck("previousElementSibling")).filter(a || "*")
			},
			next: function(a) {
				return c(this.pluck("nextElementSibling")).filter(a || "*")
			},
			html: function(b) {
				return b === a ? this.length > 0 ? this[0].innerHTML : null : this.each(function(a) {
					var d = this.innerHTML;
					c(this).empty().append(V(this, b, a, d))
				})
			},
			text: function(b) {
				return b === a ? this.length > 0 ? this[0].textContent : null : this.each(function() {
					this.textContent = b
				})
			},
			attr: function(c, d) {
				var e;
				return typeof c == "string" && d === a ? this.length == 0 || this[0].nodeType !== 1 ? a : c == "value" && this[0].nodeName == "INPUT" ? this.val() : !(e = this[0].getAttribute(c)) && c in this[0] ? this[0][c] : e : this.each(function(a) {
					if (this.nodeType !== 1) return;
					if (I(c)) for (b in c) W(this, b, c[b]);
					else W(this, c, V(this, d, a, this.getAttribute(c)))
				})
			},
			removeAttr: function(a) {
				return this.each(function() {
					this.nodeType === 1 && W(this, a)
				})
			},
			prop: function(b, c) {
				return c === a ? this[0] && this[0][b] : this.each(function(a) {
					this[b] = V(this, c, a, this[b])
				})
			},
			data: function(b, c) {
				var d = this.attr("data-" + O(b), c);
				return d !== null ? Y(d) : a
			},
			val: function(b) {
				return b === a ? this[0] && (this[0].multiple ? c(this[0]).find("option").filter(function(a) {
					return this.selected
				}).pluck("value") : this[0].value) : this.each(function(a) {
					this.value = V(this, b, a, this.value)
				})
			},
			offset: function(a) {
				if (a) return this.each(function(b) {
					var d = c(this),
						e = V(this, a, b, d.offset()),
						f = d.offsetParent().offset(),
						g = {
							top: e.top - f.top,
							left: e.left - f.left
						};
					d.css("position") == "static" && (g.position = "relative"), d.css(g)
				});
				if (this.length == 0) return null;
				var b = this[0].getBoundingClientRect();
				return {
					left: b.left + window.pageXOffset,
					top: b.top + window.pageYOffset,
					width: Math.round(b.width),
					height: Math.round(b.height)
				}
			},
			css: function(a, c) {
				if (arguments.length < 2 && typeof a == "string") return this[0] && (this[0].style[B(a)] || k(this[0], "").getPropertyValue(a));
				var d = "";
				if (E(a) == "string")!c && c !== 0 ? this.each(function() {
					this.style.removeProperty(O(a))
				}) : d = O(a) + ":" + Q(a, c);
				else for (b in a)!a[b] && a[b] !== 0 ? this.each(function() {
					this.style.removeProperty(O(b))
				}) : d += O(b) + ":" + Q(b, a[b]) + ";";
				return this.each(function() {
					this.style.cssText += ";" + d
				})
			},
			index: function(a) {
				return a ? this.indexOf(c(a)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(a) {
				return e.some.call(this, function(a) {
					return this.test(X(a))
				}, P(a))
			},
			addClass: function(a) {
				return this.each(function(b) {
					d = [];
					var e = X(this),
						f = V(this, a, b, e);
					f.split(/\s+/g).forEach(function(a) {
						c(this).hasClass(a) || d.push(a)
					}, this), d.length && X(this, e + (e ? " " : "") + d.join(" "))
				})
			},
			removeClass: function(b) {
				return this.each(function(c) {
					if (b === a) return X(this, "");
					d = X(this), V(this, b, c, d).split(/\s+/g).forEach(function(a) {
						d = d.replace(P(a), " ")
					}), X(this, d.trim())
				})
			},
			toggleClass: function(b, d) {
				return this.each(function(e) {
					var f = c(this),
						g = V(this, b, e, X(this));
					g.split(/\s+/g).forEach(function(b) {
						(d === a ? !f.hasClass(b) : d) ? f.addClass(b) : f.removeClass(b)
					})
				})
			},
			scrollTop: function() {
				if (!this.length) return;
				return "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY
			},
			position: function() {
				if (!this.length) return;
				var a = this[0],
					b = this.offsetParent(),
					d = this.offset(),
					e = o.test(b[0].nodeName) ? {
						top: 0,
						left: 0
					} : b.offset();
				return d.top -= parseFloat(c(a).css("margin-top")) || 0, d.left -= parseFloat(c(a).css("margin-left")) || 0, e.top += parseFloat(c(b[0]).css("border-top-width")) || 0, e.left += parseFloat(c(b[0]).css("border-left-width")) || 0, {
					top: d.top - e.top,
					left: d.left - e.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var a = this.offsetParent || h.body;
					while (a && !o.test(a.nodeName) && c(a).css("position") == "static") a = a.offsetParent;
					return a
				})
			}
		}, c.fn.detach = c.fn.remove, ["width", "height"].forEach(function(b) {
			c.fn[b] = function(d) {
				var e, f = this[0],
					g = b.replace(/./, function(a) {
						return a[0].toUpperCase()
					});
				return d === a ? G(f) ? f["inner" + g] : H(f) ? f.documentElement["offset" + g] : (e = this.offset()) && e[b] : this.each(function(a) {
					f = c(this), f.css(b, V(this, d, a, f[b]()))
				})
			}
		}), q.forEach(function(a, b) {
			var d = b % 2;
			c.fn[a] = function() {
				var a, e = c.map(arguments, function(b) {
					return a = E(b), a == "object" || a == "array" || b == null ? b : A.fragment(b)
				}),
					f, g = this.length > 1;
				return e.length < 1 ? this : this.each(function(a, h) {
					f = d ? h : h.parentNode, h = b == 0 ? h.nextSibling : b == 1 ? h.firstChild : b == 2 ? h : null, e.forEach(function(a) {
						if (g) a = a.cloneNode(!0);
						else if (!f) return c(a).remove();
						Z(f.insertBefore(a, h), function(a) {
							a.nodeName != null && a.nodeName.toUpperCase() === "SCRIPT" && (!a.type || a.type === "text/javascript") && !a.src && window.eval.call(window, a.innerHTML)
						})
					})
				})
			}, c.fn[d ? a + "To" : "insert" + (b ? "Before" : "After")] = function(b) {
				return c(b)[a](this), this
			}
		}), A.Z.prototype = c.fn, A.uniq = C, A.deserializeValue = Y, c.zepto = A, c
	}();
window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function(a) {
	function b(a) {
		var b = this.os = {},
			c = this.browser = {},
			d = a.match(/WebKit\/([\d.]+)/),
			e = a.match(/(Android)\s+([\d.]+)/),
			f = a.match(/(iPad).*OS\s([\d_]+)/),
			g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/),
			h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			i = h && a.match(/TouchPad/),
			j = a.match(/Kindle\/([\d.]+)/),
			k = a.match(/Silk\/([\d._]+)/),
			l = a.match(/(BlackBerry).*Version\/([\d.]+)/),
			m = a.match(/(BB10).*Version\/([\d.]+)/),
			n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			o = a.match(/PlayBook/),
			p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
			q = a.match(/Firefox\/([\d.]+)/);
		if (c.webkit = !! d) c.version = d[1];
		e && (b.android = !0, b.version = e[2]), g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")), f && (b.ios = b.ipad = !0, b.version = f[2].replace(/_/g, ".")), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0), l && (b.blackberry = !0, b.version = l[2]), m && (b.bb10 = !0, b.version = m[2]), n && (b.rimtabletos = !0, b.version = n[2]), o && (c.playbook = !0), j && (b.kindle = !0, b.version = j[1]), k && (c.silk = !0, c.version = k[1]), !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0), p && (c.chrome = !0, c.version = p[1]), q && (c.firefox = !0, c.version = q[1]), b.tablet = !! (f || o || e && !a.match(/Mobile/) || q && a.match(/Tablet/)), b.phone = !b.tablet && !! (e || g || h || l || m || p && a.match(/Android/) || p && a.match(/CriOS\/([\d.]+)/) || q && a.match(/Mobile/))
	}
	b.call(a, navigator.userAgent), a.__detect = b
}(Zepto), function(a) {
	function g(a) {
		return a._zid || (a._zid = d++)
	}

	function h(a, b, d, e) {
		b = i(b);
		if (b.ns) var f = j(b.ns);
		return (c[g(a)] || []).filter(function(a) {
			return a && (!b.e || a.e == b.e) && (!b.ns || f.test(a.ns)) && (!d || g(a.fn) === g(d)) && (!e || a.sel == e)
		})
	}

	function i(a) {
		var b = ("" + a).split(".");
		return {
			e: b[0],
			ns: b.slice(1).sort().join(" ")
		}
	}

	function j(a) {
		return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
	}

	function k(b, c, d) {
		a.type(b) != "string" ? a.each(b, d) : b.split(/\s/).forEach(function(a) {
			d(a, c)
		})
	}

	function l(a, b) {
		return a.del && (a.e == "focus" || a.e == "blur") || !! b
	}

	function m(a) {
		return f[a] || a
	}

	function n(b, d, e, h, j, n) {
		var o = g(b),
			p = c[o] || (c[o] = []);
		k(d, e, function(c, d) {
			var e = i(c);
			e.fn = d, e.sel = h, e.e in f && (d = function(b) {
				var c = b.relatedTarget;
				if (!c || c !== this && !a.contains(this, c)) return e.fn.apply(this, arguments)
			}), e.del = j && j(d, c);
			var g = e.del || d;
			e.proxy = function(a) {
				var c = g.apply(b, [a].concat(a.data));
				return c === !1 && (a.preventDefault(), a.stopPropagation()), c
			}, e.i = p.length, p.push(e), b.addEventListener(m(e.e), e.proxy, l(e, n))
		})
	}

	function o(a, b, d, e, f) {
		var i = g(a);
		k(b || "", d, function(b, d) {
			h(a, b, d, e).forEach(function(b) {
				delete c[i][b.i], a.removeEventListener(m(b.e), b.proxy, l(b, f))
			})
		})
	}

	function t(b) {
		var c, d = {
			originalEvent: b
		};
		for (c in b)!r.test(c) && b[c] !== undefined && (d[c] = b[c]);
		return a.each(s, function(a, c) {
			d[a] = function() {
				return this[c] = p, b[a].apply(b, arguments)
			}, d[c] = q
		}), d
	}

	function u(a) {
		if (!("defaultPrevented" in a)) {
			a.defaultPrevented = !1;
			var b = a.preventDefault;
			a.preventDefault = function() {
				this.defaultPrevented = !0, b.call(this)
			}
		}
	}
	var b = a.zepto.qsa,
		c = {},
		d = 1,
		e = {},
		f = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
	e.click = e.mousedown = e.mouseup = e.mousemove = "MouseEvents", a.event = {
		add: n,
		remove: o
	}, a.proxy = function(b, c) {
		if (a.isFunction(b)) {
			var d = function() {
					return b.apply(c, arguments)
				};
			return d._zid = g(b), d
		}
		if (typeof c == "string") return a.proxy(b[c], b);
		throw new TypeError("expected function")
	}, a.fn.bind = function(a, b) {
		return this.each(function() {
			n(this, a, b)
		})
	}, a.fn.unbind = function(a, b) {
		return this.each(function() {
			o(this, a, b)
		})
	}, a.fn.one = function(a, b) {
		return this.each(function(c, d) {
			n(this, a, b, null, function(a, b) {
				return function() {
					var c = a.apply(d, arguments);
					return o(d, b, a), c
				}
			})
		})
	};
	var p = function() {
			return !0
		},
		q = function() {
			return !1
		},
		r = /^([A-Z]|layer[XY]$)/,
		s = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
	a.fn.delegate = function(b, c, d) {
		return this.each(function(e, f) {
			n(f, c, d, b, function(c) {
				return function(d) {
					var e, g = a(d.target).closest(b, f).get(0);
					if (g) return e = a.extend(t(d), {
						currentTarget: g,
						liveFired: f
					}), c.apply(g, [e].concat([].slice.call(arguments, 1)))
				}
			})
		})
	}, a.fn.undelegate = function(a, b, c) {
		return this.each(function() {
			o(this, b, c, a)
		})
	}, a.fn.live = function(b, c) {
		return a(document.body).delegate(this.selector, b, c), this
	}, a.fn.die = function(b, c) {
		return a(document.body).undelegate(this.selector, b, c), this
	}, a.fn.on = function(b, c, d) {
		return !c || a.isFunction(c) ? this.bind(b, c || d) : this.delegate(c, b, d)
	}, a.fn.off = function(b, c, d) {
		return !c || a.isFunction(c) ? this.unbind(b, c || d) : this.undelegate(c, b, d)
	}, a.fn.trigger = function(b, c) {
		if (typeof b == "string" || a.isPlainObject(b)) b = a.Event(b);
		return u(b), b.data = c, this.each(function() {
			"dispatchEvent" in this && this.dispatchEvent(b)
		})
	}, a.fn.triggerHandler = function(b, c) {
		var d, e;
		return this.each(function(f, g) {
			d = t(typeof b == "string" ? a.Event(b) : b), d.data = c, d.target = g, a.each(h(g, b.type || b), function(a, b) {
				e = b.proxy(d);
				if (d.isImmediatePropagationStopped()) return !1
			})
		}), e
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
		a.fn[b] = function(a) {
			return a ? this.bind(b, a) : this.trigger(b)
		}
	}), ["focus", "blur"].forEach(function(b) {
		a.fn[b] = function(a) {
			return a ? this.bind(b, a) : this.each(function() {
				try {
					this[b]()
				} catch (a) {}
			}), this
		}
	}), a.Event = function(a, b) {
		typeof a != "string" && (b = a, a = b.type);
		var c = document.createEvent(e[a] || "Events"),
			d = !0;
		if (b) for (var f in b) f == "bubbles" ? d = !! b[f] : c[f] = b[f];
		return c.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null), c.isDefaultPrevented = function() {
			return this.defaultPrevented
		}, c
	}
}(Zepto), function($) {
	function triggerAndReturn(a, b, c) {
		var d = $.Event(b);
		return $(a).trigger(d, c), !d.defaultPrevented
	}

	function triggerGlobal(a, b, c, d) {
		if (a.global) return triggerAndReturn(b || document, c, d)
	}

	function ajaxStart(a) {
		a.global && $.active++ === 0 && triggerGlobal(a, null, "ajaxStart")
	}

	function ajaxStop(a) {
		a.global && !--$.active && triggerGlobal(a, null, "ajaxStop")
	}

	function ajaxBeforeSend(a, b) {
		var c = b.context;
		if (b.beforeSend.call(c, a, b) === !1 || triggerGlobal(b, c, "ajaxBeforeSend", [a, b]) === !1) return !1;
		triggerGlobal(b, c, "ajaxSend", [a, b])
	}

	function ajaxSuccess(a, b, c) {
		var d = c.context,
			e = "success";
		c.success.call(d, a, e, b), triggerGlobal(c, d, "ajaxSuccess", [b, c, a]), ajaxComplete(e, b, c)
	}

	function ajaxError(a, b, c, d) {
		var e = d.context;
		d.error.call(e, c, b, a), triggerGlobal(d, e, "ajaxError", [c, d, a]), ajaxComplete(b, c, d)
	}

	function ajaxComplete(a, b, c) {
		var d = c.context;
		c.complete.call(d, b, a), triggerGlobal(c, d, "ajaxComplete", [b, c]), ajaxStop(c)
	}

	function empty() {}

	function mimeToDataType(a) {
		return a && (a = a.split(";", 2)[0]), a && (a == htmlType ? "html" : a == jsonType ? "json" : scriptTypeRE.test(a) ? "script" : xmlTypeRE.test(a) && "xml") || "text"
	}

	function appendQuery(a, b) {
		return (a + "&" + b).replace(/[&?]{1,2}/, "?")
	}

	function serializeData(a) {
		a.processData && a.data && $.type(a.data) != "string" && (a.data = $.param(a.data, a.traditional)), a.data && (!a.type || a.type.toUpperCase() == "GET") && (a.url = appendQuery(a.url, a.data))
	}

	function parseArguments(a, b, c, d) {
		var e = !$.isFunction(b);
		return {
			url: a,
			data: e ? b : undefined,
			success: e ? $.isFunction(c) ? c : undefined : b,
			dataType: e ? d || c : c
		}
	}

	function serialize(a, b, c, d) {
		var e, f = $.isArray(b);
		$.each(b, function(b, g) {
			e = $.type(g), d && (b = c ? d : d + "[" + (f ? "" : b) + "]"), !d && f ? a.add(g.name, g.value) : e == "array" || !c && e == "object" ? serialize(a, g, c, b) : a.add(b, g)
		})
	}
	var jsonpID = 0,
		document = window.document,
		key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		scriptTypeRE = /^(?:text|application)\/javascript/i,
		xmlTypeRE = /^(?:text|application)\/xml/i,
		jsonType = "application/json",
		htmlType = "text/html",
		blankRE = /^\s*$/;
	$.active = 0, $.ajaxJSONP = function(a) {
		if ("type" in a) {
			var b = "jsonp" + ++jsonpID,
				c = document.createElement("script"),
				d = function() {
					clearTimeout(g), $(c).remove(), delete window[b]
				},
				e = function(c) {
					d();
					if (!c || c == "timeout") window[b] = empty;
					ajaxError(null, c || "abort", f, a)
				},
				f = {
					abort: e
				},
				g;
			return ajaxBeforeSend(f, a) === !1 ? (e("abort"), !1) : (window[b] = function(b) {
				d(), ajaxSuccess(b, f, a)
			}, c.onerror = function() {
				e("error")
			}, c.src = a.url.replace(/=\?/, "=" + b), $("head").append(c), a.timeout > 0 && (g = setTimeout(function() {
				e("timeout")
			}, a.timeout)), f)
		}
		return $.ajax(a)
	}, $.ajaxSettings = {
		type: "GET",
		beforeSend: empty,
		success: empty,
		error: empty,
		complete: empty,
		context: null,
		global: !0,
		xhr: function() {
			return new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript",
			json: jsonType,
			xml: "application/xml, text/xml",
			html: htmlType,
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0,
		processData: !0,
		cache: !0
	}, $.ajax = function(options) {
		var settings = $.extend({}, options || {});
		for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
		ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
		var dataType = settings.dataType,
			hasPlaceholder = /=\?/.test(settings.url);
		if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")), $.ajaxJSONP(settings);
		var mime = settings.accepts[dataType],
			baseHeaders = {},
			protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
			xhr = settings.xhr(),
			abortTimeout;
		settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime));
		if (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded";
		settings.headers = $.extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
				var result, error = !1;
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
					dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText;
					try {
						dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
					} catch (e) {
						error = e
					}
					error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings)
				} else ajaxError(null, xhr.status ? "error" : "abort", xhr, settings)
			}
		};
		var async = "async" in settings ? settings.async : !0;
		xhr.open(settings.type, settings.url, async);
		for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
		return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function() {
			xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings)
		}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr)
	}, $.get = function(a, b, c, d) {
		return $.ajax(parseArguments.apply(null, arguments))
	}, $.post = function(a, b, c, d) {
		var e = parseArguments.apply(null, arguments);
		return e.type = "POST", $.ajax(e)
	}, $.getJSON = function(a, b, c) {
		var d = parseArguments.apply(null, arguments);
		return d.dataType = "json", $.ajax(d)
	}, $.fn.load = function(a, b, c) {
		if (!this.length) return this;
		var d = this,
			e = a.split(/\s/),
			f, g = parseArguments(a, b, c),
			h = g.success;
		return e.length > 1 && (g.url = e[0], f = e[1]), g.success = function(a) {
			d.html(f ? $("<div>").html(a.replace(rscript, "")).find(f) : a), h && h.apply(d, arguments)
		}, $.ajax(g), this
	};
	var escape = encodeURIComponent;
	$.param = function(a, b) {
		var c = [];
		return c.add = function(a, b) {
			this.push(escape(a) + "=" + escape(b))
		}, serialize(c, a, b), c.join("&").replace(/%20/g, "+")
	}
}(Zepto), function(a) {
	a.fn.serializeArray = function() {
		var b = [],
			c;
		return a(Array.prototype.slice.call(this.get(0).elements)).each(function() {
			c = a(this);
			var d = c.attr("type");
			this.nodeName.toLowerCase() != "fieldset" && !this.disabled && d != "submit" && d != "reset" && d != "button" && (d != "radio" && d != "checkbox" || this.checked) && b.push({
				name: c.attr("name"),
				value: c.val()
			})
		}), b
	}, a.fn.serialize = function() {
		var a = [];
		return this.serializeArray().forEach(function(b) {
			a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
		}), a.join("&")
	}, a.fn.submit = function(b) {
		if (b) this.bind("submit", b);
		else if (this.length) {
			var c = a.Event("submit");
			this.eq(0).trigger(c), c.defaultPrevented || this.get(0).submit()
		}
		return this
	}
}(Zepto), function(a, b) {
	function s(a) {
		return t(a.replace(/([a-z])([A-Z])/, "$1-$2"))
	}

	function t(a) {
		return a.toLowerCase()
	}

	function u(a) {
		return d ? d + a : t(a)
	}
	var c = "",
		d, e, f, g = {
			Webkit: "webkit",
			Moz: "",
			O: "o",
			ms: "MS"
		},
		h = window.document,
		i = h.createElement("div"),
		j = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		k, l, m, n, o, p, q, r = {};
	a.each(g, function(a, e) {
		if (i.style[a + "TransitionProperty"] !== b) return c = "-" + t(a) + "-", d = e, !1
	}), k = c + "transform", r[l = c + "transition-property"] = r[m = c + "transition-duration"] = r[n = c + "transition-timing-function"] = r[o = c + "animation-name"] = r[p = c + "animation-duration"] = r[q = c + "animation-timing-function"] = "", a.fx = {
		off: d === b && i.style.transitionProperty === b,
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: c,
		transitionEnd: u("TransitionEnd"),
		animationEnd: u("AnimationEnd")
	}, a.fn.animate = function(b, c, d, e) {
		return a.isPlainObject(c) && (d = c.easing, e = c.complete, c = c.duration), c && (c = (typeof c == "number" ? c : a.fx.speeds[c] || a.fx.speeds._default) / 1e3), this.anim(b, c, d, e)
	}, a.fn.anim = function(c, d, e, f) {
		var g, h = {},
			i, t = "",
			u = this,
			v, w = a.fx.transitionEnd;
		d === b && (d = .4), a.fx.off && (d = 0);
		if (typeof c == "string") h[o] = c, h[p] = d + "s", h[q] = e || "linear", w = a.fx.animationEnd;
		else {
			i = [];
			for (g in c) j.test(g) ? t += g + "(" + c[g] + ") " : (h[g] = c[g], i.push(s(g)));
			t && (h[k] = t, i.push(k)), d > 0 && typeof c == "object" && (h[l] = i.join(", "), h[m] = d + "s", h[n] = e || "linear")
		}
		return v = function(b) {
			if (typeof b != "undefined") {
				if (b.target !== b.currentTarget) return;
				a(b.target).unbind(w, v)
			}
			a(this).css(r), f && f.call(this)
		}, d > 0 && this.bind(w, v), this.size() && this.get(0).clientLeft, this.css(h), d <= 0 && setTimeout(function() {
			u.each(function() {
				v.call(this)
			})
		}, 0), this
	}, i = null
}(Zepto);
(function() {
	var e;
	e = function() {
		var e, t, n;
		t = [];
		e = function(t, r) {
			var i;
			if (!t) {
				return n()
			} else if (e.toType(t) === "function") {
				return e(document).ready(t)
			} else {
				i = e.getDOMObject(t, r);
				return n(i, t)
			}
		};
		n = function(e, r) {
			e = e || t;
			e.__proto__ = n.prototype;
			e.selector = r || "";
			return e
		};
		e.extend = function(e) {
			Array.prototype.slice.call(arguments, 1).forEach(function(t) {
				var n, r;
				r = [];
				for (n in t) {
					r.push(e[n] = t[n])
				}
				return r
			});
			return e
		};
		n.prototype = e.fn = {};
		return e
	}();
	window.Quo = e;
	"$$" in window || (window.$$ = e)
}).call(this);
(function() {
	(function(e) {
		var t, n, r, i, u, a, o, s, c, f, l;
		t = {
			TYPE: "GET",
			MIME: "json"
		};
		r = {
			script: "text/javascript, application/javascript",
			json: "application/json",
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain"
		};
		n = 0;
		e.ajaxSettings = {
			type: t.TYPE,
			async: true,
			success: {},
			error: {},
			context: null,
			dataType: t.MIME,
			headers: {},
			xhr: function() {
				return new window.XMLHttpRequest
			},
			crossDomain: false,
			timeout: 0
		};
		e.ajax = function(n) {
			var r, o, f, h;
			f = e.mix(e.ajaxSettings, n);
			if (f.type === t.TYPE) {
				f.url += e.serializeParameters(f.data, "?")
			} else {
				f.data = e.serializeParameters(f.data)
			}
			if (i(f.url)) {
				return e.jsonp(f)
			}
			h = f.xhr();
			h.onreadystatechange = function() {
				if (h.readyState === 4) {
					clearTimeout(r);
					return c(h, f)
				}
			};
			h.open(f.type, f.url, f.async);
			s(h, f);
			if (f.timeout > 0) {
				r = setTimeout(function() {
					return l(h, f)
				}, f.timeout)
			}
			try {
				h.send(f.data)
			} catch (d) {
				o = d;
				h = o;
				a("Resource not found", h, f)
			}
			if (f.async) {
				return h
			} else {
				return u(h, f)
			}
		};
		e.jsonp = function(t) {
			var r, i, u, a;
			if (t.async) {
				i = "jsonp" + ++n;
				u = document.createElement("script");
				a = {
					abort: function() {
						e(u).remove();
						if (i in window) {
							return window[i] = {}
						}
					}
				};
				r = void 0;
				window[i] = function(n) {
					clearTimeout(r);
					e(u).remove();
					delete window[i];
					return f(n, a, t)
				};
				u.src = t.url.replace(RegExp("=\\?"), "=" + i);
				e("head").append(u);
				if (t.timeout > 0) {
					r = setTimeout(function() {
						return l(a, t)
					}, t.timeout)
				}
				return a
			} else {
				return console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")
			}
		};
		e.get = function(t, n, r, i) {
			return e.ajax({
				url: t,
				data: n,
				success: r,
				dataType: i
			})
		};
		e.post = function(e, t, n, r) {
			return o("POST", e, t, n, r)
		};
		e.put = function(e, t, n, r) {
			return o("PUT", e, t, n, r)
		};
		e["delete"] = function(e, t, n, r) {
			return o("DELETE", e, t, n, r)
		};
		e.json = function(n, r, i) {
			return e.ajax({
				url: n,
				data: r,
				success: i,
				dataType: t.MIME
			})
		};
		e.serializeParameters = function(e, t) {
			var n, r;
			if (t == null) {
				t = ""
			}
			r = t;
			for (n in e) {
				if (e.hasOwnProperty(n)) {
					if (r !== t) {
						r += "&"
					}
					r += "" + encodeURIComponent(n) + "=" + encodeURIComponent(e[n])
				}
			}
			if (r === t) {
				return ""
			} else {
				return r
			}
		};
		c = function(e, t) {
			if (e.status >= 200 && e.status < 300 || e.status === 0) {
				if (t.async) {
					f(u(e, t), e, t)
				}
			} else {
				a("QuoJS.ajax: Unsuccesful request", e, t)
			}
		};
		f = function(e, t, n) {
			n.success.call(n.context, e, t)
		};
		a = function(e, t, n) {
			n.error.call(n.context, e, t, n)
		};
		s = function(e, t) {
			var n;
			if (t.contentType) {
				t.headers["Content-Type"] = t.contentType
			}
			if (t.dataType) {
				t.headers["Accept"] = r[t.dataType]
			}
			for (n in t.headers) {
				e.setRequestHeader(n, t.headers[n])
			}
		};
		l = function(e, t) {
			e.onreadystatechange = {};
			e.abort();
			a("QuoJS.ajax: Timeout exceeded", e, t)
		};
		o = function(t, n, r, i, u) {
			return e.ajax({
				type: t,
				url: n,
				data: r,
				success: i,
				dataType: u,
				contentType: "application/x-www-form-urlencoded"
			})
		};
		u = function(e, n) {
			var r, i;
			i = e.responseText;
			if (i) {
				if (n.dataType === t.MIME) {
					try {
						i = JSON.parse(i)
					} catch (u) {
						r = u;
						i = r;
						a("QuoJS.ajax: Parse Error", e, n)
					}
				} else {
					if (n.dataType === "xml") {
						i = e.responseXML
					}
				}
			}
			return i
		};
		return i = function(e) {
			return RegExp("=\\?").test(e)
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		var t, n, r, i, u, a, o, s;
		t = [];
		i = Object.prototype;
		r = /^\s*<(\w+|!)[^>]*>/;
		u = document.createElement("table");
		a = document.createElement("tr");
		n = {
			tr: document.createElement("tbody"),
			tbody: u,
			thead: u,
			tfoot: u,
			td: a,
			th: a,
			"*": document.createElement("div")
		};
		e.toType = function(e) {
			return i.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
		};
		e.isOwnProperty = function(e, t) {
			return i.hasOwnProperty.call(e, t)
		};
		e.getDOMObject = function(t, n) {
			var i, u, a;
			i = null;
			u = [1, 9, 11];
			a = e.toType(t);
			if (a === "array") {
				i = o(t)
			} else if (a === "string" && r.test(t)) {
				i = e.fragment(t.trim(), RegExp.$1);
				t = null
			} else if (a === "string") {
				i = e.query(document, t);
				if (n) {
					if (i.length === 1) {
						i = e.query(i[0], n)
					} else {
						i = e.map(function() {
							return e.query(i, n)
						})
					}
				}
			} else if (u.indexOf(t.nodeType) >= 0 || t === window) {
				i = [t];
				t = null
			}
			return i
		};
		e.map = function(t, n) {
			var r, i, u, a;
			a = [];
			r = void 0;
			i = void 0;
			if (e.toType(t) === "array") {
				r = 0;
				while (r < t.length) {
					u = n(t[r], r);
					if (u != null) {
						a.push(u)
					}
					r++
				}
			} else {
				for (i in t) {
					u = n(t[i], i);
					if (u != null) {
						a.push(u)
					}
				}
			}
			return s(a)
		};
		e.each = function(t, n) {
			var r, i;
			r = void 0;
			i = void 0;
			if (e.toType(t) === "array") {
				r = 0;
				while (r < t.length) {
					if (n.call(t[r], r, t[r]) === false) {
						return t
					}
					r++
				}
			} else {
				for (i in t) {
					if (n.call(t[i], i, t[i]) === false) {
						return t
					}
				}
			}
			return t
		};
		e.mix = function() {
			var t, n, r, i, u;
			r = {};
			t = 0;
			i = arguments.length;
			while (t < i) {
				n = arguments[t];
				for (u in n) {
					if (e.isOwnProperty(n, u) && n[u] !== undefined) {
						r[u] = n[u]
					}
				}
				t++
			}
			return r
		};
		e.fragment = function(t, r) {
			var i;
			if (r == null) {
				r = "*"
			}
			if (!(r in n)) {
				r = "*"
			}
			i = n[r];
			i.innerHTML = "" + t;
			return e.each(Array.prototype.slice.call(i.childNodes), function() {
				return i.removeChild(this)
			})
		};
		e.fn.map = function(t) {
			return e.map(this, function(e, n) {
				return t.call(e, n, e)
			})
		};
		e.fn.instance = function(e) {
			return this.map(function() {
				return this[e]
			})
		};
		e.fn.filter = function(t) {
			return e([].filter.call(this, function(n) {
				return n.parentNode && e.query(n.parentNode, t).indexOf(n) >= 0
			}))
		};
		e.fn.forEach = t.forEach;
		e.fn.indexOf = t.indexOf;
		o = function(e) {
			return e.filter(function(e) {
				return e !== void 0 && e !== null
			})
		};
		return s = function(e) {
			if (e.length > 0) {
				return [].concat.apply([], e)
			} else {
				return e
			}
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		e.fn.attr = function(t, n) {
			if (this.length === 0) {
				null
			}
			if (e.toType(t) === "string" && n === void 0) {
				return this[0].getAttribute(t)
			} else {
				return this.each(function() {
					return this.setAttribute(t, n)
				})
			}
		};
		e.fn.removeAttr = function(e) {
			return this.each(function() {
				return this.removeAttribute(e)
			})
		};
		e.fn.data = function(e, t) {
			return this.attr("data-" + e, t)
		};
		e.fn.removeData = function(e) {
			return this.removeAttr("data-" + e)
		};
		e.fn.val = function(t) {
			if (e.toType(t) === "string") {
				return this.each(function() {
					return this.value = t
				})
			} else {
				if (this.length > 0) {
					return this[0].value
				} else {
					return null
				}
			}
		};
		e.fn.show = function() {
			return this.style("display", "block")
		};
		e.fn.hide = function() {
			return this.style("display", "none")
		};
		e.fn.height = function() {
			var e;
			e = this.offset();
			return e.height
		};
		e.fn.width = function() {
			var e;
			e = this.offset();
			return e.width
		};
		e.fn.offset = function() {
			var e;
			e = this[0].getBoundingClientRect();
			return {
				left: e.left + window.pageXOffset,
				top: e.top + window.pageYOffset,
				width: e.width,
				height: e.height
			}
		};
		return e.fn.remove = function() {
			return this.each(function() {
				if (this.parentNode != null) {
					return this.parentNode.removeChild(this)
				}
			})
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		var t, n, r, i, u, a, o;
		r = null;
		t = /WebKit\/([\d.]+)/;
		n = {
			Android: /(Android)\s+([\d.]+)/,
			ipad: /(iPad).*OS\s([\d_]+)/,
			iphone: /(iPhone\sOS)\s([\d_]+)/,
			Blackberry: /(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,
			FirefoxOS: /(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,
			webOS: /(webOS|hpwOS)[\s\/]([\d.]+)/
		};
		e.isMobile = function() {
			r = r || u();
			return r.isMobile && r.os.name !== "firefoxOS"
		};
		e.environment = function() {
			r = r || u();
			return r
		};
		e.isOnline = function() {
			return navigator.onLine
		};
		u = function() {
			var e, t;
			t = navigator.userAgent;
			e = {};
			e.browser = i(t);
			e.os = a(t);
			e.isMobile = !! e.os;
			e.screen = o();
			return e
		};
		i = function(e) {
			var n;
			n = e.match(t);
			if (n) {
				return n[0]
			} else {
				return e
			}
		};
		a = function(e) {
			var t, r, i;
			t = null;
			for (r in n) {
				i = e.match(n[r]);
				if (i) {
					t = {
						name: r === "iphone" || r === "ipad" ? "ios" : r,
						version: i[2].replace("_", ".")
					};
					break
				}
			}
			return t
		};
		return o = function() {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		var t, n, r, i, u, a, o, s, c, f, l, h;
		t = 1;
		i = {};
		r = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
		n = {
			touchstart: "mousedown",
			touchmove: "mousemove",
			touchend: "mouseup",
			touch: "click",
			doubletap: "dblclick",
			orientationchange: "resize"
		};
		u = /complete|loaded|interactive/;
		e.fn.on = function(t, n, r) {
			if (n === "undefined" || e.toType(n) === "function") {
				return this.bind(t, n)
			} else {
				return this.delegate(n, t, r)
			}
		};
		e.fn.off = function(t, n, r) {
			if (n === "undefined" || e.toType(n) === "function") {
				return this.unbind(t, n)
			} else {
				return this.undelegate(n, t, r)
			}
		};
		e.fn.ready = function(t) {
			if (u.test(document.readyState)) {
				return t(e)
			} else {
				return e.fn.addEvent(document, "DOMContentLoaded", function() {
					return t(e)
				})
			}
		};
		e.Event = function(e, t) {
			var n, r;
			n = document.createEvent("Events");
			n.initEvent(e, true, true, null, null, null, null, null, null, null, null, null, null, null, null);
			if (t) {
				for (r in t) {
					n[r] = t[r]
				}
			}
			return n
		};
		e.fn.bind = function(e, t) {
			return this.each(function() {
				l(this, e, t)
			})
		};
		e.fn.unbind = function(e, t) {
			return this.each(function() {
				h(this, e, t)
			})
		};
		e.fn.delegate = function(t, n, r) {
			return this.each(function(i, u) {
				l(u, n, r, t, function(n) {
					return function(r) {
						var i, o;
						o = e(r.target).closest(t, u).get(0);
						if (o) {
							i = e.extend(a(r), {
								currentTarget: o,
								liveFired: u
							});
							return n.apply(o, [i].concat([].slice.call(arguments, 1)))
						}
					}
				})
			})
		};
		e.fn.undelegate = function(e, t, n) {
			return this.each(function() {
				h(this, t, n, e)
			})
		};
		e.fn.trigger = function(t, n, r) {
			if (e.toType(t) === "string") {
				t = e.Event(t, n)
			}
			if (r != null) {
				t.originalEvent = r
			}
			return this.each(function() {
				this.dispatchEvent(t)
			})
		};
		e.fn.addEvent = function(e, t, n) {
			if (e.addEventListener) {
				return e.addEventListener(t, n, false)
			} else if (e.attachEvent) {
				return e.attachEvent("on" + t, n)
			} else {
				return e["on" + t] = n
			}
		};
		e.fn.removeEvent = function(e, t, n) {
			if (e.removeEventListener) {
				return e.removeEventListener(t, n, false)
			} else if (e.detachEvent) {
				return e.detachEvent("on" + t, n)
			} else {
				return e["on" + t] = null
			}
		};
		l = function(t, n, r, u, a) {
			var c, l, h, d;
			n = s(n);
			h = f(t);
			l = i[h] || (i[h] = []);
			c = a && a(r, n);
			d = {
				event: n,
				callback: r,
				selector: u,
				proxy: o(c, r, t),
				delegate: c,
				index: l.length
			};
			l.push(d);
			return e.fn.addEvent(t, d.event, d.proxy)
		};
		h = function(t, n, r, u) {
			var a;
			n = s(n);
			a = f(t);
			return c(a, n, r, u).forEach(function(n) {
				delete i[a][n.index];
				return e.fn.removeEvent(t, n.event, n.proxy)
			})
		};
		f = function(e) {
			return e._id || (e._id = t++)
		};
		s = function(t) {
			var r;
			r = e.isMobile() ? t : n[t];
			return r || t
		};
		o = function(e, t, n) {
			var r;
			t = e || t;
			r = function(e) {
				var r;
				r = t.apply(n, [e].concat(e.data));
				if (r === false) {
					e.preventDefault()
				}
				return r
			};
			return r
		};
		c = function(e, t, n, r) {
			return (i[e] || []).filter(function(e) {
				return e && (!t || e.event === t) && (!n || e.callback === n) && (!r || e.selector === r)
			})
		};
		return a = function(t) {
			var n;
			n = e.extend({
				originalEvent: t
			}, t);
			e.each(r, function(e, r) {
				n[e] = function() {
					this[r] = function() {
						return true
					};
					return t[e].apply(t, arguments)
				};
				return n[r] = function() {
					return false
				}
			});
			return n
		}
	})(Quo)
}).call(this);
(function() {
	(function($$) {
		var CURRENT_TOUCH, EVENT, FIRST_TOUCH, GESTURE, GESTURES, HOLD_DELAY, TAPS, TOUCH_TIMEOUT, _angle, _capturePinch, _captureRotation, _cleanGesture, _distance, _fingersPosition, _getTouches, _hold, _isSwipe, _listenTouches, _onTouchEnd, _onTouchMove, _onTouchStart, _parentIfText, _swipeDirection, _trigger;
		TAPS = null;
		EVENT = void 0;
		GESTURE = {};
		FIRST_TOUCH = [];
		CURRENT_TOUCH = [];
		TOUCH_TIMEOUT = void 0;
		HOLD_DELAY = 650;
		GESTURES = ["touch", "tap", "singleTap", "doubleTap", "hold", "swipe", "swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "rotate", "rotating", "rotateLeft", "rotateRight", "pinch", "pinching", "pinchIn", "pinchOut", "drag", "dragLeft", "dragRight", "dragUp", "dragDown"];
		GESTURES.forEach(function(e) {
			$$.fn[e] = function(t) {
				var n;
				n = e === "touch" ? "touchend" : e;
				return $$(document.body).delegate(this.selector, n, t)
			};
			return this
		});
		$$(document).ready(function() {
			return _listenTouches()
		});
		_listenTouches = function() {
			var e;
			e = $$(document.body);
			e.bind("touchstart", _onTouchStart);
			e.bind("touchmove", _onTouchMove);
			e.bind("touchend", _onTouchEnd);
			document.body.addEventListener("touchleave", function() {
				console.log(1)
			}, false);
			return e.bind("touchcancel", _cleanGesture)
		};
		_onTouchStart = function(e) {
			var t, n, r, i;
			EVENT = e;
			r = Date.now();
			t = r - (GESTURE.last || r);
			TOUCH_TIMEOUT && clearTimeout(TOUCH_TIMEOUT);
			i = _getTouches(e);
			n = i.length;
			FIRST_TOUCH = _fingersPosition(i, n);
			GESTURE.el = $$(_parentIfText(i[0].target));
			GESTURE.fingers = n;
			GESTURE.last = r;
			if (!GESTURE.taps) {
				GESTURE.taps = 0
			}
			GESTURE.taps++;
			if (n === 1) {
				if (n >= 1) {
					GESTURE.gap = t > 0 && t <= 250
				}
				return setTimeout(_hold, HOLD_DELAY)
			} else if (n === 2) {
				GESTURE.initial_angle = parseInt(_angle(FIRST_TOUCH), 10);
				GESTURE.initial_distance = parseInt(_distance(FIRST_TOUCH), 10);
				GESTURE.angle_difference = 0;
				return GESTURE.distance_difference = 0
			}
		};
		_onTouchMove = function(e) {
			var t, n, r;
			EVENT = e;
			if (GESTURE.el) {
				r = _getTouches(e);
				t = r.length;
				if (t === GESTURE.fingers) {
					CURRENT_TOUCH = _fingersPosition(r, t);
					n = _isSwipe(e);
					if (n) {
						GESTURE.prevSwipe = true
					}
					if (n || GESTURE.prevSwipe === true) {
						_trigger("swiping")
					}
					if (t === 2) {
						_captureRotation();
						_capturePinch();
						e.preventDefault()
					}
				} else {
					_cleanGesture()
				}
			}
			return true
		};
		_isSwipe = function(e) {
			var t, n, r;
			t = false;
			if (CURRENT_TOUCH[0]) {
				n = Math.abs(FIRST_TOUCH[0].x - CURRENT_TOUCH[0].x) > 30;
				r = Math.abs(FIRST_TOUCH[0].y - CURRENT_TOUCH[0].y) > 30;
				t = GESTURE.el && (n || r)
			}
			return t
		};
		_onTouchEnd = function(e) {
			var t, n, r, i, u;
			EVENT = e;
			_trigger("touch");
			if (GESTURE.fingers === 1) {
				if (GESTURE.taps === 2 && GESTURE.gap) {
					_trigger("doubleTap");
					_cleanGesture()
				} else if (_isSwipe() || GESTURE.prevSwipe) {
					_trigger("swipe");
					u = _swipeDirection(FIRST_TOUCH[0].x, CURRENT_TOUCH[0].x, FIRST_TOUCH[0].y, CURRENT_TOUCH[0].y);
					_trigger("swipe" + u);
					_cleanGesture()
				} else {
					_trigger("tap");
					if (GESTURE.taps === 1) {
						TOUCH_TIMEOUT = setTimeout(function() {
							_trigger("singleTap");
							return _cleanGesture()
						}, 100)
					}
				}
			} else {
				t = false;
				if (GESTURE.angle_difference !== 0) {
					_trigger("rotate", {
						angle: GESTURE.angle_difference
					});
					i = GESTURE.angle_difference > 0 ? "rotateRight" : "rotateLeft";
					_trigger(i, {
						angle: GESTURE.angle_difference
					});
					t = true
				}
				if (GESTURE.distance_difference !== 0) {
					_trigger("pinch", {
						angle: GESTURE.distance_difference
					});
					r = GESTURE.distance_difference > 0 ? "pinchOut" : "pinchIn";
					_trigger(r, {
						distance: GESTURE.distance_difference
					});
					t = true
				}
				if (!t && CURRENT_TOUCH[0]) {
					if (Math.abs(FIRST_TOUCH[0].x - CURRENT_TOUCH[0].x) > 10 || Math.abs(FIRST_TOUCH[0].y - CURRENT_TOUCH[0].y) > 10) {
						_trigger("drag");
						n = _swipeDirection(FIRST_TOUCH[0].x, CURRENT_TOUCH[0].x, FIRST_TOUCH[0].y, CURRENT_TOUCH[0].y);
						_trigger("drag" + n)
					}
				}
				_cleanGesture()
			}
			return EVENT = void 0
		};
		_fingersPosition = function(e, t) {
			var n, r;
			r = [];
			n = 0;
			e = e[0].targetTouches ? e[0].targetTouches : e;
			while (n < t) {
				r.push({
					x: e[n].pageX,
					y: e[n].pageY
				});
				n++
			}
			return r
		};
		_captureRotation = function() {
			var angle, diff, i, symbol;
			angle = parseInt(_angle(CURRENT_TOUCH), 10);
			diff = parseInt(GESTURE.initial_angle - angle, 10);
			if (Math.abs(diff) > 20 || GESTURE.angle_difference !== 0) {
				i = 0;
				symbol = GESTURE.angle_difference < 0 ? "-" : "+";
				while (Math.abs(diff - GESTURE.angle_difference) > 90 && i++ < 10) {
					eval("diff " + symbol + "= 180;")
				}
				GESTURE.angle_difference = parseInt(diff, 10);
				return _trigger("rotating", {
					angle: GESTURE.angle_difference
				})
			}
		};
		_capturePinch = function() {
			var e, t;
			t = parseInt(_distance(CURRENT_TOUCH), 10);
			e = GESTURE.initial_distance - t;
			if (Math.abs(e) > 10) {
				GESTURE.distance_difference = e;
				return _trigger("pinching", {
					distance: e
				})
			}
		};
		_trigger = function(e, t) {
			if (GESTURE.el) {
				t = t || {};
				if (CURRENT_TOUCH[0]) {
					t.iniTouch = GESTURE.fingers > 1 ? FIRST_TOUCH : FIRST_TOUCH[0];
					t.currentTouch = GESTURE.fingers > 1 ? CURRENT_TOUCH : CURRENT_TOUCH[0]
				}
				return GESTURE.el.trigger(e, t, EVENT)
			}
		};
		_cleanGesture = function(e) {
			FIRST_TOUCH = [];
			CURRENT_TOUCH = [];
			GESTURE = {};
			return clearTimeout(TOUCH_TIMEOUT)
		};
		_angle = function(e) {
			var t, n, r;
			t = e[0];
			n = e[1];
			r = Math.atan((n.y - t.y) * -1 / (n.x - t.x)) * (180 / Math.PI);
			if (r < 0) {
				return r + 180
			} else {
				return r
			}
		};
		_distance = function(e) {
			var t, n;
			t = e[0];
			n = e[1];
			return Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y)) * -1
		};
		_getTouches = function(e) {
			if ($$.isMobile()) {
				return e.touches
			} else {
				return [e]
			}
		};
		_parentIfText = function(e) {
			if ("tagName" in e) {
				return e
			} else {
				return e.parentNode
			}
		};
		_swipeDirection = function(e, t, n, r) {
			var i, u;
			i = Math.abs(e - t);
			u = Math.abs(n - r);
			if (i >= u) {
				if (e - t > 0) {
					return "Left"
				} else {
					return "Right"
				}
			} else {
				if (n - r > 0) {
					return "Up"
				} else {
					return "Down"
				}
			}
		};
		return _hold = function() {
			if (GESTURE.last && Date.now() - GESTURE.last >= HOLD_DELAY) {
				_trigger("hold");
				return GESTURE.taps = 0
			}
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		e.fn.text = function(t) {
			if (t || e.toType(t) === "number") {
				return this.each(function() {
					return this.textContent = t
				})
			} else {
				return this[0].textContent
			}
		};
		e.fn.html = function(t) {
			var n;
			n = e.toType(t);
			if (t || n === "number" || n === "string") {
				return this.each(function() {
					var e, r, i, u;
					if (n === "string" || n === "number") {
						return this.innerHTML = t
					} else {
						this.innerHTML = null;
						if (n === "array") {
							u = [];
							for (r = 0, i = t.length; r < i; r++) {
								e = t[r];
								u.push(this.appendChild(e))
							}
							return u
						} else {
							return this.appendChild(t)
						}
					}
				})
			} else {
				return this[0].innerHTML
			}
		};
		e.fn.append = function(t) {
			var n;
			n = e.toType(t);
			return this.each(function() {
				var e = this;
				if (n === "string") {
					return this.insertAdjacentHTML("beforeend", t)
				} else if (n === "array") {
					return t.each(function(t, n) {
						return e.appendChild(n)
					})
				} else {
					return this.appendChild(t)
				}
			})
		};
		e.fn.prepend = function(t) {
			var n;
			n = e.toType(t);
			return this.each(function() {
				var e = this;
				if (n === "string") {
					return this.insertAdjacentHTML("afterbegin", t)
				} else if (n === "array") {
					return t.each(function(t, n) {
						return e.insertBefore(n, e.firstChild)
					})
				} else {
					return this.insertBefore(t, this.firstChild)
				}
			})
		};
		e.fn.replaceWith = function(t) {
			var n;
			n = e.toType(t);
			this.each(function() {
				var e = this;
				if (this.parentNode) {
					if (n === "string") {
						return this.insertAdjacentHTML("beforeBegin", t)
					} else if (n === "array") {
						return t.each(function(t, n) {
							return e.parentNode.insertBefore(n, e)
						})
					} else {
						return this.parentNode.insertBefore(t, this)
					}
				}
			});
			return this.remove()
		};
		return e.fn.empty = function() {
			return this.each(function() {
				return this.innerHTML = null
			})
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		var t, n, r, i, u, a;
		r = "parentNode";
		t = /^\.([\w-]+)$/;
		n = /^#[\w\d-]+$/;
		i = /^[\w-]+$/;
		e.query = function(e, r) {
			var u;
			r = r.trim();
			if (t.test(r)) {
				u = e.getElementsByClassName(r.replace(".", ""))
			} else if (i.test(r)) {
				u = e.getElementsByTagName(r)
			} else if (n.test(r) && e === document) {
				u = e.getElementById(r.replace("#", ""));
				if (!u) {
					u = []
				}
			} else {
				u = e.querySelectorAll(r)
			}
			if (u.nodeType) {
				return [u]
			} else {
				return Array.prototype.slice.call(u)
			}
		};
		e.fn.find = function(t) {
			var n;
			if (this.length === 1) {
				n = Quo.query(this[0], t)
			} else {
				n = this.map(function() {
					return Quo.query(this, t)
				})
			}
			return e(n)
		};
		e.fn.parent = function(e) {
			var t;
			t = e ? a(this) : this.instance(r);
			return u(t, e)
		};
		e.fn.siblings = function(e) {
			var t;
			t = this.map(function(e, t) {
				return Array.prototype.slice.call(t.parentNode.children).filter(function(e) {
					return e !== t
				})
			});
			return u(t, e)
		};
		e.fn.children = function(e) {
			var t;
			t = this.map(function() {
				return Array.prototype.slice.call(this.children)
			});
			return u(t, e)
		};
		e.fn.get = function(e) {
			if (e === undefined) {
				return this
			} else {
				return this[e]
			}
		};
		e.fn.first = function() {
			return e(this[0])
		};
		e.fn.last = function() {
			return e(this[this.length - 1])
		};
		e.fn.closest = function(t, n) {
			var r, i;
			i = this[0];
			r = e(t);
			if (!r.length) {
				i = null
			}
			while (i && r.indexOf(i) < 0) {
				i = i !== n && i !== document && i.parentNode
			}
			return e(i)
		};
		e.fn.each = function(e) {
			this.forEach(function(t, n) {
				return e.call(t, n, t)
			});
			return this
		};
		a = function(t) {
			var n;
			n = [];
			while (t.length > 0) {
				t = e.map(t, function(e) {
					if ((e = e.parentNode) && e !== document && n.indexOf(e) < 0) {
						n.push(e);
						return e
					}
				})
			}
			return n
		};
		return u = function(t, n) {
			if (n === undefined) {
				return e(t)
			} else {
				return e(t).filter(n)
			}
		}
	})(Quo)
}).call(this);
(function() {
	(function(e) {
		var t, n, r;
		t = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
		e.fn.addClass = function(e) {
			return this.each(function() {
				if (!r(e, this.className)) {
					this.className += " " + e;
					return this.className = this.className.trim()
				}
			})
		};
		e.fn.removeClass = function(e) {
			return this.each(function() {
				if (!e) {
					return this.className = ""
				} else {
					if (r(e, this.className)) {
						return this.className = this.className.replace(e, " ").replace(/\s+/g, " ").trim()
					}
				}
			})
		};
		e.fn.toggleClass = function(e) {
			return this.each(function() {
				if (r(e, this.className)) {
					return this.className = this.className.replace(e, " ")
				} else {
					this.className += " " + e;
					return this.className = this.className.trim()
				}
			})
		};
		e.fn.hasClass = function(e) {
			return r(e, this[0].className)
		};
		e.fn.style = function(e, t) {
			if (t) {
				return this.each(function() {
					return this.style[e] = t
				})
			} else {
				return this[0].style[e] || n(this[0], e)
			}
		};
		e.fn.css = function(e, t) {
			return this.style(e, t)
		};
		e.fn.vendor = function(e, n) {
			var r, i, u, a;
			a = [];
			for (i = 0, u = t.length; i < u; i++) {
				r = t[i];
				a.push(this.style("" + r + e, n))
			}
			return a
		};
		r = function(e, t) {
			var n;
			n = t.split(/\s+/g);
			return n.indexOf(e) >= 0
		};
		return n = function(e, t) {
			return document.defaultView.getComputedStyle(e, "")[t]
		}
	})(Quo)
}).call(this);
(function() {
	function fadeOutWords(callback) {
		$('.J_name span').each(function() {
			var _that = $(this);
			if (_that.hasClass('J_dest')) return;
			_that.animate({
				'-webkit-transform': 'translateY(' + (-70 * (Math.random() * 2 - 1)) + 'px)',
				opacity: 0
			}, 1000, '', function() {
				$('.J_middle span').remove();
				if (callback && typeof callback == 'function') callback()
			})
		})
	}

	function wordsUp() {
		var _dest = ($(window).height()) / 2 - 30;
		$('.J_middle').animate({
			width: '6px'
		}, 800, 'ease-out', function() {
			$('.m-mask-index .img').animate({
				'opacity': 0
			}, 2000, 'ease-in', function() {
				$(this).remove()
			});
			$('.J_dest').animate({
				'font-size': '100px'
			}, 1000, 'ease-out');
			$('.J_namebox').animate({
				'-webkit-transform': 'translateY(-' + _dest + 'px) translateX(-50%)'
			}, 1000, 'ease-out', function() {
				$('.J_keywords').show().animate({
					'opacity': 1
				}, 1000);
				$('.u-upnav').show()
			})
		})
	}

	function init() {
		$('.J_middle').css({
			width: 172
		});
		preLoadImages()
	}

	function loadMusic() {
		$('.J_bgSound').attr('src', 'images/lovesong.MP3')
	}

	function preLoadImages(callback) {
		if (!$('.J_img').length) return;
		var resource = {
			img11: 'images/img11.jpg',
			img12: 'images/img12.jpg',
			img1: 'images/img1.jpg',
			img2: 'images/img2.jpg',
			img3: 'images/img3.jpg',
			img4: 'images/img4.jpg',
			img5: 'images/img5.jpg'
		};
		loadImages(resource, function(images) {
			$('.J_img').each(function(i) {
				var _srcID = $(this).attr('data-img');
				if (!images[_srcID]) return;
				$(this).attr('src', images[_srcID].src).removeClass('J_img')
			});
			if (!window.FirstTimes) {
				window.FirstTimes = 1;
				loadMusic();
				$('.J_loading').remove();
				resetAll();
				fadeOutWords(wordsUp)
			}
		})
	}

	function loadImages(sources, callback) {
		var count = 0,
			images = {},
			imgNum = 0,
			_normalNum = 0;
		for (src in sources) {
			imgNum++
		}
		for (src in sources) {
			images[src] = new Image();
			images[src].src = sources[src];
			images[src].onload = function() {
				if (++count >= imgNum) {
					callback(images)
				}
				delete sources[src]
			}
		}
	}
	var $singlePage = $$('.m-page');
	var _width = $(window).width(),
		_height = $(window).height();

	function resetAll() {
		$('.m-page').each(function(i) {
			var _index = $('.m-page.current').index();
			if (!(i == _index)) {
				$$($(this)[0]).vendor('transform', 'translate3d(0,' + _height + 'px,0) scale(1)')
			}
		})
	}
	$singlePage.swiping(function(e) {
		if (!$(this).hasClass('current')) return;
		if (!window.FirstPointer) {
			window.FirstPointer = {
				x: e.currentTouch.x,
				y: e.currentTouch.y
			}
		}
		var $this = $$(this),
			_index = $(this).index(),
			$next = $$($('.m-page')[_index + 1]),
			$pre = $$($('.m-page')[_index - 1]),
			x = e.currentTouch.x - window.FirstPointer.x,
			y = e.currentTouch.y - window.FirstPointer.y,
			_scale = 1 - Math.abs(y) / _height;
		window.keep = _scale > 0.95 ? true : false;
		var _lazy = {
			img6: 'images/img6.jpg',
			img7: 'images/img7.jpg',
			img8: 'images/img8.jpg',
			img9: 'images/img9.jpg',
			img10: 'images/img10.jpg',
			img13: 'images/img13.jpg',
			img14: 'images/img14.jpg',
			img15: 'images/img15.jpg',
			img16: 'images/img16.jpg',
			img17: 'images/img17.jpg',
			img18: 'images/img18.jpg',
			img31: 'images/31.jpg',
			img32: 'images/32.jpg',
			img33: 'images/33.jpg',
			img34: 'images/34.jpg',
			img35: 'images/35.jpg',
			img36: 'images/36.jpg',
			img37: 'images/37.jpg',
			img38: 'images/38.jpg',
			img39: 'images/39.jpg',
			img40: 'images/40.jpg',
			img41: 'images/41.jpg',
			img42: 'images/42.jpg'
		};
		$('.m-page').each(function(i) {
			if (!(i > _index && i < _index + 8)) return;
			var _img = $(this).find('.J_img'),
				_key = _img.attr('data-img');
			_img.attr('src', _lazy[_key]);
			_img.removeClass('J_img')
		});
		if (y < 0) {
			if (_index == $('.m-page').length - 1) return;
			$this.removeClass('down');
			$next.vendor('transform', 'translate3d(0,' + (_height + (y)) + 'px,0) scale(1)');
			$this.vendor('transform', 'translate3d(0,' + y + 'px,0) scale(' + _scale + ')')
		} else {
			if (!_index) return;
			$this.addClass('down');
			$pre.vendor('transform', 'translate3d(0,' + (y - _height) + 'px,0) scale(1)');
			$this.vendor('transform', 'translate3d(0,' + y + 'px,0) scale(' + _scale + ')')
		}
	});
	$singlePage.swipe(function(e) {
		if (!$(this).hasClass('current')) return;
		var $this = $$(this),
			_index = $(this).index(),
			$next = $this.get(_index + 1),
			$pre = $this.get(_index - 1),
			y = e.currentTouch.y - window.FirstPointer.y;
		if (window.keep) {
			$(this).animate({
				'transform': 'translate3d(0,0,0) scale(1)',
				'-webkit-transform': 'translate3d(0,0,0) scale(1)'
			}, 200, 'ease-out');
			$('.m-page').eq(_index - 1).animate({
				'transform': 'translate3d(0,-' + _height + 'px,0) scale(1)',
				'-webkit-transform': 'translate3d(0,-' + _height + 'px,0) scale(1)'
			}, 100, '', function() {});
			$('.m-page').eq(_index + 1).animate({
				'transform': 'translate3d(0,' + _height + 'px,0) scale(1)',
				'-webkit-transform': 'translate3d(0,' + _height + 'px,0) scale(1)'
			}, 100, '', function() {});
			return
		}
		if (y < 0) {
			if (_index == $('.m-page').length - 1) return;
			$('.m-page').eq(_index + 1).animate({
				'transform': 'translate3d(0,0px,0) scale(1)',
				'-webkit-transform': 'translate3d(0,0,0) scale(1)'
			}, 600, 'ease-out', function() {
				$('.m-page').removeClass('current').eq(_index + 1).addClass('current');
				$$(this).vendor('transform', 'translate3d(0,0,0) scale(1)')
			});
			$(this).animate({
				'transform': 'translate3d(0,-' + (_height) + 'px,0) scale(0.2)',
				'-webkit-transform': 'translate3d(0,-' + (_height) + 'px,0) scale(0.2)'
			}, 600, 'ease-out', function() {
				$$(this).vendor('transform', 'translate3d(0,-' + (_height) + 'px,0) scale(1)');
				resetAll();
				window.FirstPointer = false;
				$(this).removeClass('down')
			})
		} else {
			if (!_index) return;
			$('.m-page').eq(_index - 1).animate({
				'transform': 'translate3d(0,0,0) scale(1)',
				'-webkit-transform': 'translate3d(0,0,0) scale(1)'
			}, 600, 'ease-out', function() {
				$('.m-page').removeClass('current').eq(_index - 1).addClass('current');
				$$(this).vendor('transform', 'translate3d(0,0,0) scale(1)')
			});
			$(this).animate({
				'transform': 'translate3d(0,' + (_height) + 'px,0) scale(0.2)',
				'-webkit-transform': 'translate3d(0,' + (_height) + 'px,0) scale(0.2)'
			}, 600, 'ease-out', function() {
				$$(this).vendor('transform', 'translate3d(0,' + (_height) + 'px,0) scale(1)');
				resetAll();
				window.FirstPointer = false;
				$(this).removeClass('down')
			})
		}
		if (_index == $('.m-page').length - 2) {
			$('.u-upnav').hide()
		} else {
			$('.u-upnav').show()
		}
	});
	document.ontouchmove = function(event) {
		event.preventDefault()
	};
	document.ontouchleave = function(event) {
		alert('1')
	};
	init();
	var _audio = $(".J_bgSound").get(0),
		myVideo = $('.J_bgSound')[0];
	$(document).one('touchstart', function(e) {
		_audio.play()
	});
	$(".J_contorl").click(function() {
		if ($(this).hasClass("z-pause")) {
			myVideo.play();
			$(this).addClass("z-play").removeClass('z-pause')
		} else {
			myVideo.pause();
			$(this).removeClass("z-play").addClass('z-pause')
		}
	})
})();
var wxData = {
	"appId": "",
	"imgUrl": 'http://www.d3th.com/wedding/sk/images/share.png',
	"link": location.href,
	"desc": '我们组队通关了普通难度，这是关于我们的小故事。',
	"title": "和你一起是最正确的决定"
};
var wxCallbacks = {
	favorite: false,
	ready: function() {},
	cancel: function(resp) {},
	fail: function(resp) {},
	confirm: function(resp) {},
	all: function(resp, shareTo) {}
};
WeixinApi.share(wxData, wxCallbacks);