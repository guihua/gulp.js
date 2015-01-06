;(function($, win, N) {
	/**
	 * the basic animation compoenet
	 * @param  {object} options
	 * 		   {
	 * 		   	  duration: 160, // ms
	 * 		   	  optimize: true, //whether to optimize
	 * 		   	  beforeAnimation: function(){},
	 * 		   	  afterAnimation: function(){}
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 10/15/2014 17:57
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	win.requestNextAnimationFrame = (function() {
		var self = this;
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.msRequestAnimationFrame || function(callback, ele) {
			setTimeout(function() {
				var start = + new Date(),
					end = 0;
				
				callback(start);
				
				end = + new Date();
				
				self.timeout = 1000 / 60 - (end - start);
			}, self.timeout);
		};
	})();
	
	var Animation = function(options) {
		var _options = {
			interval : 16,
			duration : 160, // ms
			optimize : true, //whether to optimize
			animate : function() {},
			beforeAnimation : function() {},
			afterAnimation : function() {}
		};
		
		this.options = $.extend(_options, options);
		
		this.init();
	};
	
	Animation.prototype = {
		init : function() {
			var self = this,
				times = 0,
				start = + new Date(),
				end = 0;
			
			options = self.options;
			
			//optimize
			if (options.optimize) {
				options.times = 10;
				
				options.interval = options.duration / options.times;
			} else {
				options.times = Math.ceil(options.duration / options.interval);
			}
			
			var move = function(time) {
				if (times >= self.options.times) {
					self.options.afterAnimation();
					
					return;
				}
				
				end = + new Date();
				
				if (end - start >= self.options.interval) {
					times++;
					start = end;
					
					// animation body
					self.options.animate(times / self.options.times);
				}
				
				win.requestNextAnimationFrame(move);
			};
			
			self.options.beforeAnimation();
			
			win.requestNextAnimationFrame(move);
		}
	};

	N.animation = Animation;
})($, window, window.cmui || (window.cmui = {})); 