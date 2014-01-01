/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function(t){"use strict";var e=function(e,n){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,"hover"==this.options.pause&&this.$element.on("mouseenter",t.proxy(this.pause,this)).on("mouseleave",t.proxy(this.cycle,this))};e.prototype={cycle:function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(e){var n=this.getActiveIndex(),r=this;if(!(e>this.$items.length-1||0>e))return this.sliding?this.$element.one("slid",function(){r.to(e)}):n==e?this.pause().cycle():this.slide(e>n?"next":"prev",t(this.$items[e]))},pause:function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition.end&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){return this.sliding?void 0:this.slide("next")},prev:function(){return this.sliding?void 0:this.slide("prev")},slide:function(e,n){var r,i=this.$element.find(".item.active"),o=n||i[e](),a=this.interval,s="next"==e?"left":"right",u="next"==e?"first":"last",l=this;if(this.sliding=!0,a&&this.pause(),o=o.length?o:this.$element.find(".item")[u](),r=t.Event("slide",{relatedTarget:o[0],direction:s}),!o.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var e=t(l.$indicators.children()[l.getActiveIndex()]);e&&e.addClass("active")})),t.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(r),r.isDefaultPrevented())return;o.addClass(e),o[0].offsetWidth,i.addClass(s),o.addClass(s),this.$element.one(t.support.transition.end,function(){o.removeClass([e,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger("slid")},0)})}else{if(this.$element.trigger(r),r.isDefaultPrevented())return;i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return a&&this.cycle(),this}}};var n=t.fn.carousel;t.fn.carousel=function(n){return this.each(function(){var r=t(this),i=r.data("carousel"),o=t.extend({},t.fn.carousel.defaults,"object"==typeof n&&n),a="string"==typeof n?n:o.slide;i||r.data("carousel",i=new e(this,o)),"number"==typeof n?i.to(n):a?i[a]():o.interval&&i.pause().cycle()})},t.fn.carousel.defaults={interval:5e3,pause:"hover"},t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){return t.fn.carousel=n,this},t(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(e){var n,r,i=t(this),o=t(i.attr("data-target")||(n=i.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"")),a=t.extend({},o.data(),i.data());o.carousel(a),(r=i.attr("data-slide-to"))&&o.data("carousel").pause().to(r).cycle(),e.preventDefault()})}(window.jQuery);