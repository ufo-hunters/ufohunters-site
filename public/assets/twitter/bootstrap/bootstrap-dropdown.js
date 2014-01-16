/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
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
 * ============================================================ */
!function(t){"use strict";function e(){t(".dropdown-backdrop").remove(),t(r).each(function(){n(t(this)).removeClass("open")})}function n(e){var n,r=e.attr("data-target");return r||(r=e.attr("href"),r=r&&/#/.test(r)&&r.replace(/.*(?=#[^\s]*$)/,"")),n=r&&t(r),n&&n.length||(n=e.parent()),n}var r="[data-toggle=dropdown]",i=function(e){var n=t(e).on("click.dropdown.data-api",this.toggle);t("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};i.prototype={constructor:i,toggle:function(){var r,i,o=t(this);if(!o.is(".disabled, :disabled"))return r=n(o),i=r.hasClass("open"),e(),i||("ontouchstart"in document.documentElement&&t('<div class="dropdown-backdrop"/>').insertBefore(t(this)).on("click",e),r.toggleClass("open")),o.focus(),!1},keydown:function(e){var i,o,a,s,u;if(/(38|40|27)/.test(e.keyCode)&&(i=t(this),e.preventDefault(),e.stopPropagation(),!i.is(".disabled, :disabled"))){if(a=n(i),s=a.hasClass("open"),!s||s&&27==e.keyCode)return 27==e.which&&a.find(r).focus(),i.click();o=t("[role=menu] li:not(.divider):visible a",a),o.length&&(u=o.index(o.filter(":focus")),38==e.keyCode&&u>0&&u--,40==e.keyCode&&u<o.length-1&&u++,~u||(u=0),o.eq(u).focus())}}};var o=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var n=t(this),r=n.data("dropdown");r||n.data("dropdown",r=new i(this)),"string"==typeof e&&r[e].call(n)})},t.fn.dropdown.Constructor=i,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=o,this},t(document).on("click.dropdown.data-api",e).on("click.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.dropdown.data-api",r,i.prototype.toggle).on("keydown.dropdown.data-api",r+", [role=menu]",i.prototype.keydown)}(window.jQuery);