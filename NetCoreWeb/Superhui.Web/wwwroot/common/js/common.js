
// 是否在浏览器的console中显示log。true-显示；false-不显示
var showConsoleLogFlag = false;

/**
 * 配置lhgdialog框架全局默认参数
 */
if($.dialog && $.dialog.setting) {
	(function(config) {
		config["lock"] = true;// 开启锁屏遮罩，中断用户对话框之外的交互
		config["max"] = false;// 不显示最大化按钮
		config["min"] = false;// 不显示最小化按钮
	})($.dialog.setting);
}

function getUrlParameters() {
	var currentUrl = window.location.href;
	var aGET = new Array();
	if(currentUrl.indexOf("?") > -1) {
		var parametersStr = currentUrl.substring(currentUrl.indexOf("?") + 1);
		var parametersArr = parametersStr.split("&");
		for(var i = 0; i < parametersArr.length; i ++) {
			var currentParameterStr = parametersArr[i];
			var currentKey = currentParameterStr.substring(0, currentParameterStr.indexOf("="));
			var currentValue = currentParameterStr.substring(currentParameterStr.indexOf("=") + 1);
			while(currentValue.substring(currentValue.length - 1) === "#") {
				currentValue = currentValue.substring(0, currentValue.length - 1);
			}
			aGET[currentKey] = currentValue;
		}
	}
	return aGET;
}

/**
 * 使用jQuery.ajax提交JSON数据
 * 
 * @param requestUrl 提交的URL地址，不允许为空
 * @param successFunc 成功回调的方法（即：响应体中的status值为00），该参数如果为空时则通过同步方式执行接口并直接返回数据
 * @param requestData 提交的JSON对象，仅对requestType为POST时才有效，为空时会默认送：{}
 * @param requestType 请求类型：GET、POST
 * @param errorFunc 失败回调的方法，允许为空，为空时会回调默认的“defaultErrorHandle”方法（successFunc为空时无效果）
 * @param needLoading 是否显示loading加载遮罩：true-显示，false-不显示，默认为true显示遮罩
 * @param needHideLoading 该参数仅当needLoading为true时有效，通信完成时，是否关闭loading遮罩：true-需要关闭，false-不需要关闭，默认为true需要关闭遮罩
 */
function AjaxRequest(requestUrl, successFunc, requestData, requestType, errorFunc, needLoading, needHideLoading) {
	var loadingFlag = true;
	if(isBooleanFalse(needLoading)) {
		loadingFlag = false;
	}
	
	var hideLoadingFlag = true;
	if(isBooleanFalse(needHideLoading)) {
		hideLoadingFlag = false;
	}
	
	if (isNullOrEmpty(requestType)) {
		requestType = "POST";
	} else {
		if (requestType != "GET") {
			requestType = "POST";
		}
	}
	
	showConsoleLog("Request Url:" + requestUrl);
	var requestDataStr = "{}";
	if (requestType == "POST" && !isNullOrEmpty(requestType)) {
		requestDataStr = JSON.stringify(requestData);
		showConsoleLog("Request Data:" + requestDataStr);
	}
	
	if(loadingFlag) {
		showLoading();
	}
	
	var ajaxRequestConfig = {
		url:requestUrl,
		type:requestType,
		dataType:"json",
		headers:{
			Authorization:getAuthorizationStr(),
			channel:"app"
		},
		success:function (responseData, textStatus, xhr) {
			if(loadingFlag && hideLoadingFlag) {
				hideLoading();
			}
			// 任意的接口会在用户认证信息key快到期前自动刷新，因此需要替换
			try {
				if (xhr.getResponseHeader("Authorization")) {
					currentAuthorizationStr = xhr.getResponseHeader("Authorization");
				}
			} catch (e) {}
			showConsoleLog("Response Status:" + xhr.status);
			showConsoleLog("Response Data:" + JSON.stringify(responseData));
			if(successFunc) {
				if(responseData && responseData.tx_status && "00" === responseData.tx_status) {
					successFunc(responseData);
				} else {
					if(errorFunc) {
						errorFunc(responseData);
					} else {
						defaultErrorHandle(responseData);
					}
				}
			}
		},
		error:function(xhr, textStatus, errorThrown) {
			if(loadingFlag && hideLoadingFlag) {
				hideLoading();
			}
			// 任意的接口会在用户认证信息key快到期前自动刷新，因此需要替换
			try {
				if (xhr.getResponseHeader("Authorization")) {
					currentAuthorizationStr = xhr.getResponseHeader("Authorization");
				}
			} catch (e) {}
			showConsoleLog("Response Status:" + xhr.status);
			if(errorFunc) {
				errorFunc(xhr.responseJSON);
			} else {
				defaultErrorHandle(xhr.responseJSON);
			}
		}
	};
	if (requestType == "POST") {
		ajaxRequestConfig.data = requestDataStr;
		ajaxRequestConfig.contentType = "application/json";
	}
	
	if(successFunc) {// 由回调函数来处理结果数据（异步）
		$.ajax(ajaxRequestConfig);
	} else {// 直接返回结果数据（同步）,不会调用回调函数
		ajaxRequestConfig.async = false;// 设置为同步请求
		var jsonResult = $.ajax(ajaxRequestConfig).responseText;
		return jsonResult;
	}
}

