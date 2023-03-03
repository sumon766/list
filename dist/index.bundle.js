"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_ListCollection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ListCollection.js */ "./src/modules/ListCollection.js");


const listCollection = new _modules_ListCollection_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
listCollection.load();
listCollection.read();
const getInputValue = id => {
  const inputField = document.querySelector(id);
  const inputValue = inputField.value;
  inputField.value = '';
  return inputValue;
};
const enterBtn = document.querySelector('.enter-btn');
enterBtn.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = getInputValue('#inputField');
  listCollection.setLocalData(inputValue);
  listCollection.read();
});
const clearBtn = document.querySelector('.clear-completed');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      listCollection.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = listCollection.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  listCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  listCollection.read();
});
document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

/***/ }),

/***/ "./src/modules/ListCollection.js":
/*!***************************************!*\
  !*** ./src/modules/ListCollection.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListCollection)
/* harmony export */ });
/* harmony import */ var _mainClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainClass.js */ "./src/modules/mainClass.js");

class ListCollection {
  constructor() {
    this.data = [];
  }
  getNextIndex = () => {
    let maxIndex = 0;
    this.data.forEach(toDoList => {
      if (toDoList.index > maxIndex) {
        maxIndex = toDoList.index;
      }
    });
    return maxIndex + 1;
  };
  setLocalData = inputValue => {
    const completed = false;
    const index = this.getNextIndex();
    const task = inputValue;
    const info = new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](task, index, completed);
    this.data.push(info);
    this.save();
  };
  read = () => {
    let items = '';
    this.data.forEach(toDoList => {
      items += `
       <div class="textarea-container">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr>
      `;
    });
    document.querySelector('.list-items').innerHTML = items;
    this.DeleteListeners();
    this.Edit();
    this.SaveListeners();
    this.checkBox();
  };
  updateCompleted = (index, completed) => {
    this.data[index].completed = completed;
    this.save();
  };
  checkBox = () => {
    const checks = document.querySelectorAll('input[type=checkbox]');
    const inputs = document.querySelectorAll('.textarea-container textarea');
    checks.forEach((ck, i) => {
      const isCompleted = this.data[i].completed;
      if (isCompleted) {
        inputs[i].classList.add('completed');
        checks[i].setAttribute('checked', 'checked');
      }
      ck.addEventListener('change', () => {
        if (checks[i].checked) {
          inputs[i].classList.add('completed');
          this.updateCompleted(i, true);
        } else {
          inputs[i].classList.remove('completed');
          this.updateCompleted(i, false);
        }
      });
    });
  };
  Edit = () => {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.controller');
    const inputs = document.querySelectorAll('.textarea-container textarea');
    editBtn.forEach((eb, i) => {
      eb.addEventListener('click', () => {
        updateController[i].style.display = 'flex';
        editBtn[i].style.display = 'none';
        inputs[i].disabled = false;
      });
    });
  };

  /* update item when edit */
  updateItem = (task, i) => {
    this.data[i].task = task;
    this.save();
    this.read();
  };
  SaveListeners = () => {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.textarea-container textarea');
    saveBtn.forEach((sb, i) => {
      sb.addEventListener('click', () => {
        this.updateItem(inputs[i].value, i);
      });
    });
  };
  deleteItem = i => {
    this.data = this.data.filter((item, index) => index !== i);
    this.data.forEach((item, index) => {
      item.index = index + 1;
    });
    this.save();
    this.read();
  };
  DeleteListeners = () => {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.deleteItem(i);
      });
    });
  };
  save = () => {
    localStorage.setItem('toDoList', JSON.stringify(this.data));
  };
  load = () => {
    const getDataFromLocal = JSON.parse(localStorage.getItem('toDoList')) || [];
    getDataFromLocal.forEach(toDoList => {
      this.data.push(new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](toDoList.task, toDoList.index, toDoList.completed));
    });
  };
}

/***/ }),

