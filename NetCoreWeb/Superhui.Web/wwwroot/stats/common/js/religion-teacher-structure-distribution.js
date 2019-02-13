
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

!function () {
	
	AjaxRequest("/fetchuserinfo", areaSelectInit, "", "GET");
	
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
	
	// 加载各教派教职人员分布数据
	getReligionTeacherDistributionData();
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
	} else {}
	
	return showAreaName;
}

function getReligionTeacherDistributionData() {
	if (section1Slide1Charts1ShowFlag || section1Slide2Charts1ShowFlag || section2Slide1Charts1ShowFlag || section2Slide2Charts1ShowFlag || section3Slide1Charts1ShowFlag || section3Slide2Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/tch_num_rslt/search", getReligionTeacherDistributionDataHandle, requestData, "POST", function () {
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
	
	var currentAreaInfoArray = [];
	var currentAreaLevel = 0;
	var childrenAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		if (responseData.tch_s_num_grp) {
			currentAreaInfoArray = responseData.tch_s_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 4;
		childrenAreaInfoArray = [];
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		if (responseData.tch_z_num_grp) {
			currentAreaInfoArray = responseData.tch_z_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 3;
		if (responseData.tch_s_num_grp) {
			childrenAreaInfoArray = responseData.tch_s_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		if (responseData.tch_c_num_grp) {
			currentAreaInfoArray = responseData.tch_c_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 2;
		if (responseData.tch_z_num_grp) {
			childrenAreaInfoArray = responseData.tch_z_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		if (responseData.tch_p_num_grp) {
			currentAreaInfoArray = responseData.tch_p_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 1;
		if (responseData.tch_c_num_grp) {
			childrenAreaInfoArray = responseData.tch_c_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else {}
	
	var currentAreaInfo;
	if (!isNullOrEmpty(currentAreaInfoArray)) {
		for (var i = 0; i < currentAreaInfoArray.length; i ++) {
			var currentAreaInfoTemp = currentAreaInfoArray[i];
			if (currentYear == currentAreaInfoTemp.year) {
				if (currentAreaLevel == 1) {
					if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd) {
						currentAreaInfo = currentAreaInfoTemp;
						break;
					} else {
						continue;
					}
				} else if (currentAreaLevel == 2) {
					if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd) {
						currentAreaInfo = currentAreaInfoTemp;
						break;
					} else {
						continue;
					}
				} else if (currentAreaLevel == 3) {
					if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd && AreaSelectedValue.districtOrCountyCode == currentAreaInfoTemp.zon_cd) {
						currentAreaInfo = currentAreaInfoTemp;
						break;
					} else {
						continue;
					}
				} else if (currentAreaLevel == 4) {
					if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd && AreaSelectedValue.districtOrCountyCode == currentAreaInfoTemp.zon_cd && AreaSelectedValue.townOrStreetCode == currentAreaInfoTemp.str_cd) {
						currentAreaInfo = currentAreaInfoTemp;
						break;
					} else {
						continue;
					}
				} else {
					continue;
				}
			} else {
				continue;
			}
		}
	}
	
	if (!isNullOrEmpty(currentAreaInfo)) {
		drawReligionTeacherAgeProportionCharts(currentAreaInfo);
		drawReligionTeacherSexProportionCharts(currentAreaInfo);
		drawReligionTeacherEducationLevelProportionCharts(currentAreaInfo);
	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
	}
	drawReligionTeacherAgeDistributionCharts(childrenAreaInfoArray);
	drawReligionTeacherSexDistributionCharts(childrenAreaInfoArray);
	drawReligionTeacherEducationLevelDistributionCharts(childrenAreaInfoArray);
}

function drawReligionTeacherAgeProportionCharts(currentAreaInfo) {
	if (!section1Slide1Charts1) {
		section1Slide1Charts1 = echarts.init(document.getElementById("section1-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教教职人员年龄段整体占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tch_num;
	var legendData = [];
	var seriesName = "教职人员总数";
	var seriesData = [
		{value:currentAreaInfo.ud_20_tch_num, name: "20岁以下"},
		{value:currentAreaInfo.ud_30_tch_num, name: "20-30"},
		{value:currentAreaInfo.ud_40_tch_num, name: "30-40"},
		{value:currentAreaInfo.ud_50_tch_num, name: "40-50"},
		{value:currentAreaInfo.ud_60_tch_num, name: "50-60"},
		{value:currentAreaInfo.ud_70_tch_num, name: "60-70"},
		{value:currentAreaInfo.abv_70_tch_num, name: "70岁以上"}
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section1Slide1Charts1.setOption(echartsOption, true);
	section1Slide1Charts1ShowFlag = true;
}

function drawReligionTeacherAgeDistributionCharts(childrenAreaInfoArray) {
	if (!section1Slide2Charts1) {
		section1Slide2Charts1 = echarts.init(document.getElementById("section1-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 20岁以下
	var under20AgeTeacherNumberArray = [];
	// 20岁到30岁
	var between20And30AgeTeacherNumberArray = [];
	// 30岁到40岁
	var between30And40AgeTeacherNumberArray = [];
	// 40岁到50岁
	var between40And50AgeTeacherNumberArray = [];
	// 50岁到60岁
	var between50And60AgeTeacherNumberArray = [];
	// 60岁到70岁
	var between60And70AgeTeacherNumberArray = [];
	// 70岁以上
	var over70AgeTeacherNumberArray = [];
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
			}
			
			under20AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_20_tch_num);
			between20And30AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_30_tch_num);
			between30And40AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_40_tch_num);
			between40And50AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_50_tch_num);
			between50And60AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_60_tch_num);
			between60And70AgeTeacherNumberArray.push(childrenAreaInfoTemp.ud_70_tch_num);
			over70AgeTeacherNumberArray.push(childrenAreaInfoTemp.abv_70_tch_num);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划宗教教职人员年龄段分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '20岁以下',
				type: 'bar',
				stack: '教职人员总数',
				data: under20AgeTeacherNumberArray
			},
			{
				name: '20-30',
				type: 'bar',
				stack: '教职人员总数',
				data: between20And30AgeTeacherNumberArray
			},
			{
				name: '30-40',
				type: 'bar',
				stack: '教职人员总数',
				data: between30And40AgeTeacherNumberArray
			},
			{
				name: '40-50',
				type: 'bar',
				stack: '教职人员总数',
				data: between40And50AgeTeacherNumberArray
			},
			{
				name: '50-60',
				type: 'bar',
				stack: '教职人员总数',
				data: between50And60AgeTeacherNumberArray
			},
			{
				name: '60-70',
				type: 'bar',
				stack: '教职人员总数',
				data: between60And70AgeTeacherNumberArray
			},
			{
				name: '70岁以上',
				type: 'bar',
				stack: '教职人员总数',
				data: over70AgeTeacherNumberArray
			}
		];
		for (var i = 0; i < seriesArray.length; i ++) {
			legendData.push(seriesArray[i].name);
		}
		var echartsOption = getBarEChartsOption(titleText, "", legendData, areaNameArray, seriesArray);
		section1Slide2Charts1.setOption(echartsOption, true);
		section1Slide2Charts1ShowFlag = true;
	} else {
		$("#section1-slide2-echarts-prompts").css("display", "block");
		section1Slide2Charts1ShowFlag = false;
	}
}

function drawReligionTeacherSexProportionCharts(currentAreaInfo) {
	if (!section2Slide1Charts1) {
		section2Slide1Charts1 = echarts.init(document.getElementById("section2-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教教职人员性别整体占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tch_num;
	var legendData = [];
	var seriesName = "教职人员总数";
	var seriesData = [
		{value:currentAreaInfo.male_num, name: "男性"},
		{value:currentAreaInfo.female_num, name: "女性"}
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section2Slide1Charts1.setOption(echartsOption, true);
	section2Slide1Charts1ShowFlag = true;
}

function drawReligionTeacherSexDistributionCharts(childrenAreaInfoArray) {
	if (!section2Slide2Charts1) {
		section2Slide2Charts1 = echarts.init(document.getElementById("section2-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 男性
	var maleTeacherNumberArray = [];
	// 女性
	var femaleTeacherNumberArray = [];
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
			}
			
			maleTeacherNumberArray.push(childrenAreaInfoTemp.male_num);
			femaleTeacherNumberArray.push(childrenAreaInfoTemp.female_num);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划宗教教职人员性别分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '男性',
				type: 'bar',
				stack: '教职人员总数',
				data: maleTeacherNumberArray
			},
			{
				name: '女性',
				type: 'bar',
				stack: '教职人员总数',
				data: femaleTeacherNumberArray
			}
		];
		for (var i = 0; i < seriesArray.length; i ++) {
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

function drawReligionTeacherEducationLevelProportionCharts(currentAreaInfo) {
	if (!section3Slide1Charts1) {
		section3Slide1Charts1 = echarts.init(document.getElementById("section3-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教教职人员文化程度整体占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tch_num;
	var legendData = [];
	var seriesName = "教职人员总数";
	var seriesData = [
		{value:currentAreaInfo.dctr_tch_num, name: "博士"},
		{value:currentAreaInfo.mast_tch_num, name: "硕士"},
		{value:currentAreaInfo.udgcr_tch_num, name: "本科"},
		{value:currentAreaInfo.jnrclg_tch_num, name: "大专"},
		{value:currentAreaInfo.pytchsch_tch_num, name: "中专"},
		{value:currentAreaInfo.snrhighsch_tch_num, name: "高中"},
		{value:currentAreaInfo.jnrmdlsch_ud_tch_num, name: "初中及以下"}
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section3Slide1Charts1.setOption(echartsOption, true);
	section3Slide1Charts1ShowFlag = true;
}

function drawReligionTeacherEducationLevelDistributionCharts(childrenAreaInfoArray) {
	if (!section3Slide2Charts1) {
		section3Slide2Charts1 = echarts.init(document.getElementById("section3-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 博士
	var doctorTeacherNumberArray = [];
	// 硕士
	var masterTeacherNumberArray = [];
	// 本科
	var bachelorTeacherNumberArray = [];
	// 大专
	var collegeDegreeTeacherNumberArray = [];
	// 中专
	var technicalSecondarySchoolTeacherNumberArray = [];
	// 高中
	var seniorHighSchoolTeacherNumberArray = [];
	// 初中及以下
	var juniorHighSchoolAndBelowTeacherNumberArray = [];
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
			}
			
			doctorTeacherNumberArray.push(childrenAreaInfoTemp.dctr_tch_num);
			masterTeacherNumberArray.push(childrenAreaInfoTemp.mast_tch_num);
			bachelorTeacherNumberArray.push(childrenAreaInfoTemp.udgcr_tch_num);
			collegeDegreeTeacherNumberArray.push(childrenAreaInfoTemp.jnrclg_tch_num);
			technicalSecondarySchoolTeacherNumberArray.push(childrenAreaInfoTemp.pytchsch_tch_num);
			seniorHighSchoolTeacherNumberArray.push(childrenAreaInfoTemp.snrhighsch_tch_num);
			juniorHighSchoolAndBelowTeacherNumberArray.push(childrenAreaInfoTemp.jnrmdlsch_ud_tch_num);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划宗教教职人员文化程度分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '博士',
				type: 'bar',
				stack: '教职人员总数',
				data: doctorTeacherNumberArray
			},
			{
				name: '硕士',
				type: 'bar',
				stack: '教职人员总数',
				data: masterTeacherNumberArray
			},
			{
				name: '本科',
				type: 'bar',
				stack: '教职人员总数',
				data: bachelorTeacherNumberArray
			},
			{
				name: '大专',
				type: 'bar',
				stack: '教职人员总数',
				data: collegeDegreeTeacherNumberArray
			},
			{
				name: '中专',
				type: 'bar',
				stack: '教职人员总数',
				data: technicalSecondarySchoolTeacherNumberArray
			},
			{
				name: '高中',
				type: 'bar',
				stack: '教职人员总数',
				data: seniorHighSchoolTeacherNumberArray
			},
			{
				name: '初中及以下',
				type: 'bar',
				stack: '教职人员总数',
				data: juniorHighSchoolAndBelowTeacherNumberArray
			}
		];
		for (var i = 0; i < seriesArray.length; i ++) {
			legendData.push(seriesArray[i].name);
		}
		var echartsOption = getBarEChartsOption(titleText, "", legendData, areaNameArray, seriesArray);
		section3Slide2Charts1.setOption(echartsOption, true);
		section3Slide2Charts1ShowFlag = true;
	} else {
		$("#section3-slide2-echarts-prompts").css("display", "block");
		section3Slide2Charts1ShowFlag = false;
	}
}

function getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData) {
	var echartsOption = {
		title: {
			text: titleText,
			//subtext: titleSubtext,
			subtextStyle: {
				color:"#333",
				fontSize:15
			},
			left: "center"
		},
		tooltip : {
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
		series : [
			{
				name:seriesName,
				type: "pie",
				radius : ["40%", "60%"],
				center: ["50%", "50%"],
				selectedMode: "single",
				data:seriesData,
				label: {
					normal: {
						show: true,
						//position:"inner", //标签的位置
						formatter:"{d}%"
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
				color:"#333",
				fontSize:15
			},
			left: "center"
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
		xAxis:  {
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
	} catch (e) {}
	try {
		section1Slide2Charts1.clear();
	} catch (e) {}
	
	try {
		section2Slide1Charts1.clear();
	} catch (e) {}
	try {
		section2Slide2Charts1.clear();
	} catch (e) {}
	
	try {
		section3Slide1Charts1.clear();
	} catch (e) {}
	try {
		section3Slide2Charts1.clear();
	} catch (e) {}
	
	section1Slide1Charts1ShowFlag = false;
	section1Slide2Charts1ShowFlag = false;
	
	section2Slide1Charts1ShowFlag = false;
	section2Slide2Charts1ShowFlag = false;
	
	section3Slide1Charts1ShowFlag = false;
	section3Slide2Charts1ShowFlag = false;
	
	getReligionTeacherDistributionData();
}

function getAreaData(currentAreaCode, getAreaDataHandle) {
	var requestData = {
		adiv_cd:currentAreaCode
	};
	
	AjaxRequest("/api/rgoncd", getAreaDataHandle, requestData, "POST");
}

