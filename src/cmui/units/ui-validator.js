;(function($, win, N){
	/**
	 * the accordion compoenet
	 * @param  {object} options
	 * 		   {
	 * 		   	  element: 'wrapper', //the wrapper element, required
	 * 		   	  onSelect: function(li){}, //call when you click the tab
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 7/20/2014 15:10
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var accordion = function(options){
		this.options = options || {};
		this.init();
	};
	accordion.prototype = {
		init: function(){
			if(!this.options.element){
				throw new Error("The element option must be provided when initialize the accordion.");
			}
			var self = this;
			self.element = $(this.options.element);
			self.title = $(this.options.element).find('.ui-accordion-title');
			self.element.delegate('.ui-accordion-title', 'tap', function() {
					self.element.toggleClass('ui-accordion-active');
				}).delegate('li', 'tap', function() {
				var li = $(this);
				li.siblings().removeClass('cur');
				li.addClass('cur');
				self.title.children('h3').text(li.text());
				self.element.toggleClass('ui-accordion-active');
				self.options.onselect && self.options.onselect(li);
			});
		},
		show: function(){
			this.element.show();
		},
		hide: function(){
			this.element.hide();
		}
	};
	N.accordion = accordion;
})($, window, window.cmui || (window.cmui = {}));