/***/ "./src/modules/mainClass.js":
/*!**********************************!*\
  !*** ./src/modules/mainClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
class Main {
  constructor(task, index, completed) {
    this.task = task;
    this.index = index;
    this.completed = completed;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.main {\r\n  width: 60vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin: 0 auto;\r\n  margin-top: 50px;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.title-container,\r\n.inputDiv,\r\n.textarea-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clear-completed {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clear-completed:focus {\r\n  background-color: rgba(0, 255, 255, 0.153);\r\n}\r\n\r\n.enter-btn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 50rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,YAAY;EACZ,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,WAAW;EACX,uBAAuB;AACzB;;AAEA;;EAEE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE;IACE,oBAAoB;IACpB,UAAU;EACZ;;EAEA;IACE,yBAAyB;IACzB,WAAW;EACb;AACF","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.main {\r\n  width: 60vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin: 0 auto;\r\n  margin-top: 50px;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.title-container,\r\n.inputDiv,\r\n.textarea-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clear-completed {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clear-completed:focus {\r\n  background-color: rgba(0, 255, 255, 0.153);\r\n}\r\n\r\n.enter-btn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 50rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9MaXN0Q29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvbWFpbkNsYXNzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBMaXN0Q29sbGVjdGlvbiBmcm9tICcuL21vZHVsZXMvTGlzdENvbGxlY3Rpb24uanMnO1xyXG5cclxuY29uc3QgbGlzdENvbGxlY3Rpb24gPSBuZXcgTGlzdENvbGxlY3Rpb24oKTtcclxubGlzdENvbGxlY3Rpb24ubG9hZCgpO1xyXG5saXN0Q29sbGVjdGlvbi5yZWFkKCk7XHJcblxyXG5jb25zdCBnZXRJbnB1dFZhbHVlID0gKGlkKSA9PiB7XHJcbiAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xyXG4gIGlucHV0RmllbGQudmFsdWUgPSAnJztcclxuICByZXR1cm4gaW5wdXRWYWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVudGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudGVyLWJ0bicpO1xyXG5lbnRlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IGdldElucHV0VmFsdWUoJyNpbnB1dEZpZWxkJyk7XHJcbiAgbGlzdENvbGxlY3Rpb24uc2V0TG9jYWxEYXRhKGlucHV0VmFsdWUpO1xyXG4gIGxpc3RDb2xsZWN0aW9uLnJlYWQoKTtcclxufSk7XHJcblxyXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhci1jb21wbGV0ZWQnKTtcclxuY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgY2hlY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcclxuICBjb25zdCB1cGRhdGVJdGVtID0gW107XHJcbiAgY2hlY2tzLmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgICAgIGxpc3RDb2xsZWN0aW9uLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgIH0pO1xyXG4gICAgICB1cGRhdGVJdGVtLnB1c2goaSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgY29uc3QgdXBkYXRlTGlzdCA9IGxpc3RDb2xsZWN0aW9uLmRhdGEuZmlsdGVyKChpdGVtLCBpKSA9PiAhdXBkYXRlSXRlbS5pbmNsdWRlcyhpKSk7XHJcbiAgdXBkYXRlTGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgaXRlbS5pbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIGxpc3RDb2xsZWN0aW9uLmRhdGEgPSB1cGRhdGVMaXN0O1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZUxpc3QpKTtcclxuICBsaXN0Q29sbGVjdGlvbi5yZWFkKCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXJlZnJlc2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXJlZnJlc2gnKS5jbGFzc0xpc3QuYWRkKCdyZWZyZXNoJyk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgTWFpbiBmcm9tICcuL21haW5DbGFzcy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q29sbGVjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRhdGEgPSBbXTtcclxuICB9XHJcblxyXG4gIGdldE5leHRJbmRleCA9ICgpID0+IHtcclxuICAgIGxldCBtYXhJbmRleCA9IDA7XHJcbiAgICB0aGlzLmRhdGEuZm9yRWFjaCgodG9Eb0xpc3QpID0+IHtcclxuICAgICAgaWYgKHRvRG9MaXN0LmluZGV4ID4gbWF4SW5kZXgpIHtcclxuICAgICAgICBtYXhJbmRleCA9IHRvRG9MaXN0LmluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXhJbmRleCArIDE7XHJcbiAgfVxyXG5cclxuICAgICBzZXRMb2NhbERhdGEgPSAoaW5wdXRWYWx1ZSkgPT4ge1xyXG4gICAgICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KCk7XHJcbiAgICAgICBjb25zdCB0YXNrID0gaW5wdXRWYWx1ZTtcclxuICAgICAgIGNvbnN0IGluZm8gPSBuZXcgTWFpbih0YXNrLCBpbmRleCwgY29tcGxldGVkKTtcclxuICAgICAgIHRoaXMuZGF0YS5wdXNoKGluZm8pO1xyXG4gICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgfTtcclxuXHJcbiAgICAgICByZWFkID0gKCkgPT4ge1xyXG4gICAgICAgICBsZXQgaXRlbXMgPSAnJztcclxuICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHRvRG9MaXN0KSA9PiB7XHJcbiAgICAgICAgICAgaXRlbXMgKz0gYFxyXG4gICAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hcIiBuYW1lPVwiY29tcGxldGVkXCIgLz5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBkaXNhYmxlZD4ke3RvRG9MaXN0LnRhc2t9PC90ZXh0YXJlYT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZWxsaXBzaXMtdiBlZGl0QnRuXCIgPjwvaT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNhdmUgc2F2ZUJ0blwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdHJhc2ggZGVsZXRlQnRuXCI+PC9pPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICAgPGhyPlxyXG4gICAgICBgO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtaXRlbXMnKS5pbm5lckhUTUwgPSBpdGVtcztcclxuICAgICAgICAgdGhpcy5EZWxldGVMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgdGhpcy5FZGl0KCk7XHJcbiAgICAgICAgIHRoaXMuU2F2ZUxpc3RlbmVycygpO1xyXG4gICAgICAgICB0aGlzLmNoZWNrQm94KCk7XHJcbiAgICAgICB9O1xyXG5cclxuIHVwZGF0ZUNvbXBsZXRlZCA9IChpbmRleCwgY29tcGxldGVkKSA9PiB7XHJcbiAgIHRoaXMuZGF0YVtpbmRleF0uY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gICB0aGlzLnNhdmUoKTtcclxuIH1cclxuXHJcbmNoZWNrQm94ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNoZWNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XHJcbiAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhLWNvbnRhaW5lciB0ZXh0YXJlYScpO1xyXG4gIGNoZWNrcy5mb3JFYWNoKChjaywgaSkgPT4ge1xyXG4gICAgY29uc3QgaXNDb21wbGV0ZWQgPSB0aGlzLmRhdGFbaV0uY29tcGxldGVkO1xyXG4gICAgaWYgKGlzQ29tcGxldGVkKSB7XHJcbiAgICAgIGlucHV0c1tpXS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcclxuICAgICAgY2hlY2tzW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICB9XHJcbiAgICBjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIGlmIChjaGVja3NbaV0uY2hlY2tlZCkge1xyXG4gICAgICAgIGlucHV0c1tpXS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRlZChpLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0ZWQoaSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuIEVkaXQgPSAoKSA9PiB7XHJcbiAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdEJ0bicpO1xyXG4gICBjb25zdCB1cGRhdGVDb250cm9sbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRyb2xsZXInKTtcclxuICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhLWNvbnRhaW5lciB0ZXh0YXJlYScpO1xyXG4gICBlZGl0QnRuLmZvckVhY2goKGViLCBpKSA9PiB7XHJcbiAgICAgZWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICB1cGRhdGVDb250cm9sbGVyW2ldLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICBlZGl0QnRuW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICBpbnB1dHNbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICB9KTtcclxuICAgfSk7XHJcbiB9XHJcblxyXG4gLyogdXBkYXRlIGl0ZW0gd2hlbiBlZGl0ICovXHJcbiAgdXBkYXRlSXRlbSA9ICh0YXNrLCBpKSA9PiB7XHJcbiAgICB0aGlzLmRhdGFbaV0udGFzayA9IHRhc2s7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICAgIHRoaXMucmVhZCgpO1xyXG4gIH1cclxuXHJcbiBTYXZlTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNhdmVCdG4nKTtcclxuICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhLWNvbnRhaW5lciB0ZXh0YXJlYScpO1xyXG4gICBzYXZlQnRuLmZvckVhY2goKHNiLCBpKSA9PiB7XHJcbiAgICAgc2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICB0aGlzLnVwZGF0ZUl0ZW0oaW5wdXRzW2ldLnZhbHVlLCBpKTtcclxuICAgICB9KTtcclxuICAgfSk7XHJcbiB9XHJcblxyXG4gICAgIGRlbGV0ZUl0ZW0gPSAoaSkgPT4ge1xyXG4gICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSwgaW5kZXgpID0+IGluZGV4ICE9PSBpKTtcclxuICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgfSk7XHJcbiAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgIHRoaXMucmVhZCgpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgRGVsZXRlTGlzdGVuZXJzPSAoKSA9PiB7XHJcbiAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlQnRuJyk7XHJcbiAgICAgICBkZWxldGVCdG4uZm9yRWFjaCgoYnRuLCBpKSA9PiB7XHJcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdGhpcy5kZWxldGVJdGVtKGkpOyB9KTtcclxuICAgICAgIH0pO1xyXG4gICAgIH1cclxuXHJcbiBzYXZlID0gKCkgPT4ge1xyXG4gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0xpc3QnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuIH1cclxuXHJcbiBsb2FkID0gKCkgPT4ge1xyXG4gICBjb25zdCBnZXREYXRhRnJvbUxvY2FsID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9Eb0xpc3QnKSkgfHwgW107XHJcbiAgIGdldERhdGFGcm9tTG9jYWwuZm9yRWFjaCgodG9Eb0xpc3QpID0+IHtcclxuICAgICB0aGlzLmRhdGEucHVzaChuZXcgTWFpbih0b0RvTGlzdC50YXNrLCB0b0RvTGlzdC5pbmRleCwgdG9Eb0xpc3QuY29tcGxldGVkKSk7XHJcbiAgIH0pO1xyXG4gfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiB7XHJcbiAgY29uc3RydWN0b3IodGFzaywgaW5kZXgsIGNvbXBsZXRlZCkge1xyXG4gICAgdGhpcy50YXNrID0gdGFzaztcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gIH1cclxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxNiwgMjE5LCAyMjEsIDAuMTY3KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4ge1xcclxcbiAgd2lkdGg6IDYwdnc7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggMzBweCBncmV5O1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkZGluZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDAgMS41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUtY29udGFpbmVyLFxcclxcbi5pbnB1dERpdixcXHJcXG4udGV4dGFyZWEtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4O1xcclxcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyLWNvbXBsZXRlZCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jbGVhci1jb21wbGV0ZWQ6Zm9jdXMge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyNTUsIDI1NSwgMC4xNTMpO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXItYnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogNTByZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qiw2QkFBNkI7RUFDN0IsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7RUFDWixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLFlBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixXQUFXO0VBQ2I7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjE2LCAyMTksIDIyMSwgMC4xNjcpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiB7XFxyXFxuICB3aWR0aDogNjB2dztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMCAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aXRsZS1jb250YWluZXIsXFxyXFxuLmlucHV0RGl2LFxcclxcbi50ZXh0YXJlYS1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICByZXNpemU6IG5vbmU7XFxyXFxuICBwYWRkaW5nOiAxcHg7XFxyXFxuICBwYWRkaW5nLXRvcDogMjBweDtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXItY29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyLWNvbXBsZXRlZDpmb2N1cyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDI1NSwgMjU1LCAwLjE1Myk7XFxyXFxufVxcclxcblxcclxcbi5lbnRlci1idG4ge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbiNpbnB1dEZpZWxkIHtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIHdpZHRoOiA1MHJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDFweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEsXFxyXFxuLmNoZWNrYm94IHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xsZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcXHJcXG4gIGdhcDogMTVweDtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBhbmltYXRpb246IHJvdGF0ZSAwLjFzIGVhc2Utb3V0O1xcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxyXFxuICAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcclxcbiAgICBjb2xvcjogcmVkO1xcclxcbiAgfVxcclxcblxcclxcbiAgMTAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIGNvbG9yOiBhcXVhO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiTGlzdENvbGxlY3Rpb24iLCJsaXN0Q29sbGVjdGlvbiIsImxvYWQiLCJyZWFkIiwiZ2V0SW5wdXRWYWx1ZSIsImlkIiwiaW5wdXRGaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0VmFsdWUiLCJ2YWx1ZSIsImVudGVyQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXRMb2NhbERhdGEiLCJjbGVhckJ0biIsImNoZWNrcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ1cGRhdGVJdGVtIiwiZm9yRWFjaCIsImNoZWNrYm94IiwiaSIsImNoZWNrZWQiLCJkYXRhIiwiaXRlbSIsImluZGV4IiwicHVzaCIsInVwZGF0ZUxpc3QiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJNYWluIiwiY29uc3RydWN0b3IiLCJnZXROZXh0SW5kZXgiLCJtYXhJbmRleCIsInRvRG9MaXN0IiwiY29tcGxldGVkIiwidGFzayIsImluZm8iLCJzYXZlIiwiaXRlbXMiLCJpbm5lckhUTUwiLCJEZWxldGVMaXN0ZW5lcnMiLCJFZGl0IiwiU2F2ZUxpc3RlbmVycyIsImNoZWNrQm94IiwidXBkYXRlQ29tcGxldGVkIiwiaW5wdXRzIiwiY2siLCJpc0NvbXBsZXRlZCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZSIsImVkaXRCdG4iLCJ1cGRhdGVDb250cm9sbGVyIiwiZWIiLCJzdHlsZSIsImRpc3BsYXkiLCJkaXNhYmxlZCIsInNhdmVCdG4iLCJzYiIsImRlbGV0ZUl0ZW0iLCJkZWxldGVCdG4iLCJidG4iLCJnZXREYXRhRnJvbUxvY2FsIiwicGFyc2UiLCJnZXRJdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==