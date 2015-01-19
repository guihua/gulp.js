;(function($, win, N) {
	/**
	 * the tab compoenet
	 * @param  {object} options
	 * 		   {
	 * 		   	  element: 'wrapper', //the wrapper element, required
	 * 		   	  onSelect: function(li, index){}, //call when you click the tab
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 7/20/2014 15:10
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var tab = function(options) {
		this.options = options || {};
		
		this.init();
	};
	tab.prototype = {
		init: function() {
			if (!this.options.element) {
				throw new Error("The element option must be provided when initialize the tab.");
			}
			
			var self = this;

			self.element = $(this.options.element);

			self.element.delegate('li', 'tap', function() {
				var li = $(this),
					index = $(this).index();

				li.siblings().removeClass('current');
				li.addClass('current');

				self.options.onSelect && self.options.onSelect(li, index);
			});
		}
	};

	N.tab = tab;
})($, window, window.cmui || (window.cmui = {})); 