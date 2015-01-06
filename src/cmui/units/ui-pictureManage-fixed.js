;(function ($, win, N) {
    /**
     * the upload compoenet
     * 单独图片加载及上传组件，适用于单独类型的单个图片加载和上传
     * @param  {object} options
     *           {
	 * 		   	  element: 'wrapper', // the wrapper element, required
	 * 			  pluginId: '', // pluginId
	 * 			  namespace: '', // 	namespace
	 * 			  globalId: '', // globalId
	 * 			  photoObj: '', // photoObj
	 * 			  scrollObj: '',
	 * 		   	  onSuccess: function(){}, // call when you upload picture success
	 * 		   }
     * @return {[type]}
     * @version  1.0
     * @date 8/21/2014
     * @author guihua(guihua.pgh@alibaba-inc.com)
     */
    var pictureManage = function (options) {
        var settings = {
            element: '',            // 上传容器，必需元素，若不指定上传容器，则无法找到
            pluginId: '',           // 插件ID，必需
            namespace: '',          // 插件命名空间，根据业务需要，可为空
            globalId: '',           // required
            serverData: '',         // 服务端图片
            localData: '',          // 本地暂存图片
            suffix: '_100x100.jpg', // 压缩图片后缀
            disabled: false,        // 上传标识，是否可用
            template: '<a href="javascript:;" class="ui-upload-img" data-id="{pic_id}" data-src="{img_url_path}"><img src="{img_url_show}" alt="" /></a>',
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
                var cell = $(this),
                    item = cell.children('a:visible');

                if (item.hasClass('ui-upload-plus') && !self.options.disabled) {
                    self.uploadPic(cell);
                } else {
                    self.showPic(cell);
                }
            }).delegate('.ui-upload-item', 'longTap', function () {
                var cell = $(this),
                    item = cell.children('a:visible');

                if (!item.hasClass('ui-upload-plus') && !self.options.disabled) {
                    self.deletePic(cell);
                }
            });

            self.loadingPicData();
        },
        uploadPic: function (obj) {
            var self = this,
                uploadType = obj.attr('data-tcode');

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

                if (obj.children('p').length > 0) {
                    obj.data('defaultText', obj.children('p').text());
                }

                self.newPhotoObj.push(picData);
                self.loadingPic(obj, picData);
            });
        },
        loadingPic: function (obj, data) {
            var self = this,
                tempItem = self.options.template;

            tempItem = tempItem.replace(/{pic_id}/g, data.fileId)
                .replace(/{img_url_path}/g, data.srcPath)
                .replace(/{img_url_show}/g, data.showUri);

            // 限制加载一张图片
            if (obj.children('.ui-upload-img').length > 0) {
                var upPicture = obj.children('.ui-upload-img').eq(0);

                var picData = {};
                picData.fileId = upPicture.attr('data-id');
                picData.fileType = obj.attr('data-tcode');
                picData.isDeleted = 'y';
                picData.showUri = upPicture.children('img').attr('src');
                picData.srcPath = upPicture.attr('data-src');
                picData.ordering = '1';
                picData.uploadStatus = '';
                picData.uploadText = '';
                self.newPhotoObj.push(picData);

                obj.children('.ui-upload-img').remove();
            }
            obj.prepend(tempItem);

            if (obj.children('p').length > 0) {
                obj.children('p').addClass(data.uploadStatus).text(data.uploadText);
            } else {
                var uploadStatus = $('<p></p>').attr('class', data.uploadStatus).text(data.uploadText);
                obj.append(uploadStatus);
            }
            obj.children('.ui-upload-plus').hide();
            self.options.onCompleteCallback();
        },
        showPic: function (obj) {
            var self = this,
                url = obj.children('a:visible').attr('data-src').replace('_100x100.jpg', ''),
                cacheKey = obj.children('a:visible').attr('data-id');

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
                    var fileId = obj.children('a:visible').attr('data-id'),
                        fileType = obj.attr('data-tcode'),
                        fileShowUri = obj.find('img').attr('src'),
                        fileSrcPath = obj.children('a:visible').attr('data-src');

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
                                // delete newPicData[i];
                                self.newPhotoObj.splice(i, 1);
                            }
                        }
                    }
                    obj.children('.ui-upload-plus').show();
                    if (obj.data('defaultText')) {
                        obj.children('p').text(obj.data('defaultText')).attr('class', '');
                    } else {
                        obj.children('p').remove();
                    }
                    obj.children('.ui-upload-img').remove();
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
        getUploadPhoto: function () {
            return this.newPhotoObj;
        },
        setUploadPhoto: function (obj) {
            this.newPhotoObj = obj;
        },
        loadingPicData: function () {
            var self = this,
                serverData = self.options.serverData,
                localData = self.options.localData;

            self.element.find('.ui-upload-item').each(function () {
                var uploadItem = $(this),
                    photoType = uploadItem.attr('data-tcode'),
                    srcPath = photoType + '_srcPath';

                // server data
                if (serverData.length > 0) {
                    for (var i = 0; i < serverData.length; i++) {
                        if (serverData[i].attType == photoType) {
                        	var picUrl = serverData[i].url;
                        	
                        	if (picUrl.indexOf(self.options.suffix) < 0) {
				            	picUrl += self.options.suffix;
				            }
                            self.getPhotoCache(uploadItem, picUrl, serverData[i].intlFileId, serverData[i].intlFileId);

                            if (uploadItem.children('p').length > 0) {
                                uploadItem.data('defaultText', uploadItem.children('p').text())
                            }
                        }
                    }
                }
                
                // 不可编辑状态时，阻止加载缓存图片
                if (self.disabled) {
                		return;
                }
                
                // local data
                if (localData[srcPath]) {
                    var storageData = localData[srcPath];

                    if (storageData.indexOf(',') > 0) { // 多张图片和多张图片判断
                        var imgArray = storageData.split(',');

                        for (var j = 0; j < imgArray.length; j++) {
                            var cacheKey = imgArray[j].substring((imgArray[j].lastIndexOf('/') + 1), imgArray[j].length);

                            self.getPhotoCache(uploadItem, imgArray[j], cacheKey, '');
                            
                            if (uploadItem.children('p').length > 0) {
                                uploadItem.data('defaultText', uploadItem.children('p').text())
                            }
                        }
                    } else {
                        var cacheKey = storageData.substring((storageData.lastIndexOf('/') + 1), storageData.length);

                        self.getPhotoCache(uploadItem, storageData, cacheKey, '');
                        
                        if (uploadItem.children('p').length > 0) {
                            uploadItem.data('defaultText', uploadItem.children('p').text())
                        }
                    }
                }
            });
        },
        getPhotoCache: function (obj, url, key, id) {
            var self = this;
            
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
                self.loadingPic(obj, picData);
            });
        }
    };

    N.pictureManageFixed = pictureManage;
})($, window, window.cmui || (window.cmui = {}));