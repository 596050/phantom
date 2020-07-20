function v(h){var e=0;return function(){return e<h.length?{done:!1,value:h[e++]}:{done:!0}}}function y(h){var e="undefined"!=typeof Symbol&&Symbol.iterator&&h[Symbol.iterator];return e?e.call(h):{next:v(h)}}function A(h){h=["object"==typeof globalThis&&globalThis,h,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var e=0;e<h.length;++e){var m=h[e];if(m&&m.Math==Math)return m}throw Error("Cannot find global object");}
var B=A(this),D="function"==typeof Object.defineProperties?Object.defineProperty:function(h,e,m){if(h==Array.prototype||h==Object.prototype)return h;h[e]=m.value;return h};function E(h,e){if(e)a:{var m=B;h=h.split(".");for(var q=0;q<h.length-1;q++){var w=h[q];if(!(w in m))break a;m=m[w]}h=h[h.length-1];q=m[h];e=e(q);e!=q&&null!=e&&D(m,h,{configurable:!0,writable:!0,value:e})}}
E("Promise",function(h){function e(c){this.b=0;this.h=void 0;this.a=[];var d=this.f();try{c(d.resolve,d.reject)}catch(f){d.reject(f)}}function m(){this.a=null}function q(c){return c instanceof e?c:new e(function(d){d(c)})}if(h)return h;m.prototype.b=function(c){if(null==this.a){this.a=[];var d=this;this.f(function(){d.h()})}this.a.push(c)};var w=B.setTimeout;m.prototype.f=function(c){w(c,0)};m.prototype.h=function(){for(;this.a&&this.a.length;){var c=this.a;this.a=[];for(var d=0;d<c.length;++d){var f=
c[d];c[d]=null;try{f()}catch(k){this.g(k)}}}this.a=null};m.prototype.g=function(c){this.f(function(){throw c;})};e.prototype.f=function(){function c(k){return function(g){f||(f=!0,k.call(d,g))}}var d=this,f=!1;return{resolve:c(this.s),reject:c(this.g)}};e.prototype.s=function(c){if(c===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(c instanceof e)this.u(c);else{a:switch(typeof c){case "object":var d=null!=c;break a;case "function":d=!0;break a;default:d=!1}d?this.o(c):this.j(c)}};
e.prototype.o=function(c){var d=void 0;try{d=c.then}catch(f){this.g(f);return}"function"==typeof d?this.v(d,c):this.j(c)};e.prototype.g=function(c){this.l(2,c)};e.prototype.j=function(c){this.l(1,c)};e.prototype.l=function(c,d){if(0!=this.b)throw Error("Cannot settle("+c+", "+d+"): Promise already settled in state"+this.b);this.b=c;this.h=d;this.m()};e.prototype.m=function(){if(null!=this.a){for(var c=0;c<this.a.length;++c)l.b(this.a[c]);this.a=null}};var l=new m;e.prototype.u=function(c){var d=this.f();
c.i(d.resolve,d.reject)};e.prototype.v=function(c,d){var f=this.f();try{c.call(d,f.resolve,f.reject)}catch(k){f.reject(k)}};e.prototype.then=function(c,d){function f(t,r){return"function"==typeof t?function(u){try{k(t(u))}catch(z){g(z)}}:r}var k,g,n=new e(function(t,r){k=t;g=r});this.i(f(c,k),f(d,g));return n};e.prototype.catch=function(c){return this.then(void 0,c)};e.prototype.i=function(c,d){function f(){switch(k.b){case 1:c(k.h);break;case 2:d(k.h);break;default:throw Error("Unexpected state: "+
k.b);}}var k=this;null==this.a?l.b(f):this.a.push(f)};e.resolve=q;e.reject=function(c){return new e(function(d,f){f(c)})};e.race=function(c){return new e(function(d,f){for(var k=y(c),g=k.next();!g.done;g=k.next())q(g.value).i(d,f)})};e.all=function(c){var d=y(c),f=d.next();return f.done?q([]):new e(function(k,g){function n(u){return function(z){t[u]=z;r--;0==r&&k(t)}}var t=[],r=0;do t.push(void 0),r++,q(f.value).i(n(t.length-1),g),f=d.next();while(!f.done)})};return e});
var F,G=0,H=document.getElementById("bookmarks-list"),I=document.getElementById("bookmarks-form"),J=document.getElementById("bookmarkURL"),K=document.getElementById("bookmarkName"),L=document.getElementById("update-bookmarkURL"),M=document.getElementById("update-bookmarkName"),N=document.getElementById("update-bookmarks-form"),O;function P(h){return(new RegExp(/[https?://(www.)?][-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)).test(h)?!0:!1}
window.addEventListener("load",function(){function h(l,c){return new Promise(function(d){var f=[],k=!1;F.transaction(["bookmarks"],"readonly").objectStore("bookmarks").openCursor().onsuccess=function(g){g=g.target.result;!k&&0<l?(k=!0,g.advance(l)):g?(f.push(g.value),f.length<c?g.continue():d(f)):d(f)}})}function e(l){l=void 0===l?20:l;H.innerHTML="";document.getElementById("page-numbers").innerHTML="";var c=F.transaction("bookmarks").objectStore("bookmarks");h(G,20).then(function(k){k.forEach(function(g){if(g){var n=
document.createElement("li");n.className="list-item list-item-interact";var t=g.bookmarkURL;n.onclick=function(){console.log("href",t);window.open(t,"_blank")};var r=document.createElement("a");r.className="list-item-bookmarkName";r.innerText=g.bookmarkName;r.href=g.bookmarkURL;r.target="_blank";window.onclick=function(p){if(!p.target.matches(".dropdown-content"+g.id)){p=document.getElementsByClassName("dropdown-content");var x;for(x=0;x<p.length;x++){var C=p[x];C.classList.contains("show")&&C.classList.remove("show")}}};
var u=(new DOMParser).parseFromString('\n<div class="list-item-option dropdown" style="position: absolute; right: 10px; display: flex; align-items: center;">\n<svg class="dropbtn" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style="fill: black; border-radius: 6px; stroke: white; stroke-width: 1px;">\n<path\n  class="options-background"\n  d="M0 9.6C0 6.23968 0 4.55953 0.653961 3.27606C1.2292 2.14708 2.14708 1.2292 3.27606 0.653961C4.55953 0 6.23969 0 9.6 0H38.4C41.7603 0 43.4405 0 44.7239 0.653961C45.8529 1.2292 46.7708 2.14708 47.346 3.27606C48 4.55953 48 6.23969 48 9.6V38.4C48 41.7603 48 43.4405 47.346 44.7239C46.7708 45.8529 45.8529 46.7708 44.7239 47.346C43.4405 48 41.7603 48 38.4 48H9.6C6.23968 48 4.55953 48 3.27606 47.346C2.14708 46.7708 1.2292 45.8529 0.653961 44.7239C0 43.4405 0 41.7603 0 38.4V9.6Z"\n  fill="black"/>\n<path\n  class="options-dot"\n  d="M16 26C17.1046 26 18 25.1046 18 24C18 22.8954 17.1046 22 16 22C14.8954 22 14 22.8954 14 24C14 25.1046 14.8954 26 16 26Z"\n  fill="white"\n/>\n<path\n  class="options-dot"\n  d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z"\n  fill="white"\n/>\n<path\n  class="options-dot"\n  d="M34 24C34 25.1046 33.1046 26 32 26C30.8954 26 30 25.1046 30 24C30 22.8954 30.8954 22 32 22C33.1046 22 34 22.8954 34 24Z"\n  fill="white"\n/></svg>\n<div id="myDropdown" class="dropdown-content dropdown-content'+
g.id+'">\n  <div class="update-list-item-button" id="update-list-item-button">Edit</div>\n  <div class="delete-list-item-button" id="delete-list-item-button">Delete</div>\n</div>\n</div>',"text/html").body.firstElementChild.firstChild.parentElement,z=u.getElementsByClassName("dropdown-content"+g.id)[0];u.getElementsByClassName("dropbtn")[0].onclick=function(p){if(!p.target.matches(".dropdown-content"+g.id)){p=document.getElementsByClassName("dropdown-content");var x;for(x=0;x<p.length;x++){var C=
p[x];C.classList.contains("show")&&!C.classList.contains("dropdown-content"+g.id)&&C.classList.remove("show")}}z.classList.toggle("show")};u.onmouseover=function(){n.classList.remove("list-item-interact")};u.onmouseout=function(){n.className="list-item list-item-interact"};u.onclick=function(p){p.preventDefault();p.stopPropagation()};u.getElementsByClassName("update-list-item-button")[0].onclick=function(){z.classList.remove("show");document.getElementById("update-bookmarkURL").textContent=g.bookmarkURL;
document.getElementById("update-bookmarkName").value=g.bookmarkName;O=function(p){return m(p,g)};N.addEventListener("submit",O,!1);document.getElementById("update-boomark-modal").style.display="block";document.getElementById("bookmarks-body").style.overflow="hidden"};var R=g.id;u.getElementsByClassName("delete-list-item-button")[0].onclick=function(){q(R,n);e()};n.appendChild(r);n.appendChild(u);H.appendChild(n)}else console.log("Entries all displayed.")})});var d=document.getElementById("page-numbers"),
f=c.count();f.onsuccess=function(){for(var k={c:0};k.c<f.result/l;k={c:k.c},k.c++){var g=document.createElement("li");g.textContent=k.c+1;g.className="page-number";d.appendChild(g);g.onclick=function(n){return function(){G=20*n.c;e()}}(k)}}}function m(l,c){l.preventDefault();l=L.value.trim();var d=M.value.trim();if(""==l||""==d||null==l||null==d||void 0==l||void 0==d)console.log("Data not submitted \u2014 form incomplete.");else{c.bookmarkURL=l;c.bookmarkName=d;var f=F.transaction(["bookmarks"],"readwrite");
f.oncomplete=function(){console.log("Transaction completed: database modification finished.");e()};f.onerror=function(){console.log("Transaction not opened due to error: "+f.error)};f.objectStore("bookmarks").put(c).onsuccess=function(){J.value="";K.value=""};N.removeEventListener("submit",O);document.getElementById("update-boomark-modal").style.display="none";document.getElementById("bookmarks-body").style.overflow="auto"}}function q(l,c){var d=F.transaction(["bookmarks"],"readwrite");d.objectStore("bookmarks").delete(l);
d.oncomplete=function(){c&&c.remove()}}window.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.b;window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.a;var w=window.indexedDB.open("bookmarks",5);w.onerror=function(){console.log("Error loading database.")};w.onsuccess=function(){F=w.result;e()};w.onupgradeneeded=function(l){l=l.target.result;l.onerror=function(){console.log("Error loading database.")};
l=l.createObjectStore("bookmarks",{keyPath:"id",autoIncrement:!0});l.createIndex("bookmarkName","text",{unique:!1});l.createIndex("bookmarkURL","text",{unique:!1})};I.addEventListener("submit",function(l){l.preventDefault();l=J.value.trim();var c=K.value.trim();if(""!=l&&""!=c&&null!=l&&null!=c&&void 0!=l&&void 0!=c&&P(l)){var d={},f=(d.bookmarkURL=l,d.bookmarkName=c,d),k=F.transaction(["bookmarks"],"readwrite");k.oncomplete=function(){e()};k.onerror=function(){console.log("Transaction not opened due to error: "+
k.error)};k.objectStore("bookmarks").add(f).onsuccess=function(){J.value="";K.value="";document.getElementById("overview-page").style.display="none";document.getElementById("results-page").style.display="initial";document.getElementById("nav-title").textContent="Results";document.getElementById("submission").textContent=f.bookmarkURL;document.getElementById("to-overview-page").onclick=function(){document.getElementById("overview-page").style.display="initial";document.getElementById("results-page").style.display=
"none";document.getElementById("nav-title").textContent="Overview"}}}else console.log("Data not submitted \u2014 form incomplete.")},!1)});var Q=document.getElementById("update-boomark-modal");document.getElementsByClassName("close")[0].onclick=function(){Q.style.display="none";document.getElementById("bookmarks-body").style.overflow="auto";N.removeEventListener("submit",O)};window.onclick=function(h){h.target==Q&&(Q.style.display="none",document.getElementById("bookmarks-body").style.overflow="auto",N.removeEventListener("submit",O))};K.addEventListener("input",function(){K.setCustomValidity("");""===K.value&&K.setCustomValidity("Please provide a valid name")});J.addEventListener("input",function(){console.log(!P((J.value||"").replace(window.location.href,"")),(J.value||"").replace(window.location.href,""));""!==J.value&&P((J.value||"").replace(window.location.href,""))?J.setCustomValidity(""):J.setCustomValidity("Please provide a valid URL")});M.addEventListener("input",function(){M.setCustomValidity("");""===M.value&&M.setCustomValidity("Please provide a valid name")});
L.addEventListener("input",function(){""!==L.value&&P(L.value)?L.setCustomValidity(""):L.setCustomValidity("Please provide a valid URL")});
