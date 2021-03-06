/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */







 define(function(require, exports, module) {
 "use strict";

 var oop = require("../lib/oop");
 var Mirror = require("../worker/mirror").Mirror;
 var Python = require('../mode/python/python');


 var Worker = exports.Worker = function(sender) {
     Mirror.call(this, sender);
     this.setTimeout(500);
     var b = this.errBuffer = [];
 };

 window.prompt = function () {};

 oop.inherits(Worker, Mirror);

 (function() {

     this.onUpdate = function() {
         var value = this.doc.getValue();
         var error = Python.compile(value);

         if (error)
             this.sender.emit("error", error);
         else
             this.sender.emit("ok");
     };

 }).call(Worker.prototype);

 });


//
// define(function(require, exports, module) {
// "use strict";
//
// var oop = require("../lib/oop");
// var Mirror = require("../worker/mirror").Mirror;
// // var Sk = require("./python/skulpt").Sk;
// var Sk = require("./python/skulpt").Sk;
//
// var WorkerModule = exports.WorkerModule = function(sender) {
// Mirror.call(this, sender);
// this.setTimeout(500);
// // this.setOptions();
// };
//
// // Mirror is a simple class which keeps main and webWorker versions of the document in sync
// oop.inherits(WorkerModule, Mirror);
//
// (function() {
// this.onUpdate = function() {
//     var value = this.doc.getValue();
//     var errors = [];
//     console.log(results);
//     try {
//         Sk.parse('', value);
//     } catch(e) {
//         var message;
//         if (e instanceof Sk.builtin.IndentationError)
//             message = 'IndentationError: ' + e.args.v[0].v;
//             console.log(e);
//         else if (e instanceof Sk.builtin.ParseError) // it should be SyntaxError
//             message = 'SyntaxError: invalid syntax'+e.args.v[0].v;
//             console.log(e);
//         else
//             message=e.message
//             console.log(e);
//         errors.push({
//             row: e.lineno - 1,
//             column: e.colno == '<unknown>' ? null : e.colno,
//             text: message,
//             type: "error"
//         });
//     }
//     this.sender.emit("lint", errors);
// };
// }).call(WorkerModule.prototype);
//
// });


//
// var PythonWorker = exports.PythonWorker = function(sender) {
//     Mirror.call(this, sender);
//     this.setTimeout(500);
// };
//
// oop.inherits(PythonWorker, Mirror);
//
// (function() {
//
//     this.onUpdate = function() {
//         var value = this.doc.getValue();
//         var errors = [];
//
//         // var start = new Date();
//         try {
//             Sk.parse('', value);
//         } catch(e) {
//             var message;
//             if (e instanceof Sk.builtin.IndentationError)
//                 message = 'IndentationError: ' + e.args.v[0].v;
//             else if (e instanceof Sk.builtin.ParseError) // it should be SyntaxError
//                 message = 'SyntaxError: invalid syntax';
//             else
//                 throw e;
//             errors.push({
//                 row: e.lineno - 1,
//                 column: e.colno == '<unknown>' ? null : e.colno,
//                 text: message,
//                 type: "error"
//             });
//         }
//         // console.log("lint time: " + (new Date() - start));
//
//         if (errors.length) {
//             this.sender.emit("error", errors);
//         } else {
//             this.sender.emit("ok");
//         }
//     };
//
// }).call(PythonWorker.prototype);
//
// });