var currentAuthorizationStr = "";
function getAuthorizationStr() {
	if (!isNullOrEmpty(currentAuthorizationStr)) {
		return currentAuthorizationStr;
	} else {
		var parameters = getUrlParameters();
		currentAuthorizationStr = parameters["Authorization"];
		if (isNullOrEmpty(currentAuthorizationStr)) {
			currentAuthorizationStr = "";
		}
		return currentAuthorizationStr;
	}
}

/**
 * Ajax通信默认错误处理
 */
function defaultErrorHandle(responseData) {
	if(typeof(responseData) === "object" && responseData && (responseData.error_info || responseData.error_info.message)) {
		if (responseData.error_info.message) {
			alert(responseData.error_info.message);
		} else {
			if (typeof(responseData) === "object") {
				alert(JSON.stringify(responseData.error_info));
			} else {
				alert(responseData.error_info);
			}
		}
	} else {
		alert("系统出现异常！");
	}
}

/**
 * 通信时显示loading和遮罩
 */
function showLoading() {
	if ($.dialog) {
		$.dialog({id:"showLoading", title:false});
	}
}

/**
 * 通信完成隐藏loading和遮罩
 */
function hideLoading() {
	if ($.dialog) {
		$.dialog({id:"showLoading"}).close();
	}
}

/**
 * Console打印公共方法。showConsoleLogFlag值为true时打印，为false时不打印。
 *
 * @param str 待打印的内容
 */
function showConsoleLog(str) {
	try {
		if(showConsoleLogFlag) {
			console.log(str);
		}
	} catch(e) {}
}

/**
 * 非空判断
 *
 * @param obj 判断的对象
 */
function isNullOrEmpty(obj) {
	if(typeof(obj) === "number" && 0 === obj) {
		return false;
	} else {
		if(obj) {
			return false;
		} else {
			return true;
		}
	}
}

/**
 * 判断检查值是否为Boolean的true:<br>
 * 如果值本身是Boolean类型，并且值为true，则返回Boolean值：true。<br>
 * 如果值本身是String类型，并且为true字符串，则返回Boolean值：true。<br>
 * 其它情况都返回Boolean值：false
 *
 * @param checkValue 待检查的值
 */
function isBooleanTrue(checkValue) {
	return (typeof(checkValue) != "undefined" && ((typeof(checkValue) == "boolean" && checkValue) || (typeof(checkValue) == "string" && checkValue == "true")));
}

/**
 * 判断检查值是否为Boolean的false:<br>
 * 如果值本身是Boolean类型，并且值为false，则返回Boolean值：true。<br>
 * 如果值本身是String类型，并且为false字符串，则返回Boolean值：true。<br>
 * 其它情况都返回Boolean值：false
 *
 * @param checkValue 待检查的值
 */
function isBooleanFalse(checkValue) {
	return (typeof(checkValue) != "undefined" && ((typeof(checkValue) == "boolean" && !checkValue) || (typeof(checkValue) == "string" && checkValue == "false")));
}

