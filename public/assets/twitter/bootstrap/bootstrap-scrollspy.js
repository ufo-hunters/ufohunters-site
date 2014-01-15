/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
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
 * ============================================================== */
!function(t){"use strict";function e(e,n){var r,i=t.proxy(this.process,this),o=t(e).is("body")?t(window):t(e);this.options=t.extend({},t.fn.scrollspy.defaults,n),this.$scrollElement=o.on("scroll.scroll-spy.data-api",i),this.selector=(this.options.target||(r=t(e).attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=t("body"),this.refresh(),this.process()}e.prototype={constructor:e,refresh:function(){var e,n=this;this.offsets=t([]),this.targets=t([]),e=this.$body.find(this.selector).map(function(){var e=t(this),r=e.data("target")||e.attr("href"),i=/^#\w/.test(r)&&t(r);return i&&i.length&&[[i.position().top+(!t.isWindow(n.$scrollElement.get(0))&&n.$scrollElement.scrollTop()),r]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){n.offsets.push(this[0]),n.targets.push(this[1])})},process:function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,n=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,r=n-this.$scrollElement.height(),i=this.offsets,o=this.targets,a=this.activeTarget;if(e>=r)return a!=(t=o.last()[0])&&this.activate(t);for(t=i.length;t--;)a!=o[t]&&e>=i[t]&&(!i[t+1]||e<=i[t+1])&&this.activate(o[t])},activate:function(e){var n,r;this.activeTarget=e,t(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',n=t(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=t.fn.scrollspy;t.fn.scrollspy=function(n){return this.each(function(){var r=t(this),i=r.data("scrollspy"),o="object"==typeof n&&n;i||r.data("scrollspy",i=new e(this,o)),"string"==typeof n&&i[n]()})},t.fn.scrollspy.Constructor=e,t.fn.scrollspy.defaults={offset:10},t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=n,this},t(window).on("load",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);e.scrollspy(e.data())})})}(window.jQuery);