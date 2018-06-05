/**
 * 工具集
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	/**
	 * 对象转JSON字符串
	 * 
	 * @param jsonObj
	 *            对象
	 * @return JSON字符串
	 */
	$.objToStr = function(jsonObj) {
		
		/**
		 * 值转JSON字符串
		 * 
		 * @param value
		 *            值
		 * @return JSON字符串
		 */
		function _valueToStr(value) {
			if ($.type(value) == "string") {// 字符串
				return "\"" + value + "\"";
			} else if ($.type(value) == "number" || $.type(value) == "boolean") {// 数值和boolean
				return value;
			} else if ($.type(value) == "date") {// 日期
				return value.getTime();
			} else if ($.isPlainObject(value)) {// 对象
				return _objToStr(value);
			} else if ($.isArray(value)) {// 数组
				return _arrayToStr(value);
			}
		}
		
		/**
		 * 数组转JSON字符串
		 * 
		 * @param jsonObj
		 *            数组
		 * @return JSON字符串
		 */
		function _arrayToStr(jsonObj) {
			// 结果
			var str = "";
			
			str = str + "[";
			$.each(jsonObj, function(i, v) {
				str = str + _valueToStr(v);
				if (i != jsonObj.length - 1) {
					str = str + ",";
				}
			});
			str = str + "]";
			return str;
		}
		
		/**
		 * 对象转JSON字符串
		 * 
		 * @param jsonObj
		 *            对象
		 * @return JSON字符串
		 */
		function _objToStr(jsonObj) {
			// 结果
			var str = "";
			
			// 遍历对象属性，转换为字符串
			str = str + "{";
			$.each(jsonObj, function(i, v) {
				str = str + "\"" + i + "\"" + ":" + _valueToStr(v) + ",";
			});
			if (str.length > 1) {
				str = str.substring(0, str.length - 1);
			}
			str = str + "}";
			return str;
		}
		
		return _objToStr(jsonObj);
	}
	
	/**
	 * 浏览器对象
	 * 
	 */
	$.browser = {};

	/**
	 * 初始化浏览器信息
	 * 
	 */
	+function initBrowserInfo() {
		
		// 获取浏览器代理信息
		var agent = navigator.userAgent.toLowerCase();
		
		// 是否是IE浏览器
		$.browser.isIE = /(msie\s|trident.*rv:)([\w.]+)/.test(agent);
		// 是否是Webkit内核，例如：Chrome、Opera
		$.browser.isWebkit = agent.indexOf(' applewebkit/') > -1;
        // 是否是Gecko内核，例如：FireFox
		$.browser.isGecko = (navigator.product == 'Gecko' && !$.browser.isWebkit && !$.browser.isIE);
		// 是否是怪异模式
		$.browser.isQuirks = (document.compatMode == 'BackCompat');
		// 是否在Mac平台环境下
		$.browser.atMac = (agent.indexOf('macintosh') > -1);
		// 是否是Edge浏览器
		$.browser.isEdge = (agent.indexOf('edge') > -1);
		
		if ($.browser.isIE) {// IE
			// 设置IE版本
			+function setIEVersion() {
				var version = 0;
				var v1 = agent.match(/(?:msie\s([\w.]+))/);  
		        var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
		        if (v1 && v2 && v1[1] && v2[1]) {  
		            version = Math.max(v1[1] * 1, v2[1] * 1);  
		        } else if (v1 && v1[1]) {  
		            version = v1[1] * 1;  
		        } else if (v2 && v2[1]) {  
		            version = v2[1] * 1;  
		        } else {  
		            version = 0;
		        }
		        $.browser.version = version;
			}();
			
			// IE11 兼容模式  
	        $.browser.isIE11Compat = document.documentMode == 11; 
	        // IE10 兼容模式  
	        $.browser.isIE10Compat = document.documentMode == 10; 
	        // IE9 兼容模式  
	        $.browser.isIE9Compat = document.documentMode == 9; 
	        // IE8  
	        $.browser.isIE8 = !!document.documentMode; 
	        // IE8 兼容模式  
	        $.browser.isIE8Compat = document.documentMode == 8; 
	        // IE7 兼容模式  
	        $.browser.isIE7Compat = (($.browser.version == 7 && !document.documentMode) || document.documentMode == 7); 
	        // IE6 模式 或者怪异模式  
	        $.browser.isIE6Compat = ($.browser.version < 7 || $.browser.quirks); 
	        // IE8+
	        $.browser.isIE8Plus = $.browser.version >= 8;
	        // IE8以下
	        $.browser.isOldIE = $.browser.version < 8;  
		} else if ($.browser.isGecko) {// Gecko
			var geckoRelease = agent.match(/rv:([\d\.]+)/);  
	        if (geckoRelease) {  
	            geckoRelease = geckoRelease[1].split('.');  
	            $.browser.version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;  
	        }  
		} else if (/chrome\/(\d+\.\d)/i.test(agent)) {// Chrome
			$.browser.version = +RegExp['\x241'];// 大版本号  
	    }
	}();
	
}(jQuery);

