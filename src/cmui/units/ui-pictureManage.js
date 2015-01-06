;(function ($, win, N) {
    /**
     * the upload compoenet
     * 通用图片加载和上传组件，适用于同一类型及标识的图片加载和上传
     * @param  {object} options
     *           {
	 * 		   	  element: 'wrapper', // the wrapper element, required
	 * 			  pluginId: '', // pluginId
	 * 			  namespace: '', // 	namespace
	 * 			  globalId: '', // globalId
	 * 		   	  onCompleteCallback: function(){}, // call when you upload picture success
	 * 		   }
     * @return {[type]}
     * @version  1.0
     * @date 8/21/2014
     * @author guihua(guihua.pgh@alibaba-inc.com)
     */
    var pictureManage = function (options) {
        var settings = {
            element: '', // 上传容器，必需元素，若不指定上传容器，则无法找到
            pluginId: '', // 插件ID，必需
            namespace: '', // 插件命名空间，根据业务需要，可为空
            globalId: '', // required
            suffix: '_100x100.jpg', // 压缩图片后缀
            disabled: false, // 上传标识，是否可用
            template: '<div class="ui-upload-item"><a href="javascript:;" class="ui-upload-img" data-id="{pic_id}" data-type="{pic_type}" data-src="{img_url_path}"><img src="{img_url_show}" alt="" /></a><p class="{upload_status}">{upload_text}</p></div>',
            onCompleteCallback: function () {
                // 上传或删除图片完成后的回调处理
            }
        };

        this.options = $.extend(true, settings, options);
        this.newPhotoObj = [];
        this.init();
    };

    pictureManage.prototype = {
        init: function () {
            if (!this.options.element) {
                throw new Error("The element option must be provided when initialize the tab.");
            }
            var self = this;
            self.element = $(this.options.element);

            // upload 容器判断
            if (self.element.length <= 0) {
                return;
            }
            
            self.element.delegate('.ui-upload-item', 'tap', function () {
                var cell = $(this);

                if (cell.hasClass('ui-upload-item-plus') && !self.options.disabled) {
                    self.uploadPic(cell);
                } else {
                    self.showPic(cell);
                }
            }).delegate('.ui-upload-item', 'longTap', function (event) {
                var cell = $(this);

                if (!cell.hasClass('ui-upload-item-plus') && !self.options.disabled) {
                    self.deletePic(cell);
                }
            });
        },
        uploadPic: function (obj) {
            var self = this,
                uploadType = obj.parents('.ui-upload').attr('data-tcode'),
                uploadIdentify = obj.parents('.ui-upload').attr('data-identify');
            
            nativeCall('CommonService', 'getClientInfo', {},
		        function success(json) {
		        	if (!(json.result.platform == 'ANDROID' && Number(json.result.clientVersion) <= 28)) {
		        		self.options.disabled = true;
		        	}
		        }
		    );

            nativeCall('FormBizService', 'takePhoto', {
                "photoType": uploadType,
                "namespace": self.options.namespace,
                "pluginId": self.options.pluginId,
                "globalId": self.options.globalId
            }, function success(json) {
                var picData = {};
                
                picData.fileId = '';
                picData.fileType = json.result.photoType;
                picData.isDeleted = 'n';
                picData.showUri = json.result.showUri;
                picData.srcPath = json.result.srcPath;
                picData.ordering = '1';
                picData.uploadStatus = 'ui-upload-undone';
                picData.uploadText = '未上传';

                self.newPhotoObj.push(picData);
                self.loadingPic(obj, uploadIdentify, picData);
                
                nativeCall('CommonService', 'getClientInfo', {},
			        function success(json) {
			        	if (!(json.result.platform == 'ANDROID' && Number(json.result.clientVersion) <= 28)) {
			        		self.options.disabled = false;
			        	}
			        }
			    );
            }, function fail (json) {
            	nativeCall('CommonService', 'getClientInfo', {},
			        function success(json) {
			        	if (!(json.result.platform == 'ANDROID' && Number(json.result.clientVersion) <= 28)) {
			        		self.options.disabled = false;
			        	}
			        }
			    );
            });
        },
        loadingPic: function (obj, uploadIdentify, data) {
            var self = this,
                tempItem = self.options.template;

            tempItem = tempItem.replace(/{pic_id}/g, data.fileId)
                .replace(/{pic_type}/g, data.fileType)
                .replace(/{img_url_path}/g, data.srcPath)
                .replace(/{img_url_show}/g, data.showUri)
                .replace(/{upload_status}/g, data.uploadStatus)
                .replace(/{upload_text}/g, data.uploadText);
            obj.before(tempItem);
            uploadIdentify == 'single' ? obj.hide() : obj.show();
            self.options.onCompleteCallback();
        },
        showPic: function (obj) {
            var self = this,
                url = obj.children('a').attr('data-src').replace('_100x100.jpg', ''),
                cacheKey = obj.children('a').attr('data-id');

            nativeCall('CommonService', 'showPhoto', {
                "imgUrl": url,
                "cacheKey": cacheKey
            });
        },
        deletePic: function (obj) {
            var self = this;

            nativeCall('UIService', 'confirm', {
                'title': '删除照片',
                'msg': '删除操作不可逆，你确认删除该照片？'
            }, function success(ret) {
                if (ret.result.ok) {
                    var fileId = obj.children('a').attr('data-id'),
                        fileType = obj.children('a').attr('data-type'),
                        fileShowUri = obj.find('img').attr('src'),
                        fileSrcPath = obj.children('a').attr('data-src');

                    // 线上图片，记录，保存后删除；本地图片，直接删除
                    if (fileId) {
                        var deleteObj = {};
                        deleteObj.fileId = fileId;
                        deleteObj.fileType = fileType;
                        deleteObj.isDeleted = 'y';
                        deleteObj.showUri = fileShowUri;
                        deleteObj.srcPath = fileSrcPath;
                        deleteObj.ordering = '1';

                        self.newPhotoObj.push(deleteObj);
                    } else {
                        nativeCall('FormBizService', 'deleteLocalPhoto', {
                            "namespace": self.options.namespace,
                            "pluginId": self.options.pluginId,
                            "globalId": self.options.globalId,
                            "showUri": fileShowUri,
                            "photoType": fileType,
                            "srcPath": fileSrcPath
                        });

                        for (var i = 0; i < self.newPhotoObj.length; i++) {
                            if (self.newPhotoObj[i] && self.newPhotoObj[i].srcPath == fileSrcPath) {
                                // delete self.newPhotoObj[i];
                                self.newPhotoObj.splice(i, 1);
                            }
                        }
                    }
                    obj.next().show();
                    obj.remove();
                    self.options.onCompleteCallback();
                }
            });
        },
		setDisabled: function () {
			var self = this;

			self.options.disabled = true;
		},
		setEnable: function () {
			var self = this;

			self.options.disabled = false;
		},
        setUploadPhoto: function (newPhotoObj) {
            this.newPhotoObj = newPhotoObj;
        },
        getUploadPhoto: function () {
            return this.newPhotoObj;
        },
        loadingPictureData: function (localStorageData, picList) {
            var self = this,
                uploadWrap = self.element;

            uploadWrap.each(function () {
                var uploadItem = $(this),
                    photoType = uploadItem.attr('data-tcode'),
                    identify = uploadItem.attr('data-identify'),
                    srcPath = photoType + '_srcPath';

                // remove data before load
                uploadItem.find('.ui-upload-item').not('.ui-upload-item-plus').remove();

                // server data
                if (picList.length > 0) {
                    for (var i = 0; i < picList.length; i++) {
                        if (picList[i].attType == photoType) {
                        	var picUrl = picList[i].url;
                        	
                        	if (picUrl.indexOf(self.options.suffix) < 0) {
				            	picUrl += self.options.suffix;
				            }
                            self.getPhotoCache(uploadItem, picUrl, picList[i].intlFileId, picList[i].intlFileId);

                            if (identify == 'single') {
                                uploadItem.find('.ui-upload-item-plus').hide();
                            }
                        }
                    }
                }
                
                // 不可编辑状态时，阻止加载缓存图片
                if (self.disabled) {
                	return;
                }

                // local data
                if (localStorageData[srcPath]) {
                    var localData = localStorageData[srcPath];

                    if (localData.indexOf(',') > 0) {// 多张图片和多张图片判断
                        var imgArray = localData.split(',');

                        if (identify == 'single') {
                            var cacheKey = imgArray[0].substring((imgArray[0].lastIndexOf('/') + 1), imgArray[0].length);

                            self.getPhotoCache(uploadItem, imgArray[0], cacheKey, '');

                            var singleItem = uploadItem.find('.ui-upload-item').not('.ui-upload-item-plus'),
                                picData = {};

                            picData.fileId = singleItem.children('.ui-upload-item').attr('data-id');
                            picData.fileType = photoType;
                            picData.isDeleted = 'y';
                            picData.showUri = singleItem.find('img').attr('src');
                            picData.srcPath = singleItem.children('.ui-upload-item').attr('data-src');
                            picData.ordering = '1';
                            picData.uploadStatus = '';
                            picData.uploadText = '';

                            self.newPhotoObj.push(picData);
                        } else {
                            for (var j = 0; j < imgArray.length; j++) {
                                var cacheKey = imgArray[j].substring((imgArray[j].lastIndexOf('/') + 1), imgArray[j].length);

                                self.getPhotoCache(uploadItem, imgArray[j], cacheKey, '');
                            }
                        }
                    } else {
                        var cacheKey = localData.substring((localData.lastIndexOf('/') + 1), localData.length);

                        self.getPhotoCache(uploadItem, localData, cacheKey, '');

                        if (identify == 'single') {
                            var singleItem = uploadItem.find('.ui-upload-item').not('.ui-upload-item-plus'),
                                picData = {};

                            picData.fileId = singleItem.children('.ui-upload-item').attr('data-id');
                            picData.fileType = photoType;
                            picData.isDeleted = 'y';
                            picData.showUri = singleItem.find('img').attr('src');
                            picData.srcPath = singleItem.children('.ui-upload-item').attr('data-src');
                            picData.ordering = '1';
                            picData.uploadStatus = '';
                            picData.uploadText = '';

                            self.newPhotoObj.push(picData);
                        }
                    }

                    if (identify == 'single') {
                        uploadItem.find('.ui-upload-item-plus').hide();
                    }
                }
            });
        },
        getPhotoCache: function (obj, url, key, id) {
            var self = this,
                identify = obj.attr('data-identify');
            
            nativeCall('CommonService', 'getPhotoCache', {
                "imgUrl": url,
                "cacheKey": key,
                "fileId": id
            }, function success(json) {
                var uploadStatus = 'ui-upload-undone',
                    uploadText = '未上传',
                    isDeleted = 'n',
                    photoType = obj.attr('data-tcode'),
                    fileId = json.result.fileId,
                    picData = {};

                if (fileId) {
                    uploadStatus = '';
                    uploadText = '已上传';
                }

                picData.fileId = fileId;
                picData.fileType = photoType;
                picData.isDeleted = isDeleted;
                picData.showUri = json.result.showUri;
                picData.srcPath = json.result.imgUrl;
                picData.ordering = '1';
                picData.uploadStatus = uploadStatus;
                picData.uploadText = uploadText;

                // save new pic
                if (!fileId) {
                    self.newPhotoObj.push(picData);
                }
                self.loadingPic(obj.find('.ui-upload-item-plus'), identify, picData);
            });
        }
    };

    N.pictureManage = pictureManage;
})($, window, window.cmui || (window.cmui = {})); 