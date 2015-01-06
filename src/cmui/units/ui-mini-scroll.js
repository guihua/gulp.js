;(function($, win, N){
	/**
	 * the mini scroll compoenet, focus on horizonal scroll
	 * @param  {object} options
	 * 		   {
	 * 		   	  element: 'wrapper', // the wrapper element, required
	 * 		   	  scollItem: ''  // the scroll item
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 8/28/2014 15:57
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var miniScroll = function(options){
		this.options = $.extend({
			wrapper: "",  // required
			needNav : true, // default, you need a navigator
			scrollThreshold: 1/4, // the horizoal scroll threshold
			animate: 0.1, // the trasition time
			autoplay: false, //to auto scroll(not implement)
			cycleplay: false, //scroll cycle(not implement)
			beforeScrollStart: function(){},
			afterScrollEnd: function(){},
			afterHScroll: function(item, index){}
		}, options);
		this.init();
	};
	miniScroll.prototype = {
		init: function(){
			if(!this.options.element){
				throw new Error("The element option must be provided when initialize the tab.");
			}
			this.element = $(this.options.element.indexOf("#") > -1 ? this.options.element : ("#" + this.options.element));
			if(this.element.length == 0){
				return;
			}
			this.scrollList = this.element.find(".ui-mini-scroll-list");
			this.scrollNav = this.element.find(".ui-mini-scroll-nav");
			this.scrollItem = this.scrollList.find(".ui-mini-scroll-item");
			this.index = 0;
			this.len = this.scrollItem.length;
			this.createScrollNav();
			this.bindScrollEvt();
		},
		createScrollNav : function(){
			if(this.options.needNav){
				var navList = this.scrollNav.find("ul");
				for(var i = 0; i < this.len; i++){
					navList.append("<li></li>")
				}
				//to set the nav style
				this.scrollNav.find("li").eq(this.index).addClass("current");
				// to set the position
				navList.css("margin-left", (this.scrollItem.width()-this.len*12)/2);
				this.scrollNav.show();
				this.scrollList.find(".ui-mini-scroll-item-inner").css("margin-bottom", 36);
			}
		},
		afterHScroll : function(){
			if(this.options.needNav){
				this.scrollNav.find("li").removeClass("current").eq(this.index).addClass("current");
				//this.scrollNav.find("li:nth-child(" + (this.index+1) + ")", this.scrollNav).addClass("current");
			}
			this.options.afterHScroll(this.scrollItem[this.index], this.index);
		},
		bindScrollEvt: function(){
			var self = this,
				startPoint = {},
				movingPoint = {},
				movingVector = {x:0,y:0},
				touch = null,
				identifier = -1,
				touchTarget = null,
				hasTouched = false,
				touchStartTime = 0,
				touchDuration = 0,
				direction = 0, //0 no direction, 1 horizonal, 2 vertical
				directionThreshold = 5, //px
				speedThreshold = 0.45, //px/ms
				horizonOffset = 0,
				clientWidth = this.scrollItem.width(),
				itemHeight = this.scrollItem.height();

			var isTouchTargetTextinput = function(e){
				touchTarget = e.target.nodeName.toLowerCase();
				if(touchTarget == 'input' || touchTarget == 'textarea'){
					$.os.ios && (e.preventDefault());
					e.target.focus();
					return true;
				}else{
					setTimeout(function(){
						$("input:focus").blur();
						$("textarea").blur();
					}, 50);
					return false;
				}
			},
			textInputBlur = function(){
				setTimeout(function(){
					$("input:focus").blur();
					$("textarea").blur();
				}, 50);
			};
			this.element.on("touchstart", function(e){
				touch = e.changedTouches.length ? e.changedTouches[0] : e.touches[0];
				if(!hasTouched){
					hasTouched = true;
					identifier = touch.identifier;
				}else{
					// forbid multiple-touch
					return;
				}
				self.options.beforeScrollStart(e);
				startPoint = {x: touch.clientX, y: touch.clientY};
				movingVector = {x: 0, y:0};
				direction = 0;
				touchStartTime = +(new Date());
				self.scrollList.css({
					"transition": "",
					"-webkit-transition": ""
				});
				log("1, touchstart:" + touch.identifier);
				log("startPoint:" + startPoint.x + "," + startPoint.y);
			}).on("touchmove", function(e){
				touch = e.changedTouches.length ? e.changedTouches[0] : e.touches[0];
				//forbid multiple-touch
				if(touch.identifier != identifier) return;
				movingPoint = {x: touch.clientX, y: touch.clientY};
				movingVector = {x: movingPoint.x - startPoint.x, y: movingPoint.y - startPoint.y};
				log("2, touchmove:" + touch.identifier);
				//console.log("movingVector:" + movingVector.x + "," + movingVector.y);
				if(!direction && (Math.abs(movingVector.x) > directionThreshold || Math.abs(movingVector.y) > directionThreshold)){
					if(Math.abs(movingVector.x) > Math.abs(movingVector.y)){
						direction = 1;
					}else{
						direction = 2;
					}
				}
				if(direction == 1){
					if(movingVector.x > 0 && self.index == 0){
						self.scrollList.addClass("scroll-list-border-left");
						return;
					}else if(movingVector.x < 0 && self.index == self.len-1){
						self.scrollList.addClass("scroll-list-border-right");
						return;
					}
					self.scrollList.css({
						"transform": "translate3d(" + (horizonOffset + movingVector.x) + "px, 0, 0)",
						"-webkit-transform": "translate3d(" + (horizonOffset + movingVector.x) + "px, 0, 0)"
					});
					//to forbid the vertical scroll
				}else{
					var st = $(self.scrollItem[self.index]).scrollTop();
					//console.log(self.scrollItem[self.index].scrollHeight);
					if(st <=0 && movingVector.y >0){
						e.preventDefault();
					}
					if(st >= self.scrollItem[self.index].scrollHeight - itemHeight && movingVector.y < 0){
						e.preventDefault();
					}
					//e.stopPropagation();
				}
			}).on("touchend", function(e){
				touch = e.changedTouches.length ? e.changedTouches[0] : e.touches[0];
				//forbid multiple-touch
				if(touch.identifier == identifier) {
					hasTouched = false;
					identifier = -1;
				}else{
					return;
				}
				log("3, touchend:" + touch.identifier);
				if(direction == 1){
					touchDuration = +(new Date()) - touchStartTime;
					//console.log(Math.abs(movingVector.x)/touchDuration);
					//to adjust whether the scroll distance or the speed is over the threthold
					if(Math.abs(movingVector.x) > clientWidth*self.options.scrollThreshold || Math.abs(movingVector.x)/touchDuration > speedThreshold){
						if(movingVector.x > 0){
							if(self.index > 0){
								self.index--;
								horizonOffset += clientWidth;
							}
						}else{
							if(self.index < self.len-1){
								self.index++;
								horizonOffset -= clientWidth;
							}
						}
						self.scrollList.css({
							"transform": "translate3d(" + horizonOffset + "px, 0, 0)",
							"-webkit-transform": "translate3d(" + horizonOffset + "px, 0, 0)",
							"transition": "transform " + self.options.animate + "s",
							"-webkit-transition": "-webkit-transform " + self.options.animate + "s"
						});
						textInputBlur();
						self.afterHScroll();
					}else{
						self.scrollList.css({
							"transform": "translate3d(" + horizonOffset + "px, 0, 0)",
							"-webkit-transform": "translate3d(" + horizonOffset + "px, 0, 0)",
							"transition": "transform " + self.options.animate + "s",
							"-webkit-transition": "-webkit-transform " + self.options.animate + "s"
						});
						isTouchTargetTextinput(e);
					}
					self.scrollList.removeClass("scroll-list-border-left").removeClass("scroll-list-border-right");
				}else{
					//e.stopPropagation();
					if(Math.abs(movingVector.y) < 5){
						isTouchTargetTextinput(e);
					}else{
						textInputBlur();
					}
					self.options.afterScrollEnd(e);
				}
			}).on("touchcancel", function(e){
				log("4, touchcancel");
				touch = e.changedTouches.length ? e.changedTouches[0] : e.touches[0];
				//forbid multiple-touch
				if(touch.identifier == identifier) {
					hasTouched = false;
					identifier = -1;
				}else{
					return;
				}
			});
			document.addEventListener("touchmove", function(e){
				if(direction == 1){
					e.preventDefault();
				}
			}, false);
		}
	};
	var log = function(str){
		// console.log(str);
	};
	N.miniScroll = miniScroll;
})($, window, window.cmui || (window.cmui = {}));