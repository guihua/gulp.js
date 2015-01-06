(function($, win, N){
	/**
	 * the scroll list compoenet
	 * rely on iscroll
	 * @param  {object} options
	 * 		   {
	 * 		   	  element: 'wrapper', //the wrapper element or id, required
	 * 		   	  tips: {}, // the pullup and pulldown tips
	 * 		   	  onPullup: function(){}, //call when you pull up the list
	 * 		   	  onPulldown: function(cb){} //called when you pull down the list
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 7/31/2014 15:10
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var Scroll = function(options){
		var opts = {
			tips: {
				pullup: "上拉加载更多...",
				pulldown: "下拉加载更多...",
				loading: "正在加载...",
				flip: "松开更新列表..."
			},
			totalPage: 1,
			currentPage: 1,
			onPullup: function(){},
			onPulldown: function(){}
		};
		this.options = $.extend(true, opts, options);
		this.currentPage = this.options.currentPage;
		this.totalPage = this.options.totalPage;
		this.init();
	};
	Scroll.prototype = {
		/**
		 * init the scroll component
		 * @return {[type]} [description]
		 */
		init: function(){
			if(!this.options.element){
				throw new Error("The element must be provided when init the scrollList component.");
			}
			this.wrapper = $('#' + this.options.element);
			this.pulldown = this.wrapper.find(".ui-scroll-pulldown");
			this.pulldown_label = this.pulldown.find(".ui-loading-label");
			this.pullup = this.wrapper.find(".ui-scroll-pullup");
			this.pullup_label = this.pullup.find(".ui-loading-label");
			this.loadingHeight = 50;
			this.tmpMaxScrollY = 0;
			this.scroller = this.wrapper.find(".ui-scroller");
			this.list = this.wrapper.find('ul');
			this.no_result = this.wrapper.find(".no-result");
			this.isLoading = false;
			this.list_scroll = this.createScroll();
		},
		createScroll: function(){
			var self = this;
			var lscroll = new iScroll(this.options.element, {
				vScrollbar : false,
				hScrollbar : false,
				bounce: true,
				onBeforeScrollStart: function(e){
					e.preventDefault();
				},
				onRefresh: function () {
					if (self.pulldown.hasClass('ui-scroll-loading')) {
						self.pulldown.removeClass('ui-scroll-loading');
						self.scroller.removeClass("ui-scroller-pulldown-loading");
						self.pulldown_label.text(self.options.tips.pulldown);
					} else if (self.pullup.hasClass('ui-scroll-loading')) {
						//self.pullup.hide();
						self.pullup.removeClass('ui-scroll-loading');
						self.pullup_label.text(self.options.tips.pullup);
					}
					self.tmpMaxScrollY = this.maxScrollY;
					self.isLoading = false;
				},
				onScrollMove: function () {
					//console.log("this.y:" + this.y);
					//console.log("this.minScrollY:" + this.minScrollY + ",this.maxScrollY:" + this.maxScrollY);
					if(this.y > 0){
						if(this.y > 40){
							self.pulldown.addClass('ui-scroll-flip');
							self.pulldown_label.text(self.options.tips.flip);
						}else{
							self.pulldown.removeClass('ui-scroll-flip');
							self.pulldown_label.text(self.options.tips.pulldown);
						}
					}else{
						// if(this.y < this.maxScrollY - 10){
						// 	self.pullup.show();
						// }else{
						// 	self.pullup.hide();
						// }
						if(this.currentPage > this.totalPage){
							return;
						}
						this.maxScrollY = self.tmpMaxScrollY + 100;
						if(this.y < this.maxScrollY-35){ //+50+15
							self.pullup.addClass('ui-scroll-flip');
							self.pullup_label.text(self.options.tips.flip);
						}else{
							self.pullup.removeClass('ui-scroll-flip');
							self.pullup_label.text(self.options.tips.pullup);
						}
					}
				},
				onBeforeScrollEnd: function () {
					if(self.isLoading){
						return;
					}
					if (self.pulldown.hasClass('ui-scroll-flip')) {
						self.scroller.addClass("ui-scroller-pulldown-loading");
						self.pulldown.removeClass('ui-scroll-flip').addClass("ui-scroll-loading");
						self.pulldown_label.text(self.options.tips.loading);				
						self.currentPage = 1;
						self.isLoading = true;
						self.isEnd = false;
						self.options.onPulldown(1);
					} else if (self.pullup.hasClass('ui-scroll-flip')) {
						self.pullup.removeClass('ui-scroll-flip');
						if(self.currentPage + 1 > self.totalPage){
							if(!self.isEnd){
								window.WindVane.call('UIService', 'showToast', {
										"forLong": false,
										"msg": '没有下一页了...'
									}
								);
								self.pullup.css("visibility", "hidden");
								self.isEnd = true;
							}
							return;
						}
						self.currentPage++;
						self.isLoading = true;
						this.maxScrollY = self.tmpMaxScrollY + 50;
						self.scroller.css({
							"transform": "translate(0px, " + this.maxScrollY + "px)",
							"-webkit-transform": "translate(0px," + this.maxScrollY + "px)"
						});
						//self.scroller.addClass("ui-scroller-pullup-loading");
						self.pullup.addClass('ui-scroll-loading');
						self.pullup_label.text(self.options.tips.loading);
						self.options.onPullup(self.currentPage);
					}
				}
			});
			document.addEventListener('touchmove', function (e) {
				e.preventDefault();
			}, false);
			return lscroll;
		},
		setTotalPage: function(page){
			//alert("total:" + page);	
			this.totalPage = page || 1;
		},
		gotoTop: function(){
			var self = this;
			setTimeout(function(){
				self.list_scroll.scrollTo(0,1);
			}, 200);
		},
		clear: function(msg){
			this.pullup.css("visibility", "hidden");
			this.list.hide();
			this.no_result.find(".no-result-desc").html(msg || '没有记录');			
			this.no_result.show();
		},
		updateList: function(data, isAppend){
			if(!isAppend){
				this.list.empty();
				if(!data){
					this.clear();
				}else{
					this.no_result.hide();
					this.list.append(data).show();
					this.gotoTop();
				}
			}else{
				this.list.append(data);
			}
			if(this.totalPage > 1){
				this.pullup.css("visibility", "visible");
			}else{
				this.pullup.css("visibility", "hidden");
			}
			this.list_scroll.refresh();
		},
		updatePosition: function(style){
			this.wrapper.css(style || {});
			this.list_scroll.refresh();	
		}
	};
		
	N.scrollList = Scroll;
})($, window, window.cmui || (window.cmui = {}));