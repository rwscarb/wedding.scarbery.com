(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69ff792a"],{"2fa4":function(t,e,i){"use strict";i("20f68");var o=i("80d2");e["a"]=Object(o["i"])("spacer","div","v-spacer")},"40dc":function(t,e,i){"use strict";var o=i("5530"),s=(i("c7cd"),i("a9e3"),i("8b0d"),i("3835")),l=(i("0481"),i("5e23"),i("8dd9")),n=i("adda"),r=i("80d2"),c=i("d9bd"),a=l["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(o["a"])(Object(o["a"])({},l["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(o["a"])(Object(o["a"])({},this.measurableStyles),{},{height:Object(r["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var i=Object(s["a"])(e,2),o=i[0],l=i[1];t.$attrs.hasOwnProperty(o)&&Object(c["a"])(o,l,t)}))},methods:{genBackground:function(){var t={height:Object(r["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(n["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(r["g"])(this.computedContentHeight)}},Object(r["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(r["g"])(this.extensionHeight)}},Object(r["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}}),h=i("53ca");function d(t,e){var i=e.modifiers||{},o=i.self,s=void 0!==o&&o,l=e.value,n="object"===Object(h["a"])(l)&&l.options||{passive:!0},r="function"===typeof l||"handleEvent"in l?l:l.handler,c=s?t:e.arg?document.querySelector(e.arg):window;c&&(c.addEventListener("scroll",r,n),t._onScroll={handler:r,options:n,target:s?void 0:c})}function p(t){if(t._onScroll){var e=t._onScroll,i=e.handler,o=e.options,s=e.target,l=void 0===s?t:s;l.removeEventListener("scroll",i,o),delete t._onScroll}}var u={inserted:d,unbind:p},v=u,f=i("3a66"),g=i("2b0e"),m=g["default"].extend({name:"scrollable",directives:{Scroll:u},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(c["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),b=i("d10f"),S=i("f2e7"),O=i("58df"),C=Object(O["a"])(a,m,b["a"],S["a"],Object(f["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));e["a"]=C.extend({name:"v-app-bar",directives:{Scroll:v},provide:function(){return{VAppBar:this}},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return m.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(o["a"])(Object(o["a"])({},a.options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},scrollRatio:function(){var t=this.computedScrollThreshold;return Math.max((t-this.currentScroll)/t,0)},computedContentHeight:function(){if(!this.shrinkOnScroll)return a.options.computed.computedContentHeight.call(this);var t=this.dense?48:56,e=this.computedOriginalHeight;return t+(e-t)*this.scrollRatio},computedFontSize:function(){if(this.isProminent){var t=1.25,e=1.5;return t+(e-t)*this.scrollRatio}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll)return this.scrollRatio},computedOriginalHeight:function(){var t=a.options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:a.options.computed.isCollapsed.call(this)},isProminent:function(){return a.options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(o["a"])(Object(o["a"])({},a.options.computed.styles.call(this)),{},{fontSize:Object(r["g"])(this.computedFontSize,"rem"),marginTop:Object(r["g"])(this.computedMarginTop),transform:"translateY(".concat(Object(r["g"])(this.computedTransform),")"),left:Object(r["g"])(this.computedLeft),right:Object(r["g"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=a.options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=a.options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}})},"462a":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"contract_status"},[i("v-chip",{attrs:{outlined:""}},[t.contractDivorced?i("div",[t._v(" Divorced "),i("v-icon",{staticClass:"ml-1",attrs:{color:"black"}},[t._v("mdi-heart-broken")])],1):t.contractSigned?i("div",[t._v(" Signed "),i("v-icon",{staticClass:"ml-1",attrs:{color:"red"}},[t._v("mdi-heart")])],1):i("div",[t._v(" Not Signed "),i("v-icon",{staticClass:"ml-1",attrs:{color:"grey"}},[t._v("mdi-heart")])],1)])],1)},s=[],l=i("f8a2"),n={name:"ContractStatus",mixins:[l["a"]]},r=n,c=i("2877"),a=i("6544"),h=i.n(a),d=i("cc20"),p=i("132d"),u=Object(c["a"])(r,o,s,!1,null,"146374f6",null);e["a"]=u.exports;h()(u,{VChip:d["a"],VIcon:p["a"]})},"5bc1":function(t,e,i){"use strict";var o=i("5530"),s=(i("498a"),i("9d26")),l=i("8336"),n=i("2b0e");e["a"]=n["default"].extend({name:"v-app-bar-nav-icon",functional:!0,render:function(t,e){var i=e.slots,n=e.listeners,r=e.props,c=e.data,a=Object.assign(c,{staticClass:"v-app-bar__nav-icon ".concat(c.staticClass||"").trim(),props:Object(o["a"])(Object(o["a"])({},r),{},{icon:!0}),on:n}),h=i().default;return t(l["a"],a,h||[t(s["a"],"$menu")])}})},"5e23":function(t,e,i){},"8adc":function(t,e,i){},"8b0d":function(t,e,i){},cc20:function(t,e,i){"use strict";var o=i("3835"),s=i("5530"),l=(i("4de4"),i("8adc"),i("58df")),n=i("0789"),r=i("9d26"),c=i("a9ad"),a=i("4e82"),h=i("7560"),d=i("f2e7"),p=i("1c87"),u=i("af2b"),v=i("d9bd");e["a"]=Object(l["a"])(c["a"],u["a"],p["a"],h["a"],Object(a["a"])("chipGroup"),Object(d["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])(Object(s["a"])(Object(s["a"])({"v-chip":!0},p["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(p["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var i=Object(o["a"])(e,2),s=i[0],l=i[1];t.$attrs.hasOwnProperty(s)&&Object(v["a"])(s,l,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(r["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(n["b"],t)},genClose:function(){var t=this;return this.$createElement(r["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],i=this.generateRouteLink(),o=i.tag,l=i.data;l.attrs=Object(s["a"])(Object(s["a"])({},l.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:l.attrs.tabindex}),l.directives.push({name:"show",value:this.active}),l=this.setBackgroundColor(this.color,l);var n=this.textColor||this.outlined&&this.color;return t(o,this.setTextColor(n,l),e)}})}}]);
//# sourceMappingURL=chunk-69ff792a.e43b5884.js.map