
var section1Slide1Charts1;
var section1Slide2Charts1;
var section2Slide1Charts1;
var section2Slide2Charts1;
var section3Slide1Charts1;
var section3Slide2Charts1;

var section1Slide1Charts1ShowFlag = false;
var section1Slide2Charts1ShowFlag = false;
var section2Slide1Charts1ShowFlag = false;
var section2Slide2Charts1ShowFlag = false;
var section3Slide1Charts1ShowFlag = false;
var section3Slide2Charts1ShowFlag = false;

var echartsTheme = "macarons";

var globaleCharPieData;
var globaleCharBarData;

!function () {
	AjaxRequest("religion/fetchuserinfo", areaSelectInit, "", "GET");
}();

function areaSelectInit(responseData) {
	if (!isNullOrEmpty(responseData.usr_vdo)) {
		AreaSelectFixedValue.province = responseData.usr_vdo.prov_nm;
		AreaSelectFixedValue.provinceCode = responseData.usr_vdo.prov_cd;
		AreaSelectFixedValue.city = responseData.usr_vdo.city_nm;
		AreaSelectFixedValue.cityCode = responseData.usr_vdo.city_cd;
		AreaSelectFixedValue.districtOrCounty = responseData.usr_vdo.zon_nm;
		AreaSelectFixedValue.districtOrCountyCode = responseData.usr_vdo.zon_cd;
		AreaSelectFixedValue.townOrStreet = responseData.usr_vdo.str_nm;
		AreaSelectFixedValue.townOrStreetCode = responseData.usr_vdo.str_cd;
	}

	var areaSelectInputArray = $(".areaselect-cell-input");

	var rlgArr = ['全部', '佛教', '道教', '伊斯兰教', '天主教', '基督教'];
	// var mobileSelectData = new MobileSelect({
	// 	trigger: '#trigger0',
	// 	title: '教派',
	// 	wheels: [
	// 		{ data: rlgArr }
	// 	],
	// 	position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
	// 	transitionEnd: function (indexArr, data) {
	// 		// console.log(data);
	// 	},
	// 	callback: function (indexArr, data) {
	// 		console.log(data);
	// 		document.getElementById("trigger0").value = data[0];
	// 		locatePositionData(indexArr[0]);

	// 		// 柱状图
	// 		if (globaleCharBarData) {
	// 			drawReligionOganizationDistributionCharts(globaleCharBarData, data[0]);
	// 		}
	// 	}
	// });

	// function locatePositionData(index) {
	// 	mobileSelectData.locatePosition(0, index);
	// }

	var mobileSelectArray = [];
	var selectElementArray = [];
	$.each($(".areaselect-cell-input2"), function () {
		var $this = $(this);
		var mobileSelectData = new MobileSelect({
			trigger: "#"+$this.attr("id"),
			title: '教别',
			wheels: [
				{ data: rlgArr }
			],
			position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
			transitionEnd: function (indexArr, data) {
				// console.log(data);
			},
			callback: function (indexArr, data) {
				// console.log(data);
				selectElementArray.forEach((secectItem) => {
					secectItem.attr("value", data[0]);
				});
				mobileSelectArray.forEach((item, i) => {
					item.locatePosition(0, indexArr[0])
				});
	
				// 柱状图
				if (globaleCharBarData) {
					drawReligionOganizationDistributionCharts(globaleCharBarData, data[0]);
				}
			}
		});
		mobileSelectArray.push(mobileSelectData);
		selectElementArray.push($this);
	});


	$.each(areaSelectInputArray, function () {
		var $this = $(this);
		$this.areaSelect();
		$this.val(showAreaSelectedName());
		$this.on("click", function (event) {
			event.stopPropagation();
			$this.areaSelect("open");
		});
		$this.on("done.com.chinamworld.areaselect", function (ret) {
			$.each(areaSelectInputArray, function () {
				var $this = $(this);
				$this.val(showAreaSelectedName());
			});
		});
	});

	// 请求宗教团体数据
	getReligionOrganizationDistributionData();
}

function showAreaSelectedName() {
	var showAreaName = "";
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		showAreaName = AreaSelectedValue.townOrStreet;
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		showAreaName = AreaSelectedValue.districtOrCounty;
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		showAreaName = AreaSelectedValue.city;
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		showAreaName = AreaSelectedValue.province;
	} else { }

	return showAreaName;
}

