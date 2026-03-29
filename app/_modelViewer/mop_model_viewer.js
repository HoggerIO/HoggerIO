import jQuery from "jquery";
const $ = jQuery;
// set to true to enable logging
const enableLogging = false;

const noop = (e) => {
  if (enableLogging) {
    noop(e);
  }
};

// Copied from https://wow.zamimg.com/modelviewer/mists/deployment/viewer/810d077/viewer.min.js

(() => {
  "use strict";
  var t, e;
  ((window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (t, e) {
      window.setTimeout(t, 1e3 / 60);
    }),
    (jQuery.support.cors = !0),
    $.ajaxTransport
      ? ($.ajaxSetup({ flatOptions: { renderer: !0 } }),
        $.ajaxTransport("+binary", function (t, e, i) {
          if (
            window.FormData &&
            ((t.dataType && "binary" == t.dataType) ||
              (t.data &&
                ((window.ArrayBuffer && t.data instanceof ArrayBuffer) ||
                  (window.Blob && t.data instanceof Blob))))
          )
            return {
              send: function (e, i) {
                var r = new XMLHttpRequest(),
                  n = t.url,
                  s = t.type,
                  a = t.responseType || "blob",
                  o = t.data || null;
                (t.renderer &&
                  r.addEventListener("progress", function (e) {
                    e.lengthComputable &&
                      (t.renderer.downloads[this.responseURL]
                        ? (t.renderer.downloads[this.responseURL].loaded = e.loaded)
                        : (t.renderer.downloads[this.responseURL] = {
                            loaded: e.loaded,
                            total: e.total,
                          }),
                      t.renderer.updateProgress());
                  }),
                  r.addEventListener("load", function () {
                    t.renderer &&
                      (delete t.renderer.downloads[this.responseURL], t.renderer.updateProgress());
                    var e = {};
                    ((e[t.dataType] = r.response),
                      i(r.status, r.statusText, e, r.getAllResponseHeaders()));
                  }),
                  r.open(s, n, !0),
                  (r.responseType = a),
                  r.send(o));
              },
              abort: function () {
                i.abort();
              },
            };
        }))
      : ((t = $.httpData),
        ($.httpData = function (e, i, r) {
          return "binary" == i ? e.response : t(e, i, r);
        }),
        $.ajaxSetup({
          beforeSend: function (t, e) {
            "binary" == e.dataType &&
              ((t.responseType = e.responseType || "arraybuffer"),
              t.addEventListener(
                "progress",
                function (t) {
                  e.renderer &&
                    t.lengthComputable &&
                    (e.renderer.downloads[this.responseURL]
                      ? (e.renderer.downloads[this.responseURL].loaded = t.loaded)
                      : (e.renderer.downloads[this.responseURL] = {
                          loaded: t.loaded,
                          total: t.total,
                        }),
                    e.renderer.updateProgress());
                },
                !1,
              ),
              t.addEventListener(
                "load",
                function () {
                  e.renderer &&
                    (delete e.renderer.downloads[this.responseURL], e.renderer.updateProgress());
                },
                !1,
              ));
          },
        })),
    (Math.randomInt =
      Math.randomInt ||
      function (t, e) {
        return Math.floor(Math.random() * (e - t)) + t;
      }),
    "function" != typeof Object.create &&
      (Object.create =
        ((e = function () {}),
        function (t) {
          if (arguments.length > 1) throw Error("Second argument not supported");
          if ("object" != typeof t) throw TypeError("Argument must be an object");
          e.prototype = t;
          var i = new e();
          return ((e.prototype = null), i);
        })),
    (window.console = window.console || {
      log: function () {},
      error: function () {},
      warn: function () {},
    }));
  let i = Float32Array;
  function r(t, e, r) {
    const n = new i(3);
    return (t && (n[0] = t), e && (n[1] = e), r && (n[2] = r), n);
  }
  function n(t, e, r) {
    return (((r = r || new i(3))[0] = t[0] + e[0]), (r[1] = t[1] + e[1]), (r[2] = t[2] + e[2]), r);
  }
  function s(t, e, r) {
    return (((r = r || new i(3))[0] = t[0] * e[0]), (r[1] = t[1] * e[1]), (r[2] = t[2] * e[2]), r);
  }
  let a = Float32Array;
  function o(t) {
    return (
      ((t = t || new a(16))[0] = 1),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = 1),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 1),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      t
    );
  }
  function l(t, e) {
    e = e || new a(16);
    const i = t[0],
      r = t[1],
      n = t[2],
      s = t[3],
      o = t[4],
      l = t[5],
      h = t[6],
      u = t[7],
      c = t[8],
      d = t[9],
      f = t[10],
      g = t[11],
      p = t[12],
      m = t[13],
      b = t[14],
      y = t[15],
      F = f * y,
      S = b * g,
      v = h * y,
      T = b * u,
      C = h * g,
      x = f * u,
      A = n * y,
      _ = b * s,
      w = n * g,
      E = f * s,
      D = n * u,
      M = h * s,
      k = c * m,
      B = p * d,
      R = o * m,
      P = p * l,
      I = o * d,
      L = c * l,
      U = i * m,
      O = p * r,
      H = i * d,
      W = c * r,
      N = i * l,
      G = o * r,
      j = F * l + T * d + C * m - (S * l + v * d + x * m),
      z = S * r + A * d + E * m - (F * r + _ * d + w * m),
      V = v * r + _ * l + D * m - (T * r + A * l + M * m),
      q = x * r + w * l + M * d - (C * r + E * l + D * d),
      X = 1 / (i * j + o * z + c * V + p * q);
    return (
      (e[0] = X * j),
      (e[1] = X * z),
      (e[2] = X * V),
      (e[3] = X * q),
      (e[4] = X * (S * o + v * c + x * p - (F * o + T * c + C * p))),
      (e[5] = X * (F * i + _ * c + w * p - (S * i + A * c + E * p))),
      (e[6] = X * (T * i + A * o + M * p - (v * i + _ * o + D * p))),
      (e[7] = X * (C * i + E * o + D * c - (x * i + w * o + M * c))),
      (e[8] = X * (k * u + P * g + I * y - (B * u + R * g + L * y))),
      (e[9] = X * (B * s + U * g + W * y - (k * s + O * g + H * y))),
      (e[10] = X * (R * s + O * u + N * y - (P * s + U * u + G * y))),
      (e[11] = X * (L * s + H * u + G * g - (I * s + W * u + N * g))),
      (e[12] = X * (R * f + L * b + B * h - (I * b + k * h + P * f))),
      (e[13] = X * (H * b + k * n + O * f - (U * f + W * b + B * n))),
      (e[14] = X * (U * h + G * b + P * n - (N * b + R * n + O * h))),
      (e[15] = X * (N * f + I * n + W * h - (H * h + G * f + L * n))),
      e
    );
  }
  function h(t, e, i) {
    i = i || r();
    const n = e[0],
      s = e[1],
      a = e[2],
      o = n * t[3] + s * t[7] + a * t[11] + t[15];
    return (
      (i[0] = (n * t[0] + s * t[4] + a * t[8] + t[12]) / o),
      (i[1] = (n * t[1] + s * t[5] + a * t[9] + t[13]) / o),
      (i[2] = (n * t[2] + s * t[6] + a * t[10] + t[14]) / o),
      i
    );
  }
  function u(t, e, i) {
    i = i || r();
    const n = e[0],
      s = e[1],
      a = e[2];
    return (
      (i[0] = n * t[0] + s * t[4] + a * t[8]),
      (i[1] = n * t[1] + s * t[5] + a * t[9]),
      (i[2] = n * t[2] + s * t[6] + a * t[10]),
      i
    );
  }
  const c = 5120,
    d = 5121,
    f = 5122,
    g = 5123,
    p = 5124,
    m = 5125,
    b = 5126,
    y = {};
  {
    const t = y;
    ((t[5120] = Int8Array),
      (t[5121] = Uint8Array),
      (t[5122] = Int16Array),
      (t[5123] = Uint16Array),
      (t[5124] = Int32Array),
      (t[5125] = Uint32Array),
      (t[5126] = Float32Array),
      (t[32819] = Uint16Array),
      (t[32820] = Uint16Array),
      (t[33635] = Uint16Array),
      (t[5131] = Uint16Array),
      (t[33640] = Uint32Array),
      (t[35899] = Uint32Array),
      (t[35902] = Uint32Array),
      (t[36269] = Uint32Array),
      (t[34042] = Uint32Array));
  }
  function F(t) {
    if (t instanceof Int8Array) return c;
    if (t instanceof Uint8Array) return d;
    if (t instanceof Uint8ClampedArray) return d;
    if (t instanceof Int16Array) return f;
    if (t instanceof Uint16Array) return g;
    if (t instanceof Int32Array) return p;
    if (t instanceof Uint32Array) return m;
    if (t instanceof Float32Array) return b;
    throw new Error("unsupported typed array type");
  }
  function S(t) {
    if (t === Int8Array) return c;
    if (t === Uint8Array) return d;
    if (t === Uint8ClampedArray) return d;
    if (t === Int16Array) return f;
    if (t === Uint16Array) return g;
    if (t === Int32Array) return p;
    if (t === Uint32Array) return m;
    if (t === Float32Array) return b;
    throw new Error("unsupported typed array type");
  }
  function v(t) {
    const e = y[t];
    if (!e) throw new Error("unknown gl type");
    return e;
  }
  const T =
    "undefined" != typeof SharedArrayBuffer
      ? function (t) {
          return (
            t &&
            t.buffer &&
            (t.buffer instanceof ArrayBuffer || t.buffer instanceof SharedArrayBuffer)
          );
        }
      : function (t) {
          return t && t.buffer && t.buffer instanceof ArrayBuffer;
        };
  function C(...t) {
    console.error(...t);
  }
  const x = new Map();
  function A(t, e) {
    if (!t || "object" != typeof t) return !1;
    let i = x.get(e);
    i || ((i = new WeakMap()), x.set(e, i));
    let r = i.get(t);
    if (void 0 === r) {
      const n = Object.prototype.toString.call(t);
      ((r = n.substring(8, n.length - 1) === e), i.set(t, r));
    }
    return r;
  }
  function _(t, e) {
    return "undefined" != typeof WebGLTexture && A(e, "WebGLTexture");
  }
  const w = 34962,
    E = { attribPrefix: "" };
  function D(t, e, i, r, n) {
    (t.bindBuffer(e, i), t.bufferData(e, r, n || 35044));
  }
  function M(t, e, i, r) {
    if (((n = e), "undefined" != typeof WebGLBuffer && A(n, "WebGLBuffer"))) return e;
    var n;
    i = i || w;
    const s = t.createBuffer();
    return (D(t, i, s, e, r), s);
  }
  function k(t) {
    return "indices" === t;
  }
  function B(t) {
    return t.length ? t : t.data;
  }
  const R = /coord|texture/i,
    P = /color|colour/i;
  function I(t, e, i) {
    return (
      t.numComponents ||
      t.size ||
      (function (t, e) {
        let i;
        if (((i = R.test(t) ? 2 : P.test(t) ? 4 : 3), e % i > 0))
          throw new Error(
            `Can not guess numComponents for attribute '${t}'. Tried ${i} but ${e} values is not evenly divisible by ${i}. You should specify it.`,
          );
        return i;
      })(e, i || B(t).length)
    );
  }
  function L(t, e) {
    if (T(t)) return t;
    if (T(t.data)) return t.data;
    Array.isArray(t) && (t = { data: t });
    let i = t.type ? U(t.type) : void 0;
    return (i || (i = k(e) ? Uint16Array : Float32Array), new i(t.data));
  }
  function U(t) {
    return "number" == typeof t ? v(t) : t || Float32Array;
  }
  function O(t, e) {
    return {
      buffer: e.buffer,
      numValues: 24,
      type: ((i = e.type), "number" == typeof i ? i : i ? S(i) : 5126),
      arrayType: U(e.type),
    };
    var i;
  }
  function H(t, e) {
    const i = e.data || e,
      r = U(e.type),
      n = i * r.BYTES_PER_ELEMENT,
      s = t.createBuffer();
    return (
      t.bindBuffer(w, s),
      t.bufferData(w, n, e.drawType || 35044),
      { buffer: s, numValues: i, type: S(r), arrayType: r }
    );
  }
  function W(t, e, i) {
    const r = L(e, i);
    return {
      arrayType: r.constructor,
      buffer: M(t, r, void 0, e.drawType),
      type: F(r),
      numValues: 0,
    };
  }
  function N(t, e) {
    const i = {};
    return (
      Object.keys(e).forEach(function (r) {
        if (!k(r)) {
          const s = e[r],
            a = s.attrib || s.name || s.attribName || E.attribPrefix + r;
          if (s.value) {
            if (!Array.isArray(s.value) && !T(s.value))
              throw new Error("array.value is not array or typedarray");
            i[a] = { value: s.value };
          } else {
            let e;
            e =
              s.buffer && s.buffer instanceof WebGLBuffer
                ? O
                : "number" == typeof s || "number" == typeof s.data
                  ? H
                  : W;
            const { buffer: o, type: l, numValues: h, arrayType: u } = e(t, s, r),
              c = void 0 !== s.normalize ? s.normalize : (n = u) === Int8Array || n === Uint8Array,
              d = I(s, r, h);
            i[a] = {
              buffer: o,
              numComponents: d,
              type: l,
              normalize: c,
              stride: s.stride || 0,
              offset: s.offset || 0,
              divisor: void 0 === s.divisor ? void 0 : s.divisor,
              drawType: s.drawType,
            };
          }
        }
        var n;
      }),
      t.bindBuffer(w, null),
      i
    );
  }
  const G = ["position", "positions", "a_position"];
  function j(t, e, i) {
    const r = N(t, e),
      n = Object.assign({}, i || {});
    n.attribs = Object.assign({}, i ? i.attribs : {}, r);
    const s = e.indices;
    if (s) {
      const e = L(s, "indices");
      ((n.indices = M(t, e, 34963)), (n.numElements = e.length), (n.elementType = F(e)));
    } else
      n.numElements ||
        (n.numElements = (function (t, e) {
          let i, r;
          for (
            r = 0;
            r < G.length && ((i = G[r]), !(i in e)) && ((i = E.attribPrefix + i), !(i in e));
            ++r
          );
          r === G.length && (i = Object.keys(e)[0]);
          const n = e[i];
          if (!n.buffer) return 1;
          t.bindBuffer(w, n.buffer);
          const s = t.getBufferParameter(w, 34660);
          var a;
          t.bindBuffer(w, null);
          const o =
              s /
              (5120 === (a = n.type) || 5121 === a
                ? 1
                : 5122 === a || 5123 === a
                  ? 2
                  : 5124 === a || 5125 === a || 5126 === a
                    ? 4
                    : 0),
            l = n.numComponents || n.size,
            h = o / l;
          if (h % 1 != 0) throw new Error(`numComponents ${l} not correct for length ${length}`);
          return h;
        })(t, n.attribs));
    return n;
  }
  function z(t, e, i) {
    const r = "indices" === i ? 34963 : w;
    return M(t, L(e, i), r);
  }
  function V(t, e) {
    const i = {};
    return (
      Object.keys(e).forEach(function (r) {
        i[r] = z(t, e[r], r);
      }),
      e.indices
        ? ((i.numElements = e.indices.length), (i.elementType = F(L(e.indices))))
        : (i.numElements = (function (t) {
            let e, i;
            for (i = 0; i < G.length && ((e = G[i]), !(e in t)); ++i);
            i === G.length && (e = Object.keys(t)[0]);
            const r = t[e],
              n = B(r).length;
            if (void 0 === n) return 1;
            const s = I(r, e),
              a = n / s;
            if (n % s > 0) throw new Error(`numComponents ${s} not correct for length ${n}`);
            return a;
          })(e)),
      i
    );
  }
  function q(t, e) {
    let i = 0;
    return (
      (t.push = function () {
        for (let e = 0; e < arguments.length; ++e) {
          const r = arguments[e];
          if (r instanceof Array || T(r)) for (let e = 0; e < r.length; ++e) t[i++] = r[e];
          else t[i++] = r;
        }
      }),
      (t.reset = function (t) {
        i = t || 0;
      }),
      (t.numComponents = e),
      Object.defineProperty(t, "numElements", {
        get: function () {
          return (this.length / this.numComponents) | 0;
        },
      }),
      t
    );
  }
  function X(t, e, i) {
    return q(new (i || Float32Array)(t * e), t);
  }
  function K(t, e, i) {
    const r = t.length,
      n = new Float32Array(3);
    for (let s = 0; s < r; s += 3)
      (i(e, [t[s], t[s + 1], t[s + 2]], n), (t[s] = n[0]), (t[s + 1] = n[1]), (t[s + 2] = n[2]));
  }
  function Y(t, e, i) {
    i = i || r();
    const n = e[0],
      s = e[1],
      a = e[2];
    return (
      (i[0] = n * t[0] + s * t[1] + a * t[2]),
      (i[1] = n * t[4] + s * t[5] + a * t[6]),
      (i[2] = n * t[8] + s * t[9] + a * t[10]),
      i
    );
  }
  function J(t, e) {
    return (K(t, e, u), t);
  }
  function Q(t, e) {
    return (K(t, l(e), Y), t);
  }
  function Z(t, e) {
    return (K(t, e, h), t);
  }
  function tt(t, e) {
    return (
      Object.keys(t).forEach(function (i) {
        const r = t[i];
        i.indexOf("pos") >= 0
          ? Z(r, e)
          : i.indexOf("tan") >= 0 || i.indexOf("binorm") >= 0
            ? J(r, e)
            : i.indexOf("norm") >= 0 && Q(r, e);
      }),
      t
    );
  }
  function et(t, e, i) {
    return (
      (t = t || 2),
      {
        position: {
          numComponents: 2,
          data: [
            (e = e || 0) + -1 * (t *= 0.5),
            (i = i || 0) + -1 * t,
            e + 1 * t,
            i + -1 * t,
            e + -1 * t,
            i + 1 * t,
            e + 1 * t,
            i + 1 * t,
          ],
        },
        normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
        indices: [0, 1, 2, 2, 1, 3],
      }
    );
  }
  function it(t, e, i, r, n) {
    ((t = t || 1), (e = e || 1), (i = i || 1), (r = r || 1), (n = n || o()));
    const s = (i + 1) * (r + 1),
      a = X(3, s),
      l = X(3, s),
      h = X(2, s);
    for (let n = 0; n <= r; n++)
      for (let s = 0; s <= i; s++) {
        const o = s / i,
          u = n / r;
        (a.push(t * o - 0.5 * t, 0, e * u - 0.5 * e), l.push(0, 1, 0), h.push(o, u));
      }
    const u = i + 1,
      c = X(3, i * r * 2, Uint16Array);
    for (let t = 0; t < r; t++)
      for (let e = 0; e < i; e++)
        (c.push((t + 0) * u + e, (t + 1) * u + e, (t + 0) * u + e + 1),
          c.push((t + 1) * u + e, (t + 1) * u + e + 1, (t + 0) * u + e + 1));
    return tt({ position: a, normal: l, texcoord: h, indices: c }, n);
  }
  function rt(t, e, i, r, n, s, a) {
    if (e <= 0 || i <= 0) throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
    ((r = r || 0), (s = s || 0));
    const o = (n = n || Math.PI) - r,
      l = (a = a || 2 * Math.PI) - s,
      h = (e + 1) * (i + 1),
      u = X(3, h),
      c = X(3, h),
      d = X(2, h);
    for (let n = 0; n <= i; n++)
      for (let a = 0; a <= e; a++) {
        const h = a / e,
          f = n / i,
          g = l * h + s,
          p = o * f + r,
          m = Math.sin(g),
          b = Math.cos(g),
          y = Math.sin(p),
          F = b * y,
          S = Math.cos(p),
          v = m * y;
        (u.push(t * F, t * S, t * v), c.push(F, S, v), d.push(1 - h, f));
      }
    const f = e + 1,
      g = X(3, e * i * 2, Uint16Array);
    for (let t = 0; t < e; t++)
      for (let e = 0; e < i; e++)
        (g.push((e + 0) * f + t, (e + 0) * f + t + 1, (e + 1) * f + t),
          g.push((e + 1) * f + t, (e + 0) * f + t + 1, (e + 1) * f + t + 1));
    return { position: u, normal: c, texcoord: d, indices: g };
  }
  const nt = [
    [3, 7, 5, 1],
    [6, 2, 0, 4],
    [6, 7, 3, 2],
    [0, 1, 5, 4],
    [7, 6, 4, 5],
    [2, 3, 1, 0],
  ];
  function st(t) {
    const e = (t = t || 1) / 2,
      i = [
        [-e, -e, -e],
        [+e, -e, -e],
        [-e, +e, -e],
        [+e, +e, -e],
        [-e, -e, +e],
        [+e, -e, +e],
        [-e, +e, +e],
        [+e, +e, +e],
      ],
      r = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ],
      n = [
        [1, 0],
        [0, 0],
        [0, 1],
        [1, 1],
      ],
      s = X(3, 24),
      a = X(3, 24),
      o = X(2, 24),
      l = X(3, 12, Uint16Array);
    for (let t = 0; t < 6; ++t) {
      const e = nt[t];
      for (let l = 0; l < 4; ++l) {
        const h = i[e[l]],
          u = r[t],
          c = n[l];
        (s.push(h), a.push(u), o.push(c));
      }
      const h = 4 * t;
      (l.push(h + 0, h + 1, h + 2), l.push(h + 0, h + 2, h + 3));
    }
    return { position: s, normal: a, texcoord: o, indices: l };
  }
  function at(t, e, i, r, n, s, a) {
    if (r < 3) throw new Error("radialSubdivisions must be 3 or greater");
    if (n < 1) throw new Error("verticalSubdivisions must be 1 or greater");
    const o = void 0 === s || s,
      l = void 0 === a || a,
      h = (o ? 2 : 0) + (l ? 2 : 0),
      u = (r + 1) * (n + 1 + h),
      c = X(3, u),
      d = X(3, u),
      f = X(2, u),
      g = X(3, r * (n + h / 2) * 2, Uint16Array),
      p = r + 1,
      m = Math.atan2(t - e, i),
      b = Math.cos(m),
      y = Math.sin(m),
      F = n + (l ? 2 : 0);
    for (let s = o ? -2 : 0; s <= F; ++s) {
      let a,
        o = s / n,
        l = i * o;
      (s < 0
        ? ((l = 0), (o = 1), (a = t))
        : s > n
          ? ((l = i), (o = 1), (a = e))
          : (a = t + (s / n) * (e - t)),
        (-2 !== s && s !== n + 2) || ((a = 0), (o = 0)),
        (l -= i / 2));
      for (let t = 0; t < p; ++t) {
        const e = Math.sin((t * Math.PI * 2) / r),
          i = Math.cos((t * Math.PI * 2) / r);
        (c.push(e * a, l, i * a),
          s < 0
            ? d.push(0, -1, 0)
            : s > n
              ? d.push(0, 1, 0)
              : 0 === a
                ? d.push(0, 0, 0)
                : d.push(e * b, y, i * b),
          f.push(t / r, 1 - o));
      }
    }
    for (let t = 0; t < n + h; ++t)
      if (!((1 === t && o) || (t === n + h - 2 && l)))
        for (let e = 0; e < r; ++e)
          (g.push(p * (t + 0) + 0 + e, p * (t + 0) + 1 + e, p * (t + 1) + 1 + e),
            g.push(p * (t + 0) + 0 + e, p * (t + 1) + 1 + e, p * (t + 1) + 0 + e));
    return { position: c, normal: d, texcoord: f, indices: g };
  }
  function ot(t, e) {
    e = e || [];
    const i = [];
    for (let r = 0; r < t.length; r += 4) {
      const n = t[r],
        s = t.slice(r + 1, r + 4);
      s.push.apply(s, e);
      for (let t = 0; t < n; ++t) i.push.apply(i, s);
    }
    return i;
  }
  function lt() {
    const t = [
        0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, 30, 0, 0, 30, 30, 0, 100, 0,
        0, 30, 30, 0, 100, 30, 0, 100, 0, 0, 30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0,
        67, 60, 0, 0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, 30, 0, 30,
        100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, 30, 60, 30, 67, 60, 30, 30, 90,
        30, 30, 90, 30, 67, 60, 30, 67, 90, 30, 0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30,
        0, 0, 30, 100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, 30, 30, 0,
        30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, 30, 30, 0, 30, 60, 30, 30, 30,
        30, 30, 30, 0, 30, 60, 0, 30, 60, 30, 30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60,
        0, 67, 60, 30, 67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, 30, 90,
        0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, 30, 90, 0, 30, 150, 30, 30, 90,
        30, 30, 90, 0, 30, 150, 0, 30, 150, 30, 0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30,
        150, 30, 30, 150, 0, 0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
      ],
      e = ot([
        18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, 1, 0, 6,
        1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, -1, 0, 0,
      ]),
      i = ot(
        [
          18, 200, 70, 120, 18, 80, 70, 200, 6, 70, 200, 210, 6, 200, 200, 70, 6, 210, 100, 70, 6,
          210, 160, 70, 6, 70, 180, 210, 6, 100, 70, 210, 6, 76, 210, 100, 6, 140, 210, 80, 6, 90,
          130, 110, 6, 160, 160, 220,
        ],
        [255],
      ),
      r = t.length / 3,
      n = {
        position: X(3, r),
        texcoord: X(2, r),
        normal: X(3, r),
        color: X(4, r, Uint8Array),
        indices: X(3, r / 3, Uint16Array),
      };
    (n.position.push(t),
      n.texcoord.push([
        0.22, 0.19, 0.22, 0.79, 0.34, 0.19, 0.22, 0.79, 0.34, 0.79, 0.34, 0.19, 0.34, 0.19, 0.34,
        0.31, 0.62, 0.19, 0.34, 0.31, 0.62, 0.31, 0.62, 0.19, 0.34, 0.43, 0.34, 0.55, 0.49, 0.43,
        0.34, 0.55, 0.49, 0.55, 0.49, 0.43, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0,
        1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0,
        1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1,
        0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1,
        1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
      ]),
      n.normal.push(e),
      n.color.push(i));
    for (let t = 0; t < r; ++t) n.indices.push(t);
    return n;
  }
  function ht(t, e, i, r, a, o, l) {
    if (a <= 0) throw new Error("subdivisionDown must be > 0");
    const h = (l = l || 1) - (o = o || 0),
      u = 2 * (a + 1) * 4,
      c = X(3, u),
      d = X(3, u),
      f = X(2, u);
    function g(t, e, i) {
      return t + (e - t) * i;
    }
    function p(e, i, l, u, p, m) {
      for (let b = 0; b <= a; b++) {
        const y = i / 1,
          F = b / a,
          S = 2 * (y - 0.5),
          v = (o + F * h) * Math.PI,
          T = Math.sin(v),
          C = Math.cos(v),
          x = g(t, e, T),
          A = S * r,
          _ = C * t,
          w = T * x;
        c.push(A, _, w);
        const E = n(s([0, T, C], l), u);
        (d.push(E), f.push(y * p + m, F));
      }
    }
    for (let t = 0; t < 2; t++) {
      const r = 2 * (t / 1 - 0.5);
      (p(e, t, [1, 1, 1], [0, 0, 0], 1, 0),
        p(e, t, [0, 0, 0], [r, 0, 0], 0, 0),
        p(i, t, [1, 1, 1], [0, 0, 0], 1, 0),
        p(i, t, [0, 0, 0], [r, 0, 0], 0, 1));
    }
    const m = X(3, 2 * a * 4, Uint16Array);
    function b(t, e) {
      for (let i = 0; i < a; ++i)
        (m.push(t + i + 0, t + i + 1, e + i + 0), m.push(t + i + 1, e + i + 1, e + i + 0));
    }
    const y = a + 1;
    return (
      b(0 * y, 4 * y),
      b(5 * y, 7 * y),
      b(6 * y, 2 * y),
      b(3 * y, 1 * y),
      { position: c, normal: d, texcoord: f, indices: m }
    );
  }
  function ut(t, e, i, r, n, s) {
    return at(t, t, e, i, r, n, s);
  }
  function ct(t, e, i, r, n, s) {
    if (i < 3) throw new Error("radialSubdivisions must be 3 or greater");
    if (r < 3) throw new Error("verticalSubdivisions must be 3 or greater");
    n = n || 0;
    const a = (s = s || 2 * Math.PI) - n,
      o = i + 1,
      l = r + 1,
      h = o * l,
      u = X(3, h),
      c = X(3, h),
      d = X(2, h),
      f = X(3, i * r * 2, Uint16Array);
    for (let s = 0; s < l; ++s) {
      const l = s / r,
        h = l * Math.PI * 2,
        f = Math.sin(h),
        g = t + f * e,
        p = Math.cos(h),
        m = p * e;
      for (let t = 0; t < o; ++t) {
        const e = t / i,
          r = n + e * a,
          s = Math.sin(r),
          o = Math.cos(r),
          h = s * g,
          b = o * g,
          y = s * f,
          F = o * f;
        (u.push(h, m, b), c.push(y, p, F), d.push(e, 1 - l));
      }
    }
    for (let t = 0; t < r; ++t)
      for (let e = 0; e < i; ++e) {
        const i = 1 + e,
          r = 1 + t;
        (f.push(o * t + e, o * r + e, o * t + i), f.push(o * r + e, o * r + i, o * t + i));
      }
    return { position: u, normal: c, texcoord: d, indices: f };
  }
  function dt(t, e, i, r, n) {
    if (e < 3) throw new Error("divisions must be at least 3");
    ((n = n || 1), (r = r || 0));
    const s = (e + 1) * ((i = i || 1) + 1),
      a = X(3, s),
      o = X(3, s),
      l = X(2, s),
      h = X(3, i * e * 2, Uint16Array);
    let u = 0;
    const c = t - r,
      d = e + 1;
    for (let t = 0; t <= i; ++t) {
      const s = r + c * Math.pow(t / i, n);
      for (let r = 0; r <= e; ++r) {
        const n = (2 * Math.PI * r) / e,
          c = s * Math.cos(n),
          f = s * Math.sin(n);
        if ((a.push(c, 0, f), o.push(0, 1, 0), l.push(1 - r / e, t / i), t > 0 && r !== e)) {
          const t = u + (r + 1),
            e = u + r,
            i = u + r - d,
            n = u + (r + 1) - d;
          (h.push(t, e, i), h.push(t, i, n));
        }
      }
      u += e + 1;
    }
    return { position: a, normal: o, texcoord: l, indices: h };
  }
  function ft(t) {
    return function (e) {
      return V(e, t.apply(this, Array.prototype.slice.call(arguments, 1)));
    };
  }
  function gt(t) {
    return function (e) {
      return j(e, t.apply(null, Array.prototype.slice.call(arguments, 1)));
    };
  }
  (gt(lt),
    ft(lt),
    gt(st),
    ft(st),
    gt(it),
    ft(it),
    gt(rt),
    ft(rt),
    gt(at),
    ft(at),
    gt(et),
    ft(et),
    gt(ht),
    ft(ht),
    gt(ut),
    ft(ut),
    gt(ct),
    ft(ct),
    gt(dt),
    ft(dt));
  function pt(t) {
    return !!t.texStorage2D;
  }
  const mt = (function () {
    const t = {},
      e = {};
    return function (i, r) {
      return (
        (function (i) {
          const r = i.constructor.name;
          if (!t[r]) {
            for (const t in i)
              if ("number" == typeof i[t]) {
                const r = e[i[t]];
                e[i[t]] = r ? `${r} | ${t}` : t;
              }
            t[r] = !0;
          }
        })(i),
        e[r] || ("number" == typeof r ? `0x${r.toString(16)}` : r)
      );
    };
  })();
  (new Uint8Array([128, 192, 255, 255]),
    (function () {
      let t;
    })());
  const bt = 6407,
    yt = 33319,
    Ft = 6403,
    St = {};
  {
    const t = St;
    ((t[6406] = { numColorComponents: 1 }),
      (t[6409] = { numColorComponents: 1 }),
      (t[6410] = { numColorComponents: 2 }),
      (t[bt] = { numColorComponents: 3 }),
      (t[6408] = { numColorComponents: 4 }),
      (t[Ft] = { numColorComponents: 1 }),
      (t[36244] = { numColorComponents: 1 }),
      (t[yt] = { numColorComponents: 2 }),
      (t[33320] = { numColorComponents: 2 }),
      (t[bt] = { numColorComponents: 3 }),
      (t[36248] = { numColorComponents: 3 }),
      (t[6408] = { numColorComponents: 4 }),
      (t[36249] = { numColorComponents: 4 }),
      (t[6402] = { numColorComponents: 1 }),
      (t[34041] = { numColorComponents: 2 }));
  }
  const vt = C;
  function Tt(t) {
    return "undefined" != typeof document && document.getElementById
      ? document.getElementById(t)
      : null;
  }
  const Ct = 33984,
    xt = 34962,
    At = 5126,
    _t = 5124,
    wt = 5125,
    Et = 3553,
    Dt = 34067,
    Mt = 32879,
    kt = 35866,
    Bt = {};
  function Rt(t, e) {
    return Bt[e].bindPoint;
  }
  function Pt(t, e) {
    return function (i) {
      t.uniform1i(e, i);
    };
  }
  function It(t, e) {
    return function (i) {
      t.uniform1iv(e, i);
    };
  }
  function Lt(t, e) {
    return function (i) {
      t.uniform2iv(e, i);
    };
  }
  function Ut(t, e) {
    return function (i) {
      t.uniform3iv(e, i);
    };
  }
  function Ot(t, e) {
    return function (i) {
      t.uniform4iv(e, i);
    };
  }
  function Ht(t, e, i, r) {
    const n = Rt(0, e);
    return pt(t)
      ? function (e) {
          let s, a;
          (!e || _(0, e) ? ((s = e), (a = null)) : ((s = e.texture), (a = e.sampler)),
            t.uniform1i(r, i),
            t.activeTexture(Ct + i),
            t.bindTexture(n, s),
            t.bindSampler(i, a));
        }
      : function (e) {
          (t.uniform1i(r, i), t.activeTexture(Ct + i), t.bindTexture(n, e));
        };
  }
  function Wt(t, e, i, r, n) {
    const s = Rt(0, e),
      a = new Int32Array(n);
    for (let t = 0; t < n; ++t) a[t] = i + t;
    return pt(t)
      ? function (e) {
          (t.uniform1iv(r, a),
            e.forEach(function (e, r) {
              let n, o;
              (t.activeTexture(Ct + a[r]),
                !e || _(0, e) ? ((n = e), (o = null)) : ((n = e.texture), (o = e.sampler)),
                t.bindSampler(i, o),
                t.bindTexture(s, n));
            }));
        }
      : function (e) {
          (t.uniform1iv(r, a),
            e.forEach(function (e, i) {
              (t.activeTexture(Ct + a[i]), t.bindTexture(s, e));
            }));
        };
  }
  function Nt(t, e) {
    return function (i) {
      if (i.value)
        switch ((t.disableVertexAttribArray(e), i.value.length)) {
          case 4:
            t.vertexAttrib4fv(e, i.value);
            break;
          case 3:
            t.vertexAttrib3fv(e, i.value);
            break;
          case 2:
            t.vertexAttrib2fv(e, i.value);
            break;
          case 1:
            t.vertexAttrib1fv(e, i.value);
            break;
          default:
            throw new Error("the length of a float constant value must be between 1 and 4!");
        }
      else
        (t.bindBuffer(xt, i.buffer),
          t.enableVertexAttribArray(e),
          t.vertexAttribPointer(
            e,
            i.numComponents || i.size,
            i.type || At,
            i.normalize || !1,
            i.stride || 0,
            i.offset || 0,
          ),
          t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0));
    };
  }
  function Gt(t, e) {
    return function (i) {
      if (i.value) {
        if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
          throw new Error("The length of an integer constant value must be 4!");
        t.vertexAttrib4iv(e, i.value);
      } else
        (t.bindBuffer(xt, i.buffer),
          t.enableVertexAttribArray(e),
          t.vertexAttribIPointer(
            e,
            i.numComponents || i.size,
            i.type || _t,
            i.stride || 0,
            i.offset || 0,
          ),
          t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0));
    };
  }
  function jt(t, e) {
    return function (i) {
      if (i.value) {
        if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
          throw new Error("The length of an unsigned integer constant value must be 4!");
        t.vertexAttrib4uiv(e, i.value);
      } else
        (t.bindBuffer(xt, i.buffer),
          t.enableVertexAttribArray(e),
          t.vertexAttribIPointer(
            e,
            i.numComponents || i.size,
            i.type || wt,
            i.stride || 0,
            i.offset || 0,
          ),
          t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0));
    };
  }
  function zt(t, e, i) {
    const r = i.size,
      n = i.count;
    return function (i) {
      t.bindBuffer(xt, i.buffer);
      const s = i.size || i.numComponents || r,
        a = s / n,
        o = i.type || At,
        l = Bt[o].size * s,
        h = i.normalize || !1,
        u = i.offset || 0,
        c = l / n;
      for (let r = 0; r < n; ++r)
        (t.enableVertexAttribArray(e + r),
          t.vertexAttribPointer(e + r, a, o, h, l, u + c * r),
          t.vertexAttribDivisor && t.vertexAttribDivisor(e + r, i.divisor || 0));
    };
  }
  ((Bt[5126] = {
    Type: Float32Array,
    size: 4,
    setter: function (t, e) {
      return function (i) {
        t.uniform1f(e, i);
      };
    },
    arraySetter: function (t, e) {
      return function (i) {
        t.uniform1fv(e, i);
      };
    },
  }),
    (Bt[35664] = {
      Type: Float32Array,
      size: 8,
      setter: function (t, e) {
        return function (i) {
          t.uniform2fv(e, i);
        };
      },
      cols: 2,
    }),
    (Bt[35665] = {
      Type: Float32Array,
      size: 12,
      setter: function (t, e) {
        return function (i) {
          t.uniform3fv(e, i);
        };
      },
      cols: 3,
    }),
    (Bt[35666] = {
      Type: Float32Array,
      size: 16,
      setter: function (t, e) {
        return function (i) {
          t.uniform4fv(e, i);
        };
      },
      cols: 4,
    }),
    (Bt[_t] = { Type: Int32Array, size: 4, setter: Pt, arraySetter: It }),
    (Bt[35667] = { Type: Int32Array, size: 8, setter: Lt, cols: 2 }),
    (Bt[35668] = { Type: Int32Array, size: 12, setter: Ut, cols: 3 }),
    (Bt[35669] = { Type: Int32Array, size: 16, setter: Ot, cols: 4 }),
    (Bt[5125] = {
      Type: Uint32Array,
      size: 4,
      setter: function (t, e) {
        return function (i) {
          t.uniform1ui(e, i);
        };
      },
      arraySetter: function (t, e) {
        return function (i) {
          t.uniform1uiv(e, i);
        };
      },
    }),
    (Bt[36294] = {
      Type: Uint32Array,
      size: 8,
      setter: function (t, e) {
        return function (i) {
          t.uniform2uiv(e, i);
        };
      },
      cols: 2,
    }),
    (Bt[36295] = {
      Type: Uint32Array,
      size: 12,
      setter: function (t, e) {
        return function (i) {
          t.uniform3uiv(e, i);
        };
      },
      cols: 3,
    }),
    (Bt[36296] = {
      Type: Uint32Array,
      size: 16,
      setter: function (t, e) {
        return function (i) {
          t.uniform4uiv(e, i);
        };
      },
      cols: 4,
    }),
    (Bt[35670] = { Type: Uint32Array, size: 4, setter: Pt, arraySetter: It }),
    (Bt[35671] = { Type: Uint32Array, size: 8, setter: Lt, cols: 2 }),
    (Bt[35672] = { Type: Uint32Array, size: 12, setter: Ut, cols: 3 }),
    (Bt[35673] = { Type: Uint32Array, size: 16, setter: Ot, cols: 4 }),
    (Bt[35674] = {
      Type: Float32Array,
      size: 32,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix2fv(e, !1, i);
        };
      },
      rows: 2,
      cols: 2,
    }),
    (Bt[35675] = {
      Type: Float32Array,
      size: 48,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix3fv(e, !1, i);
        };
      },
      rows: 3,
      cols: 3,
    }),
    (Bt[35676] = {
      Type: Float32Array,
      size: 64,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix4fv(e, !1, i);
        };
      },
      rows: 4,
      cols: 4,
    }),
    (Bt[35685] = {
      Type: Float32Array,
      size: 32,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix2x3fv(e, !1, i);
        };
      },
      rows: 2,
      cols: 3,
    }),
    (Bt[35686] = {
      Type: Float32Array,
      size: 32,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix2x4fv(e, !1, i);
        };
      },
      rows: 2,
      cols: 4,
    }),
    (Bt[35687] = {
      Type: Float32Array,
      size: 48,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix3x2fv(e, !1, i);
        };
      },
      rows: 3,
      cols: 2,
    }),
    (Bt[35688] = {
      Type: Float32Array,
      size: 48,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix3x4fv(e, !1, i);
        };
      },
      rows: 3,
      cols: 4,
    }),
    (Bt[35689] = {
      Type: Float32Array,
      size: 64,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix4x2fv(e, !1, i);
        };
      },
      rows: 4,
      cols: 2,
    }),
    (Bt[35690] = {
      Type: Float32Array,
      size: 64,
      setter: function (t, e) {
        return function (i) {
          t.uniformMatrix4x3fv(e, !1, i);
        };
      },
      rows: 4,
      cols: 3,
    }),
    (Bt[35678] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Et }),
    (Bt[35680] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Dt }),
    (Bt[35679] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Mt }),
    (Bt[35682] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Et }),
    (Bt[36289] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: kt }),
    (Bt[36292] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: kt }),
    (Bt[36293] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Dt }),
    (Bt[36298] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Et }),
    (Bt[36299] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Mt }),
    (Bt[36300] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Dt }),
    (Bt[36303] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: kt }),
    (Bt[36306] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Et }),
    (Bt[36307] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Mt }),
    (Bt[36308] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: Dt }),
    (Bt[36311] = { Type: null, size: 0, setter: Ht, arraySetter: Wt, bindPoint: kt }));
  const Vt = {};
  ((Vt[5126] = { size: 4, setter: Nt }),
    (Vt[35664] = { size: 8, setter: Nt }),
    (Vt[35665] = { size: 12, setter: Nt }),
    (Vt[35666] = { size: 16, setter: Nt }),
    (Vt[_t] = { size: 4, setter: Gt }),
    (Vt[35667] = { size: 8, setter: Gt }),
    (Vt[35668] = { size: 12, setter: Gt }),
    (Vt[35669] = { size: 16, setter: Gt }),
    (Vt[5125] = { size: 4, setter: jt }),
    (Vt[36294] = { size: 8, setter: jt }),
    (Vt[36295] = { size: 12, setter: jt }),
    (Vt[36296] = { size: 16, setter: jt }),
    (Vt[35670] = { size: 4, setter: Gt }),
    (Vt[35671] = { size: 8, setter: Gt }),
    (Vt[35672] = { size: 12, setter: Gt }),
    (Vt[35673] = { size: 16, setter: Gt }),
    (Vt[35674] = { size: 4, setter: zt, count: 2 }),
    (Vt[35675] = { size: 9, setter: zt, count: 3 }),
    (Vt[35676] = { size: 16, setter: zt, count: 4 }));
  const qt = /ERROR:\s*\d+:(\d+)/gi;
  const Xt = /^[ \t]*\n/;
  function Kt(t) {
    let e = 0;
    return (Xt.test(t) && ((e = 1), (t = t.replace(Xt, ""))), { lineOffset: e, shaderSource: t });
  }
  function Yt(t, e) {
    return (
      t.errorCallback(e),
      t.callback &&
        setTimeout(() => {
          t.callback(`${e}\n${t.errors.join("\n")}`);
        }),
      null
    );
  }
  function $t(t, e, i, r) {
    r = r || vt;
    if (!t.getShaderParameter(i, 35713)) {
      const n = t.getShaderInfoLog(i),
        { lineOffset: s, shaderSource: a } = Kt(t.getShaderSource(i)),
        o = `${(function (t, e = "", i = 0) {
          const r = [...e.matchAll(qt)],
            n = new Map(
              r.map((t, i) => {
                const n = parseInt(t[1]),
                  s = r[i + 1],
                  a = s ? s.index : e.length;
                return [n - 1, e.substring(t.index, a)];
              }),
            );
          return t
            .split("\n")
            .map((t, e) => {
              const r = n.get(e);
              return `${e + 1 + i}: ${t}${r ? `\n\n^^^ ${r}` : ""}`;
            })
            .join("\n");
        })(a, n, s)}\nError compiling ${mt(t, e)}: ${n}`;
      return (r(o), o);
    }
    return "";
  }
  function Jt(t, e, i) {
    let r, n, s;
    if (("function" == typeof e && ((i = e), (e = void 0)), "function" == typeof t))
      ((i = t), (t = void 0));
    else if (t && !Array.isArray(t)) {
      const e = t;
      ((i = e.errorCallback),
        (t = e.attribLocations),
        (r = e.transformFeedbackVaryings),
        (n = e.transformFeedbackMode),
        (s = e.callback));
    }
    const a = i || vt,
      o = [],
      l = {
        errorCallback(t, ...e) {
          (o.push(t), a(t, ...e));
        },
        transformFeedbackVaryings: r,
        transformFeedbackMode: n,
        callback: s,
        errors: o,
      };
    {
      let i = {};
      (Array.isArray(t)
        ? t.forEach(function (t, r) {
            i[t] = e ? e[r] : r;
          })
        : (i = t || {}),
        (l.attribLocations = i));
    }
    return l;
  }
  const Qt = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
  function Zt(t, e) {
    return e.indexOf("frag") >= 0 ? 35632 : e.indexOf("vert") >= 0 ? 35633 : void 0;
  }
  const te = (t = 0) => new Promise((e) => setTimeout(e, t));
  function ee(t, e, i) {
    const r = t.createProgram(),
      { attribLocations: n, transformFeedbackVaryings: s, transformFeedbackMode: a } = Jt(i);
    for (let i = 0; i < e.length; ++i) {
      let n = e[i];
      if ("string" == typeof n) {
        const e = Tt(n),
          s = e ? e.text : n;
        let a = t[Qt[i]];
        (e && e.type && (a = Zt(0, e.type) || a),
          (n = t.createShader(a)),
          t.shaderSource(n, Kt(s).shaderSource),
          t.compileShader(n),
          t.attachShader(r, n));
      }
    }
    Object.entries(n).forEach(([e, i]) => t.bindAttribLocation(r, i, e));
    {
      let e = s;
      e &&
        (e.attribs && (e = e.attribs),
        Array.isArray(e) || (e = Object.keys(e)),
        t.transformFeedbackVaryings(r, e, a || 35981));
    }
    return (t.linkProgram(r), r);
  }
  function ie(t, e, i, r, n) {
    const s = Jt(i, r, n),
      a = new Set(e),
      o = ee(t, e, s);
    function l(t, e) {
      const i = se(t, e, s.errorCallback);
      return (
        i &&
          (function (t, e, i) {
            const r = t.getAttachedShaders(e);
            for (const e of r) i.has(e) && t.deleteShader(e);
            t.deleteProgram(e);
          })(t, e, a),
        i
      );
    }
    if (!s.callback) return l(t, o) ? void 0 : o;
    ne(t, o).then(() => {
      const e = l(t, o);
      s.callback(e, e ? void 0 : o);
    });
  }
  function re(t) {
    return function (e, i, ...r) {
      return new Promise((n, s) => {
        const a = Jt(...r);
        ((a.callback = (t, e) => {
          t ? s(t) : n(e);
        }),
          t(e, i, a));
      });
    };
  }
  (re(ie), re(Fe));
  async function ne(t, e) {
    const i = t.getExtension("KHR_parallel_shader_compile"),
      r = i ? (t, e) => t.getProgramParameter(e, i.COMPLETION_STATUS_KHR) : () => !0;
    let n = 0;
    do {
      (await te(n), (n = 1e3 / 60));
    } while (!r(t, e));
  }
  function se(t, e, i) {
    i = i || vt;
    if (!t.getProgramParameter(e, 35714)) {
      const r = t.getProgramInfoLog(e);
      i(`Error in program linking: ${r}`);
      return `${r}\n${t
        .getAttachedShaders(e)
        .map((e) => $t(t, t.getShaderParameter(e, t.SHADER_TYPE), e, i))
        .filter((t) => t)
        .join("\n")}`;
    }
  }
  function ae(t, e, i, r, n) {
    return ie(t, e, i, r, n);
  }
  function oe(t) {
    const e = t.name;
    return e.startsWith("gl_") || e.startsWith("webgl_");
  }
  const le = /(\.|\[|]|\w+)/g,
    he = (t) => t >= "0" && t <= "9";
  function ue(t, e, i, r) {
    const n = t.split(le).filter((t) => "" !== t);
    let s = 0,
      a = "";
    for (;;) {
      const t = n[s++];
      a += t;
      const o = he(t[0]),
        l = o ? parseInt(t) : t;
      o && (a += n[s++]);
      if (s === n.length) {
        i[l] = e;
        break;
      }
      {
        const t = n[s++],
          e = "[" === t,
          o = i[l] || (e ? [] : {});
        ((i[l] = o),
          (i = o),
          (r[a] =
            r[a] ||
            (function (t) {
              return function (e) {
                ge(t, e);
              };
            })(o)),
          (a += t));
      }
    }
  }
  function ce(t, e) {
    let i = 0;
    function r(e, r, n) {
      const s = r.name.endsWith("[0]"),
        a = r.type,
        o = Bt[a];
      if (!o) throw new Error(`unknown type: 0x${a.toString(16)}`);
      let l;
      if (o.bindPoint) {
        const e = i;
        ((i += r.size), (l = s ? o.arraySetter(t, a, e, n, r.size) : o.setter(t, a, e, n, r.size)));
      } else l = o.arraySetter && s ? o.arraySetter(t, n) : o.setter(t, n);
      return ((l.location = n), l);
    }
    const n = {},
      s = {},
      a = t.getProgramParameter(e, 35718);
    for (let i = 0; i < a; ++i) {
      const a = t.getActiveUniform(e, i);
      if (oe(a)) continue;
      let o = a.name;
      o.endsWith("[0]") && (o = o.substr(0, o.length - 3));
      const l = t.getUniformLocation(e, a.name);
      if (l) {
        const t = r(0, a, l);
        ((n[o] = t), ue(o, t, s, n));
      }
    }
    return n;
  }
  function de(t, e) {
    const i = {},
      r = t.getProgramParameter(e, 35971);
    for (let n = 0; n < r; ++n) {
      const r = t.getTransformFeedbackVarying(e, n);
      i[r.name] = { index: n, type: r.type, size: r.size };
    }
    return i;
  }
  function fe(t, e) {
    const i = t.getProgramParameter(e, 35718),
      r = [],
      n = [];
    for (let s = 0; s < i; ++s) {
      (n.push(s), r.push({}));
      const i = t.getActiveUniform(e, s);
      r[s].name = i.name;
    }
    [
      ["UNIFORM_TYPE", "type"],
      ["UNIFORM_SIZE", "size"],
      ["UNIFORM_BLOCK_INDEX", "blockNdx"],
      ["UNIFORM_OFFSET", "offset"],
    ].forEach(function (i) {
      const s = i[0],
        a = i[1];
      t.getActiveUniforms(e, n, t[s]).forEach(function (t, e) {
        r[e][a] = t;
      });
    });
    const s = {},
      a = t.getProgramParameter(e, 35382);
    for (let i = 0; i < a; ++i) {
      const r = t.getActiveUniformBlockName(e, i),
        n = {
          index: t.getUniformBlockIndex(e, r),
          usedByVertexShader: t.getActiveUniformBlockParameter(e, i, 35396),
          usedByFragmentShader: t.getActiveUniformBlockParameter(e, i, 35398),
          size: t.getActiveUniformBlockParameter(e, i, 35392),
          uniformIndices: t.getActiveUniformBlockParameter(e, i, 35395),
        };
      ((n.used = n.usedByVertexShader || n.usedByFragmentShader), (s[r] = n));
    }
    return { blockSpecs: s, uniformData: r };
  }
  function ge(t, e) {
    for (const i in e) {
      const r = t[i];
      "function" == typeof r ? r(e[i]) : ge(t[i], e[i]);
    }
  }
  function pe(t, ...e) {
    const i = t.uniformSetters || t,
      r = e.length;
    for (let t = 0; t < r; ++t) {
      const r = e[t];
      if (Array.isArray(r)) {
        const t = r.length;
        for (let e = 0; e < t; ++e) pe(i, r[e]);
      } else
        for (const t in r) {
          const e = i[t];
          e && e(r[t]);
        }
    }
  }
  function me(t, e) {
    const i = {},
      r = t.getProgramParameter(e, 35721);
    for (let n = 0; n < r; ++n) {
      const r = t.getActiveAttrib(e, n);
      if (oe(r)) continue;
      const s = t.getAttribLocation(e, r.name),
        a = Vt[r.type],
        o = a.setter(t, s, a);
      ((o.location = s), (i[r.name] = o));
    }
    return i;
  }
  function be(t, e) {
    const i = { program: e, uniformSetters: ce(t, e), attribSetters: me(t, e) };
    return (pt(t) && ((i.uniformBlockSpec = fe(t, e)), (i.transformFeedbackInfo = de(t, e))), i);
  }
  const ye = /\s|{|}|;/;
  function Fe(t, e, i, r, n) {
    const s = Jt(i, r, n),
      a = [];
    if (
      ((e = e.map(function (t) {
        if (!ye.test(t)) {
          const e = Tt(t);
          if (e) t = e.text;
          else {
            const e = `no element with id: ${t}`;
            (s.errorCallback(e), a.push(e));
          }
        }
        return t;
      })),
      a.length)
    )
      return Yt(s, "");
    const o = s.callback;
    o &&
      (s.callback = (e, i) => {
        o(e, e ? void 0 : be(t, i));
      });
    const l = ae(t, e, s);
    return l ? be(t, l) : null;
  }
  function Se(t, e, i, r, n) {
    for (const [s, a] of Object.entries(e)) {
      const o = { ...n },
        l = i[s];
      Array.isArray(l) || Object.assign(o, l);
      const h = se(t, a, o.errorCallback);
      if (h) {
        for (const i of Object.values(e)) {
          const e = t.getAttachedShaders(i);
          t.deleteProgram(i);
          for (const i of e) r.has(i) || t.deleteShader(i);
        }
        return h;
      }
    }
  }
  function ve(t, e, i = {}) {
    const r = new Set(),
      n = Object.fromEntries(
        Object.entries(e).map(([e, n]) => {
          const s = { ...i },
            a = Array.isArray(n) ? n : n.shaders;
          return (Array.isArray(n) || Object.assign(s, n), a.forEach(r.add, r), [e, ee(t, a, s)]);
        }),
      );
    if (i.callback)
      return void (async function (t, e) {
        for (const i of Object.values(e)) await ne(t, i);
      })(t, n).then(() => {
        const s = Se(t, n, e, r, i);
        i.callback(s, s ? void 0 : n);
      });
    return Se(t, n, e, r, i) ? void 0 : n;
  }
  function Te(t, e, i) {
    function r(t, e) {
      return Object.fromEntries(Object.entries(e).map(([e, i]) => [e, be(t, i)]));
    }
    const n = (i = Jt(i)).callback;
    n &&
      (i.callback = (e, i) => {
        n(e, e ? void 0 : r(t, i));
      });
    const s = ve(t, e, i);
    if (!n && s) return r(t, s);
  }
  (re(ve), re(Te));
  const Ce = 36096,
    xe = 33306,
    Ae = {};
  ((Ae[34041] = xe),
    (Ae[6401] = 36128),
    (Ae[36168] = 36128),
    (Ae[6402] = Ce),
    (Ae[33189] = Ce),
    (Ae[33190] = Ce),
    (Ae[36012] = Ce),
    (Ae[35056] = xe),
    (Ae[36013] = xe));
  const _e = {};
  ((_e[32854] = !0),
    (_e[32855] = !0),
    (_e[36194] = !0),
    (_e[34041] = !0),
    (_e[33189] = !0),
    (_e[6401] = !0),
    (_e[36168] = !0));
  var we = {};
  const Ee = {
    position: 3,
    normal: 3,
    tangent: 3,
    texcoord: 2,
    texcoord0: 2,
    texcoord1: 2,
    texcoord2: 2,
  };
  var De = {};
  class Me {
    constructor() {
      this.attribs = {};
    }
    disableAll() {
      for (let t in this.attribs) this.gl.disableVertexAttribArray(this.attribs[t]);
      this.attribs = {};
    }
    enable(t, e) {
      this.gl = t;
      var i = {};
      for (let n in e) {
        var r = e[n];
        void 0 !== r.loc &&
          (void 0 === this.attribs[r.loc] && t.enableVertexAttribArray(r.loc),
          t.vertexAttribPointer(r.loc, r.size, r.type, !1, r.stride, r.offset),
          (i[r.loc] = r.loc),
          (this.attribs[n] = null));
      }
      for (let t in this.attribs);
      this.attribs = i;
    }
  }
  class ke {
    static CreateProgramAttributes(t, e) {
      var i = {},
        r = 0;
      for (let a in e) {
        var n = e[a],
          s = Ee[a];
        ((i[n] = { type: t.FLOAT, size: s, offset: 4 * r }), (r += s));
      }
      for (let t in i) i[t].stride = 4 * r;
      return i;
    }
    CleanUpPrograms() {
      De = {};
    }
    ReleaseProgram(t) {}
    static _GetProgram(t) {
      return De[t];
    }
    static RegisterProgram(t, e) {
      if (!De[t]) {
        var i = e.shaders;
        De[t] = { shaders: [i[0], i[1]], attributes: e.attributes };
      }
      return De[t];
    }
    static GetProgram(t, e, i, r) {
      var n = De[e],
        s = "";
      for (var a in i) s += a + ":" + i[a] + "-";
      if (!n) {
        var o = e.split("."),
          l = we[o[0]][o[1]];
        l && (n = ke.RegisterProgram(e, l));
      }
      if (!n) throw "Program not registered: " + o;
      (n.programInfo || (n.programInfo = {}),
        (n.programInfo[s] = ke.CompileProgram(t, n.shaders, i)),
        (r = r || (n.attributes && ke.CreateProgramAttributes(t, n.attributes))));
      var h = n.programInfo[s];
      if (r)
        for (var a in r) {
          var u = h.attribSetters[a];
          u && ((r[a] = r[a] || {}), (r[a].loc = u.location));
        }
      return ((h.attributes = r), h);
    }
    static CompileProgram(t, e, i, r) {
      var n = "";
      for (var s in i) {
        var a = i[s];
        n = "#define " + s + " " + (null === a ? "" : a) + "\n";
      }
      var o = {};
      const l = Fe(t, [n + e[0], n + e[1]], null, null);
      if (r)
        for (var s in r) {
          var h = l.attribSetters[s];
          h && ((r[s] = r[s] || {}), (r[s].loc = h.location));
        }
      for (var s in l.uniformSetters) o[s] = l.uniformSetters[s].location;
      return ((l.uniforms = o), l);
    }
  }
  var Be = new ke(),
    Re = 1e-6,
    Pe = "undefined" != typeof Float32Array ? Float32Array : Array;
  Math.random;
  Math.PI;
  function Ie() {
    var t = new Pe(3);
    return (Pe != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), t);
  }
  function Le(t) {
    var e = t[0],
      i = t[1],
      r = t[2];
    return Math.hypot(e, i, r);
  }
  function Ue(t, e, i) {
    var r = new Pe(3);
    return ((r[0] = t), (r[1] = e), (r[2] = i), r);
  }
  function Oe(t, e) {
    return ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t);
  }
  function He(t, e, i, r) {
    return ((t[0] = e), (t[1] = i), (t[2] = r), t);
  }
  function We(t, e, i) {
    return ((t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), (t[2] = e[2] + i[2]), t);
  }
  function Ne(t, e, i) {
    return ((t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), (t[2] = e[2] - i[2]), t);
  }
  function Ge(t, e, i) {
    return ((t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), (t[2] = e[2] * i[2]), t);
  }
  function je(t, e, i) {
    return (
      (t[0] = Math.min(e[0], i[0])),
      (t[1] = Math.min(e[1], i[1])),
      (t[2] = Math.min(e[2], i[2])),
      t
    );
  }
  function ze(t, e, i) {
    return (
      (t[0] = Math.max(e[0], i[0])),
      (t[1] = Math.max(e[1], i[1])),
      (t[2] = Math.max(e[2], i[2])),
      t
    );
  }
  function Ve(t, e, i) {
    return ((t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), t);
  }
  function qe(t, e, i, r) {
    return ((t[0] = e[0] + i[0] * r), (t[1] = e[1] + i[1] * r), (t[2] = e[2] + i[2] * r), t);
  }
  function Xe(t) {
    var e = t[0],
      i = t[1],
      r = t[2];
    return e * e + i * i + r * r;
  }
  function Ke(t, e) {
    return ((t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), t);
  }
  function Ye(t, e) {
    var i = e[0],
      r = e[1],
      n = e[2],
      s = i * i + r * r + n * n;
    return (
      s > 0 && (s = 1 / Math.sqrt(s)),
      (t[0] = e[0] * s),
      (t[1] = e[1] * s),
      (t[2] = e[2] * s),
      t
    );
  }
  function $e(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
  }
  function Je(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = i[0],
      o = i[1],
      l = i[2];
    return ((t[0] = n * l - s * o), (t[1] = s * a - r * l), (t[2] = r * o - n * a), t);
  }
  function Qe(t, e, i, r) {
    var n = e[0],
      s = e[1],
      a = e[2];
    return (
      (t[0] = n + r * (i[0] - n)),
      (t[1] = s + r * (i[1] - s)),
      (t[2] = a + r * (i[2] - a)),
      t
    );
  }
  function Ze(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = i[3] * r + i[7] * n + i[11] * s + i[15];
    return (
      (a = a || 1),
      (t[0] = (i[0] * r + i[4] * n + i[8] * s + i[12]) / a),
      (t[1] = (i[1] * r + i[5] * n + i[9] * s + i[13]) / a),
      (t[2] = (i[2] * r + i[6] * n + i[10] * s + i[14]) / a),
      t
    );
  }
  function ti(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2];
    return (
      (t[0] = r * i[0] + n * i[3] + s * i[6]),
      (t[1] = r * i[1] + n * i[4] + s * i[7]),
      (t[2] = r * i[2] + n * i[5] + s * i[8]),
      t
    );
  }
  Math.hypot ||
    (Math.hypot = function () {
      for (var t = 0, e = arguments.length; e--; ) t += arguments[e] * arguments[e];
      return Math.sqrt(t);
    });
  var ei,
    ii = Ne,
    ri = Le;
  ei = Ie();
  function ni() {
    var t = new Pe(16);
    return (
      Pe != Float32Array &&
        ((t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0)),
      (t[0] = 1),
      (t[5] = 1),
      (t[10] = 1),
      (t[15] = 1),
      t
    );
  }
  function si(t, e) {
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[3]),
      (t[4] = e[4]),
      (t[5] = e[5]),
      (t[6] = e[6]),
      (t[7] = e[7]),
      (t[8] = e[8]),
      (t[9] = e[9]),
      (t[10] = e[10]),
      (t[11] = e[11]),
      (t[12] = e[12]),
      (t[13] = e[13]),
      (t[14] = e[14]),
      (t[15] = e[15]),
      t
    );
  }
  function ai(t, e, i, r, n, s, a, o, l, h, u, c, d, f, g, p) {
    var m = new Pe(16);
    return (
      (m[0] = t),
      (m[1] = e),
      (m[2] = i),
      (m[3] = r),
      (m[4] = n),
      (m[5] = s),
      (m[6] = a),
      (m[7] = o),
      (m[8] = l),
      (m[9] = h),
      (m[10] = u),
      (m[11] = c),
      (m[12] = d),
      (m[13] = f),
      (m[14] = g),
      (m[15] = p),
      m
    );
  }
  function oi(t) {
    return (
      (t[0] = 1),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = 1),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 1),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      t
    );
  }
  function li(t, e) {
    if (t === e) {
      var i = e[1],
        r = e[2],
        n = e[3],
        s = e[6],
        a = e[7],
        o = e[11];
      ((t[1] = e[4]),
        (t[2] = e[8]),
        (t[3] = e[12]),
        (t[4] = i),
        (t[6] = e[9]),
        (t[7] = e[13]),
        (t[8] = r),
        (t[9] = s),
        (t[11] = e[14]),
        (t[12] = n),
        (t[13] = a),
        (t[14] = o));
    } else
      ((t[0] = e[0]),
        (t[1] = e[4]),
        (t[2] = e[8]),
        (t[3] = e[12]),
        (t[4] = e[1]),
        (t[5] = e[5]),
        (t[6] = e[9]),
        (t[7] = e[13]),
        (t[8] = e[2]),
        (t[9] = e[6]),
        (t[10] = e[10]),
        (t[11] = e[14]),
        (t[12] = e[3]),
        (t[13] = e[7]),
        (t[14] = e[11]),
        (t[15] = e[15]));
    return t;
  }
  function hi(t, e) {
    var i = e[0],
      r = e[1],
      n = e[2],
      s = e[3],
      a = e[4],
      o = e[5],
      l = e[6],
      h = e[7],
      u = e[8],
      c = e[9],
      d = e[10],
      f = e[11],
      g = e[12],
      p = e[13],
      m = e[14],
      b = e[15],
      y = i * o - r * a,
      F = i * l - n * a,
      S = i * h - s * a,
      v = r * l - n * o,
      T = r * h - s * o,
      C = n * h - s * l,
      x = u * p - c * g,
      A = u * m - d * g,
      _ = u * b - f * g,
      w = c * m - d * p,
      E = c * b - f * p,
      D = d * b - f * m,
      M = y * D - F * E + S * w + v * _ - T * A + C * x;
    return M
      ? ((M = 1 / M),
        (t[0] = (o * D - l * E + h * w) * M),
        (t[1] = (n * E - r * D - s * w) * M),
        (t[2] = (p * C - m * T + b * v) * M),
        (t[3] = (d * T - c * C - f * v) * M),
        (t[4] = (l * _ - a * D - h * A) * M),
        (t[5] = (i * D - n * _ + s * A) * M),
        (t[6] = (m * S - g * C - b * F) * M),
        (t[7] = (u * C - d * S + f * F) * M),
        (t[8] = (a * E - o * _ + h * x) * M),
        (t[9] = (r * _ - i * E - s * x) * M),
        (t[10] = (g * T - p * S + b * y) * M),
        (t[11] = (c * S - u * T - f * y) * M),
        (t[12] = (o * A - a * w - l * x) * M),
        (t[13] = (i * w - r * A + n * x) * M),
        (t[14] = (p * F - g * v - m * y) * M),
        (t[15] = (u * v - c * F + d * y) * M),
        t)
      : null;
  }
  function ui(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = e[4],
      l = e[5],
      h = e[6],
      u = e[7],
      c = e[8],
      d = e[9],
      f = e[10],
      g = e[11],
      p = e[12],
      m = e[13],
      b = e[14],
      y = e[15],
      F = i[0],
      S = i[1],
      v = i[2],
      T = i[3];
    return (
      (t[0] = F * r + S * o + v * c + T * p),
      (t[1] = F * n + S * l + v * d + T * m),
      (t[2] = F * s + S * h + v * f + T * b),
      (t[3] = F * a + S * u + v * g + T * y),
      (F = i[4]),
      (S = i[5]),
      (v = i[6]),
      (T = i[7]),
      (t[4] = F * r + S * o + v * c + T * p),
      (t[5] = F * n + S * l + v * d + T * m),
      (t[6] = F * s + S * h + v * f + T * b),
      (t[7] = F * a + S * u + v * g + T * y),
      (F = i[8]),
      (S = i[9]),
      (v = i[10]),
      (T = i[11]),
      (t[8] = F * r + S * o + v * c + T * p),
      (t[9] = F * n + S * l + v * d + T * m),
      (t[10] = F * s + S * h + v * f + T * b),
      (t[11] = F * a + S * u + v * g + T * y),
      (F = i[12]),
      (S = i[13]),
      (v = i[14]),
      (T = i[15]),
      (t[12] = F * r + S * o + v * c + T * p),
      (t[13] = F * n + S * l + v * d + T * m),
      (t[14] = F * s + S * h + v * f + T * b),
      (t[15] = F * a + S * u + v * g + T * y),
      t
    );
  }
  function ci(t, e, i) {
    var r,
      n,
      s,
      a,
      o,
      l,
      h,
      u,
      c,
      d,
      f,
      g,
      p = i[0],
      m = i[1],
      b = i[2];
    return (
      e === t
        ? ((t[12] = e[0] * p + e[4] * m + e[8] * b + e[12]),
          (t[13] = e[1] * p + e[5] * m + e[9] * b + e[13]),
          (t[14] = e[2] * p + e[6] * m + e[10] * b + e[14]),
          (t[15] = e[3] * p + e[7] * m + e[11] * b + e[15]))
        : ((r = e[0]),
          (n = e[1]),
          (s = e[2]),
          (a = e[3]),
          (o = e[4]),
          (l = e[5]),
          (h = e[6]),
          (u = e[7]),
          (c = e[8]),
          (d = e[9]),
          (f = e[10]),
          (g = e[11]),
          (t[0] = r),
          (t[1] = n),
          (t[2] = s),
          (t[3] = a),
          (t[4] = o),
          (t[5] = l),
          (t[6] = h),
          (t[7] = u),
          (t[8] = c),
          (t[9] = d),
          (t[10] = f),
          (t[11] = g),
          (t[12] = r * p + o * m + c * b + e[12]),
          (t[13] = n * p + l * m + d * b + e[13]),
          (t[14] = s * p + h * m + f * b + e[14]),
          (t[15] = a * p + u * m + g * b + e[15])),
      t
    );
  }
  function di(t, e, i) {
    var r = i[0],
      n = i[1],
      s = i[2];
    return (
      (t[0] = e[0] * r),
      (t[1] = e[1] * r),
      (t[2] = e[2] * r),
      (t[3] = e[3] * r),
      (t[4] = e[4] * n),
      (t[5] = e[5] * n),
      (t[6] = e[6] * n),
      (t[7] = e[7] * n),
      (t[8] = e[8] * s),
      (t[9] = e[9] * s),
      (t[10] = e[10] * s),
      (t[11] = e[11] * s),
      (t[12] = e[12]),
      (t[13] = e[13]),
      (t[14] = e[14]),
      (t[15] = e[15]),
      t
    );
  }
  function fi(t, e, i) {
    var r = Math.sin(i),
      n = Math.cos(i),
      s = e[4],
      a = e[5],
      o = e[6],
      l = e[7],
      h = e[8],
      u = e[9],
      c = e[10],
      d = e[11];
    return (
      e !== t &&
        ((t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[3]),
        (t[12] = e[12]),
        (t[13] = e[13]),
        (t[14] = e[14]),
        (t[15] = e[15])),
      (t[4] = s * n + h * r),
      (t[5] = a * n + u * r),
      (t[6] = o * n + c * r),
      (t[7] = l * n + d * r),
      (t[8] = h * n - s * r),
      (t[9] = u * n - a * r),
      (t[10] = c * n - o * r),
      (t[11] = d * n - l * r),
      t
    );
  }
  function gi(t, e, i) {
    var r = Math.sin(i),
      n = Math.cos(i),
      s = e[0],
      a = e[1],
      o = e[2],
      l = e[3],
      h = e[4],
      u = e[5],
      c = e[6],
      d = e[7];
    return (
      e !== t &&
        ((t[8] = e[8]),
        (t[9] = e[9]),
        (t[10] = e[10]),
        (t[11] = e[11]),
        (t[12] = e[12]),
        (t[13] = e[13]),
        (t[14] = e[14]),
        (t[15] = e[15])),
      (t[0] = s * n + h * r),
      (t[1] = a * n + u * r),
      (t[2] = o * n + c * r),
      (t[3] = l * n + d * r),
      (t[4] = h * n - s * r),
      (t[5] = u * n - a * r),
      (t[6] = c * n - o * r),
      (t[7] = d * n - l * r),
      t
    );
  }
  function pi(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = r + r,
      l = n + n,
      h = s + s,
      u = r * o,
      c = r * l,
      d = r * h,
      f = n * l,
      g = n * h,
      p = s * h,
      m = a * o,
      b = a * l,
      y = a * h;
    return (
      (t[0] = 1 - (f + p)),
      (t[1] = c + y),
      (t[2] = d - b),
      (t[3] = 0),
      (t[4] = c - y),
      (t[5] = 1 - (u + p)),
      (t[6] = g + m),
      (t[7] = 0),
      (t[8] = d + b),
      (t[9] = g - m),
      (t[10] = 1 - (u + f)),
      (t[11] = 0),
      (t[12] = i[0]),
      (t[13] = i[1]),
      (t[14] = i[2]),
      (t[15] = 1),
      t
    );
  }
  function mi(t, e) {
    return ((t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]), t);
  }
  function bi(t, e) {
    var i = e[0],
      r = e[1],
      n = e[2],
      s = e[4],
      a = e[5],
      o = e[6],
      l = e[8],
      h = e[9],
      u = e[10];
    return (
      (t[0] = Math.hypot(i, r, n)),
      (t[1] = Math.hypot(s, a, o)),
      (t[2] = Math.hypot(l, h, u)),
      t
    );
  }
  var yi = function (t, e, i, r, n) {
    var s,
      a = 1 / Math.tan(e / 2);
    return (
      (t[0] = a / i),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = a),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[11] = -1),
      (t[12] = 0),
      (t[13] = 0),
      (t[15] = 0),
      null != n && n !== 1 / 0
        ? ((s = 1 / (r - n)), (t[10] = (n + r) * s), (t[14] = 2 * n * r * s))
        : ((t[10] = -1), (t[14] = -2 * r)),
      t
    );
  };
  var Fi = ui;
  const Si = { 2: "Wowhead", 3: "LolKing", 6: "HeroKing", 7: "DestinyDB" };
  class vi {
    constructor(t) {
      if (!t.type || !Si[t.type]) throw "Viewer error: Bad viewer type given";
      if (!t.container) throw "Viewer error: Bad container given";
      if (!t.aspect) throw "Viewer error: Bad aspect ratio given";
      if (!t.contentPath) throw "Viewer error: No content path given";
      (console.log("Creating viewer with options", t),
        (this.type = t.type),
        (this.container = t.container),
        (this.aspect = parseFloat(t.aspect)),
        (this.renderer = null),
        (this.options = t));
      const e = this.container.width(),
        i = Math.round(e / this.aspect);
      this.init(e, i);
    }
    destroy() {
      (this.renderer && this.renderer.destroy(), (this.options = null), (this.container = null));
    }
    init(t, e) {
      if (void 0 !== typeof window.Uint8Array && void 0 !== typeof window.DataView)
        try {
          const t = document.createElement("canvas");
          if (
            !(
              t.getContext("webgl", { alpha: !1 }) ||
              t.getContext("experimental-webgl", { alpha: !1 })
            )
          )
            return void console.log("viewer init failed");
        } catch (t) {
          return void console.log("viewer init failed");
        }
      ((this.mode = 1),
        (this.renderer = new Ma(this)),
        this.renderer.resize(t, e),
        this.renderer.init());
    }
    setAdaptiveMode(t) {
      this.renderer.setAdaptiveMode(t);
    }
    setZoom(t) {
      this.renderer.zoom.target = t;
    }
    setOffset(t, e) {
      this.renderer.setTranslation(t, e, 0);
    }
    setFullscreen(t) {
      t ? vi.requestFullscreen(this.renderer.canvas[0]) : vi.exitFullscreen();
    }
    method(t, e) {
      return (
        void 0 === e && (e = []),
        this.renderer ? this.renderer.method(t, [].concat(e)) : null
      );
    }
    option(t, e) {
      return (void 0 !== e && (this.options[t] = e), this.options[t]);
    }
    static isFullscreen() {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    }
    static requestFullscreen(t) {
      document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        (t.requestFullscreen
          ? t.requestFullscreen()
          : t.webkitRequestFullscreen
            ? t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            : t.mozRequestFullScreen
              ? t.mozRequestFullScreen()
              : t.msRequestFullscreen && t.msRequestFullscreen());
    }
    static exitFullscreen() {
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) &&
        (document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullscreen
            ? document.webkitExitFullscreen()
            : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.msExitFullscreen && document.msExitFullscreen());
    }
  }
  const Ti = vi;
  const Ci = class {
    constructor(t, e, i) {
      ((this.f = t),
        (this.g = e),
        (this.ba = i),
        (this.dc = !1),
        (this.e = t.createBuffer()),
        (this.g = 0));
    }
    b(t) {
      const e = this.f;
      (e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.e),
        !this.dc || this.g < t.byteLength
          ? (e.bufferData(e.ELEMENT_ARRAY_BUFFER, t, this.ba ? e.DYNAMIC_DRAW : e.STATIC_DRAW),
            (this.g = t.byteLength),
            (this.dc = !0))
          : e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, t),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null));
    }
    a() {
      return this.g;
    }
    c() {
      const t = this.f;
      t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.e);
    }
    d() {
      const t = this.f;
      t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
    }
  };
  const xi = class {
    constructor(t, e, i) {
      ((this.ba = t),
        (this.f = e),
        (this.dc = i),
        (this.g = !1),
        (this.e = t.createBuffer()),
        (this.f = 0));
    }
    c() {
      const t = this.ba;
      t.bindBuffer(t.ARRAY_BUFFER, this.e);
    }
    d() {
      const t = this.ba;
      t.bindBuffer(t.ARRAY_BUFFER, null);
    }
    b(t) {
      const e = this.ba;
      (e.bindBuffer(e.ARRAY_BUFFER, this.e),
        !this.g || this.f < t.byteLength
          ? (e.bufferData(e.ARRAY_BUFFER, t, this.dc ? e.DYNAMIC_DRAW : e.STATIC_DRAW),
            (this.g = !0),
            (this.f = t.byteLength))
          : e.bufferSubData(e.ARRAY_BUFFER, 0, t),
        e.bindBuffer(e.ARRAY_BUFFER, null));
    }
    a() {
      return this.f;
    }
  };
  var Ai;
  !(function (t) {
    ((t[(t.GFLOAT = 0)] = "GFLOAT"), (t[(t.GUNSIGNED_BYTE = 1)] = "GUNSIGNED_BYTE"));
  })(Ai || (Ai = {}));
  class _i {
    constructor(t, e, i, r, n, s) {
      ((this.f = t), (this.a = e), (this.d = i), (this.c = r), (this.b = n), (this.e = s));
    }
  }
  function wi(t, e) {
    switch (e) {
      case Ai.GFLOAT:
        return t.FLOAT;
      case Ai.GUNSIGNED_BYTE:
        return t.UNSIGNED_BYTE;
    }
  }
  const Ei = class {
    constructor(t, e) {
      ((this.dc = t),
        (this.f = e),
        (this.ba = null),
        (this.e = []),
        (this.ba = e.createVertexArrayOES()));
    }
    c(t) {
      this.dc;
      (this.b(), t.c(), this.a(), this.e.push(t));
    }
    d(t, e) {
      const i = this.dc;
      (this.b(), t.c());
      for (const t of e)
        (i.enableVertexAttribArray(t.f),
          i.vertexAttribPointer(t.f, t.a, wi(i, t.d), t.c, t.b, t.e));
      (this.a(), this.e.push(t));
    }
    b() {
      this.f.bindVertexArrayOES(this.ba);
    }
    a() {
      this.f.bindVertexArrayOES(null);
    }
  };
  const Di = class {
    constructor(t, e) {
      ((this.e = t), (this.f = e), (this.dc = []));
    }
    c(t) {
      this.ba = t;
    }
    d(t, e) {
      this.dc.push({ buffer: t, bindings: e });
    }
    b() {
      const t = this.e;
      this.ba.c();
      const e = this.f.b();
      for (const e of this.dc) {
        e.a.c();
        for (const i of e.b)
          (this.f.a(i.f), t.vertexAttribPointer(i.f, i.a, wi(t, i.d), i.c, i.b, i.e));
      }
      this.f.d(e);
    }
    a() {}
  };
  class Mi {}
  class ki {
    constructor(t, e, i, r = 0) {
      ((this.d = t), (this.c = e), (this.a = i), (this.b = r));
    }
  }
  class Bi {
    constructor(t, e) {
      ((this.b = t), (this.a = e));
    }
  }
  class Ri {
    constructor(t, e) {
      ((this.b = t), (this.a = e));
    }
  }
  class Pi extends Mi {}
  const Ii = class extends Pi {
    constructor(t, e, i, r) {
      (super(), (this.e = t), (this.d = e), (this.cba = i), (this.ba = r));
    }
    b() {
      return this.cba.e;
    }
    a(t) {
      const e = this.cba;
      (t.d(this.d),
        t.j(e.e),
        t.g(e.c),
        t.b(e.f),
        t.c(e.a),
        t.a(e.d),
        t.i(e.b),
        pe(this.d.c(), this.ba));
    }
  };
  const Li = class {
    constructor(t, e, i, r) {
      if (((this.d = t), (this.ba = Fe(t, [i, r], Object.keys(e), null)), !this.ba))
        throw "Failed to create program";
    }
    a() {
      this.d.useProgram(this.ba.program);
    }
    c() {
      return this.ba;
    }
  };
  class Ui {
    static d(t) {
      const e = 32767 & t;
      return e < Oi.length
        ? Oi[e]
        : (noop("Unknown shader effect:", e), ["PS_Combiners_Opaque", "VS_Diffuse_T1"]);
    }
    static h(t, e) {
      let i = "";
      if (-1e3 == t && 3 == e) return "Skin";
      if (32768 & t) return Ui.d(t)[0];
      if (1 == e) i = 112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque";
      else {
        i =
          (112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque") +
          "_" +
          (112 & t
            ? ["Opaque", "Mod", "Mod", "Add", "Mod2x", "Mod", "Mod2xNA", "AddNA"]
            : ["Opaque", "Mod", "Mod", "AddAlpha", "Mod2x", "Mod", "Mod2xNA", "AddAlpha"])[7 & t];
      }
      return i;
    }
    static b(t, e) {
      let i = "";
      if (-1e3 == t && 3 == e) i = "T1_T1_T1";
      else {
        if (32768 & t) return Ui.d(t)[1];
        i =
          1 == e
            ? 128 & t
              ? "Env"
              : 16384 & t
                ? "T2"
                : "T1"
            : 128 & t
              ? 8 & t
                ? "Env_Env"
                : "Env_T1"
              : 8 & t
                ? "T1_Env"
                : 16384 & t
                  ? "T1_T2"
                  : "T1_T1";
      }
      return "VS_Diffuse_" + i;
    }
    static f(t, e, i) {
      const r = Ui.h(t, e),
        n = Ui.b(t, e),
        s = "Wow." + n + "_" + r;
      if (ke._GetProgram(s)) return { name: s };
      const a = {
        shaders: [Ui.g(n, i), Ui.a(n, r)],
        attributes: {
          position: "aPosition",
          normal: "aNormal",
          texcoord0: "aTexCoord0",
          texcoord1: "aTexCoord1",
        },
      };
      return (ke.RegisterProgram(s, a), { name: s });
    }
    static e(t) {
      const e = {},
        i = {
          texcoord1: function (t, e) {
            t.INPUT_TEXCOORD1 = "aTexCoord" + e;
          },
        };
      for (let r in t.options) {
        const n = t.options[r];
        i[r](e, n);
      }
      return { name: "Wow." + t.name, config: e };
    }
    static c(t) {
      var e = "";
      if (
        ((e += "lTexCoord1 = (uTextureMatrix1 * vec4(vTexCoord1, 0, 1)).st;\n"),
        (e += "lTexCoord2 = (uTextureMatrix2 * vec4(vTexCoord2, 0, 1)).st;\n"),
        "VS" === t.slice(0, 2))
      ) {
        let i = (t = t.slice(3)).split("_"),
          r = i[0];
        if ("Diffuse" === r || "Color" === r) {
          ((e = ""), i.splice(0, 1));
          let r = {
              T1: ["uTextureMatrix1", "vTexCoord1"],
              T2: ["uTextureMatrix2", "vTexCoord2"],
              T3: ["", "aTexCoord2"],
              Env: ["", "texEnv"],
            },
            n = 1;
          for (let s in i)
            r[i[s]]
              ? (r[i[s]][0] && "texEnv" != r[i[s]][1]
                  ? (e +=
                      "lTexCoord" +
                      n +
                      " = (" +
                      r[i[s]][0] +
                      " * vec4(" +
                      r[i[s]][1] +
                      ", 0, 1)).st;\n")
                  : "texEnv" == r[i[s]][1]
                    ? (e += "lTexCoord" + n + " = texEnv;\n")
                    : (e +=
                        "lTexCoord" +
                        n +
                        " = (uTextureMatrix" +
                        n +
                        " * vec4(" +
                        r[i[s]][1] +
                        ", 0, 1)).st;\n"),
                n++)
              : noop("Missing vertex shader def?", t);
        }
      }
      return e;
    }
    static g(t, e) {
      var i;
      return (
        "attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord0;\nattribute vec2 aTexCoord1;\nattribute vec3 aColor;\n" +
        ((i = { SKINNING: e }).SKINNING
          ? "attribute vec4 aBoneWeights;\nattribute vec4 aBones;\n"
          : "") +
        "varying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vTexCoord1;\nvarying vec2 vTexCoord2;\nuniform mat4 uModelMatrix;\nuniform mat4 uPanningMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uInvTranspViewModelMat;\nuniform mat4 uProjMatrix;\nuniform vec3 uCameraPos;\n" +
        (i.SKINNING
          ? "uniform sampler2D uBoneMatricesTex;\n#define ROW0_U ((0.5 + 0.0) / 4.)\n#define ROW1_U ((0.5 + 1.0) / 4.)\n#define ROW2_U ((0.5 + 2.0) / 4.)\n#define ROW3_U ((0.5 + 3.0) / 4.)\nconst float numBones = 256.0;\nmat4 getBoneMatrix(float boneNdx) {\nfloat v = (boneNdx + 0.5) / numBones;\nreturn mat4(\ntexture2D(uBoneMatricesTex, vec2(ROW0_U, v)),\ntexture2D(uBoneMatricesTex, vec2(ROW1_U, v)),\ntexture2D(uBoneMatricesTex, vec2(ROW2_U, v)),\ntexture2D(uBoneMatricesTex, vec2(ROW3_U, v))\n);\n}\nhighp mat4 transpose(in highp mat4 inMatrix) {\nhighp vec4 i0 = inMatrix[0];\nhighp vec4 i1 = inMatrix[1];\nhighp vec4 i2 = inMatrix[2];\nhighp vec4 i3 = inMatrix[3];\nhighp mat4 outMatrix = mat4(\nvec4(i0.x, i1.x, i2.x, i3.x),\nvec4(i0.y, i1.y, i2.y, i3.y),\nvec4(i0.z, i1.z, i2.z, i3.z),\nvec4(i0.w, i1.w, i2.w, i3.w)\n);\nreturn outMatrix;\n}\nmat4 inverse(mat4 m) {\nfloat\na00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\na10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\na20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\na30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\nb00 = a00 * a11 - a01 * a10,\nb01 = a00 * a12 - a02 * a10,\nb02 = a00 * a13 - a03 * a10,\nb03 = a01 * a12 - a02 * a11,\nb04 = a01 * a13 - a03 * a11,\nb05 = a02 * a13 - a03 * a12,\nb06 = a20 * a31 - a21 * a30,\nb07 = a20 * a32 - a22 * a30,\nb08 = a20 * a33 - a23 * a30,\nb09 = a21 * a32 - a22 * a31,\nb10 = a21 * a33 - a23 * a31,\nb11 = a22 * a33 - a23 * a32,\ndet = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\nreturn mat4(\na11 * b11 - a12 * b10 + a13 * b09,\na02 * b10 - a01 * b11 - a03 * b09,\na31 * b05 - a32 * b04 + a33 * b03,\na22 * b04 - a21 * b05 - a23 * b03,\na12 * b08 - a10 * b11 - a13 * b07,\na00 * b11 - a02 * b08 + a03 * b07,\na32 * b02 - a30 * b05 - a33 * b01,\na20 * b05 - a22 * b02 + a23 * b01,\na10 * b10 - a11 * b08 + a13 * b06,\na01 * b08 - a00 * b10 - a03 * b06,\na30 * b04 - a31 * b02 + a33 * b00,\na21 * b02 - a20 * b04 - a23 * b00,\na11 * b07 - a10 * b09 - a12 * b06,\na00 * b09 - a01 * b07 + a02 * b06,\na31 * b01 - a30 * b03 - a32 * b00,\na20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n"
          : "") +
        "void main(void) {\nmat4 boneTransformMat =  mat4(1.0);\n" +
        (i.SKINNING
          ? "if (length(aBoneWeights) > 0.0) {\nboneTransformMat =  mat4(0.0);\nfor (int i = 0; i < 4; i++) {\nboneTransformMat += getBoneMatrix(aBones[i]) * aBoneWeights[i];\n}\n}\nmat4 viewModelMat = uViewMatrix * uModelMatrix * boneTransformMat;\nmat4 invTranspViewModelMat = transpose(inverse(viewModelMat));\n"
          : "mat4 viewModelMat = uViewMatrix * uModelMatrix;\nmat4 invTranspViewModelMat = uInvTranspViewModelMat;\n") +
        "vec4 pos = viewModelMat * vec4(aPosition, 1);\nvPosition = pos.rgb;\ngl_Position = uProjMatrix * pos;\nvTexCoord1 = aTexCoord0;\nvTexCoord2 = aTexCoord1;\nvNormal = normalize((invTranspViewModelMat * vec4(aNormal, 0.0)).xyz);\n}\n"
      );
    }
    static a(t, e, i = 0) {
      let r = Hi[e];
      r || (noop("Missing pixel shader def", e), (r = Hi[(e = "PS_Combiners_Opaque_Mod")]));
      let n = "\t\t" + r.slice(1, r.length).join("\n\t\t");
      for (let t = 0; t < r[0]; t++) {
        let e = t + 1;
        n = "vec4 tex" + t + " = texture2D(uTexture" + e + ", lTexCoord" + e + ".st);\n" + n;
      }
      let s = this.c(t);
      var a;
      return (
        "precision mediump float;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vTexCoord1;\nvarying vec2 vTexCoord2;\nvarying vec2 vTexCoord3;\nvarying vec2 vTexCoord4;\nuniform bool uHasAlpha;\nuniform bool uHasSpecEmiss;\nuniform bool uHasEmissiveGlowing;\nuniform int uBlendMode;\nuniform bool uUnlit;\nuniform vec4 uColor;\nuniform vec4 uAmbientColor;\nuniform vec4 uDiffuseColor;\nuniform vec4 uPrimaryColor;\nuniform vec4 uSecondaryColor;\nuniform vec3 uLightDir1;\nuniform vec3 uLightDir2;\nuniform vec3 uLightDir3;\nuniform mat4 uTextureMatrix1;\nuniform mat4 uTextureMatrix2;\nuniform mat4 uTextureMatrix3;\nuniform mat4 uTextureMatrix4;\nuniform sampler2D uTexture1;\nuniform sampler2D uTexture2;\nuniform sampler2D uTexture3;\nuniform sampler2D uTexture4;\nuniform sampler2D uAlpha;\nuniform vec4 uTexSampleAlpha;\n" +
        ((a = { EXCERPT_TEX_COORD: s, EXCERPT_BASE: n, GRADIENT: !!(1 & i), SHADOWY: !!(2 & i) })
          .SHADOWY
          ? "uniform vec4 u_shadowInnerColor;\nuniform vec4 u_shadowOuterColor;\n"
          : "") +
        (a.GRADIENT
          ? "uniform vec4 u_gradGradientColors_0;\nuniform vec4 u_gradGradientColors_1;\nuniform vec4 u_gradGradientColors_2;\nuniform vec4 u_gradEdgeColor;\nuniform vec4 u_gradBoundingBox;\nuniform vec4 u_gradUpVec;\nuniform vec4 u_gradFlags;\nuniform vec4 u_mulLum_OpaqMat;\n"
          : "") +
        "vec2 sphereMap(vec3 vertex, vec3 normal) {\nvec3 normPos = (normalize(vertex.xyz));\nvec3 reflection = reflect(normPos, normalize(normal));\nreflection = vec3(reflection.x, reflection.y, reflection.z + 1.0);\nvec2 texCoord = ((normalize(reflection).xy * 0.5) + vec2(0.5));\nreturn texCoord;\n}\nvoid main(void) {\nvec2 lTexCoord1 = vec2(0.0);\nvec2 lTexCoord2 = vec2(0.0);\nvec2 lTexCoord3 = vec2(0.0);\nvec4 _output = vec4(1.0);\nvec4 _input = uColor;\nvec3 _specular = vec3(0.0);\nvec2 texEnv = sphereMap(vPosition.xyz,normalize(vNormal.xyz));\n" +
        (a.EXCERPT_TEX_COORD ? a.EXCERPT_TEX_COORD : "") +
        (a.EXCERPT_BASE ? a.EXCERPT_BASE : "") +
        "_output.a = _output.a * uDiffuseColor.a;\nif (uBlendMode == 13) {\n_output.a = _output.a * _input.a;\n} else if (uBlendMode == 1) {\nif (_output.a < (128.0/255.0))\ndiscard;\n_output.a = _input.a;\n} else if (uBlendMode == 0) {\n_output.a = _input.a;\n} else {\n_output.a = _output.a * _input.a;\n}\nif (!uUnlit) {\nvec4 litColor = uAmbientColor;\nvec3 normal = normalize(vNormal);\nfloat dp = max(0.0, dot(normal, uLightDir1));\nlitColor += uPrimaryColor * dp;\ndp = max(0.0, dot(normal, uLightDir2));\nlitColor += uSecondaryColor * dp;\ndp = max(0.0, dot(normal, uLightDir3));\nlitColor += uSecondaryColor * dp;\nlitColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));\n_output.rgb *= (litColor * uDiffuseColor).rgb;\n}\n_output += vec4(_specular, 0.0);\n" +
        (a.GRADIENT
          ? "float power = u_gradEdgeColor.w;\nfloat midValue = u_gradGradientColors_2.w;\nfloat opaqueMaterial = u_mulLum_OpaqMat.y;\nfloat lum = clamp(dot(_output.xyz, vec3(0.212599993, 0.715200007, 0.0722000003)), 0.0, 1.0);\nfloat val0 = 0.0;\nfloat val1 = midValue;\nif (lum > midValue) {\nval0 = midValue;\nval1 = 1.0;\n}\nfloat lerpValue = clamp(((lum - val0) / (val1 - val0)), 0.0, 1.0);\nvec3 gradColor0 = u_gradGradientColors_0.xyz;\nvec3 gradColor1 = u_gradGradientColors_1.xyz;\nif (lum > midValue) {\ngradColor0 = u_gradGradientColors_1.xyz;\ngradColor1 = u_gradGradientColors_2.xyz;\n}\nvec3 gradientColor = mix(gradColor0, gradColor1, vec3(lerpValue));\nbool flipNormal = ((u_gradGradientColors_0.w > 0.0) && (vNormal.z > 0.0));\nvec3 normal = flipNormal ? -vNormal.xyz : vNormal.xyz;\nvec2 term = vec2(dot(-(vPosition.xyz), normal), dot(normalize(-(vPosition.xyz)), (normal * vec3(0.05, 0.05, 1.0))));\nvec2 invTerm = (vec2(1.0) - clamp(term, 0.0, 1.0));\nvec2 f = (invTerm * invTerm);\nfloat fresnel_rim = pow((f.x + f.y), power);\nbool disableHeightFade = bool(u_gradFlags.x);\nfloat visMod = 0.0;\nvec4 res = _output;\nvec3 distVecTest = vec3(0,0,0);\nif (!(disableHeightFade))\n{\nvec3 distVec = (vPosition - u_gradBoundingBox.xyz);\nfloat _dot = dot(distVec, u_gradUpVec.xyz);\nfloat relHeight = (_dot * u_gradBoundingBox.w);\nbool invertHeightFade = bool(u_gradFlags.w);\ndistVecTest = vec3(relHeight);\nrelHeight = invertHeightFade ? clamp((1.0 - relHeight), 0.0, 1.0) : relHeight;\nfloat visMod = clamp((relHeight * 1.66666663), 0.0, 0.899999976);\nvisMod = (visMod * visMod);\nres = vec4(_output.r, _output.g, _output.b, (_output.w * visMod));\n}\nvec3 lerp = mix(gradientColor, u_gradEdgeColor.xyz, vec3(fresnel_rim));\nfloat multiplyLum = u_mulLum_OpaqMat.x;\nif (bool(multiplyLum))\n{\nres = vec4(lerp.xyz, (res.w * lum));\n}\nelse\n{\nres = vec4(lerp.xyz, res.w);\n}\n_output = mix(_output, res, vec4(u_gradFlags.y));\n_output = vec4(_output.xyz, res.a * _output.a);\n"
          : "") +
        (a.SHADOWY
          ? "float sh_intensity = dot(_output.rgb, vec3(0.3, 0.59, 0.11));\nvec3 sh_inner = mix(_output.rgb, sh_intensity * mix(_output.rgb, u_shadowInnerColor.rgb, u_shadowInnerColor.w), 0.89);\nvec3 sh_normal = normalize(vNormal.xyz);\nvec2 sh_term = vec2(dot(-(vPosition.xyz), sh_normal), dot(normalize(-(vPosition.xyz)), sh_normal * vec3(0.05, 0.05, 1.0)));\nvec2 sh_invTerm = vec2(1.0) - clamp(sh_term, 0.0, 1.0);\nvec2 sh_f = sh_invTerm * sh_invTerm;\nfloat sh_fresnel = sh_f.x + sh_f.y;\nvec3 sh_outer = sh_intensity * 4.0 * sh_fresnel * mix(_output.rgb, u_shadowOuterColor.rgb, u_shadowOuterColor.w);\n_output.rgb = sh_inner + sh_outer;\n_output.a *= _output.a;\n"
          : "") +
        "gl_FragColor = _output;\n}\n"
      );
    }
  }
  const Oi = [
      ["PS_Combiners_Opaque_Mod2xNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      [
        "PS_Combiners_Opaque_Mod2xNA_Alpha_Add",
        "VS_Diffuse_T1_Env_T1",
        "HS_T1_T2_T3",
        "DS_T1_T2_T3",
      ],
      ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_Alpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      [
        "PS_Combiners_Opaque_Mod2xNA_Alpha_3s",
        "VS_Diffuse_T1_Env_T1",
        "HS_T1_T2_T3",
        "DS_T1_T2_T3",
      ],
      ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_Add_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_ModNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_Mod_Add_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
      [
        "PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha",
        "VS_Diffuse_T1_Env_T1",
        "HS_T1_T2_T3",
        "DS_T1_T2_T3",
      ],
      ["PS_Combiners_Mod_Dual_Crossfade", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
      ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_T1", "HS_T1", "DS_T1"],
      [
        "PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha",
        "VS_Diffuse_T1_Env_T2",
        "HS_T1_T2_T3",
        "DS_T1_T2_T3",
      ],
      ["PS_Combiners_Mod_Mod", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_Masked_Dual_Crossfade", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Opaque_Alpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      [
        "PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha",
        "VS_Diffuse_T1_Env_T2",
        "HS_T1_T2_T3",
        "DS_T1_T2_T3",
      ],
      ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_Env", "HS_T1", "DS_T1"],
      ["PS_Guild", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
      ["PS_Guild_NoBorder", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2_T3"],
      ["PS_Guild_Opaque", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
      ["PS_Illum", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Diffuse_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"],
      ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Color_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"],
      ["PS_Combiners_Opaque", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
      ["PS_Combiners_Mod_Mod2x", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod", "VS_Diffuse_EdgeFade_T1", "HS_T1_T2", "DS_T1_T2"],
      ["PS_Combiners_Mod_Mod_Depth", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"],
    ],
    Hi = {
      PS_Combiners_Add: [
        1,
        "_output.rgb = _input.rgb + tex0.rgb;",
        "_output.a = _input.a + tex0.a;",
      ],
      PS_Combiners_Decal: [
        1,
        "_output.rgb = mix(_input.rgb, tex0.rgb, _input.a);",
        "_output.a = _input.a;",
      ],
      PS_Combiners_Fade: [
        1,
        "_output.rgb = mix(tex0.rgb, _input.rgb, _input.a);",
        "_output.a = _input.a;",
      ],
      PS_Combiners_Mod: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = tex0.a;"],
      PS_Combiners_Mod2x: [
        1,
        "_output.rgb = _input.rgb * tex0.rgb * 2.0;",
        "_output.a = tex0.a * 2.0;",
      ],
      PS_Combiners_Opaque: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = 1.0;"],
      PS_Combiners_Add_Add: [
        2,
        "_output.rgb = (_input.rgb + tex0.rgb) + tex1.rgb;",
        "_output.a = (_input.a + tex0.a) + tex1.a;",
      ],
      PS_Combiners_Add_Mod: [
        2,
        "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;",
        "_output.a = (_input.a + tex0.a) * tex1.a;",
      ],
      PS_Combiners_Add_Mod2x: [
        2,
        "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb * 2.0;",
        "_output.a = (_input.a + tex0.a) * tex1.a * 2.0;",
      ],
      PS_Combiners_Add_Opaque: [
        2,
        "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;",
        "_output.a = _input.a + tex0.a;",
      ],
      PS_Combiners_Mod_AddNA: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_output.a = tex0.a;",
        "_specular = tex1.rgb;",
      ],
      PS_Combiners_Mod_Mod: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
        "_output.a = tex0.a * tex1.a;",
      ],
      PS_Combiners_Mod_Mod2x: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
        "_output.a = tex0.a * tex1.a * 2.0;",
      ],
      PS_Combiners_Mod_Add: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_output.a = tex0.a + tex1.a;",
        "_specular = tex1.rgb;",
      ],
      PS_Combiners_Mod_Mod2xNA: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
        "_output.a = tex0.a;",
      ],
      PS_Combiners_Mod_Opaque: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
        "_output.a = tex0.a;",
      ],
      PS_Combiners_Mod2x_Add: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * 2.0 + tex1.rgb;",
        "_output.a = (tex0.a) * 2.0 + tex1.a;",
      ],
      PS_Combiners_Mod2x_Mod2x: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 4.0;",
        "_output.a = (tex0.a) * tex1.a * 4.0;",
      ],
      PS_Combiners_Mod2x_Opaque: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
        "_output.a = tex0.a * 2.0;",
      ],
      PS_Combiners_Opaque_Add: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;",
        "_output.a = _input.a + tex1.a;",
      ],
      PS_Combiners_Opaque_AddAlpha: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_specular = (tex1.rgb * tex1.a);",
      ],
      PS_Combiners_Opaque_AddAlpha_Wgt: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_specular = (tex1.rgb * tex1.a) * uTexSampleAlpha.g;",
      ],
      PS_Combiners_Opaque_AddAlpha_Alpha: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_specular = (tex1.rgb * tex1.a * (1.0 - tex0.a));",
      ],
      PS_Combiners_Opaque_AddNA: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;",
        "_output.a = _input.a;",
      ],
      PS_Combiners_Opaque_Mod: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
        "_output.a = tex1.a;",
      ],
      PS_Combiners_Opaque_Mod2x: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
        "_output.a = tex1.a * 2.0;",
      ],
      PS_Combiners_Opaque_Mod2xNA: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
        "",
      ],
      PS_Combiners_Opaque_Mod2xNA_Alpha: [
        2,
        "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));",
        "",
      ],
      PS_Combiners_Opaque_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", ""],
      PS_Combiners_Opaque_Mod2xNA_Alpha_Add: [
        3,
        "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));",
        "_specular = tex2.rgb * tex2.a * uTexSampleAlpha.b;",
      ],
      PS_Combiners_Mod_Mod_Mod_Const: [
        3,
        "_output.rgb = _input.rgb * (tex0 * tex1 * tex2).rgb;",
        "_output.a = (tex0 * tex1 * tex2).a;",
      ],
      PS_Combiners_Mod_AddAlpha: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_output.a = tex0.a;",
        "_specular = tex1.rgb * tex1.a;",
      ],
      PS_Combiners_Mod_AddAlpha_Wgt: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb);",
        "_output.a = tex0.a;",
        "_specular = tex1.rgb * tex1.a * uTexSampleAlpha.g;",
      ],
      PS_Combiners_Mod_AddAlpha_Alpha: [
        2,
        "_output.rgb = _input.rgb * tex0.rgb;",
        "_output.a = (tex0.a + tex1.a * (0.3 * tex1.r + 0.59 * tex1.g + 0.11 * tex1.b));",
        "_specular = tex1.rgb * tex1.a * (1.0 - tex0.a);",
      ],
      PS_Combiners_Opaque_Mod_Add_Wgt: [
        2,
        "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));",
        "_specular = (tex0.rgb * tex0.a) * uTexSampleAlpha.r;",
      ],
      PS_Guild: [
        3,
        "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));",
        "_output.a = tex0.a;",
      ],
      PS_Guild_Opaque: [
        3,
        "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));",
        "",
      ],
      PS_Guild_NoBorder: [
        2,
        "_output.rgb = _input.rgb * tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a));",
        "_output.a = tex0.a;",
      ],
      PS_Combiners_Opaque_Alpha_Alpha: [
        2,
        "_output.rgb = _input.rgb * mix(mix(tex0.rgb, tex1.rgb, vec3(tex1.a)), tex0.rgb, vec3(tex0.a));",
        "",
      ],
      PS_Combiners_Opaque_Mod2xNA_Alpha_3s: [
        3,
        "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex2.rgb, vec3(tex2.a));",
      ],
      PS_Combiners_Mod_Add_Alpha: [
        2,
        "_output.rgb = _input.rgb * tex0.rgb;",
        "_output.a = (tex0.a + tex1.a);",
        "_specular = tex1.rgb * (1.0 - tex0.a);",
      ],
      PS_Combiners_Opaque_ModNA_Alpha: [
        2,
        "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb, tex0.rgb, vec3(tex0.a));",
        "",
      ],
      PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha: [
        3,
        "float glowOpacity = clamp((tex2.a * vec4(1.0, 1.0, 1.0, 1.0).z), 0.0, 1.0); _output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.000000, tex0.rgb, vec3(tex0.a)) * (1.0 - glowOpacity);",
        "_specular = tex2.rgb * glowOpacity;",
      ],
      PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha: [
        3,
        "_output.rgb = _input.rgb * mix(mix(tex0.rgb * tex1.rgb * 2.000000, tex2.rgb, vec3(tex2.a)), tex0.rgb, vec3(tex0.a));",
        "",
      ],
      PS_Combiners_Mod_Depth: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = tex0.a;"],
      PS_Combiners_Opaque_Alpha: [
        2,
        "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));",
        "",
      ],
      Skin: [
        3,
        "//Fresnel Rim\r\nif (uHasSpecEmiss) {\r\n    vec3 emissiveColor = tex2.rgb;\r\n    vec3 emissiveTerm = tex2.rgb;\r\n    if (uHasEmissiveGlowing) {\r\n        vec3 eyeVec_120 = vPosition.xyz;\r\n        vec3 t121 = -(eyeVec_120);\r\n        vec2 term_126 = vec2(dot(t121, vNormal), dot(normalize(t121), (vNormal * vec3(0.0500000007, 0.0500000007, 1.0))));\r\n        vec2 invTerm_128 = (vec2(1.0) - clamp(term_126, 0.0, 1.0));\r\n        vec2 f_129 = (invTerm_128 * invTerm_128);\r\n        float fresnel_rim_133 = pow((f_129.x + f_129.y), 0.600000024);\r\n        vec3 t136 = (tex2.rgb /*+ ((vec3(0.0500000007, 0.0, 0.400000006) * 1.0) * fresnel_rim_133)*/);\r\n        emissiveColor = vec3(t136.r, tex2.g, t136.b);\r\n\r\n        float t267 = dot(normalize(vNormal),  normalize(-(vPosition.xyz)));\r\n        emissiveTerm = mix(vec3(0.0), 2.0*emissiveColor, vec3(pow(clamp(t267, 0.0, 1.0), (( 128.0 * (tex2.a)) + 9.99999975e-006))));\r\n    }\r\n\r\n    _output.rgb = _input.rgb * tex0.rgb + tex1.rgb + emissiveTerm.rgb;\r\n} else {\r\n    _output.rgb = _input.rgb * tex0.rgb;\r\n}\r\n_output.a = tex0.a; //\r\n",
      ],
      PS_Combiners_Mod_Dual_Crossfade: [
        3,
        "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;",
        "_output.a = mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a;",
      ],
      PS_Combiners_Mod_Masked_Dual_Crossfade: [
        4,
        "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;",
        "_output.a = mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a * texture(uTexture4,texCoord2).a;",
      ],
      PS_Combiners_Mod_Mod_Depth: [
        2,
        "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
        "_output.a = tex0.a * tex1.a;",
      ],
    },
    Wi = Ui;
  const Ni = class {
    constructor(t) {
      ((this.e = t), (this.c = new Set()));
    }
    b() {
      const t = this.c;
      return ((this.c = new Set()), t);
    }
    a(t) {
      this.c.has(t) || (this.e.enableVertexAttribArray(t), this.c.add(t));
    }
    d(t) {
      const e = this.e;
      [...t].filter((t) => !this.c.has(t)).forEach((t) => e.disableVertexAttribArray(t));
    }
  };
  const Gi = class {};
  const ji = class {};
  const zi = class extends ji {};
  function Vi() {
    var t = new Pe(4);
    return (Pe != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0)), t);
  }
  function qi(t, e, i, r) {
    var n = new Pe(4);
    return ((n[0] = t), (n[1] = e), (n[2] = i), (n[3] = r), n);
  }
  function Xi(t, e) {
    return ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t);
  }
  function Ki(t, e, i, r, n) {
    return ((t[0] = e), (t[1] = i), (t[2] = r), (t[3] = n), t);
  }
  function Yi(t, e, i) {
    return (
      (t[0] = e[0] + i[0]),
      (t[1] = e[1] + i[1]),
      (t[2] = e[2] + i[2]),
      (t[3] = e[3] + i[3]),
      t
    );
  }
  function $i(t, e, i) {
    return (
      (t[0] = e[0] - i[0]),
      (t[1] = e[1] - i[1]),
      (t[2] = e[2] - i[2]),
      (t[3] = e[3] - i[3]),
      t
    );
  }
  function Ji(t, e, i) {
    return ((t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), (t[3] = e[3] * i), t);
  }
  function Qi(t) {
    var e = t[0],
      i = t[1],
      r = t[2],
      n = t[3];
    return Math.hypot(e, i, r, n);
  }
  function Zi(t, e) {
    var i = e[0],
      r = e[1],
      n = e[2],
      s = e[3],
      a = i * i + r * r + n * n + s * s;
    return (
      a > 0 && (a = 1 / Math.sqrt(a)),
      (t[0] = i * a),
      (t[1] = r * a),
      (t[2] = n * a),
      (t[3] = s * a),
      t
    );
  }
  function tr(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = e[3];
    return (
      (t[0] = i[0] * r + i[4] * n + i[8] * s + i[12] * a),
      (t[1] = i[1] * r + i[5] * n + i[9] * s + i[13] * a),
      (t[2] = i[2] * r + i[6] * n + i[10] * s + i[14] * a),
      (t[3] = i[3] * r + i[7] * n + i[11] * s + i[15] * a),
      t
    );
  }
  var er = Qi;
  !(function () {
    var t = Vi();
  })();
  const ir = class extends zi {
    constructor(t, e) {
      (super(),
        (this.j = e),
        (this.ed = Ie()),
        (this.f = Ue(0, 0, 0)),
        (this.g = Vi()),
        (this.h = qi(0, 0, 0, 0)),
        (this.cba = new xi(t, (40 * e.length) / 4, !0)),
        this.dc(e));
    }
    ba(t, e) {
      const i = this.i;
      let r = this.j.length;
      for (let n = 0; n < r; ++n) {
        if (!e.has(n)) continue;
        (He(this.f, 0, 0, 0), Ki(this.h, 0, 0, 0, 0));
        const r = this.j[n];
        let s = !1;
        for (let e = 0; e < 4; ++e) {
          const i = r.i[e] / 255;
          if (i > 0) {
            const n = t[r.g[e]];
            (Ze(this.ed, r.a, n.p),
              tr(this.g, r.e, n.x),
              (this.f[0] = this.f[0] + this.ed[0] * i),
              (this.f[1] = this.f[1] + this.ed[1] * i),
              (this.f[2] = this.f[2] + this.ed[2] * i),
              (this.h[0] = this.h[0] + this.g[0] * i),
              (this.h[1] = this.h[1] + this.g[1] * i),
              (this.h[2] = this.h[2] + this.g[2] * i),
              (s = !0));
          }
        }
        if (s) {
          let t = 10 * n;
          ((i[t++] = this.f[0]),
            (i[t++] = this.f[1]),
            (i[t++] = this.f[2]),
            (i[t++] = this.h[0]),
            (i[t++] = this.h[1]),
            (i[t++] = this.h[2]));
        }
      }
      this.cba.b(this.i);
    }
    dc(t) {
      const e = (40 * t.length) / 4;
      this.i = new Float32Array(e);
      const i = this.i,
        r = t;
      let n = 0;
      for (let t = 0; t < r.length; ++t)
        ((i[n++] = r[t].a[0]),
          (i[n++] = r[t].a[1]),
          (i[n++] = r[t].a[2]),
          (i[n++] = r[t].e[0]),
          (i[n++] = r[t].e[1]),
          (i[n++] = r[t].e[2]),
          (i[n++] = r[t].f),
          (i[n++] = r[t].d),
          (i[n++] = r[t].c),
          (i[n++] = r[t].h));
      this.cba.b(this.i);
    }
    b(t) {
      this.cba.b(t);
    }
    a() {
      return this.cba.a();
    }
    c() {
      this.cba.c();
    }
    d() {
      this.cba.d();
    }
  };
  const rr = class extends zi {
    constructor(t, e) {
      (super(), (this.ed = e), (this.f = new xi(t, 48 * e.length, !0)), this.dc(e));
    }
    ba(t, e) {}
    dc(t) {
      const e = 48 * t.length;
      this.cba = new Uint8Array(e);
      let i = new DataView(this.cba.buffer);
      const r = t;
      let n = 0;
      for (let t = 0; t < r.length; ++t)
        (i.setFloat32(n, r[t].a[0], !0),
          (n += 4),
          i.setFloat32(n, r[t].a[1], !0),
          (n += 4),
          i.setFloat32(n, r[t].a[2], !0),
          (n += 4),
          i.setFloat32(n, r[t].e[0], !0),
          (n += 4),
          i.setFloat32(n, r[t].e[1], !0),
          (n += 4),
          i.setFloat32(n, r[t].e[2], !0),
          (n += 4),
          i.setUint8(n, r[t].g[0]),
          (n += 1),
          i.setUint8(n, r[t].g[1]),
          (n += 1),
          i.setUint8(n, r[t].g[2]),
          (n += 1),
          i.setUint8(n, r[t].g[3]),
          (n += 1),
          i.setUint8(n, r[t].i[0]),
          (n += 1),
          i.setUint8(n, r[t].i[1]),
          (n += 1),
          i.setUint8(n, r[t].i[2]),
          (n += 1),
          i.setUint8(n, r[t].i[3]),
          (n += 1),
          i.setFloat32(n, r[t].f, !0),
          (n += 4),
          i.setFloat32(n, r[t].d, !0),
          (n += 4),
          i.setFloat32(n, r[t].c, !0),
          (n += 4),
          i.setFloat32(n, r[t].h, !0),
          (n += 4));
      this.f.b(this.cba);
    }
    b(t) {
      this.f.b(t);
    }
    a() {
      return this.f.a();
    }
    c() {
      this.f.c();
    }
    d() {
      this.f.d();
    }
  };
  const nr = class {
    a() {
      return {};
    }
    b(t) {}
  };
  const sr = class {
    constructor(t, e) {
      ((this.e = t),
        (this.ba = e),
        (this.ba = 256),
        (this.d = new Float32Array(16 * this.ba)),
        (this.c = t.createTexture()),
        t.bindTexture(t.TEXTURE_2D, this.c),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        t.bindTexture(t.TEXTURE_2D, null));
    }
    a() {
      return { uBoneMatricesTex: this.c };
    }
    b(t) {
      const e = Math.min(256, t.length);
      for (let i = 0; i < e; i++) this.d.set(t[i].p, 16 * i);
      const i = this.e;
      (i.bindTexture(i.TEXTURE_2D, this.c),
        i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, 4, this.ba, 0, i.RGBA, i.FLOAT, this.d),
        i.bindTexture(i.TEXTURE_2D, null));
    }
  };
  var ar;
  !(function (t) {
    ((t[(t.aPosition = 0)] = "aPosition"),
      (t[(t.aNormal = 1)] = "aNormal"),
      (t[(t.aTexCoord0 = 2)] = "aTexCoord0"),
      (t[(t.aTexCoord1 = 3)] = "aTexCoord1"));
  })(ar || (ar = {}));
  const or = {
      aPosition: ar.aPosition,
      aNormal: ar.aNormal,
      aTexCoord0: ar.aTexCoord0,
      aTexCoord1: ar.aTexCoord1,
    },
    lr = [
      new _i(ar.aPosition, 3, Ai.GFLOAT, !1, 40, 0),
      new _i(ar.aNormal, 3, Ai.GFLOAT, !1, 40, 12),
      new _i(ar.aTexCoord0, 2, Ai.GFLOAT, !1, 40, 24),
      new _i(ar.aTexCoord1, 2, Ai.GFLOAT, !1, 40, 32),
    ];
  var hr;
  !(function (t) {
    ((t[(t.aPosition = 0)] = "aPosition"),
      (t[(t.aNormal = 1)] = "aNormal"),
      (t[(t.aBones = 2)] = "aBones"),
      (t[(t.aBoneWeights = 3)] = "aBoneWeights"),
      (t[(t.aTexCoord0 = 4)] = "aTexCoord0"),
      (t[(t.aTexCoord1 = 5)] = "aTexCoord1"));
  })(hr || (hr = {}));
  const ur = {
      aPosition: hr.aPosition,
      aNormal: hr.aNormal,
      aBones: hr.aBones,
      aBoneWeights: hr.aBoneWeights,
      aTexCoord0: hr.aTexCoord0,
      aTexCoord1: hr.aTexCoord1,
    },
    cr = [
      new _i(hr.aPosition, 3, Ai.GFLOAT, !1, 48, 0),
      new _i(hr.aNormal, 3, Ai.GFLOAT, !1, 48, 12),
      new _i(hr.aBones, 4, Ai.GUNSIGNED_BYTE, !1, 48, 24),
      new _i(hr.aBoneWeights, 4, Ai.GUNSIGNED_BYTE, !0, 48, 28),
      new _i(hr.aTexCoord0, 2, Ai.GFLOAT, !1, 48, 32),
      new _i(hr.aTexCoord1, 2, Ai.GFLOAT, !1, 48, 40),
    ];
  var dr;
  !(function (t) {
    ((t[(t.aPosition = 0)] = "aPosition"),
      (t[(t.aColor = 1)] = "aColor"),
      (t[(t.aTexcoord0 = 2)] = "aTexcoord0"),
      (t[(t.aTexcoord1 = 3)] = "aTexcoord1"),
      (t[(t.aTexcoord2 = 4)] = "aTexcoord2"),
      (t[(t.aAlphaCutoff = 5)] = "aAlphaCutoff"));
  })(dr || (dr = {}));
  const fr = {
      [dr.aPosition]: dr.aPosition,
      [dr.aColor]: dr.aColor,
      [dr.aTexcoord0]: dr.aTexcoord0,
      [dr.aTexcoord1]: dr.aTexcoord1,
      [dr.aTexcoord2]: dr.aTexcoord2,
      [dr.aAlphaCutoff]: dr.aAlphaCutoff,
    },
    gr = [
      new _i(dr.aPosition, 3, Ai.GFLOAT, !1, 56, 0),
      new _i(dr.aColor, 4, Ai.GFLOAT, !1, 56, 12),
      new _i(dr.aTexcoord0, 2, Ai.GFLOAT, !1, 56, 28),
      new _i(dr.aTexcoord1, 2, Ai.GFLOAT, !1, 56, 36),
      new _i(dr.aTexcoord2, 2, Ai.GFLOAT, !1, 56, 44),
      new _i(dr.aAlphaCutoff, 1, Ai.GFLOAT, !1, 56, 52),
    ];
  var pr;
  !(function (t) {
    ((t[(t.aPosition = 0)] = "aPosition"),
      (t[(t.aColor = 1)] = "aColor"),
      (t[(t.aTexcoord0 = 2)] = "aTexcoord0"));
  })(pr || (pr = {}));
  const mr = {
      [pr.aPosition]: pr.aPosition,
      [pr.aColor]: pr.aColor,
      [pr.aTexcoord0]: pr.aTexcoord0,
    },
    br = [
      new _i(pr.aPosition, 3, Ai.GFLOAT, !1, 36, 0),
      new _i(pr.aColor, 4, Ai.GFLOAT, !1, 36, 12),
      new _i(pr.aTexcoord0, 2, Ai.GFLOAT, !1, 36, 28),
    ];
  const yr = class {
    constructor(t, e) {
      ((this.hg = t), (this.ji = e), (this.dc = new Map()), (this.ba = new Ni(t.k())));
      const i = t.k();
      ((this.lk = i.createTexture()),
        i.bindTexture(i.TEXTURE_2D, this.lk),
        i.texImage2D(
          i.TEXTURE_2D,
          0,
          i.RGBA,
          1,
          1,
          0,
          i.RGBA,
          i.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 0, 0]),
        ),
        i.bindTexture(i.TEXTURE_2D, null));
    }
    fe() {
      throw new Error("Method not implemented.");
    }
    b() {
      return this.hg;
    }
    f(t) {
      return new Ci(this.hg.k(), t, !1);
    }
    g(t) {
      return this.hg.g ? new rr(this.hg.k(), t) : new ir(this.hg.k(), t);
    }
    l(t) {
      return new xi(this.hg.k(), t, !0);
    }
    o(t) {
      return new xi(this.hg.k(), t, !0);
    }
    c(t, e) {
      const i = this.hg.fe(),
        r = i ? new Ei(this.hg.k(), i) : new Di(this.hg.k(), this.ba),
        n = this.hg.g ? cr : lr;
      return (r.d(t, n), r.c(e), r);
    }
    j(t, e) {
      const i = this.hg.fe(),
        r = i ? new Ei(this.hg.k(), i) : new Di(this.hg.k(), this.ba);
      return (r.c(e), r.d(t, gr), r);
    }
    k(t, e) {
      const i = this.hg.fe(),
        r = i ? new Ei(this.hg.k(), i) : new Di(this.hg.k(), this.ba);
      return (r.c(e), r.d(t, br), r);
    }
    i(t, e, i, r) {
      return this.hg.g ? new sr(this.hg.k(), t) : new nr();
    }
    n(t, e, i) {
      const r = Wi.h(i.d, i.c.length),
        n = Wi.b(i.d, i.c.length),
        s = "Wow." + n + "_" + r,
        a = i.b,
        o = s + (a ? "_fx" + a : "");
      let l;
      this.dc.has(o)
        ? (l = this.dc.get(o))
        : ((l = new Li(this.hg.k(), this.hg.g ? ur : or, Wi.g(n, this.hg.g), Wi.a(n, r, a))),
          this.dc.set(o, l));
      const h = Object.assign(Object.assign(Object.assign({}, this.ji), t.a()), i.a);
      for (let t = 0; t < Math.max(i.c.length, 4); t++) {
        let e = t < i.c.length ? i.c[t].d : this.lk;
        h["uTexture" + (t + 1).toString()] = e;
      }
      return new Ii(this.hg.k(), l, e, h);
    }
    e(t, e, i) {
      const r = Object.assign(Object.assign(Object.assign({}, this.ji), t.a()), i.a);
      let n;
      const s = "ParticleShader";
      this.dc.has(s)
        ? (n = this.dc.get(s))
        : ((n = new Li(
            this.hg.k(),
            fr,
            "attribute vec3 aPosition;\r\nattribute vec4 aColor;\r\nattribute vec2 aTexcoord0;\r\nattribute vec2 aTexcoord1;\r\nattribute vec2 aTexcoord2;\r\nattribute float aAlphaCutoff;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\nvarying vec2 vTexcoord1;\r\nvarying vec2 vTexcoord2;\r\nvarying float vAlphaCutoff;\r\n\r\nuniform mat4 uModelMatrix;\r\nuniform mat4 uViewMatrix;\r\nuniform mat4 uProjMatrix;\r\n\r\nvoid main(void) {\r\n    vec4 pos = vec4(aPosition, 1);\r\n\r\n    gl_Position = uProjMatrix * pos;\r\n\r\n    vColor = aColor;\r\n    vTexcoord0 = aTexcoord0;\r\n    vTexcoord1 = aTexcoord1;\r\n    vTexcoord2 = aTexcoord2;\r\n    vAlphaCutoff = aAlphaCutoff;\r\n}",
            "precision mediump float;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\nvarying vec2 vTexcoord1;\r\nvarying vec2 vTexcoord2;\r\nvarying float vAlphaCutoff;\r\n\r\nuniform bool uHasTexture;\r\nuniform bool uHasTexture2;\r\nuniform bool uHasTexture3;\r\nuniform bool uHasAlpha;\r\nuniform int uBlendMode;\r\nuniform int uPixelShader;\r\nuniform sampler2D uTexture0;\r\nuniform sampler2D uTexture1;\r\nuniform sampler2D uTexture2;\r\nuniform float uAlphaTreshold;\r\n\r\nuniform float alphaMult;\r\nuniform float colorMult;\r\n\r\nvoid main(void) {\r\n    float lo_thresh = 0.01;\r\n    vec4 color = vec4(1, 1, 1, 1);\r\n    vec4 tex = vec4(1, 1, 1, 1);\r\n    vec4 tex2 = vec4(1, 1, 1, 1);\r\n    vec4 tex3 = vec4(1, 1, 1, 1);\r\n    if (uHasTexture) {\r\n        tex = texture2D(uTexture0, vTexcoord0).rgba;\r\n    }\r\n    if (uHasTexture2) {\r\n        tex2 = texture2D(uTexture1, vTexcoord1).rgba;\r\n    }\r\n    if (uHasTexture3) {\r\n        tex3 = texture2D(uTexture2, vTexcoord2).rgba;\r\n    }\r\n    vec4 finalColor = vec4((tex * vColor ).rgb, tex.a*vColor.a );\r\n    vec3 matDiffuse = vec3(1.0);\r\n    float opacity = 1.0;\r\n    if (uPixelShader == 0) {\r\n        matDiffuse = vColor.xyz * tex.rgb;\r\n        opacity = tex.a*vColor.a;\r\n    } else if (uPixelShader == 1) {\r\n        vec4 textureMod = tex*tex2;\r\n        float texAlpha = (textureMod.w * tex3.w);\r\n        opacity = texAlpha*vColor.a;\r\n        matDiffuse = vColor.xyz * 4.0 * textureMod.rgb;\r\n    } else if (uPixelShader == 2) {\r\n        vec4 textureMod = tex*tex2*tex3;\r\n        float texAlpha = (textureMod.w);\r\n        opacity = texAlpha*vColor.a;\r\n        matDiffuse = vColor.xyz * textureMod.rgb;\r\n    } else if (uPixelShader == 3) {\r\n        vec4 textureMod = tex*tex2*tex3;\r\n        float texAlpha = (textureMod.w);\r\n        opacity = texAlpha*vColor.a;\r\n\r\n        matDiffuse = vColor.xyz * textureMod.rgb;\r\n    } else if (uPixelShader == 4) {\r\n        discard;\r\n    }\r\n\r\n    finalColor = vec4(matDiffuse.rgb * colorMult, opacity * alphaMult);\r\n\r\n    if (finalColor.a < vAlphaCutoff ) discard;\r\n    if (finalColor.a < uAlphaTreshold ) discard;\r\n    gl_FragColor = finalColor;\r\n}\r\n",
          )),
          this.dc.set(s, n));
      for (let t = 0; t < i.b.length; t++) i.b[t] && (r["uTexture" + t.toString()] = i.b[t].d);
      return new Ii(this.hg.k(), n, e, r);
    }
    m(t, e, i) {
      const r = Object.assign(Object.assign(Object.assign({}, this.ji), t.a()), i.a);
      let n;
      const s = "RibbonShader";
      return (
        this.dc.has(s)
          ? (n = this.dc.get(s))
          : ((n = new Li(
              this.hg.k(),
              mr,
              "attribute vec3 aPosition;\r\nattribute vec4 aColor;\r\nattribute vec2 aTexcoord0;\r\n\r\nuniform mat4 uViewMatrix;\r\nuniform mat4 uProjMatrix;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\n\r\nvoid main() {\r\n    vec4 aPositionVec4 = vec4(aPosition, 1);\r\n    vColor = aColor;\r\n    vTexcoord0 = aTexcoord0;\r\n\r\n    gl_Position = uProjMatrix * uViewMatrix * aPositionVec4;\r\n}\r\n\r\n\r\n",
              "precision mediump float;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\nuniform sampler2D uTexture;\r\n\r\nvoid main() {\r\n    vec4 tex = texture2D(uTexture, vTexcoord0).rgba;\r\n    gl_FragColor = vec4((vColor.rgb*tex.rgb), tex.a * vColor.a );\r\n}\r\n",
            )),
            this.dc.set(s, n)),
        (r["uTexture".toString()] = i.b[0].d),
        new Ii(this.hg.k(), n, e, r)
      );
    }
    a(t, e, i, r) {
      const n = this.hg.k();
      let s = new Gi();
      return (
        (s.c = e),
        (s.a = t.a),
        (s.b = n.TRIANGLES),
        (s.d = t.b),
        (s.h = t.c),
        (s.e = r),
        (s.g = i),
        s
      );
    }
    h(t, e, i, r) {
      const n = this.hg.k();
      let s = new Gi();
      return (
        (s.c = e),
        (s.a = t.a),
        (s.b = n.TRIANGLE_STRIP),
        (s.d = t.b),
        (s.h = t.c),
        (s.e = r),
        (s.g = i),
        s
      );
    }
    d(t) {
      const e = this.hg.k(),
        i = e.createTexture();
      function r(t) {
        return !(t & (t - 1));
      }
      (e.bindTexture(e.TEXTURE_2D, i),
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
        e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t),
        r(t.width) && r(t.height)
          ? e.generateMipmap(e.TEXTURE_2D)
          : (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR)));
      const n = this.hg.h;
      return (n && e.texParameteri(e.TEXTURE_2D, n.TEXTURE_MAX_ANISOTROPY_EXT, this.hg.i), i);
    }
  };
  var Fr;
  !(function (t) {
    ((t[(t.GxBlend_UNDEFINED = -1)] = "GxBlend_UNDEFINED"),
      (t[(t.GxBlend_Opaque = 0)] = "GxBlend_Opaque"),
      (t[(t.GxBlend_AlphaKey = 1)] = "GxBlend_AlphaKey"),
      (t[(t.GxBlend_Alpha = 2)] = "GxBlend_Alpha"),
      (t[(t.GxBlend_Add = 3)] = "GxBlend_Add"),
      (t[(t.GxBlend_Mod = 4)] = "GxBlend_Mod"),
      (t[(t.GxBlend_Mod2x = 5)] = "GxBlend_Mod2x"),
      (t[(t.GxBlend_ModAdd = 6)] = "GxBlend_ModAdd"),
      (t[(t.GxBlend_InvSrcAlphaAdd = 7)] = "GxBlend_InvSrcAlphaAdd"),
      (t[(t.GxBlend_InvSrcAlphaOpaque = 8)] = "GxBlend_InvSrcAlphaOpaque"),
      (t[(t.GxBlend_SrcAlphaOpaque = 9)] = "GxBlend_SrcAlphaOpaque"),
      (t[(t.GxBlend_NoAlphaAdd = 10)] = "GxBlend_NoAlphaAdd"),
      (t[(t.GxBlend_ConstantAlpha = 11)] = "GxBlend_ConstantAlpha"),
      (t[(t.GxBlend_Screen = 12)] = "GxBlend_Screen"),
      (t[(t.GxBlend_BlendAdd = 13)] = "GxBlend_BlendAdd"),
      (t[(t.GxBlend_MAX = 14)] = "GxBlend_MAX"));
  })(Fr || (Fr = {}));
  const Sr = Fr;
  const vr = class {
    constructor(t) {
      ((this.hg = t),
        (this.k = -1),
        (this.r = -1),
        (this.s = -1),
        (this.ji = -1),
        (this.n = -1),
        (this.m = Sr.GxBlend_UNDEFINED),
        (this.q = null),
        (this.o = null),
        (this.fe = null),
        (this.p = null),
        (this.dc = null));
    }
    t() {
      ((this.k = -1),
        (this.r = -1),
        (this.s = -1),
        (this.ji = -1),
        (this.n = -1),
        (this.m = Sr.GxBlend_UNDEFINED),
        (this.q = null),
        (this.o = null),
        (this.fe = null),
        (this.p = null),
        (this.dc = null));
    }
    j(t) {
      this.m != t && (this.l(t), (this.m = t));
    }
    b(t) {
      const e = t ? 1 : 0;
      e != this.k && (this.hg.depthMask(t), (this.k = e));
    }
    g(t) {
      const e = t ? 1 : 0;
      e != this.r &&
        (t ? this.hg.enable(this.hg.DEPTH_TEST) : this.hg.disable(this.hg.DEPTH_TEST),
        (this.r = e));
    }
    c(t) {
      const e = t ? 1 : 0;
      e != this.s &&
        (t ? this.hg.enable(this.hg.CULL_FACE) : this.hg.disable(this.hg.CULL_FACE), (this.s = e));
    }
    i(t) {
      const e = t ? 1 : 0;
      e != this.ji &&
        (t ? this.hg.frontFace(this.hg.CCW) : this.hg.frontFace(this.hg.CW), (this.ji = e));
    }
    a(t) {
      this.n != t &&
        (this.hg.colorMask((1 & t) > 0, (2 & t) > 0, (4 & t) > 0, (8 & t) > 0), (this.n = t));
    }
    f(t) {
      this.o != t && (t ? t.c() : t.d(), (this.o = t));
    }
    h(t) {
      this.q != t && (t ? t.c() : t.d(), (this.q = t));
    }
    e(t) {
      this.fe != t && (t ? t.b() : this.fe.a(), (this.fe = t), (this.q = null), (this.o = null));
    }
    d(t) {
      t != this.p && (t && t.a(), (this.p = t));
    }
    l(t) {
      const e = this.hg;
      switch ((0 == t ? e.disable(e.BLEND) : (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD)), t)) {
        case 0:
          break;
        case 1:
          e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ONE);
          break;
        case 2:
          e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE);
          break;
        case 3:
          e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
          break;
        case 4:
          e.blendFuncSeparate(e.DST_COLOR, e.ZERO, e.ONE, e.ONE);
          break;
        case 5:
          e.blendFuncSeparate(e.DST_COLOR, e.SRC_COLOR, e.ONE, e.ONE);
          break;
        case 6:
          e.blendFuncSeparate(e.DST_COLOR, e.ONE, e.ONE, e.ONE);
          break;
        case 10:
          e.blendFunc(e.ONE, e.ONE);
          break;
        case 7:
          e.blendFuncSeparate(e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE, e.ONE);
          break;
        case 8:
          e.blendFuncSeparate(e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE, e.ONE);
          break;
        case 13:
          e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE);
          break;
        default:
          throw 3735927486;
      }
    }
    ba(t) {
      this.dc != t && (t.a(this), (this.dc = t));
    }
  };
  const Tr = class {
    constructor(t, e) {
      ((this.o = t),
        (this.dc = e),
        (this.m = !1),
        (this.g = !1),
        (this.ba = t.getExtension("OES_vertex_array_object")),
        (this.h =
          t.getExtension("EXT_texture_filter_anisotropic") ||
          t.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          t.getExtension("WEBKIT_EXT_texture_filter_anisotropic")),
        this.h
          ? ((this.i = t.getParameter(this.h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),
            noop("Texture anisotropy enabled", this.i))
          : noop("Texture anisotropy disabled (not supported)"),
        (this.m = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0),
        (this.l = t.getExtension("OES_texture_float")),
        (this.g = this.m && null != this.l),
        this.g
          ? noop("(float texture) Skinning in shader is supported")
          : noop("(float texture) Skinning in shader is (not supported) "),
        (this.j = new yr(this, e)),
        (this.n = new vr(t)));
    }
    k() {
      return this.o;
    }
    fe() {
      return this.ba;
    }
    d() {
      return this.j;
    }
    a(t) {
      const e = this.n,
        i = this.k();
      (e.e(t.a), e.ba(t.c), i.drawElements(t.b, t.h, i.UNSIGNED_SHORT, t.d));
    }
    e() {
      this.n.t();
    }
    c() {
      this.n.e(null);
    }
    b(t) {
      (this.e(),
        t.forEach((t) => {
          this.a(t);
        }),
        this.c());
    }
  };
  const Cr = class {
      constructor(t, e) {
        ((this.k = t),
          (this.j = e),
          (this.d = null),
          (this.f = !1),
          (this.l = 0),
          (this.g = 0),
          0 != e &&
            ((this.i = t.options.contentPath + "textures/" + e + WH.WebP.getImageExtension()),
            (this.e = new Image()),
            (this.e.onload = () => {
              this.b();
            }),
            (this.e.onerror = () => {
              this.e = null;
            }),
            this.h(this.e, this.i)));
      }
      h(t, e) {
        var i = new XMLHttpRequest();
        (i.open("GET", e, !0),
          (i.responseType = "arraybuffer"),
          (i.onload = (e) => {
            var r = new Blob([i.response]);
            t.src = window.URL.createObjectURL(r);
          }),
          i.addEventListener("progress", (t) => {
            const i = this.k;
            i &&
              t.lengthComputable &&
              (i.downloads[e]
                ? (i.downloads[e].loaded = t.loaded)
                : (i.downloads[e] = { loaded: t.loaded, total: t.total }),
              i.updateProgress());
          }),
          i.addEventListener("load", () => {
            const t = this.k;
            t && (delete t.downloads[e], t.updateProgress());
          }),
          i.send());
      }
      a() {
        return this.f;
      }
      c() {
        this.d = null;
      }
      b() {
        ((this.l = this.e.width),
          (this.g = this.e.height),
          (this.d = this.k.renderer.d(this.e)),
          (this.f = !0),
          (this.e = null));
      }
    },
    xr = { 147259: !0 },
    Ar = [
      1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0,
      0, 2, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    _r = {
      2: { GeosetType: 15, Original: 2, Override: 11 },
      3: { GeosetType: 15, Original: 3, Override: 12 },
      4: { GeosetType: 15, Original: 4, Override: 13 },
      5: { GeosetType: 15, Original: 5, Override: 14 },
      6: { GeosetType: 15, Original: 6, Override: 15 },
      7: { GeosetType: 15, Original: 7, Override: 16 },
      8: { GeosetType: 15, Original: 8, Override: 17 },
      9: { GeosetType: 15, Original: 9, Override: 18 },
      10: { GeosetType: 15, Original: 10, Override: 19 },
      11: { GeosetType: 12, Original: 2, Override: 0 },
      12: { GeosetType: 12, Original: 3, Override: 0 },
      13: { GeosetType: 12, Original: 1, Override: 5 },
      14: { GeosetType: 12, Original: 2, Override: 3 },
      15: { GeosetType: 12, Original: 2, Override: 2 },
      16: { GeosetType: 22, Original: 2, Override: 1 },
      17: { GeosetType: 22, Original: 1, Override: 2 },
      18: { GeosetType: 22, Original: 1, Override: 3 },
      19: { GeosetType: 22, Original: 2, Override: 3 },
      20: { GeosetType: 12, Original: 1, Override: 1 },
      21: { GeosetType: 12, Original: 1, Override: 9 },
      22: { GeosetType: 12, Original: 2, Override: 10 },
      23: { GeosetType: 12, Original: 2, Override: 6 },
      24: { GeosetType: 12, Original: 1, Override: 5 },
      25: { GeosetType: 27, Original: 0, Override: 1 },
      26: { GeosetType: 27, Original: 0, Override: 1 },
      27: { GeosetType: 27, Original: 0, Override: 1 },
      28: { GeosetType: 13, Original: 1, Override: 0 },
      31: { GeosetType: 12, Original: 1, Override: 13 },
      32: { GeosetType: 12, Original: 2, Override: 14 },
      33: { GeosetType: 42, Original: 11, Override: 1 },
      38: { GeosetType: 20, Original: 1, Override: 9 },
    },
    wr = {
      ITEM: 1,
      HELM: 2,
      SHOULDER: 4,
      NPC: 8,
      CHARACTER: 16,
      HUMANOIDNPC: 32,
      OBJECT: 64,
      ARMOR: 128,
      PATH: 256,
      ITEMVISUAL: 512,
      COLLECTION: 1024,
    },
    Er = [
      0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 22, 16, 21, 0, 19, 5, 21, 22, 22, 0, 21, 21,
      27,
    ],
    Dr = [
      0, 16, 0, 15, 1, 7, 10, 5, 6, 6, 8, 0, 0, 17, 18, 19, 14, 20, 0, 9, 7, 21, 22, 23, 0, 24, 25,
      0,
    ],
    Mr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    kr = [
      0, 2, 0, 4, 128, 128, 128, 128, 128, 128, 128, 0, 0, 1, 1, 1, 128, 1, 0, 128, 128, 1, 1, 1, 0,
      1, 1, 2,
    ],
    Br = [13, 14, 15, 16, 17, 88, 89],
    Rr = [8, 9, 10, 11, 12, 86, 87],
    Pr = {
      86: [4, 0, 4, 1, 4, 0, 4, 1],
      85: [84, 0, 84, 1, 84, 0, 84, 1],
      84: [3, 0, 3, 1, 3, 0, 3, 1],
      77: [5, 1, 0, -1, 5, 0, 0, -1],
      76: [10, 0, 1, 1, 10, 0, 1, 1],
      75: [10, 0, 1, 1, 10, 0, 1, 1],
      74: [5, 1, 0, -1, 5, 0, 0, -1],
      73: [5, 1, 0, -1, 5, 0, 0, -1],
      72: [5, 1, 0, -1, 5, 0, 0, -1],
      71: [5, 1, 0, -1, 5, 0, 0, -1],
      37: [7, 0, 7, 1, 7, 0, 7, 1],
      36: [2, 0, 2, 1, 2, 0, 2, 1],
      34: [3, 0, 3, 1, 3, 0, 3, 1],
      33: [5, 1, 0, -1, 5, 0, 0, -1],
      31: [0, -1, 8, 1, 0, -1, 8, 1],
      30: [11, 0, 11, 1, 11, 0, 11, 1],
      29: [10, 0, 10, 1, 10, 0, 10, 1],
      28: [6, 0, 6, 1, 6, 0, 6, 1],
      27: [4, 0, 4, 1, 4, 0, 4, 1],
      26: [24, 0, 24, 1, 24, 0, 24, 1],
      25: [24, 0, 24, 1, 24, 0, 24, 1],
      23: [1, 0, 1, 1, 1, 0, 1, 1],
      15: [5, 0, 5, 1, 5, 0, 5, 1],
      1: [0, -1, 0, -1, 0, -1, 0, 3],
    },
    Ir = { 21: 26, 22: 27, 15: 28, 17: 26, 25: 32, 13: 32, 23: 33, 14: 28, 26: 26 },
    Lr = {
      0: { 21: 26, 22: 27 },
      1: { 21: 26, 22: 27 },
      2: { 21: 30, 22: 31 },
      3: { 21: 32, 22: 33 },
      4: { 21: 26, 22: 27, 15: 28 },
      5: { 21: 26 },
      6: { 21: 26, 22: 27 },
      7: { 21: 26, 22: 27 },
      8: { 21: 26, 22: 27 },
      9: { 21: 33, 22: 28 },
    },
    Ur = 5300,
    Or =
      "precision mediump float;\r\n\r\nuniform float x;\r\nuniform float y;\r\nuniform float width;\r\nuniform float height;\r\n\r\nattribute vec2 aTextCoord;\r\nvarying vec2 vTextCoords;\r\nvoid main() {\r\n    vTextCoords = aTextCoord;\r\n\r\n    vec2 pos = vec2(\r\n        (x + aTextCoord.x*width)* 2.0 - 1.0,\r\n        (y + aTextCoord.y*height)* 2.0 - 1.0\r\n    );\r\n\r\n    gl_Position = vec4(pos.x, pos.y, 0, 1);\r\n}";
  class Hr {
    constructor() {
      ((this.e = null), (this.d = null), (this.a = null));
    }
    b() {
      (null != this.e && this.e.c(), null != this.d && this.d.c(), null != this.a && this.a.c());
    }
    c() {
      return !(this.e && !this.e.a()) && !(this.d && !this.d.a()) && !(this.a && !this.a.a());
    }
  }
  class Wr {
    constructor() {
      ((this.a = null),
        (this.h = null),
        (this.g = null),
        (this.f = {}),
        (this.e = new Me()),
        (this.j = null),
        (this.b = null));
    }
  }
  const Nr = { uDiffuseTexture: null, uSpecularTexture: null, uEmissiveTexture: null };
  class Gr {
    constructor(t, e, i) {
      ((this.o = e),
        (this.p = i),
        (this.r = null),
        (this.j = null),
        (this.a = null),
        (this.b = null),
        (this.m = null),
        (this.f = !1),
        (this.g = 0),
        (this.e = ""),
        (this.s = t),
        (this.m = (function (t) {
          let e = t.createTexture();
          (t.bindTexture(t.TEXTURE_2D, e),
            t.texImage2D(
              t.TEXTURE_2D,
              0,
              t.RGBA,
              1,
              1,
              0,
              t.RGBA,
              t.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 0]),
            ),
            t.bindTexture(t.TEXTURE_2D, null));
          let i = t.createTexture();
          (t.bindTexture(t.TEXTURE_2D, i),
            t.texImage2D(
              t.TEXTURE_2D,
              0,
              t.RGBA,
              1,
              1,
              0,
              t.RGBA,
              t.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 255]),
            ),
            t.bindTexture(t.TEXTURE_2D, null));
          let r = new Wr();
          return (
            (r.j = e),
            (r.b = i),
            (r.a = Fe(
              t,
              [
                Or,
                "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform vec2 screenResolution;\r\nuniform int layer;\r\n\r\nuniform float diffuseTexWidth;\r\nuniform float diffuseTexHeight;\r\n\r\nfloat overlayBlend(float a, float b) {\r\n    if (b > 0.5) {\r\n        return (1.0 - (1.0 - 2.0 * (a - 0.5)) * (1.0 - b));\r\n    } else {\r\n        return ((2.0 * a) * b);\r\n    }\r\n}\r\n\r\nfloat alphaStraightBlend(float a, float b, float alpha) {\r\n    return (a * alpha) + (b * (1.0 - alpha));\r\n}\r\n\r\nvoid main() {\r\n    vec2 l_texCoord = vTextCoords.xy;\r\n\r\n\r\n    l_texCoord.x = max(min(l_texCoord.x, (diffuseTexWidth-0.5)/diffuseTexWidth), 0.5/diffuseTexWidth);\r\n    l_texCoord.y = max(min(l_texCoord.y, (diffuseTexHeight-0.5)/diffuseTexHeight), 0.5/diffuseTexHeight);\r\n\r\n    vec4 diffuse = texture2D( uDiffuseTexture, l_texCoord );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (uBlendMode == 1) {\r\n        // Blit (we do nothing?)\r\n        //if (diffuse.a < 0.001) discard;\r\n\r\n        //vec4 finalColor = diffuse;\r\n\r\n        //diffuse = vec4(finalColor.rgb, finalColor.a);\r\n    } else if (uBlendMode == 2) {\r\n        // Multiply\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 multTexture = diffuse;\r\n        vec3 finalColor = (backGround.rgb * multTexture.rgb);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    } else if (uBlendMode == 3) {\r\n        // Overlay\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 overlayTex = diffuse;\r\n\r\n        vec3 finalColor = vec3(\r\n            overlayBlend(overlayTex.r, backGround.r),\r\n            overlayBlend(overlayTex.g, backGround.g),\r\n            overlayBlend(overlayTex.b, backGround.b)\r\n        );\r\n\r\n        vec3 mainTexVisible = backGround.rgb * (1.0 - overlayTex.a);\r\n        vec3 overlayTexVisible = finalColor.rgb * (overlayTex.a);\r\n        finalColor = (mainTexVisible + overlayTexVisible);\r\n\r\n        diffuse = vec4(finalColor, backGround.a);\r\n    } else if (uBlendMode == 5) {\r\n        // AlphaStraight\r\n        vec4 overlayTex = diffuse;\r\n\r\n        //float alphaMult = 1.0;\r\n        //vec3 finalColor = vec3(\r\n        //    alphaStraightBlend(overlayTex.r, backGround.r, alphaMult*overlayTex.a),\r\n        //    alphaStraightBlend(overlayTex.g, backGround.g, alphaMult*overlayTex.a),\r\n        //    alphaStraightBlend(overlayTex.b, backGround.b, alphaMult*overlayTex.a)\r\n        //);\r\n        vec3 finalColor = overlayTex.rgb * overlayTex.a + backGround.rgb * (1.0 - overlayTex.a);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    } else if (uBlendMode == 0 || uBlendMode == 4 || uBlendMode == 6 || uBlendMode == 7) {\r\n        // default, Screen, InferAlphaBlend, Unknown1\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec3 finalColor = mix(backGround.rgb, diffuse.rgb, diffuse.a);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    }\r\n\r\n    gl_FragColor = diffuse;\r\n}",
              ],
              null,
              null,
            )),
            (r.h = Fe(
              t,
              [
                Or,
                "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 specular = texture2D( uSpecularTexture, vTextCoords.xy );\r\n    if (diffuse.a < 0.001) discard;\r\n    gl_FragColor = vec4(specular.rgb, 1.0);\r\n}",
              ],
              null,
              null,
            )),
            (r.g = Fe(
              t,
              [
                Or,
                "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform vec2 screenResolution;\r\nuniform float emissiveAlphaOverride;\r\nuniform int layer;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 emissive = texture2D( uEmissiveTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (diffuse.a < 0.001) discard;\r\n//    if (emissive.a < 0.001) discard;\r\n\r\n    //TODO: This is a hack from what was observed in Nightborne texture customization with tatoos.\r\n    //TODO: But Maybe switch should be over layer or something else instead of blend\r\n    float alpha = 1.0;\r\n\r\n    if (emissiveAlphaOverride > -1.0) {\r\n        alpha = emissiveAlphaOverride;\r\n    } else if (layer <= 1) {\r\n        alpha = 0.0;\r\n    } else {\r\n        alpha = emissive.a;\r\n    }\r\n\r\n    gl_FragColor = vec4(emissive.rgb, alpha);\r\n}",
              ],
              null,
              null,
            )),
            (r.f = {}),
            (r.d = t.createBuffer()),
            t.bindBuffer(t.ARRAY_BUFFER, r.d),
            t.bufferData(t.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.STATIC_DRAW),
            t.bindBuffer(t.ARRAY_BUFFER, null),
            (r.c = t.createBuffer()),
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r.c),
            t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Int16Array([0, 1, 2, 1, 3, 2]), t.STATIC_DRAW),
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null),
            (r.i = t.createFramebuffer()),
            (r.k = {
              loc: t.getAttribLocation(r.a.program, "aTextCoord"),
              type: t.FLOAT,
              size: 2,
              offset: 0,
              stride: 0,
            }),
            r
          );
        })(t)));
    }
    d() {
      const t = new Date(),
        e = t.toISOString().split("T")[0],
        i = `${String(t.getHours()).padStart(2, "0")}-${String(t.getMinutes()).padStart(2, "0")}-${String(t.getSeconds()).padStart(2, "0")}`,
        r = (65536 * Math.random()) | 0;
      ((this.e = `${r}_${e}_${i}`), (this.g = 0));
      let n = this.s;
      (this.b ||
        ((this.b = n.createTexture()),
        n.bindTexture(n.TEXTURE_2D, this.b),
        n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.o, this.p, 0, n.RGBA, n.UNSIGNED_BYTE, null),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR)),
        this.r ||
          ((this.r = n.createTexture()),
          n.bindTexture(n.TEXTURE_2D, this.r),
          n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.o, this.p, 0, n.RGBA, n.UNSIGNED_BYTE, null),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR)),
        this.j ||
          ((this.j = n.createTexture()),
          n.bindTexture(n.TEXTURE_2D, this.j),
          n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.o, this.p, 0, n.RGBA, n.UNSIGNED_BYTE, null),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR)),
        this.a ||
          ((this.a = n.createTexture()),
          n.bindTexture(n.TEXTURE_2D, this.a),
          n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, this.o, this.p, 0, n.RGBA, n.UNSIGNED_BYTE, null),
          n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR),
          n.bindTexture(n.TEXTURE_2D, null)),
        n.bindFramebuffer(n.FRAMEBUFFER, this.m.i),
        n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, this.r, 0),
        n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT),
        n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, this.j, 0),
        n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT),
        n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, this.a, 0),
        n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT),
        n.useProgram(this.m.h.program),
        n.bindBuffer(n.ARRAY_BUFFER, this.m.d),
        n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.m.c),
        this.m.e.disableAll(),
        this.m.e.enable(n, [this.m.k]),
        n.viewport(0, 0, this.o, this.p));
    }
    u(t, e, i, r, n, s, a, o) {
      const l = this.s,
        h = this.m;
      ((h.f.x = e),
        (h.f.y = i),
        (h.f.width = r),
        (h.f.height = n),
        (h.f.diffuseTexWidth = t.e.l),
        (h.f.diffuseTexHeight = t.e.g),
        (null == t.d && null == t.a) || (this.f = !0));
      let u = 0;
      (1 == s
        ? (u = 1)
        : 4 == s
          ? (u = 2)
          : 6 == s
            ? (u = 3)
            : 7 == s
              ? (u = 4)
              : 9 == s
                ? (u = 5)
                : 15 == s
                  ? (u = 6)
                  : 16 == s && (u = 7),
        (h.f.uBlendMode = u),
        (h.f.screenResolution = new Float32Array([this.o, this.p])),
        (h.f.uDiffuseTexture = null != t.e ? t.e.d : h.j),
        (h.f.uSpecularTexture = null != t.d ? t.d.d : h.j),
        (h.f.uEmissiveTexture = null != t.a ? t.a.d : h.b),
        (h.f.renderResultTexture = null != this.b ? this.b : h.j),
        (h.f.layer = a),
        (h.f.emissiveAlphaOverride = o),
        l.disable(l.CULL_FACE),
        l.disable(l.DEPTH_TEST),
        l.disable(l.BLEND),
        this.q(h.a, h.f, this.r),
        this.q(h.h, h.f, this.j),
        this.q(h.g, h.f, this.a),
        this.g++,
        l.useProgram(null));
    }
    k() {
      let t = this.s;
      (t.bindFramebuffer(t.FRAMEBUFFER, null),
        t.bindTexture(t.TEXTURE_2D, null),
        t.enable(t.CULL_FACE),
        t.enable(t.DEPTH_TEST));
    }
    q(t, e, i) {
      let r = this.s;
      (r.useProgram(t.program),
        r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, i, 0),
        r.bindTexture(r.TEXTURE_2D, this.b),
        r.copyTexImage2D(r.TEXTURE_2D, 0, r.RGBA, 0, 0, this.o, this.p, 0),
        r.bindTexture(r.TEXTURE_2D, null),
        pe(t, e),
        r.drawElements(r.TRIANGLES, 6, r.UNSIGNED_SHORT, 0),
        pe(t, Nr));
    }
    i(t) {
      if (0 == t) return this.r;
      if (1 == t) return this.j;
      if (2 == t) return this.a;
      throw new Error("unknown usage " + t);
    }
    c(t) {
      let e = null;
      return ((e = { d: t, l: this.o, g: this.p, f: !0 }), e);
    }
    l() {
      let t = this.s;
      (this.b && t.deleteTexture(this.b),
        this.r && t.deleteTexture(this.r),
        this.j && t.deleteTexture(this.j),
        this.a && t.deleteTexture(this.a),
        (this.r = null),
        (this.j = null),
        (this.a = null),
        (this.b = null),
        (this.m = null),
        (this.s = null));
    }
    n(t) {
      switch (t) {
        case 0:
          return this.c(this.r);
        case 1:
          return this.c(this.j);
        case 2:
          return this.c(this.a);
        default:
          return null;
      }
    }
    t() {}
    h(t) {}
  }
  function jr() {
    var t = new Pe(2);
    return (Pe != Float32Array && ((t[0] = 0), (t[1] = 0)), t);
  }
  function zr(t, e) {
    var i = new Pe(2);
    return ((i[0] = t), (i[1] = e), i);
  }
  function Vr(t, e, i) {
    return ((t[0] = e), (t[1] = i), t);
  }
  function qr(t, e, i) {
    return ((t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), t);
  }
  function Xr(t, e, i) {
    return ((t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t);
  }
  function Kr(t, e, i) {
    return ((t[0] = e[0] * i), (t[1] = e[1] * i), t);
  }
  !(function () {
    var t = jr();
  })();
  function Yr() {
    var t = new Pe(9);
    return (
      Pe != Float32Array &&
        ((t[1] = 0), (t[2] = 0), (t[3] = 0), (t[5] = 0), (t[6] = 0), (t[7] = 0)),
      (t[0] = 1),
      (t[4] = 1),
      (t[8] = 1),
      t
    );
  }
  function $r(t, e) {
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[4]),
      (t[4] = e[5]),
      (t[5] = e[6]),
      (t[6] = e[8]),
      (t[7] = e[9]),
      (t[8] = e[10]),
      t
    );
  }
  function Jr(t, e, i) {
    var r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = e[4],
      l = e[5],
      h = e[6],
      u = e[7],
      c = e[8],
      d = i[0],
      f = i[1],
      g = i[2],
      p = i[3],
      m = i[4],
      b = i[5],
      y = i[6],
      F = i[7],
      S = i[8];
    return (
      (t[0] = d * r + f * a + g * h),
      (t[1] = d * n + f * o + g * u),
      (t[2] = d * s + f * l + g * c),
      (t[3] = p * r + m * a + b * h),
      (t[4] = p * n + m * o + b * u),
      (t[5] = p * s + m * l + b * c),
      (t[6] = y * r + F * a + S * h),
      (t[7] = y * n + F * o + S * u),
      (t[8] = y * s + F * l + S * c),
      t
    );
  }
  function Qr() {
    var t = new Pe(4);
    return (Pe != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), (t[3] = 1), t);
  }
  function Zr(t, e, i) {
    i *= 0.5;
    var r = Math.sin(i);
    return ((t[0] = r * e[0]), (t[1] = r * e[1]), (t[2] = r * e[2]), (t[3] = Math.cos(i)), t);
  }
  function tn(t, e, i, r) {
    var n,
      s,
      a,
      o,
      l,
      h = e[0],
      u = e[1],
      c = e[2],
      d = e[3],
      f = i[0],
      g = i[1],
      p = i[2],
      m = i[3];
    return (
      (s = h * f + u * g + c * p + d * m) < 0 && ((s = -s), (f = -f), (g = -g), (p = -p), (m = -m)),
      1 - s > Re
        ? ((n = Math.acos(s)),
          (a = Math.sin(n)),
          (o = Math.sin((1 - r) * n) / a),
          (l = Math.sin(r * n) / a))
        : ((o = 1 - r), (l = r)),
      (t[0] = o * h + l * f),
      (t[1] = o * u + l * g),
      (t[2] = o * c + l * p),
      (t[3] = o * d + l * m),
      t
    );
  }
  var en,
    rn,
    nn,
    sn,
    an,
    on,
    ln = Xi,
    hn = Ki,
    un = Zi;
  ((en = Ie()), (rn = Ue(1, 0, 0)), (nn = Ue(0, 1, 0)), (sn = Qr()), (an = Qr()), (on = Yr()));
  const cn = class {
    constructor(t) {
      ((this.buffer = new DataView(t)), (this.position = 0));
    }
    getBool() {
      var t = 0 != this.buffer.getUint8(this.position);
      return ((this.position += 1), t);
    }
    getUint8() {
      var t = this.buffer.getUint8(this.position);
      return ((this.position += 1), t);
    }
    getInt8() {
      var t = this.buffer.getInt8(this.position);
      return ((this.position += 1), t);
    }
    getUint16() {
      var t = this.buffer.getUint16(this.position, !0);
      return ((this.position += 2), t);
    }
    getInt16() {
      var t = this.buffer.getInt16(this.position, !0);
      return ((this.position += 2), t);
    }
    getUint32() {
      var t = this.buffer.getUint32(this.position, !0);
      return ((this.position += 4), t);
    }
    getInt32() {
      var t = this.buffer.getInt32(this.position, !0);
      return ((this.position += 4), t);
    }
    getFloat() {
      var t = this.buffer.getFloat32(this.position, !0);
      return ((this.position += 4), t);
    }
    getString(t) {
      void 0 === t && (t = this.getUint16());
      for (var e = "", i = 0; i < t; ++i) e += String.fromCharCode(this.getUint8());
      return e;
    }
    setBool(t) {
      (this.buffer.setUint8(this.position, t ? 1 : 0), (this.position += 1));
    }
    setUint8(t) {
      (this.buffer.setUint8(this.position, t), (this.position += 1));
    }
    setInt8(t) {
      (this.buffer.setInt8(this.position, t), (this.position += 1));
    }
    setUint16(t) {
      (this.buffer.setUint16(this.position, t, !0), (this.position += 2));
    }
    setInt16(t) {
      (this.buffer.setInt16(this.position, t, !0), (this.position += 2));
    }
    setUint32(t) {
      (this.buffer.setUint32(this.position, t, !0), (this.position += 4));
    }
    setInt32(t) {
      (this.buffer.setInt32(this.position, t, !0), (this.position += 4));
    }
    setFloat(t) {
      (this.buffer.setFloat32(this.position, t, !0), (this.position += 4));
    }
  };
  class dn {
    constructor() {
      ((this.a = -1), (this.b = null), (this.c = 0), (this.e = -1), (this.d = !1));
    }
  }
  class fn {
    constructor() {
      ((this.d = new dn()),
        (this.a = new dn()),
        (this.f = new dn()),
        (this.b = 0),
        (this.e = 1),
        (this.c = !1));
    }
  }
  class gn {
    constructor() {
      ((this.k = []), (this.i = []), (this.a = 0), (this.j = -1), (this.g = !1), (this.h = null));
    }
    e(t, e) {
      if (!this.h || !t) return !1;
      const i = this.h;
      if (i.timesOffset + 4 * i.timesCount > t.byteLength) return !1;
      const r = new cn(t);
      ((r.position = i.timesOffset), (this.k = new Array(i.timesCount)));
      for (let t = 0; t < i.timesCount; t++) this.k[t] = r.getUint32();
      ((r.position = i.valuesOffset), (this.i = new Array(i.valuesCount)));
      for (let t = 0; t < i.valuesCount; t++) this.i[t] = e(r);
      return ((this.g = !0), (this.h = null), !0);
    }
    f() {
      var t = this;
      if (t.i) for (var e = 0; e < t.i.length; ++e) t.i[e] = null;
      return ((t.k = null), (t.i = null), null);
    }
    c(t, e, i, r) {
      let n = this;
      if (
        (null == r && (r = this.m()),
        this.j >= 0 && (t = this.j < e.length ? e[this.j] : e[0]),
        0 != n.a || n.i.length > 1)
      ) {
        if (n.k.length > 1) {
          for (var s = -1, a = n.k.length - 1, o = 0; o < a; ++o)
            if (t >= n.k[o] && t <= n.k[o + 1]) {
              s = o;
              break;
            }
          if (-1 == s) return (r = n.b(r, n.i[n.i.length - 1]));
          if (1 == n.a) {
            var l = n.k[s],
              h = n.k[s + 1],
              u = 0;
            return (
              t > h ? (u = 1) : l != h && (u = (t - l) / (h - l)),
              (u = Math.max(0, Math.min(1, u))),
              n.l(n.i[s], n.i[s + 1], u, r)
            );
          }
          return (r = n.b(r, n.i[s]));
        }
        return n.i.length > 0 ? (r = n.b(r, n.i[0])) : i;
      }
      return 0 == n.i.length ? (null != i ? i : r) : (r = n.b(r, n.i[0]));
    }
  }
  class pn extends gn {
    constructor() {
      (super(), (this.ba = Ie()));
    }
    m() {
      return Ie();
    }
    l(t, e, i, r) {
      return Qe(r, t, e, i);
    }
    b(t, e) {
      return (Oe(t, e), t);
    }
    d(t) {
      return He(Ie(), t.getFloat(), t.getFloat(), t.getFloat());
    }
  }
  class mn extends gn {
    constructor() {
      (super(), (this.ba = Qr()));
    }
    m() {
      return Qr();
    }
    l(t, e, i, r) {
      return tn(r, t, e, i);
    }
    b(t, e) {
      return (ln(t, e), t);
    }
    d(t) {
      let e = t.getFloat(),
        i = t.getFloat(),
        r = t.getFloat(),
        n = t.getFloat();
      const s = hn(Qr(), e, i, r, n);
      return (un(s, s), s);
    }
  }
  class bn extends gn {
    constructor() {
      (super(), (this.ba = Qr()));
    }
    m() {
      return Qr();
    }
    l(t, e, i, r) {
      return tn(r, t, e, i);
    }
    b(t, e) {
      return (ln(t, e), t);
    }
    d(t) {
      let e = (t.getUint16() - 32767) / 32767,
        i = (t.getUint16() - 32767) / 32767,
        r = (t.getUint16() - 32767) / 32767,
        n = (t.getUint16() - 32767) / 32767;
      const s = hn(Qr(), e, i, r, n);
      return (un(s, s), s);
    }
  }
  class yn extends gn {
    constructor() {
      super();
    }
    d(t) {
      return t.getUint16();
    }
    m() {
      return 0;
    }
    l(t, e, i, r) {
      return t + (e - t) * i;
    }
    b(t, e) {
      return e;
    }
  }
  class Fn extends yn {
    d(t) {
      return t.getFloat();
    }
  }
  class Sn extends yn {
    d(t) {
      return t.getUint8();
    }
  }
  class vn {
    constructor() {
      ((this.a = []), (this.b = []));
    }
    h() {
      var t = this;
      if (t.b) for (var e = 0; e < t.b.length; ++e) t.b[e] = null;
      return ((t.a = null), (t.b = null), (t.c = null), null);
    }
    d(t, e, i, r) {
      let n = this;
      i || (i = this.g());
      let s = r || n.b;
      if (n.b.length > 1 && n.a.length > 1) {
        for (var a = -1, o = n.a.length, l = 0; l < o - 1; ++l)
          if (t >= n.a[l] && t <= n.a[l + 1]) {
            a = l;
            break;
          }
        -1 == a && (a = n.a.length - 1);
        var h = n.a[a],
          u = n.a[a + 1],
          c = 0;
        return (h != u && (c = (t - h) / (u - h)), n.i(s[a], s[a + 1], c, i));
      }
      return s.length > 0 ? (i = n.f(i, s[0])) : e;
    }
  }
  class Tn extends vn {
    constructor() {
      (super(), (this.ba = jr()));
    }
    g() {
      return jr();
    }
    i(t, e, i, r) {
      return (
        (n = r),
        (a = e),
        (o = i),
        (l = (s = t)[0]),
        (h = s[1]),
        (n[0] = l + o * (a[0] - l)),
        (n[1] = h + o * (a[1] - h)),
        n
      );
      var n, s, a, o, l, h;
    }
    f(t, e) {
      var i, r;
      return ((r = e), ((i = t)[0] = r[0]), (i[1] = r[1]), t);
    }
    e(t) {
      return Vr(jr(), t.getFloat(), t.getFloat());
    }
  }
  class Cn extends vn {
    constructor() {
      super();
    }
    g() {
      return Ie();
    }
    i(t, e, i, r) {
      return Qe(r, t, e, i);
    }
    f(t, e) {
      return (Oe(t, e), t);
    }
    e(t) {
      return He(Ie(), t.getFloat(), t.getFloat(), t.getFloat());
    }
  }
  class xn extends vn {
    constructor() {
      super();
    }
    g() {
      return 0;
    }
    i(t, e, i, r) {
      return t + (e - t) * i;
    }
    f(t, e) {
      return e;
    }
    e(t) {
      return t.getUint16();
    }
  }
  function An(t, e, i, r) {
    const n = t.getInt32(),
      s = t.getInt32(),
      a = t.getInt32(),
      o = t.getInt32(),
      l = i();
    if (n > 0) {
      const t = new cn(e);
      ((t.position = s), (l.a = new Array(n)));
      for (let e = 0; e < n; e++) l.a[e] = t.getInt16() / 32767;
    }
    if (a > 0) {
      const t = new cn(e);
      ((t.position = o), (l.b = new Array(a)));
      for (let e = 0; e < a; e++) l.b[e] = r(t);
    }
    return l;
  }
  class _n {
    constructor() {
      this.j = null;
    }
    static h(t, e, i, r, n = !0) {
      const s = new _n();
      return (
        (s.c = (function (t, e, i, r, n = !0) {
          const s = t.getInt16(),
            a = t.getInt16(),
            o = t.getInt32(),
            l = t.getInt32(),
            h = t.getInt32(),
            u = t.getInt32(),
            c = Math.min(o, h),
            d = new Array(c);
          for (let t = 0; t < c; t++) {
            const o = i();
            ((o.a = s), (o.j = a), (o.k = []), (o.i = []), (o.g = !1));
            {
              const i = new cn(e.chunkData);
              i.position = l + 8 * t;
              const s = i.getInt32(),
                a = i.getInt32();
              i.position = u + 8 * t;
              const h = i.getInt32(),
                c = i.getInt32();
              if (s > 0 && h > 0)
                if (!n || (t < e.sequenceFlags.length && 32 & e.sequenceFlags[t])) {
                  ((i.position = a), (o.k = new Array(s)));
                  for (let t = 0; t < s; t++) o.k[t] = i.getUint32();
                  ((i.position = c), (o.i = new Array(h)));
                  for (let t = 0; t < h; t++) o.i[t] = r(i);
                  o.g = !0;
                } else o.h = { timesCount: s, timesOffset: a, valuesCount: h, valuesOffset: c };
            }
            d[t] = o;
          }
          return d;
        })(t, e, i, r, n)),
        (s.j = r),
        s
      );
    }
    static b() {
      const t = new _n();
      return ((t.c = []), t);
    }
    d(t) {
      return !(!this.c || 0 == this.c.length) && (t >= this.c.length && (t = 0), this.c[t].g);
    }
    g(t, e, i, r) {
      if (!this.c || 0 == this.c.length) return i;
      let n = t.a.a;
      n >= this.c.length && (n = 0);
      let s = this.c[n].c(t.a.c, e, i, r);
      if (t.b > 0 && t.b < 1) {
        let r = this.c[0].m(),
          n = t.f.a;
        n >= this.c.length && (n = 0);
        let a = this.c[n].c(t.f.c, e, i, r);
        (a || (a = r), (r = this.c[0].m()), (s = this.c[0].l(a, s, t.b, r)));
      }
      if (t.e > 0 && t.e <= 1 && t.d.a != t.a.a && -1 != t.d.a) {
        let r = this.c[0].m(),
          n = t.d.a;
        n >= this.c.length && (n = 0);
        let a = this.c[n].c(t.d.c, e, i, r);
        (a || (a = r), (r = this.c[0].m()), (s = this.c[0].l(a, s, 1 - t.e, r)));
      }
      return s;
    }
    a(t, e) {
      if (!this.c || t < 0 || t >= this.c.length) return !1;
      const i = this.c[t];
      return !(!i.h || i.g) && !!this.j && i.e(e, this.j);
    }
    f(t) {
      return !(!this.c || t < 0 || t >= this.c.length) && null != this.c[t].h;
    }
    e(t) {
      if (!this.c || 0 === this.c.length) return 0;
      const e = t < this.c.length ? t : 0,
        i = this.c[e];
      return i && i.k && 0 !== i.k.length ? i.k[i.k.length - 1] : 0;
    }
    i() {
      if (this.c && 0 != this.c.length) {
        for (var t = 0; t < this.c.length; ++t) (this.c[t].f(), (this.c[t] = null));
        return null;
      }
    }
  }
  function wn() {
    return new pn();
  }
  function En() {
    return new mn();
  }
  function Dn() {
    return new bn();
  }
  function Mn() {
    return new yn();
  }
  function kn() {
    return new Fn();
  }
  function Bn() {
    return new Sn();
  }
  function Rn(t) {
    return He(Ie(), t.getFloat(), t.getFloat(), t.getFloat());
  }
  function Pn(t) {
    let e = t.getFloat(),
      i = t.getFloat(),
      r = t.getFloat(),
      n = t.getFloat();
    const s = hn(Qr(), e, i, r, n);
    return (un(s, s), s);
  }
  function In(t) {
    let e = (t.getUint16() - 32767) / 32767,
      i = (t.getUint16() - 32767) / 32767,
      r = (t.getUint16() - 32767) / 32767,
      n = (t.getUint16() - 32767) / 32767;
    const s = hn(Qr(), e, i, r, n);
    return (un(s, s), s);
  }
  function Ln(t) {
    return t.getUint16();
  }
  function Un(t) {
    return t.getFloat();
  }
  function On(t) {
    return t.getUint8();
  }
  function Hn() {
    return new Tn();
  }
  function Wn() {
    return new Cn();
  }
  function Nn() {
    return new xn();
  }
  function Gn(t) {
    return Vr(jr(), t.getFloat(), t.getFloat());
  }
  function jn(t, e, i = !0) {
    return _n.h(t, e, wn, Rn, i);
  }
  function zn(t, e, i = !0) {
    return _n.h(t, e, Mn, Ln, i);
  }
  function Vn(t, e, i = !0) {
    return _n.h(t, e, kn, Un, i);
  }
  function qn(t, e, i = !0) {
    return _n.h(t, e, Bn, On, i);
  }
  function Xn(t, e) {
    return An(t, e, Nn, Ln);
  }
  function Kn(t, e) {
    return qi(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2], 0);
  }
  function Yn(t, e, i) {
    for (let r = 0; r < 4; r++) t[4 * e + r] = i[r];
  }
  const $n = class {
    constructor(t, e, i) {
      ((this.d = t),
        (this.o = i),
        (this.g = null),
        (this.t = null),
        (this.s = null),
        (this.b = ni()),
        (this.u = ni()),
        (this.j = ni()));
      const r = this;
      ((r.A = e),
        (r.q = Ie()),
        (r.p = ni()),
        (r.m = ni()),
        (r.x = ni()),
        (r.f = Ie()),
        (r.r = Qr()),
        (r.n = ni()),
        (r.h = !1),
        (r.c = !1),
        (r.l = !1));
    }
    a() {
      var t = this;
      ((t.q = null), (t.p = null), (t.f = null), (t.r = null), (t.n = null));
    }
    k() {
      this.h = !0;
      for (var t = 0; t < 16; ++t) this.p[t] = 0;
    }
    v(t) {
      t ? (null == this.g && (this.g = new fn()), this.d.ab(t, this.g)) : (this.g = null);
      let e = this.d.A[this.A];
      for (let i = 0; i < e.length; i++) this.d.ah[e[i]].v(t);
    }
    e(t) {
      t ? (null == this.t && (this.t = new fn()), this.d.ab(t, this.t)) : (this.t = null);
      let e = this.d.A[this.A];
      for (let i = 0; i < e.length; i++) this.d.ah[e[i]].e(t);
    }
    z(t) {
      const e = this.o;
      var i = this;
      if (i.h) return void i.k();
      if ((null != this.g && this.d.ba(this.g, t), i.c || i.l)) return;
      if (((i.c = !0), !i.d)) return;
      oi(i.p);
      var r = i.d.an;
      if (!r) return;
      let n = this.u;
      if ((oi(n), ui(n, n, this.d.aF.viewMatrix), ui(n, n, this.d.s), ui(i.p, i.p, n), e.d > -1)) {
        i.d.ah[e.d].z(t);
        let r = this.j;
        if ((si(r, i.d.ah[e.d].p), ui(r, n, r), 1 & e.i || 2 & e.i || 4 & e.i)) {
          if (4 & e.i && 2 & e.i) (Yn(r, 0, Kn(n, 0)), Yn(r, 1, Kn(n, 1)), Yn(r, 2, Kn(n, 2)));
          else if (4 & e.i) {
            {
              let t = Kn(n, 0),
                e = Qi(t);
              (Ji(t, t, Qi(Kn(r, 0)) / e), Yn(r, 0, t));
            }
            {
              let t = Kn(n, 1),
                e = Qi(t);
              (Ji(t, t, Qi(Kn(r, 1)) / e), Yn(r, 1, t));
            }
            {
              let t = Kn(n, 2),
                e = Qi(t);
              (Ji(t, t, Qi(Kn(r, 2)) / e), Yn(r, 2, t));
            }
          } else if (2 & e.i) {
            {
              let t = Kn(n, 0);
              (Ji(t, t, 1 / Qi(Kn(r, 0))), Ji(t, t, Qi(Kn(n, 0))), Yn(r, 0, t));
            }
            {
              let t = Kn(n, 1);
              (Ji(t, t, 1 / Qi(Kn(r, 1))), Ji(t, t, Qi(Kn(n, 1))), Yn(r, 1, t));
            }
            {
              let t = Kn(n, 2);
              (Ji(t, t, 1 / Qi(Kn(r, 2))), Ji(t, t, Qi(Kn(n, 2))), Yn(r, 2, t));
            }
          }
          if (1 & e.i) Yn(r, 3, Kn(n, 3));
          else {
            let t = qi(e.f[0], e.f[1], e.f[2], 1),
              s = Vi();
            (Xi(s, t), (s[3] = 0));
            let a = Vi(),
              o = Vi();
            (tr(a, t, i.d.ah[i.o.d].p),
              tr(a, a, n),
              tr(o, s, r),
              $i(a, a, o),
              (a[3] = 1),
              Yn(r, 3, a));
          }
        }
        let s = this.b;
        (hi(s, n), ui(r, s, r), ui(i.p, i.p, r));
      }
      let s = null;
      if (null != this.g) {
        let t = this.i(this.g);
        (this.d.G || (this.w = t), this.d.as || (s = this.d.G ? this.w : t));
      } else {
        let t = this.i(r);
        (this.d.G || (this.w = t), this.d.as || (s = this.d.G ? this.w : t));
      }
      let a = null;
      if (null != this.t) {
        let t = this.i(this.t);
        (this.d.G || (this.y = t), (a = this.d.G ? this.y : t));
      }
      let o = null != s || null != a,
        l = ni();
      (o && (null != s && ui(l, l, s), null != a && ui(l, l, a)),
        null != this.s && (ci(l, l, this.o.f), ui(l, l, this.s), ci(l, l, Ke(this.f, this.o.f))),
        ui(i.p, i.p, l));
      let h = 120 & e.i;
      if (h) {
        let t = ni();
        si(t, i.p);
        let e = i.p,
          r = Ie();
        bi(r, i.p);
        let n = Vi();
        if (16 == h) {
          let t = Kn(i.p, 0);
          (Ji(t, t, 1 / Le(t)), Yn(i.p, 0, t));
          let r = qi(e[4], -e[0], 0, 0);
          (Yn(e, 1, Zi(r, r)), Je(n, r, t), (n[3] = 0), Yn(e, 2, n));
        } else if (h > 16) {
          if (32 == h) {
            let t = Kn(e, 1);
            (Ji(t, t, 1 / Qi(t)), Yn(i.p, 1, t));
            let r = qi(-e[5], e[1], 0, 0);
            (Yn(e, 0, Zi(r, r)), (n[3] = 0), Yn(e, 2, n));
          } else if (64 == h) {
            let t = Kn(e, 2);
            (Zi(t, t), Yn(e, 2, t));
            let i = qi(t[1], -t[0], 0, 0);
            (Zi(i, i), Yn(e, 1, i), Je(n, t, i), (n[3] = 0), Yn(e, 0, n));
          }
        } else if (8 == h) {
          let t = this.d.isMirrored;
          if (o) {
            let i = Kn(l, 0);
            ((i = qi(i[1], i[2], -i[0], 0)), Zi(i, i), Yn(e, 0, i));
            let r = Kn(l, 1);
            ((r = qi(t ? -r[1] : r[1], t ? -r[2] : r[2], t ? r[0] : -r[0], 0)),
              Zi(r, r),
              Yn(e, 1, r));
            let n = Kn(l, 2);
            ((n = qi(n[1], n[2], -n[0], 0)), Zi(n, n), Yn(e, 2, n));
          } else {
            (Yn(e, 0, qi(0, 0, -1, 0)),
              Yn(e, 1, qi(t ? -1 : 1, 0, 0, 0)),
              Yn(e, 2, qi(0, 1, 0, 0)));
          }
        }
        let s = qi(this.o.f[0], this.o.f[1], this.o.f[2], 1),
          a = qi(this.o.f[0], this.o.f[1], this.o.f[2], 0),
          u = Kn(e, 0),
          c = Kn(e, 1),
          d = Kn(e, 2);
        (Ji(u, u, r[0]),
          Ji(c, c, r[1]),
          Ji(d, d, r[2]),
          Yn(e, 0, u),
          Yn(e, 1, c),
          Yn(e, 2, d),
          tr(s, s, t),
          tr(a, a, e));
        let f = Vi();
        ($i(f, s, a), (f[3] = 1), Yn(e, 3, f));
      }
      (hi(n, n), ui(i.p, n, i.p), hi(i.m, i.p), li(i.x, i.m), Ze(i.q, i.o.f, i.p));
    }
    i(t) {
      const e = this.o;
      if (!!(640 & e.i)) {
        let S = ni();
        return (
          oi(S),
          ci(S, S, this.o.f),
          (this.f = e.a.g(t, this.d.k, Ie())),
          ci(S, S, this.f),
          (this.r = e.e.g(t, this.d.k, Qr())),
          (i = this.n),
          (r = this.r),
          (n = r[0]),
          (s = r[1]),
          (a = r[2]),
          (o = r[3]),
          (c = n * (l = n + n)),
          (d = s * l),
          (f = s * (h = s + s)),
          (g = a * l),
          (p = a * h),
          (m = a * (u = a + a)),
          (b = o * l),
          (y = o * h),
          (F = o * u),
          (i[0] = 1 - f - m),
          (i[1] = d + F),
          (i[2] = g - y),
          (i[3] = 0),
          (i[4] = d - F),
          (i[5] = 1 - c - m),
          (i[6] = p + b),
          (i[7] = 0),
          (i[8] = g + y),
          (i[9] = p - b),
          (i[10] = 1 - c - f),
          (i[11] = 0),
          (i[12] = 0),
          (i[13] = 0),
          (i[14] = 0),
          (i[15] = 1),
          ui(S, S, this.n),
          (this.f = e.c.g(t, this.d.k, Ue(1, 1, 1))),
          di(S, S, this.f),
          ci(S, S, Ke(this.f, this.o.f)),
          S
        );
      }
      var i, r, n, s, a, o, l, h, u, c, d, f, g, p, m, b, y, F;
      return null;
    }
  };
  const Jn = class {
    constructor(t) {
      ((this.c = t), (this.b = 267320826 ^ t));
      let e = new ArrayBuffer(4);
      this.e = new DataView(e);
    }
    f() {
      let t = this.b;
      return ((t ^= t << 13), (t ^= t >> 17), (t ^= t << 5), (this.b = t), t);
    }
    d() {
      let t,
        e = this.f();
      return (
        this.e.setInt32(0, 1065353216 | (8388607 & e)),
        (t = 2147483648 & e ? 2 - this.e.getFloat32(0) : this.e.getFloat32(0) - 2),
        t
      );
    }
    a() {
      let t = this.f();
      return (this.e.setInt32(0, 1065353216 | (8388607 & t)), this.e.getFloat32(0) - 1);
    }
  };
  const Qn = class {
    constructor() {
      ((this.j = 0),
        (this.b = 0),
        (this.a = 0),
        (this.f = 0),
        (this.e = Ie()),
        (this.d = 0),
        (this.h = 0),
        (this.c = 0),
        (this.g = 0),
        (this.i = 0));
    }
  };
  const Zn = class {
    constructor(t, e) {
      ((this.i = t), (this.g = e), (this.e = new Qn()));
    }
    k() {
      return this.e.f + this.i.d() * this.g.i;
    }
    d() {
      return this.e.f + this.g.i;
    }
    b() {
      return this.e.a + this.g.W;
    }
    j(t) {
      return this.e.a + 30518509e-12 * t * this.g.W;
    }
    c() {
      let t = this.e.j;
      return ((t *= 1 + this.e.b * this.i.d()), t);
    }
    a() {
      return this.e;
    }
    h(t) {
      Oe(t, this.e.e);
    }
  };
  const ts = class extends Zn {
    f(t, e) {
      let i,
        r = e * this.i.a(),
        n = this.i.d();
      ((i = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767), (t.f = i));
      let s = this.j(i);
      (s < 0.001 && (s = 0.001),
        (t.a = (function (t, e) {
          let i = Math.abs(t),
            r = Math.abs(e);
          return Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t);
        })(r, s)),
        (t.b = 65535 & this.i.f()),
        He(t.d, this.i.d() * this.e.h * 0.5, this.i.d() * this.e.c * 0.5, 0));
      let a = this.c(),
        o = this.e.d;
      if (o < 0.001) {
        let e = this.e.g * this.i.d(),
          i = this.e.i * this.i.d(),
          r = Math.sin(e),
          n = Math.sin(i),
          s = Math.cos(e),
          o = Math.cos(i);
        He(t.g, o * r * a, n * r * a, s * a);
      } else {
        let e = Ie();
        (Oe(e, t.d), (e[2] = e[2] - o), Le(e) > 1e-4 && (Ye(e, e), Ve(t.g, e, a)));
      }
    }
  };
  const es = class extends Zn {
    constructor(t, e, i) {
      (super(t, e), (this.ba = i));
    }
    f(t, e) {
      let i,
        r = e * this.i.a(),
        n = this.i.d();
      ((i = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767), (t.f = i));
      let s = this.j(i);
      (s < 0.001 && (s = 0.001),
        (t.a = (function (t, e) {
          let i = Math.abs(t),
            r = Math.abs(e);
          return Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t);
        })(r, s)),
        (t.b = 65535 & this.i.f()));
      let a = this.e.c - this.e.h,
        o = this.e.h + a * this.i.a(),
        l = this.e.g * this.i.d(),
        h = this.e.i * this.i.d(),
        u = Math.cos(l),
        c = Ue(u * Math.cos(h), u * Math.sin(h), Math.sin(l));
      Ve(t.d, c, o);
      let d = this.c(),
        f = this.e.d,
        g = Ue(0.5, 0.5, 0.5);
      (0 == f
        ? this.ba
          ? He(g, 0, 0, 1)
          : He(g, u * Math.cos(h), u * Math.sin(h), Math.sin(l))
        : (He(g, 0, 0, f), Ne(g, t.d, g), Le(g) > 1e-4 && Ye(g, g)),
        Ve(t.g, g, d));
    }
  };
  const is = class {
    constructor() {
      ((this.d = Ie()),
        (this.a = 0),
        (this.g = Ie()),
        (this.f = 0),
        (this.b = (2147483647 * Math.random()) | 0),
        (this.c = [jr(), jr()]),
        (this.e = [jr(), jr()]));
    }
  };
  const rs = class {
    constructor(t, e, i, r, n, s) {
      ((this.a = t), (this.b = e), (this.e = i), (this.c = r), (this.f = n), (this.d = s));
    }
  };
  const ns = class {
    constructor(t, e, i) {
      ((this.a = t), (this.b = e), (this.c = i));
    }
  };
  let ss = new Array(128);
  for (let t = 0; t < 128; t++) ss[t] = Math.random();
  const as = ai(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
    os = 1e3;
  class ls {}
  class hs {
    constructor() {
      ((this.b = Ie()), (this.a = 0), (this.c = { d: jr(), a: Ie(), f: 0, c: 0, b: 1, e: 0 }));
    }
  }
  function us(t) {
    return qi(
      ((t >> 16) & 255) / 255,
      ((t >> 8) & 255) / 255,
      (255 & t) / 255,
      ((t >> 24) & 255) / 255,
    );
  }
  const cs = [0, 0, 1, 2, 3, 4];
  const ds = class {
    constructor(t, e) {
      ((this.as = t),
        (this.aq = e),
        (this.ai = null),
        (this.c = 0),
        (this.A = !0),
        (this.C = null),
        (this.Y = new Date().getTime()),
        (this.d = e),
        (this.E = ni()),
        (this.ak = ni()),
        (this.T = ni()),
        (this.ao = ni()),
        (this.ar = Vi()),
        (this.X = Yr()),
        (this.u = Ie()),
        (this.f = 1),
        (this.l = Ie()),
        (this.q = 0),
        (this.ad = Ie()),
        (this.t = Ie()),
        (this.p = []),
        (this.n = Ie()),
        (this.aj = 0),
        (this.w = 0),
        (this.ae = 0),
        (this.an = 0),
        (this.s = Ie()),
        (this.W = Ie()),
        (this.I = 0),
        (this.H = 0),
        (this.Q = 0),
        (this.g = 0),
        (this.al = 0),
        (this.B = 0),
        (this.K = 0),
        (this.Z = []),
        (this.af = []));
      for (let t = 0; t < os; t++)
        (this.af.push(4 * t + 0),
          this.af.push(4 * t + 1),
          this.af.push(4 * t + 2),
          this.af.push(4 * t + 3),
          this.af.push(4 * t + 2),
          this.af.push(4 * t + 1));
      switch (((this.S = new Jn((2147483647 * Math.random()) | 0)), this.d.z)) {
        case 1:
          this.L = new ts(this.S, e);
          break;
        case 2:
          this.L = new es(this.S, e, !!(256 & this.d.T));
          break;
        default:
          ((this.L = null), noop("Found unimplemented generator ", this.d.z));
      }
      const i = this.d.b - this.d.y;
      0 != i
        ? ((this.w = (this.d.g - this.d.H) / i), (this.ae = this.d.H - this.d.y * this.w))
        : ((this.w = 0), (this.ae = 0));
      let r = this.d.h;
      r <= 0 && (r = 1);
      let n = this.d.aa;
      (n <= 0 && (n = 1), (this.H = r * n - 1), (this.Q = 0));
      let s = r,
        a = -1;
      do {
        (++a, (s >>= 1));
      } while (s);
      if (((this.g = a), (this.al = r - 1), (this.Q = 0), (32768 & this.d.T) > 0)) {
        let t = (this.H + 1) * this.S.f();
        this.Q = (t / 4294967296) | 0;
      }
      ((this.B = 1 / r), (this.K = 1 / n));
      let o = !1;
      (269484032 & this.d.T) > 0
        ? ((o = !!(1 & (this.d.T >> 28))), (this.aj = o ? 2 : 3))
        : (this.aj = 0);
      let l = !1,
        h = !1;
      ((268435456 & this.d.T) > 0
        ? (h = (1073741824 & this.d.T) > 0)
        : 1048576 & this.d.T || (l = !(1 & this.d.T)),
        2 == this.aj || (4 == this.aj && o)
          ? (this.h = h ? 3 : 2)
          : 3 == this.aj
            ? (this.h = 5)
            : (this.h = l ? 1 : 0),
        (this.ab = e.r > 1),
        (this.b = this.as.t.l(224e3)),
        (this.R = this.as.t.f(8e3)),
        (this.a = this.as.t.j(this.b, this.R)));
    }
    m() {
      var t = this;
      ((t.d.J = null),
        (t.d.E = null),
        (t.d.j = null),
        (t.d.F = t.d.F.i()),
        (t.d.f = t.d.f.i()),
        (t.d.L = t.d.L.i()),
        (t.d.l = t.d.l.i()),
        (t.d.D = t.d.D.i()),
        (t.d.I = t.d.I.i()),
        (t.d.U = t.d.U.i()),
        (t.d.m = t.d.m.i()),
        (t.d.S = t.d.S.i()),
        (t.d.u = t.d.u.i()),
        (t.d.a = t.d.a.i()),
        (t.d.O = t.d.O.h()),
        (t.d.d = t.d.d.h()),
        (t.d.c = t.d.c.h()),
        (t.d.C = t.d.C.h()),
        (t.d.P = t.d.P.h()),
        (t.p = null));
    }
    O(t) {
      const e = this.aq;
      e.q >= 11 &&
        e.q <= 13 &&
        t &&
        ((this.ah = [Vi(), Vi(), Vi()]),
        Xi(this.ah[0], us(t.Start[e.q - 11])),
        Xi(this.ah[1], us(t.Mid[e.q - 11])),
        Xi(this.ah[2], us(t.End[e.q - 11])));
    }
    k(t) {
      this.ai = t;
    }
    y() {
      if (this.C) return;
      this.as.aF.context;
      if (!this.N)
        if (((this.N = [null, null, null]), 268435456 & this.d.T))
          for (let t = 0; t < this.d.v.length; t++) {
            const e = this.d.v[t];
            e > -1 && e < this.as.V.length && (this.N[t] = this.as.V[e]);
          }
        else this.d.G > -1 && this.d.G < this.as.V.length && (this.N[0] = this.as.V[this.d.G]);
      let t = !0;
      for (let e of this.N) t = t && (!e || (e.c && e.c.f));
      if (!t) return;
      const e = this.as.t;
      let i = this.d.r;
      4 == i && (i = 3);
      let r = {};
      ((r.uViewMatrix = this.as.aF.viewMatrix),
        (r.uProjMatrix = this.as.aF.projMatrix),
        (r.uBlendMode = this.d.r),
        (r.uPixelShader = cs[this.h]),
        (r.colorMult = this.ai ? this.ai.c : 1),
        (r.alphaMult = this.ai ? this.ai.b : 1));
      let n = [
        this.N[0] && this.N[0].c && this.N[0].c.f,
        this.N[1] && this.N[1].c && this.N[1].c.f,
        this.N[2] && this.N[2].c && this.N[2].c.f,
      ];
      ((r.uTexture = this.N[0].c.d),
        (r.uTexture2 = n[1] ? this.N[1].c.d : null),
        (r.uTexture3 = n[2] ? this.N[2].c.d : null),
        (r.uHasTexture = n[0] ? 1 : 0),
        (r.uHasTexture2 = n[1] ? 1 : 0),
        (r.uHasTexture3 = n[2] ? 1 : 0));
      let s = -1;
      (1 == i ? (s = 0.501960814) : i > 1 && (s = 1 / 255), (r.uAlphaTreshold = s));
      const a = e.e(
        this.as.ap,
        new rs(!1, !this.as.aO, i, !0, !1, 15),
        new Bi(
          this.N.map((t) => t && t.c),
          r,
        ),
      );
      this.C = e.a(new ns(this.a, 0, 0), a, 0, this.d.o);
    }
    ap(t, e) {
      if (!this.L) return;
      let i = ni(),
        r = this.L.a(),
        n = !0;
      (this.d.a.d(t.a.a) && (n = this.d.a.g(t, this.as.k) > 0), (this.J = n));
      Ue(0, 0, 0);
      if (n) {
        ((r.j = this.d.F.g(t, this.as.k, 0)),
          (r.b = this.d.f.g(t, this.as.k, 0)),
          (r.g = this.d.L.g(t, this.as.k, 0)),
          (r.i = this.d.l.g(t, this.as.k, 0)));
        const e = this.d.D.g(t, this.as.k, 0);
        (He(r.e, 0, 0, -e),
          (r.a = this.d.I.g(t, this.as.k, 0)),
          (r.f = this.d.U.g(t, this.as.k, 0)),
          (r.c = this.d.S.g(t, this.as.k, 0)),
          (r.h = this.d.m.g(t, this.as.k, 0)),
          this.ai ? (r.d = this.ai.d) : (r.d = this.d.u.g(t, this.as.k, 0)));
      }
      (ui(i, i, this.as.s), ui(i, i, this.as.ah[this.d.Z].p));
      let s = ni();
      var a, o;
      ((a = s),
        (o = Ue(this.d.J[0], this.d.J[1], this.d.J[2])),
        (a[0] = 1),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = 1),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 0),
        (a[9] = 0),
        (a[10] = 1),
        (a[11] = 0),
        (a[12] = o[0]),
        (a[13] = o[1]),
        (a[14] = o[2]),
        (a[15] = 1),
        ui(i, i, s),
        ui(i, i, as));
      let l = ni(),
        h = Ie();
      (hi(l, this.as.aF.viewMatrix),
        mi(h, l),
        this.j(e, i, h, null, this.as.aF.viewMatrix),
        this.e(this.as.aF.viewMatrix),
        this.b.b(new Float32Array(this.Z)),
        this.R.b(new Uint16Array(this.af)),
        this.C && ((this.C.h = (6 * this.c) | 0), (this.C.d = 0)));
    }
    r(t) {
      if (this.p.length <= 0) return;
      if ((this.C || this.y(), !this.C)) return;
      if (!t && this.C.c.b() > Sr.GxBlend_AlphaKey) return;
      this.as.t.b().a(this.C);
    }
    ag(t, e) {
      if (!(16 & this.d.T))
        for (let i = 0; i < this.p.length; i++) {
          const r = this.p[i];
          (Ze(r.d, r.d, t), ti(r.g, r.g, e));
        }
    }
    j(t, e, i, r, n) {
      if (null == this.L) return;
      if (this.as.G) return;
      mi(this.l, this.E);
      let s = Vi();
      (mi(s, e), (s[3] = 1), tr(s, s, n), (this.q = s[2]));
      let a = Ie();
      if ((mi(a, n), this.aa(e, a, r), t > 0)) {
        let e = Ie();
        if ((mi(e, this.E), 16384 & this.d.T)) {
          Ne(this.t, e, this.l);
          let i = this.w * (Le(this.t) / t) + this.ae;
          (i >= 0 && (i = Math.min(i, 1)), Ve(this.ad, this.t, i));
        }
        if (64 & this.d.T) {
          this.an += t;
          let i = 0.03;
          if (this.an > i)
            if (((this.an = 0), 0 == this.p.length)) {
              let t = i / this.an,
                r = Ie();
              Ne(r, e, this.l);
              let n = t * this.d.t;
              Ge(this.s, r, Ue(n, n, n));
            } else He(this.s, 0, 0, 0);
        }
        this.z(t);
      }
    }
    aa(t, e, i) {
      if ((Oe(this.W, e), null == i || 16 & this.d.T)) si(this.E, t);
      else {
        let e = ni();
        (hi(e, i), ui(this.E, e, t));
      }
      let r = Ie();
      (bi(r, t), (this.f = r[0]));
    }
    z(t) {
      if ((t = Math.max(t, 0)) < 0.1) Oe(this.ad, this.t);
      else {
        let e = Math.floor(t / 0.1);
        t = -0.1 * e + t;
        let i = Math.min(Math.floor(this.L.a().a / 0.1), e),
          r = i + 1,
          n = 1;
        ((n = r < 0 ? ((1 & r) | (r >> 1)) + ((1 & r) | (r >> 1)) : r), Ve(this.ad, this.t, 1 / n));
        for (let t = 0; t < i; t++) this.x(0.1);
      }
      this.x(t);
    }
    x(t) {
      let e = new ls();
      if (t < 0) return;
      (this.d.T, this.U(e, t), this.i(t));
      let i = 0;
      for (; i < this.p.length; ) {
        let r = this.p[i];
        ((r.a = r.a + t),
          r.a > Math.max(this.L.j(r.b), 0.001)
            ? (this.am(i), i--)
            : this.at(r, t, e) || (this.am(i), i--),
          i++);
      }
    }
    U(t, e) {
      ((t.d = Ie()), (t.b = Ie()), (t.c = Ie()), (t.a = 0));
      let i = Ue(e, e, e),
        r = e * e * 0.5,
        n = Ue(r, r, r);
      Ge(t.d, this.d.B, i);
      let s = Ie();
      (this.L.h(s), Ge(t.b, s, i), Ge(t.c, s, n), (t.a = this.d.X * e));
    }
    i(t) {
      if (!this.J) return;
      if (!this.A) return;
      let e = this.L.k();
      for (this.I = this.I + t * e; this.I > 1; ) (this.P(t), (this.I -= 1));
    }
    P(t) {
      let e = this.V();
      if ((this.L.f(e, t), !(16 & this.d.T))) {
        let t = qi(e.d[0], e.d[1], e.d[2], 1),
          i = qi(e.g[0], e.g[1], e.g[2], 0);
        (tr(t, t, this.E),
          tr(i, i, this.E),
          Oe(e.d, t),
          Oe(e.g, i),
          8192 & this.d.T && (e.d[2] = 0));
      }
      if (64 & this.d.T) {
        let t = 1 + this.L.a().b * this.S.d(),
          i = Ie();
        (Ve(i, this.s, t), We(e.g, e.g, i));
      }
      if (this.aj >= 2)
        for (let t = 0; t < 2; t++) {
          ((e.c[t][0] = this.S.a()), (e.c[t][1] = this.S.a()));
          let i = jr();
          (Kr(i, this.d.n[t], this.S.d()), qr(e.e[t], i, this.d.Y[t]));
        }
    }
    V() {
      let t = new is();
      return (this.p.push(t), t);
    }
    am(t) {
      this.p.splice(t, 1);
    }
    at(t, e, i) {
      if (this.aj >= 2)
        for (let i = 0; i < 2; i++) {
          let r = t.c[i][0] + e * t.e[i][0];
          ((t.c[i][0] = r - Math.floor(r)),
            (r = t.c[i][1] + e * t.e[i][1]),
            (t.c[i][1] = r - Math.floor(r)));
        }
      (We(t.g, t.g, i.d), 16384 & this.d.T && 2 * e < t.a && We(t.d, t.d, this.ad));
      let r = Ue(e, e, e),
        n = Ie();
      if (
        (Ge(n, t.g, r),
        We(t.g, t.g, i.b),
        Ve(t.g, t.g, 1 - i.a),
        We(t.d, t.d, n),
        We(t.d, t.d, i.c),
        2 == this.d.z && 128 & this.d.T)
      ) {
        let e = Ie();
        if ((Oe(e, t.d), 16 & this.d.T)) {
          if ($e(e, n) > 0) return !1;
        } else {
          let i = Ie();
          if ((mi(i, this.E), Ne(e, t.d, i), $e(e, n) > 0)) return !1;
        }
      }
      return !0;
    }
    e(t) {
      if (((this.Z.length = 0), 0 == this.p.length && null != this.L)) return;
      (hi(this.T, t), $r(Yr(), t), this.M(null, t));
      let e = 0;
      for (let t = 0; t < this.p.length; t++) {
        let i = this.p[t],
          r = new hs();
        if (
          (this.G(i, r) &&
            (131072 & this.d.T && (this.v(i, r), e++), 262144 & this.d.T && (this.D(i, r), e++)),
          e >= os)
        )
          break;
      }
      this.c = e;
    }
    M(t, e) {
      var i, r, n;
      (16 & this.d.T ? ui(this.ao, e, this.E) : null != t ? ui(this.ao, e, t) : si(this.ao, e),
        mi(this.ar, e),
        4096 & this.d.T &&
          ($r(this.X, this.ao),
          16 & this.d.T &&
            Math.abs(this.f) > 0 &&
            ((i = this.X),
            (r = this.X),
            (n = 1 / this.f),
            (i[0] = r[0] * n),
            (i[1] = r[1] * n),
            (i[2] = r[2] * n),
            (i[3] = r[3] * n),
            (i[4] = r[4] * n),
            (i[5] = r[5] * n),
            (i[6] = r[6] * n),
            (i[7] = r[7] * n),
            (i[8] = r[8] * n)),
          He(this.u, this.X[6], this.X[7], this.X[8]),
          Xe(this.u) <= 2.3841858e-7 ? He(this.u, 0, 0, 1) : Ye(this.u, this.u)));
    }
    ac(t) {
      let e = 0,
        i = 0;
      if (0 != this.d.w || 0 != this.d.A) {
        let r = new Jn(t.b);
        ((e = 0 == this.d.Q ? this.d.w : this.d.w + r.d() * this.d.Q),
          (i = 0 == this.d.A ? this.d.M : this.d.M + r.d() * this.d.A));
      } else ((e = this.d.w), (i = this.d.M));
      return { deltaSpin: i, baseSpin: e };
    }
    G(t, e) {
      let i = this.d.e,
        r = this.d.s,
        n = r[0],
        s = r[1] - n,
        a = 0,
        o = t.b,
        l = t.a;
      if (((i < 1 || 0 != s) && (a = 127 & (l * this.d.k + o)), i < ss[a])) return 0;
      this.av(t, e, o);
      let h = s * ss[a] + n;
      (Kr(e.c.d, e.c.d, h), 32 & this.d.T && Kr(e.c.d, e.c.d, this.f));
      let u = qi(t.d[0], t.d[1], t.d[2], 1);
      return (tr(u, u, this.ao), Oe(e.b, u), (e.a = 1), 1);
    }
    av(t, e, i) {
      let r = t.a / this.L.b(),
        n = new Jn(i);
      Math.min(r, 1) <= 0 ? (r = 0) : r >= 1 && (r = 1);
      let s = Ue(255, 255, 255),
        a = zr(1, 1),
        o = 1,
        l = e.c;
      (this.d.O.d(r, s, l.a, this.ah),
        this.ah || Ve(l.a, l.a, 1 / 255),
        this.d.c.d(r, a, l.d),
        (l.b = this.d.d.d(r, 32767) / 32767),
        this.ai ? (l.e = this.ai.a.d(r, 0) / 32767) : (l.e = 0));
      let h = 0;
      (this.d.C.a.length > 0
        ? ((o = 0), (l.f = this.d.C.d(r, o)), (l.f = this.H & (l.f + this.Q)))
        : 65536 & this.d.T
          ? ((h = (this.H + 1) * n.f()), (l.f = (h / 4294967296) | 0))
          : (l.f = 0),
        (o = 0),
        (l.c = this.d.P.d(r, o)),
        (l.c = (l.c + this.Q) & this.H));
      let u = 1;
      (524288 & this.d.T
        ? ((u = Math.max(1 + n.d() * this.d.V[1], 99999997e-12)),
          (l.d[0] = Math.max(1 + n.d() * this.d.V[0], 99999997e-12) * l.d[0]))
        : ((u = Math.max(1 + n.d() * this.d.V[0], 99999997e-12)), (l.d[0] = u * l.d[0])),
        (l.d[1] = u * l.d[1]));
    }
    v(t, e) {
      let i = zr((e.c.f & this.al) * this.B, (e.c.f >> this.g) * this.K),
        r = 0,
        n = 0,
        s = this.ac(t);
      ((r = s.baseSpin), (n = s.deltaSpin));
      let a = 0,
        o = Ue(0, 0, 0),
        l = Ue(0, 0, 0),
        h = !1,
        u = !1;
      if (4 & this.d.T && Xe(t.g) > 2.3841858e-7)
        if (((a = 1), 4096 & this.d.T)) h = !0;
        else {
          let i = qi(-t.g[0], -t.g[1], -t.g[2], 0);
          tr(i, i, this.ao);
          let r = Ie();
          Oe(r, i);
          let n = 0,
            s = Xe(r);
          n = s <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(s);
          let a = Ie();
          (Oe(a, r),
            Ve(a, a, n),
            Oe(o, a),
            Ve(o, o, e.c.d[0]),
            (l = Ue(a[1], -a[0], 0)),
            Ve(l, l, e.c.d[1]),
            (u = !0),
            (h = !1));
        }
      if ((4096 & this.d.T || h) && !u) {
        let i = Yr();
        ((c = i),
          (d = this.X),
          (c[0] = d[0]),
          (c[1] = d[1]),
          (c[2] = d[2]),
          (c[3] = d[3]),
          (c[4] = d[4]),
          (c[5] = d[5]),
          (c[6] = d[6]),
          (c[7] = d[7]),
          (c[8] = d[8]));
        let s = e.c.d[0];
        if (a) {
          let r = 0,
            n = Ue(-t.g[0], -t.g[1], -t.g[2]),
            a = Xe(n);
          ((r = a <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(a)),
            Jr(
              i,
              this.X,
              (function (t, e, i, r, n, s, a, o, l) {
                var h = new Pe(9);
                return (
                  (h[0] = t),
                  (h[1] = e),
                  (h[2] = i),
                  (h[3] = r),
                  (h[4] = n),
                  (h[5] = s),
                  (h[6] = a),
                  (h[7] = o),
                  (h[8] = l),
                  h
                );
              })(n[0] * r, n[1] * r, 0, -n[1] * r, n[0] * r, 0, 0, 0, 1),
            ),
            r > 2.3841858e-7 && (s = e.c.d[0] * (1 / Math.sqrt(Xe(t.g)) / r)));
        }
        if (
          (this.aj,
          He(o, i[0], i[1], i[2]),
          Ve(o, o, s),
          He(l, i[3], i[4], i[5]),
          Ve(l, l, e.c.d[1]),
          (n = l[0]),
          (u = !0),
          0 != this.d.M || 0 != this.d.A)
        ) {
          let e = r + n * t.a;
          512 & this.d.T && 1 & t.b && (e = -e);
          let i = Ie();
          (Oe(i, this.u), this.aj);
          let s = Yr(),
            a = Qr();
          (Zr(a, i, e),
            (function (t, e) {
              var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                a = i + i,
                o = r + r,
                l = n + n,
                h = i * a,
                u = r * a,
                c = r * o,
                d = n * a,
                f = n * o,
                g = n * l,
                p = s * a,
                m = s * o,
                b = s * l;
              ((t[0] = 1 - c - g),
                (t[3] = u - b),
                (t[6] = d + m),
                (t[1] = u + b),
                (t[4] = 1 - h - g),
                (t[7] = f - p),
                (t[2] = d - m),
                (t[5] = f + p),
                (t[8] = 1 - h - c));
            })(s, a),
            ti(o, o, s),
            He(l, n, l[1], l[2]),
            ti(l, l, s));
        }
      }
      var c, d;
      if (!u)
        if (0 != this.d.M || 0 != this.d.A) {
          let i = r + n * t.a;
          512 & this.d.T && 1 & t.b && (i = -i);
          let s = Math.cos(i),
            a = Math.sin(i);
          (He(o, s, a, 0),
            Ve(o, o, e.c.d[0]),
            He(l, -a, s, 0),
            Ve(l, l, e.c.d[1]),
            134217728 & this.d.T && We(e.b, e.b, Ue(l[0], l[1], 0)));
        } else (He(o, e.c.d[0], 0, 0), He(l, 0, e.c.d[1], 0));
      return (this.au(o, l, e.b, e.c.a, e.c.b, e.c.e, i[0], i[1], t.c), 0);
    }
    D(t, e) {
      let i = zr((e.c.c & this.al) * this.B, (e.c.c >> this.g) * this.K),
        r = Ue(0, 0, 0),
        n = Ue(0, 0, 0),
        s = this.d.p;
      1024 & this.d.T && (s = Math.min(t.a, s));
      let a = Vi();
      (Ve(a, t.g, -1), (a[3] = 0), tr(a, a, this.ao), Ve(a, a, s));
      let o = Ue(a[0], a[1], 0);
      if ($e(o, o) > 1e-4) {
        let t = 1 / Le(o);
        (Kr(e.c.d, e.c.d, t),
          Xr(o, o, e.c.d),
          (n = Ue(-o[1], o[0], 0)),
          Ve(r, a, 0.5),
          We(e.b, e.b, r));
      } else ((r = Ue(0.05 * e.c.d[0], 0, 0)), (n = Ue(0, 0.05 * e.c.d[1], 0)));
      return (this.au(r, n, e.b, e.c.a, e.c.b, e.c.e, i[0], i[1], t.c), 1);
    }
    au(t, e, i, r, n, s, a, o, l) {
      const h = [-1, -1, 1, 1],
        u = [1, -1, 1, -1],
        c = [0, 0, 1, 1],
        d = [0, 1, 0, 1];
      let f = Ie(),
        g = jr(),
        p = jr(),
        m = jr();
      for (let b = 0; b < 4; b++)
        (He(f, 0, 0, 0),
          qe(f, f, t, h[b]),
          qe(f, f, e, u[b]),
          We(f, f, i),
          Vr(g, c[b] * this.B + a, d[b] * this.K + o),
          Vr(p, c[b] * this.d.x[0] + l[0][0], d[b] * this.d.x[0] + l[0][1]),
          Vr(m, c[b] * this.d.x[1] + l[1][0], d[b] * this.d.x[1] + l[1][1]),
          this.Z.push(f[0]),
          this.Z.push(f[1]),
          this.Z.push(f[2]),
          this.Z.push(r[0]),
          this.Z.push(r[1]),
          this.Z.push(r[2]),
          this.Z.push(n),
          this.Z.push(g[0]),
          this.Z.push(g[1]),
          this.Z.push(p[0]),
          this.Z.push(p[1]),
          this.Z.push(m[0]),
          this.Z.push(m[1]),
          this.Z.push(s));
    }
  };
  class fs {
    constructor() {
      ((this.a = Ie()), (this.c = Vi()), (this.b = jr()));
    }
  }
  class gs {}
  const ps = [0, 1, 2, 10, 3, 4, 5, 13];
  function ms(t, e) {
    return Ue(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2]);
  }
  const bs = class {
    constructor(t, e) {
      ((this.aj = t),
        (this.s = e),
        (this.ak = Ie()),
        (this.c = Ie()),
        (this.K = new gs()),
        (this.ae = Ie()),
        (this.v = Ie()),
        (this.ac = Ie()),
        (this.o = Ie()),
        (this.av = Ie()),
        (this.J = Ie()),
        (this.R = Ie()),
        (this.B = Ie()),
        (this.e = Ie()),
        (this.b = Ie()),
        (this.aa = Ie()),
        (this.a = Ie()),
        (this.E = Ie()),
        (this.G = t.aF.context),
        (this.g = new Array(e.h.length)),
        (this.ab = new Array(e.h.length)));
      for (let i = 0; i < e.h.length; i++) this.ab[i] = t.r.V[e.h[i]];
      let i = qi(255, 255, 255, 255),
        r = new gs();
      ((r.a = 0),
        (r.b = 0),
        (r.c = 1),
        (r.d = 1),
        this.d(e.e, e.b, i, r, e.m, e.j),
        this.t(e.q),
        this.Y(!1));
    }
    Y(t) {
      ((this.h = t), this.h || (this.X = !1));
    }
    t(t) {
      this.u = t;
    }
    U() {
      return this.n == this.S;
    }
    ad(t) {
      this.O = t;
    }
    ao(t) {
      this.q = t;
    }
    at(t) {
      this.l[3] = Math.max(t, 0);
    }
    Z() {
      let t = Ie();
      ii(t, this.ak, this.E);
      let e = Xe(t);
      (Ve(t, this.ae, this.O),
        Ne(this.R, this.ak, t),
        Ve(t, this.v, this.O),
        Ne(this.B, this.E, t),
        Ve(t, this.ae, this.q),
        We(this.e, this.ak, t),
        Ve(t, this.v, this.q),
        We(this.b, this.E, t),
        Ve(this.av, this.ac, e),
        Ve(this.J, this.o, e));
    }
    w(t, e, i) {
      let r;
      if (this.am && this.h) {
        r = t;
        let i = Ie();
        (mi(i, r),
          We(i, i, e),
          Oe(this.c, e),
          this.X
            ? (Oe(this.ak, this.E), Oe(this.ac, this.o), Oe(this.ae, this.v))
            : (Oe(this.ak, i),
              (this.ac = ms(r, 2)),
              (this.ae = ms(r, 1)),
              (this.M = 0),
              (this.X = !0)),
          (this.E = i),
          (this.o = ms(r, 2)),
          (this.v = ms(r, 1)));
      }
    }
    ap(t) {
      var e = Yr();
      ($r(e, t),
        (this.ac = ti(this.ac, this.ac, e)),
        (this.ae = ti(this.ae, this.ae, e)),
        (this.o = ti(this.o, this.o, e)),
        (this.v = ti(this.v, this.v, e)),
        (this.ak = Ze(this.ak, this.ak, t)),
        (this.E = Ze(this.E, this.E, t)));
      for (var i = 0; i < this.y.length; i++) Ze(this.y[i].a, this.y[i].a, t);
    }
    D(t, e, i) {
      ((this.l[2] = i), (this.l[1] = e), (this.l[0] = t));
    }
    F(t) {
      if (this.an != t) {
        this.an = t;
        let e = t % this.i,
          i = e;
        2147483648 & e && (i = ((1 & e) | (e >> 1)) + ((1 & e) | (e >> 1)));
        let r = i * this.j + this.ar.b;
        this.K.b = r;
        let n = t / this.i,
          s = n;
        2147483648 & n && ((n = (1 & n) | (n >> 1)), (s = n + n), (r = this.K.b));
        let a = s * this.ai + this.ar.a;
        ((this.K.a = a), (this.K.d = r + this.j), (this.K.c = a + this.ai));
      }
    }
    k(t, e, i) {
      let r,
        n = this.y[2 * this.S],
        s = this.y[2 * this.S + 1],
        a = Ie();
      (Ve(a, this.J, 1 - e),
        Ne(a, this.B, a),
        Ve(n.a, a, e),
        Ve(a, this.av, e),
        We(a, this.R, a),
        Ve(a, a, 1 - e),
        We(n.a, n.a, a),
        Ve(a, this.J, 1 - e),
        Ne(a, this.b, a),
        Ve(s.a, a, e),
        Ve(a, this.av, e),
        We(a, this.e, a),
        Ve(a, a, 1 - e),
        We(s.a, s.a, a),
        (this.N[this.S] = t),
        (r = i),
        (this.S = this.S + r),
        this.S >= this.N.length && (this.S -= this.N.length));
    }
    x(t, e) {
      if (this.aj.G) return;
      let i = Ie(),
        r = 1;
      ((i = this.s.i.g(t, this.aj.k, i)),
        (r = this.s.p.g(t, this.aj.k)),
        this.D(i[0], i[1], i[2]),
        this.at(r / 32767));
      let n = this.s.k.g(t, this.aj.k);
      this.ao(n);
      let s = this.s.g.g(t, this.aj.k);
      this.ad(s);
      let a = this.s.r.g(t, this.aj.k);
      this.F(a);
      let o = this.s.c.g(t, this.aj.k, 1);
      this.Y(0 != o);
      let l = ni();
      (Fi(l, this.aj.s, this.aj.ah[this.s.l].p), ci(l, l, this.s.o));
      let h = Ie();
      (this.w(l, h, null), this.C(e, !1));
    }
    C(t, e) {
      let i,
        r,
        n,
        s,
        a,
        o,
        l,
        h,
        u,
        c,
        d,
        f,
        g,
        p,
        m,
        b,
        y,
        F,
        S,
        v,
        T,
        C,
        x,
        A,
        _,
        w,
        E,
        D,
        M,
        k,
        B,
        R,
        P,
        I,
        L,
        U,
        O,
        H,
        W,
        N,
        G,
        j,
        z,
        V,
        q,
        X,
        K,
        Y;
      for (
        this.al || (this.P > 0 && (t = 1 / this.P + 99999997e-12)),
          t >= 0 ? this.z <= t && (t = this.z) : (t = 0),
          F = this.n;
        F != this.S && !(t + this.N[F] <= this.z);
        F = this.n
      )
        this.n = this.p(this.n, 1);
      if (!e && this.am && this.h && this.X) {
        ((B = t * this.P + this.M), (Y = this.l), this.Z());
        let e = !1;
        if (
          ((I = 0),
          B < 1
            ? (e = !0)
            : ((K = this.M),
              (P = 1 / (B - K)),
              (y = Math.floor(B - 1)),
              (I = Math.ceil(Math.max(y, 0)))),
          -1 == I || e)
        );
        else
          for (
            R = 1, F = 1;
            (k = this.S),
              (H = this.y.length),
              (this.y[2 * k].c = Y),
              (S = 2 * this.S + 1),
              (W = this.y.length),
              (this.y[S].c = Y),
              this.k((F - K) * P * -t, (F - K) * P, 1),
              -1 != --I;
            F = R
          )
            ((R += 1), (K = this.M));
        ((v = Math.floor(B)),
          (this.M = B - v),
          this.k(0, 1, 0),
          (M = this.S),
          (N = this.y.length),
          (T = this.y[2 * M]),
          (C = this.K.b),
          (T.b[1] = this.K.a),
          (T.b[0] = C),
          (x = 2 * this.S + 1),
          (G = this.y.length),
          (A = this.y[x]),
          (_ = this.K.b),
          (A.b[1] = this.K.c),
          (A.b[0] = _),
          (D = this.S),
          (j = this.y.length),
          (this.y[2 * D].c = Y),
          (w = 2 * this.S + 1),
          (z = this.y.length),
          (this.y[w].c = Y));
      }
      ((this.aa[2] = 34028235e31),
        (this.aa[1] = 34028235e31),
        (this.aa[0] = 34028235e31),
        (this.a[2] = -34028235e31),
        (this.a[1] = -34028235e31),
        (this.a[0] = -34028235e31),
        (L = this.n));
      for (let e = this.n; e != this.S; L = e)
        ((b = 2 * e),
          (X = this.y.length),
          (E = L),
          (O = this.y[2 * e]),
          (i = b + 1),
          (r = this.y[2 * e + 1]),
          (n = (this.u + this.u) * this.N[E] * t + t * this.u * t),
          (O.a[2] = O.a[2] + n),
          (r.a[2] = n + r.a[2]),
          (s = O.a[0]),
          (a = this.aa[0]),
          a > O.a[0] && ((a = O.a[0]), (this.aa[0] = s), (s = O.a[0])),
          (o = O.a[1]),
          (l = this.aa[1]),
          l > o && ((l = O.a[1]), (this.aa[1] = o), (o = O.a[1])),
          (h = O.a[2]),
          (u = this.aa[2]),
          u > h && ((u = O.a[2]), (this.aa[2] = h), (h = O.a[2])),
          s > this.a[0] && (this.a[0] = s),
          o > this.a[1] && (this.a[1] = o),
          h > this.a[2] && (this.a[2] = h),
          (c = r.a[0]),
          a > r.a[0] && ((this.aa[0] = c), (c = r.a[0])),
          (d = r.a[1]),
          l > d && ((this.aa[1] = d), (d = r.a[1])),
          (f = r.a[2]),
          u > f && ((this.aa[2] = f), (f = r.a[2])),
          c > this.a[0] && (this.a[0] = c),
          d > this.a[1] && (this.a[1] = d),
          f > this.a[2] && (this.a[2] = f),
          (V = this.N.length),
          (this.N[E] = t + this.N[E]),
          (g = this.j),
          (q = this.N.length),
          (p = g * this.N[E] * this.as + this.K.b),
          (O.b[1] = this.K.a),
          (O.b[0] = p),
          (r.b[1] = this.K.c),
          (r.b[0] = p),
          (m = this.N.length),
          (U = L + 1),
          (e = U - m),
          m > U && (e = U));
      this.al = !0;
    }
    p(t, e) {
      let i = e + t;
      t = i;
      let r = this.N.length;
      return (i >= r && (t = i - r), t);
    }
    d(t, e, i, r, n, s) {
      let a, o, l, h, u, c, d, f;
      ((d = Math.ceil(t)),
        (f = Math.max(0.25, e)),
        (a = Math.ceil(f * d)),
        (o = Math.ceil(Math.max(a + 1 + 1, 0))),
        (this.N = new Array(o)),
        (this.n = 0),
        (this.S = 0),
        (this.M = 0),
        (this.X = !1),
        (this.y = new Array(2 * o)));
      for (let t = 0; t < this.y.length; t++) {
        this.y[t] = new fs();
        let e = this.y[t];
        ((e.a[0] = 0),
          (e.a[1] = 0),
          (e.a[2] = 0),
          (e.c = qi(0, 0, 0, 0)),
          (e.b[0] = 0),
          (e.b[1] = 0));
      }
      this.I = new Array(4 * o);
      for (let t = 0; t < this.I.length; t++) this.I[t] = t % (2 * o);
      ((this.as = 1 / f),
        (l = s),
        2147483648 & s && (l = ((1 & s) | (s >> 1)) + ((1 & s) | (s >> 1))),
        (this.j = (r.d - r.b) / l),
        (h = n),
        2147483648 & n && (h = ((1 & n) | (n >> 1)) + ((1 & n) | (n >> 1))),
        (this.ai = (r.c - r.a) / h),
        (this.aq = 1 / this.j),
        (this.A = 1 / this.ai),
        (this.P = d),
        (this.z = f),
        Ji(i, i, 1 / 255),
        (this.l = i),
        (this.ar = r),
        (this.L = n),
        (this.i = s),
        (this.an = 0),
        (u = 0 * this.j + this.ar.b),
        (this.K.b = u),
        (c = 0 * this.ai + this.ar.a),
        (this.K.a = c),
        (this.K.d = u + this.j),
        (this.K.c = c + this.ai),
        (this.q = 10),
        (this.O = 10),
        (this.u = 0),
        (this.am = !0),
        (this.h = !0),
        (this.ah = !0),
        (this.ag = this.aj.t.o(0)),
        (this.au = this.aj.t.f(0)),
        (this.af = this.aj.t.k(this.ag, this.au)));
    }
    f() {
      let t = new Array(this.y.length);
      for (let e = 0, i = 0; e < this.y.length; ++e)
        ((t[i++] = this.y[e].a[0]),
          (t[i++] = this.y[e].a[1]),
          (t[i++] = this.y[e].a[2]),
          (t[i++] = this.y[e].c[0]),
          (t[i++] = this.y[e].c[1]),
          (t[i++] = this.y[e].c[2]),
          (t[i++] = this.y[e].c[3]),
          (t[i++] = this.y[e].b[0]),
          (t[i++] = this.y[e].b[1]));
      this.U() || (this.ag.b(new Float32Array(t)), this.au.b(new Uint16Array(this.I)));
    }
    V(t) {
      const e = this.aj.t;
      var i = this.s.n[t];
      if (i <= -1 || i > this.aj.V.length) return null;
      let r = this.aj.V[i];
      if (!r.c || !r.c.f) return null;
      let n = t;
      n >= this.s.h.length && (n = 0);
      let s = this.aj.r.V[this.s.h[n]],
        a = Object.assign({}, this.aj.aP);
      const o = e.m(this.aj.ap, new rs(!1, !this.aj.aO, ps[s.c], !0, !1, 15), new Ri([r.c], a));
      return e.h(new ns(this.af, 0, 0), o, 0, 0);
    }
    m(t) {
      if (this.U()) return;
      const e = this.aj.t.b();
      for (let i = 0; i < this.s.n.length; i++) {
        if ((this.g[i] || (this.g[i] = this.V(i)), !this.g[i])) continue;
        if (!t && this.g[i].c.b() > Sr.GxBlend_AlphaKey) continue;
        let r =
          this.S > this.n ? 2 * (this.S - this.n) + 2 : 2 * (this.N.length + this.S - this.n) + 2;
        ((this.g[i].h = r), (this.g[i].d = 2 * this.n * 2), e.a(this.g[i]));
      }
    }
  };
  const ys = class {
    constructor(t) {
      var e = this;
      ((e.a = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
        (e.i = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
        (e.g = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
        (e.e = qi(t.getFloat(), t.getFloat(), t.getFloat(), 0)),
        (e.f = t.getFloat()),
        (e.d = t.getFloat()),
        (e.c = t.getFloat()),
        (e.h = t.getFloat()));
    }
    b() {
      var t = this;
      ((t.a = null), (t.e = null), (t.i = null), (t.g = null));
    }
  };
  const Fs = class {
    constructor(t) {
      ((this.a = t.skinSectionId),
        (this.j = t.level),
        (this.c = t.vertexStart + (t.level << 16)),
        (this.f = t.vertexCount),
        (this.i = t.indexStart + (t.level << 16)),
        (this.g = t.indexCount),
        (this.e = t.centerBoneIndex),
        (this.b = Ue(t.centerPosition[0], t.centerPosition[1], t.centerPosition[2])),
        (this.d = Ue(t.sortCenterPosition[0], t.sortCenterPosition[1], t.sortCenterPosition[2])),
        (this.k = t.sortRadius));
    }
    h() {
      ((this.b = null), (this.d = null));
    }
  };
  const Ss = class {
    constructor(t) {
      ((this.a = t.getUint16()), (this.c = t.getUint16()));
    }
    static b(t) {
      const e = t.s.r,
        i = t.a;
      (e.V && i.k < e.V.length ? (t.g = e.V[i.k]) : (t.g = { a: 0, c: 0 }),
        (t.v = !!(1 & t.g.a)),
        (t.l = !(4 & t.g.a)),
        (t.p = !!(16 & t.g.a)));
    }
  };
  const vs = class {
    constructor(t, e) {
      ((this.b = jn(t, e, !1)),
        (this.a = (function (t, e, i = !0) {
          return _n.h(t, e, En, Pn, i);
        })(t, e, !1)),
        (this.d = jn(t, e, !1)));
    }
    c() {
      var t = this;
      (t.b && (t.b.i(), (t.b = null)),
        t.a && (t.a.i(), (t.a = null)),
        t.d && (t.d.i(), (t.d = null)));
    }
  };
  const Ts = class {
    constructor(t) {
      var e = this;
      ((e.c = t.getInt32()),
        (e.a = t.getInt32()),
        (e.b = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
        (e.d = -1),
        (t.position += 20));
    }
    e() {
      this.b = null;
    }
  };
  const Cs = class {
    constructor(t, e) {
      ((this.c = jn(t, e, !1)), (this.a = zn(t, e, !1)));
    }
    e() {
      var t = this;
      (t.c && t.c.i(), t.a && t.a.i());
    }
    b(t) {
      return !!this.c && this.c.d(t);
    }
    g(t) {
      return !!this.a && this.a.d(t);
    }
    f(t) {
      return this.b(t) || this.g(t);
    }
    d(t, e, i) {
      var r = this;
      i ? (i[0] = i[1] = i[2] = i[3] = 1) : (i = qi(1, 1, 1, 1));
      let n = Ue(1, 1, 1);
      return (
        r.b(t.a.a) && r.c.g(t, e, n, n),
        r.g(t.a.a) && (i[3] = r.a.g(t, e, 32767) / 32767),
        (i[0] = n[0]),
        (i[1] = n[1]),
        (i[2] = n[2]),
        i
      );
    }
  };
  const xs = class {
    constructor(t, e) {
      this.c = zn(t, e, !1);
    }
    d() {
      (this.c.i(), (this.c = null));
    }
    b(t) {
      return this.c.d(t);
    }
    a(t, e) {
      var i = 1;
      this.b(t.a.a) && (i = this.c.g(t, e, i) / 32767);
      return (i > 1 ? (i = 1) : i < 0 && (i = 0), i);
    }
  };
  const As = class {
    constructor(t, e) {
      var i = this;
      ((i.d = t.getFloat()), (i.c = t.getFloat()), (i.b = t.getFloat()), (i.a = Xn(t, e)));
    }
  };
  function _s(t, e, i) {
    return (
      (!!(t & (1 << (e + i))) ? -1 : 1) *
      (((t & (~(-1 << e) << i)) >> i) + (t & ~(-1 << i)) / (1 << i))
    );
  }
  const ws = class {
      constructor(t, e) {
        ((this.R = t.getUint32()),
          (this.T = t.getUint32()),
          (this.J = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.Z = t.getUint16()),
          (this.G = t.getUint16()),
          268435456 & this.T &&
            ((this.v = [0, 0, 0]),
            (this.v[0] = 31 & this.G),
            (this.v[1] = (this.G >> 5) & 31),
            (this.v[2] = (this.G >> 10) & 31)),
          (t.position += 16),
          (this.r = t.getUint8()),
          (this.z = t.getUint8()),
          (this.q = t.getUint16()));
        const i = t.getUint8(),
          r = t.getUint8();
        ((this.o = t.getUint16()),
          (this.aa = t.getUint16()),
          (this.h = t.getUint16()),
          (this.F = Vn(t, e, !1)),
          (this.f = Vn(t, e, !1)),
          (this.L = Vn(t, e, !1)),
          (this.l = Vn(t, e, !1)),
          (this.D = Vn(t, e, !1)),
          (this.I = Vn(t, e, !1)),
          (this.W = t.getFloat()),
          (this.U = Vn(t, e, !1)),
          (this.i = t.getFloat()),
          (this.m = Vn(t, e, !1)),
          (this.S = Vn(t, e, !1)),
          (this.u = Vn(t, e, !1)),
          (this.O = (function (t, e) {
            return An(t, e, Wn, Rn);
          })(t, e.chunkData)),
          (this.d = Xn(t, e.chunkData)),
          (this.c = (function (t, e) {
            return An(t, e, Hn, Gn);
          })(t, e.chunkData)),
          (this.V = [t.getFloat(), t.getFloat()]),
          (this.C = Xn(t, e.chunkData)),
          (this.P = Xn(t, e.chunkData)),
          (this.p = t.getFloat()),
          (this.k = t.getFloat()),
          (this.e = t.getFloat()),
          (this.s = [t.getFloat(), t.getFloat()]),
          (this.t = t.getFloat()),
          (this.X = t.getFloat()),
          (this.w = t.getFloat()),
          (this.Q = t.getFloat()),
          (this.M = t.getFloat()),
          (this.A = t.getFloat()),
          (this.E = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.j = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.B = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.K = t.getFloat()),
          (this.y = t.getFloat()),
          (this.H = t.getFloat()),
          (this.b = t.getFloat()),
          (this.g = t.getFloat()));
        const n = t.getInt32(),
          s = t.getInt32();
        if (n > 0) {
          const t = new cn(e.chunkData);
          ((t.position = s), (this.N = new Array(n)));
          for (var a = 0; a < n; a++) this.N[a] = Ue(t.getFloat(), t.getFloat(), t.getFloat());
        } else this.N = [];
        this.a = qn(t, e, !1);
        const o = t.getUint16(),
          l = t.getUint16(),
          h = t.getUint16(),
          u = t.getUint16(),
          c = t.getUint16(),
          d = t.getUint16(),
          f = t.getUint16(),
          g = t.getUint16();
        ((this.x = zr(_s(i, 2, 5), _s(r, 2, 5))),
          (this.Y = [zr(_s(o, 6, 9), _s(l, 6, 9)), zr(_s(h, 6, 9), _s(u, 6, 9))]),
          (this.n = [zr(_s(c, 6, 9), _s(d, 6, 9)), zr(_s(f, 6, 9), _s(g, 6, 9))]));
      }
    },
    Es = {
      0: "Stand",
      1: "Death",
      2: "Spell",
      3: "Stop",
      4: "Walk",
      5: "Run",
      6: "Dead",
      7: "Rise",
      8: "StandWound",
      9: "CombatWound",
      10: "CombatCritical",
      11: "ShuffleLeft",
      12: "ShuffleRight",
      13: "Walkbackwards",
      14: "Stun",
      15: "HandsClosed",
      16: "AttackUnarmed",
      17: "Attack1H",
      18: "Attack2H",
      19: "Attack2HL",
      20: "ParryUnarmed",
      21: "Parry1H",
      22: "Parry2H",
      23: "Parry2HL",
      24: "ShieldBlock",
      25: "ReadyUnarmed",
      26: "Ready1H",
      27: "Ready2H",
      28: "Ready2HL",
      29: "ReadyBow",
      30: "Dodge",
      31: "SpellPrecast",
      32: "SpellCast",
      33: "SpellCastArea",
      34: "NPCWelcome",
      35: "NPCGoodbye",
      36: "Block",
      37: "JumpStart",
      38: "Jump",
      39: "JumpEnd",
      40: "Fall",
      41: "SwimIdle",
      42: "Swim",
      43: "SwimLeft",
      44: "SwimRight",
      45: "SwimBackwards",
      46: "AttackBow",
      47: "FireBow",
      48: "ReadyRifle",
      49: "AttackRifle",
      50: "Loot",
      51: "ReadySpellDirected",
      52: "ReadySpellOmni",
      53: "SpellCastDirected",
      54: "SpellCastOmni",
      55: "BattleRoar",
      56: "ReadyAbility",
      57: "Special1H",
      58: "Special2H",
      59: "ShieldBash",
      60: "EmoteTalk",
      61: "EmoteEat",
      62: "EmoteWork",
      63: "EmoteUseStanding",
      64: "EmoteTalkExclamation",
      65: "EmoteTalkQuestion",
      66: "EmoteBow",
      67: "EmoteWave",
      68: "EmoteCheer",
      69: "EmoteDance",
      70: "EmoteLaugh",
      71: "EmoteSleep",
      72: "EmoteSitGround",
      73: "EmoteRude",
      74: "EmoteRoar",
      75: "EmoteKneel",
      76: "EmoteKiss",
      77: "EmoteCry",
      78: "EmoteChicken",
      79: "EmoteBeg",
      80: "EmoteApplaud",
      81: "EmoteShout",
      82: "EmoteFlex",
      83: "EmoteShy",
      84: "EmotePoint",
      85: "Attack1HPierce",
      86: "Attack2HLoosePierce",
      87: "AttackOff",
      88: "AttackOffPierce",
      89: "Sheath",
      90: "HipSheath",
      91: "Mount",
      92: "RunRight",
      93: "RunLeft",
      94: "MountSpecial",
      95: "Kick",
      96: "SitGroundDown",
      97: "SitGround",
      98: "SitGroundUp",
      99: "SleepDown",
      100: "Sleep",
      101: "SleepUp",
      102: "SitChairLow",
      103: "SitChairMed",
      104: "SitChairHigh",
      105: "LoadBow",
      106: "LoadRifle",
      107: "AttackThrown",
      108: "ReadyThrown",
      109: "HoldBow",
      110: "HoldRifle",
      111: "HoldThrown",
      112: "LoadThrown",
      113: "EmoteSalute",
      114: "KneelStart",
      115: "KneelLoop",
      116: "KneelEnd",
      117: "AttackUnarmedOff",
      118: "SpecialUnarmed",
      119: "StealthWalk",
      120: "StealthStand",
      121: "Knockdown",
      122: "EatingLoop",
      123: "UseStandingLoop",
      124: "ChannelCastDirected",
      125: "ChannelCastOmni",
      126: "Whirlwind",
      127: "Birth",
      128: "UseStandingStart",
      129: "UseStandingEnd",
      130: "CreatureSpecial",
      131: "Drown",
      132: "Drowned",
      133: "FishingCast",
      134: "FishingLoop",
      135: "Fly",
      136: "EmoteWorkNoSheathe",
      137: "EmoteStunNoSheathe",
      138: "EmoteUseStandingNoSheathe",
      139: "SpellSleepDown",
      140: "SpellKneelStart",
      141: "SpellKneelLoop",
      142: "SpellKneelEnd",
      143: "Sprint",
      144: "InFlight",
      145: "Spawn",
      146: "Close",
      147: "Closed",
      148: "Open",
      149: "Opened",
      150: "Destroy",
      151: "Destroyed",
      152: "Rebuild",
      153: "Custom0",
      154: "Custom1",
      155: "Custom2",
      156: "Custom3",
      157: "Despawn",
      158: "Hold",
      159: "Decay",
      160: "BowPull",
      161: "BowRelease",
      162: "ShipStart",
      163: "ShipMoving",
      164: "ShipStop",
      165: "GroupArrow",
      166: "Arrow",
      167: "CorpseArrow",
      168: "GuideArrow",
      169: "Sway",
      170: "DruidCatPounce",
      171: "DruidCatRip",
      172: "DruidCatRake",
      173: "DruidCatRavage",
      174: "DruidCatClaw",
      175: "DruidCatCower",
      176: "DruidBearSwipe",
      177: "DruidBearBite",
      178: "DruidBearMaul",
      179: "DruidBearBash",
      180: "DragonTail",
      181: "DragonStomp",
      182: "DragonSpit",
      183: "DragonSpitHover",
      184: "DragonSpitFly",
      185: "EmoteYes",
      186: "EmoteNo",
      187: "JumpLandRun",
      188: "LootHold",
      189: "LootUp",
      190: "StandHigh",
      191: "Impact",
      192: "LiftOff",
      193: "Hover",
      194: "SuccubusEntice",
      195: "EmoteTrain",
      196: "EmoteDead",
      197: "EmoteDanceOnce",
      198: "Deflect",
      199: "EmoteEatNoSheathe",
      200: "Land",
      201: "Submerge",
      202: "Submerged",
      203: "Cannibalize",
      204: "ArrowBirth",
      205: "GroupArrowBirth",
      206: "CorpseArrowBirth",
      207: "GuideArrowBirth",
      208: "EmoteTalkNoSheathe",
      209: "EmotePointNoSheathe",
      210: "EmoteSaluteNoSheathe",
      211: "EmoteDanceSpecial",
      212: "Mutilate",
      213: "CustomSpell01",
      214: "CustomSpell02",
      215: "CustomSpell03",
      216: "CustomSpell04",
      217: "CustomSpell05",
      218: "CustomSpell06",
      219: "CustomSpell07",
      220: "CustomSpell08",
      221: "CustomSpell09",
      222: "CustomSpell10",
      223: "StealthRun",
      224: "Emerge",
      225: "Cower",
      226: "Grab",
      227: "GrabClosed",
      228: "GrabThrown",
      229: "FlyStand",
      230: "FlyDeath",
      231: "FlySpell",
      232: "FlyStop",
      233: "FlyWalk",
      234: "FlyRun",
      235: "FlyDead",
      236: "FlyRise",
      237: "FlyStandWound",
      238: "FlyCombatWound",
      239: "FlyCombatCritical",
      240: "FlyShuffleLeft",
      241: "FlyShuffleRight",
      242: "FlyWalkbackwards",
      243: "FlyStun",
      244: "FlyHandsClosed",
      245: "FlyAttackUnarmed",
      246: "FlyAttack1H",
      247: "FlyAttack2H",
      248: "FlyAttack2HL",
      249: "FlyParryUnarmed",
      250: "FlyParry1H",
      251: "FlyParry2H",
      252: "FlyParry2HL",
      253: "FlyShieldBlock",
      254: "FlyReadyUnarmed",
      255: "FlyReady1H",
      256: "FlyReady2H",
      257: "FlyReady2HL",
      258: "FlyReadyBow",
      259: "FlyDodge",
      260: "FlySpellPrecast",
      261: "FlySpellCast",
      262: "FlySpellCastArea",
      263: "FlyNPCWelcome",
      264: "FlyNPCGoodbye",
      265: "FlyBlock",
      266: "FlyJumpStart",
      267: "FlyJump",
      268: "FlyJumpEnd",
      269: "FlyFall",
      270: "FlySwimIdle",
      271: "FlySwim",
      272: "FlySwimLeft",
      273: "FlySwimRight",
      274: "FlySwimBackwards",
      275: "FlyAttackBow",
      276: "FlyFireBow",
      277: "FlyReadyRifle",
      278: "FlyAttackRifle",
      279: "FlyLoot",
      280: "FlyReadySpellDirected",
      281: "FlyReadySpellOmni",
      282: "FlySpellCastDirected",
      283: "FlySpellCastOmni",
      284: "FlyBattleRoar",
      285: "FlyReadyAbility",
      286: "FlySpecial1H",
      287: "FlySpecial2H",
      288: "FlyShieldBash",
      289: "FlyEmoteTalk",
      290: "FlyEmoteEat",
      291: "FlyEmoteWork",
      292: "FlyEmoteUseStanding",
      293: "FlyEmoteTalkExclamation",
      294: "FlyEmoteTalkQuestion",
      295: "FlyEmoteBow",
      296: "FlyEmoteWave",
      297: "FlyEmoteCheer",
      298: "FlyEmoteDance",
      299: "FlyEmoteLaugh",
      300: "FlyEmoteSleep",
      301: "FlyEmoteSitGround",
      302: "FlyEmoteRude",
      303: "FlyEmoteRoar",
      304: "FlyEmoteKneel",
      305: "FlyEmoteKiss",
      306: "FlyEmoteCry",
      307: "FlyEmoteChicken",
      308: "FlyEmoteBeg",
      309: "FlyEmoteApplaud",
      310: "FlyEmoteShout",
      311: "FlyEmoteFlex",
      312: "FlyEmoteShy",
      313: "FlyEmotePoint",
      314: "FlyAttack1HPierce",
      315: "FlyAttack2HLoosePierce",
      316: "FlyAttackOff",
      317: "FlyAttackOffPierce",
      318: "FlySheath",
      319: "FlyHipSheath",
      320: "FlyMount",
      321: "FlyRunRight",
      322: "FlyRunLeft",
      323: "FlyMountSpecial",
      324: "FlyKick",
      325: "FlySitGroundDown",
      326: "FlySitGround",
      327: "FlySitGroundUp",
      328: "FlySleepDown",
      329: "FlySleep",
      330: "FlySleepUp",
      331: "FlySitChairLow",
      332: "FlySitChairMed",
      333: "FlySitChairHigh",
      334: "FlyLoadBow",
      335: "FlyLoadRifle",
      336: "FlyAttackThrown",
      337: "FlyReadyThrown",
      338: "FlyHoldBow",
      339: "FlyHoldRifle",
      340: "FlyHoldThrown",
      341: "FlyLoadThrown",
      342: "FlyEmoteSalute",
      343: "FlyKneelStart",
      344: "FlyKneelLoop",
      345: "FlyKneelEnd",
      346: "FlyAttackUnarmedOff",
      347: "FlySpecialUnarmed",
      348: "FlyStealthWalk",
      349: "FlyStealthStand",
      350: "FlyKnockdown",
      351: "FlyEatingLoop",
      352: "FlyUseStandingLoop",
      353: "FlyChannelCastDirected",
      354: "FlyChannelCastOmni",
      355: "FlyWhirlwind",
      356: "FlyBirth",
      357: "FlyUseStandingStart",
      358: "FlyUseStandingEnd",
      359: "FlyCreatureSpecial",
      360: "FlyDrown",
      361: "FlyDrowned",
      362: "FlyFishingCast",
      363: "FlyFishingLoop",
      364: "FlyFly",
      365: "FlyEmoteWorkNoSheathe",
      366: "FlyEmoteStunNoSheathe",
      367: "FlyEmoteUseStandingNoSheathe",
      368: "FlySpellSleepDown",
      369: "FlySpellKneelStart",
      370: "FlySpellKneelLoop",
      371: "FlySpellKneelEnd",
      372: "FlySprint",
      373: "FlyInFlight",
      374: "FlySpawn",
      375: "FlyClose",
      376: "FlyClosed",
      377: "FlyOpen",
      378: "FlyOpened",
      379: "FlyDestroy",
      380: "FlyDestroyed",
      381: "FlyRebuild",
      382: "FlyCustom0",
      383: "FlyCustom1",
      384: "FlyCustom2",
      385: "FlyCustom3",
      386: "FlyDespawn",
      387: "FlyHold",
      388: "FlyDecay",
      389: "FlyBowPull",
      390: "FlyBowRelease",
      391: "FlyShipStart",
      392: "FlyShipMoving",
      393: "FlyShipStop",
      394: "FlyGroupArrow",
      395: "FlyArrow",
      396: "FlyCorpseArrow",
      397: "FlyGuideArrow",
      398: "FlySway",
      399: "FlyDruidCatPounce",
      400: "FlyDruidCatRip",
      401: "FlyDruidCatRake",
      402: "FlyDruidCatRavage",
      403: "FlyDruidCatClaw",
      404: "FlyDruidCatCower",
      405: "FlyDruidBearSwipe",
      406: "FlyDruidBearBite",
      407: "FlyDruidBearMaul",
      408: "FlyDruidBearBash",
      409: "FlyDragonTail",
      410: "FlyDragonStomp",
      411: "FlyDragonSpit",
      412: "FlyDragonSpitHover",
      413: "FlyDragonSpitFly",
      414: "FlyEmoteYes",
      415: "FlyEmoteNo",
      416: "FlyJumpLandRun",
      417: "FlyLootHold",
      418: "FlyLootUp",
      419: "FlyStandHigh",
      420: "FlyImpact",
      421: "FlyLiftOff",
      422: "FlyHover",
      423: "FlySuccubusEntice",
      424: "FlyEmoteTrain",
      425: "FlyEmoteDead",
      426: "FlyEmoteDanceOnce",
      427: "FlyDeflect",
      428: "FlyEmoteEatNoSheathe",
      429: "FlyLand",
      430: "FlySubmerge",
      431: "FlySubmerged",
      432: "FlyCannibalize",
      433: "FlyArrowBirth",
      434: "FlyGroupArrowBirth",
      435: "FlyCorpseArrowBirth",
      436: "FlyGuideArrowBirth",
      437: "FlyEmoteTalkNoSheathe",
      438: "FlyEmotePointNoSheathe",
      439: "FlyEmoteSaluteNoSheathe",
      440: "FlyEmoteDanceSpecial",
      441: "FlyMutilate",
      442: "FlyCustomSpell01",
      443: "FlyCustomSpell02",
      444: "FlyCustomSpell03",
      445: "FlyCustomSpell04",
      446: "FlyCustomSpell05",
      447: "FlyCustomSpell06",
      448: "FlyCustomSpell07",
      449: "FlyCustomSpell08",
      450: "FlyCustomSpell09",
      451: "FlyCustomSpell10",
      452: "FlyStealthRun",
      453: "FlyEmerge",
      454: "FlyCower",
      455: "FlyGrab",
      456: "FlyGrabClosed",
      457: "FlyGrabThrown",
      458: "ToFly",
      459: "ToHover",
      460: "ToGround",
      461: "FlyToFly",
      462: "FlyToHover",
      463: "FlyToGround",
      464: "Settle",
      465: "FlySettle",
      466: "DeathStart",
      467: "DeathLoop",
      468: "DeathEnd",
      469: "FlyDeathStart",
      470: "FlyDeathLoop",
      471: "FlyDeathEnd",
      472: "DeathEndHold",
      473: "FlyDeathEndHold",
      474: "Strangulate",
      475: "FlyStrangulate",
      476: "ReadyJoust",
      477: "LoadJoust",
      478: "HoldJoust",
      479: "FlyReadyJoust",
      480: "FlyLoadJoust",
      481: "FlyHoldJoust",
      482: "AttackJoust",
      483: "FlyAttackJoust",
      484: "ReclinedMount",
      485: "FlyReclinedMount",
      486: "ToAltered",
      487: "FromAltered",
      488: "FlyToAltered",
      489: "FlyFromAltered",
      490: "InStocks",
      491: "FlyInStocks",
      492: "VehicleGrab",
      493: "VehicleThrow",
      494: "FlyVehicleGrab",
      495: "FlyVehicleThrow",
      496: "ToAlteredPostSwap",
      497: "FromAlteredPostSwap",
      498: "FlyToAlteredPostSwap",
      499: "FlyFromAlteredPostSwap",
      500: "ReclinedMountPassenger",
      501: "FlyReclinedMountPassenger",
      502: "Carry2H",
      503: "Carried2H",
      504: "FlyCarry2H",
      505: "FlyCarried2H",
      506: "EmoteSniff",
      507: "EmoteFlySniff",
      508: "AttackFist1H",
      509: "FlyAttackFist1H",
      510: "AttackFist1HOff",
      511: "FlyAttackFist1HOff",
      512: "ParryFist1H",
      513: "FlyParryFist1H",
      514: "ReadyFist1H",
      515: "FlyReadyFist1H",
      516: "SpecialFist1H",
      517: "FlySpecialFist1H",
      518: "EmoteReadStart",
      519: "FlyEmoteReadStart",
      520: "EmoteReadLoop",
      521: "FlyEmoteReadLoop",
      522: "EmoteReadEnd",
      523: "FlyEmoteReadEnd",
      524: "SwimRun",
      525: "FlySwimRun",
      526: "SwimWalk",
      527: "FlySwimWalk",
      528: "SwimWalkBackwards",
      529: "FlySwimWalkBackwards",
      530: "SwimSprint",
      531: "FlySwimSprint",
      532: "MountSwimIdle",
      533: "FlyMountSwimIdle",
      534: "MountSwimBackwards",
      535: "FlyMountSwimBackwards",
      536: "MountSwimLeft",
      537: "FlyMountSwimLeft",
      538: "MountSwimRight",
      539: "FlyMountSwimRight",
      540: "MountSwimRun",
      541: "FlyMountSwimRun",
      542: "MountSwimSprint",
      543: "FlyMountSwimSprint",
      544: "MountSwimWalk",
      545: "FlyMountSwimWalk",
      546: "MountSwimWalkBackwards",
      547: "FlyMountSwimWalkBackwards",
      548: "MountFlightIdle",
      549: "FlyMountFlightIdle",
      550: "MountFlightBackwards",
      551: "FlyMountFlightBackwards",
      552: "MountFlightLeft",
      553: "FlyMountFlightLeft",
      554: "MountFlightRight",
      555: "FlyMountFlightRight",
      556: "MountFlightRun",
      557: "FlyMountFlightRun",
      558: "MountFlightSprint",
      559: "FlyMountFlightSprint",
      560: "MountFlightWalk",
      561: "FlyMountFlightWalk",
      562: "MountFlightWalkBackwards",
      563: "FlyMountFlightWalkBackwards",
      564: "MountFlightStart",
      565: "FlyMountFlightStart",
      566: "MountSwimStart",
      567: "FlyMountSwimStart",
      568: "MountSwimLand",
      569: "FlyMountSwimLand",
      570: "MountSwimLandRun",
      571: "FlyMountSwimLandRun",
      572: "MountFlightLand",
      573: "FlyMountFlightLand",
      574: "MountFlightLandRun",
      575: "FlyMountFlightLandRun",
      576: "ReadyBlowDart",
      577: "FlyReadyBlowDart",
      578: "LoadBlowDart",
      579: "FlyLoadBlowDart",
      580: "HoldBlowDart",
      581: "FlyHoldBlowDart",
      582: "AttackBlowDart",
      583: "FlyAttackBlowDart",
      584: "CarriageMount",
      585: "FlyCarriageMount",
      586: "CarriagePassengerMount",
      587: "FlyCarriagePassengerMount",
      588: "CarriageMountAttack",
      589: "FlyCarriageMountAttack",
      590: "BarTendStand",
      591: "FlyBarTendStand",
      592: "BarServerWalk",
      593: "FlyBarServerWalk",
      594: "BarServerRun",
      595: "FlyBarServerRun",
      596: "BarServerShuffleLeft",
      597: "FlyBarServerShuffleLeft",
      598: "BarServerShuffleRight",
      599: "FlyBarServerShuffleRight",
      600: "BarTendEmoteTalk",
      601: "FlyBarTendEmoteTalk",
      602: "BarTendEmotePoint",
      603: "FlyBarTendEmotePoint",
      604: "BarServerStand",
      605: "FlyBarServerStand",
      606: "BarSweepWalk",
      607: "FlyBarSweepWalk",
      608: "BarSweepRun",
      609: "FlyBarSweepRun",
      610: "BarSweepShuffleLeft",
      611: "FlyBarSweepShuffleLeft",
      612: "BarSweepShuffleRight",
      613: "FlyBarSweepShuffleRight",
      614: "BarSweepEmoteTalk",
      615: "FlyBarSweepEmoteTalk",
      616: "BarPatronSitEmotePoint",
      617: "FlyBarPatronSitEmotePoint",
      618: "MountSelfIdle",
      619: "FlyMountSelfIdle",
      620: "MountSelfWalk",
      621: "FlyMountSelfWalk",
      622: "MountSelfRun",
      623: "FlyMountSelfRun",
      624: "MountSelfSprint",
      625: "FlyMountSelfSprint",
      626: "MountSelfRunLeft",
      627: "FlyMountSelfRunLeft",
      628: "MountSelfRunRight",
      629: "FlyMountSelfRunRight",
      630: "MountSelfShuffleLeft",
      631: "FlyMountSelfShuffleLeft",
      632: "MountSelfShuffleRight",
      633: "FlyMountSelfShuffleRight",
      634: "MountSelfWalkBackwards",
      635: "FlyMountSelfWalkBackwards",
      636: "MountSelfSpecial",
      637: "FlyMountSelfSpecial",
      638: "MountSelfJump",
      639: "FlyMountSelfJump",
      640: "MountSelfJumpStart",
      641: "FlyMountSelfJumpStart",
      642: "MountSelfJumpEnd",
      643: "FlyMountSelfJumpEnd",
      644: "MountSelfJumpLandRun",
      645: "FlyMountSelfJumpLandRun",
      646: "MountSelfStart",
      647: "FlyMountSelfStart",
      648: "MountSelfFall",
      649: "FlyMountSelfFall",
      650: "Stormstrike",
      651: "FlyStormstrike",
      652: "ReadyJoustNoSheathe",
      653: "FlyReadyJoustNoSheathe",
      654: "Slam",
      655: "FlySlam",
      656: "DeathStrike",
      657: "FlyDeathStrike",
      658: "SwimAttackUnarmed",
      659: "FlySwimAttackUnarmed",
      660: "SpinningKick",
      661: "FlySpinningKick",
      662: "RoundHouseKick",
      663: "FlyRoundHouseKick",
      664: "RollStart",
      665: "FlyRollStart",
      666: "Roll",
      667: "FlyRoll",
      668: "RollEnd",
      669: "FlyRollEnd",
      670: "PalmStrike",
      671: "FlyPalmStrike",
      672: "MonkOffenseAttackUnarmed",
      673: "FlyMonkOffenseAttackUnarmed",
      674: "MonkOffenseAttackUnarmedOff",
      675: "FlyMonkOffenseAttackUnarmedOff",
      676: "MonkOffenseParryUnarmed",
      677: "FlyMonkOffenseParryUnarmed",
      678: "MonkOffenseReadyUnarmed",
      679: "FlyMonkOffenseReadyUnarmed",
      680: "MonkOffenseSpecialUnarmed",
      681: "FlyMonkOffenseSpecialUnarmed",
      682: "MonkDefenseAttackUnarmed",
      683: "FlyMonkDefenseAttackUnarmed",
      684: "MonkDefenseAttackUnarmedOff",
      685: "FlyMonkDefenseAttackUnarmedOff",
      686: "MonkDefenseParryUnarmed",
      687: "FlyMonkDefenseParryUnarmed",
      688: "MonkDefenseReadyUnarmed",
      689: "FlyMonkDefenseReadyUnarmed",
      690: "MonkDefenseSpecialUnarmed",
      691: "FlyMonkDefenseSpecialUnarmed",
      692: "MonkHealAttackUnarmed",
      693: "FlyMonkHealAttackUnarmed",
      694: "MonkHealAttackUnarmedOff",
      695: "FlyMonkHealAttackUnarmedOff",
      696: "MonkHealParryUnarmed",
      697: "FlyMonkHealParryUnarmed",
      698: "MonkHealReadyUnarmed",
      699: "FlyMonkHealReadyUnarmed",
      700: "MonkHealSpecialUnarmed",
      701: "FlyMonkHealSpecialUnarmed",
      702: "FlyingKick",
      703: "FlyFlyingKick",
      704: "FlyingKickStart",
      705: "FlyFlyingKickStart",
      706: "FlyingKickEnd",
      707: "FlyFlyingKickEnd",
      708: "CraneStart",
      709: "FlyCraneStart",
      710: "CraneLoop",
      711: "FlyCraneLoop",
      712: "CraneEnd",
      713: "FlyCraneEnd",
      714: "Despawned",
      715: "FlyDespawned",
      716: "ThousandFists",
      717: "FlyThousandFists",
      718: "MonkHealReadySpellDirected",
      719: "FlyMonkHealReadySpellDirected",
      720: "MonkHealReadySpellOmni",
      721: "FlyMonkHealReadySpellOmni",
      722: "MonkHealSpellCastDirected",
      723: "FlyMonkHealSpellCastDirected",
      724: "MonkHealSpellCastOmni",
      725: "FlyMonkHealSpellCastOmni",
      726: "MonkHealChannelCastDirected",
      727: "FlyMonkHealChannelCastDirected",
      728: "MonkHealChannelCastOmni",
      729: "FlyMonkHealChannelCastOmni",
      730: "Torpedo",
      731: "FlyTorpedo",
      732: "Meditate",
      733: "FlyMeditate",
      734: "BreathOfFire",
      735: "FlyBreathOfFire",
      736: "RisingSunKick",
      737: "FlyRisingSunKick",
      738: "GroundKick",
      739: "FlyGroundKick",
      740: "KickBack",
      741: "FlyKickBack",
      742: "PetBattleStand",
      743: "FlyPetBattleStand",
      744: "PetBattleDeath",
      745: "FlyPetBattleDeath",
      746: "PetBattleRun",
      747: "FlyPetBattleRun",
      748: "PetBattleWound",
      749: "FlyPetBattleWound",
      750: "PetBattleAttack",
      751: "FlyPetBattleAttack",
      752: "PetBattleReadySpell",
      753: "FlyPetBattleReadySpell",
      754: "PetBattleSpellCast",
      755: "FlyPetBattleSpellCast",
      756: "PetBattleCustom0",
      757: "FlyPetBattleCustom0",
      758: "PetBattleCustom1",
      759: "FlyPetBattleCustom1",
      760: "PetBattleCustom2",
      761: "FlyPetBattleCustom2",
      762: "PetBattleCustom3",
      763: "FlyPetBattleCustom3",
      764: "PetBattleVictory",
      765: "FlyPetBattleVictory",
      766: "PetBattleLoss",
      767: "FlyPetBattleLoss",
      768: "PetBattleStun",
      769: "FlyPetBattleStun",
      770: "PetBattleDead",
      771: "FlyPetBattleDead",
      772: "PetBattleFreeze",
      773: "FlyPetBattleFreeze",
      774: "MonkOffenseAttackWeapon",
      775: "FlyMonkOffenseAttackWeapon",
      776: "BarTendEmoteWave",
      777: "FlyBarTendEmoteWave",
      778: "BarServerEmoteTalk",
      779: "FlyBarServerEmoteTalk",
      780: "BarServerEmoteWave",
      781: "FlyBarServerEmoteWave",
      782: "BarServerPourDrinks",
      783: "FlyBarServerPourDrinks",
      784: "BarServerPickup",
      785: "FlyBarServerPickup",
      786: "BarServerPutDown",
      787: "FlyBarServerPutDown",
      788: "BarSweepStand",
      789: "FlyBarSweepStand",
      790: "BarPatronSit",
      791: "FlyBarPatronSit",
      792: "BarPatronSitEmoteTalk",
      793: "FlyBarPatronSitEmoteTalk",
      794: "BarPatronStand",
      795: "FlyBarPatronStand",
      796: "BarPatronStandEmoteTalk",
      797: "FlyBarPatronStandEmoteTalk",
      798: "BarPatronStandEmotePoint",
      799: "FlyBarPatronStandEmotePoint",
      800: "CarrionSwarm",
      801: "FlyCarrionSwarm",
      802: "WheelLoop",
      803: "FlyWheelLoop",
      804: "StandCharacterCreate",
      805: "FlyStandCharacterCreate",
      806: "MountChopper",
      807: "FlyMountChopper",
      808: "FacePose",
      809: "FlyFacePose",
      810: "CombatAbility2HBig01",
      811: "FlyCombatAbility2HBig01",
      812: "CombatAbility2H01",
      813: "FlyCombatAbility2H01",
      814: "CombatWhirlwind",
      815: "FlyCombatWhirlwind",
      816: "CombatChargeLoop",
      817: "FlyCombatChargeLoop",
      818: "CombatAbility1H01",
      819: "FlyCombatAbility1H01",
      820: "CombatChargeEnd",
      821: "FlyCombatChargeEnd",
      822: "CombatAbility1H02",
      823: "FlyCombatAbility1H02",
      824: "CombatAbility1HBig01",
      825: "FlyCombatAbility1HBig01",
      826: "CombatAbility2H02",
      827: "FlyCombatAbility2H02",
      828: "ShaSpellPrecastBoth",
      829: "FlyShaSpellPrecastBoth",
      830: "ShaSpellCastBothFront",
      831: "FlyShaSpellCastBothFront",
      832: "ShaSpellCastLeftFront",
      833: "FlyShaSpellCastLeftFront",
      834: "ShaSpellCastRightFront",
      835: "FlyShaSpellCastRightFront",
      836: "ReadyCrossbow",
      837: "FlyReadyCrossbow",
      838: "LoadCrossbow",
      839: "FlyLoadCrossbow",
      840: "AttackCrossbow",
      841: "FlyAttackCrossbow",
      842: "HoldCrossbow",
      843: "FlyHoldCrossbow",
      844: "CombatAbility2HL01",
      845: "FlyCombatAbility2HL01",
      846: "CombatAbility2HL02",
      847: "FlyCombatAbility2HL02",
      848: "CombatAbility2HLBig01",
      849: "FlyCombatAbility2HLBig01",
      850: "CombatUnarmed01",
      851: "FlyCombatUnarmed01",
      852: "CombatStompLeft",
      853: "FlyCombatStompLeft",
      854: "CombatStompRight",
      855: "FlyCombatStompRight",
      856: "CombatLeapLoop",
      857: "FlyCombatLeapLoop",
      858: "CombatLeapEnd",
      859: "FlyCombatLeapEnd",
      860: "ShaReadySpellCast",
      861: "FlyShaReadySpellCast",
      862: "ShaSpellPrecastBothChannel",
      863: "FlyShaSpellPrecastBothChannel",
      864: "ShaSpellCastBothUp",
      865: "FlyShaSpellCastBothUp",
      866: "ShaSpellCastBothUpChannel",
      867: "FlyShaSpellCastBothUpChannel",
      868: "ShaSpellCastBothFrontChannel",
      869: "FlyShaSpellCastBothFrontChannel",
      870: "ShaSpellCastLeftFrontChannel",
      871: "FlyShaSpellCastLeftFrontChannel",
      872: "ShaSpellCastRightFrontChannel",
      873: "FlyShaSpellCastRightFrontChannel",
      874: "PriReadySpellCast",
      875: "FlyPriReadySpellCast",
      876: "PriSpellPrecastBoth",
      877: "FlyPriSpellPrecastBoth",
      878: "PriSpellPrecastBothChannel",
      879: "FlyPriSpellPrecastBothChannel",
      880: "PriSpellCastBothUp",
      881: "FlyPriSpellCastBothUp",
      882: "PriSpellCastBothFront",
      883: "FlyPriSpellCastBothFront",
      884: "PriSpellCastLeftFront",
      885: "FlyPriSpellCastLeftFront",
      886: "PriSpellCastRightFront",
      887: "FlyPriSpellCastRightFront",
      888: "PriSpellCastBothUpChannel",
      889: "FlyPriSpellCastBothUpChannel",
      890: "PriSpellCastBothFrontChannel",
      891: "FlyPriSpellCastBothFrontChannel",
      892: "PriSpellCastLeftFrontChannel",
      893: "FlyPriSpellCastLeftFrontChannel",
      894: "PriSpellCastRightFrontChannel",
      895: "FlyPriSpellCastRightFrontChannel",
      896: "MagReadySpellCast",
      897: "FlyMagReadySpellCast",
      898: "MagSpellPrecastBoth",
      899: "FlyMagSpellPrecastBoth",
      900: "MagSpellPrecastBothChannel",
      901: "FlyMagSpellPrecastBothChannel",
      902: "MagSpellCastBothUp",
      903: "FlyMagSpellCastBothUp",
      904: "MagSpellCastBothFront",
      905: "FlyMagSpellCastBothFront",
      906: "MagSpellCastLeftFront",
      907: "FlyMagSpellCastLeftFront",
      908: "MagSpellCastRightFront",
      909: "FlyMagSpellCastRightFront",
      910: "MagSpellCastBothUpChannel",
      911: "FlyMagSpellCastBothUpChannel",
      912: "MagSpellCastBothFrontChannel",
      913: "FlyMagSpellCastBothFrontChannel",
      914: "MagSpellCastLeftFrontChannel",
      915: "FlyMagSpellCastLeftFrontChannel",
      916: "MagSpellCastRightFrontChannel",
      917: "FlyMagSpellCastRightFrontChannel",
      918: "LocReadySpellCast",
      919: "FlyLocReadySpellCast",
      920: "LocSpellPrecastBoth",
      921: "FlyLocSpellPrecastBoth",
      922: "LocSpellPrecastBothChannel",
      923: "FlyLocSpellPrecastBothChannel",
      924: "LocSpellCastBothUp",
      925: "FlyLocSpellCastBothUp",
      926: "LocSpellCastBothFront",
      927: "FlyLocSpellCastBothFront",
      928: "LocSpellCastLeftFront",
      929: "FlyLocSpellCastLeftFront",
      930: "LocSpellCastRightFront",
      931: "FlyLocSpellCastRightFront",
      932: "LocSpellCastBothUpChannel",
      933: "FlyLocSpellCastBothUpChannel",
      934: "LocSpellCastBothFrontChannel",
      935: "FlyLocSpellCastBothFrontChannel",
      936: "LocSpellCastLeftFrontChannel",
      937: "FlyLocSpellCastLeftFrontChannel",
      938: "LocSpellCastRightFrontChannel",
      939: "FlyLocSpellCastRightFrontChannel",
      940: "DruReadySpellCast",
      941: "FlyDruReadySpellCast",
      942: "DruSpellPrecastBoth",
      943: "FlyDruSpellPrecastBoth",
      944: "DruSpellPrecastBothChannel",
      945: "FlyDruSpellPrecastBothChannel",
      946: "DruSpellCastBothUp",
      947: "FlyDruSpellCastBothUp",
      948: "DruSpellCastBothFront",
      949: "FlyDruSpellCastBothFront",
      950: "DruSpellCastLeftFront",
      951: "FlyDruSpellCastLeftFront",
      952: "DruSpellCastRightFront",
      953: "FlyDruSpellCastRightFront",
      954: "DruSpellCastBothUpChannel",
      955: "FlyDruSpellCastBothUpChannel",
      956: "DruSpellCastBothFrontChannel",
      957: "FlyDruSpellCastBothFrontChannel",
      958: "DruSpellCastLeftFrontChannel",
      959: "FlyDruSpellCastLeftFrontChannel",
      960: "DruSpellCastRightFrontChannel",
      961: "FlyDruSpellCastRightFrontChannel",
      962: "ArtMainLoop",
      963: "FlyArtMainLoop",
      964: "ArtDualLoop",
      965: "FlyArtDualLoop",
      966: "ArtFistsLoop",
      967: "FlyArtFistsLoop",
      968: "ArtBowLoop",
      969: "FlyArtBowLoop",
      970: "CombatAbility1H01Off",
      971: "FlyCombatAbility1H01Off",
      972: "CombatAbility1H02Off",
      973: "FlyCombatAbility1H02Off",
      974: "CombatFuriousStrike01",
      975: "FlyCombatFuriousStrike01",
      976: "CombatFuriousStrike02",
      977: "FlyCombatFuriousStrike02",
      978: "CombatFuriousStrikes",
      979: "FlyCombatFuriousStrikes",
      980: "CombatReadySpellCast",
      981: "FlyCombatReadySpellCast",
      982: "CombatShieldThrow",
      983: "FlyCombatShieldThrow",
      984: "PalSpellCast1HUp",
      985: "FlyPalSpellCast1HUp",
      986: "CombatReadyPostSpellCast",
      987: "FlyCombatReadyPostSpellCast",
      988: "PriReadyPostSpellCast",
      989: "FlyPriReadyPostSpellCast",
      990: "DHCombatRun",
      991: "FlyDHCombatRun",
      992: "CombatShieldBash",
      993: "FlyCombatShieldBash",
      994: "CombatThrow",
      995: "FlyCombatThrow",
      996: "CombatAbility1HPierce",
      997: "FlyCombatAbility1HPierce",
      998: "CombatAbility1HOffPierce",
      999: "FlyCombatAbility1HOffPierce",
      1e3: "CombatMutilate",
      1001: "FlyCombatMutilate",
      1002: "CombatBladeStorm",
      1003: "FlyCombatBladeStorm",
      1004: "CombatFinishingMove",
      1005: "FlyCombatFinishingMove",
      1006: "CombatLeapStart",
      1007: "FlyCombatLeapStart",
      1008: "GlvThrowMain",
      1009: "FlyGlvThrowMain",
      1010: "GlvThrownOff",
      1011: "FlyGlvThrownOff",
      1012: "DHCombatSprint",
      1013: "FlyDHCombatSprint",
      1014: "CombatAbilityGlv01",
      1015: "FlyCombatAbilityGlv01",
      1016: "CombatAbilityGlv02",
      1017: "FlyCombatAbilityGlv02",
      1018: "CombatAbilityGlvOff01",
      1019: "FlyCombatAbilityGlvOff01",
      1020: "CombatAbilityGlvOff02",
      1021: "FlyCombatAbilityGlvOff02",
      1022: "CombatAbilityGlvBig01",
      1023: "FlyCombatAbilityGlvBig01",
      1024: "CombatAbilityGlvBig02",
      1025: "FlyCombatAbilityGlvBig02",
      1026: "ReadyGlv",
      1027: "FlyReadyGlv",
      1028: "CombatAbilityGlvBig03",
      1029: "FlyCombatAbilityGlvBig03",
      1030: "DoubleJumpStart",
      1031: "FlyDoubleJumpStart",
      1032: "DoubleJump",
      1033: "FlyDoubleJump",
      1034: "CombatEviscerate",
      1035: "FlyCombatEviscerate",
      1036: "DoubleJumpLandRun",
      1037: "FlyDoubleJumpLandRun",
      1038: "BackFlipStart",
      1039: "FlyBackFlipStart",
      1040: "BackFlipLoop",
      1041: "FlyBackFlipLoop",
      1042: "FelRushLoop",
      1043: "FlyFelRushLoop",
      1044: "FelRushEnd",
      1045: "FlyFelRushEnd",
      1046: "DHToAlteredStart",
      1047: "FlyDHToAlteredStart",
      1048: "DHToAlteredEnd",
      1049: "FlyDHToAlteredEnd",
      1050: "DHGlide",
      1051: "FlyDHGlide",
      1052: "FanOfKnives",
      1053: "FlyFanOfKnives",
      1054: "SingleJumpStart",
      1055: "FlySingleJumpStart",
      1056: "DHBladeDance1",
      1057: "FlyDHBladeDance1",
      1058: "DHBladeDance2",
      1059: "FlyDHBladeDance2",
      1060: "DHBladeDance3",
      1061: "FlyDHBladeDance3",
      1062: "DHMeteorStrike",
      1063: "FlyDHMeteorStrike",
      1064: "CombatExecute",
      1065: "FlyCombatExecute",
      1066: "ArtLoop",
      1067: "FlyArtLoop",
      1068: "ParryGlv",
      1069: "FlyParryGlv",
      1070: "CombatUnarmed02",
      1071: "FlyCombatUnarmed02",
      1072: "CombatPistolShot",
      1073: "FlyCombatPistolShot",
      1074: "CombatPistolShotOff",
      1075: "FlyCombatPistolShotOff",
      1076: "Monk2HLIdle",
      1077: "FlyMonk2HLIdle",
      1078: "ArtShieldLoop",
      1079: "FlyArtShieldLoop",
      1080: "CombatAbility2H03",
      1081: "FlyCombatAbility2H03",
      1082: "CombatStomp",
      1083: "FlyCombatStomp",
      1084: "CombatRoar",
      1085: "FlyCombatRoar",
      1086: "PalReadySpellCast",
      1087: "FlyPalReadySpellCast",
      1088: "PalSpellPrecastRight",
      1089: "FlyPalSpellPrecastRight",
      1090: "PalSpellPrecastRightChannel",
      1091: "FlyPalSpellPrecastRightChannel",
      1092: "PalSpellCastRightFront",
      1093: "FlyPalSpellCastRightFront",
      1094: "ShaSpellCastBothOut",
      1095: "FlyShaSpellCastBothOut",
      1096: "AttackWeapon",
      1097: "FlyAttackWeapon",
      1098: "ReadyWeapon",
      1099: "FlyReadyWeapon",
      1100: "AttackWeaponOff",
      1101: "FlyAttackWeaponOff",
      1102: "SpecialDual",
      1103: "FlySpecialDual",
      1104: "DkCast1HFront",
      1105: "FlyDkCast1HFront",
      1106: "CastStrongRight",
      1107: "FlyCastStrongRight",
      1108: "CastStrongLeft",
      1109: "FlyCastStrongLeft",
      1110: "CastCurseRight",
      1111: "FlyCastCurseRight",
      1112: "CastCurseLeft",
      1113: "FlyCastCurseLeft",
      1114: "CastSweepRight",
      1115: "FlyCastSweepRight",
      1116: "CastSweepLeft",
      1117: "FlyCastSweepLeft",
      1118: "CastStrongUpLeft",
      1119: "FlyCastStrongUpLeft",
      1120: "CastTwistUpBoth",
      1121: "FlyCastTwistUpBoth",
      1122: "CastOutStrong",
      1123: "FlyCastOutStrong",
      1124: "DrumLoop",
      1125: "FlyDrumLoop",
      1126: "ParryWeapon",
      1127: "FlyParryWeapon",
      1128: "ReadyFL",
      1129: "FlyReadyFL",
      1130: "AttackFL",
      1131: "FlyAttackFL",
      1132: "AttackFLOff",
      1133: "FlyAttackFLOff",
      1134: "ParryFL",
      1135: "FlyParryFL",
      1136: "SpecialFL",
      1137: "FlySpecialFL",
      1138: "PriHoverForward",
      1139: "FlyPriHoverForward",
      1140: "PriHoverBackward",
      1141: "FlyPriHoverBackward",
      1142: "PriHoverRight",
      1143: "FlyPriHoverRight",
      1144: "PriHoverLeft",
      1145: "FlyPriHoverLeft",
      1146: "RunBackwards",
      1147: "FlyRunBackwards",
      1148: "CastStrongUpRight",
      1149: "FlyCastStrongUpRight",
      1150: "WAWalk",
      1151: "FlyWAWalk",
      1152: "WARun",
      1153: "FlyWARun",
      1154: "WADrunkStand",
      1155: "FlyWADrunkStand",
      1156: "WADrunkShuffleLeft",
      1157: "FlyWADrunkShuffleLeft",
      1158: "WADrunkShuffleRight",
      1159: "FlyWADrunkShuffleRight",
      1160: "WADrunkWalk",
      1161: "FlyWADrunkWalk",
      1162: "WADrunkWalkBackwards",
      1163: "FlyWADrunkWalkBackwards",
      1164: "WADrunkWound",
      1165: "FlyWADrunkWound",
      1166: "WADrunkTalk",
      1167: "FlyWADrunkTalk",
      1168: "WATrance01",
      1169: "FlyWATrance01",
      1170: "WATrance02",
      1171: "FlyWATrance02",
      1172: "WAChant01",
      1173: "FlyWAChant01",
      1174: "WAChant02",
      1175: "FlyWAChant02",
      1176: "WAChant03",
      1177: "FlyWAChant03",
      1178: "WAHang01",
      1179: "FlyWAHang01",
      1180: "WAHang02",
      1181: "FlyWAHang02",
      1182: "WASummon01",
      1183: "FlyWASummon01",
      1184: "WASummon02",
      1185: "FlyWASummon02",
      1186: "WABeggarTalk",
      1187: "FlyWABeggarTalk",
      1188: "WABeggarStand",
      1189: "FlyWABeggarStand",
      1190: "WABeggarPoint",
      1191: "FlyWABeggarPoint",
      1192: "WABeggarBeg",
      1193: "FlyWABeggarBeg",
      1194: "WASit01",
      1195: "FlyWASit01",
      1196: "WASit02",
      1197: "FlyWASit02",
      1198: "WASit03",
      1199: "FlyWASit03",
      1200: "WACrierStand01",
      1201: "FlyWACrierStand01",
      1202: "WACrierStand02",
      1203: "FlyWACrierStand02",
      1204: "WACrierStand03",
      1205: "FlyWACrierStand03",
      1206: "WACrierTalk",
      1207: "FlyWACrierTalk",
      1208: "WACrateHold",
      1209: "FlyWACrateHold",
      1210: "WABarrelHold",
      1211: "FlyWABarrelHold",
      1212: "WASackHold",
      1213: "FlyWASackHold",
      1214: "WAWheelBarrowStand",
      1215: "FlyWAWheelBarrowStand",
      1216: "WAWheelBarrowWalk",
      1217: "FlyWAWheelBarrowWalk",
      1218: "WAWheelBarrowRun",
      1219: "FlyWAWheelBarrowRun",
      1220: "WAHammerLoop",
      1221: "FlyWAHammerLoop",
      1222: "WACrankLoop",
      1223: "FlyWACrankLoop",
      1224: "WAPourStart",
      1225: "FlyWAPourStart",
      1226: "WAPourLoop",
      1227: "FlyWAPourLoop",
      1228: "WAPourEnd",
      1229: "FlyWAPourEnd",
      1230: "WAEmotePour",
      1231: "FlyWAEmotePour",
      1232: "WARowingStandRight",
      1233: "FlyWARowingStandRight",
      1234: "WARowingStandLeft",
      1235: "FlyWARowingStandLeft",
      1236: "WARowingRight",
      1237: "FlyWARowingRight",
      1238: "WARowingLeft",
      1239: "FlyWARowingLeft",
      1240: "WAGuardStand01",
      1241: "FlyWAGuardStand01",
      1242: "WAGuardStand02",
      1243: "FlyWAGuardStand02",
      1244: "WAGuardStand03",
      1245: "FlyWAGuardStand03",
      1246: "WAGuardStand04",
      1247: "FlyWAGuardStand04",
      1248: "WAFreezing01",
      1249: "FlyWAFreezing01",
      1250: "WAFreezing02",
      1251: "FlyWAFreezing02",
      1252: "WAVendorStand01",
      1253: "FlyWAVendorStand01",
      1254: "WAVendorStand02",
      1255: "FlyWAVendorStand02",
      1256: "WAVendorStand03",
      1257: "FlyWAVendorStand03",
      1258: "WAVendorTalk",
      1259: "FlyWAVendorTalk",
      1260: "WALean01",
      1261: "FlyWALean01",
      1262: "WALean02",
      1263: "FlyWALean02",
      1264: "WALean03",
      1265: "FlyWALean03",
      1266: "WALeanTalk",
      1267: "FlyWALeanTalk",
      1268: "WABoatWheel",
      1269: "FlyWABoatWheel",
      1270: "WASmithLoop",
      1271: "FlyWASmithLoop",
      1272: "WAScrubbing",
      1273: "FlyWAScrubbing",
      1274: "WAWeaponSharpen",
      1275: "FlyWAWeaponSharpen",
      1276: "WAStirring",
      1277: "FlyWAStirring",
      1278: "WAPerch01",
      1279: "FlyWAPerch01",
      1280: "WAPerch02",
      1281: "FlyWAPerch02",
      1282: "HoldWeapon",
      1283: "FlyHoldWeapon",
      1284: "WABarrelWalk",
      1285: "FlyWABarrelWalk",
      1286: "WAPourHold",
      1287: "FlyWAPourHold",
      1288: "CastStrong",
      1289: "FlyCastStrong",
      1290: "CastCurse",
      1291: "FlyCastCurse",
      1292: "CastSweep",
      1293: "FlyCastSweep",
      1294: "CastStrongUp",
      1295: "FlyCastStrongUp",
      1296: "WABoatWheelStand",
      1297: "FlyWABoatWheelStand",
      1298: "WASmithStand",
      1299: "FlyWASmithStand",
      1300: "WACrankStand",
      1301: "FlyWACrankStand",
      1302: "WAPourWalk",
      1303: "FlyWAPourWalk",
      1304: "FalconeerStart",
      1305: "FlyFalconeerStart",
      1306: "FalconeerLoop",
      1307: "FlyFalconeerLoop",
      1308: "FalconeerEnd",
      1309: "FlyFalconeerEnd",
      1310: "WADrunkDrink",
      1311: "FlyWADrunkDrink",
      1312: "WAStandEat",
      1313: "FlyWAStandEat",
      1314: "WAStandDrink",
      1315: "FlyWAStandDrink",
      1316: "WABound01",
      1317: "FlyWABound01",
      1318: "WABound02",
      1319: "FlyWABound02",
      1320: "CombatAbility1H03Off",
      1321: "FlyCombatAbility1H03Off",
      1322: "CombatAbilityDualWield01",
      1323: "FlyCombatAbilityDualWield01",
      1324: "WACradle01",
      1325: "FlyWACradle01",
      1326: "LocSummon",
      1327: "FlyLocSummon",
      1328: "LoadWeapon",
      1329: "FlyLoadWeapon",
      1330: "ArtOffLoop",
      1331: "FlyArtOffLoop",
      1332: "WADead01",
      1333: "FlyWADead01",
      1334: "WADead02",
      1335: "FlyWADead02",
      1336: "WADead03",
      1337: "FlyWADead03",
      1338: "WADead04",
      1339: "FlyWADead04",
      1340: "WADead05",
      1341: "FlyWADead05",
      1342: "WADead06",
      1343: "FlyWADead06",
      1344: "WADead07",
      1345: "FlyWADead07",
      1346: "GiantRun",
      1347: "FlyGiantRun",
      1348: "BarTendEmoteCheer",
      1349: "FlyBarTendEmoteCheer",
      1350: "BarTendEmoteTalkQuestion",
      1351: "FlyBarTendEmoteTalkQuestion",
      1352: "BarTendEmoteTalkExclamation",
      1353: "FlyBarTendEmoteTalkExclamation",
      1354: "BarTendWalk",
      1355: "FlyBarTendWalk",
      1356: "BartendShuffleLeft",
      1357: "FlyBartendShuffleLeft",
      1358: "BarTendShuffleRight",
      1359: "FlyBarTendShuffleRight",
      1360: "BarTendCustomSpell01",
      1361: "FlyBarTendCustomSpell01",
      1362: "BarTendCustomSpell02",
      1363: "FlyBarTendCustomSpell02",
      1364: "BarTendCustomSpell03",
      1365: "FlyBarTendCustomSpell03",
      1366: "BarServerEmoteCheer",
      1367: "FlyBarServerEmoteCheer",
      1368: "BarServerEmoteTalkQuestion",
      1369: "FlyBarServerEmoteTalkQuestion",
      1370: "BarServerEmoteTalkExclamation",
      1371: "FlyBarServerEmoteTalkExclamation",
      1372: "BarServerCustomSpell01",
      1373: "FlyBarServerCustomSpell01",
      1374: "BarServerCustomSpell02",
      1375: "FlyBarServerCustomSpell02",
      1376: "BarServerCustomSpell03",
      1377: "FlyBarServerCustomSpell03",
      1378: "BarPatronEmoteDrink",
      1379: "FlyBarPatronEmoteDrink",
      1380: "BarPatronEmoteCheer",
      1381: "FlyBarPatronEmoteCheer",
      1382: "BarPatronCustomSpell01",
      1383: "FlyBarPatronCustomSpell01",
      1384: "BarPatronCustomSpell02",
      1385: "FlyBarPatronCustomSpell02",
      1386: "BarPatronCustomSpell03",
      1387: "FlyBarPatronCustomSpell03",
      1388: "HoldDart",
      1389: "FlyHoldDart",
      1390: "ReadyDart",
      1391: "FlyReadyDart",
      1392: "AttackDart",
      1393: "FlyAttackDart",
      1394: "LoadDart",
      1395: "FlyLoadDart",
      1396: "WADartTargetStand",
      1397: "FlyWADartTargetStand",
      1398: "WADartTargetEmoteTalk",
      1399: "FlyWADartTargetEmoteTalk",
      1400: "BarPatronSitEmoteCheer",
      1401: "FlyBarPatronSitEmoteCheer",
      1402: "BarPatronSitCustomSpell01",
      1403: "FlyBarPatronSitCustomSpell01",
      1404: "BarPatronSitCustomSpell02",
      1405: "FlyBarPatronSitCustomSpell02",
      1406: "BarPatronSitCustomSpell03",
      1407: "FlyBarPatronSitCustomSpell03",
      1408: "BarPianoStand",
      1409: "FlyBarPianoStand",
      1410: "BarPianoEmoteTalk",
      1411: "FlyBarPianoEmoteTalk",
      1412: "WAHearthSit",
      1413: "FlyWAHearthSit",
      1414: "WAHearthSitEmoteCry",
      1415: "FlyWAHearthSitEmoteCry",
      1416: "WAHearthSitEmoteCheer",
      1417: "FlyWAHearthSitEmoteCheer",
      1418: "WAHearthSitCustomSpell01",
      1419: "FlyWAHearthSitCustomSpell01",
      1420: "WAHearthSitCustomSpell02",
      1421: "FlyWAHearthSitCustomSpell02",
      1422: "WAHearthSitCustomSpell03",
      1423: "FlyWAHearthSitCustomSpell03",
      1424: "WAHearthStand",
      1425: "FlyWAHearthStand",
      1426: "WAHearthStandEmoteCheer",
      1427: "FlyWAHearthStandEmoteCheer",
      1428: "WAHearthStandEmoteTalk",
      1429: "FlyWAHearthStandEmoteTalk",
      1430: "WAHearthStandCustomSpell01",
      1431: "FlyWAHearthStandCustomSpell01",
      1432: "WAHearthStandCustomSpell02",
      1433: "FlyWAHearthStandCustomSpell02",
      1434: "WAHearthStandCustomSpell03",
      1435: "FlyWAHearthStandCustomSpell03",
      1436: "WAScribeStart",
      1437: "FlyWAScribeStart",
      1438: "WAScribeLoop",
      1439: "FlyWAScribeLoop",
      1440: "WAScribeEnd",
      1441: "FlyWAScribeEnd",
      1442: "WAEmoteScribe",
      1443: "FlyWAEmoteScribe",
      1444: "Haymaker",
      1445: "FlyHaymaker",
      1446: "HaymakerPrecast",
      1447: "FlyHaymakerPrecast",
      1448: "ChannelCastOmniUp",
      1449: "FlyChannelCastOmniUp",
      1450: "DHJumpLandRun",
      1451: "FlyDHJumpLandRun",
      1452: "Cinematic01",
      1453: "FlyCinematic01",
      1454: "Cinematic02",
      1455: "FlyCinematic02",
      1456: "Cinematic03",
      1457: "FlyCinematic03",
      1458: "Cinematic04",
      1459: "FlyCinematic04",
      1460: "Cinematic05",
      1461: "FlyCinematic05",
      1462: "Cinematic06",
      1463: "FlyCinematic06",
      1464: "Cinematic07",
      1465: "FlyCinematic07",
      1466: "Cinematic08",
      1467: "FlyCinematic08",
      1468: "Cinematic09",
      1469: "FlyCinematic09",
      1470: "Cinematic10",
      1471: "FlyCinematic10",
      1472: "TakeOffStart",
      1473: "FlyTakeOffStart",
      1474: "TakeOffFinish",
      1475: "FlyTakeOffFinish",
      1476: "LandStart",
      1477: "FlyLandStart",
      1478: "LandFinish",
      1479: "FlyLandFinish",
      1480: "WAWalkTalk",
      1481: "FlyWAWalkTalk",
      1482: "WAPerch03",
      1483: "FlyWAPerch03",
      1484: "CarriageMountMoving",
      1485: "FlyCarriageMountMoving",
      1486: "TakeOffFinishFly",
      1487: "FlyTakeOffFinishFly",
      1488: "CombatAbility2HBig02",
      1489: "FlyCombatAbility2HBig02",
      1490: "MountWide",
      1491: "FlyMountWide",
      1492: "EmoteTalkSubdued",
      1493: "FlyEmoteTalkSubdued",
      1494: "WASit04",
      1495: "FlyWASit04",
      1496: "MountSummon",
      1497: "FlyMountSummon",
      1498: "EmoteSelfie",
      1499: "FlyEmoteSelfie",
      1500: "CustomSpell11",
      1501: "FlyCustomSpell11",
      1502: "CustomSpell12",
      1503: "FlyCustomSpell12",
      1504: "CustomSpell13",
      1505: "FlyCustomSpell13",
      1506: "CustomSpell14",
      1507: "FlyCustomSpell14",
      1508: "CustomSpell15",
      1509: "FlyCustomSpell15",
      1510: "CustomSpell16",
      1511: "FlyCustomSpell16",
      1512: "CustomSpell17",
      1513: "FlyCustomSpell17",
      1514: "CustomSpell18",
      1515: "FlyCustomSpell18",
      1516: "CustomSpell19",
      1517: "FlyCustomSpell19",
      1518: "CustomSpell20",
      1519: "FlyCustomSpell20",
      1520: "AdvFlyLeft",
      1521: "FlyAdvFlyLeft",
      1522: "AdvFlyRight",
      1523: "FlyAdvFlyRight",
      1524: "AdvFlyForward",
      1525: "FlyAdvFlyForward",
      1526: "AdvFlyBackward",
      1527: "FlyAdvFlyBackward",
      1528: "AdvFlyUp",
      1529: "FlyAdvFlyUp",
      1530: "AdvFlyDown",
      1531: "FlyAdvFlyDown",
      1532: "AdvFlyForwardGlide",
      1533: "FlyAdvFlyForwardGlide",
      1534: "AdvFlyRoll",
      1535: "FlyAdvFlyRoll",
      1536: "ProfCookingLoop",
      1537: "FlyProfCookingLoop",
      1538: "ProfCookingStart",
      1539: "FlyProfCookingStart",
      1540: "ProfCookingEnd",
      1541: "FlyProfCookingEnd",
      1542: "WACurious",
      1543: "FlyWACurious",
      1544: "WAAlert",
      1545: "FlyWAAlert",
      1546: "WAInvestigate",
      1547: "FlyWAInvestigate",
      1548: "WAInteraction",
      1549: "FlyWAInteraction",
      1550: "WAThreaten",
      1551: "FlyWAThreaten",
      1552: "WAReact01",
      1553: "FlyWAReact01",
      1554: "WAReact02",
      1555: "FlyWAReact02",
      1556: "AdvFlyRollStart",
      1557: "FlyAdvFlyRollStart",
      1558: "AdvFlyRollEnd",
      1559: "FlyAdvFlyRollEnd",
      1560: "EmpBreathPrecast",
      1561: "FlyEmpBreathPrecast",
      1562: "EmpBreathPrecastChannel",
      1563: "FlyEmpBreathPrecastChannel",
      1564: "EmpBreathSpellCast",
      1565: "FlyEmpBreathSpellCast",
      1566: "EmpBreathSpellCastChannel",
      1567: "FlyEmpBreathSpellCastChannel",
      1568: "DracFlyBreathTakeoffStart",
      1569: "FlyDracFlyBreathTakeoffStart",
      1570: "DracFlyBreathTakeoffFinish",
      1571: "FlyDracFlyBreathTakeoffFinish",
      1572: "DracFlyBreath",
      1573: "FlyDracFlyBreath",
      1574: "DracFlyBreathLandStart",
      1575: "FlyDracFlyBreathLandStart",
      1576: "DracFlyBreathLandFinish",
      1577: "FlyDracFlyBreathLandFinish",
      1578: "DracAirDashLeft",
      1579: "FlyDracAirDashLeft",
      1580: "DracAirDashForward",
      1581: "FlyDracAirDashForward",
      1582: "DracAirDashBackward",
      1583: "FlyDracAirDashBackward",
      1584: "DracAirDashRight",
      1585: "FlyDracAirDashRight",
      1586: "LivingWorldProximityEnter",
      1587: "FlyLivingWorldProximityEnter",
      1588: "AdvFlyDownEnd",
      1589: "FlyAdvFlyDownEnd",
      1590: "LivingWorldProximityLoop",
      1591: "FlyLivingWorldProximityLoop",
      1592: "LivingWorldProximityLeave",
      1593: "FlyLivingWorldProximityLeave",
      1594: "EmpAirBarragePrecast",
      1595: "FlyEmpAirBarragePrecast",
      1596: "EmpAirBarragePrecastChannel",
      1597: "FlyEmpAirBarragePrecastChannel",
      1598: "EmpAirBarrageSpellCast",
      1599: "FlyEmpAirBarrageSpellCast",
      1600: "DracClawSwipeLeft",
      1601: "FlyDracClawSwipeLeft",
      1602: "DracClawSwipeRight",
      1603: "FlyDracClawSwipeRight",
      1604: "DracHoverIdle",
      1605: "FlyDracHoverIdle",
      1606: "DracHoverLeft",
      1607: "FlyDracHoverLeft",
      1608: "DracHoverRight",
      1609: "FlyDracHoverRight",
      1610: "DracHoverBackward",
      1611: "FlyDracHoverBackward",
      1612: "DracHoverForward",
      1613: "FlyDracHoverForward",
      1614: "DracAttackWings",
      1615: "FlyDracAttackWings",
      1616: "DracAttackTail",
      1617: "FlyDracAttackTail",
      1618: "AdvFlyStart",
      1619: "FlyAdvFlyStart",
      1620: "AdvFlyLand",
      1621: "FlyAdvFlyLand",
      1622: "AdvFlyLandRun",
      1623: "FlyAdvFlyLandRun",
      1624: "AdvFlyStrafeLeft",
      1625: "FlyAdvFlyStrafeLeft",
      1626: "AdvFlyStrafeRight",
      1627: "FlyAdvFlyStrafeRight",
      1628: "AdvFlyIdle",
      1629: "FlyAdvFlyIdle",
      1630: "AdvFlyRollRight",
      1631: "FlyAdvFlyRollRight",
      1632: "AdvFlyRollRightEnd",
      1633: "FlyAdvFlyRollRightEnd",
      1634: "AdvFlyRollLeft",
      1635: "FlyAdvFlyRollLeft",
      1636: "AdvFlyRollLeftEnd",
      1637: "FlyAdvFlyRollLeftEnd",
      1638: "AdvFlyFlap",
      1639: "FlyAdvFlyFlap",
      1640: "DracHoverDracClawSwipeLeft",
      1641: "FlyDracHoverDracClawSwipeLeft",
      1642: "DracHoverDracClawSwipeRight",
      1643: "FlyDracHoverDracClawSwipeRight",
      1644: "DracHoverDracAttackWings",
      1645: "FlyDracHoverDracAttackWings",
      1646: "DracHoverReadySpellOmni",
      1647: "FlyDracHoverReadySpellOmni",
      1648: "DracHoverSpellCastOmni",
      1649: "FlyDracHoverSpellCastOmni",
      1650: "DracHoverChannelSpellOmni",
      1651: "FlyDracHoverChannelSpellOmni",
      1652: "DracHoverReadySpellDirected",
      1653: "FlyDracHoverReadySpellDirected",
      1654: "DracHoverChannelSpellDirected",
      1655: "FlyDracHoverChannelSpellDirected",
      1656: "DracHoverSpellCastDirected",
      1657: "FlyDracHoverSpellCastDirected",
      1658: "DracHoverCastOutStrong",
      1659: "FlyDracHoverCastOutStrong",
      1660: "DracHoverBattleRoar",
      1661: "FlyDracHoverBattleRoar",
      1662: "DracHoverEmpBreathSpellCast",
      1663: "FlyDracHoverEmpBreathSpellCast",
      1664: "DracHoverEmpBreathSpellCastChannel",
      1665: "FlyDracHoverEmpBreathSpellCastChannel",
      1666: "LivingWorldTimeOfDayEnter",
      1667: "FlyLivingWorldTimeOfDayEnter",
      1668: "LivingWorldTimeOfDayLoop",
      1669: "FlyLivingWorldTimeOfDayLoop",
      1670: "LivingWorldTimeOfDayLeave",
      1671: "FlyLivingWorldTimeOfDayLeave",
      1672: "LivingWorldWeatherEnter",
      1673: "FlyLivingWorldWeatherEnter",
      1674: "LivingWorldWeatherLoop",
      1675: "FlyLivingWorldWeatherLoop",
      1676: "LivingWorldWeatherLeave",
      1677: "FlyLivingWorldWeatherLeave",
      1678: "AdvFlyDownStart",
      1679: "FlyAdvFlyDownStart",
      1680: "AdvFlyFlapBig",
      1681: "FlyAdvFlyFlapBig",
      1682: "DracHoverReadyUnarmed",
      1683: "FlyDracHoverReadyUnarmed",
      1684: "DracHoverAttackUnarmed",
      1685: "FlyDracHoverAttackUnarmed",
      1686: "DracHoverParryUnarmed",
      1687: "FlyDracHoverParryUnarmed",
      1688: "DracHoverCombatWound",
      1689: "FlyDracHoverCombatWound",
      1690: "DracHoverCombatCritical",
      1691: "FlyDracHoverCombatCritical",
      1692: "DracHoverAttackTail",
      1693: "FlyDracHoverAttackTail",
      1694: "Glide",
      1695: "FlyGlide",
      1696: "GlideEnd",
      1697: "FlyGlideEnd",
      1698: "DracClawSwipe",
      1699: "FlyDracClawSwipe",
      1700: "DracHoverDracClawSwipe",
      1701: "FlyDracHoverDracClawSwipe",
      1702: "AdvFlyFlapUp",
      1703: "FlyAdvFlyFlapUp",
      1704: "AdvFlySlowFall",
      1705: "FlyAdvFlySlowFall",
      1706: "AdvFlyFlapFoward",
      1707: "FlyAdvFlyFlapFoward",
      1708: "DracSpellCastWings",
      1709: "FlyDracSpellCastWings",
      1710: "DracHoverDracSpellCastWings",
      1711: "FlyDracHoverDracSpellCastWings",
      1712: "DracAirDashVertical",
      1713: "FlyDracAirDashVertical",
      1714: "DracAirDashRefresh",
      1715: "FlyDracAirDashRefresh",
      1716: "SkinningLoop",
      1717: "FlySkinningLoop",
      1718: "SkinningStart",
      1719: "FlySkinningStart",
      1720: "SkinningEnd",
      1721: "FlySkinningEnd",
      1722: "AdvFlyForwardGlideSlow",
      1723: "FlyAdvFlyForwardGlideSlow",
      1724: "AdvFlyForwardGlideFast",
      1725: "FlyAdvFlyForwardGlideFast",
      1726: "AdvFlySecondFlapUp",
      1727: "FlyAdvFlySecondFlapUp",
      1728: "FloatIdle",
      1729: "FlyFloatIdle",
      1730: "FloatWalk",
      1731: "FlyFloatWalk",
      1732: "CinematicTalk",
      1733: "FlyCinematicTalk",
      1734: "CinematicWAGuardEmoteSlam01",
      1735: "FlyCinematicWAGuardEmoteSlam01",
      1736: "WABlowHorn",
      1737: "FlyWABlowHorn",
      1738: "MountExtraWide",
      1739: "FlyMountExtraWide",
      1740: "WA2HIdle",
      1741: "FlyWA2HIdle",
      1742: "HerbalismLoop",
      1743: "FlyHerbalismLoop",
      1744: "CookingLoop",
      1745: "FlyCookingLoop",
      1746: "WAWeaponSharpenNoSheathe",
      1747: "FlyWAWeaponSharpenNoSheathe",
      1748: "CinematicDeath",
      1749: "FlyCinematicDeath",
      1750: "CinematicDeathPose",
      1751: "FlyCinematicDeathPose",
      1752: "EmpSlamPrecast",
      1753: "FlyEmpSlamPrecast",
      1754: "EmpSlamPrecastChannel",
      1755: "FlyEmpSlamPrecastChannel",
      1756: "EmpSlamSpellCast",
      1757: "FlyEmpSlamSpellCast",
      1758: "Climb",
      1759: "FlyClimb",
      1760: "ClimbStart",
      1761: "FlyClimbStart",
      1762: "ClimbEnd",
      1763: "FlyClimbEnd",
      1764: "MountLeanLeft",
      1765: "FlyMountLeanLeft",
      1766: "MountLeanRight",
      1767: "FlyMountLeanRight",
      1768: "MountDive",
      1769: "FlyMountDive",
      1770: "MountCrouch",
      1771: "FlyMountCrouch",
      1772: "WAShovelLoop",
      1773: "FlyWAShovelLoop",
      1774: "EmoteTalkFrustrated",
      1775: "FlyEmoteTalkFrustrated",
      1776: "MountMedium",
      1777: "FlyMountMedium",
      1778: "CombatAbilityBowUp",
      1779: "FlyCombatAbilityBowUp",
      1780: "CombatAbilityRifleUp",
      1781: "FlyCombatAbilityRifleUp",
      1782: "EmoteOfferStart",
      1783: "FlyEmoteOfferStart",
      1784: "EmoteOfferLoop",
      1785: "FlyEmoteOfferLoop",
      1786: "EmoteOfferEnd",
      1787: "FlyEmoteOfferEnd",
    };
  class Ds {
    constructor(t) {
      var e,
        i = this;
      ((i.g = t.getUint16()), (i.e = t.getUint16()), (i.a = t.getUint32()));
      t.getFloat();
      ((i.i = t.getUint32()),
        (i.h = t.getUint16()),
        t.getUint16(),
        t.getUint32(),
        t.getUint32(),
        (i.b = t.getUint16()),
        (i.k = t.getUint16()),
        (i.c = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
        (i.l = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
        t.getFloat(),
        (i.j = t.getInt16()),
        (i.d = t.getInt16()),
        (i.f = null !== (e = Es[i.g]) && void 0 !== e ? e : ""));
    }
    m() {}
  }
  class Ms {
    constructor(t, e) {
      ((this.b = t.getInt32()),
        (this.i = t.getUint32()),
        (this.d = t.getInt16()),
        (this.h = t.getUint16()),
        (this.g = t.getUint32()),
        (this.a = jn(t, e)),
        (this.e = (function (t, e, i = !0) {
          return _n.h(t, e, Dn, In, i);
        })(t, e)),
        (this.c = jn(t, e)),
        (this.f = Ue(t.getFloat(), t.getFloat(), t.getFloat())));
    }
  }
  class ks {
    constructor(t, e) {
      ((this.d = t.getUint32()),
        (this.l = t.getUint32()),
        (this.o = Ue(t.getFloat(), t.getFloat(), t.getFloat())));
      const i = t.getInt32(),
        r = t.getInt32();
      if (i > 0) {
        const t = new cn(e.chunkData);
        ((t.position = r), (this.n = new Array(i)));
        for (let e = 0; e < i; e++) this.n[e] = t.getInt16();
      }
      const n = t.getInt32(),
        s = t.getInt32();
      if (n > 0) {
        const t = new cn(e.chunkData);
        ((t.position = s), (this.h = new Array(n)));
        for (let e = 0; e < n; e++) this.h[e] = t.getInt16();
      }
      ((this.i = jn(t, e, !1)),
        (this.p = zn(t, e, !1)),
        (this.k = Vn(t, e, !1)),
        (this.g = Vn(t, e, !1)),
        (this.e = t.getFloat()),
        (this.b = t.getFloat()),
        (this.q = t.getFloat()),
        (this.j = t.getInt16()),
        (this.m = t.getInt16()),
        (this.r = zn(t, e, !1)),
        (this.c = qn(t, e, !1)),
        (this.f = t.getInt16()),
        t.getUint16());
    }
  }
  class Bs {
    constructor(t) {
      ((this.a = t.getInt32()), (this.b = t.getUint32()), t.getInt32(), t.getInt32());
    }
  }
  class Rs {
    constructor(t) {
      ((this.g = t.flags),
        (this.e = t.priorityPlane),
        (this.h = t.shaderId),
        (this.l = t.meshIndex),
        (this.i = t.geosetIndex),
        (this.b = t.colorIndex),
        (this.k = t.renderFlagIndex),
        (this.a = t.materialLayer),
        (this.d = t.textureCount),
        (this.m = t.materialIndex),
        (this.c = t.texUnitIndex),
        (this.j = t.alphaIndex),
        (this.f = t.textureAnimIndex));
    }
  }
  class Ps {
    constructor(t, e) {
      ((this.i = t.getInt16()),
        (this.f = t.getInt16()),
        (this.h = Ue(t.getFloat(), t.getFloat(), t.getFloat())),
        (this.c = jn(t, e, !1)),
        (this.b = Vn(t, e, !1)),
        (this.a = jn(t, e, !1)),
        (this.j = Vn(t, e, !1)),
        (this.g = Vn(t, e, !1)),
        (this.d = Vn(t, e, !1)),
        (this.e = qn(t, e, !1)));
    }
  }
  const Is = class {
    constructor(t) {
      var e = this;
      ((e.d = t.getInt16()),
        (e.a = t.getFloat()),
        (e.e = t.getFloat()),
        (e.c = t.getUint16()),
        (e.b = t.getUint32()));
    }
  };
  const Ls = class {
    constructor(t) {
      var e = this;
      ((e.c = t.getFloat()), (e.d = t.getFloat()), (e.b = t.getUint32()), (e.a = t.getUint32()));
    }
  };
  function Us(t) {
    return { count: t.getInt32(), offset: t.getInt32() };
  }
  function Os(t) {
    return new Float32Array([t.getFloat(), t.getFloat(), t.getFloat()]);
  }
  class Hs {
    constructor(t) {
      ((this.d = []),
        (this.c = []),
        (this.f = []),
        (this.e = []),
        (this.i = -1),
        (this.p = []),
        (this.b = []),
        (this.j = null),
        (this.n = null),
        (this.o = null),
        (this.m = null),
        (this.g = null),
        (this.a = null));
      const e = new cn(t),
        i = t.byteLength;
      for (; e.position < i && !(e.position + 8 > i); ) {
        const r = e.getUint32(),
          n = e.getUint32();
        if (e.position + n > i) break;
        const s = e.position;
        switch (r) {
          case 825377869:
            ((this.l = t.slice(s, s + n)), this.h());
            break;
          case 1145652819: {
            const t = n / 4;
            this.d = new Array(t);
            for (let i = 0; i < t; i++) this.d[i] = e.getUint32();
            break;
          }
          case 1145657428: {
            const t = n / 4;
            this.c = new Array(t);
            for (let i = 0; i < t; i++) this.c[i] = e.getUint32();
            break;
          }
          case 1145652801: {
            const t = n / 8;
            this.f = new Array(t);
            for (let i = 0; i < t; i++)
              this.f[i] = {
                animId: e.getUint16(),
                subAnimId: e.getUint16(),
                fileDataId: e.getUint32(),
              };
            break;
          }
          case 1145652802: {
            const t = n / 4;
            this.e = new Array(t);
            for (let i = 0; i < t; i++) this.e[i] = e.getUint32();
            break;
          }
          case 1145654099:
            this.i = e.getUint32();
            break;
          case 844126277:
            this.j = t.slice(s, s + n);
            break;
          case 826558288:
            this.n = t.slice(s, s + n);
            break;
          case 1280591172:
            this.o = t.slice(s, s + n);
            break;
          case 1280262992:
            this.m = t.slice(s, s + n);
            break;
          case 1447645252:
            this.g = t.slice(s, s + n);
            break;
          case 1280853332:
            this.a = t.slice(s, s + n);
            break;
          case 1145655378: {
            const t = n / 4;
            this.p = new Array(t);
            for (let i = 0; i < t; i++) this.p[i] = e.getUint32();
            break;
          }
          case 1145655367: {
            const t = n / 4;
            this.b = new Array(t);
            for (let i = 0; i < t; i++) this.b[i] = e.getUint32();
            break;
          }
        }
        e.position = s + n;
      }
    }
    h() {
      const t = new cn(this.l),
        e = {};
      ((e.magic = t.getUint32()),
        (e.version = t.getUint32()),
        (e.name = Us(t)),
        (e.flags = t.getUint32()),
        (e.globalLoops = Us(t)),
        (e.sequences = Us(t)),
        (e.sequenceLookup = Us(t)),
        (e.bones = Us(t)),
        (e.keyBoneLookup = Us(t)),
        (e.vertices = Us(t)),
        (e.numSkins = t.getUint32()),
        (e.colors = Us(t)),
        (e.textures = Us(t)),
        (e.textureWeights = Us(t)),
        (e.textureTransforms = Us(t)),
        (e.replacableTextureLookup = Us(t)),
        (e.materials = Us(t)),
        (e.boneLookup = Us(t)),
        (e.textureLookup = Us(t)),
        (e.textureUnitLookup = Us(t)),
        (e.transparencyLookup = Us(t)),
        (e.textureTransformsLookup = Us(t)),
        (e.boundingBox1 = Os(t)),
        (e.boundingBox2 = Os(t)),
        (e.boundingSphereRadius = t.getFloat()),
        (e.collisionBox1 = Os(t)),
        (e.collisionBox2 = Os(t)),
        (e.collisionSphereRadius = t.getFloat()),
        (e.collisionTriangles = Us(t)),
        (e.collisionVertices = Us(t)),
        (e.collisionNormals = Us(t)),
        (e.attachments = Us(t)),
        (e.attachmentLookup = Us(t)),
        (e.events = Us(t)),
        (e.lights = Us(t)),
        (e.cameras = Us(t)),
        (e.cameraLookup = Us(t)),
        (e.ribbonEmitters = Us(t)),
        (e.particleEmitters = Us(t)),
        8 & e.flags && (e.textureCombinerCombos = Us(t)),
        (this.k = e));
    }
  }
  function Ws(t, e, i) {
    if (e.count <= 0) return [];
    const r = new cn(t);
    r.position = e.offset;
    const n = new Array(e.count);
    for (let t = 0; t < e.count; t++) n[t] = i(r);
    return n;
  }
  function Ns(t, e) {
    return Ws(t, e, (t) => t.getInt16());
  }
  function Gs(t, e) {
    return Ws(t, e, (t) => t.getUint32());
  }
  var js = function (t, e, i, r) {
    return new (i || (i = Promise))(function (n, s) {
      function a(t) {
        try {
          l(r.next(t));
        } catch (t) {
          s(t);
        }
      }
      function o(t) {
        try {
          l(r.throw(t));
        } catch (t) {
          s(t);
        }
      }
      function l(t) {
        var e;
        t.done
          ? n(t.value)
          : ((e = t.value),
            e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                })).then(a, o);
      }
      l((r = r.apply(t, e || [])).next());
    });
  };
  class zs {
    constructor(t, e) {
      ((this.f = new Map()), (this.h = new Map()), (this.i = t), (this.g = e));
    }
    b(t, e) {
      for (const i of this.g) if (i.animId === t && i.subAnimId === e) return i.fileDataId;
      return 0;
    }
    d(t) {
      return this.f.has(t);
    }
    a(t) {
      return this.f.get(t) || null;
    }
    j(t) {
      return js(this, void 0, void 0, function* () {
        if (t <= 0) return null;
        if (this.f.has(t)) return this.f.get(t);
        if (this.h.has(t)) return this.h.get(t);
        const e = this.c(t);
        this.h.set(t, e);
        try {
          const i = yield e;
          return (this.f.set(t, i), i);
        } finally {
          this.h.delete(t);
        }
      });
    }
    c(t) {
      return js(this, void 0, void 0, function* () {
        const e = this.i + "anim/" + t + ".anim",
          i = yield fetch(e);
        if (!i.ok)
          return (
            console.warn("Failed to fetch anim file:", e, i.status),
            { afsa: null, afsb: null, afm2: null, rawStream: null }
          );
        const r = yield i.arrayBuffer();
        return this.e(r);
      });
    }
    e(t) {
      const e = { afsa: null, afsb: null, afm2: null, rawStream: t },
        i = new cn(t),
        r = t.byteLength;
      for (; i.position < r && !(i.position + 8 > r); ) {
        const n = i.getUint32(),
          s = i.getUint32(),
          a = i.position;
        if (a + s > r) break;
        switch (n) {
          case 1095976513:
            e.afsa = t.slice(a, a + s);
            break;
          case 1112753729:
            e.afsb = t.slice(a, a + s);
            break;
          case 843925057:
            e.afm2 = t.slice(a, a + s);
        }
        i.position = a + s;
      }
      return e;
    }
  }
  var Vs = function (t, e, i, r) {
    return new (i || (i = Promise))(function (n, s) {
      function a(t) {
        try {
          l(r.next(t));
        } catch (t) {
          s(t);
        }
      }
      function o(t) {
        try {
          l(r.throw(t));
        } catch (t) {
          s(t);
        }
      }
      function l(t) {
        var e;
        t.done
          ? n(t.value)
          : ((e = t.value),
            e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                })).then(a, o);
      }
      l((r = r.apply(t, e || [])).next());
    });
  };
  class qs {
    constructor(t, e, i) {
      var r;
      if (
        ((this.T = []),
        (this.x = []),
        (this.a = []),
        (this.aa = []),
        (this.ac = []),
        (this.D = []),
        (this.K = []),
        (this.U = []),
        (this.C = []),
        (this.A = []),
        (this.B = []),
        (this.f = []),
        (this.S = []),
        (this.P = []),
        (this.k = []),
        (this.R = []),
        (this.F = []),
        (this.b = []),
        (this.I = []),
        (this.d = []),
        (this.e = []),
        (this.j = []),
        (this.J = []),
        (this.u = []),
        (this.c = []),
        (this.w = []),
        (this.t = []),
        (this.h = []),
        (this.Q = []),
        (this.Y = []),
        (this.H = []),
        (this.z = []),
        (this.s = []),
        (this.q = []),
        (this.O = []),
        (this.r = []),
        (this.y = null),
        (this.Z = []),
        !t || !t.l)
      )
        return void console.error("Bad M2 file data");
      const n = t.k,
        s = t.l;
      this.o = n.flags;
      const a = (null == i ? void 0 : i.skb1Data) || s,
        o = (null == i ? void 0 : i.bonesArr) || n.bones,
        l = (null == i ? void 0 : i.keyBoneLookupArr) || n.keyBoneLookup,
        h = (null == i ? void 0 : i.sks1Data) || s,
        u = (null == i ? void 0 : i.sequencesArr) || n.sequences,
        c = (null == i ? void 0 : i.sequenceLookupArr) || n.sequenceLookup,
        d = (null == i ? void 0 : i.globalLoopsArr) || n.globalLoops,
        f = (null == i ? void 0 : i.ska1Data) || s,
        g = (null == i ? void 0 : i.attachmentsArr) || n.attachments,
        p = (null == i ? void 0 : i.attachmentLookupArr) || n.attachmentLookup;
      ((this.a = Gs(h, d)), u.count > 0 && (this.aa = Ws(h, u, (t) => new Ds(t))));
      const m = this.aa.map((t) => t.i);
      this.ac = Ns(h, c);
      const b = { chunkData: s, numSequences: this.aa.length, sequenceFlags: m },
        y = { chunkData: a, numSequences: this.aa.length, sequenceFlags: m };
      if (
        (n.vertices.count > 0 && (this.T = Ws(s, n.vertices, (t) => new ys(t))),
        (this.x = e.b()),
        e.a.length > 0 && (this.C = e.a.map((t) => new Fs(t))),
        e.d.length > 0 && (this.A = e.d.map((t) => new Rs(t))),
        o.count > 0)
      ) {
        this.D = Ws(a, o, (t) => new Ms(t, y));
        for (const t of this.D) this.Z.push(t.a, t.e, t.c);
      }
      if (
        ((null === (r = null == i ? void 0 : i.boneOverrides) || void 0 === r ? void 0 : r.length) >
          0 && this.i(i.boneOverrides),
        (this.U = Ns(a, l)),
        (this.K = Ns(s, n.boneLookup)),
        n.materials.count > 0 && (this.V = Ws(s, n.materials, (t) => new Ss(t))),
        n.textures.count > 0)
      ) {
        this.f = Ws(s, n.textures, (t) => new Bs(t));
        for (let e = 0; e < this.f.length && e < t.c.length; e++) this.f[e].c = t.c[e];
      }
      if (
        ((this.S = Ns(s, n.textureLookup)),
        (this.B = Ns(s, n.textureUnitLookup)),
        (this.I = Ns(s, n.replacableTextureLookup)),
        (this.u = Ns(s, n.transparencyLookup)),
        (this.b = Ns(s, n.textureTransformsLookup)),
        n.textureTransforms.count > 0 && (this.F = Ws(s, n.textureTransforms, (t) => new vs(t, b))),
        n.colors.count > 0 && (this.j = Ws(s, n.colors, (t) => new Cs(t, b))),
        n.textureWeights.count > 0 && (this.J = Ws(s, n.textureWeights, (t) => new xs(t, b))),
        (this.m = Ue(n.boundingBox1[0], n.boundingBox1[1], n.boundingBox1[2])),
        (this.v = Ue(n.boundingBox2[0], n.boundingBox2[1], n.boundingBox2[2])),
        (this.G = n.boundingSphereRadius),
        (this.L = Ue(n.collisionBox1[0], n.collisionBox1[1], n.collisionBox1[2])),
        (this.E = Ue(n.collisionBox2[0], n.collisionBox2[1], n.collisionBox2[2])),
        (this.W = n.collisionSphereRadius),
        n.collisionTriangles.count > 0 &&
          (this.P = Ws(s, n.collisionTriangles, (t) => t.getUint16())),
        n.collisionVertices.count > 0 &&
          (this.k = Ws(s, n.collisionVertices, (t) =>
            Ue(t.getFloat(), t.getFloat(), t.getFloat()),
          )),
        n.collisionNormals.count > 0 &&
          (this.R = Ws(s, n.collisionNormals, (t) => Ue(t.getFloat(), t.getFloat(), t.getFloat()))),
        g.count > 0 && (this.d = Ws(f, g, (t) => new Ts(t))),
        (this.e = Ns(f, p)),
        n.lights.count > 0 && (this.c = Ws(s, n.lights, (t) => new Ps(t, b))),
        n.particleEmitters.count > 0 && (this.w = Ws(s, n.particleEmitters, (t) => new ws(t, b))),
        n.ribbonEmitters.count > 0 && (this.t = Ws(s, n.ribbonEmitters, (t) => new ks(t, b))),
        t.j)
      ) {
        const e = new cn(t.j),
          i = { count: e.getInt32(), offset: e.getInt32() };
        i.count > 0 && (this.h = Ws(t.j, i, (e) => new As(e, t.j)));
      }
      if (t.n) {
        const e = new cn(t.n),
          i = t.n.byteLength / 2;
        this.Q = new Array(i);
        for (let t = 0; t < i; t++) this.Q[t] = e.getInt16();
      }
      if (t.o) {
        const e = new cn(t.o),
          i = t.o.byteLength / 16;
        this.Y = new Array(i);
        for (let t = 0; t < i; t++) this.Y[t] = new Is(e);
      }
      if (t.a) {
        const e = new cn(t.a),
          i = t.a.byteLength / 16;
        this.r = new Array(i);
        for (let t = 0; t < i; t++) this.r[t] = new Ls(e);
      }
      (t.m && this.n(t.m), t.g && this.N(t.g));
    }
    i(t) {
      for (const e of t) {
        const t = Ws(e.sks1Data, e.sequencesArr, (t) => new Ds(t)),
          i = new Map();
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          for (let t = 0; t < this.aa.length; t++)
            if (this.aa[t].g === r.g && this.aa[t].e === r.e) {
              i.set(t, e);
              break;
            }
        }
        for (const [e, r] of i) t[r].a > this.aa[e].a && (this.aa[e].a = t[r].a);
        const r = Gs(e.sks1Data, e.globalLoopsArr);
        r.length > this.a.length && (this.a = r);
        const n = {
            chunkData: e.skb1Data,
            numSequences: t.length,
            sequenceFlags: t.map((t) => t.i),
          },
          s = Ws(e.skb1Data, e.bonesArr, (t) => new Ms(t, n)),
          a = Math.min(this.D.length, s.length);
        for (let t = 0; t < a; t++) {
          const e = this.D[t],
            r = s[t];
          for (const [t, n] of i)
            (t < e.a.c.length && n < r.a.c.length && (e.a.c[t] = r.a.c[n]),
              t < e.e.c.length && n < r.e.c.length && (e.e.c[t] = r.e.c[n]),
              t < e.c.c.length && n < r.c.c.length && (e.c.c[t] = r.c.c[n]));
        }
      }
    }
    n(t) {
      const e = new cn(t),
        i = e.getInt32(),
        r = e.getInt32(),
        n = e.getInt32(),
        s = e.getInt32(),
        a = e.getInt32(),
        o = e.getInt32(),
        l = e.getInt32(),
        h = e.getInt32();
      if (i > 0) {
        e.position = r;
        for (let t = 0; t < i; t++) this.H.push(Ue(e.getFloat(), e.getFloat(), e.getFloat()));
      }
      if (n > 0) {
        e.position = s;
        for (let t = 0; t < n; t++) this.z.push(Ue(e.getFloat(), e.getFloat(), e.getFloat()));
      }
      if (a > 0) {
        e.position = o;
        for (let t = 0; t < a; t++) this.s.push(e.getUint16());
      }
      if (l > 0) {
        e.position = h;
        for (let t = 0; t < l; t++) this.q.push(e.getUint16());
      }
    }
    N(t) {
      const e = new cn(t);
      ((this.X = Ue(e.getFloat(), e.getFloat(), e.getFloat())), (this.O = []));
      for (let i = 0; i < 5 && e.position < t.byteLength; i++) this.O.push(e.getInt32());
    }
    M(t, e) {
      this.y = new zs(t, e);
    }
    p(t) {
      for (const e of this.Z) if (e.f(t)) return !0;
      return !1;
    }
    l(t) {
      if (t < 0 || t >= this.aa.length || !this.y) return 0;
      const e = this.aa[t];
      return this.y.b(e.g, e.e);
    }
    g(t, e) {
      const i = e.afsb || e.afm2 || e.rawStream;
      if (i) {
        for (const e of this.Z) e.a(t, i);
        if (t >= 0 && t < this.aa.length) {
          let e = 0;
          for (const i of this.Z) {
            const r = i.e(t);
            r > e && (e = r);
          }
          e > this.aa[t].a && (this.aa[t].a = e);
        }
      }
    }
    ab(t) {
      return Vs(this, void 0, void 0, function* () {
        if (!this.y) return;
        if (!this.p(t)) return;
        const e = this.l(t);
        if (e <= 0) return;
        const i = yield this.y.j(e);
        i && this.g(t, i);
        const r = this.aa[t];
        if (r && r.d >= 0 && r.d < this.aa.length) {
          const t = r.d;
          this.p(t) && (yield this.ab(t));
        }
      });
    }
  }
  const Xs = class {
    constructor(t) {
      ((this.a = t),
        (this.y = new Float32Array([1, 1, 1, 1])),
        (this.z = !1),
        (this.f = !0),
        (this.s = null),
        (this.A = null),
        (this.n = 0),
        (this.g = null),
        (this.w = []),
        (this.i = []),
        (this.e = new Array()),
        (this.F = null),
        (this.b = []),
        (this.r = t.h),
        (this.k = t.d),
        (this.v = !1),
        (this.l = !1),
        (this.p = !1),
        (this.m = Vi()),
        (this.D = Ie()),
        (this.C = Qr()));
    }
    E(t) {
      this.s = t;
      const e = t.r,
        i = this.a;
      ((this.A = e.C[this.a.l]), (this.n = this.A.a), Ss.b(this));
      let r = e.S[i.m];
      1 == i.d && r > -1 && 1 == e.f[r].a && ((this.r = -1e3), (this.k = 3));
      for (let r = 0; r < this.k; r++) {
        if (i.m > -1 && i.m < e.S.length) {
          let n = e.S[i.m + r];
          n > -1 && n < e.f.length && this.w.splice(r, 0, t.V[n]);
        }
        if (i.f > -1 && i.f < e.b.length) {
          let t = e.b[i.f + r];
          t > -1 && e.F && t < e.F.length
            ? (this.i.splice(r, 0, e.F[t]),
              console.log("TextureAnim found for batch:", this.a.m, "animIdx:", t))
            : this.i.splice(r, 0, null);
        }
        if (i.j > -1 && i.j < e.u.length) {
          let t = e.u[i.j + r];
          t > -1 && t < e.J.length ? this.b.splice(r, 0, e.J[t]) : this.b.splice(r, 0, null);
        }
      }
      this.e = new Array(this.i.length);
      for (let t = 0; t < this.e.length; t++) this.e[t] = ni();
      e.j && i.b > -1 && i.b < e.j.length && (this.F = e.j[i.b]);
    }
    B() {
      this.s.r;
      let t = qi(this.A.d[0], this.A.d[1], this.A.d[2], 1),
        e = this.s.ah[this.A.e].p,
        i = ni();
      (ui(i, i, this.s.aF.viewMatrix), ui(i, i, this.s.s), ui(i, i, e), tr(t, t, i), (t[3] = 0));
      let r = er(t);
      if ((3 & this.a.g) > 0) {
        let e = Vi();
        (r > 0 ? Ji(e, t, 1 / r) : Xi(e, t),
          Ji(e, e, Le(Ue(i[8], i[9], i[10])) * this.A.k),
          1 & this.a.g ? $i(e, t, e) : Yi(e, t, e),
          (r = Qi(e)));
      }
      return r;
    }
    H() {
      (this.s, this.s.aF.context);
      const t = this.s.an;
      if (
        ((this.m[0] = this.m[1] = this.m[2] = this.m[3] = 1),
        this.F && this.F.d(t, this.s.k, this.m),
        this.b[0] && (this.m[3] *= this.b[0].a(t, this.s.k)),
        (this.m[3] *= this.s.Y[3]),
        !(this.m[3] <= 0.001))
      ) {
        for (let e = 0; e < this.b.length; e++) {
          const i = this.b[e];
          i && (this.y[e] = i.a(t, this.s.k));
        }
        if (!this.z || this.s.au) {
          const t = this.h();
          let e = !0;
          for (const i of t) {
            const t = i.d;
            e = e && null != t;
          }
          if (((this.z = e), !e)) return;
          ((this.j = this.x(!1, !1)),
            (this.u = this.x(!0, !1)),
            (this.o = this.x(!1, !0)),
            this.s.shadowyEffect && (this.d = this.t()));
        }
        if (
          (this.i.forEach((e, i) => {
            if (!this.s.G && (oi(this.e[i]), this.i[i])) {
              let e = !1,
                r = !1;
              (this.i[i].b && this.i[i].b.d(t.a.a)
                ? ((this.D = this.i[i].b.g(t, this.s.k)), (r = !0))
                : He(this.D, 0, 0, 0),
                this.i[i].a && this.i[i].a.d(t.a.a)
                  ? ((this.C = this.i[i].a.g(t, this.s.k)), (e = !0))
                  : hn(this.C, 0, 0, 0, 1));
              let n,
                s = !1;
              if (
                (this.i[i].d &&
                  this.i[i].d.d(t.a.a) &&
                  ((n = this.i[i].d.g(t, this.s.k)), (s = !0)),
                oi(this.e[i]),
                ci(this.e[i], this.e[i], Ue(0.5, 0.5, 0)),
                s && di(this.e[i], this.e[i], n),
                e)
              ) {
                let t = ni();
                (pi(t, this.C, [0, 0, 0]), ui(this.e[i], this.e[i], t));
              }
              (r && ci(this.e[i], this.e[i], this.D), ci(this.e[i], this.e[i], Ue(-0.5, -0.5, 0)));
            }
          }),
          this.z)
        ) {
          (this.m[3] < 1 ? this.u : this.j).f = this.B();
        }
      }
    }
    q(t, e) {
      if (!this.j) return;
      const i = this.s.t.b();
      if (e) i.a(this.o);
      else {
        const e = this.j.c.b() <= Sr.GxBlend_AlphaKey,
          r = null != this.s.gradientEffect,
          n = this.m[3] < 1;
        this.d
          ? t
            ? i.a(this.d)
            : i.a(this.o)
          : t && e && (n || r)
            ? (i.a(this.o), i.a(this.u))
            : ((!t && e) || (t && !e)) && i.a(this.j);
      }
    }
    x(t, e) {
      const i = this,
        r = t && i.g.c < 2 ? Sr.GxBlend_Alpha : i.g.c,
        n = [0, 1, 2, 10, 3, 4, 5, 13][r],
        s = this.s.t,
        a = this.s,
        o = Object.assign(Object.assign({}, this.s.aP), this.s.y);
      for (let t = 0; t < this.i.length; t++) o["uTextureMatrix" + (t + 1).toString()] = this.e[t];
      ((o.uColor = this.m),
        (o.uTexSampleAlpha = this.y),
        (o.uBlendMode = n),
        (o.uHasSpecEmiss = !!a.c[0] && !!a.c[2]),
        (o.uHasEmissiveGlowing = a.L),
        (o.uUnlit = this.v ? 1 : 0),
        this.s.gradientEffect && (o.u_mulLum_OpaqMat = [0, 1, 0, 0]));
      let l = !this.s.aO;
      const h = s.n(
        this.s.ap,
        new rs(i.l, l, n, !0, !i.p, e ? 0 : 15),
        new ki(this.r, i.h(), o, null != this.s.gradientEffect && r <= 2 ? 1 : 0),
      );
      return s.a(new ns(a.P, 2 * i.A.i, i.A.g), h, this.a.a, this.a.e);
    }
    t() {
      const t = this,
        e = this.s.t,
        i = this.s,
        r = Object.assign(Object.assign({}, this.s.aP), this.s.av);
      for (let t = 0; t < this.i.length; t++) r["uTextureMatrix" + (t + 1).toString()] = this.e[t];
      ((r.uColor = this.m),
        (r.uTexSampleAlpha = this.y),
        (r.uBlendMode = 10),
        (r.uHasSpecEmiss = !1),
        (r.uHasEmissiveGlowing = !1),
        (r.uUnlit = 1));
      let n = !this.s.aO;
      const s = e.n(this.s.ap, new rs(t.l, n, 10, !0, !1, 15), new ki(this.r, t.h(), r, 2));
      return e.a(new ns(i.P, 2 * t.A.i, t.A.g), s, this.a.a, this.a.e);
    }
    G() {
      return this.w;
    }
    h() {
      const t = [],
        e = this.s;
      return (
        this.w.forEach((i, r) => {
          let n = null;
          (i &&
            (-1e3 == this.r
              ? e.c
                ? ((n = e.c[r]), n || (n = { d: null, f: !1 }))
                : (n = { d: null, f: !1 })
              : (n =
                  0 == i.b.a
                    ? i.c
                    : i.b.a > 0 && this.s.aT[i.b.a]
                      ? this.s.aT[i.b.a]
                      : { d: null, f: !1 }),
            n ||
              (this.w[r].a ||
                (noop(
                  "can't find texture for material",
                  r,
                  "type",
                  this.w[r].type,
                  "index",
                  this.w[r].d,
                ),
                (this.w[r].a = !0)),
              (n = { d: this.s.aF.greenPixelTexture }))),
            (t[r] = n));
        }),
        t
      );
    }
    get show() {
      return this.f;
    }
    set show(t) {
      this.f = t;
    }
    get meshId() {
      return this.n;
    }
    c() {
      ((this.s = null),
        (this.A = null),
        (this.g = null),
        (this.w = null),
        (this.i = null),
        (this.F = null),
        (this.b = null),
        (this.m = null),
        (this.e = null),
        (this.D = null),
        (this.C = null));
    }
  };
  class Ks {
    constructor(t, e) {
      ((this.b = e), (this.d = t), (this.c = null), (this.a = !1));
    }
    f() {
      (this.c && this.c.c(), (this.c = null));
    }
    e(t) {
      0 != this.b.c && (this.c || (this.c = t.getTexture(this.b.c)));
    }
    get type() {
      return this.b.a;
    }
  }
  class Ys {
    constructor(t) {
      ((this.c = []), (this.e = []), (this.a = []), (this.d = []));
      const e = new cn(t),
        i = e.getUint32();
      if (1313426259 !== i) return void console.error("Bad skin file magic:", i.toString(16));
      const r = { count: e.getInt32(), offset: e.getInt32() },
        n = { count: e.getInt32(), offset: e.getInt32() },
        s = (e.getInt32(), e.getInt32(), { count: e.getInt32(), offset: e.getInt32() }),
        a = { count: e.getInt32(), offset: e.getInt32() };
      e.getUint32();
      if (r.count > 0) {
        ((e.position = r.offset), (this.c = new Array(r.count)));
        for (let t = 0; t < r.count; t++) this.c[t] = e.getUint16();
      }
      if (n.count > 0) {
        ((e.position = n.offset), (this.e = new Array(n.count)));
        for (let t = 0; t < n.count; t++) this.e[t] = e.getUint16();
      }
      if (s.count > 0) {
        ((e.position = s.offset), (this.a = new Array(s.count)));
        for (let t = 0; t < s.count; t++)
          this.a[t] = {
            skinSectionId: e.getUint16(),
            level: e.getUint16(),
            vertexStart: e.getUint16(),
            vertexCount: e.getUint16(),
            indexStart: e.getUint16(),
            indexCount: e.getUint16(),
            boneCount: e.getUint16(),
            boneComboIndex: e.getUint16(),
            boneInfluences: e.getUint16(),
            centerBoneIndex: e.getUint16(),
            centerPosition: new Float32Array([e.getFloat(), e.getFloat(), e.getFloat()]),
            sortCenterPosition: new Float32Array([e.getFloat(), e.getFloat(), e.getFloat()]),
            sortRadius: e.getFloat(),
          };
      }
      if (a.count > 0) {
        ((e.position = a.offset), (this.d = new Array(a.count)));
        for (let t = 0; t < a.count; t++)
          this.d[t] = {
            flags: e.getUint8(),
            priorityPlane: e.getInt8(),
            shaderId: e.getUint16(),
            meshIndex: e.getUint16(),
            geosetIndex: e.getUint16(),
            colorIndex: e.getInt16(),
            renderFlagIndex: e.getUint16(),
            materialLayer: e.getUint16(),
            textureCount: e.getUint16(),
            materialIndex: e.getInt16(),
            texUnitIndex: e.getUint16(),
            alphaIndex: e.getInt16(),
            textureAnimIndex: e.getInt16(),
          };
      }
    }
    b() {
      const t = new Array(this.e.length);
      for (let e = 0; e < this.e.length; e++) t[e] = this.c[this.e[e]];
      return t;
    }
  }
  function $s(t) {
    return { count: t.getInt32(), offset: t.getInt32() };
  }
  class Js {
    constructor(t) {
      ((this.b = null),
        (this.a = null),
        (this.h = null),
        (this.l = null),
        (this.d = null),
        (this.f = null),
        (this.e = null),
        (this.m = null),
        (this.j = null),
        (this.n = null),
        (this.i = -1),
        (this.c = []),
        (this.k = []));
      const e = new cn(t),
        i = t.byteLength;
      for (; e.position < i && !(e.position + 8 > i); ) {
        const r = e.getUint32(),
          n = e.getUint32(),
          s = e.position;
        if (s + n > i) break;
        switch (r) {
          case 827083603:
            break;
          case 827542355: {
            this.l = t.slice(s, s + n);
            const e = new cn(this.l);
            ((this.b = $s(e)), (this.a = $s(e)), (this.h = $s(e)));
            break;
          }
          case 826428243: {
            this.e = t.slice(s, s + n);
            const e = new cn(this.e);
            ((this.d = $s(e)), (this.f = $s(e)));
            break;
          }
          case 826362707: {
            this.n = t.slice(s, s + n);
            const e = new cn(this.n);
            ((this.m = $s(e)), (this.j = $s(e)));
            break;
          }
          case 1146112851: {
            const e = new cn(t);
            ((e.position = s), e.getInt32(), e.getInt32(), (this.i = e.getInt32()));
            break;
          }
          case 1145652801: {
            const t = n / 8;
            this.c = new Array(t);
            for (let i = 0; i < t; i++)
              this.c[i] = {
                animId: e.getUint16(),
                subAnimId: e.getUint16(),
                fileDataId: e.getUint32(),
              };
            break;
          }
          case 1145652802: {
            const t = n / 4;
            this.k = new Array(t);
            for (let i = 0; i < t; i++) this.k[i] = e.getUint32();
            break;
          }
        }
        e.position = s + n;
      }
    }
    g() {
      return {
        globalLoopsArr: this.b,
        sequencesArr: this.a,
        sequenceLookupArr: this.h,
        sks1Data: this.l,
        bonesArr: this.d,
        keyBoneLookupArr: this.f,
        skb1Data: this.e,
        attachmentsArr: this.m,
        attachmentLookupArr: this.j,
        ska1Data: this.n,
        afid: this.c,
        bfid: this.k,
        boneOverrides: [],
      };
    }
  }
  function Qs(t, e) {
    if (0 === e.length) return t;
    if (0 === t.length) return e;
    const i = new Map();
    for (const e of t) i.set(`${e.animId}_${e.subAnimId}`, e);
    for (const t of e) i.set(`${t.animId}_${t.subAnimId}`, t);
    return Array.from(i.values());
  }
  var Zs = function (t, e, i, r) {
    return new (i || (i = Promise))(function (n, s) {
      function a(t) {
        try {
          l(r.next(t));
        } catch (t) {
          s(t);
        }
      }
      function o(t) {
        try {
          l(r.throw(t));
        } catch (t) {
          s(t);
        }
      }
      function l(t) {
        var e;
        t.done
          ? n(t.value)
          : ((e = t.value),
            e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                })).then(a, o);
      }
      l((r = r.apply(t, e || [])).next());
    });
  };
  const ta = function (t, e) {
      const i = Math.abs(t),
        r = Math.abs(e);
      return Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t);
    },
    ea = "DressingRoom",
    ia = "Stand";
  class ra {
    constructor() {
      ((this.c = null), (this.a = -1), (this.b = ni()), (this.d = 1));
    }
  }
  class na {
    constructor(t, e, i) {
      ((this.aF = t),
        (this.t = e),
        (this.q = i),
        (this.aQ = !1),
        (this.k = []),
        (this.aO = !1),
        (this.af = !0),
        (this.aV = !0),
        (this.G = !1),
        (this.F = !1),
        (this.an = new fn()),
        (this.d = null),
        (this.ag = 0),
        (this.aU = null),
        (this.aN = null),
        (this.aT = {}),
        (this.c = []),
        (this.L = !1),
        (this.au = !1),
        (this.am = 1),
        (this.aG = Ie()),
        (this.u = Ie()),
        (this.ac = null),
        (this.o = null),
        (this.B = new Set()),
        (this.P = null),
        (this.s = ni()),
        (this.bZ = ni()),
        (this.ad = ni()),
        (this.f = ni()),
        (this.Y = qi(1, 1, 1, 1)),
        (this.X = null),
        (this.y = {}),
        (this.az = null),
        (this.av = {}),
        (this.aL = -1),
        (this.as = !1),
        (this.ay = ni()),
        (this.ar = Ie()),
        (this.b = Ie()),
        (this.R = Vi()),
        (this.aA = Vi()),
        (this.aE = !1),
        (this.Z = !1),
        (this.e = null),
        (this.I = -1),
        (this.m = []),
        (this.n = 0),
        (this.an.b = 0),
        (this.an.a.a = -1),
        this.z(i));
    }
    x(t) {
      this.m.push(t);
    }
    z(t) {
      return Zs(this, void 0, void 0, function* () {
        const e = this.aF.options.contentPath;
        try {
          const i = yield this.D(e + "m2/" + t + ".m2"),
            r = new Hs(i),
            n = r.d[0],
            s = yield this.D(e + "skin/" + n + ".skin"),
            a = new Ys(s);
          let o = null;
          r.i > 0 && (o = yield this.a(r.i, e));
          const l = this.aY(r.f, null == o ? void 0 : o.afid);
          ((this.r = new qs(r, a, o)), this.r.M(e, l), this.i());
        } catch (e) {
          console.error("Failed to load model", t, e);
        }
      });
    }
    D(t) {
      return Zs(this, void 0, void 0, function* () {
        const e = yield fetch(t);
        if (!e.ok) throw new Error(`Failed to fetch ${t}: ${e.status}`);
        return e.arrayBuffer();
      });
    }
    a(t, e) {
      return Zs(this, void 0, void 0, function* () {
        const i = yield this.D(e + "skel/" + t + ".skel"),
          r = new Js(i);
        if (r.i > 0) {
          return (function (t, e) {
            const i = t.globalLoopsArr,
              r = t.sequencesArr,
              n = t.sequenceLookupArr,
              s = t.sks1Data,
              a = [...t.boneOverrides];
            let o, l, h;
            return (
              e.e
                ? e.l
                  ? ((o = t.bonesArr),
                    (l = t.keyBoneLookupArr),
                    (h = t.skb1Data),
                    a.push({
                      sks1Data: e.l,
                      sequencesArr: e.a,
                      globalLoopsArr: e.b,
                      skb1Data: e.e,
                      bonesArr: e.d,
                    }))
                  : ((o = e.d), (l = e.f), (h = e.e))
                : ((o = t.bonesArr), (l = t.keyBoneLookupArr), (h = t.skb1Data)),
              {
                globalLoopsArr: i,
                sequencesArr: r,
                sequenceLookupArr: n,
                sks1Data: s,
                bonesArr: o,
                keyBoneLookupArr: l,
                skb1Data: h,
                attachmentsArr: e.n ? e.m : t.attachmentsArr,
                attachmentLookupArr: e.n ? e.j : t.attachmentLookupArr,
                ska1Data: e.n || t.ska1Data,
                afid: Qs(t.afid, e.c),
                bfid: e.k.length > 0 ? e.k : t.bfid,
                boneOverrides: a,
              }
            );
          })(yield this.a(r.i, e), r);
        }
        return r.g();
      });
    }
    aY(t, e) {
      if (!e || 0 === e.length) return t || [];
      if (!t || 0 === t.length) return e;
      const i = new Map();
      for (const e of t) i.set(`${e.animId}_${e.subAnimId}`, e);
      for (const t of e) i.set(`${t.animId}_${t.subAnimId}`, t);
      return Array.from(i.values());
    }
    al(t) {
      this.am = t;
    }
    i() {
      const t = this.r,
        e = t.f.length,
        i = t.D.length,
        r = t.a.length,
        n = t.w.length,
        s = t.t.length;
      this.k = new Array(r);
      for (let t = 0; t < r; ++t) this.k[t] = 0;
      if (i > 0) {
        this.ah = new Array(i);
        for (let e = 0; e < i; e++) this.ah[e] = new $n(this, e, t.D[e]);
        this.A = new Array(i);
        for (let e = 0; e < i; e++) {
          this.A[e] = [];
          for (let r = 0; r < i; r++) t.D[r].d == e && this.A[e].push(r);
        }
      }
      this.V = new Array();
      for (let i = 0; i < e; i++) ((this.V[i] = new Ks(i, t.f[i])), this.V[i].e(this.aF));
      this.aR = new Array(n);
      for (let e = 0; e < n; e++)
        ((this.aR[e] = new ds(this, t.w[e])),
          t.h && t.h.length && e < t.h.length && this.aR[e].k(t.h[e]));
      this.j = new Array(s);
      for (let e = 0; e < s; e++) this.j[e] = new bs(this, t.t[e]);
      if ((this.d && this.U(this.d), t.A)) {
        const e = t.A.length;
        this.T = new Array(e);
        for (let i = 0; i < e; ++i) ((this.T[i] = new Xs(t.A[i])), this.T[i].E(this));
        this.H = this.T.concat();
      }
      (this.r.T &&
        t.x &&
        ((this.ac = this.t.g(t.T)),
        (this.o = this.t.f(t.x.length)),
        (this.P = this.t.c(this.ac, this.o)),
        this.o.b(new Uint16Array(t.x))),
        (this.ap = this.t.i(t.D.length, t.j.length, t.J.length, t.F.length)),
        (this.aP = { uInvTranspViewModelMat: this.f, uModelMatrix: this.s, uDiffuseColor: this.Y }),
        this.l("Stand"));
      for (let t of this.m) t();
      if (
        ((this.m = []),
        He(this.b, this.am, this.am, this.am),
        oi(this.s),
        this.aE && gi(this.s, this.s, Math.PI / 2),
        this.Z)
      ) {
        let t = Ie();
        (oi(ni()), He(t, 1, -1, 1), di(this.s, this.s, t));
      }
      (di(this.s, this.s, this.b), (this.aF.doUpdateBounds = !0), (this.aQ = !0));
    }
    ao() {
      this.aE = !0;
    }
    aS() {
      this.Z = !0;
    }
    aJ(t) {
      const e = this.r;
      return e && e.aa && t > -1 && t < e.aa.length ? e.aa[t].f : t == e.aa.length ? ea : "";
    }
    ai() {
      this.l(ia);
    }
    get isMirrored() {
      return this.aw;
    }
    set isMirrored(t) {
      ((this.au = this.aw != t), (this.aw = t));
    }
    aK(t, e, i, r = 1) {
      null != t || null != i
        ? (this.e || (this.e = new ra()),
          (this.e.c = t),
          (this.e.a = e),
          i ? si(this.e.b, i) : oi(this.e.b),
          (this.e.d = r),
          (this.aF.doUpdateBounds = !0))
        : (this.e = null);
    }
    aW() {
      this.aF.context;
      this.r.T &&
        this.r.x &&
        this.aL != this.aF.currFrame &&
        (this.ac && this.ac.ba(this.ah, this.B), this.ap.b(this.ah), (this.aL = this.aF.currFrame));
    }
    aD(t, e, i) {
      const r = [
          Ue(t[0], t[1], t[2]),
          Ue(t[0], t[1], e[2]),
          Ue(t[0], e[1], t[2]),
          Ue(t[0], e[1], e[2]),
          Ue(e[0], t[1], t[2]),
          Ue(e[0], t[1], e[2]),
          Ue(e[0], e[1], t[2]),
          Ue(e[0], e[1], e[2]),
        ].map((t) => {
          const e = Ie();
          return (Ze(e, t, i), e);
        }),
        n = Ue(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
        s = Ue(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
      return (
        r.forEach((t) => {
          (je(n, n, t), ze(s, s, t));
        }),
        [n, s]
      );
    }
    at() {
      var t, e, i, r, n, s;
      if (!this.T) return null;
      let a = this.aG,
        o = this.u;
      return (
        He(a, 9999, 9999, 999),
        He(o, -9999, -9999, -9999),
        je(
          a,
          a,
          null ===
            (i =
              null === (e = null === (t = this.an) || void 0 === t ? void 0 : t.a) || void 0 === e
                ? void 0
                : e.b) || void 0 === i
            ? void 0
            : i.c,
        ),
        ze(
          o,
          o,
          null ===
            (s =
              null === (n = null === (r = this.an) || void 0 === r ? void 0 : r.a) || void 0 === n
                ? void 0
                : n.b) || void 0 === s
            ? void 0
            : s.l,
        ),
        this.aD(a, o, this.s)
      );
    }
    p() {
      const t = this.r;
      if (!this.aQ) return;
      if (this.e) {
        He(this.b, this.am, this.am, this.am);
        const t = this.e.c,
          r = this.e;
        if (!t.aQ) return;
        (Ve(this.b, this.b, r.d),
          (e = this.s),
          (i = this.b),
          (e[0] = i[0]),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 0),
          (e[5] = i[1]),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 0),
          (e[9] = 0),
          (e[10] = i[2]),
          (e[11] = 0),
          (e[12] = 0),
          (e[13] = 0),
          (e[14] = 0),
          (e[15] = 1),
          ui(this.s, r.b, this.s),
          r.a >= 0 && r.a < t.ah.length && ui(this.s, t.ah[r.a].p, this.s),
          ui(this.s, t.s, this.s));
      }
      var e, i;
      (ui(this.bZ, this.aF.viewMatrix, this.s),
        hi(this.ad, this.bZ),
        li(this.f, this.ad),
        this.gradientEffect && this.W());
      let r = 1e3 * this.aF.delta;
      if (!this.G && this.an.a.a > -1) {
        let e = r;
        for (let i = 0; i < this.k.length; i++)
          ((this.k[i] += e), t.a[i] > 0 && (this.k[i] %= t.a[i]));
        this.ba(this.an, e);
      }
      let n = this.T ? this.T.length : 0;
      this.B.clear();
      for (let t = 0; t < n; ++t) {
        let e = this.T[t];
        if (!e.show) continue;
        let i = e.A.g,
          r = e.A.i;
        for (let t = 0; t < i; ++t) this.B.add(this.r.x[r + t]);
      }
      let s = t.D.length;
      if (this.ah) {
        for (let t = 0; t < s; ++t) this.ah[t].c = !1;
        for (let t = 0; t < s; ++t) this.ah[t].z(r);
        this.aW();
      }
      if (
        (this.T && this.T.forEach((t) => t.H()),
        this.H &&
          this.H.sort(function (t, e) {
            return t.a.e != e.a.e ? t.a.e - e.a.e : t.meshId - e.meshId;
          }),
        (this.au = !1),
        this.aR && this.af)
      )
        for (let t = 0; t < this.aR.length; ++t) this.aR[t].ap(this.an, this.aF.delta);
      if (this.j && this.aV)
        for (let t = 0; t < this.j.length; ++t)
          (this.j[t].x(this.an, this.aF.delta), this.j[t].f());
    }
    M(t, e) {
      ((this.aT[t] = e), (this.au = !0));
    }
    aH(t, e, i) {
      ((this.c = [t, e, i]), (this.au = !0));
    }
    E(t) {
      this.L = t;
    }
    aC(t) {
      this.F = !!t;
    }
    S(t) {
      this.af = !!t;
    }
    v(t) {
      this.aV = !!t;
    }
    aq(t, e) {
      const i = this;
      if (!i.aQ) return;
      let r = 100 * e,
        n = r + Ar[e] + t,
        s = i.T.some((t) => t.meshId == n);
      ((n = s ? n : 100 * e + 1), i.N(r, r + 99, !1), i.N(n, n, !0));
    }
    N(t, e, i) {
      const r = this.r;
      if (!this.T || 0 == this.T.length) return !1;
      for (let r = 0; r < this.T.length; ++r) {
        const n = this.T[r];
        n.meshId >= t && n.meshId <= e && (n.show = i);
      }
      if (r.Q && r.Q.length > 0 && this.aR)
        for (let n = 0; n < r.Q.length && n < this.aR.length; ++n) {
          let s = r.Q[n];
          s >= t && s <= e && (this.aR[n].A = i);
        }
      return !0;
    }
    g(t, e) {
      if (!this.T) return;
      const i = e + 1;
      let r = t > 0 ? e + t : -2 == t ? e + 0 : i,
        n = this.T.some((t) => t.meshId == r);
      ((r = n || -2 == t ? r : i), this.N(r, r, !0));
    }
    aX(t) {
      this.G = t;
    }
    K(t) {
      this.r.aa && (this.ab(t, this.an), (this.an.c = !1), (this.an.a.d = !1), (this.an.a.c = 0));
    }
    ba(t, e) {
      var i, r, n, s;
      const a = this.r;
      if (
        ((t.a.c += e), na.w && this.ah && this.ah.length > 0 && ((this.n += e), this.n >= na.ae))
      ) {
        this.n = 0;
        const e = t.a,
          i = t.f,
          r = t.d,
          n = e.b ? e.b.a : -1,
          s = e.b ? e.b.f : "none";
        let a = 0,
          o = 0;
        for (let t = 0; t < this.ah.length; t++) {
          const i = this.ah[t].o.e;
          if (i && i.c && e.a < i.c.length) {
            const t = i.c[e.a];
            if (t && t.k && t.k.length > 1) {
              o++;
              const e = t.k[t.k.length - 1];
              e > a && (a = e);
            }
          }
        }
        console.log(
          `[ANIM DEBUG] "${s}" time=${e.c.toFixed(1)} dur=${n} idx=${e.a} blend=${t.b.toFixed(3)} crossFade=${t.e.toFixed(3)} nextIdx=${i.a} prevIdx=${r.a} | bones=${this.ah.length} animated=${o} maxKF=${a.toFixed(1)}`,
        );
      }
      if (t.f.a < 0 && !this.F && !t.c)
        if (t.a.b.j > -1) {
          let e = 32767 * Math.random(),
            i = 0,
            r = t.a.a,
            n = a.aa[r];
          for (i += n.h; i < e && n.j > -1; ) ((r = n.j), (n = a.aa[r]), (i += n.h));
          ((t.f.a = r), (t.f.b = a.aa[r]), (t.f.c = 0));
        } else {
          let e = a.aa.findIndex((e) => e.g == t.a.b.g && 0 == e.e);
          e >= 0 && ((t.f.a = e), (t.f.b = a.aa[e]), (t.f.c = 0));
        }
      let o = t.a,
        l = t.f,
        h = o.b.a - o.c,
        u = 0,
        c = null;
      if (
        (l.a > -1 && ((c = a.aa[l.a]), (u = c.b)),
        u > 0 && h < u ? ((l.c = ta(u - h, c.a)), (t.b = h / u)) : (t.b = 1),
        t.e > 0)
      ) {
        let i = e / 1e3;
        ((t.d.c += e), (t.e -= i / this.aF.crossFadeDuration));
      }
      if (o.c >= o.b.a) {
        if (
          na.w &&
          (console.log(
            `[ANIM DEBUG] SWITCH: time=${o.c.toFixed(1)} >= dur=${o.b.a} | nextIdx=${l.a} nextName=${null !== (r = null === (i = l.b) || void 0 === i ? void 0 : i.f) && void 0 !== r ? r : "none"} freeze=${o.d}`,
          ),
          l.a > -1 && this.ah)
        ) {
          let t = l.a,
            e = o.a,
            i = [];
          for (let r = 0; r < this.ah.length; r++) {
            const a = this.ah[r],
              o = a.o.e;
            let l = o.d(e),
              h = o.d(t),
              u = o.d(0);
            l &&
              !h &&
              i.push(
                `bone[${r}] flags=0x${a.o.i.toString(16)} parent=${a.o.d} keyId=${a.o.b} fallback0=${u} dataLen=${null !== (s = null === (n = o.c) || void 0 === n ? void 0 : n.length) && void 0 !== s ? s : 0}`,
              );
          }
          i.length > 0 &&
            console.log(`[ANIM DEBUG] BONES LOSING DATA (${i.length}):`, i.join(" | "));
        }
        if (l.a > -1 && !o.d) {
          if (l.a > -1)
            for (
              ;
              !(32 & a.aa[l.a].i) &&
              (64 & a.aa[l.a].i) > 0 &&
              ((l.a = a.aa[l.a].d), (l.b = a.aa[l.a]), !(l.a < 0));
            );
          ((t.a = l), (t.f = new dn()), (t.b = 1), a.p(l.a) && a.ab(l.a));
        } else o.b.a > 0 && (o.c = ta(o.c, o.b.a));
      }
    }
    l(t, e = !0) {
      this.ab(t, this.an, e);
    }
    ab(t, e, i = !0) {
      const r = this.r;
      let n = !1,
        s = !1;
      this.I = -1;
      const a = t == ea;
      a && ((t = ia), this.aC(!0));
      for (let o = 0; o < r.aa.length; ++o) {
        const l = r.aa[o];
        if (l.f && l.f == t && 0 == l.e) {
          if (((n = !0), r.p(o)))
            return (
              (this.I = o),
              r.ab(o).then(() => {
                this.I === o && ((this.I = -1), this.J(o, l, e, i, a));
              }),
              !1
            );
          s = this.J(o, l, e, i, a);
          break;
        }
      }
      return t == ia || n ? s : this.ab(ia, e);
    }
    J(t, e, i, r, n) {
      r &&
        null != i.a &&
        (null != i.d && (i.e = 1),
        (i.d = new dn()),
        (i.d.a = i.a.a),
        (i.d.b = i.a.b),
        (i.d.c = i.a.c));
      const s = i.a.a != t;
      return ((i.a.a = t), (i.a.b = e), (i.a.c = 0), (i.f = new dn()), (i.b = 0), (i.c = n), s);
    }
    Q(t) {
      this.as = t;
    }
    h(t) {
      const e = this.r;
      let i = null;
      if (!e.e || !e.e.length) return null;
      if (t < e.e.length) i = e.d[e.e[t]];
      else
        for (let t = 0; t < e.e.length; t++) {
          const r = e.e[t];
          if (-1 != r) {
            i = e.d[r];
            break;
          }
        }
      return i;
    }
    get gradientEffect() {
      return this.X;
    }
    set gradientEffect(t) {
      ((this.au = !0), (this.X = t), this.aj());
    }
    get shadowyEffect() {
      return this.az;
    }
    set shadowyEffect(t) {
      ((this.au = !0), (this.az = t), this.ax());
    }
    aa(t) {
      if (this.e) {
        const t = this.e.c;
        if (t && !t.aQ) return;
      }
      if (this.ac && this.H)
        if (this.gradientEffect) {
          if (t) for (let t = 0; t < this.H.length; ++t) this.H[t].show && this.H[t].q(!1, !0);
          for (let e = 0; e < this.H.length; ++e) this.H[e].show && this.H[e].q(t, !1);
        } else for (let e = 0; e < this.H.length; ++e) this.H[e].show && this.H[e].q(t, !1);
      if (this.aR && this.af) for (let e = 0; e < this.aR.length; ++e) this.aR[e].r(t);
      if (this.j && this.aV) for (let e = 0; e < this.j.length; ++e) this.j[e].m(t);
    }
    aM(t) {
      if (this.ag == t) return;
      if (this.aQ) for (let t = 0; t < this.ah.length; t++) this.ah[t].s = null;
      if (((this.ag = t), t <= 0)) return;
      let e = this.aF.options.contentPath + "bone/" + t + ".bone",
        i = this;
      $.ajax({
        url: e,
        type: "GET",
        dataType: "binary",
        responseType: "arraybuffer",
        processData: !1,
        renderer: this.aF,
        success: function (t) {
          i.C(t);
        },
        error: function (t, e, i) {
          console.log(i);
        },
      });
    }
    C(t) {
      let e = new cn(t);
      e.getInt32();
      for (; e.position < e.buffer.byteLength; ) {
        let t = String.fromCharCode(e.getUint8(), e.getUint8(), e.getUint8(), e.getUint8()),
          i = e.getUint32();
        if ("BIDA" == t) {
          let t = i / 2;
          this.aU = new Array(t);
          for (let i = 0; i < t; i++) this.aU[i] = e.getUint16();
        }
        if ("BOMT" == t) {
          let t = i / 64;
          this.aN = new Array(t);
          for (let i = 0; i < t; i++) {
            let t = ai(
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
              e.getFloat(),
            );
            this.aN[i] = t;
          }
        }
      }
      this.aQ && this.aB();
    }
    aB() {
      if (!(this.ag <= 0) && this.aU && this.aU.length)
        for (let t = 0; t < this.aU.length; t++) this.ah[this.aU[t]].s = this.aN[t];
    }
    aj() {
      if (!this.gradientEffect) return;
      const t = this.gradientEffect,
        e = this.y;
      ((e.u_gradGradientColors_0 = [...t.GradientStart, 0]),
        (e.u_gradGradientColors_1 = [...t.GradientMid, 0]),
        (e.u_gradGradientColors_2 = [...t.GradientEnd, t.MidValue]),
        (e.u_gradEdgeColor = [...t.EdgeColor, t.FresnelPower]),
        (e.u_gradBoundingBox = [this.R[0], this.R[1], this.R[2], 1 / (this.u[2] - this.aG[2])]),
        (e.u_gradUpVec = [this.b[0], this.b[1], this.b[2], 0]),
        (e.u_gradFlags = [
          (1 & t.Flags) > 0 ? 1 : 0,
          0.7,
          (4 & t.Flags) > 0 ? 1 : 0,
          (8 & t.Flags) > 0 ? 1 : 0,
        ]));
    }
    W() {
      if (!this.gradientEffect) return;
      this.gradientEffect;
      const t = this.y;
      (Ki(this.R, this.aG[2], this.aG[2], this.aG[2], 1),
        tr(this.R, this.R, this.bZ),
        Ki(this.aA, 0, 0, 1, 0),
        tr(this.aA, this.aA, this.f),
        He(this.b, this.aA[0], this.aA[1], this.aA[2]),
        Ye(this.b, this.b),
        (t.u_gradBoundingBox[0] = this.R[0]),
        (t.u_gradBoundingBox[1] = this.R[1]),
        (t.u_gradBoundingBox[2] = this.R[2]),
        (t.u_gradBoundingBox[3] = 1 / (this.u[2] - this.aG[2])),
        (t.u_gradUpVec[0] = this.b[0]),
        (t.u_gradUpVec[1] = this.b[1]),
        (t.u_gradUpVec[2] = this.b[2]));
    }
    ax() {
      if (!this.shadowyEffect) return;
      const t = this.shadowyEffect,
        e = this.av,
        i = t.PrimaryColor,
        r = ((i >> 16) & 255) / 255,
        n = ((i >> 8) & 255) / 255,
        s = (255 & i) / 255;
      let a, o, l;
      if (1 & t.Flags) {
        const e = t.SecondaryColor;
        ((a = ((e >> 16) & 255) / 255), (o = ((e >> 8) & 255) / 255), (l = (255 & e) / 255));
      } else ((a = r), (o = n), (l = s));
      ((e.u_shadowInnerColor = [r, n, s, t.InnerStrength]),
        (e.u_shadowOuterColor = [a, o, l, t.OuterStrength]));
    }
    O(t) {
      let e = Yr();
      if (($r(e, t), this.aR)) for (let i = 0; i < this.aR.length; i++) this.aR[i].ag(t, e);
      if (this.j) for (let e = 0; e < this.j.length; e++) this.j[e].ap(t);
    }
    aI() {
      return this.e;
    }
    U(t) {
      if (this.aR) for (let e = 0; e < this.aR.length; e++) this.aR[e].O(t);
      this.d = t;
    }
  }
  ((na.w = !1), (na.ae = 500));
  class sa {
    static c(t, e, i) {
      const r = Pr[e];
      if (r) {
        const e = i ? 4 : 0;
        return r.slice(2 * t + e, 2 * t + e + 2);
      }
    }
    static a(t, e, i, r) {
      let n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (!t) return (noop("selectBestTexture:", "textures are null"), null);
      for (let s = 0; s < t.length; s++) {
        let a = t[s],
          o = a.Gender,
          l = a.Class,
          h = a.Race,
          u = a.ExtraData,
          c = 0;
        if (e > 1 || o != e) {
          if (o < 2) continue;
          c = 0;
        } else c = 2;
        let d = 1;
        if (i > 0 && l == i) d = 0;
        else if (l > 0) continue;
        let f = 1;
        if (r > 0 && h == r) f = 0;
        else if (h > 0) continue;
        n[u + 3 * (f + 2 * (c + d))] = a.FileDataId;
      }
      for (let t = 0; t < 2; t++)
        for (let e = 0; e < 2; e++)
          for (let i = 0; i < 2; i++) {
            let r = 3 * (t + 2 * (e + 2 * i));
            if (n[r] > 0) {
              let t;
              return ((t = { b: n[r], a: n[r + 1], c: n[r + 2] }), t);
            }
          }
      const s = sa.c(e, r, !0);
      return s && 0 != s[0] ? ((r = s[0]), (e = s[1]), sa.a(t, e, i, r)) : null;
    }
    static b(t, e, i, r, n) {
      let s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let a = 0; a < t.length; a++) {
        let o = t[a],
          l = o.Gender,
          h = o.Class,
          u = o.Race,
          c = o.ExtraData,
          d = 0;
        if (i > 1 || l != i) {
          if (l < 2) continue;
          d = 0;
        } else d = 2;
        let f = 1;
        if (r > 0 && h == r) f = 0;
        else if (h > 0) continue;
        let g = 1;
        if (n > 0 && u == n) g = 0;
        else if (u > 0) continue;
        let p = 1;
        if (-1 == e || c != e) {
          if (-1 != c && -1 != e) continue;
        } else p = 0;
        s[p + 2 * (g + 2 * (d + f))] = o.FileDataId;
      }
      for (let t = 0; t < 2; t++)
        for (let e = 0; e < 2; e++)
          for (let i = 0; i < 2; i++)
            for (let r = 0; r < 2; r++) {
              let n = r + 2 * (t + 2 * (e + 2 * i));
              if (s[n]) return s[n];
            }
      const a = sa.c(i, n, !1);
      return a && 0 != a[0] ? ((n = a[0]), (i = a[1]), sa.b(t, e, i, r, n)) : 0;
    }
  }
  class aa {
    constructor() {
      ((this.h = !1), (this.f = []));
    }
    get loaded() {
      let t = !!this.b && this.b.aQ;
      if (t && this.f.length > 0) {
        for (let t of this.f) t();
        this.f = [];
      }
      return t;
    }
    isLoaded() {
      return this.loaded;
    }
    a(t) {
      this.f.push(t);
    }
    e() {
      return this.b;
    }
    g(t) {
      t.b(this.b, this.h);
    }
    getNumAnimations() {
      var t;
      return (null === (t = this.b) || void 0 === t ? void 0 : t.aQ)
        ? 0 == this.b.r.aa.length
          ? 0
          : this.b.r.aa.length + 1
        : 0;
    }
    getAnimation(t) {
      var e;
      return (null === (e = this.b) || void 0 === e ? void 0 : e.aQ) ? this.b.aJ(t) : "";
    }
    resetAnimation() {
      var t;
      if (null === (t = this.b) || void 0 === t ? void 0 : t.aQ) return this.b.ai();
    }
    setAnimPaused(t) {
      var e;
      if (null === (e = this.b) || void 0 === e ? void 0 : e.aQ) return this.b.aX(t);
    }
    setTPose(t) {
      var e;
      if (null === (e = this.b) || void 0 === e ? void 0 : e.aQ) return this.b.Q(t);
    }
    setAnimation(t, e) {
      var i;
      (null === (i = this.b) || void 0 === i ? void 0 : i.aQ) && this.b.l(t, !!e);
    }
    setParticlesEnabled(t) {
      var e;
      (null === (e = this.b) || void 0 === e ? void 0 : e.aQ) && this.b.S(t);
    }
    setRibbonsEnabled(t) {
      var e;
      (null === (e = this.b) || void 0 === e ? void 0 : e.aQ) && this.b.v(t);
    }
    getTexUnits() {
      var t;
      return (null === (t = this.b) || void 0 === t ? void 0 : t.aQ) ? this.b.T : null;
    }
    setAnimNoSubAnim(t) {
      this.b && this.b.aC(t);
    }
    attachList(t) {}
    setItems(t) {}
    clearSlots(t) {}
    setSheath(t, e) {}
    setAppearance(t) {}
    setShouldersOverride(t) {}
    setCustomizationsLoadedCallback(t) {}
    setModelLoadedCallback(t) {
      throw new Error("Method not implemented.");
    }
    setAnimationOverride(t, e) {
      throw new Error("Method not implemented.");
    }
    resetAnimationOverride(t) {
      throw new Error("Method not implemented.");
    }
    getAnimationDuration(t) {
      throw new Error("Method not implemented.");
    }
    getModelBounds() {
      throw new Error("Method not implemented.");
    }
    isRenderReady() {
      throw new Error("Method not implemented.");
    }
  }
  class oa extends aa {
    constructor(t, e, i, r, n, s) {
      (super(),
        (this.hg = t),
        (this.l = e),
        (this.k = i),
        (this.fe = r),
        (this.j = n),
        (this.h = s));
    }
    get fileDataId() {
      return this.b ? this.b.q : 0;
    }
    get modelInstance() {
      return this.b;
    }
    dc() {
      256 & this.l.Item.Flags && ((this.winding = !0), (this.isMirrored = !0), this.b.aS());
    }
    i(t, e, i) {
      this.b && this.b.aK(t, e, i);
    }
    ba(t, e) {
      this.b && this.b.aq(t, e);
    }
    m(t, e, i) {
      this.b && this.b.N(t, e, i);
    }
    setParticlesEnabled(t) {
      this.b && this.b.S(t);
    }
    get winding() {
      return !!this.b && this.b.aO;
    }
    set winding(t) {
      this.b && (this.b.aO = t);
    }
    get isMirrored() {
      return !!this.b && this.b.isMirrored;
    }
    set isMirrored(t) {
      this.b && (this.b.isMirrored = t);
    }
    getBounds() {
      return this.modelInstance.aQ ? this.modelInstance.at() : [null, null];
    }
    c() {
      this.b && this.b.p();
    }
    d(t) {
      this.b && this.b.aa(t);
    }
  }
  class la extends oa {
    constructor(t, e, i, r) {
      if ((super(t, null, 0, 0, 0, r), (this.b = new na(t, t.renderer, e)), i))
        for (let e in i) 0 != i[e] && this.b.M(+e, t.getTexture(i[e]));
    }
  }
  class ha {
    constructor() {
      ((this.a = !1), (this.e = !1), (this.b = null));
    }
  }
  const ua = class {
    constructor(t, e) {
      ((this.c = t), (this.k = []), (this.h = []), (this.f = !1), (this.e = !1));
      let i = 0;
      if (e.proceduralEffects)
        for (const t of e.proceduralEffects) this.k.push({ effectType: 1, effect: t });
      if (e.modelAttachEffects)
        for (const t of e.modelAttachEffects)
          this.k.push({ effectType: 2, effect: t, modelIndex: i++ });
      if (e.shadowyEffects)
        for (const t of e.shadowyEffects) this.k.push({ effectType: 7, effect: t });
      if (e.dissolveEffects)
        for (const t of e.dissolveEffects) this.k.push({ effectType: 11, effect: t });
      if (e.edgeGlowEffects)
        for (const t of e.edgeGlowEffects) this.k.push({ effectType: 12, effect: t });
      if (e.beamEffects) for (const t of e.beamEffects) this.k.push({ effectType: 13, effect: t });
      if (e.cloneEffects)
        for (const t of e.cloneEffects) this.k.push({ effectType: 15, effect: t });
      if (e.gradientEffects)
        for (const t of e.gradientEffects) this.k.push({ effectType: 16, effect: t });
    }
    m(t) {
      for (const e of this.k) {
        if (2 !== e.effectType) continue;
        const i = e.modelIndex;
        this.h[i] && this.h[i].d && this.h[i].d.loaded && this.h[i].d.e().l(t);
      }
    }
    d(t) {
      this.f = t;
    }
    n() {
      if (this.c.loaded)
        for (const t of this.k)
          switch (t.effectType) {
            case 1:
              this.a(t.effect);
              break;
            case 2:
              this.b(t.effect, t.modelIndex);
              break;
            case 7:
              this.j(t.effect);
              break;
            case 11:
            case 12:
            case 13:
            case 15:
              break;
            case 16:
              this.g(t.effect);
          }
    }
    a(t) {
      let e = this.c.e();
      if (1 == t.ProcEffectType) {
        let i = t.Value[0];
        e.Y = qi(((i >> 16) & 255) / 255, ((i >> 8) & 255) / 255, (255 & i) / 255, e.Y[3]);
      } else if (14 == t.ProcEffectType) {
        let i = Math.min(Math.max(t.Value[0], 0), 1);
        e.Y[3] = i;
      } else if (22 == t.ProcEffectType) {
        let i = t.Value[3];
        e.Y = qi(((i >> 16) & 255) / 255, ((i >> 8) & 255) / 255, (255 & i) / 255, e.Y[3]);
      }
    }
    b(t, e) {
      if (!this.c) return;
      if (!this.c.loaded) return;
      let i = this.c.e();
      if (!this.h[e]) {
        const r = new ha();
        if (((this.h[e] = r), 0 == t.ModelType)) {
          const e = new la(i.aF, t.Model, { 2: t.Texture }, !1);
          r.d = e;
        } else
          1 == t.ModelType ||
            (2 == t.ModelType &&
              Da.c(i.aF, wr.NPC, t.Model).then((t) => {
                r.d = t;
              }));
      }
      const r = this.h[e];
      if (!r.a) {
        if (!r.d && !r.c) return;
        if (r.d && !r.d.loaded) return;
        if (r.c && !r.c.r) return;
        let b = t.AttachmentID;
        (t.Positioner > -1 && (b = t.Positioner), b < 0 && (b = 19));
        let y = i.h(b);
        const F = y ? y.a : -1;
        let S = ni();
        if (y) {
          let t = y.b;
          ci(S, S, Ue(t[0], t[1], t[2]));
        }
        if (
          (ci(S, S, Ue(t.Offset[0], -t.Offset[1], t.Offset[2])),
          gi(S, S, -t.Yaw),
          (n = S),
          (s = S),
          (a = t.Pitch),
          (o = Math.sin(a)),
          (l = Math.cos(a)),
          (h = s[0]),
          (u = s[1]),
          (c = s[2]),
          (d = s[3]),
          (f = s[8]),
          (g = s[9]),
          (p = s[10]),
          (m = s[11]),
          s !== n &&
            ((n[4] = s[4]),
            (n[5] = s[5]),
            (n[6] = s[6]),
            (n[7] = s[7]),
            (n[12] = s[12]),
            (n[13] = s[13]),
            (n[14] = s[14]),
            (n[15] = s[15])),
          (n[0] = h * l - f * o),
          (n[1] = u * l - g * o),
          (n[2] = c * l - p * o),
          (n[3] = d * l - m * o),
          (n[8] = h * o + f * l),
          (n[9] = u * o + g * l),
          (n[10] = c * o + p * l),
          (n[11] = d * o + m * l),
          fi(S, S, t.Roll),
          di(S, S, [t.Scale1, t.Scale1, t.Scale1]),
          di(S, S, [t.Scale2, t.Scale2, t.Scale2]),
          r.d)
        ) {
          const e = r.d.e();
          (e.aX(this.f),
            t.ModelAlpha && (e.Y[3] = t.ModelAlpha),
            2 & t.Flags && (r.e = !0),
            t.StartAnimID > 0 && t.StartAnimName
              ? (e.l(t.StartAnimName, !1), t.AnimID > 0 && t.AnimName && (r.b = t.AnimName))
              : t.AnimID > 0 && t.AnimName && e.l(t.AnimName, !1),
            e.aK(this.c.e(), F, S));
        }
        this.h[e].a = !0;
      }
      var n, s, a, o, l, h, u, c, d, f, g, p, m;
      if (r.d) {
        const t = r.d.e();
        if (r.e && t.aQ) {
          const e = i.aJ(i.an.a.a),
            r = t.aJ(t.an.a.a);
          e && e !== r && t.l(e);
        }
        if (r.b && t.aQ) {
          const e = t.an.a;
          e.b && e.c >= e.b.a && (t.l(r.b, !0), (r.b = null));
        }
        r.d.c();
      }
      r.c && r.c.a();
    }
    g(t) {
      const e = this.c.e();
      e.gradientEffect || (e.gradientEffect = t);
    }
    j(t) {
      const e = this.c.e();
      e.shadowyEffect || (e.shadowyEffect = t);
    }
    i(t) {
      for (const e of this.h) e && e.a && (e.d && e.d.d(t), e.c && e.c.E(t));
    }
    l() {
      for (const t of this.h)
        t && ((t.a = !1), t.d && t.d.loaded && t.d.e().aK(null, -1, null), t.c && t.c && t.c.q());
    }
    o(t) {
      this.h.forEach((e) => {
        (e.d && e.d.g(t), e.c && e.c.x(t));
      });
    }
  };
  class ca extends aa {
    constructor(t, e) {
      (super(),
        (this.ba = t),
        (this.t = e),
        (this.u = !1),
        (this.r = !1),
        (this.k = !1),
        (this.p = -1),
        (this.C = -1),
        (this.n = []),
        (this.i = {}),
        (this.j = []),
        (this.dc = !1),
        (this.hg = null),
        (this.fe = 0),
        this.q(e));
    }
    q(t) {
      if (this.dc) return;
      this.ba.options;
      if (t.StateKits) for (const e of t.StateKits) this.j.push(new ua(this, e));
      if (
        (t.Creature &&
          ((this.hg = t.Creature.CreatureGeosetData), (this.fe = t.Creature.CreatureGeosetDataID)),
        t.Model &&
          ((this.b = new na(this.ba, this.ba.renderer, t.Model)),
          this.b.ao(),
          t.Creature && t.Creature.ParticleColor && this.b.U(t.Creature.ParticleColor),
          t.Scale && this.b.al(t.Scale)),
        this.t.Creature &&
          this.t.Creature.Texture &&
          ((this.m = this.y(-1, sa.a(this.t.TextureFiles[this.t.Creature.Texture], 3, 0, 0))),
          this.b.aH(this.m.e, this.m.d, this.m.a)),
        t.Textures)
      )
        for (let e in t.Textures)
          0 != t.Textures[e] && this.b.M(+e, this.ba.getTexture(t.Textures[e]));
      ((this.k = !0), this.A());
    }
    y(t, e) {
      let i = new Hr();
      return (
        e.b > 0 && (i.e = this.ba.getTexture(e.b)),
        e.a > 0 && (i.d = this.ba.getTexture(e.a)),
        e.c > 0 && (i.a = this.ba.getTexture(e.c)),
        i
      );
    }
    A() {
      this.dc || ((this.k = !0), this.m || (this.r = !0));
    }
    z(t) {
      ((this.B = null),
        t <= 0 ||
          ((this.u = !1),
          Da.c(this.ba, wr.NPC, t).then((t) => {
            t instanceof ca && (this.B = t);
          })));
    }
    x() {
      (this.b, this.B);
    }
    setAnimation(t, e = !0) {
      (this.B && (this.B.setAnimation(t), (t = "Mount")),
        this.b
          ? this.b.l(t, e)
          : this.a(() => {
              var i;
              null === (i = this.b) || void 0 === i || i.l(t, e);
            }));
    }
    s() {
      const t = this.b;
      if ((t.N(0, 0, !0), 0 != this.fe && (t.N(1, 1699, !1), this.hg)))
        for (let e of this.hg) {
          let i = 100 * (e.GeosetIndex + 1),
            r = i + e.GeosetValue;
          (t.N(i, i + 99, !1), t.N(r, r, !0));
        }
    }
    v() {
      this.s();
    }
    w() {
      const t = this.b;
      t.aQ && this.k && t.T && 0 != t.T.length && (this.v(), (this.k = !1));
    }
    setParticlesEnabled(t) {
      this.b && this.b.S(t);
    }
    getBounds() {
      if (this.b && this.b.aQ) {
        const [t, e] = this.b.at();
        if (this.B && this.B.loaded && this.u) {
          const [i, r] = this.B.getBounds();
          (ze(i, i, Ue(0, 0, 0)), je(t, t, i), ze(e, e, r));
        }
        return [t, e];
      }
      return [null, null];
    }
    c() {
      if (!this.dc && this.loaded) {
        if (!this.u && this.b && this.B && this.B.loaded) {
          const t = this.B.b.r,
            e = t.d[t.e[0]],
            i = ni();
          (ci(i, i, e.b),
            this.b.aK(this.B.b, e.a, i, 1 / this.B.b.am),
            this.b.l("Mount", !1),
            (this.u = !0));
        }
        (this.l && this.l.c(),
          this.B && this.B.c(),
          this.j && this.j.forEach((t) => t.n()),
          this.w(),
          this.b.p());
      }
    }
    d(t) {
      (this.b.aa(t), this.B && this.B.d(t), this.j && this.j.forEach((e) => e.i(t)));
    }
    g(t) {
      (super.g(t),
        this.B && this.B.g(t),
        this.l && this.l.g(t),
        this.j && this.j.forEach((e) => e.o(t)));
    }
  }
  function da(t) {
    return new Promise((e, i) => {
      $.getJSON(t)
        .done(function (t) {
          e(t);
        })
        .fail(function (t, e, r) {
          let n = e + ", " + r;
          (console.log("Error loading metadata: " + n), i(e));
        });
    });
  }
  function fa(t, e, i) {
    let r;
    return e == wr.HELM
      ? ga(t, 1, i)
      : e == wr.SHOULDER
        ? ga(t, 3, i)
        : e == wr.ITEM
          ? ga(t, -1, i)
          : (e == wr.NPC || e == wr.HUMANOIDNPC
              ? (r = "meta/npc/")
              : e == wr.OBJECT
                ? (r = "meta/object/")
                : e == wr.CHARACTER
                  ? (r = "meta/character/")
                  : e == wr.ITEMVISUAL && (r = "meta/itemvisual/"),
            da(t + r + i + ".json"));
  }
  function ga(t, e, i) {
    let r = "meta/item/";
    return (
      (1 != e &&
        3 != e &&
        4 != e &&
        5 != e &&
        6 != e &&
        7 != e &&
        8 != e &&
        9 != e &&
        10 != e &&
        16 != e &&
        19 != e &&
        20 != e) ||
        (r = "meta/armor/" + e + "/"),
      da(t + r + i + ".json")
    );
  }
  class pa {
    constructor() {
      ((this.d = null), (this.e = 1), (this.b = 0), (this.c = -1), (this.a = !1));
    }
  }
  class ma {
    constructor(t, e) {
      ((this.a = t), (this.b = e));
    }
  }
  class ba extends pa {
    constructor() {
      (super(...arguments), (this.ba = []));
    }
  }
  class ya {
    constructor(t, e) {
      ((this.b = t), (this.a = e));
    }
  }
  function Fa(t, e) {
    return (
      t == e ||
      (!!t &&
        !!e &&
        t.a == e.a &&
        (t.b == e.b || (!!t.b && !!e.b && t.b.b == e.b.b && t.b.c == e.b.c && t.b.a == e.b.a)))
    );
  }
  class Sa {
    constructor(t, e) {
      ((this.b = t), (this.j = []), (this.h = e), (this.g = {}), (this.c = {}));
    }
    f() {
      const t = [];
      for (let e of this.h.Options)
        for (let i of e.Choices)
          for (let e of i.Elements) e.SkinnedModel && t.push(e.SkinnedModel.CollectionFileDataID);
      const e = new Set(t),
        i = this.b.ba;
      i.renderer;
      if (0 != e.size)
        for (let t of e) {
          const e = new ba();
          ((e.d = new la(i, t, {}, !0)), (this.b.cba[t] = e));
        }
    }
    e(t) {
      return sa.a(this.h.TextureFiles[t], this.b.ih, this.b.qp, this.b.H);
    }
    d(t) {
      (noop("applyCustomization options", t), (this.j = []), (this.b.n = []));
      for (const t in this.b.cba) {
        this.b.cba[t].ba = [];
      }
      let e = 0,
        i = {},
        r = {};
      for (let n = 0; n < t.length; n++) {
        let s = this.h.Options.find((e) => e.Id == t[n].optionId);
        if ((noop("option", s), s)) {
          let a = s.Choices.find((e) => e.Id == t[n].choiceId);
          if ((noop("choice", a), a)) {
            let n = a.Elements.filter(
              (e) =>
                e.BoneSet &&
                e.BoneSet.BoneFileDataID &&
                (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
            );
            n.length > 0 && (e = n[0].BoneSet.BoneFileDataID);
            let o = a.Elements.filter(
              (e) =>
                e.Material &&
                (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
            );
            (o.sort((t, e) => e.VariationChoiceID - t.VariationChoiceID),
              o.forEach((t) => {
                noop("element material", t);
                let e = this.e(t.Material.MaterialResourcesID);
                if (!e)
                  return void noop("element material: can't get texture files for material", t);
                let n = this.h.TextureLayers.find(
                  (e) => e.ChrModelTextureTargetID == t.Material.TextureTarget,
                );
                if (!n)
                  return void noop("element material: can't get texture layer for material", t);
                const s = new ya(e, n.TextureType);
                Fa(s, this.c[t.Material.TextureTarget])
                  ? ((i[t.Material.TextureTarget] = this.g[t.Material.TextureTarget]),
                    (r[t.Material.TextureTarget] = this.c[t.Material.TextureTarget]))
                  : ((i[t.Material.TextureTarget] = this.b.y(n.TextureType, e)),
                    (r[t.Material.TextureTarget] = s));
              }),
              a.Elements.filter(
                (e) =>
                  e.Geoset &&
                  (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
              )
                .sort(
                  (t, e) =>
                    t.Geoset.GeosetType - e.Geoset.GeosetType ||
                    t.Geoset.GeosetID - e.Geoset.GeosetID,
                )
                .forEach((t) => {
                  (noop("element geoset", t),
                    this.j.push(100 * t.Geoset.GeosetType + t.Geoset.GeosetID));
                }),
              a.Elements.filter(
                (e) =>
                  e.SkinnedModel &&
                  (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
              ).forEach((t) => {
                (noop("element skinnedmodel", t), t.ChrCustItemGeoModifyID);
                const e = this.b.cba[t.SkinnedModel.CollectionFileDataID];
                t.SkinnedModel.GeosetID < 100 &&
                  e.ba.push(
                    new ma(
                      100 * t.SkinnedModel.GeosetType + t.SkinnedModel.GeosetID,
                      (1 & t.SkinnedModel.Flags) > 0,
                    ),
                  );
              }));
            let l = a.Elements.find(
              (e) =>
                0 != e.CondModelFileDataId &&
                (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
            );
            ((24 != s.Id && 353 != s.Id) ||
              (l && !this.b.overrideModelFile
                ? (this.b.overrideModelFile = l.CondModelFileDataId)
                : !l && this.b.overrideModelFile && (this.b.overrideModelFile = 0)),
              a.Elements.filter(
                (e) =>
                  e.ChrCustItemGeoModifyID &&
                  (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
              ).forEach((t) => {
                (noop("element ChrCustItemGeoModify", t),
                  this.b && this.b.n.push(t.ChrCustItemGeoModifyID));
              }));
          }
        }
      }
      if (!this.g[10]) {
        let e = this.h.Options.find((t) => t.Id == this.h.HairStyleOptionId);
        if (e) {
          let n = e.Choices[1];
          if (n) {
            let e = n.Elements.filter(
              (e) =>
                e.Material &&
                10 == e.Material.TextureTarget &&
                (0 == e.VariationChoiceID || t.some((t) => t.choiceId == e.VariationChoiceID)),
            );
            if (e.length > 0) {
              let t = this.e(e[0].Material.MaterialResourcesID);
              if (t) {
                const n = new ya(t, 0);
                Fa(n, this.c[e[0].Material.TextureTarget])
                  ? ((i[e[0].Material.TextureTarget] = this.g[e[0].Material.TextureTarget]),
                    (r[e[0].Material.TextureTarget] = this.c[e[0].Material.TextureTarget]))
                  : ((i[e[0].Material.TextureTarget] = this.b.y(6, t)),
                    (r[e[0].Material.TextureTarget] = n));
              }
            }
          }
        }
      }
      ((this.g = i), (this.c = r), this.b.e().aM(e), (this.b.r = !0));
    }
    a() {
      let t = [];
      for (let e = 0; e < this.h.Options.length; e++) {
        let i = this.h.Options[e];
        if (i) {
          let e = i.Choices[0];
          e && t.push({ optionId: i.Id, choiceId: e.Id });
        }
      }
      this.d(t);
    }
    i(t) {
      let e = { options: t, sheathMain: -1, sheathOff: -1 };
      for (let t of this.h.Options)
        e.options.some((e) => e.optionId == t.Id) ||
          e.options.push({ optionId: t.Id, choiceId: t.Choices[0].Id });
      return e;
    }
  }
  class va {
    constructor() {
      ((this.a = null), (this.b = 1), (this.c = !1));
    }
  }
  const Ta = class {
    constructor(t, e, i) {
      ((this.g = t), (this.d = e), (this.m = []), (this.b = !1), (this.h = []), i && this.i(i));
    }
    k() {}
    i(t) {
      this.j = t;
      fa(this.g.hg.options.contentPath, wr.ITEMVISUAL, t).then((t) => {
        this.l(t);
      });
    }
    l(t) {
      if (((this.m = new Array(7)), t.ItemEffects))
        for (let e = 0; e < t.ItemEffects.length; ++e) {
          let i = t.ItemEffects[e];
          if (-1 == i.SubClass || this.d == i.SubClass) {
            if (i.Model) {
              const t = new va();
              ((this.m[i.Slot - 1] = t),
                (t.a = new na(this.g.hg, this.g.hg.renderer, i.Model)),
                (t.b = i.Scale && 1 != i.Scale ? i.Scale : 1));
            }
            if (i.kit) {
              const t = new ua(this.g, i.kit);
              this.h.push(t);
            }
          }
        }
      for (var e = 0; e < this.m.length; ++e)
        t.Equipment[e] &&
          null == this.m[e] &&
          ((this.m[e] = new va()),
          (this.m[e].a = new na(this.g.hg, this.g.hg.renderer, t.Equipment[e])));
      this.b = !0;
    }
    a(t) {
      for (let e = 0; e < this.m.length; e++) {
        const i = this.m[e];
        i && i.c && i.a.aa(t);
      }
    }
    e(t) {
      for (let e = 0; e < this.m.length; e++) {
        const i = this.m[e];
        i && i.c && i.a && i.a.aQ && t.b(i.a, !1);
      }
    }
    f(t, e, i) {
      if (t.c) return;
      if (!i.loaded) return;
      if (!t.a || !t.a.aQ) return;
      const r = i.modelInstance.r;
      let n = null;
      if (e <= 8 && 6 != e && 7 != e) {
        if (!r.d[e]) return;
        n = r.d[e];
      } else n = i.modelInstance.h(19);
      let s = ni();
      (ci(s, s, n.b), di(s, s, Ue(t.b, t.b, t.b)), t.a.aK(i.modelInstance, n.a, s), (t.c = !0));
    }
    c() {
      if (this.g.loaded) {
        for (const t of this.h) t && t.n();
        for (let t = 0; t < this.m.length; t++) {
          const e = this.m[t];
          e && (this.f(e, t, this.g), e.a.p());
        }
      }
    }
  };
  class Ca {
    constructor(t, e, i) {
      ((this.y = t),
        (this.I = []),
        (this.r = !1),
        (this.H = null),
        (this.D = []),
        (this.F = ni()),
        noop("Creating item", i),
        (this.i = e),
        (this.J = i),
        (this.b = t.H),
        (this.t = t.ih),
        (this.g = t.qp),
        (this.v = Er[e]),
        (this.w = Dr[e]),
        (this.z = null),
        (this.o = null),
        (this.j = null),
        (this.f = 0),
        (this.l = 0),
        (this.r = !1),
        (this.h = !1),
        (this.n = 0),
        (this.e = 3),
        (this.d = 0),
        i && this.p());
    }
    c() {
      var t = this;
      if (t.I) {
        for (let e = 0; e < t.I.length; ++e) t.I[e] && ((t.I[e].d = null), (t.I[e] = null));
        t.I = null;
      }
      if (t.z) {
        for (let e = 0; e < t.z.length; ++e)
          (t.z[e].texture && t.z[e].texture.c(), (t.z[e].texture = null), (t.z[e] = null));
        t.z = null;
      }
      if (((t.o = null), (t.j = null), t.D)) {
        for (let e = 0; e < t.D.length; e++) t.D[e].k();
        t.D = null;
      }
      ((t.r = !1), noop("Destroyed item", this.J));
    }
    p() {
      let t = this,
        e = this.y.ba.options;
      (noop("Loading item", this.J),
        ga(e.contentPath, this.i, this.J)
          .then((t) => {
            this.k(t);
          })
          .catch(() => {
            t.h = !0;
          }));
    }
    k(t) {
      if (!this.y) return void noop("Char model was destroyed before it was loaded", this.J);
      const e = this.y.ba,
        i = (e.options, this.t),
        r = this.b,
        n = this.g;
      if (
        ((this.l = t.Item.Flags),
        (this.f = t.Item.InventoryType),
        (this.s = t.Item.ItemClass),
        (this.K = t.Item.ItemSubClass),
        t.ComponentTextures)
      ) {
        this.z = [];
        for (let s in t.ComponentTextures) {
          const a = parseInt(s),
            o = sa.a(t.TextureFiles[t.ComponentTextures[s]], i, n, r);
          if (o) {
            let t;
            ((t = { region: a, gender: this.t, file: o.b, texture: null }),
              12 != a
                ? (t.texture = e.getTexture(o.b))
                : 16 == this.i && this.y.e().M(2, e.getTexture(o.b)),
              this.z.push(t));
          }
        }
      }
      ((this.o = t.Item.GeosetGroup),
        (this.j = t.Item.AttachGeosetGroup),
        (this.d = t.Item.GeosetGroupOverride),
        1 == this.i &&
          (0 == i ? (this.u = t.Item.HideGeosetMale) : (this.L = t.Item.HideGeosetFemale)));
      let s = 0;
      if ((3 == this.i ? (s = 2) : kr[this.i] != wr.ARMOR && (s = 1), s > 0 && t.ComponentModels))
        for (let i = 0; i < s; ++i) {
          let r = Da.b(e, t, kr[this.i], this.b, this.t, this.g);
          if ((3 == this.i && r.cba(i + 1), null == r.modelInstance)) continue;
          const n = new pa();
          ((n.d = r),
            (n.b = i),
            t.Item && t.Item.ParticleColor && n.d.modelInstance.U(t.Item.ParticleColor),
            this.I.push(n));
        }
      if ((6 == this.i || 16 == this.i) && t.ComponentModels) {
        let s = 0;
        if ((16 == this.i && (s = 1), t.ComponentModels[s])) {
          const a = t.ComponentModels[s],
            o = sa.b(t.ModelFiles[a], -1, i, n, r),
            l = new pa(),
            h = 0 == s ? t.Textures : t.Textures2;
          ((l.d = new la(e, o, h, !1)), (this.I = [l]));
        }
      }
      const a = this.i;
      if (
        (4 == a ||
          5 == a ||
          20 == a ||
          6 == a ||
          7 == a ||
          10 == a ||
          8 == a ||
          1 == a ||
          9 == a ||
          19 == a ||
          16 == a) &&
        t.ComponentModels
      ) {
        let s = 0;
        if (((1 != a && 6 != a) || (s = 1), t.ComponentModels[s])) {
          const a = t.ComponentModels[s];
          if (a && t.ModelFiles && t.ModelFiles[a]) {
            const o = sa.b(t.ModelFiles[a], -1, i, n, r);
            if (o) {
              const i = 0 == s ? t.Textures : t.Textures2;
              ((this.H = new pa()),
                (this.H.d = new la(e, o, i, !0)),
                this.H.d.a(() => {
                  this.y.k = !0;
                }));
            }
          }
        }
      }
      7 == a && this.o[2] > 0 && (this.w += 2);
      const o = 0 != this.n ? this.n : 0 != t.Item.ItemVisual ? t.Item.ItemVisual : 0;
      if (0 != o) {
        const t = 2 == this.s ? this.K : -1;
        for (let e = 0; e < this.I.length; e++) this.D.push(new Ta(this.I[e].d, t, o));
      }
      ((this.r = !0),
        noop("Loaded item:", "DisplayId", this.J, "InventoryType", this.f),
        (this.y.k = !0));
    }
    m(t) {
      for (let t = 0; t < this.D.length; t++) this.D[t].k();
      ((this.D = []), (this.n = t));
    }
    A(t) {
      this.e = t;
    }
    B(t) {
      if (3 == this.i) {
        const e = t.d.shoulderIndex;
        if (1 == e && !(1 & this.e)) return !0;
        if (2 == e && !(2 & this.e)) return !0;
      }
      return !1;
    }
    E(t) {
      for (let e = 0; e < this.D.length; ++e) this.D[e] && this.D[e].a(t);
      for (let e = 0; e < this.I.length; ++e) {
        const i = this.I[e];
        if (i && i.d) {
          if (this.B(i)) continue;
          i.d.d(t);
        }
      }
    }
    q() {
      if (this.I)
        for (let t = 0; t < this.I.length; ++t)
          ((this.I[t].a = !1), this.I[t].d && this.I[t].d.i(null, -1, null));
      this.H && (this.H.a = !1);
    }
    G(t, e, i) {
      if (!t) return;
      if (!t.d) return;
      if (!t.d.modelInstance.aQ) return;
      const r = t.b;
      if (r < i.length) {
        let n = e.d[i[r]];
        if (t.a && n.a == t.c) return;
        let s = !1,
          a = xr[t.d.fileDataId],
          o = Ie(),
          l = ni();
        if (
          (oi(l),
          a && (He(o, 1, 1, -1), di(l, l, o), (s = !0)),
          (22 == this.i || 23 == this.i || 22 == this.v) &&
            256 & this.l &&
            (He(o, 1, -1, 1), di(l, l, o), (s = !0), (t.d.isMirrored = !0)),
          13 == this.i &&
            1024 & this.l &&
            (He(o, 1, -1, 1), di(l, l, o), (s = !0), (t.d.isMirrored = !0)),
          (t.d.winding = s),
          5 == this.y.p &&
            26 == this.i &&
            2 == this.s &&
            18 == this.K &&
            (oi(l), fi(l, l, -Math.PI / 2)),
          ci(l, l, n.b),
          ui(l, l, this.F),
          27 == this.i)
        ) {
          let e = t.d.l.Scale;
          (He(o, e, e, e), di(l, l, o));
        }
        (t.d.i(this.y.e(), n.a, l), (t.a = !0), (t.c = n.a));
      }
      t.a = !0;
    }
    C(t) {
      si(this.F, t);
      for (let t = 0; t < this.I.length; ++t) this.I[t].a = !1;
    }
    a() {
      if (!this.y.loaded) return;
      const t = this.y.e().r,
        e = this.y.N(this.v, this);
      for (let i = 0; i < this.I.length; ++i) (this.G(this.I[i], t, e), this.D[i] && this.D[i].c());
      this.H && this.y.CB(this.H);
      for (let t = 0; t < this.I.length; ++t) {
        const e = this.I[t];
        if (e && e.d) {
          if (this.B(e)) continue;
          e.d.c();
        }
      }
    }
    x(t) {
      (this.I.forEach((e) => {
        e.d.g(t);
      }),
        this.H && this.H.d.g(t));
    }
  }
  class xa extends ca {
    constructor(t, e) {
      (super(t, e),
        (this.D = new Map()),
        (this.kj = []),
        (this.cba = {}),
        (this.Az = null),
        t.options.charCustomization && (this.O = t.options.charCustomization),
        (this.gf = new Array(52)));
      for (let t = 0; t < 52; t++) this.gf[t] = 100 * t + Ar[t];
    }
    get overrideModelFile() {
      return this.on;
    }
    set overrideModelFile(t) {
      const e = this.on;
      ((this.on = t), e != t && (this.M(), this.P(), (this.k = !0)));
    }
    M() {
      let t = this.on ? this.on : this.J.Model;
      ((this.b = new na(this.ba, this.ba.renderer, t)),
        this.b.ao(),
        this.b.E(27 == this.H || 30 == this.H),
        (this.Az = null),
        (this.k = !0));
    }
    q(t) {
      const e = this.ba.options;
      ((this.H = t.Character.Race), (this.ih = t.Character.Gender), (this.qp = e.cls ? e.cls : 0));
      const i = e && e.items;
      (fa(e.contentPath, wr.CHARACTER, t.Character.ChrModelId).then((r) => {
        var n, s;
        ((this.J = r),
          this.M(),
          ((n = e.contentPath),
          (s = t.Character.ChrModelId),
          new Promise((t, e) => {
            const i = n + "meta/charactercustomization/" + s + ".json";
            $.getJSON(i, function (e) {
              t(e);
            });
          })).then((e) => {
            var r, n;
            if (
              (noop("Got customization data v2", e),
              (this.E = new Sa(this, e)),
              null === (r = this.sr) || void 0 === r || r.call(this, this.E.h),
              this.E.f(),
              this.O)
            )
              this.setAppearance(this.O);
            else if (
              t.Character.Race > 0 &&
              (null === (n = null == t ? void 0 : t.Creature) || void 0 === n
                ? void 0
                : n.CreatureCustomizations)
            ) {
              let e = this.E.i(t.Creature.CreatureCustomizations);
              this.setAppearance(e);
            } else this.E.a();
            (this.r && this.A(), t.Equipment && this.F(t.Equipment), i && this.F(i));
          }));
      }),
        (this.r = !0));
    }
    P() {
      for (const [t, e] of this.D) e.q();
      for (const t in this.cba) {
        this.cba[t].a = !1;
      }
      for (const t of this.j) t.l();
    }
    K(t, e, i) {
      if (!this.D) return;
      if (3 == t && this.kj && this.kj[0]) return;
      let r = new Ca(this, t, e);
      i && r.m(i);
      let n = r.v,
        s = Mr[t];
      this.D.get(n) && 0 != s ? ((r.v = s), this.D.set(s, r)) : this.D.set(n, r);
    }
    I(t) {
      var e = this.D.get(t);
      (e || ((t = Er[t]), (e = this.D.get(t))), e && (this.D.delete(t), e.c()));
    }
    N(t, e) {
      const i = this.b.r,
        r = [],
        n = { 14: (t) => [0], 26: (t) => (2 == t.s && 18 == t.K ? [1] : null) };
      if (i.d && i.e) {
        const s = {
          1: (t) => [11],
          3: (t) => [6, 5],
          22: (t) => {
            var e;
            return (null === (e = n[t.i]) || void 0 === e ? void 0 : e.call(n, t)) || [2];
          },
          21: (t) => [1],
          17: (t) => [1],
          15: (t) => [2],
          25: (t) => [1],
          13: (t) => [1],
          14: (t) => [0],
          23: (t) => [2],
          6: (t) => [53],
          26: (t) => [1],
          16: (t) => [57],
          27: (t) => [55],
        };
        if (s[t]) {
          const n = s[t](e);
          for (let s = 0; s < n.length; ++s) {
            let a = n[s];
            ((this.p >= 0 || this.C >= 0 || this.B) && Ir[t] && (a = Ir[t]),
              this.p >= 0 && 21 == t && Lr[this.p][t] && (a = Lr[this.p][t]),
              this.C >= 0 && 22 == t && Lr[this.C][t] && (a = Lr[this.C][t]),
              15 == e.f && this.C >= 0 && 22 == t && Lr[this.C][e.i] && (a = Lr[this.C][e.i]),
              a >= i.e.length || -1 == i.e[a] || r.push(i.e[a]));
          }
        }
      }
      return r;
    }
    F(t) {
      if ($.isArray(t)) for (let e = 0; e < t.length; ++e) this.K(t[e][0], t[e][1], t[e][2]);
      else for (let e in t) this.K(parseInt(e), t[e]);
      ((this.k = !0), this.ed());
    }
    L(t, e, i) {
      for (const r in this.cba) {
        this.cba[r].d.m(t, e, i);
      }
    }
    v() {
      var t;
      const e = this.b;
      for (let t = 0; t < 52; t++) this.gf[t] = 100 * t + Ar[t];
      for (const e of (null === (t = this.E) || void 0 === t ? void 0 : t.j) || [])
        e >= 0 && (this.gf[Math.floor(e / 100)] = e);
      for (const t in this.cba) {
        const e = this.cba[t].ba,
          i = this.cba[t].d;
        i.m(0, Ur, !1);
        for (const t of e) (i.m(t.a, t.a, !0), (this.gf[Math.floor(t.a / 100)] = t.a));
      }
      (e.N(0, Ur, !1), e.N(0, 0, !0));
      for (let t = 0; t < this.gf.length; t++) e.N(this.gf[t], this.gf[t], !0);
      let i = this.D.get(1),
        r = this.D.get(3),
        n = this.D.get(4),
        s = this.D.get(5),
        a = this.D.get(6),
        o = this.D.get(7),
        l = this.D.get(8),
        h = this.D.get(9),
        u = this.D.get(10),
        c = this.D.get(19),
        d = this.D.get(16),
        f = !1,
        g = !1;
      s && s.o && s.o[2] ? (g = !0) : o && o.o && o.o[2] && (f = !0);
      let p = g || f;
      (this.D.forEach((t) => {
        if (t && t.r && t.H) {
          let e = t.H.d.modelInstance;
          if (!e.aQ) return;
          (e.N(0, Ur, !1),
            1 == t.i
              ? (e.g(t.o[0], 2700), e.g(t.o[1], 2100))
              : 3 == t.i
                ? e.g(t.o[0], 2600)
                : 4 == t.i
                  ? (e.g(t.o[0], 800), e.g(t.o[1], 1e3))
                  : 5 == t.i || 20 == t.i
                    ? (u && u.r && u.o[0] ? e.g(-2, 800) : e.g(t.o[0], 800),
                      e.g(t.o[1], 1e3),
                      p && e.g(t.o[2], 1300),
                      e.g(t.o[3], 2200),
                      e.g(t.o[4], 2800))
                    : 6 == t.i
                      ? e.g(t.o[0], 1800)
                      : 7 == t.i
                        ? (e.g(t.o[0], 1100), e.g(t.o[1], 900), p && e.g(t.o[2], 1300))
                        : 8 == t.i
                          ? (e.g(t.o[0], 500), e.g(t.o[1], 2e3))
                          : 10 == t.i
                            ? (0 == t.o[0] && s && s.r && s.o[0] ? e.g(-2, 400) : e.g(t.o[0], 400),
                              e.g(t.o[1], 2300))
                            : 16 == t.i
                              ? e.g(t.o[0], 1500)
                              : 19 == t.i
                                ? e.g(t.o[0], 1200)
                                : 9 == t.i &&
                                  ((u && u.r && u.o[0]) ||
                                  null != (null == u ? void 0 : u.H) ||
                                  (s && s.r && s.o[2] && s.o[0] > 0)
                                    ? e.g(-2, 2300)
                                    : e.g(t.o[0], 2300)));
        }
      }),
        this.kj.forEach((t) => {
          if (t && t.H) {
            const e = t.H.d.modelInstance;
            (e.N(0, Ur, !1), e.g(t.o[0], 2600));
          }
        }),
        this.D.forEach((t) => {
          if (t && t.r && t.I)
            for (let e of t.I) {
              if (!e) continue;
              let i = e.d;
              1 == t.i
                ? (i.ba(t.j[0], 27), i.ba(t.j[1], 21))
                : 3 == t.i
                  ? i.ba(t.j[0], 26)
                  : 4 == t.i
                    ? (i.ba(t.j[0], 8), i.ba(t.j[1], 10))
                    : 5 == t.i || 20 == t.i
                      ? (i.ba(t.j[0], 8),
                        i.ba(t.j[1], 10),
                        i.ba(t.j[2], 13),
                        i.ba(t.j[3], 22),
                        i.ba(t.j[4], 28))
                      : 6 == t.i
                        ? i.ba(t.j[0], 18)
                        : 7 == t.i
                          ? (i.ba(t.j[0], 11), i.ba(t.j[1], 9), i.ba(t.j[2], 13))
                          : 8 == t.i
                            ? (i.ba(t.j[0], 5), i.ba(t.j[1], 20))
                            : 10 == t.i
                              ? (i.ba(t.j[0], 4), i.ba(t.j[1], 23))
                              : 16 == t.i
                                ? i.ba(t.j[0], 15)
                                : 19 == t.i
                                  ? i.ba(t.j[0], 12)
                                  : 9 == t.i && i.ba(t.j[0], 23);
            }
        }),
        this.kj.forEach((t) => {
          if (t && t.I)
            for (let e of t.I) {
              let i = e.d;
              (i.ba(t.j[0], 26), t.d > 0 && (i.m(2600, 2699, !1), i.ba(t.d, 26)));
            }
        }));
      if (i && i.r) {
        const t = i.H || i.I[0],
          r = this.H,
          n = 0 == this.ih ? i.u : i.L;
        if (t && n)
          for (let t = 0; t < n.length; t++)
            if (n[t].RaceId == r) {
              const i = n[t].GeosetGroup;
              if (5 == r && (1 == i || 2 == i)) continue;
              if (i < 52)
                if (0 == i) e.N(1, 99, !1);
                else {
                  const t = 100 * i;
                  e.N(t, t + 99, !1);
                }
            }
      }
      if (i && i.I && i.d > 0)
        for (let t of i.I) {
          let e = t.d;
          (e.m(2600, 2799, !1), e.ba(i.d, 27));
        }
      if (r && r.I && r.d > 0)
        for (let t of r.I) {
          let e = t.d;
          (e.m(2600, 2699, !1), e.ba(r.d, 26));
        }
      if (a && a.I && a.d > 0)
        for (let t of a.I) {
          let e = t.d;
          (e.m(1800, 1899, !1), e.ba(a.d, 18));
        }
      let m = 0;
      if ((c && (m |= 16), u && u.r && u.o && u.o[0])) {
        let t = 401 + u.o[0];
        (e.N(401, 499, !1), e.N(t, t, !0));
      } else if (s && s.r && s.o && s.o[0]) {
        let t = 801 + s.o[0];
        (e.N(t, t, !0),
          u &&
            u.o &&
            0 == u.o[0] &&
            ((u.w = 7), (s.w = 8), noop("updating sorting for chest/gloves")));
      }
      if (!(s || a || h) && n && n.r && n.o && n.o[0]) {
        let t = 801 + n.o[0];
        e.N(t, t, !0);
      }
      if (c && c.r) 1048576 & c.l || (e.N(2200, 2299, !1), e.N(2202, 2202, !0));
      else if (s && s.r && s.o && s.o[3]) {
        let t = 2201 + s.o[3];
        (e.N(2200, 2299, !1), e.N(t, t, !0));
      }
      let b,
        y = !1;
      if ((a && a.r && a.o && a.o[0] && (y = !!(512 & a.l)), g)) {
        (e.N(501, 599, !1), e.N(902, 999, !1), e.N(1100, 1199, !1), e.N(1300, 1399, !1));
        let t = 1301 + s.o[2];
        e.N(t, t, !0);
      } else if (f) {
        (e.N(501, 599, !1), e.N(902, 999, !1), e.N(1100, 1199, !1), e.N(1300, 1399, !1));
        let t = 1301 + o.o[2];
        e.N(t, t, !0);
      } else if (l && l.r && l.o && l.o[0]) {
        (e.N(501, 599, !1), e.N(901, 901, !0));
        let t = 501 + l.o[0];
        e.N(t, t, !0);
      } else {
        let t;
        ((t = o && o.r && o.o && o.o[1] ? 901 + o.o[1] : 901), e.N(t, t, !0));
      }
      ((b = l && l.r && l.o && l.o[1] ? 2e3 + l.o[1] : !l || !l.r || 1048576 & l.l ? 2001 : 2002),
        e.N(2001, 2099, !1),
        e.N(b, b, !0));
      let F = !1;
      if (!p && c && c.r && c.o && c.o[0]) {
        let t;
        ((F = !1), y ? ((F = !0), (t = 1203)) : ((F = !0), (t = 1201 + c.o[0])), e.N(t, t, !0));
      } else 16 & m && (e.N(1201, 1201, !0), p || (e.N(1202, 1202, !0), (F = !0)));
      if (!F && !g)
        if (s && s.r && s.o && s.o[1]) {
          let t = 1001 + s.o[1];
          e.N(t, t, !0);
        } else if (n && n.r && n.o && n.o[1]) {
          let t = 1001 + n.o[1];
          e.N(t, t, !0);
        }
      if (!g && o && o.r && o.o && o.o[0]) {
        let t = o.o[0],
          i = 1101 + t,
          r = e.T.some((t) => t.meshId == i);
        t > 2 ? (e.N(1300, 1399, !1), r ? e.N(i, i, !0) : e.N(1301, 1301, !0)) : F || e.N(i, i, !0);
      }
      if (c && c.r && c.o && c.o[0] && this.n.length > 0)
        for (let t of this.n) {
          const i = _r[t];
          if (i && 12 == i.GeosetType && i.Original == c.o[0] + 1) {
            e.N(1200, 1299, !1);
            let t = 1200 + i.Override;
            e.N(t, t, !0);
            break;
          }
        }
      if (d && d.r && d.o && d.o[0]) {
        e.N(1500, 1599, !1);
        let t = 1501 + d.o[0];
        if (this.n.length > 0)
          for (let e of this.n) {
            const i = _r[e];
            if (i && 15 == i.GeosetType && i.Original == d.o[0] + 1) {
              t = 1500 + i.Override;
              break;
            }
          }
        e.N(t, t, !0);
      }
      if (a && a.r && a.o && a.o[0]) {
        e.N(1800, 1899, !1);
        let t = 1801 + a.o[0];
        e.N(t, t, !0);
      }
      o || g || f || F || y ? e.N(1400, 1499, !1) : e.N(1401, 1401, !0);
    }
    setParticlesEnabled(t) {
      (super.setParticlesEnabled(t),
        this.D.forEach((e) => {
          if (e.I) for (let i = 0; i < e.I.length; ++i) e.I[i] && e.I[i].d.setParticlesEnabled(t);
        }));
    }
    A() {}
    G() {
      if (!this.r) return;
      let t = !1;
      if (
        (this.D.forEach((e) => {
          if (e.r || e.h) {
            if (e.z)
              for (let i = 0; i < e.z.length; ++i)
                if (e.z[i].texture && !e.z[i].texture.a()) return void (t = !0);
          } else t = !0;
        }),
        t)
      )
        return;
      if (!this.E) return;
      const e = this.E.h.Materials,
        i = this.E.h.TextureLayers,
        r = this.E.h.TextureSections;
      let n = !0,
        s = !0;
      ((15 != this.H && 21 != this.H) || (s = !1),
        this.D.forEach((t) => {
          let e = t.v;
          ((4 != e && 5 != e && 19 != e) || ((n = !1), null == t.z && (n = !0)),
            7 == e && ((s = !1), null == t.z && (s = !0)));
        }));
      let a = -1;
      if (27 == this.H)
        for (let t of i) 9 == t.BlendMode && 1 == t.TextureType && t.Layer > a && (a = t.Layer);
      const o =
        ((l = (t) => t.TextureType),
        i.reduce((t, e) => {
          var i;
          return ((t[(i = l(e))] || (t[i] = [])).push(e), t);
        }, {}));
      var l;
      for (const t in o) {
        const e = o[t];
        for (const t of e) {
          const e = this.E.g[t.ChrModelTextureTargetID];
          if (e && !e.c()) return;
        }
      }
      for (const t in o) {
        const i = o[t],
          l = i[0].TextureType;
        if (!this.i[t]) {
          const i = e.find((t) => t.TextureType == l);
          if (!i) {
            noop("unable to find material info", l);
            continue;
          }
          this.i[t] = new Gr(this.ba.context, i.Width, i.Height);
        }
        const h = this.i[t];
        h.d();
        for (const t of i) {
          let e = -1;
          t.Layer == a && (e = 0);
          const i = this.E.g[t.ChrModelTextureTargetID];
          if (!i) continue;
          const o = t.TextureSection;
          if ((3 != o && 5 != o) || (n && 3 == o) || (s && 5 == o)) {
            let n = 0,
              s = 0,
              a = 1,
              l = 1;
            if (-1 != o && r) {
              const t = r.find((t) => t.SectionType == o);
              if (!t) {
                noop("can't find texture section data", o);
                continue;
              }
              ((n = t.X), (s = t.Y), (a = t.Width), (l = t.Height));
            }
            h.u(i, n, s, a, l, t.BlendMode, t.Layer, e);
          }
        }
        (1 == l && 52 != this.H && 70 != this.H && this.ut(h),
          26 != l || (52 != this.H && 70 != this.H) || this.ut(h),
          h.k());
      }
      this.ml(this.b);
      for (let t in this.cba) {
        const e = this.cba[t];
        e.d && e.d.loaded && this.ml(e.d.e());
      }
      this.r = !1;
    }
    ml(t) {
      if (this.i[1]) {
        const e = this.i[1];
        t.aH(e.n(0), e.n(1), e.n(2));
      }
      for (let e in this.i) {
        this.i[e];
        t.M(e, this.i[e].n(0));
      }
    }
    ut(t) {
      const e = [];
      (this.D.forEach((t) => {
        e.push(t);
      }),
        e.sort(function (t, e) {
          return t.w - e.w;
        }));
      const i = this.E.h.TextureSections;
      for (let r = 0; r < e.length; r++) {
        const n = e[r];
        if (n.z)
          for (let e = 0; e < n.z.length; e++) {
            const r = n.z[e];
            if (r.gender == this.ih && r.texture && r.texture.a() && 12 != r.region) {
              if (1 & this.t.Character.ChrModelFlags && 7 == r.region) continue;
              const e = i.find((t) => t.SectionType == r.region);
              if (!e) {
                noop("can't find texture section data", r.region);
                continue;
              }
              const n = new Hr();
              ((n.e = r.texture), t.u(n, e.X, e.Y, e.Width, e.Height, 0, -1, -1));
            }
          }
      }
    }
    setAppearance(t) {
      var e;
      ((this.O = t),
        (this.p = t.sheathMain),
        (this.C = t.sheathOff),
        null === (e = this.E) || void 0 === e || e.d(t.options),
        (this.r = !0),
        (this.k = !0),
        this.A(),
        this.ed());
    }
    setCustomizationsLoadedCallback(t) {
      this.sr = t;
    }
    setItems(t) {
      const e = this.ba.options;
      noop("setItems", t);
      const i = [];
      for (let e = 0; e < t.length; e++) i.push([t[e].slot, t[e].display, t[e].visual]);
      (i.forEach((t) => {
        const i = [parseInt(t[0]), parseInt(t[1])];
        e.items.push(i);
      }),
        this.F(i),
        (this.r = !0));
    }
    attachList(t) {
      const e = this.ba.options;
      noop("attachList", t);
      const i = t.split(","),
        r = [];
      for (let t = 0; t < i.length; t += 2) r.push([i[t], i[t + 1]]);
      (r.forEach((t) => {
        const i = [parseInt(t[0]), parseInt(t[1])];
        e.items.push(i);
      }),
        this.F(r),
        (this.r = !0));
    }
    clearSlots(t) {
      const e = this.ba.options;
      noop("clearSlots", t);
      const i = t.split(",");
      for (let t = 0; t < i.length; ++t) {
        this.I(parseInt(i[t]));
        const r = [];
        (e.items.forEach((i) => {
          0 != e.items[t].indexOf(parseInt(i)) && r.push(i);
        }),
          (e.items = r));
      }
      (this.ed(), (this.r = !0));
    }
    setShouldersOverride(t) {
      if ((noop("setShouldersOverride", t), !t || 2 != t.length)) return;
      for (let t = 0; t < 2; t++) {
        const e = this.kj[t];
        (e && e.c(), (this.kj[t] = null));
      }
      for (let e = 0; e < 2; e++)
        if (null != t[e]) {
          const i = new Ca(this, 3, t[e]);
          let r = 0;
          ((r = 0 == e ? 1 : 2), i.A(r), (this.kj[e] = i));
        }
      const e = this.D.get(3);
      if (e) {
        let t = 3;
        for (let e = 0; e < 2; e++) this.kj[e] && (t &= ~(1 << e));
        e.A(t);
      }
      this.kj && (this.kj[0] || this.kj[1]) && this.I(3);
    }
    setSheath(t, e) {
      ((this.p = t), (this.C = e), this.ed());
    }
    ed() {
      if (!this.loaded) return;
      const t = this.b;
      let e = (-1 == this.C || !this.C) && null != this.D.get(22),
        i = !((-1 != this.p && this.p) || (null == this.D.get(13) && null == this.D.get(21)));
      for (let i of Br) {
        let r = t.r.U[i];
        r > 0 && r < t.ah.length && this.b.ah[r].v(e ? "HandsClosed" : "");
      }
      for (let e of Rr) {
        let r = t.r.U[e];
        r > 0 && r < t.ah.length && t.ah[r].v(i ? "HandsClosed" : "");
      }
    }
    CB(t) {
      const e = this.b;
      if (!e.aQ) return;
      const i = t.d.modelInstance;
      if (!i || !i.aQ) return;
      t.a || (i.aK(e, -1, null), (t.a = !0));
      let r = i.ah;
      if (r) {
        for (let t = 0; t < r.length; t++) {
          let i = r[t],
            n = this.Az[i.o.g];
          if ("number" != typeof n) continue;
          let s = r[t].p,
            a = e.ah[n].p;
          ((r[t].l = !0), si(s, a));
        }
        i.p();
      }
    }
    wv() {
      const t = this.b;
      let e = {};
      for (let i = 0; i < t.ah.length; i++) e[t.ah[i].o.g] = i;
      this.Az = e;
    }
    c() {
      if (this.b && this.b.aQ) {
        (this.Az || (this.wv(), this.ed()), super.c());
        for (const t in this.cba) {
          const e = this.cba[t];
          this.CB(e);
        }
        (this.D.forEach((t) => {
          if (t) {
            if (2 == t.s && 13 == t.K) {
              if (21 == t.v && -1 != this.p) return;
              if (22 == t.v && -1 != this.C) return;
            }
            t.a();
          }
        }),
          this.kj.forEach((t) => {
            t && t.I && t.a();
          }),
          this.G());
      }
    }
    static yx(t, e) {
      const i = t.d;
      if (!i.loaded) return;
      const r = i.modelInstance;
      if (!r || !r.aQ) return;
      r.ah && r.aa(e);
    }
    d(t) {
      if (this.b && this.b.aQ) {
        super.d(t);
        for (const e in this.cba) {
          const i = this.cba[e];
          xa.yx(i, t);
        }
        if (
          (this.D.forEach((e) => {
            if (e) {
              if (2 == e.s && 13 == e.K) {
                if (21 == e.v && -1 != this.p) return;
                if (22 == e.v && -1 != this.C) return;
              }
              e.E(t);
            }
          }),
          this.kj.forEach((e) => {
            e && e.I && e.E(t);
          }),
          this.o)
        )
          for (let e = 0; e < this.o.length; e++) {
            let i = this.o[e];
            i.aQ && i.aa(t);
          }
        this.D.forEach((e) => {
          e && e.H && e.H.d && e.H.a && xa.yx(e.H, t);
        });
      }
    }
    g(t) {
      super.g(t);
      for (const e in this.cba) {
        const i = this.cba[e];
        i.a && i.d && i.d.loaded && i.d.g(t);
      }
      if (
        (this.D.forEach((e) => {
          if (e) {
            if (2 == e.s && 13 == e.K) {
              if (21 == e.v && -1 != this.p) return;
              if (22 == e.v && -1 != this.C) return;
            }
            e.x(t);
          }
        }),
        this.kj.forEach((e) => {
          e && e.I && e.x(t);
        }),
        this.o)
      )
        for (let e = 0; e < this.o.length; e++) {
          let i = this.o[e];
          i.aQ && t.b(i, !1);
        }
    }
  }
  class Aa extends oa {
    constructor(t, e, i, r, n, s) {
      (super(t, e, i, r, n, s), this.cba());
    }
    cba() {
      let t = this.k;
      const e = this.fe,
        i = this.j,
        r = this.l;
      if (r.ComponentModels) {
        let n = r.ComponentModels[0] || r.ComponentModels[1];
        (n &&
          r.ModelFiles &&
          r.ModelFiles[n] &&
          (27 == r.Item.InventoryType
            ? (this.b = new na(this.hg, this.hg.renderer, r.ModelFiles[n][0].FileDataId))
            : (this.b = new na(this.hg, this.hg.renderer, sa.b(r.ModelFiles[n], -1, e, i, t))),
          this.b.ao()),
          this.b &&
            r.Item.AttachGeosetGroup &&
            (this.b.aq(r.Item.AttachGeosetGroup[0], 27),
            this.b.aq(r.Item.AttachGeosetGroup[1], 21)));
      }
      if (r.Textures)
        for (let t in r.Textures)
          0 != r.Textures[t] && this.b.M(parseInt(t), this.hg.getTexture(r.Textures[t]));
    }
  }
  class _a extends oa {
    constructor(t, e, i, r, n, s) {
      (super(t, e, i, r, n, s), (this.ed = 0), this.gf());
    }
    get shoulderIndex() {
      return this.ed;
    }
    cba(t) {
      this.ed != t && ((this.ed = t), this.gf());
    }
    gf() {
      this.b = null;
      let t = this.k;
      const e = this.fe,
        i = this.j,
        r = this.l;
      if (r.ComponentModels) {
        let n = r.ComponentModels[0],
          s = r.ComponentModels[1];
        if (!n || (1 != this.ed && 0 != this.ed)) {
          if (
            s &&
            (2 == this.ed || 0 == this.ed) &&
            (s &&
              r.ModelFiles[s] &&
              ((this.b = new na(this.hg, this.hg.renderer, sa.b(r.ModelFiles[s], 1, e, i, t))),
              this.b.ao()),
            r.Textures2 && this.b)
          )
            for (let t in r.Textures2)
              0 != r.Textures2[t] && this.b.M(+t, this.hg.getTexture(r.Textures2[t]));
        } else if (
          (n &&
            r.ModelFiles[n] &&
            ((this.b = new na(this.hg, this.hg.renderer, sa.b(r.ModelFiles[n], 0, e, i, t))),
            this.b.ao()),
          this.b && r.Textures)
        )
          for (let t in r.Textures)
            0 != r.Textures[t] && this.b.M(+t, this.hg.getTexture(r.Textures[t]));
      }
      this.b && r.Item.AttachGeosetGroup && this.b.aq(r.Item.AttachGeosetGroup[0], 26);
    }
    c() {
      this.b.p();
    }
    d(t) {
      this.b.aa(t);
    }
  }
  class wa extends oa {
    constructor(t, e, i, r, n, s) {
      (super(t, e, i, r, n, s), this.cba());
    }
    cba() {
      let t = this.k;
      const e = this.fe,
        i = this.j,
        r = this.l;
      if (r.ComponentModels) {
        let n = r.ComponentModels[0];
        n &&
          r.ModelFiles &&
          r.ModelFiles[n] &&
          (this.b = new na(this.hg, this.hg.renderer, sa.b(r.ModelFiles[n], -1, e, i, t)));
      }
      if (this.b && r.Textures)
        for (let t in r.Textures)
          0 != r.Textures[t] && (this.b.aT[+t] = this.hg.getTexture(r.Textures[t]));
    }
    isLoaded() {
      return (!this.b && !this.l.ComponentModels) || this.loaded;
    }
  }
  class Ea extends aa {
    constructor(t, e) {
      (super(), (this.dc = t), (this.ba = e), this.fe());
    }
    fe() {
      ((this.b = new na(this.dc, this.dc.renderer, this.ba.Model)), this.b.al(1 | this.ba.Scale));
    }
    c() {
      this.b && this.b.p();
    }
    getBounds() {
      return this.b.aQ ? this.b.at() : [null, null];
    }
    d(t) {
      this.b && this.b.aa(t);
    }
  }
  class Da {
    static a(t, e, i) {
      if (e.Character || i == wr.CHARACTER) return new xa(t, e);
      if (i == wr.NPC || i == wr.HUMANOIDNPC) return new ca(t, e);
      if (i == wr.HELM || i == wr.SHOULDER || i == wr.ITEM) {
        const r = Da.b(t, e, i, 1, 0, 0);
        return (r.dc(), r);
      }
      if (i == wr.OBJECT) return new Ea(t, e);
      throw "Couldn't create actor";
    }
    static b(t, e, i, r, n, s) {
      if (i == wr.HELM) return new Aa(t, e, r, n, s, !1);
      if (i == wr.SHOULDER) return new _a(t, e, r, n, s, !1);
      if (i == wr.ITEM) return new wa(t, e, r, n, s, !1);
      throw "Couldn't create item actor";
    }
    static c(t, e, i) {
      return e == wr.PATH
        ? new Promise((e, r) => {
            e(new la(t, i, {}, !1));
          })
        : fa(t.options.contentPath, e, i).then((i) => Da.a(t, i, e));
    }
  }
  const Ma = class {
    constructor(t) {
      ((this.currFrame = 0),
        (this.clearColor = Ue(0, 0, 0)),
        (this.addedCss = !1),
        (this.progressShown = !1),
        (this.doUpdateBounds = !1),
        (this.attributeState = new Me()),
        (this.gxDevice = null),
        (this.textureCache = new Map()),
        (this.crossFadeDuration = 0.3),
        (this.onContextMenu = function (t) {
          return !1;
        }));
      var e = this;
      ((e.viewer = t),
        (e.options = t.options),
        (e.downloads = {}),
        (e.context = null),
        (e.bgImgLoaded = !1),
        (e.width = 0),
        (e.height = 0),
        (e.time = 0),
        (e.delta = 0),
        (e.actors = []),
        (e.screenshotDataURL = null),
        (e.makeDataURL = !1),
        (e.screenshotCallback = null),
        (e.azimuth = 1.5 * Math.PI),
        (e.zenith = Math.PI / 2),
        (e.distance = 15),
        (e.fov = 30),
        (e.zoom = {
          rateStep: 0.1,
          rateAccelerationDecay: 0.4,
          interpolationRate: 0.3,
          range: [0.3, 4],
          rateCurrent: 0,
          target: 1,
          current: 1,
        }),
        (e.zoom.range = e.zoom.range.map(function (t) {
          return Math.log(t) / Math.log(1 + e.zoom.rateStep);
        })),
        (e.translation = Ue(0, 0, 0)),
        (e.translationFromModel = Ue(0, 0, 0)),
        (e.target = Ue(0, 0, 0)),
        (e.eye = Ue(0, 0, 0)),
        (e.up = Ue(0, 0, 1)),
        (e.lookDir = Ie()),
        (e.fullscreen = !1),
        (e.projMatrix = ni()),
        (e.viewMatrix = ni()),
        (e.panningMatrix = ni()),
        (e.viewOffset = Ie()),
        this.addedCss ||
          ((this.addedCss = !0),
          $("head").append(
            '<link rel="stylesheet" href="//wow.zamimg.com/modelviewer/viewer/viewer.css" type="text/css" />',
          )));
    }
    updateProgress() {
      if (!this.stop) {
        var t = this,
          e = 0,
          i = 0;
        for (var r in t.downloads) ((e += t.downloads[r].total), (i += t.downloads[r].loaded));
        if (e <= 0)
          t.progressShown && (t.progressBg.hide(), t.progressBar.hide(), (t.progressShown = !1));
        else {
          t.progressShown || (t.progressBg.show(), t.progressBar.show(), (t.progressShown = !0));
          var n = i / e;
          t.progressBar.width(Math.round(t.width * n) + "px");
        }
      }
    }
    destroy() {
      var t = this;
      ((t.stop = !0),
        t.canvas &&
          ($(t.canvas).off(),
          t.canvas.detach(),
          t.progressBg.detach(),
          t.progressBar.detach(),
          (t.canvas = t.progressBg = t.progressBar = null)),
        t.clearBackground(),
        (t.actors = []));
    }
    method(t, e) {
      if ("isBackgroundLoaded" === t) return this.bgImgLoaded;
      if ("setBackground" !== t) {
        if (this.actors.length > 0 && this.actors[0]) {
          const i = this.actors[0][t];
          return i ? i.apply(this.actors[0], e) : void noop("Unknown viewer method", t, "args", e);
        }
        this.actorPromises.length > 0 &&
          this.actorPromises[0] &&
          (this.actorPromises[0] = this.actorPromises[0].then((i) => {
            const r = i[t];
            if (r) return (r.apply(i, e), i);
            noop("Unknown viewer method", t, "args", e);
          }));
      } else this.setBackground(e[0]);
    }
    getTime() {
      return window.performance && window.performance.now ? window.performance.now() : Date.now();
    }
    draw(t) {
      var e,
        i = this,
        r = i.context;
      if (
        ((i.delta = 0.001 * (t - i.time)),
        (i.time = t),
        i.currFrame++,
        this.doUpdateBounds && i.actors.length > 0)
      ) {
        let [t, r] = [Ie(), Ie()];
        for (e = 0; e < i.actors.length; ++e) {
          const [n, s] = i.actors[e].getBounds();
          (n && je(t, t, n), s && ze(r, r, s));
        }
        const n = Ie(),
          s = Ie();
        (Ne(n, r, t), qe(s, t, n, 0.5));
        let a = n[2],
          o = n[0],
          l = n[1];
        const h = this.width / this.height,
          u = 2 * Math.tan((this.fov / 2) * 0.0174532925),
          c = (1.2 * a) / u,
          d = (1.2 * o) / (u * h);
        ((this.distance = Math.max(Math.max(c, d), 2 * l)),
          He(this.translationFromModel, s[0], -s[2], 0),
          (this.doUpdateBounds = !1));
      }
      for (
        i.updateCamera(),
          r.bindFramebuffer(r.FRAMEBUFFER, null),
          r.viewport(0, 0, i.width, i.height),
          r.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 0),
          r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT),
          i.bgTexture &&
            i.program &&
            (r.useProgram(i.program),
            r.activeTexture(r.TEXTURE0),
            r.bindTexture(r.TEXTURE_2D, i.bgTexture),
            r.uniform1i(i.uTexture, 0),
            r.uniform4f(
              i.uBGTransform,
              i.viewer.options.bgPosition[0] || 0,
              i.viewer.options.bgPosition[1] || 0,
              i.viewer.options.bgScale[0] || 1,
              i.viewer.options.bgScale[1] || 1,
            ),
            i.options.backgroundRotatation &&
              (r.uniform1f(i.uRotation, i.options.backgroundRotatation),
              r.uniform2f(i.uResolution, i.width, i.height)),
            r.bindBuffer(r.ARRAY_BUFFER, i.vb),
            r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, null),
            r.enableVertexAttribArray(i.aPosition),
            r.vertexAttribPointer(i.aPosition, 2, r.FLOAT, !1, 16, 0),
            r.enableVertexAttribArray(i.aTexCoord),
            r.vertexAttribPointer(i.aTexCoord, 2, r.FLOAT, !1, 16, 8),
            r.depthMask(!1),
            r.disable(r.CULL_FACE),
            r.blendFunc(r.ONE, r.ZERO),
            r.drawArrays(r.TRIANGLE_STRIP, 0, 4),
            r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA),
            r.enable(r.CULL_FACE),
            r.depthMask(!0),
            r.disableVertexAttribArray(i.aPosition),
            r.disableVertexAttribArray(i.aTexCoord)),
          e = 0;
        e < i.actors.length;
        ++e
      )
        i.actors[e].c();
      for (r.viewport(0, 0, i.width, i.height), this.gxDevice.e(), e = 0; e < i.actors.length; ++e)
        i.actors[e].d(!1);
      for (e = 0; e < i.actors.length; ++e) i.actors[e].d(!0);
      this.gxDevice.c();
    }
    setAdaptiveMode(t) {
      ((this.addaptiveMode = t), t && $(window).trigger("resize"));
    }
    setTranslation(t, e, i) {
      this.translation = Ue(t, e, i);
    }
    setBackground(t) {
      var e = this;
      ((e.bgImgLoaded = !1), (e.options.background = t), e.clearBackground(), e.loadBackground());
    }
    clearBackground() {
      var t = this;
      if (t.context) {
        var e = t.context;
        (t.bgTexture && e.deleteTexture(t.bgTexture),
          (t.bgTexture = null),
          t.program && e.deleteProgram(t.program),
          (t.program = null),
          t.vb && e.deleteBuffer(t.vb),
          t.vs && e.deleteShader(t.vs),
          t.fs && e.deleteShader(t.fs),
          (t.vb = t.vs = t.fs = null));
      }
      t.bgImg && (t.bgImg = null);
    }
    updateCamera() {
      var t = this;
      ((t.zoom.target += t.zoom.rateCurrent),
        (t.zoom.rateCurrent *= 1 - t.zoom.rateAccelerationDecay),
        (t.zoom.target = -Math.max(Math.min(-t.zoom.target, t.zoom.range[1]), t.zoom.range[0])),
        (t.zoom.current += (t.zoom.target - t.zoom.current) * t.zoom.interpolationRate));
      var e = t.distance * Math.pow(t.zoom.rateStep + 1, -t.zoom.current),
        i = t.azimuth,
        r = t.zenith;
      (1 == t.up[2]
        ? ((t.eye[0] = -e * Math.sin(r) * Math.cos(i) + t.target[0]),
          (t.eye[1] = -e * Math.sin(r) * Math.sin(i) + t.target[1]),
          (t.eye[2] = -e * Math.cos(r) + t.target[2]))
        : ((t.eye[0] = -e * Math.sin(r) * Math.cos(i) + t.target[0]),
          (t.eye[1] = -e * Math.cos(r) + t.target[1]),
          (t.eye[2] = -e * Math.sin(r) * Math.sin(i) + t.target[2])),
        Ne(t.lookDir, t.target, t.eye),
        Ye(t.lookDir, t.lookDir),
        (function (t, e, i, r) {
          var n,
            s,
            a,
            o,
            l,
            h,
            u,
            c,
            d,
            f,
            g = e[0],
            p = e[1],
            m = e[2],
            b = r[0],
            y = r[1],
            F = r[2],
            S = i[0],
            v = i[1],
            T = i[2];
          Math.abs(g - S) < Re && Math.abs(p - v) < Re && Math.abs(m - T) < Re
            ? oi(t)
            : ((u = g - S),
              (c = p - v),
              (d = m - T),
              (n = y * (d *= f = 1 / Math.hypot(u, c, d)) - F * (c *= f)),
              (s = F * (u *= f) - b * d),
              (a = b * c - y * u),
              (f = Math.hypot(n, s, a))
                ? ((n *= f = 1 / f), (s *= f), (a *= f))
                : ((n = 0), (s = 0), (a = 0)),
              (o = c * a - d * s),
              (l = d * n - u * a),
              (h = u * s - c * n),
              (f = Math.hypot(o, l, h))
                ? ((o *= f = 1 / f), (l *= f), (h *= f))
                : ((o = 0), (l = 0), (h = 0)),
              (t[0] = n),
              (t[1] = o),
              (t[2] = u),
              (t[3] = 0),
              (t[4] = s),
              (t[5] = l),
              (t[6] = c),
              (t[7] = 0),
              (t[8] = a),
              (t[9] = h),
              (t[10] = d),
              (t[11] = 0),
              (t[12] = -(n * g + s * p + a * m)),
              (t[13] = -(o * g + l * p + h * m)),
              (t[14] = -(u * g + c * p + d * m)),
              (t[15] = 1));
        })(t.viewMatrix, t.eye, t.target, t.up),
        oi(t.panningMatrix),
        1 == t.up[2]
          ? He(t.viewOffset, t.translation[0], -t.translation[1], 0)
          : He(t.viewOffset, t.translation[0], 0, t.translation[1]),
        We(t.viewOffset, t.viewOffset, this.translationFromModel),
        ci(t.panningMatrix, t.panningMatrix, t.viewOffset),
        ui(t.viewMatrix, t.panningMatrix, t.viewMatrix));
    }
    init() {
      var t,
        e = this,
        i = e.context;
      if (
        ((this.blackPixelTexture = i.createTexture()),
        i.bindTexture(i.TEXTURE_2D, this.blackPixelTexture),
        i.texImage2D(
          i.TEXTURE_2D,
          0,
          i.RGBA,
          1,
          1,
          0,
          i.RGBA,
          i.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 0, 255]),
        ),
        i.bindTexture(i.TEXTURE_2D, null),
        (this.greenPixelTexture = i.createTexture()),
        i.bindTexture(i.TEXTURE_2D, this.greenPixelTexture),
        i.texImage2D(
          i.TEXTURE_2D,
          0,
          i.RGBA,
          1,
          1,
          0,
          i.RGBA,
          i.UNSIGNED_BYTE,
          new Uint8Array([0, 255, 0, 255]),
        ),
        i.bindTexture(i.TEXTURE_2D, null),
        yi(e.projMatrix, 0.0174532925 * e.fov, e.viewer.aspect, 0.1, 500),
        e.updateCamera(),
        i.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], 0),
        i.enable(i.DEPTH_TEST),
        i.depthFunc(i.LEQUAL),
        i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA),
        i.enable(i.BLEND),
        e.options.models || e.options.items)
      ) {
        e.actorPromises = [];
        var r = [].concat(e.options.models);
        if (r.length > 0) {
          const i = e.options.mount,
            n = e.options.shouldersOverride;
          for (t = 0; t < r.length; ++t) {
            const s = Da.c(this, r[t].type, r[t].id)
              .then(
                (t) => (
                  i && i.id && t instanceof ca && t.z(i.id),
                  t instanceof xa && t.setShouldersOverride(n),
                  e.actors.push(t),
                  t
                ),
              )
              .then((t) => t);
            e.actorPromises.push(s);
          }
        }
      }
      !(function t() {
        if (!e.stop && (window.requestAnimationFrame(t), e.gxDevice)) {
          var r = e.getTime();
          if (!1 !== e.makeDataURL) {
            if (e.canvas[0].toDataURL) {
              var n = e.clearColor,
                s = e.bgTexture;
              (e.options.transparent && ((e.bgTexture = null), (e.clearColor = Ue(0, 0, 0))),
                e.draw(r));
              var a = e.width * e.height * 4,
                o = new Uint8Array(a);
              i.readPixels(0, 0, e.width, e.height, i.RGBA, i.UNSIGNED_BYTE, o);
              let t = null;
              e.options.transparent
                ? ((e.clearColor = Ue(1, 1, 1)),
                  e.draw(r),
                  (t = new Uint8Array(a)),
                  i.readPixels(0, 0, e.width, e.height, i.RGBA, i.UNSIGNED_BYTE, t))
                : (t = o);
              for (var l = new Uint8Array(a), h = 0, u = 0; u < e.height; u++)
                for (var c = 0; c < e.width; c++) {
                  h = 4 * (u * e.width + c);
                  var d = 4 * ((e.height - 1 - u) * e.width + c),
                    f = o[h + 0],
                    g = o[h + 1],
                    p = o[h + 2],
                    m = t[h + 0],
                    b = t[h + 1],
                    y = t[h + 2],
                    F = 0.001,
                    S = 1 - (m - f + F) / 255,
                    v = 1 - (b - g + F) / 255,
                    T = 1 - (y - p + F) / 255,
                    C = Math.max(0, Math.min(1, (S + v + T) / 3));
                  (C < 0.05 && (f + g + p) / 3 < 16 && ((f = m), (g = b), (p = y), (C = 0)),
                    (l[d + 0] = f),
                    (l[d + 1] = g),
                    (l[d + 2] = p),
                    (l[d + 3] = Math.round(255 * C)));
                }
              var x = document.createElement("canvas"),
                A = x.getContext("2d");
              ((x.width = e.width), (x.height = e.height));
              var _ = A.createImageData(e.width, e.height);
              (_.data.set(l),
                A.putImageData(_, 0, 0),
                (e.screenshotDataURL = x.toDataURL.apply(x, e.makeDataURL)),
                e.screenshotCallback && (e.screenshotCallback(), (e.screenshotCallback = null)),
                (e.clearColor = n),
                (e.bgTexture = s));
            }
            e.makeDataURL = !1;
          }
          e.draw(r);
        }
      })();
    }
    onDoubleClick(t) {
      Ti.isFullscreen() ? Ti.exitFullscreen() : Ti.requestFullscreen(this.canvas[0]);
    }
    onFullscreen(t) {
      let e = this;
      if (e.viewer.container)
        if ((!e.fullscreen && Ti.isFullscreen()) || this.addaptiveMode) {
          if (
            ((e.restoreWidth = e.width),
            (e.restoreHeight = e.height),
            (e.fullscreen = !0),
            Ti.isFullscreen())
          ) {
            var i = $(window);
            let t = window.screen.width || i.width(),
              e = window.screen.height || i.height();
            this.onResize(t, e, t / e);
          } else if (this.addaptiveMode) {
            var r = e.viewer.container;
            this.onResize(r.width(), r.height(), r.width() / r.height());
          }
        } else
          e.fullscreen &&
            !Ti.isFullscreen() &&
            ((e.fullscreen = !1), this.onResize(e.restoreWidth, e.restoreHeight, e.viewer.aspect));
    }
    onResize(t, e, i) {
      (this.resize(t, e), yi(this.projMatrix, 0.0174532925 * this.fov, i, 0.1, 5e3));
    }
    onMouseDown(t) {
      let e = this;
      (3 == t.which || t.ctrlKey ? (e.rightMouseDown = !0) : (e.mouseDown = !0),
        "touchstart" == t.type
          ? ((e.mouseX = t.originalEvent.touches[0].clientX),
            (e.mouseY = t.originalEvent.touches[0].clientY))
          : ((e.mouseX = t.clientX), (e.mouseY = t.clientY)),
        $("body").addClass("unselectable"),
        t.preventDefault());
    }
    onMouseWheel(t) {
      if (!this.options.wheelEventValidation || this.options.wheelEventValidation.call(this, t))
        return (
          (this.zoom.rateCurrent += t.originalEvent.wheelDelta > 0 ? 1 : -1),
          t.preventDefault(),
          !1
        );
    }
    onMouseUp(t) {
      let e = this;
      (e.mouseDown || e.rightMouseDown) &&
        ($("body").removeClass("unselectable"), (e.mouseDown = !1), (e.rightMouseDown = !1));
    }
    onMouseMove(t) {
      let e = this;
      if ((e.mouseDown || e.rightMouseDown) && void 0 !== e.mouseX) {
        var i, r;
        "touchmove" == t.type
          ? ((i = t.originalEvent.touches[0].clientX), (r = t.originalEvent.touches[0].clientY))
          : ((i = t.clientX), (r = t.clientY));
        var n = ((i - e.mouseX) / e.width) * Math.PI * 2,
          s = ((r - e.mouseY) / e.width) * Math.PI * 2;
        if (e.mouseDown) {
          (1 == e.up[2] ? (e.azimuth -= n) : (e.azimuth += n), (e.zenith += s));
          for (var a = 2 * Math.PI; e.azimuth < 0; ) e.azimuth += a;
          for (; e.azimuth > a; ) e.azimuth -= a;
          (e.zenith < 1e-4 && (e.zenith = 1e-4),
            e.zenith >= Math.PI && (e.zenith = Math.PI - 1e-4));
        } else ((e.translation[0] += n), (e.translation[1] += s));
        ((e.mouseX = i), (e.mouseY = r), t.stopPropagation());
      }
    }
    resize(t, e) {
      var i = this;
      if (i.width !== t || i.height !== e) {
        if (
          (i.fullscreen || i.viewer.container.css({ height: e + "px", position: "relative" }),
          (i.width = t),
          (i.height = e),
          i.canvas)
        )
          (i.canvas.attr({ width: t, height: e }),
            i.canvas.css({ width: t + "px", height: e + "px" }),
            i.context.viewport(0, 0, i.width, i.height));
        else {
          if (
            ((i.canvas = $("<canvas/>")),
            i.canvas.attr({ width: t, height: e }),
            i.viewer.container.append(i.canvas),
            (i.context =
              i.canvas[0].getContext("webgl", { alpha: !0, premultipliedAlpha: !1 }) ||
              i.canvas[0].getContext("experimental-webgl", { alpha: !0, premultipliedAlpha: !1 })),
            (i.progressBg = $("<div/>", {
              css: {
                display: "none",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "10px",
                backgroundColor: "#000",
              },
            })),
            (i.progressBar = $("<div/>", {
              css: {
                display: "none",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: "10px",
                backgroundColor: "#ccc",
              },
            })),
            i.viewer.container.append(i.progressBg),
            i.viewer.container.append(i.progressBar),
            !i.context)
          )
            return (
              alert("No WebGL support, sorry! You should totally use Chrome."),
              i.canvas.detach(),
              void (i.canvas = null)
            );
          const r = [0.35, 0.35, 0.35, 1],
            n = [1, 1, 1, 1],
            s = [0.35, 0.35, 0.35, 1],
            a = Ie(),
            o = Ie(),
            l = Ie();
          (Ye(a, [5, -3, 3]), Ye(o, [5, 5, 5]), Ye(l, [-5, -5, -5]));
          const h = {
            uCameraPos: i.eye,
            uViewMatrix: i.viewMatrix,
            uProjMatrix: i.projMatrix,
            uAmbientColor: r,
            uPrimaryColor: n,
            uSecondaryColor: s,
            uLightDir1: a,
            uLightDir2: o,
            uLightDir3: l,
          };
          ((this.gxDevice = new Tr(i.context, h)),
            (this.renderer = this.gxDevice.d()),
            i.canvas
              .off("mousedown.webgl touchstart.webgl")
              .on("mousedown.webgl touchstart.webgl", i.onMouseDown.bind(i))
              .off("wheel.webgl")
              .on("wheel.webgl", i.onMouseWheel.bind(i))
              .off("dblclick.webgl")
              .on("dblclick.webgl", i.onDoubleClick.bind(i))
              .off("contextmenu.webgl")
              .on("contextmenu.webgl", i.onContextMenu.bind(i)));
          let u = 0,
            c = 0,
            d = 0;
          (i.canvas.off("touchend.webgl").on("touchend.webgl", function (t) {
            const e = t.originalEvent;
            if (!e || 1 !== e.changedTouches.length) return;
            const r = e.changedTouches[0],
              n = new Date().getTime(),
              s = n - u,
              a = r.clientX - c,
              o = r.clientY - d,
              l = Math.sqrt(a * a + o * o);
            ((u = n),
              (c = r.clientX),
              (d = r.clientY),
              s < 300 && l < 30 && (t.preventDefault(), i.onDoubleClick.call(i, e)));
          }),
            $(window).off("resize.webgl").on("resize.webgl", i.onFullscreen.bind(i)),
            $(document)
              .off("mouseup.webgl touchend.webgl")
              .on("mouseup.webgl touchend.webgl", i.onMouseUp.bind(i))
              .off("mousemove.webgl touchmove.webgl")
              .on("mousemove.webgl touchmove.webgl", i.onMouseMove.bind(i)),
            i.onFullscreen(null));
        }
        i.options.background && i.loadBackground();
      }
    }
    loadBackground() {
      var t = this,
        e = t.context;
      const i = function () {
          ((t.vb = e.createBuffer()),
            e.bindBuffer(e.ARRAY_BUFFER, t.vb),
            e.bufferData(e.ARRAY_BUFFER, new Float32Array(16), e.DYNAMIC_DRAW));
          var i,
            r = t.compileShader(
              e.VERTEX_SHADER,
              "    attribute vec2 aPosition;    attribute vec2 aTexCoord;        varying vec2 vTexCoord;        void main(void) {        vTexCoord = aTexCoord;        gl_Position = vec4(aPosition, 0, 1);    }    ",
            );
          i = t.options.backgroundRotatation
            ? t.compileShader(
                e.FRAGMENT_SHADER,
                "\tprecision mediump float;    varying vec2 vTexCoord;    uniform sampler2D uTexture;    uniform vec2 uResolution;    uniform vec4 uBGTransform;    uniform float uRotation;    mat3 getTransform(vec2 pos, vec2 scale, float rotation, vec2 center) {        float c = cos(rotation);        float s = sin(rotation);        return mat3(            scale.x * c, scale.x * s, - scale.x * ( c * center.x + s * center.y ) + center.x + pos.x,            -scale.y * s, scale.y * c, - scale.y * ( - s * center.x + c * center.y ) + center.y + pos.y,            0.0, 0.0, 1.0        );    }    void main(void) {        vec2 uv = gl_FragCoord.xy / uResolution.xy;        mat3 transform = getTransform(uBGTransform.xy, uBGTransform.zw, uRotation, vec2(0.5));        uv = (vec3(uv, 1.0) * transform).xy;        gl_FragColor = texture2D(uTexture, uv);\t}",
              )
            : t.compileShader(
                e.FRAGMENT_SHADER,
                "    precision mediump float;    varying vec2 vTexCoord;        uniform sampler2D uTexture;    uniform vec4 uBGTransform;        void main(void) {        gl_FragColor = texture2D(uTexture, vTexCoord.xy * uBGTransform.zw + uBGTransform.xy);    }    ",
              );
          var n = e.createProgram();
          (e.attachShader(n, r),
            e.attachShader(n, i),
            e.linkProgram(n),
            e.getProgramParameter(n, e.LINK_STATUS)
              ? ((t.vs = r),
                (t.fs = i),
                (t.program = n),
                (t.uTexture = e.getUniformLocation(n, "uTexture")),
                (t.aPosition = e.getAttribLocation(n, "aPosition")),
                (t.aTexCoord = e.getAttribLocation(n, "aTexCoord")),
                (t.uBGTransform = e.getUniformLocation(n, "uBGTransform")),
                (t.uRotation = e.getUniformLocation(n, "uRotation")),
                (t.uResolution = e.getUniformLocation(n, "uResolution")))
              : console.error("Error linking shaders"));
        },
        r = function () {
          var i = t.width / t.bgImg.width,
            r = t.height / t.bgImg.height;
          const n = [-1, -1, 0, r, 1, -1, i, r, -1, 1, 0, 0, 1, 1, i, 0];
          (e.bindBuffer(e.ARRAY_BUFFER, t.vb),
            e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(n)));
        };
      t.bgImg
        ? t.bgImg.loaded && (t.vb || i(), r())
        : ((t.bgImg = new Image()),
          (t.bgImg.crossOrigin = ""),
          (t.bgImg.onload = function () {
            var n;
            (null === (n = t.bgImg) || void 0 === n || (n.loaded = !0),
              t.bgImg &&
                ((t.bgTexture = e.createTexture()),
                e.bindTexture(e.TEXTURE_2D, t.bgTexture),
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.bgImg),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                t.vb || i(),
                r(),
                (t.bgImgLoaded = !0)));
          }),
          (t.bgImg.onerror = function () {
            t.bgImg = null;
          }),
          (t.bgImg.src = t.options.contentPath + t.options.background),
          (t.viewer.options.bgPosition = t.options.bgPosition || [0, 0]),
          (t.viewer.options.bgScale = t.options.bgScale || [1, 1]));
    }
    compileShader(t, e) {
      var i = this.context,
        r = i.createShader(t);
      if ((i.shaderSource(r, e), i.compileShader(r), !i.getShaderParameter(r, i.COMPILE_STATUS)))
        throw "Shader compile error: " + i.getShaderInfoLog(r);
      return r;
    }
    getTexture(t) {
      if (this.textureCache.has(t)) {
        var e = this.textureCache.get(t);
        if (e.e || e.d) return e;
      }
      const i = new Cr(this, t);
      return (this.textureCache.set(t, i), i);
    }
  };
  let ka = { Types: wr };
  const Ba = Object.assign(Ti, { Tools: Be, WebGL: Ma, WEBGL: 1, WOW: 2, FLASH: 2, Wow: ka });
  window.ZamModelViewer = Ba;
})();
