'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    if(typeof executor !== 'function') throw TypeError('Executor must be a function');
    this._state = 'pending';
    this._value = undefined;
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
};

$Promise.prototype._internalResolve = function(data){
    if(this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = data;
        this._callHandlers();
    }
};

$Promise.prototype._internalReject = function(data){
    if(this._state === 'pending') {
        this._state = 'rejected';
        this._value = data;
        this._callHandlers();
    }
};

$Promise.prototype.then = function(successCb, errorCb) {
    if(typeof successCb !== 'function') successCb = false;
    if(typeof errorCb !== 'function') errorCb = false;
    this._handlerGroups.push({successCb, errorCb});
    if(this._state !== 'pending') this._callHandlers();
};

$Promise.prototype._callHandlers = function() {
    while(this._handlerGroups.length > 0) {
        let current = this._handlerGroups.shift();

        if(this._state === 'fulfilled') {
            if(current.successCb) {
                current.successCb(this._value);
            };
        }
        if(this._state === 'rejected') {
            if(current.errorCb) {
                current.errorCb(this._value);
            };
        }
    }
};
   
$Promise.prototype.catch = function(errorCb) {
    return this.then(null, errorCb)
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