function getReligionOrganizationDistributionData() {
	if (section2Slide1Charts1ShowFlag || section2Slide2Charts1ShowFlag) {
		return;
	}

	var requestData = {
		prov_cd: isNullOrEmpty(AreaSelectedValue.provinceCode) ? "" : AreaSelectedValue.provinceCode,
		city_cd: isNullOrEmpty(AreaSelectedValue.cityCode) ? "" : AreaSelectedValue.cityCode,
		zon_cd: isNullOrEmpty(AreaSelectedValue.districtOrCountyCode) ? "" : AreaSelectedValue.districtOrCountyCode
	};

	AjaxRequest("religion/api/sa/org_num_rslt/search", getReligionTeacherDistributionDataHandle, requestData, "POST", function () {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
		section3Slide2Charts1ShowFlag = false;
	});

	// var tmp = '';
	// getReligionTeacherDistributionDataHandle(tmp);

	// AjaxRequest("/api/chartData", getReligionTeacherDistributionDataHandle, "", "GET");
}

function getReligionTeacherDistributionDataHandle(responseData) {
	if (!responseData) {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
		section3Slide2Charts1ShowFlag = false;

		return;
	}
	// responseData = $.parseJSON(responseData.rslt);

	$("#section1-slide1-echarts-prompts").css("display", "none");
	$("#section1-slide2-echarts-prompts").css("display", "none");
	$("#section2-slide1-echarts-prompts").css("display", "none");
	$("#section2-slide2-echarts-prompts").css("display", "none");
	$("#section3-slide1-echarts-prompts").css("display", "none");
	$("#section3-slide2-echarts-prompts").css("display", "none");

	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";

	var currentAreaLevel = 0;
	var currentAreaInfo;
	var childrenAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		currentAreaLevel = 4;
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		currentAreaLevel = 3;
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		currentAreaLevel = 2;
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		currentAreaLevel = 1;
	} else {
	}
	// console.log(responseData.org_first_num_grp)
	// 团体数据
	if (responseData.org_first_num_grp) {
		currentAreaInfo = responseData.org_first_num_grp;
		globaleCharPieData = currentAreaInfo;
	} else {
		currentAreaInfo = {};
	}
	if (responseData.org_next_num_grp) {
		childrenAreaInfoArray = responseData.org_next_num_grp;

		globaleCharBarData = responseData.org_next_num_grp;
		// console.log('set data: ', globaleCharBarData);
	}
	else {
		childrenAreaInfoArray = [];
	}
	if (!isNullOrEmpty(currentAreaInfo)) {
		drawReligionOganizationProportionCharts(currentAreaInfo);
	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
	}
	drawReligionOganizationDistributionCharts(childrenAreaInfoArray);
}

function drawReligionOganizationProportionCharts(currentAreaInfo) {
	if (!section2Slide1Charts1) {
		section2Slide1Charts1 = echarts.init(document.getElementById("section2-slide1-charts1-container"), echartsTheme);
	}

	var titleText = "宗教团体占比情况";
	var totalNum = 0;
	if (currentAreaInfo.org_prov_num) {
		totalNum += currentAreaInfo.org_prov_num;
	}
	if (currentAreaInfo.org_city_num) {
		totalNum += currentAreaInfo.org_city_num;
	}
	if (currentAreaInfo.org_zon_num) {
		totalNum += currentAreaInfo.org_zon_num;
	}
	var titleSubtext = "总数：" + totalNum;
	var legendData = [];
	var seriesName = "团体人员总数";
	var seriesData = [
		{ value: currentAreaInfo.org_prov_num, name: "省级" },
		{ value: currentAreaInfo.org_city_num, name: "市级" },
		{ value: currentAreaInfo.org_zon_num, name: "区县级" }
	];
	for (var i = 0; i < seriesData.length; i++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);

	section2Slide1Charts1.setOption(echartsOption, true);
	section2Slide1Charts1ShowFlag = true;
}

