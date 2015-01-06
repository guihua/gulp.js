;(function($, win, N) {
	/**
	 * the number wheel compoenet
	 * @param  {object} options
	 * 		   {
	 * 		   	  defaultClass: 'ui-num-wheel', //the default wheel element class, optional
	 * 		   	  duration: 300 //the animation time, optional
	 * 		   }
	 * @return {[type]}
	 * @version  1.0
	 * @date 10/14/2014 16:08
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var NumWheel = function(options) {
		var _options = {
			defaultClass : "ui-num-wheel",
			itemClass : "ui-num-wheel-item",
			dotClass : "ui-num-wheel-dot",
			duration : 300
		};
		
		this.options = $.extend(true, _options, options);
		
		this.init();
	};
	
	NumWheel.prototype = {
		init : function() {
			var self = this;
			
			$("." + self.options.defaultClass).each(function(index, item) {
				if ($(item).data("num") != "") {
					self.createNumWheel($(item));
					
					self.setWheelAnimation(item);
				}
			});
		},
		createNumWheel : function(item) {
			//to get the number
			var num = $(item).data("num") || 0,
				numArr = String(num).split(".");
			
			//to construct the div
			item.empty().append(this.createWheel(numArr[0]));
			
			if (numArr.length > 1) {
				item.append('<span class="' + this.options.dotClass + '">.</span>');
				item.append(this.createWheel(numArr[1]))
			}
		},
		createWheel : function(numStr) {
			var ret = [];
			
			for (var i = 0, l = numStr.length; i < l; i++) {
				ret.push('<span class="' + this.options.itemClass + '">' + numStr[i] + '</span>');
			}
			
			return ret.join("");
		},
		setWheelAnimation : function(item) {
			var self = this;
			
			//to get the element
			var numEles = $(item).find("." + self.options.itemClass),
				l = numEles.length,
				i = 0,
				nums = Array(l),
				options = self.options.animationOpt;
			
			//to set the step
			for ( i = 0; i < l; i++) {
				nums[i] = parseInt($(numEles[i]).html());
			}

			//to set the animation
			var ani = new cmui.animation({
				duration : self.options.duration,
				animate : function(percent) {
					for ( i = 0; i < l; i++) {
						$(numEles[i]).html(Math.ceil(nums[i] * percent));
					}
				},
				beforeAnimation : function() {
					//console.log(1);
				},
				afterAnimation : function() {
					//console.log(2);
				}
			});
		}
	};

	N.numWheel = NumWheel;
})($, window, window.cmui || (window.cmui = {})); 