/**
 * 扩展验证规则
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	// 扩展验证规则
	$.extend($.fn.validatebox.defaults.rules, {
		minLength:{},
		maxLength:{},
		equals:{}
	});
	
	// 最小长度
	$.extend($.fn.validatebox.defaults.rules.minLength, {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: $.fn.validatebox.defaults.rules.minLength.message
	});
	
	// 最大长度
	$.extend($.fn.validatebox.defaults.rules.maxLength, {
		validator: function(value, param){
            return value.length <= param[0];
        },
        message: $.fn.validatebox.defaults.rules.maxLength.message
	});
	
	// 相等
	$.extend($.fn.validatebox.defaults.rules.equals, {
		validator: function(value,param){
			console.info(param[0])
            return value == $(param[0]).val();
        },
        message: $.fn.validatebox.defaults.rules.equals.message
	});
	
}(jQuery);

/**
 * 扩展messager
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	$.extend($.messager, {
		/**
		 * 带有输入框的确认框
		 * 
		 * @param title
		 *            标题
		 * @param msg
		 *            消息
		 * @param fn
		 *            回调函数（第一个参数表示用户是否点击的OK按钮，第二个参数表示用户输入的内容）
		 * @param rules
		 *            输入框的校验规则，规则与validatebox
		 * @param isTextArea
		 *            输入框是否是TextArea
		 */
		confirmInput : function(title, msg, fn, rules, isTextArea) {
			if (!fn) {
				fn = new Function();
			}
			
			rules = $.extend({}, rules);
			
			var $validator = null;
			
			// 创建一个对话框DIV
			var $dlg = $("<div></div>");
			var input = "<input type='text' style='width:180px;' />";
			if (isTextArea) {
				input = "<textarea rows='5' style='width:180px;'></textarea>";
			}
			// 初始化对话框
			$dlg.dialog({
			    title: title,
			    width: 250,
			    height: 180,
			    closed: false,
			    closable: false,
			    content:"<table class='form'><tr><td class='form'>" + msg + "</td></tr><tr><td class='form'>" + input + "</td></tr></table>",
			    onOpen:function(){
			    	// 初始化验证框
			    	$validator = $(_getInput().validatebox(rules));
			    },
			    buttons:[{
					text:$.messager.defaults.ok,
					iconCls:"icon-ok",
					handler:function(){
						// 输入验证
						$validator.validatebox("validate");
						if (!$validator.validatebox("isValid")) {
							// 输入验证不通过
							return false;
						}
						fn(true, _getInputValue());
						$dlg.dialog("destroy");
					}
				},{
					text:$.messager.defaults.cancel,
					iconCls:'icon-cancel',
					handler:function(){
						var input = _getInputValue();
						$dlg.dialog("destroy");
						fn(false, input);
					}
				}],
			    modal: true
			});
			
			/**
			 * 获取用户的输入值
			 * 
			 */
			function _getInputValue() {
				return _getInput().val();
			}
			
			/**
			 * 获取输入框
			 * 
			 */
			function _getInput() {
				return $($dlg.find("input,textarea"));
			}
			
		}
	});
	
}(jQuery);

