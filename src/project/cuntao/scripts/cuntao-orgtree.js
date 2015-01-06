//= include ../../../cmui/units/utils.js

(function () {
	$(document).ready(function() {
		villageTreePlugin.init();
	});
	
	var villageTreePlugin = (function () {
		var province = $('.province'),
			county = $('.county'),
			village = $('.village');
		
		var _init = function () {
			// province degree
			province.delegate('li', 'click', function(event) {
				var li = $(this);
				
				if (village.hasClass('active')) {
					village.removeClass('active');
						
					village.find('li').removeClass('current');
					village.find('.name').removeClass('selected');
						
					county.removeClass('active-width');
					county.find('li').removeClass('current');
					county.find('.name').removeClass('selected');
				}
				
				if (li.hasClass('all')) {
					li.siblings().removeClass('current');
					li.children('.name').addClass('selected');
					
					province.removeClass('active');
					
					if (county.hasClass('active-left')) {
						county.removeClass('active-left');
						
						county.find('li').removeClass('current');
						county.find('.name').removeClass('selected');
					}
					if (county.hasClass('active-width')) {
						county.removeClass('active-width');
						
						county.find('.name').removeClass('selected');
						
						village.removeClass('active');
						village.find('li').removeClass('current');
					}
					
					province.find('li').not('.all').addClass('operate-item');

					_getOrgInfo();
					
					return;
				}

				if (li.hasClass('operate-item')) {
					province.find('li').removeClass('operate-item');
				}

				li.siblings().children('.name').removeClass('selected');
				li.siblings().removeClass('current');
				li.addClass('current');

				province.addClass('active');
				county.addClass('active-left');
			});

			// county degree
			county.delegate('li', 'click', function(event) {
				var li = $(this);
				
				village.find('li').removeClass('current');
				village.find('.name').removeClass('selected');
				
				if (li.hasClass('all')) {
					li.siblings().removeClass('current');
					li.children('.name').addClass('selected');
					
					county.removeClass('active-width');
					
					if (village.hasClass('active')) {
						village.removeClass('active');
						
						village.find('li').removeClass('current');
						village.find('.name').removeClass('selected');
					}
					
					county.find('li').not('.all').addClass('operate-item');
					
					_getOrgInfo();
					
					return;
				}

				if (li.hasClass('operate-item')) {
					county.find('li').removeClass('operate-item');
				}

				li.siblings().children('.name').removeClass('selected');
				li.siblings().removeClass('current');
				li.addClass('current');

				county.addClass('active-width');
				village.addClass('active');
			});

			// village degree
			village.delegate('li', 'click', function(event) {
				var li = $(this);
				
				if (li.hasClass('all')) {
					li.siblings().removeClass('current');
					li.children('.name').addClass('selected');
					
					_getOrgInfo();
					
					return;
				}
				
				li.siblings().children('.name').removeClass('selected');
				li.siblings().removeClass('current');
				li.addClass('current');

				_getOrgInfo();
			});
		},
		_getOrgInfo = function() {
			console.log('xxxx info');
		};
		
		return {
			init: _init
		};
	})();
})(jQuery);
