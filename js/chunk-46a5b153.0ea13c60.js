(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46a5b153"],{"08ca":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("canvas")},o=[],i=(r("a9e3"),r("5d4e")),a=r.n(i),s={name:"Blocky",props:{size:Number,seed:String},watch:{size:"render",seed:"render"},methods:{render:function(){a.a.render({size:this.size,seed:this.seed,color:"#c73131",bgcolor:"#aaa"},this.$el)}},mounted:function(){this.render()}},u=s,c=r("2877"),l=Object(c["a"])(u,n,o,!1,null,"04f82b3e",null);e["a"]=l.exports},"0bc6":function(t,e,r){},1681:function(t,e,r){},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(c){return void r(c)}s.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,u,"next",t)}function u(t){n(a,o,i,s,u,"throw",t)}s(void 0)}))}}},"4bd4":function(t,e,r){"use strict";var n=r("5530"),o=(r("caad"),r("2532"),r("07ac"),r("4de4"),r("159b"),r("7db0"),r("58df")),i=r("7e2b"),a=r("3206");e["a"]=Object(o["a"])(i["a"],Object(a["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,r=function(t){return t.$watch("hasError",(function(r){e.$set(e.errorBag,t._uid,r)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(o){o&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=r(t)))})):n.valid=r(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var r=this.watchers.find((function(t){return t._uid===e._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"5d4e":function(t,e,r){(function(){var e=new Array(4);function r(t){for(var r=0;r<e.length;r++)e[r]=0;for(r=0;r<t.length;r++)e[r%4]=(e[r%4]<<5)-e[r%4]+t.charCodeAt(r)}function n(){var t=e[0]^e[0]<<11;return e[0]=e[1],e[1]=e[2],e[2]=e[3],e[3]=e[3]^e[3]>>19^t^t>>8,(e[3]>>>0)/(1<<31>>>0)}function o(){var t=Math.floor(360*n()),e=60*n()+40+"%",r=25*(n()+n()+n()+n())+"%",o="hsl("+t+","+e+","+r+")";return o}function i(t){for(var e=t,r=t,o=Math.ceil(e/2),i=e-o,a=[],s=0;s<r;s++){for(var u=[],c=0;c<o;c++)u[c]=Math.floor(2.3*n());var l=u.slice(0,i);l.reverse(),u=u.concat(l);for(var h=0;h<u.length;h++)a.push(u[h])}return a}function a(t){var e={};return e.size=t.size||8,e.scale=t.scale||4,e.seed=t.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16),e.color=t.color||o(),e.bgcolor=t.bgcolor||o(),e.spotcolor=t.spotcolor||o(),r(e.seed),e}function s(t,e){t=a(t||{});var r=i(t.size),n=Math.sqrt(r.length);e.width=e.height=t.size*t.scale;var o=e.getContext("2d");o.fillStyle=t.bgcolor,o.fillRect(0,0,e.width,e.height),o.fillStyle=t.color;for(var s=0;s<r.length;s++)if(r[s]){var u=Math.floor(s/n),c=s%n;o.fillStyle=1==r[s]?t.color:t.spotcolor,o.fillRect(c*t.scale,u*t.scale,t.scale,t.scale)}return e}function u(t){t=a(t||{});var e=document.createElement("canvas");return s(t,e),e}var c={create:u,render:s};t.exports=c,"undefined"!==typeof window&&(window.blockies=c)})()},8660:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"guestbook_view"},[r("v-container",[r("h1",[t._v("Guest Book")]),r("v-divider"),r("h3",[t._v("Sign the Guest Book")]),r("v-subheader",[t._v("Submission can take up to 15 seconds as miners confirm the next block.")]),r("v-form",{ref:"guest_book_form",staticClass:"col-lg-6",attrs:{disabled:!t.hasWeb3Extension},on:{submit:function(e){return e.preventDefault(),t.signGuestBook(t.forms.guest_book.name,t.forms.guest_book.message)}},model:{value:t.forms.guest_book.valid,callback:function(e){t.$set(t.forms.guest_book,"valid",e)},expression:"forms.guest_book.valid"}},[r("v-text-field",{attrs:{label:"Name",autocomplete:"off",rules:[function(t){return!!t||"You forgot your name"}],loading:t.forms.guest_book.loading,required:""},model:{value:t.forms.guest_book.name,callback:function(e){t.$set(t.forms.guest_book,"name",e)},expression:"forms.guest_book.name"}}),r("v-textarea",{attrs:{label:"Message",name:"guest_book_message",rules:[function(t){return!!t||"You forgot the message"}],loading:t.forms.guest_book.loading,rows:"10",solo:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.ctrlKey?t.signGuestBook(t.forms.guest_book.name,t.forms.guest_book.message):null}},model:{value:t.forms.guest_book.message,callback:function(e){t.$set(t.forms.guest_book,"message",e)},expression:"forms.guest_book.message"}}),t.forms.guest_book.valid?r("v-btn",{staticClass:"float-right",attrs:{type:"submit",loading:t.forms.guest_book.loading,fab:"",large:"",icon:""}},[r("v-icon",{attrs:{dense:""}},[t._v("mdi-email-send")])],1):t._e()],1),r("h3",[t._v("Entries")]),r("v-list",{attrs:{"three-line":""}},t._l(t.guestBookEntries,(function(e,n){var o=e.name,i=e.address,a=e.message;return r("v-list-item",{key:n},[r("v-list-item-avatar",[r("blocky",{attrs:{seed:i,size:10}})],1),r("v-list-item-content",[o?r("v-list-item-title",[t._v(t._s(o))]):t._e(),r("v-list-item-subtitle",[t._v(t._s(a))])],1)],1)})),1)],1)],1)},o=[],i=r("1da1"),a=(r("96cf"),r("d81d"),r("2ef0")),s=r.n(a),u=r("08ca"),c=r("f8a2"),l=r("883f"),h={name:"Guestbook",mixins:[c["a"],l["a"]],data:function(){return{forms:{guest_book:{loading:!1,valid:!1,error:!1,name:"",message:"",errorMessage:""}}}},computed:{guestBookEntries:function(){var t=this,e=this.getContractDataWithDefault({contract:"GuestBook",method:"getGuestBookEntries",return_default:[]});return e.length?s.a.reverse(s.a.map(e,(function(e){return{address:e[0],name:t.utils.toUtf8(e[1]),message:t.utils.toUtf8(e[2])}}))):[{address:"0xFFFFF",name:"Anonymous",message:"There have been no guest entries."}]}},methods:{signGuestBook:function(t,e){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r.forms.guest_book.loading=!0,n.prev=1,n.next=4,r.GuestBook.methods.signGuestBook(r.utils.utf8ToHex(t),r.utils.utf8ToHex(e)).send();case 4:r.$refs.guest_book_form.reset(),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](1),r.sendSnackbarMessage({message:n.t0.message});case 10:return n.prev=10,r.forms.guest_book.loading=!1,n.finish(10);case 13:case"end":return n.stop()}}),n,null,[[1,7,10,13]])})))()}},components:{Blocky:u["a"]}},f=h,d=r("2877"),v=r("6544"),m=r.n(v),g=r("8336"),p=r("a523"),y=r("ce7e"),b=r("4bd4"),w=r("132d"),_=r("8860"),k=r("da13"),x=r("8270"),E=r("5d23"),L=r("e0c7"),B=r("8654"),G=r("5530"),O=(r("a9e3"),r("1681"),r("58df")),V=Object(O["a"])(B["a"]),j=V.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(G["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},B["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,r=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(r,e)+"px"}},genInput:function(){var t=B["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){B["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}}),I=Object(d["a"])(f,n,o,!1,null,"5b0579bb",null);e["default"]=I.exports;m()(I,{VBtn:g["a"],VContainer:p["a"],VDivider:y["a"],VForm:b["a"],VIcon:w["a"],VList:_["a"],VListItem:k["a"],VListItemAvatar:x["a"],VListItemContent:E["a"],VListItemSubtitle:E["b"],VListItemTitle:E["c"],VSubheader:L["a"],VTextField:B["a"],VTextarea:j})},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch($){u=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,i=Object.create(o.prototype),a=new V(n||[]);return i._invoke=L(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch($){return{type:"throw",arg:$}}}t.wrap=c;var h="suspendedStart",f="suspendedYield",d="executing",v="completed",m={};function g(){}function p(){}function y(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,_=w&&w(w(j([])));_&&_!==r&&n.call(_,i)&&(b=_);var k=y.prototype=g.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,s){var u=l(t[o],t,i);if("throw"!==u.type){var c=u.arg,h=c.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){c.value=t,a(c)}),(function(t){return r("throw",t,a,s)}))}s(u.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function L(t,e,r){var n=h;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===v){if("throw"===o)throw i;return I()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=B(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?v:f,u.arg===m)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=v,r.method="throw",r.arg=u.arg)}}}function B(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,B(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function G(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function V(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(G,this),this.reset(!0)}function j(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:I}}function I(){return{value:e,done:!0}}return p.prototype=k.constructor=y,y.constructor=p,p.displayName=u(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,u(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},x(E.prototype),E.prototype[a]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(k),u(k,s,"Generator"),k[i]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,V.prototype={constructor:V,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},e0c7:function(t,e,r){"use strict";var n=r("5530"),o=(r("0bc6"),r("7560")),i=r("58df");e["a"]=Object(i["a"])(o["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(n["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-46a5b153.0ea13c60.js.map