/**
 * DataGrid扩展
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	/**
	 * 扩展DataGrid方法
	 * 
	 */
	$.extend($.fn.datagrid.methods, {
		
		/**
		 * 移动行
		 * 
		 * @param jq
		 *            DataGrid jQuery对象
		 * @param params
		 *            方法参数，<pre>
		 *            {
		 *            	index : 当前行索引,
		 *            	direction : 移动方向，"up"或者"down",
		 *            	targetPos : 目标位置，"top":顶部，"bottom":底部或者指定行索引(基于0)
		 *            }</pre>
		 * 
		 */
		shiftRow : function(jq, params) {
	        return jq.each(function(){
	        	var $dg = $(this);
	        	var rows = $dg.datagrid("getRows");
	        	
	        	// 按照移动方向和原始索引计算移动到的目标索引
	            var targetIndex = params.index;
	        	if (params.direction == "up") {// 上移
	        		targetIndex --;
	            } else if (params.direction == "down") {// 下移
	            	targetIndex ++;
	            } else {// 坐标移动方式
	            	if (params.targetPos == "top") {// 移动到顶部
	            		targetIndex = 0;
	            	} else if (params.targetPos == "bottom") {// 移动到底部
	            		targetIndex = rows.length - 1;
	            	} else {// 移动到指定位置
	            		targetIndex = params.targetPos;
	            	}
	            }
	        	
	        	
	        	var curRow = $.extend({}, rows[params.index]);
	        	var targetRow = rows[targetIndex];
	        	// 交换行
	        	$dg.datagrid("updateRow", {
	        		index : params.index,
	        		row : targetRow
	        	});
	        	$dg.datagrid("updateRow", {
	        		index : targetIndex,
	        		row : curRow
	        	});
	        });
	    },
	    clearQuery : function(jq, params) {
	    	return jq.each(function(){
	    		var $grid = $(this);
	    		$clearBtn = $($grid.datagrid("options").clearBtn);
	    		$clearBtn.on("click", function(){
	    		});
	    	});
	    }
	
	});
	
}(jQuery);

/**
 * FileBox扩展
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	/**
	 * 扩展FileBox方法
	 * 
	 */
	$.extend($.fn.filebox.methods, {
		
		/**
		 * 清空文件上传框中的内容
		 * 
		 * @param jq
		 *            FileBox jQuery对象
		 *            
		 */
		clear : function(jq, params) {
			return jq.each(function(){
				/*var $filebox = $(this);
				console.info($filebox)
				$filebox.val("");
				$filebox.prev().val("");*/
			});
		}
	});
	
}(jQuery);

/**
 * LinkButton扩展
 * 
 * @param $
 *            jQuery
 */
+function($){
	
	/**
	 * 扩展LinkButton方法
	 * 
	 */
	$.extend($.fn.linkbutton.methods, {
		// 清空查询
		clearQuery : function(jq, params) {
			return jq.each(function(){
				$grid = $(params);
				$(".filter").each(function(){
					var $target = $(this);
					if ($target.hasClass("easyui-textbox")) {
						$target.textbox("clear");
					} else if ($target.hasClass("easyui-combobox")) {
						$target.combobox("reset");
					} else if ($target.hasClass("easyui-datebox")) {
						$target.datebox("setValue", "");
					}
				});
				$grid.datagrid("load", {});
			});
		},
		// 搜索
		search : function(jq, params) {
			return jq.each(function(){
				var d={};
				$(params.form).find('input,select')
							  .each(function(){
								  if (this.name) {
								  	d[this.name]=this.value
								  }
							  });
				$(params.grid).datagrid("load", d);
			});
		}
		
	});
	
	$.extend($.fn.validatebox.defaults.rules, {  
        // filebox验证文件大小的规则函数  
        // 如：validType : ['fileSize[1,"MB"]']  
        fileSize : {  
            validator : function(value, array) {  
                var size = array[0];  
                var unit = array[1];  
                if (!size || isNaN(size) || size == 0) {  
                    $.error('验证文件大小的值不能为 "' + size + '"');  
                } else if (!unit) {  
                    $.error('请指定验证文件大小的单位');  
                }  
                var index = -1;  
                var unitArr = new Array("bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb");  
                for (var i = 0; i < unitArr.length; i++) {  
                    if (unitArr[i] == unit.toLowerCase()) {  
                        index = i;  
                        break;  
                    }  
                }  
                if (index == -1) {  
                    $.error('请指定正确的验证文件大小的单位：["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"]');  
                }  
                // 转换为bytes公式  
                var formula = 1;  
                while (index > 0) {  
                    formula = formula * 1024;  
                    index--;  
                }  
                // this为页面上能看到文件名称的文本框，而非真实的file  
                // $(this).next()是file元素  
                return $(this).next().get(0).files[0].size < parseFloat(size) * formula;  
            },  
            message : '文件大小必须小于 {0}{1}'  
        }  
    });  
}(jQuery);