function drawReligionOganizationDistributionCharts(childrenAreaInfoArray, rlg) {
	// console.log('hello', rlg, childrenAreaInfoArray);
	if (!section2Slide2Charts1) {
		section2Slide2Charts1 = echarts.init(document.getElementById("section2-slide2-charts1-container"), echartsTheme);
	}

	var areaNameArray = [];
	// 省级
	var prov_Array = [];
	// 市级
	var city_Array = [];
	// 区县级
	var zon_Array = [];

	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			if (childrenAreaInfoTemp.rgon_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.rgon_cd_desc);
			} else {
				areaNameArray.push("");
			}
			if (!rlg || rlg === '全部') {
				prov_Array.push(childrenAreaInfoTemp.total_prov_num);
				city_Array.push(childrenAreaInfoTemp.total_city_num);
				zon_Array.push(childrenAreaInfoTemp.total_zon_num);
			} else if (rlg === '佛教') {
				prov_Array.push(childrenAreaInfoTemp.f_org_prov_num);
				city_Array.push(childrenAreaInfoTemp.f_org_city_num);
				zon_Array.push(childrenAreaInfoTemp.f_org_zon_num);
			} else if (rlg === '道教') {
				prov_Array.push(childrenAreaInfoTemp.d_org_prov_num);
				city_Array.push(childrenAreaInfoTemp.d_org_city_num);
				zon_Array.push(childrenAreaInfoTemp.d_org_zon_num);
			} else if (rlg === '伊斯兰教') {
				prov_Array.push(childrenAreaInfoTemp.y_org_prov_num);
				city_Array.push(childrenAreaInfoTemp.y_org_city_num);
				zon_Array.push(childrenAreaInfoTemp.y_org_zon_num);
			} else if (rlg === '天主教') {
				prov_Array.push(childrenAreaInfoTemp.t_org_prov_num);
				city_Array.push(childrenAreaInfoTemp.t_org_city_num);
				zon_Array.push(childrenAreaInfoTemp.t_org_zon_num);
			} else if (rlg === '基督教') {
				prov_Array.push(childrenAreaInfoTemp.j_org_prov_num);
				city_Array.push(childrenAreaInfoTemp.j_org_city_num);
				zon_Array.push(childrenAreaInfoTemp.j_org_zon_num);
			}
		} else {
			continue;
		}
	}

	if (areaNameArray.length > 0) {
		var titleText = "宗教团体分布情况";
		var legendData = [];
		var seriesArray = [
			{
				name: '省级',
				type: 'bar',
				stack: '宗教团体分布情况',
				data: prov_Array
			},
			{
				name: '市级',
				type: 'bar',
				stack: '宗教团体分布情况',
				data: city_Array
			},
			{
				name: '区县级',
				type: 'bar',
				stack: '宗教团体分布情况',
				data: zon_Array
			}
		];
		for (var i = 0; i < seriesArray.length; i++) {
			legendData.push(seriesArray[i].name);
		}
		var echartsOption = getBarEChartsOption(titleText, "", legendData, areaNameArray, seriesArray);
		section2Slide2Charts1.setOption(echartsOption, true);
		section2Slide2Charts1ShowFlag = true;
	} else {
		$("#section2-slide2-echarts-prompts").css("display", "block");
		section2Slide2Charts1ShowFlag = false;
	}
}

function getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData) {
	var echartsOption = {
		title: {
			text: titleText,
			//subtext: titleSubtext,
			subtextStyle: {
				color: "#333",
				fontSize: 15
			},
			left: "center"
		},
		tooltip: {
			trigger: "item",
			formatter: "{b}<br/>{c} ({d}%)"
		},
		legend: {
			// orient: "vertical",
			// top: "middle",
			bottom: 10,
			left: "center",
			data: legendData
		},
		series: [
			{
				name: seriesName,
				type: "pie",
				radius: ["40%", "60%"],
				center: ["50%", "50%"],
				selectedMode: "single",
				data: seriesData,
				label: {
					normal: {
						show: true,
						//position:"inner", //标签的位置
						formatter: "{d}%"
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 2,
						borderColor: "#FFFFFF"
					},
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)"
					}
				}
			}
		]
	};

	return echartsOption;
}

function getBarEChartsOption(titleText, titleSubtext, legendData, yAxisData, seriesArray) {
	var echartsOption = {
		title: {
			text: titleText,
			//subtext: titleSubtext,
			subtextStyle: {
				color: "#333",
				fontSize: 15
			},
			left: "center"
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: legendData,
			top: 'bottom'
		},
		grid: {
			left: '7%',
			right: '4%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			position: 'top'
		},
		yAxis: {
			type: 'category',
			data: yAxisData
		},
		series: seriesArray
	};

	return echartsOption;
}

function selectedAreaChangedHandle() {
	try {
		section1Slide1Charts1.clear();
	} catch (e) { }
	try {
		section1Slide2Charts1.clear();
	} catch (e) { }

	try {
		section2Slide1Charts1.clear();
	} catch (e) { }
	try {
		section2Slide2Charts1.clear();
	} catch (e) { }

	try {
		section3Slide1Charts1.clear();
	} catch (e) { }
	try {
		section3Slide2Charts1.clear();
	} catch (e) { }

	section1Slide1Charts1ShowFlag = false;
	section1Slide2Charts1ShowFlag = false;

	section2Slide1Charts1ShowFlag = false;
	section2Slide2Charts1ShowFlag = false;

	section3Slide1Charts1ShowFlag = false;
	section3Slide2Charts1ShowFlag = false;

	getReligionOrganizationDistributionData();
}

function getAreaData(currentAreaCode, getAreaDataHandle) {
	var requestData = {
		adiv_cd: currentAreaCode
	};

	AjaxRequest("religion/api/rgoncd", getAreaDataHandle, requestData, "POST");
}

