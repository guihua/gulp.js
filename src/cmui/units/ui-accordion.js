;(function($, win, N){
	/**
	 * the accordion compoenet
	 * @param  {object} options
	 * 		   {
	 * 		   	  element: 'wrapper', //the wrapper element, required
	 * 		   	  type: "single", // single or multi select
	 * 		   	  active : 0, // the selected item
	 * 		   	  readonly: false, // could operate the component
	 * 		   	  toggleTitle: false, // if the title respond to the tap event
	 * 		   	  onSelect: function(li, index){}, //call when you choose the accordion item
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 7/20/2014 15:10
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var accordion = function(options){
		this.options = $.extend({
			element: ".ui-accordion",
			type: "single",
			//active : 0,
			readonly : false,
			toggleTitle: false, 
			onSelect: function(){}
		}, options);
		this.init();
	};
	accordion.prototype = {
		init: function(){
			if(!this.options.element){
				throw new Error("The element option must be provided when initialize the accordion.");
			}
			var self = this;
			self.element = $(this.options.element);
			if(self.options.type == "multi"){
				self.element.addClass("ui-accordion-multi")
			}
			self.title = $(this.options.element).find('.ui-accordion-title');
			self.element.delegate('.ui-accordion-title', 'tap', function() {
				self.options.toggleTitle && self.element.toggleClass('ui-accordion-active');
			}).delegate('li', 'tap', function() {
				if(self.options.readonly) return;
				var li = $(this);
				if(self.options.type == "single"){
					li.siblings().removeClass('current');
					li.addClass('current');
					self.title.children('h3').text(li.text());
					self.options.toggleTitle && self.hide();
				}else{
					li.toggleClass('current');
				}
				self.options.onSelect(li, li.index());
			});
			//to active the child
			if(typeof self.options.active != "undefined"){
				$("li", self.element).removeClass('current');
				$("li:nth-child(" + (self.options.active+1) + ")", self.element).addClass('current');
			}
			
		},
		show: function(){
			this.element.addClass('ui-accordion-active');;
		},
		hide: function(){
			this.element.removeClass('ui-accordion-active');;
		},
		getSelectedCodes: function(){
			var ret = [];
			this.element.find("li.current").each(function(index, item){
				ret.push($(item).data('code'));
			});
			return ret;
		}
	};
	N.accordion = accordion;
})($, window, window.cmui || (window.cmui = {}));