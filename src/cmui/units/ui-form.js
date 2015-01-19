;(function($, win, N){
	/**
	 * the form common functions
	 * @version  1.0
	 * @date 9/9/2014 16:44
	 * @author  diving(dive.liuj@alibaba-inc.com)
	 */
	var FormUtil = {
		showSelectDialog : function(obj, key, pluginId, namespace, callback) {
			var dialogTitle = '请选择',
			serviceType = 'showSingleSelect',
			fieldKey = key || obj.data('key') || "",
			fieldCode = obj.data('code') || "",
			operate = obj.data("operate");
			if(operate){
				if(operate == 'multi') {
					serviceType = 'showMultiSelect';
				} else if(operate == 'date') {
					this.chooseDate(obj, pluginId, namespace, callback);
					return;
				} else if (operate == 'address') {
					this.chooseArea(obj, pluginId, namespace, callback);
					return;
				}
			}
			nativeCall('FormBizService', 'getOptionsByType', {
					"namespace": namespace,
					"dataType": fieldKey
				},
				function success(json) {
					var jsonParam = json.result.data;

					nativeCall('UIService', serviceType, {
							title: dialogTitle,
							items: jsonParam,
							selectedValue: fieldCode
						}, 
						function success(msg) {
							var result = msg.result;
							if (operate == 'multi'){
								obj.html(result.selectedNames).removeClass("ui-form-placeholder");
								var codes = [];
								for( var j = result.data.length-1; j>=0; j--){
									codes.push(result.data[j].code);
								}
								obj.data("code", codes.join(","));
							}else{
								obj.html(result.name).data('code', result.code).removeClass("ui-form-placeholder");
							}
							callback && callback(msg.result);
						}
					);
				}
			);
		},
		chooseDate : function(obj, pluginId, namespace, callback){
			var date = obj.html(),
				param = {},
				month = 0,
				day = 0;
			if(date){
				date = date.split("-");
				param.year = date[0];
				param.monthOfYear = parseInt(date[1])-1;
				param.dayOfMonth = date[2];
			}
			nativeCall('UIService', 'showDatePicker', param, 
				function success(msg) {
					var result = msg.result;
					month = result.monthOfYear + 1;
					if(month < 10){
						month = "0" + month;
					}
					day = result.dayOfMonth;
					if(day < 10){
						day = "0" + day;
					}
					var seldate = result.year + '-' + month + '-' + day,
					tempdate = new Date(seldate).getTime();
					obj.html(seldate).data('code', tempdate).removeClass("ui-form-placeholder");
					
					callback && callback(result);
				},function fail(){}
			);
		},
		chooseArea: function(obj, pluginId, namespace, callback) {
			var bizType = obj.data("biztype");
			nativeCall('FormBizService', 'chooseArea', {
					"bizType": bizType,
					"needCountry": false
				}, 
				function success(json) {
					var selData = json.result;
					if (selData == '') {
						return;
					}
					obj.html(selData.selectedAreaDesc)
						.removeClass("ui-form-placeholder")
						.data('code', selData.province + "-" + selData.city + "-" + selData.district);
					callback && callback(selData);
				}
			);
		},
		getFormItemName: function(field, key, code, namespace, callback){
			field.data("code", code);
			nativeCall('FormBizService', 'getNamebyCode', {
					"code": code,
					"dataType": key,
					"namespace": namespace
				},function success(json) {
					var name = json.result.name;
					if (name) {
						field.html(name).removeClass("ui-form-placeholder");
					}
					callback && callback(json.result);
				},function fail(){}
			);
		}
	};
	N.FormUtil = FormUtil;
})($, window, window.cmui || (window.cmui = {}));