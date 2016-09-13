/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-audio-batteryapi-canvas-cssanimations-geolocation-indexeddb-json-video-setclasses !*/
!function(e,n,t){function a(e,n){return typeof e===n}function o(){var e,n,t,o,r,i,s;for(var l in T)if(T.hasOwnProperty(l)){if(e=[],n=T[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=a(n.fn,"function")?n.fn():n.fn,r=0;r<e.length;r++)i=e[r],s=i.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),h.push((o?"":"no-")+s.join("-"))}}function r(e){var n=w.className,t=Modernizr._config.classPrefix||"";if(x&&(n=n.baseVal),Modernizr._config.enableJSClass){var a=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(a,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),x?w.className.baseVal=n:w.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):x?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function l(e,n){return!!~(""+e).indexOf(n)}function c(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var o;for(var r in e)if(e[r]in n)return t===!1?e[r]:(o=n[e[r]],a(o,"function")?c(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(){var e=n.body;return e||(e=i(x?"svg":"body"),e.fake=!0),e}function f(e,t,a,o){var r,s,l,c,d="modernizr",p=i("div"),f=u();if(parseInt(a,10))for(;a--;)l=i("div"),l.id=o?o[a]:d+(a+1),p.appendChild(l);return r=i("style"),r.type="text/css",r.id="s"+d,(f.fake?f:p).appendChild(r),f.appendChild(p),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(n.createTextNode(e)),p.id=d,f.fake&&(f.style.background="",f.style.overflow="hidden",c=w.style.overflow,w.style.overflow="hidden",w.appendChild(f)),s=t(p,e),f.fake?(f.parentNode.removeChild(f),w.style.overflow=c,w.offsetHeight):p.parentNode.removeChild(p),!!s}function y(n,a){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),a))return!0;return!1}if("CSSSupportsRule"in e){for(var r=[];o--;)r.push("("+p(n[o])+":"+a+")");return r=r.join(" or "),f("@supports ("+r+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,r){function c(){p&&(delete N.style,delete N.modElem)}if(r=a(r,"undefined")?!1:r,!a(o,"undefined")){var d=y(e,o);if(!a(d,"undefined"))return d}for(var p,u,f,v,m,g=["modernizr","tspan","samp"];!N.style&&g.length;)p=!0,N.modElem=i(g.shift()),N.style=N.modElem.style;for(f=e.length,u=0;f>u;u++)if(v=e[u],m=N.style[v],l(v,"-")&&(v=s(v)),N.style[v]!==t){if(r||a(o,"undefined"))return c(),"pfx"==n?v:!0;try{N.style[v]=o}catch(h){}if(N.style[v]!=m)return c(),"pfx"==n?v:!0}return c(),!1}function m(e,n,t,o,r){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+P.join(i+" ")+i).split(" ");return a(n,"string")||a(n,"undefined")?v(s,n,o,r):(s=(e+" "+_.join(i+" ")+i).split(" "),d(s,n,t))}function g(e,n,a){return m(e,t,t,n,a)}var h=[],T=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){T.push({name:e,fn:n,options:t})},addAsyncTest:function(e){T.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr,Modernizr.addTest("applicationcache","applicationCache"in e),Modernizr.addTest("geolocation","geolocation"in navigator),Modernizr.addTest("json","JSON"in e&&"parse"in JSON&&"stringify"in JSON);var w=n.documentElement,x="svg"===w.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=i("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),n.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(t){}return n}),Modernizr.addTest("canvas",function(){var e=i("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("video",function(){var e=i("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),n.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),n.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(t){}return n});var b="Moz O ms Webkit",P=C._config.usePrefixes?b.split(" "):[];C._cssomPrefixes=P;var S=function(n){var a,o=prefixes.length,r=e.CSSRule;if("undefined"==typeof r)return t;if(!n)return!1;if(n=n.replace(/^@/,""),a=n.replace(/-/g,"_").toUpperCase()+"_RULE",a in r)return"@"+n;for(var i=0;o>i;i++){var s=prefixes[i],l=s.toUpperCase()+"_"+a;if(l in r)return"@-"+s.toLowerCase()+"-"+n}return!1};C.atRule=S;var _=C._config.usePrefixes?b.toLowerCase().split(" "):[];C._domPrefixes=_;var E={elem:i("modernizr")};Modernizr._q.push(function(){delete E.elem});var N={style:E.elem.style};Modernizr._q.unshift(function(){delete N.style}),C.testAllProps=m;var $=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?S(e):(-1!=e.indexOf("-")&&(e=s(e)),n?m(e,n,t):m(e,"pfx"))};Modernizr.addTest("batteryapi",!!$("battery",navigator),{aliases:["battery-api"]});var z;try{z=$("indexedDB",e)}catch(O){}Modernizr.addTest("indexeddb",!!z),z&&Modernizr.addTest("indexeddb.deletedatabase","deleteDatabase"in z),C.testAllProps=g,Modernizr.addTest("cssanimations",g("animationName","a",!0)),o(),r(h),delete C.addTest,delete C.addAsyncTest;for(var j=0;j<Modernizr._q.length;j++)Modernizr._q[j]();e.Modernizr=Modernizr}(window,document);