/**
 * most used utility functions
 * @date 07/24/2014
 * @author  diving(dive.liuj@alibaba-inc.com)
 */

/**
 * 提供 window.WindVane.call 的简写
 * @return {[type]} [description]
 */
var nativeCall = function(){
	return window.WindVane.call.apply(window.WindVane, arguments);
};
// 常用功能集合, 扩展自CRMUtils
$.extend(CRMUtils, {
	/**
	 * 处理页面可点击的元素的点击效果，在元素上添加自定义属性data-role=tap
	 * @return {[type]} [description]
	 */
	handleTapEvent : function() {
		$("body").on('touchstart', '[data-role=tap]', function() {
                $(this).addClass('touched');
            }).on('touchcancel', '[data-role=tap]', function() {
                $(this).removeClass('touched');
            }).on('touchend', '[data-role=tap]', function() {
                $(this).removeClass('touched');
            }).on('touchmove', '[data-role=tap]', function() {
                $(this).removeClass('touched');
            });
	},
	/**
	 * 处理页面的按钮点击效果，点击态
	 * @return {[type]} [description]
	 */
	handleButtonTapEvent : function() {
		$("body").on('touchstart', '.ui-button', function() {
				if(!$(this).hasClass('ui-button-disabled')){ //可用状态有点击效果
					$(this).addClass('ui-button-active');
				}
            }).on('touchcancel', '.ui-button', function() {
                $(this).removeClass('ui-button-active');
            }).on('touchend', '.ui-button', function() {
                $(this).removeClass('ui-button-active');
            }).on('touchmove', '.ui-button', function() {
                $(this).removeClass('ui-button-active');
            });
	},
	/**
	 * 字段检查过滤
	 * @param  {[type]} obj  待检查字段值
	 * @param  {[type]} flag 空值时默认值
	 * @return {[type]}      返回值
	 */
	fieldFilter: function(obj, flag) {
		return typeof obj == 'undefined' ? (flag || '') : obj;
	},
	/**
	 * 构造url参数字符串
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	buildUrlParam : function(params){
		if(!params) return "";
		var ret = [];
		for(var key in params){
			ret.push(key + "=" + encodeURIComponent(params[key]));
		}
		return ret.join("&");
	},
	/**
	 * 解析锚点参数
	 * @return {[type]} [description]
	 */
	parseAnchor : function(){
		var retParams = {};
		var href = window.location.href;
		if(!href){
			return retParams;
		}
		var split = href.split('#');
		if(!split || split.length<=1){
			return retParams;
		}
		split = split[1];
		split = split.split('&');
		for(var i=0,length=split.length;i<length;i++){
			var param = split[i];
			if(!param){
				continue;
			}
			param = param.split('=');
			if(param.length != 2){
				continue;
			}
			retParams[param[0]] = decodeURIComponent(param[1]);
		}
		return retParams;
	},
	fixBottomBar : function(){
		$(".ui-footer").css({
			"position": "absolute",
			"top": document.documentElement.clientHeight-50
		});
	},
	/**
	 * 串行处理流程逻辑，上一个流程的处理结果是下一个流程的输入，支持异常处理
	 * rely on promise/defferred
	 * @param  {[type]}   asyncList 待处理流程列表
	 * @param  {Function} callback  全部处理完后的回调
	 * @return {[type]}             [description]
	 */
	series : function(asyncList, callback){
	    var i = 0,
	        l = asyncList.length,
	        asyncItem = asyncList[0],
	        data = null;
	    if(l == 0){
	        callback && callback();
	    }
	    function next(){
	        asyncItem(data).then(function(_data){
	            i++;
	            if(i == l){
	                callback && callback(null, _data);
	            }else{
	                asyncItem = asyncList[i];
	                data = _data;
	                next();
	            }
	        }, function(_data){
	            var err = new Error("error occured in index: " + i);
	            callback && callback(err, _data);
	        });
	    }
	    next();
	}
});