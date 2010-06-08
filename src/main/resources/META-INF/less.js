// added for lesscss-engine
location = {};
document = {
	querySelectorAll : function() {
		return [];
	}
};

//
// LESS - Leaner CSS v1.0.8
// http://lesscss.org
//
// Copyright (c) 2010, Alexis Sellier
// Licensed under the MIT license.
//
if (!Array.isArray)
	Array.isArray = function(a) {
		return Object.prototype.toString.call(a) == "[object Array]"
	};
if (!Array.prototype.forEach)
	Array.prototype.forEach = function(a, b) {
		for ( var f = this.length >>> 0, e = 0; e < f; e++)
			e in this && a.call(b, this[e], e, this)
	};
if (!Array.prototype.map)
	Array.prototype.map = function(a, b) {
		var f = this.length >>> 0;
		if (typeof a != "function")
			throw new TypeError;
		for ( var e = new Array(f), g = 0; g < f; g++)
			if (g in this)
				e[g] = a.call(b, this[g], g, this);
		return e
	};
if (!Array.prototype.filter)
	Array.prototype.filter = function(a, b) {
		for ( var f = [], e = 0; e < this.length; e++)
			a.call(b, this[e]) && f.push(this[e]);
		return f
	};
if (!Array.prototype.reduce)
	Array.prototype.reduce = function(a) {
		var b = this.length >>> 0;
		if (typeof a != "function")
			throw new TypeError;
		if (b == 0 && arguments.length == 1)
			throw new TypeError;
		var f = 0;
		if (arguments.length >= 2)
			var e = arguments[1];
		else {
			do {
				if (f in this) {
					e = this[f++];
					break
				}
				if (++f >= b)
					throw new TypeError;
			} while (1)
		}
		for (; f < b; f++)
			if (f in this)
				e = a.call(null, e, this[f], f, this);
		return e
	};
if (!Array.prototype.indexOf)
	Array.prototype.indexOf = function(a, b) {
		var f = this.length;
		if (!f)
			return -1;
		b = b || 0;
		if (b >= f)
			return -1;
		if (b < 0)
			b += f;
		for (; b < f; b++)
			if (Object.prototype.hasOwnProperty.call(this, b))
				if (a === this[b])
					return b;
		return -1
	};
if (!Object.keys)
	Object.keys = function(a) {
		var b = [];
		for ( var f in a)
			Object.prototype.hasOwnProperty.call(a, f) && b.push(f);
		return b
	};
if (!String.prototype.trim) {
	var trimBeginRegexp = /^\s\s*/, trimEndRegexp = /\s\s*$/;
	String.prototype.trim = function() {
		return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp,
				"")
	}
}
if (typeof require !== "undefined")
	var less = exports, tree = require("less/tree");
else
	less = tree = {};
