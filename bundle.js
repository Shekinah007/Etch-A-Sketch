(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! dom-to-image-more 12-05-2022 */

!function(e){"use strict";var s={escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:t,mimeType:function(e){e=t(e).toLowerCase();return function(){var e="application/font-woff",t="image/jpeg";return{woff:e,woff2:e,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:t,jpeg:t,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}()[e]||""},dataAsUrl:function(e,t){return"data:"+t+";base64,"+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(t){return t.toBlob?new Promise(function(e){t.toBlob(e)}):function(i){return new Promise(function(e){for(var t=g(i.toDataURL().split(",")[1]),n=t.length,r=new Uint8Array(n),o=0;o<n;o++)r[o]=t.charCodeAt(o);e(new Blob([r],{type:"image/png"}))})}(t)},resolveUrl:function(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href},getAndEncode:function(a){d.impl.options.cacheBust&&(a+=(/\?/.test(a)?"&":"?")+(new Date).getTime());return new Promise(function(n){var e,t,r=d.impl.options.httpTimeout,o=new XMLHttpRequest;function i(e){console.error(e),n("")}o.onreadystatechange=function(){var t;4===o.readyState&&(200===o.status?((t=new FileReader).onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)):e?n(e):i("cannot fetch resource: "+a+", status: "+o.status))},o.ontimeout=function(){e?n(e):i("timeout of "+r+"ms occured while fetching resource: "+a)},o.responseType="blob",o.timeout=r,d.impl.options.useCredentials&&(o.withCredentials=!0),o.open("GET",a,!0),o.send(),!d.impl.options.imagePlaceholder||(t=d.impl.options.imagePlaceholder.split(/,/))&&t[1]&&(e=t[1])})},uid:function(){var e=0;return function(){return"u"+("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)+e++}}(),delay:function(n){return function(t){return new Promise(function(e){setTimeout(function(){e(t)},n)})}},asArray:function(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t},escapeXhtml:function(e){return e.replace(/%/g,"%25").replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(r){return"data:,"===r?Promise.resolve():new Promise(function(e,t){var n=new Image;d.impl.options.useCredentials&&(n.crossOrigin="use-credentials"),n.onload=function(){e(n)},n.onerror=t,n.src=r})},width:function(e){var t=r(e,"border-left-width"),n=r(e,"border-right-width");return e.scrollWidth+t+n},height:function(e){var t=r(e,"border-top-width"),n=r(e,"border-bottom-width");return e.scrollHeight+t+n}};function t(e){e=/\.([^\.\/]*?)(\?|$)/g.exec(e);return e?e[1]:""}function r(e,t){t=p(e).getPropertyValue(t);return parseFloat(t.replace("px",""))}var o,i={inlineAll:function(t,r,o){return n(t)?Promise.resolve(t).then(a).then(function(e){var n=Promise.resolve(t);return e.forEach(function(t){n=n.then(function(e){return u(e,t,r,o)})}),n}):Promise.resolve(t)},shouldProcess:n,impl:{readUrls:a,inline:u}};function n(e){return-1!==e.search(o)}function a(e){for(var t,n=[];null!==(t=o.exec(e));)n.push(t[1]);return n.filter(function(e){return!s.isDataUrl(e)})}function u(t,n,r,e){return Promise.resolve(n).then(function(e){return r?s.resolveUrl(e,r):e}).then(e||s.getAndEncode).then(function(e){return s.dataAsUrl(e,s.mimeType(n))}).then(function(e){return t.replace(new RegExp("(url\\(['\"]?)("+s.escape(n)+")(['\"]?\\))","g"),"$1"+e+"$3")})}var c={resolveAll:function(){return l().then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})},impl:{readAll:l}};function l(){return Promise.resolve(s.asArray(document.styleSheets)).then(function(e){var n=[];return e.forEach(function(t){if(Object.getPrototypeOf(t).hasOwnProperty("cssRules"))try{s.asArray(t.cssRules||[]).forEach(n.push.bind(n))}catch(e){console.log("Error while reading CSS rules from "+t.href,e.toString())}}),n}).then(function(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return i.shouldProcess(e.style.getPropertyValue("src"))})}).then(function(e){return e.map(t)});function t(t){return{resolve:function(){var e=(t.parentStyleSheet||{}).href;return i.inlineAll(t.cssText,e)},src:function(){return t.style.getPropertyValue("src")}}}}var f={inlineAll:function t(e){if(!(e instanceof Element))return Promise.resolve(e);return n(e).then(function(){return e instanceof HTMLImageElement?h(e).inline():Promise.all(s.asArray(e.childNodes).map(function(e){return t(e)}))});function n(t){var n=t.style.getPropertyValue("background");return n?i.inlineAll(n).then(function(e){t.style.setProperty("background",e,n)}).then(function(){return t}):Promise.resolve(t)}},impl:{newImage:h}};function h(n){return{inline:function(e){return s.isDataUrl(n.src)?Promise.resolve():Promise.resolve(n.src).then(e||s.getAndEncode).then(function(e){return s.dataAsUrl(e,s.mimeType(n.src))}).then(function(t){return new Promise(function(e){n.onload=e,n.onerror=e,n.src=t})})}}}var m={imagePlaceholder:void 0,cacheBust:!(o=/url\(['"]?([^'"]+?)['"]?\)/g),useCredentials:!1,httpTimeout:3e4},d={toSvg:y,toPng:function(e,t){return(t=t||{}).raster=!0,v(e,t).then(function(e){return e.toDataURL()})},toJpeg:function(e,t){return(t=t||{}).raster=!0,v(e,t).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})},toBlob:function(e,t){return(t=t||{}).raster=!0,v(e,t).then(s.canvasToBlob)},toPixelData:function(t,e){return(e=e||{}).raster=!0,v(t,e).then(function(e){return e.getContext("2d").getImageData(0,0,s.width(t),s.height(t)).data})},toCanvas:function(e,t){return(t=t||{}).raster=!0,v(e,t||{})},impl:{fontFaces:c,images:f,util:s,inliner:i,options:{}}};"object"==typeof exports&&"object"==typeof module?module.exports=d:e.domtoimage=d;const p=e.getComputedStyle||window.getComputedStyle,g=e.atob||window.atob;function y(r,o){return function(e){void 0===e.imagePlaceholder?d.impl.options.imagePlaceholder=m.imagePlaceholder:d.impl.options.imagePlaceholder=e.imagePlaceholder;void 0===e.cacheBust?d.impl.options.cacheBust=m.cacheBust:d.impl.options.cacheBust=e.cacheBust;void 0===e.useCredentials?d.impl.options.useCredentials=m.useCredentials:d.impl.options.useCredentials=e.useCredentials}(o=o||{}),Promise.resolve(r).then(function(e){return function i(t,a,c,u,l=null){if(!c&&a&&!a(t))return Promise.resolve();return Promise.resolve(t).then(e).then(function(e){return n(t,e)}).then(function(e){return r(t,e,u)});function e(e){return e instanceof HTMLCanvasElement?s.makeImage(e.toDataURL()):"IFRAME"===e.nodeName?html2canvas(e.contentDocument.body).then(e=>e.toDataURL()).then(s.makeImage):e.cloneNode(!1)}function n(o,e){var t=o.childNodes;return 0===t.length?Promise.resolve(e):n(e,s.asArray(t)).then(function(){return e});function n(t,e){var n=p(o),r=Promise.resolve();return e.forEach(function(e){r=r.then(function(){return i(e,a,!1,u,n)}).then(function(e){e&&t.appendChild(e)})}),r}}function r(n,u,o){return u instanceof Element?Promise.resolve().then(e).then(t).then(r).then(i).then(function(){return u}):u;function e(){function r(e,t){t.font=e.font,t.fontFamily=e.fontFamily,t.fontFeatureSettings=e.fontFeatureSettings,t.fontKerning=e.fontKerning,t.fontSize=e.fontSize,t.fontStretch=e.fontStretch,t.fontStyle=e.fontStyle,t.fontVariant=e.fontVariant,t.fontVariantCaps=e.fontVariantCaps,t.fontVariantEastAsian=e.fontVariantEastAsian,t.fontVariantLigatures=e.fontVariantLigatures,t.fontVariantNumeric=e.fontVariantNumeric,t.fontVariationSettings=e.fontVariationSettings,t.fontWeight=e.fontWeight}function e(e,t){var n=p(e);n.cssText?(t.style.cssText=n.cssText,r(n,t.style)):(o?b(e,n,t,c):E(n,l,t),c&&(["inset-block","inset-block-start","inset-block-end"].forEach(e=>t.style.removeProperty(e)),["left","right","top","bottom"].forEach(e=>{t.style.getPropertyValue(e)&&t.style.setProperty(e,"0px")})))}e(n,u)}function t(){function t(o){var i,a=p(n,o),e=a.getPropertyValue("content");function t(){var e="."+i+":"+o,t=(a.cssText?n:r)();return document.createTextNode(e+"{"+t+"}");function n(){return a.cssText+" content: "+a.getPropertyValue("content")+";"}function r(){return s.asArray(a).map(e).join("; ")+";";function e(e){return e+": "+a.getPropertyValue(e)+(a.getPropertyPriority(e)?" !important":"")}}}""!==e&&"none"!==e&&(i=s.uid(),(e=u.getAttribute("class"))&&u.setAttribute("class",e+" "+i),(e=document.createElement("style")).appendChild(t()),u.appendChild(e))}[":before",":after"].forEach(function(e){t(e)})}function r(){n instanceof HTMLTextAreaElement&&(u.innerHTML=n.value),n instanceof HTMLInputElement&&u.setAttribute("value",n.value)}function i(){u instanceof SVGElement&&(u.setAttribute("xmlns","http://www.w3.org/2000/svg"),u instanceof SVGRectElement&&["width","height"].forEach(function(e){var t=u.getAttribute(e);t&&u.style.setProperty(e,t)}))}}}(e,o.filter,!0,!o.raster)}).then(P).then(w).then(function(t){o.bgcolor&&(t.style.backgroundColor=o.bgcolor);o.width&&(t.style.width=o.width+"px");o.height&&(t.style.height=o.height+"px");o.style&&Object.keys(o.style).forEach(function(e){t.style[e]=o.style[e]});var e=null;"function"==typeof o.onclone&&(e=o.onclone(t));return Promise.resolve(e).then(function(){return t})}).then(function(e){return e=e,t=o.width||s.width(r),n=o.height||s.height(r),Promise.resolve(e).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(s.escapeXhtml).then(function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"}).then(function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+n+'">'+e+"</svg>"}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e});var t,n})}function v(o,i){return y(o,i).then(s.makeImage).then(s.delay(0)).then(function(e){var t="number"!=typeof i.scale?1:i.scale,n=function(e,t){var n=document.createElement("canvas");n.width=(i.width||s.width(e))*t,n.height=(i.height||s.height(e))*t,i.bgcolor&&((t=n.getContext("2d")).fillStyle=i.bgcolor,t.fillRect(0,0,n.width,n.height));return n}(o,t),r=n.getContext("2d");return r.mozImageSmoothingEnabled=!1,r.msImageSmoothingEnabled=!1,r.imageSmoothingEnabled=!1,e&&(r.scale(t,t),r.drawImage(e,0,0)),A&&(document.body.removeChild(A),A=null,C&&clearTimeout(C),C=setTimeout(()=>{C=null,x={}},2e4)),n})}function P(n){return c.resolveAll().then(function(e){var t=document.createElement("style");return n.appendChild(t),t.appendChild(document.createTextNode(e)),n})}function w(e){return f.inlineAll(e).then(function(){return e})}function b(e,t,n,r){var o,i=n.style,a=e.style;for(o of t){var u=t.getPropertyValue(o),c=a.getPropertyValue(o);a.setProperty(o,r?"initial":"unset"),t.getPropertyValue(o)!==u?i.setProperty(o,u):i.removeProperty(o),a.setProperty(o,c)}}function E(n,r,e){var o=function(e){if(x[e])return x[e];A||((A=document.createElement("iframe")).style.visibility="hidden",A.style.position="fixed",document.body.appendChild(A),A.contentWindow.document.write('<!DOCTYPE html><meta charset="UTF-8"><title>sandbox</title><body>'));var t=document.createElement(e);A.contentWindow.document.body.appendChild(t),t.textContent=".";var n=A.contentWindow.getComputedStyle(t),r={};return s.asArray(n).forEach(function(e){r[e]="width"===e||"height"===e?"auto":n.getPropertyValue(e)}),A.contentWindow.document.body.removeChild(t),x[e]=r}(e.tagName),i=e.style;s.asArray(n).forEach(function(e){var t=n.getPropertyValue(e);(t!==o[e]||r&&t!==r.getPropertyValue(e))&&i.setProperty(e,t,n.getPropertyPriority(e))})}var C=null,A=null,x={}}(this);
},{}],2:[function(require,module,exports){
// console.clear();
let domtoimage = require("dom-to-image-more");

let mouseDown = false;
let cellArray = [];
const stepValues = [5, 10, 20];
let eraser = false;
let cellHeight = 10;
let numberOfCells = 4000;
let showGrid = true;
let penActive = false;

const eraserTool = document.querySelector("#eraser");
const canvas = document.getElementById("canvas");
const canvasColor = document.getElementById("canvasColor");
const brushColor = document.getElementById("brushColor");
const rangeInput = document.getElementById("resolution");
const rangeCounter = document.querySelectorAll(".rangeCounter");
const gridButton = document.getElementById("gridToggle");
const penIndicator = document.getElementById("penImg");
const infoPanel = document.querySelector(".info-panel");
const infoBtn = document.querySelector(".info-btn");
const overlay = document.querySelector(".overlay");
const resetBtb = document.querySelector("#reset");
const saveBtn = document.querySelector("#saveBtn");
const body = document.querySelector("body");
const main = document.querySelector("main");

saveBtn.addEventListener("click", () => {
  domtoimage
    .toPng(canvas)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;

      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = "Etch-A-Sketch";
      anchor.click();

      // document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
});

resetBtb.addEventListener("click", () => {
  canvas.innerHTML = "";
  createDiv();
});
infoBtn.addEventListener("click", () => {
  infoPanel.classList.toggle("info-panel-visible");
  overlay.classList.toggle("overlay-visible");
  // infoBtn.classList.toggle("info-btn-active");
});
gridButton.addEventListener("click", () => {
  // showGrid = !showGrid;
  cellArray.forEach((cell) => {
    cell.classList.toggle("borderChange");
  });
});

rangeCounter.forEach((counter) => {
  counter.addEventListener("click", (event) => {
    if (event.target.id === "increment") {
      console.log(rangeInput.value);
      rangeInput.value = rangeInput.value + 1;
      console.log(rangeInput.value);
    } else if (event.target.id === "decrement") {
      rangeInput.value = rangeInput.value - 5;
      console.log(rangeInput.value);
    }
    calculateResolution(rangeInput.value);
    canvas.innerHTML = "";
    createDiv();
  });
});

canvasColor.oninput = () => {
  console.log(canvasColor);
  canvas.style.backgroundColor = canvasColor.value;
};

function calculateResolution(cellSize) {
  const canvasSize = 400000;
  numberOfCells = canvasSize / (cellSize * cellSize);
  cellHeight = cellSize;
}

rangeInput.onchange = () => {
  console.log(rangeInput.value);
  calculateResolution(rangeInput.value);
  canvas.innerHTML = "";
  createDiv();
};

eraserTool.addEventListener("click", () => {
  eraser = !eraser;
  eraserTool.classList.toggle("eraserActive");
  console.log(eraser);
});
canvas.addEventListener("mousedown", (e) => {
  penIndicator.classList.toggle("penAnimation");
  // if (mouseDown === true) {
  //   console.log("pen Active");
  //   mouseDown = false;
  // } else {
  //   console.log("Pen Inactive");
  //   mouseDown = true;
  // }
  mouseDown = true;
  e.preventDefault();
});
canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  penIndicator.classList.toggle("penAnimation");
});

function createDiv() {
  for (let i = 0; i < numberOfCells; i++) {
    let cell = document.createElement("div");

    cell.classList.add("gridCell");
    cell.style.height = cellHeight + "px";
    cell.style.width = cellHeight + "px";
    cell.addEventListener("mousemove", (e) => {
      if (mouseDown === true) {
        cell.style.backgroundColor = brushColor.value;
      }
      if (e.shiftKey === true && eraser === true) {
        cell.style.background = "none";
      } else if (e.shiftKey && mouseDown != true) {
        // cell.classList.add("changeColour");
        cell.style.backgroundColor = brushColor.value;
      }

      if (mouseDown == true && eraser === true) {
        cell.style.transition = "0s";
        cell.style.background = "none";
      }
    });

    canvas.appendChild(cell);
    cellArray.push(cell);
  }
}

window.addEventListener("keydown", (e) => {});

window.addEventListener("keypress", (e) => {
  if (e.key === "e" || e.key === "E") {
    eraser = !eraser;
    eraserTool.classList.toggle("eraserActive");
  } else if (e.key === "m" || e.key === "M") {
    body.classList.toggle("dark-mode");
    main.classList.toggle("dark-mode");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    penIndicator.classList.add("penAnimation");
  }
});

window.addEventListener("keyup", (e) => {
  if (mouseDown != true) {
    penIndicator.classList.remove("penAnimation");
  }
});
window.addEventListener("load", () => {
  createDiv();
});

// setTimeout(() => {
//   let cells = cellArray;
//   cells.forEach((cell) => {
//     cell.addEventListener("mouseover", (e) => {
//       console.log(e);
//       if (e.shiftKey) {
//         console.log(cell.id);
//         cell.classList.add("changeColour");
//       }
//     });
//   });
// }, 1000);

},{"dom-to-image-more":1}]},{},[2]);