less.Parser = function(a) {
	function b(d) {
		var h, j, l;
		if (d instanceof Function)
			return d.call(q.parsers);
		else if (typeof d === "string") {
			h = e.charAt(g) === d ? d : null;
			j = 1
		} else {
			if (g >= o + n[k].length && k < n.length - 1)
				o += n[k++].length;
			d.lastIndex = l = g - o;
			if (h = d.exec(n[k])) {
				j = h[0].length;
				if (d.lastIndex - j !== l)
					return
			}
		}
		if (h) {
			g += j;
			for (j = o + n[k].length; g <= j;) {
				d = e.charCodeAt(g);
				if (!(d === 32 || d === 10 || d === 9))
					break;
				g++
			}
			return typeof h === "string" ? h : h.length === 1 ? h[0] : h
		}
	}
	function f(d) {
		var h;
		if (typeof d === "string")
			return e.charAt(g) === d;
		else {
			d.lastIndex = g;
			if ((h = d.exec(e)) && d.lastIndex - h[0].length === g)
				return h
		}
	}
	var e, g, k, m, n, o, q, s = this, t = function() {
	}, u = this.imports = {
		paths : a && a.paths || [],
		queue : [],
		files : {},
		push : function(d, h) {
			var j = this;
			this.queue.push(d);
			less.Parser.importer(d, this.paths, function(l) {
				j.queue.splice(j.queue.indexOf(d), 1);
				j.files[d] = l;
				h(l);
				j.queue.length === 0 && t()
			})
		}
	};
	this.env = a || {};
	this.optimization = this.env.optimization || 2;
	return q = {
		imports : u,
		parse : function(d, h) {
			var j, l;
			l = [];
			var r = null;
			g = k = o = m = 0;
			n = [];
			e = d.replace(/\r\n/g, "\n");
			if (s.optimization > 0)
				if (s.optimization > 2) {
					e = e.replace(/\/\*(?:[^*]|\*+[^\/*])*\*+\//g, "");
					n = e.split(/^(?=\n)/mg)
				} else {
					for ( var p = 0; p < e.length; p++)
						if ((d = e.charAt(p)) === "}"
								&& e.charCodeAt(p - 1) === 10) {
							n.push(l.concat("}").join(""));
							l = []
						} else
							l.push(d);
					n.push(l.join(""))
				}
			else
				n = [ e ];
			j = new tree.Ruleset( [], b(this.parsers.primary));
			j.root = true;
			if (g < e.length - 1) {
				g = m;
				d = e.split("\n");
				l = (e.slice(0, g).match(/\n/g) || "").length + 1;
				p = g;
				for ( var v = -1; p >= 0 && e.charAt(p) !== "\n"; p--)
					v++;
				r = {
					name : "ParseError",
					message : "Syntax Error on line " + l + ":",
					line : l,
					column : v,
					extract : [ d[l - 2], d[l - 1], d[l] ]
				}
			}
			if (this.imports.queue.length > 0)
				t = function() {
					h(r, j)
				};
			else
				h(r, j)
		},
		parsers : {
			primary : function() {
				for ( var d, h = []; d = b(this.mixin.definition)
						|| b(this.rule) || b(this.ruleset)
						|| b(this.mixin.call) || b(this.comment)
						|| b(/[\n\s]+/g) || b(this.directive);)
					h.push(d);
				return h
			},
			comment : function() {
				var d;
				if (e.charAt(g) === "/")
					return (d = b(/\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/g)) ? new tree.Comment(
							d)
							: b(/\/\/.*/g)
			},
			entities : {
				quoted : function() {
					var d;
					if (!(e.charAt(g) !== '"' && e.charAt(g) !== "'"))
						if (d = b(/"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/g))
							return new tree.Quoted(d[0], d[1] || d[2])
				},
				keyword : function() {
					var d;
					if (d = b(/[A-Za-z-]+/g))
						return new tree.Keyword(d)
				},
				call : function() {
					var d, h;
					if (d = b(/([a-zA-Z0-9_-]+|%)\(/g)) {
						if (d[1].toLowerCase() === "alpha")
							return b(this.alpha);
						h = b(this.entities.arguments);
						if (b(")"))
							if (d)
								return new tree.Call(d[1], h)
					}
				},
				arguments : function() {
					for ( var d = [], h; h = b(this.expression);) {
						d.push(h);
						if (!b(","))
							break
					}
					return d
				},
				literal : function() {
					return b(this.entities.dimension) || b(this.entities.color)
							|| b(this.entities.quoted)
				},
				url : function() {
					var d;
					if (!(e.charAt(g) !== "u" || !b(/url\(/g))) {
						d = b(this.entities.quoted)
								|| b(/[-a-zA-Z0-9_%@$\/.&=:;#+?]+/g);
						if (!b(")"))
							throw new Error("missing closing ) for url()");
						return new tree.URL(d.value ? d : new tree.Anonymous(d))
					}
				},
				variable : function() {
					var d;
					if (e.charAt(g) === "@" && (d = b(/@[a-zA-Z0-9_-]+/g)))
						return new tree.Variable(d)
				},
				color : function() {
					var d;
					if (e.charAt(g) === "#"
							&& (d = b(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g)))
						return new tree.Color(d[1])
				},
				dimension : function() {
					var d;
					d = e.charCodeAt(g);
					if (!(d > 57 || d < 45 || d === 47))
						if (d = b(/(-?[0-9]*\.?[0-9]+)(px|%|em|pc|ex|in|deg|s|ms|pt|cm|mm)?/g))
							return new tree.Dimension(d[1], d[2])
				}
			},
			variable : function() {
				var d;
				if (e.charAt(g) === "@" && (d = b(/(@[a-zA-Z0-9_-]+)\s*:/g)))
					return d[1]
			},
			shorthand : function() {
				var d, h;
				if (f(/[@\w.-]+\/[@\w.-]+/g))
					if ((d = b(this.entity)) && b("/") && (h = b(this.entity)))
						return new tree.Shorthand(d, h)
			},
			mixin : {
				call : function() {
					for ( var d = [], h, j, l; h = b(/[#.][a-zA-Z0-9_-]+/g);) {
						d.push(new tree.Element(j, h));
						j = b(">")
					}
					b("(") && (l = b(this.entities.arguments)) && b(")");
					if (d.length > 0 && (b(";") || f("}")))
						return new tree.mixin.Call(d, l)
				},
				definition : function() {
					var d, h = [], j, l;
					if (!(e.charAt(g) !== "." || f(/[^{]*(;|})/g)))
						if (d = b(/([#.][a-zA-Z0-9_-]+)\s*\(/g)) {
							for (d = d[1]; j = b(/@[\w-]+/g)
									|| b(this.entities.literal)
									|| b(this.entities.keyword);) {
								if (j[0] === "@")
									if (b(":"))
										if (l = b(this.expression))
											h.push( {
												name : j,
												value : l
											});
										else
											throw new Error("Expected value");
									else
										h.push( {
											name : j
										});
								else
									h.push( {
										value : j
									});
								if (!b(","))
									break
							}
							if (!b(")"))
								throw new Error("Expected )");
							if (j = b(this.block))
								return new tree.mixin.Definition(d, h, j)
						}
				}
			},
			entity : function() {
				return b(this.entities.literal) || b(this.entities.variable)
						|| b(this.entities.url) || b(this.entities.call)
						|| b(this.entities.keyword)
			},
			end : function() {
				return b(";") || f("}")
			},
			alpha : function() {
				var d;
				if (b(/opacity=/gi))
					if (d = b(/[0-9]+/g) || b(this.entities.variable)) {
						if (!b(")"))
							throw new Error("missing closing ) for alpha()");
						return new tree.Alpha(d)
					}
			},
			element : function() {
				var d;
				c = b(this.combinator);
				if (d = b(/[.#:]?[a-zA-Z0-9_-]+/g) || b("*")
						|| b(this.attribute) || b(/\([^)@]+\)/g))
					return new tree.Element(c, d)
			},
			combinator : function() {
				var d;
				return (d = b(/[+>~]/g) || b("&") || b(/::/g)) ? new tree.Combinator(
						d)
						: new tree.Combinator(e.charAt(g - 1) === " " ? " "
								: null)
			},
			selector : function() {
				for ( var d, h = []; d = b(this.element);)
					h.push(d);
				if (h.length > 0)
					return new tree.Selector(h)
			},
			tag : function() {
				return b(/[a-zA-Z][a-zA-Z-]*[0-9]?/g) || b("*")
			},
			attribute : function() {
				var d = "", h, j, l;
				if (b("[")) {
					if (h = b(/[a-z-]+/g) || b(this.entities.quoted))
						d = (l = b(/[|~*$^]?=/g))
								&& (j = b(this.entities.quoted) || b(/[\w-]+/g)) ? [
								h, l, j.toCSS ? j.toCSS() : j ].join("")
								: h;
					if (b("]"))
						if (d)
							return "[" + d + "]"
				}
			},
			block : function() {
				var d;
				if (b("{") && (d = b(this.primary)) && b("}"))
					return d
			},
			ruleset : function() {
				var d = [], h, j, l = g;
				if (h = f(/([a-z.#: _-]+)[\s\n]*\{/g)) {
					g += h[0].length - 1;
					d = [ new tree.Selector( [ new tree.Element(null, h[1]) ]) ]
				} else {
					for (; h = b(this.selector);) {
						d.push(h);
						if (!b(","))
							break
					}
					h && b(this.comment)
				}
				if (d.length > 0 && (j = b(this.block)))
					return new tree.Ruleset(d, j);
				else {
					m = g;
					g = l
				}
			},
			rule : function() {
				var d, h = g;
				if (name = b(this.property) || b(this.variable)) {
					if (name.charAt(0) != "@"
							&& (match = f(/([^@+\/*(;{}-]*);/g))) {
						g += match[0].length - 1;
						d = new tree.Anonymous(match[1])
					} else
						d = name === "font" ? b(this.font) : b(this.value);
					if (b(this.end))
						return new tree.Rule(name, d);
					else {
						m = g;
						g = h
					}
				}
			},
			"import" : function() {
				var d;
				if (b(/@import\s+/g)
						&& (d = b(this.entities.quoted) || b(this.entities.url))
						&& b(";"))
					return new tree.Import(d, u)
			},
			directive : function() {
				var d, h, j;
				if (e.charAt(g) === "@")
					if (h = b(this["import"]))
						return h;
					else if (d = b(/@media|@page/g)) {
						j = b(/[^{]+/g).trim();
						if (h = b(this.block))
							return new tree.Directive(d + " " + j, h)
					} else if (d = b(/@[-a-z]+/g))
						if (d === "@font-face") {
							if (h = b(this.block))
								return new tree.Directive(d, h)
						} else if ((h = b(this.entity)) && b(";"))
							return new tree.Directive(d, h)
			},
			font : function() {
				for ( var d = [], h = [], j; j = b(this.shorthand)
						|| b(this.entity);)
					h.push(j);
				d.push(new tree.Expression(h));
				if (b(","))
					for (; j = b(this.expression);) {
						d.push(j);
						if (!b(","))
							break
					}
				return new tree.Value(d, b(this.important))
			},
			value : function() {
				for ( var d, h = []; d = b(this.expression);) {
					h.push(d);
					if (!b(","))
						break
				}
				d = b(this.important);
				if (h.length > 0)
					return new tree.Value(h, d)
			},
			important : function() {
				return b(/!\s*important/g)
			},
			sub : function() {
				var d;
				if (b("(") && (d = b(this.expression)) && b(")"))
					return d
			},
			multiplication : function() {
				var d, h, j, l;
				if (d = b(this.operand)) {
					for (; (j = b(/[\/*]/g)) && (h = b(this.operand));)
						l = new tree.Operation(j, [ l || d, h ]);
					return l || d
				}
			},
			addition : function() {
				var d, h, j, l;
				if (d = b(this.multiplication)) {
					for (; (j = b(/[-+]\s+/g) || e.charAt(g - 1) != " "
							&& b(/[-+]/g))
							&& (h = b(this.multiplication));)
						l = new tree.Operation(j, [ l || d, h ]);
					return l || d
				}
			},
			operand : function() {
				return b(this.sub) || b(this.entities.dimension)
						|| b(this.entities.color) || b(this.entities.variable)
			},
			expression : function() {
				for ( var d, h = []; d = b(this.addition) || b(this.entity);)
					h.push(d);
				if (h.length > 0)
					return new tree.Expression(h)
			},
			property : function() {
				var d;
				if (d = b(/(\*?-?[-a-z_0-9]+)\s*:/g))
					return d[1]
			}
		}
	}
};
less.Parser.importer = null;
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.functions = {
	rgb : function(a, b, f) {
		return this.rgba(a, b, f, 1)
	},
	rgba : function(a, b, f, e) {
		a = [ a, b, f ].map(function(g) {
			return number(g)
		});
		e = number(e);
		return new tree.Color(a, e)
	},
	hsl : function(a, b, f) {
		return this.hsla(a, b, f, 1)
	},
	hsla : function(a, b, f, e) {
		function g(n) {
			n = n < 0 ? n + 1 : n > 1 ? n - 1 : n;
			return n * 6 < 1 ? m + (k - m) * n * 6 : n * 2 < 1 ? k
					: n * 3 < 2 ? m + (k - m) * (2 / 3 - n) * 6 : m
		}
		a = (number(a) % 360 + 360) % 360 / 360;
		b = number(b);
		f = number(f);
		e = number(e);
		var k = f <= 0.5 ? f * (b + 1) : f + b - f * b, m = f * 2 - k;
		return this.rgba(g(a + 1 / 3) * 255, g(a) * 255, g(a - 1 / 3) * 255, e)
	},
	saturate : function(a, b) {
		a = a.toHSL();
		a.s += b.value / 100;
		a.s = clamp(a.s);
		return this.hsl(a.h, a.s, a.l)
	},
	desaturate : function(a, b) {
		a = a.toHSL();
		a.s -= b.value / 100;
		a.s = clamp(a.s);
		return this.hsl(a.h, a.s, a.l)
	},
	lighten : function(a, b) {
		a = a.toHSL();
		a.l *= 1 + b.value / 100;
		a.l = clamp(a.l);
		return this.hsl(a.h, a.s, a.l)
	},
	darken : function(a, b) {
		a = a.toHSL();
		a.l *= 1 - b.value / 100;
		a.l = clamp(a.l);
		return this.hsl(a.h, a.s, a.l)
	},
	greyscale : function(a) {
		return this.desaturate(a, new tree.Dimension(100))
	},
	e : function(a) {
		return new tree.Anonymous(a)
	},
	"%" : function(a) {
		for ( var b = Array.prototype.slice.call(arguments, 1), f = a.content, e = 0; e < b.length; e++)
			f = f.replace(/%s/, b[e].content).replace(/%[da]/, b[e].toCSS());
		f = f.replace(/%%/g, "%");
		return new tree.Quoted('"' + f + '"', f)
	}
};
function number(a) {
	if (a instanceof tree.Dimension)
		return parseFloat(a.unit == "%" ? a.value / 100 : a.value);
	else if (typeof a === "number")
		return a;
	else
		throw {
			error : "RuntimeError",
			message : "color functions take numbers as parameters"
		};
}
function clamp(a) {
	return Math.min(1, Math.max(0, a))
}
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Alpha = function(a) {
	this.value = a
};
tree.Alpha.prototype = {
	toCSS : function() {
		return "alpha(opacity=" + this.value.toCSS() + ")"
	},
	eval : function() {
		return this
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Anonymous = function(a) {
	this.value = a.content || a
};
tree.Anonymous.prototype = {
	toCSS : function() {
		return this.value
	},
	eval : function() {
		return this
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Call = function(a, b) {
	this.name = a;
	this.args = b
};
tree.Call.prototype = {
	eval : function(a) {
		var b = this.args.map(function(f) {
			return f.eval(a)
		});
		return this.name in tree.functions ? tree.functions[this.name].apply(
				tree.functions, b) : new tree.Anonymous(this.name + "("
				+ b.map(function(f) {
					return f.toCSS()
				}).join(", ") + ")")
	},
	toCSS : function(a) {
		return this.eval(a).toCSS()
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Color = function(a, b) {
	if (Array.isArray(a)) {
		this.rgb = a;
		this.alpha = b
	} else
		this.rgb = a.length == 6 ? a.match(/.{2}/g).map(function(f) {
			return parseInt(f, 16)
		}) : a.split("").map(function(f) {
			return parseInt(f + f, 16)
		})
};
tree.Color.prototype = {
	eval : function() {
		return this
	},
	toCSS : function() {
		return this.alpha && this.alpha < 1 ? "rgba("
				+ this.rgb.concat(this.alpha).join(", ") + ")" : "#"
				+ this.rgb.map(function(a) {
					a = Math.round(a);
					a = (a > 255 ? 255 : a < 0 ? 0 : a).toString(16);
					return a.length === 1 ? "0" + a : a
				}).join("")
	},
	operate : function(a, b) {
		var f = [];
		b instanceof tree.Color || (b = b.toColor());
		for ( var e = 0; e < 3; e++)
			f[e] = tree.operate(a, this.rgb[e], b.rgb[e]);
		return new tree.Color(f)
	},
	toHSL : function() {
		var a = this.rgb[0] / 255, b = this.rgb[1] / 255, f = this.rgb[2] / 255, e = Math
				.max(a, b, f), g = Math.min(a, b, f), k, m = (e + g) / 2, n = e
				- g;
		if (e === g)
			k = g = 0;
		else {
			g = m > 0.5 ? n / (2 - e - g) : n / (e + g);
			switch (e) {
			case a:
				k = (b - f) / n + (b < f ? 6 : 0);
				break;
			case b:
				k = (f - a) / n + 2;
				break;
			case f:
				k = (a - b) / n + 4;
				break
			}
			k /= 6
		}
		return {
			h : k * 360,
			s : g,
			l : m
		}
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Comment = function(a) {
	this.value = a
};
tree.Comment.prototype = {
	toCSS : function() {
		return this.value
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Dimension = function(a, b) {
	this.value = parseFloat(a);
	this.unit = b || null
};
tree.Dimension.prototype = {
	eval : function() {
		return this
	},
	toColor : function() {
		return new tree.Color( [ this.value, this.value, this.value ])
	},
	toCSS : function() {
		return this.value + this.unit
	},
	operate : function(a, b) {
		return new tree.Dimension(tree.operate(a, this.value, b.value),
				this.unit || b.unit)
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Directive = function(a, b) {
	this.name = a;
	if (Array.isArray(b))
		this.ruleset = new tree.Ruleset( [], b);
	else
		this.value = b
};
tree.Directive.prototype = {
	toCSS : function(a, b) {
		if (this.ruleset) {
			this.ruleset.root = true;
			return this.name + " {\n  "
					+ this.ruleset.toCSS(a, b).trim().replace(/\n/g, "\n  ")
					+ "\n}\n"
		} else
			return this.name + " " + this.value.toCSS() + ";\n"
	},
	eval : function(a) {
		a.frames.unshift(this);
		this.ruleset && this.ruleset.evalRules(a);
		a.frames.shift();
		return this
	},
	variable : function(a) {
		return tree.Ruleset.prototype.variable.call(this.ruleset, a)
	},
	find : function() {
		return tree.Ruleset.prototype.find.apply(this.ruleset, arguments)
	},
	rulesets : function() {
		return tree.Ruleset.prototype.rulesets.apply(this.ruleset)
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Element = function(a, b) {
	this.combinator = a instanceof tree.Combinator ? a : new tree.Combinator(a);
	this.value = b.trim()
};
tree.Element.prototype.toCSS = function() {
	return this.combinator.toCSS() + this.value
};
tree.Combinator = function(a) {
	this.value = a === " " ? " " : a ? a.trim() : ""
};
tree.Combinator.prototype.toCSS = function() {
	switch (this.value) {
	case "":
		return "";
	case " ":
		return " ";
	case "&":
		return "";
	case ":":
		return " :";
	case "::":
		return "::";
	case "+":
		return " + ";
	case "~":
		return " ~ ";
	case ">":
		return " > "
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Expression = function(a) {
	this.value = a
};
tree.Expression.prototype = {
	eval : function(a) {
		return this.value.length > 1 ? new tree.Expression(this.value
				.map(function(b) {
					return b.eval(a)
				})) : this.value[0].eval(a)
	},
	toCSS : function() {
		return this.value.map(function(a) {
			return a.toCSS()
		}).join(" ")
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Import = function(a, b) {
	var f = this;
	this._path = a;
	this.path = a instanceof tree.Quoted ? /\.(le?|c)ss$/.test(a.content) ? a.content
			: a.content + ".less"
			: a.value.content || a.value;
	// modified for lesscss-engine
	(this.css = false /*/css$/.test(this.path)*/) || b.push(this.path, function(e) {
		f.root = e
	})
};
tree.Import.prototype = {
	toCSS : function() {
		return this.css ? "@import " + this._path.toCSS() + ";\n" : ""
	},
	eval : function() {
		if (this.css)
			return this;
		else {
			for ( var a = 0; a < this.root.rules.length; a++)
				this.root.rules[a] instanceof tree.Import
						&& Array.prototype.splice.apply(this.root.rules,
								[ a, 1 ].concat(this.root.rules[a].eval()));
			return this.root.rules
		}
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Keyword = function(a) {
	this.value = a
};
tree.Keyword.prototype = {
	eval : function() {
		return this
	},
	toCSS : function() {
		return this.value
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.mixin = {};
tree.mixin.Call = function(a, b) {
	this.selector = new tree.Selector(a);
	this.arguments = b
};
tree.mixin.Call.prototype = {
	eval : function(a) {
		for ( var b, f = [], e = 0; e < a.frames.length; e++)
			if ((b = a.frames[e].find(this.selector)).length > 0) {
				for (e = 0; e < b.length; e++)
					b[e].match(this.arguments, a)
							&& Array.prototype.push.apply(f, b[e].eval(
									this.arguments, a).rules);
				return f
			}
		throw new Error(this.selector.toCSS().trim() + " is undefined");
	}
};
tree.mixin.Definition = function(a, b, f) {
	this.name = a;
	this.selectors = [ new tree.Selector( [ new tree.Element(null, a) ]) ];
	this.params = b;
	this.arity = b.length;
	this.rules = f;
	this._lookups = {};
	this.required = b.reduce(function(e, g) {
		return g.name && !g.value ? e + 1 : e
	}, 0)
};
tree.mixin.Definition.prototype = {
	toCSS : function() {
		return ""
	},
	variable : function(a) {
		return tree.Ruleset.prototype.variable.call(this, a)
	},
	find : function() {
		return tree.Ruleset.prototype.find.apply(this, arguments)
	},
	rulesets : function() {
		return tree.Ruleset.prototype.rulesets.apply(this)
	},
	eval : function(a, b) {
		for ( var f = new tree.Ruleset(null, []), e = 0, g; e < this.params.length; e++)
			if (this.params[e].name)
				if (g = a && a[e] || this.params[e].value)
					f.rules.unshift(new tree.Rule(this.params[e].name, g
							.eval(b)));
				else
					throw new Error("wrong number of arguments for "
							+ this.name);
		return (new tree.Ruleset(null, this.rules)).evalRules( {
			frames : [ this, f ].concat(b.frames)
		})
	},
	match : function(a, b) {
		var f = a && a.length || 0;
		if (f < this.required)
			return false;
		for ( var e = 0; e < Math.min(f, this.arity); e++)
			if (!this.params[e].name)
				if (!a[e].wildcard)
					if (a[e].eval(b).toCSS() != this.params[e].value.eval(b)
							.toCSS())
						return false;
		return true
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Operation = function(a, b) {
	this.op = a.trim();
	this.operands = b
};
tree.Operation.prototype.eval = function(a) {
	var b = this.operands[0].eval(a);
	a = this.operands[1].eval(a);
	var f;
	if (b instanceof tree.Dimension && a instanceof tree.Color)
		if (this.op === "*" || this.op === "+") {
			f = a;
			a = b;
			b = f
		} else
			throw {
				name : "OperationError",
				message : "Can't substract or divide a color from a number"
			};
	return b.operate(this.op, a)
};
tree.operate = function(a, b, f) {
	switch (a) {
	case "+":
		return b + f;
	case "-":
		return b - f;
	case "*":
		return b * f;
	case "/":
		return b / f
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Quoted = function(a, b) {
	this.value = a;
	this.content = b
};
tree.Quoted.prototype = {
	toCSS : function() {
		return this.value
	},
	eval : function() {
		return this
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Rule = function(a, b) {
	this.name = a;
	this.value = b instanceof tree.Value ? b : new tree.Value( [ b ]);
	this.variable = a.charAt(0) === "@" ? true : false
};
tree.Rule.prototype.toCSS = function() {
	return this.variable ? "" : this.name + ": " + this.value.toCSS() + ";"
};
tree.Rule.prototype.eval = function(a) {
	return new tree.Rule(this.name, this.value.eval(a))
};
tree.Value = function(a) {
	this.value = a;
	this.is = "value"
};
tree.Value.prototype = {
	eval : function(a) {
		return this.value.length === 1 ? this.value[0].eval(a)
				: new tree.Value(this.value.map(function(b) {
					return b.eval(a)
				}))
	},
	toCSS : function() {
		return this.value.map(function(a) {
			return a.toCSS()
		}).join(", ")
	}
};
tree.Shorthand = function(a, b) {
	this.a = a;
	this.b = b
};
tree.Shorthand.prototype = {
	toCSS : function(a) {
		return this.a.toCSS(a) + "/" + this.b.toCSS(a)
	},
	eval : function() {
		return this
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Ruleset = function(a, b) {
	this.selectors = a;
	this.rules = b;
	this._lookups = {}
};
tree.Ruleset.prototype = {
	eval : function() {
		return this
	},
	evalRules : function(a) {
		var b = [];
		this.rules.forEach(function(f) {
			if (f.evalRules)
				b.push(f.evalRules(a));
			else
				f instanceof tree.mixin.Call ? Array.prototype.push.apply(b, f
						.eval(a)) : b.push(f.eval(a))
		});
		this.rules = b;
		return this
	},
	match : function(a) {
		return !a || a.length === 0
	},
	variable : function(a) {
		return this._variables ? this._variables[a]
				: (this._variables = this.rules.reduce(function(b, f) {
					if (f instanceof tree.Rule && f.variable === true)
						b[f.name] = f;
					return b
				}, {}))[a]
	},
	rulesets : function() {
		return this._rulesets ? this._rulesets : (this._rulesets = this.rules
				.filter(function(a) {
					if (a instanceof tree.Ruleset
							|| a instanceof tree.mixin.Definition)
						return a
				}))
	},
	find : function(a, b) {
		b = b || this;
		var f = [], e = a.toCSS();
		if (e in this._lookups)
			return this._lookups[e];
		this.rulesets().forEach(
				function(g) {
					if (g !== b)
						for ( var k = 0; k < g.selectors.length; k++)
							if (a.match(g.selectors[k])) {
								a.elements.length > 1 ? Array.prototype.push
										.apply(f, g.find(new tree.Selector(
												a.elements.slice(1)), b)) : f
										.push(g);
								break
							}
				});
		return this._lookups[e] = f
	},
	toCSS : function(a, b) {
		var f = [], e = [], g = [], k = [];
		if (this.root) {
			a = [];
			b = {
				frames : []
			};
			for ( var m = 0; m < this.rules.length; m++)
				this.rules[m] instanceof tree.Import
						&& Array.prototype.splice.apply(this.rules, [ m, 1 ]
								.concat(this.rules[m].eval(b)))
		} else if (a.length === 0)
			k = this.selectors.map(function(o) {
				return [ o ]
			});
		else
			for (m = 0; m < this.selectors.length; m++)
				for ( var n = 0; n < a.length; n++)
					k.push(a[n].concat( [ this.selectors[m] ]));
		b.frames.unshift(this);
		for (m = 0; m < this.rules.length; m++)
			this.rules[m] instanceof tree.mixin.Call
					&& Array.prototype.splice.apply(this.rules, [ m, 1 ]
							.concat(this.rules[m].eval(b)));
		for (m = 0; m < this.rules.length; m++) {
			a = this.rules[m];
			if (a instanceof tree.Directive)
				g.push(a.eval(b).toCSS(k, b));
			else if (a.rules)
				g.push(a.toCSS(k, b));
			else if (a instanceof tree.Comment)
				this.root ? g.push(a.toCSS()) : e.push(a.toCSS());
			else if (a.toCSS && !a.variable)
				e.push(a.eval(b).toCSS());
			else
				a.value && !a.variable && e.push(a.value.toString())
		}
		g = g.join("");
		if (this.root)
			f.push(e.join("\n"));
		else if (e.length > 0) {
			k = k.map(function(o) {
				return o.map(function(q) {
					return q.toCSS()
				}).join("").trim()
			}).join(k.length > 3 ? ",\n" : ", ");
			f.push(k, " {\n  " + e.join("\n  ") + "\n}\n")
		}
		f.push(g);
		b.frames.shift();
		return f.join("")
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Selector = function(a) {
	this.elements = a;
	if (this.elements[0].combinator.value === "")
		this.elements[0].combinator.value = " "
};
tree.Selector.prototype.match = function(a) {
	return this.elements[0].value === a.elements[0].value ? true : false
};
tree.Selector.prototype.toCSS = function() {
	if (this._css)
		return this._css;
	return this._css = this.elements.map(function(a) {
		return typeof a === "string" ? " " + a.trim() : a.toCSS()
	}).join("")
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.URL = function(a) {
	this.value = a
};
tree.URL.prototype = {
	toCSS : function() {
		return "url(" + this.value.toCSS() + ")"
	},
	eval : function() {
		return this
	}
};
if (typeof require !== "undefined")
	tree = require("less/tree");
tree.Variable = function(a) {
	this.name = a
};
tree.Variable.prototype = {
	eval : function(a) {
		var b, f, e = this.name;
		if (b = tree.find(a.frames, function(g) {
			if (f = g.variable(e))
				return f.value.eval(a)
		}))
			return b;
		else
			throw new Error("variable " + this.name + " is undefined");
	}
};
if (typeof require !== "undefined")
	tree = exports;
tree.find = function(a, b) {
	for ( var f = 0, e; f < a.length; f++)
		if (e = b.call(a, a[f]))
			return e;
	return null
};
var sheets = [];
if (!document.querySelectorAll && typeof jQuery === "undefined")
	log("No selector method found");
else
	sheets = (document.querySelectorAll || jQuery).call(document,
			'link[rel="stylesheet/less"]');
less.env = location.hostname == "127.0.0.1" || location.hostname == "0.0.0.0"
		|| location.hostname == "localhost" || location.protocol == "file:" ? "development"
		: "production";
for ( var i = 0; i < sheets.length; i++)
	(function(a) {
		var b = typeof localStorage !== "undefined"
				&& localStorage.getItem(a.href), f = b && JSON.parse(b);
		xhr(a.href, function(e, g) {
			if (f
					&& (new Date(g)).valueOf() === (new Date(f.timestamp))
							.valueOf()) {
				createCSS(f.css, a);
				log("less: loading " + a.href + " from local storage.")
			} else
				(new less.Parser( {
					optimization : 3
				})).parse(e, function(k, m) {
					if (k)
						return error(k, a.href);
					createCSS(m.toCSS(), a, g);
					log("less: parsed " + a.href + " successfully.")
				})
		})
	})(sheets[i]);
function createCSS(a, b, f) {
	var e = document.createElement("style");
	e.type = "text/css";
	e.media = "screen";
	e.title = "less-sheet";
	if (b) {
		e.title = b.title || b.href.match(/(^|\/)([-\w]+)\.[a-z]+$/i)[1];
		f && typeof localStorage !== "undefined"
				&& localStorage.setItem(b.href, JSON.stringify( {
					timestamp : f,
					css : a
				}))
	}
	if (e.styleSheet)
		e.styleSheet.cssText = a;
	else
		e.appendChild(document.createTextNode(a));
	document.getElementsByTagName("head")[0].appendChild(e)
}
function xhr(a, b, f) {
	var e = getXMLHttpRequest();
	if (window.location.protocol === "file:") {
		e.open("GET", a, false);
		e.send(null);
		e.status === 0 ? b(e.responseText) : f(e.responseText)
	} else {
		e.open("GET", a, true);
		e.onreadystatechange = function() {
			if (e.readyState == 4)
				if (e.status >= 200 && e.status < 300)
					b(e.responseText, e.getResponseHeader("Last-Modified"));
				else
					typeof f === "function" && f(e.responseText)
		};
		e.send(null)
	}
}
function getXMLHttpRequest() {
	if (window.XMLHttpRequest)
		return new XMLHttpRequest;
	else
		try {
			return new ActiveXObject("MSXML2.XMLHTTP.3.0")
		} catch (a) {
			log("less: browser doesn't support AJAX.");
			return null
		}
}
function log(a) {
	less.env == "development" && typeof console !== "undefined"
			&& console.log(a)
}
function error(a, b) {
	var f = document.createElement("div"), e;
	f.id = "less-error-message";
	f.innerHTML = '<h3>There is an error in your .less file</h3> <p><a href="'
			+ b
			+ '">'
			+ b
			+ "</a> on line "
			+ a.line
			+ ", column "
			+ a.column
			+ ":</p>"
			+ '<div>\n<pre class="ctx"><span>[-1]</span>{0}</pre>\n<pre><span>[0]</span>{current}</pre>\n<pre class="ctx"><span>[1]</span>{2}</pre>\n</div>'
					.replace(/\[(-?\d)\]/g, function(g, k) {
						return a.line + parseInt(k)
					}).replace(/\{(\d)\}/g, function(g, k) {
						return a.extract[parseInt(k)]
					}).replace(
							/\{current\}/,
							a.extract[1].slice(0, a.column)
									+ '<span class="error">'
									+ a.extract[1].slice(a.column) + "</span>");
	createCSS("#less-error-message span {margin-right: 15px;}#less-error-message pre {color: #ee4444;padding: 4px 0;margin: 0;}#less-error-message pre.ctx {color: #ee7777;}#less-error-message h3 {padding: 15px 0 5px 0;margin: 0;}#less-error-message a {color: #10a}#less-error-message .error {color: red;font-weight: bold;padding-bottom: 2px;border-bottom: 1px dashed red;}");
	f.style.cssText = "font-family: Arial, sans-serif;border: 1px solid #e00;background-color: #eee;border-radius: 5px;color: #e00;padding: 15px;margin-bottom: 15px";
	if (less.env == "development")
		e = setInterval(function() {
			if (document.body) {
				document.body.insertBefore(f, document.body.childNodes[0]);
				clearInterval(e)
			}
		}, 10)
};

