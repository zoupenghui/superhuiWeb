
var section1Slide1Charts1;
var section1Slide2Charts1;
var section2Slide1Charts1;
var section2Slide2Charts1;
var section3Slide1Charts1;
var section3Slide2Charts1;
var section4Slide1Charts1;
var section4Slide2Charts1;

var section1Slide1Charts1ShowFlag = false;
var section1Slide2Charts1ShowFlag = false;
var section2Slide1Charts1ShowFlag = false;
var section2Slide2Charts1ShowFlag = false;
var section3Slide1Charts1ShowFlag = false;
var section3Slide2Charts1ShowFlag = false;
var section4Slide1Charts1ShowFlag = false;
var section4Slide2Charts1ShowFlag = false;
//教别类型
var sectTag = 1;
//数据
var echartsData = {};

var echartsTheme = "macarons";

var mobileSelectData = [];


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

	var rlgArr = ['全部', '佛教', '道教', '伊斯兰教', '天主教', '基督教'];
	for (var index = 0; index < 8; index++) {
		mobileSelectData.push(
		 new MobileSelect({
			trigger: '#trigger' + index,
			title: '教别',
			wheels: [
				{ data: rlgArr }
			],
			position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
			transitionEnd: function (indexArr, data) {
				// console.log(data);
			},
			callback: function (indexArr, data) {
				for (var i = 0; i< mobileSelectData.length; i++) {
					document.getElementById("trigger" + i).value = data[0];
					mobileSelectData[i].locatePosition(0, indexArr[0]);
				}
				sectTag = indexArr[0] + 1;
				if (echartsData) {
					getReligionTeacherDistributionDataHandle(echartsData);
				}
			}
			}));
	}

	// 加载各教别教职人员分布数据
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
	if (section1Slide1Charts1ShowFlag || section1Slide2Charts1ShowFlag || section2Slide1Charts1ShowFlag || section2Slide2Charts1ShowFlag || section3Slide1Charts1ShowFlag || section3Slide2Charts1ShowFlag || section4Slide1Charts1ShowFlag || section4Slide2Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode,
		type: '8',
	};
	
	var tmpData = {};
	AjaxRequest("/api/sa/blv_num_rslt/search", function (responseData) {
		requestData.type = '9';
		tmpData.blv_rlg_gnd_grp = responseData.blv_rlg_gnd_grp;
		AjaxRequest("/api/sa/blv_num_rslt/search", function (responseData) {
			requestData.type = '10';
			tmpData.blv_rlg_age_grp = responseData.blv_rlg_age_grp;
			AjaxRequest("/api/sa/blv_num_rslt/search", function (responseData) {
				requestData.type = '11';
				tmpData.blv_rlg_eddgr_grp = responseData.blv_rlg_eddgr_grp;
				AjaxRequest("/api/sa/blv_num_rslt/search", function (responseData) {
					tmpData.blv_rlg_rgon_grp = responseData.blv_rlg_rgon_grp;
					echartsData = tmpData;
					getReligionTeacherDistributionDataHandle(echartsData);
				}, requestData, "POST", searchError);
			}, requestData, "POST", searchError);
		}, requestData, "POST", searchError);
	}, requestData, "POST", searchError);



}

function searchError(params) {
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
}

function getReligionTeacherDistributionDataHandle(responseData) {

	
	if (!responseData) {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide2-echarts-prompts").css("display", "block");
		$("#section4-slide1-echarts-prompts").css("display", "block");
		$("#section4-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
		section3Slide2Charts1ShowFlag = false;
		section4Slide1Charts1ShowFlag = false;
		section4Slide2Charts1ShowFlag = false;
		return;
	}
	
	$("#section1-slide1-echarts-prompts").css("display", "none");
	$("#section1-slide2-echarts-prompts").css("display", "none");
	$("#section2-slide1-echarts-prompts").css("display", "none");
	$("#section2-slide2-echarts-prompts").css("display", "none");
	$("#section3-slide1-echarts-prompts").css("display", "none");
	$("#section3-slide2-echarts-prompts").css("display", "none");
	$("#section4-slide1-echarts-prompts").css("display", "none");
	$("#section4-slide2-echarts-prompts").css("display", "none");
	// responseData = $.parseJSON(responseData);
	var currentAreaInfo = responseData;
	if (currentAreaInfo.blv_rlg_age_grp && currentAreaInfo.blv_rlg_gnd_grp && currentAreaInfo.blv_rlg_eddgr_grp && currentAreaInfo.blv_rlg_rgon_grp) {
		drawReligionTeacherAgeProportionCharts(currentAreaInfo.blv_rlg_age_grp);
		drawReligionTeacherSexProportionCharts(currentAreaInfo.blv_rlg_gnd_grp);
		drawReligionTeacherEducationLevelProportionCharts(currentAreaInfo.blv_rlg_eddgr_grp);
		drawReligionBlvRlgRgonGrpProportionCharts(currentAreaInfo.blv_rlg_rgon_grp);

		drawReligionTeacherAgeDistributionCharts(currentAreaInfo.blv_rlg_age_grp);
		drawReligionTeacherSexDistributionCharts(currentAreaInfo.blv_rlg_gnd_grp);
		drawReligionTeacherEducationLevelDistributionCharts(currentAreaInfo.blv_rlg_eddgr_grp);
		drawReligionBlvRlgRgonGrpDistributionCharts(currentAreaInfo.blv_rlg_rgon_grp);

	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide2-echarts-prompts").css("display", "block");
		$("#section4-slide1-echarts-prompts").css("display", "block");
		$("#section4-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
		section3Slide2Charts1ShowFlag = false;
		section4Slide1Charts1ShowFlag = false;
		section4Slide2Charts1ShowFlag = false;
	}

}

function drawReligionBlvRlgRgonGrpProportionCharts(currentAreaInfo) {
	if (!section4Slide1Charts1) {
		section4Slide1Charts1 = echarts.init(document.getElementById("section4-slide1-charts1-container"), echartsTheme);
	}

	var sumurbanArea = 0;
	var sumruralArea = 0;
	for (var index = 0; index < currentAreaInfo.length; index++) {
		var element = currentAreaInfo[index];
		var urbanArea = areaDataMap(element).urbanArea;
		var ruralArea = areaDataMap(element).ruralArea;;
	
		if (element.city_cd !== '') {
			sumurbanArea += Number(urbanArea);
			sumruralArea += Number(ruralArea);
		}
	}

	var titleText = "信众人员区域占比情况";
	var titleSubtext = "总数：" + (sumurbanArea + sumruralArea);
	var legendData = [];
	var seriesName = "信众人员总数";
	var seriesData = [
		{ value: sumurbanArea, name: "城区" },
		{ value: sumruralArea, name: "农村" }
	];
	for (var i = 0; i < seriesData.length; i++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);

	section4Slide1Charts1.setOption(echartsOption, true);
	section4Slide1Charts1ShowFlag = true;
}

function drawReligionBlvRlgRgonGrpDistributionCharts(childrenAreaInfoArray) {
	if (!section4Slide2Charts1) {
		section4Slide2Charts1 = echarts.init(document.getElementById("section4-slide2-charts1-container"), echartsTheme);
	}

	var areaNameArray = [];
	// 城区
	var sumurbanAreaArray = [];
	// 农村
	var sumruralAreaArray = [];

	for (var i = 0; i < childrenAreaInfoArray.length; i++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (childrenAreaInfoTemp.city_cd === '') {
			continue;
		}
		if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
			areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
		} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
			areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
		} else if (childrenAreaInfoTemp.city_cd_desc) {
			areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
		} else {
			areaNameArray.push("");
		} 

		sumurbanAreaArray.push(areaDataMap(childrenAreaInfoTemp).urbanArea);
		sumruralAreaArray.push(areaDataMap(childrenAreaInfoTemp).ruralArea);
	}

	if (areaNameArray.length > 0) {
		var titleText = "各行政区划信众人员区域分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '城区',
				type: 'bar',
				stack: '信众人员总数',
				data: sumurbanAreaArray
			},
			{
				name: '农村',
				type: 'bar',
				stack: '信众人员总数',
				data: sumruralAreaArray
			}
		];
		for (var i = 0; i < seriesArray.length; i++) {
			legendData.push(seriesArray[i].name);
		}
		var echartsOption = getBarEChartsOption(titleText, "", legendData, areaNameArray, seriesArray);
		section4Slide2Charts1.setOption(echartsOption, true);
		section4Slide2Charts1ShowFlag = true;
	} else {
		$("#section4-slide2-echarts-prompts").css("display", "block");
		section4Slide2Charts1ShowFlag = false;
	}
}


// 年龄占比情况-饼图
function drawReligionTeacherAgeProportionCharts(currentAreaInfo) {
	if (!section1Slide1Charts1) {
		section1Slide1Charts1 = echarts.init(document.getElementById("section1-slide1-charts1-container"), echartsTheme);
	}
	// console.log(currentAreaInfo);
	
	var sumless40 = 0;
	var sumbetween41And60 = 0;
	var summore61 = 0;

	for (var index = 0; index < currentAreaInfo.length; index++) {
		var element = currentAreaInfo[index];
		var sum40 = ageDataMap(element).sum40;
		var sum40and60 = ageDataMap(element).sum40and60;
		var sum61 = ageDataMap(element).sum61;;
		if (element.city_cd !== '') {
			sumless40 += sum40;
			sumbetween41And60 += sum40and60;
			summore61 += sum61;
		}
	}
	
	var titleText = "信众人员年龄占比情况";;
	var titleSubtext = "总数：" + (sumless40 + sumbetween41And60 + summore61);
	var legendData = [];
	var seriesName = "人员总数";
	var seriesData = [
		{ value: sumless40, name: "40岁以下"},
		{ value: sumbetween41And60, name: "40-60"},
		{ value: summore61, name: "60岁以上"}
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	// console.log(sumless40, sumbetween41And60, summore61);
	// console.log(titleText, titleSubtext, legendData);
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section1Slide1Charts1.setOption(echartsOption, true);
	section1Slide1Charts1ShowFlag = true;
}

function drawReligionTeacherAgeDistributionCharts(childrenAreaInfoArray) {
		if (!section1Slide2Charts1) {
			section1Slide2Charts1 = echarts.init(document.getElementById("section1-slide2-charts1-container"), echartsTheme);
		}
		
		var areaNameArray = [];
		// 40岁以下
		var under40AgeTeacherNumberArray = [];
		// 41岁到60岁
		var between41And60AgeTeacherNumberArray = [];
		// 61岁以上
		var over61AgeTeacherNumberArray = [];
	
		for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
			var childrenAreaInfoTemp = childrenAreaInfoArray[i];
			if (childrenAreaInfoTemp.city_cd === '') {
				continue;
			}
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
			}

			under40AgeTeacherNumberArray.push(ageDataMap(childrenAreaInfoTemp).sum40);
			between41And60AgeTeacherNumberArray.push(ageDataMap(childrenAreaInfoTemp).sum40and60);
			over61AgeTeacherNumberArray.push(ageDataMap(childrenAreaInfoTemp).sum61);
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划信众人员年龄段分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '40岁以下',
				type: 'bar',
				stack: '信众人员总数',
				data: under40AgeTeacherNumberArray
			},
			{
				name: '40-60',
				type: 'bar',
				stack: '信众人员总数',
				data: between41And60AgeTeacherNumberArray
			},
			{
				name: '60岁以上',
				type: 'bar',
				stack: '信众人员总数',
				data: over61AgeTeacherNumberArray
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
	
	var summale = 0;
	var sumfemale = 0;

	for (var index = 0; index < currentAreaInfo.length; index++) {
		var element = currentAreaInfo[index];
		var summaleTemp = sexDataMap(element).summaleTemp;
		var sumfemaleTemp = sexDataMap(element).sumfemaleTemp;
		
		if (element.city_cd !== '') {
			summale += summaleTemp;
			sumfemale += sumfemaleTemp;
		}
	}


	var titleSubtext = "总数：" + (summale + sumfemale);
	var titleText = "信众人员性别占比情况";
	var legendData = [];
	var seriesName = "信众人员总数";
	var seriesData = [
		{ value: summale, name: "男性"},
		{ value: sumfemale, name: "女性"}
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
	
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
			var childrenAreaInfoTemp = childrenAreaInfoArray[i];
			if (childrenAreaInfoTemp.city_cd === '') {
				continue;
			}
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
		} 
		
		maleTeacherNumberArray.push(sexDataMap(childrenAreaInfoTemp).summaleTemp);
		femaleTeacherNumberArray.push(sexDataMap(childrenAreaInfoTemp).sumfemaleTemp);
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划信众人员性别分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '男性',
				type: 'bar',
				stack: '信众人员总数',
				data: maleTeacherNumberArray
			},
			{
				name: '女性',
				type: 'bar',
				stack: '信众人员总数',
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

	var sumjnrMdlSchUdTch = 0;
	var sumsnrHighSchTch = 0;
	var sumjnrClgTch = 0;
	var summastTch = 0;
	for (var index = 0; index < currentAreaInfo.length; index++) {
		var element = currentAreaInfo[index];
		var mdlSchUdTch = educationLevelDataMap(element).mdlSchUdTch; // 初中及以下
		var highSchTch = educationLevelDataMap(element).highSchTch; // 高中/中专
		var clgTch = educationLevelDataMap(element).clgTch;// 大专/本科
		var tch = educationLevelDataMap(element).tch; // 研究生以上
	
		if (element.city_cd !== '') {
			sumjnrMdlSchUdTch += Number(mdlSchUdTch);
			sumsnrHighSchTch += Number(highSchTch);
			sumjnrClgTch += Number(clgTch);
			summastTch += Number(tch);
		}
	}
	
	var titleText = "信众人员文化程度占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tch_num;
	var legendData = [];
	var seriesName = "信众人员总数";
	var seriesData = [
		{ value: summastTch, name: "研究生以上"},
		{ value: sumjnrClgTch, name: "本科/大专"},
		{ value: sumsnrHighSchTch, name: "高中/中专"},
		{ value: sumjnrMdlSchUdTch, name: "初中及以下"}
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

	// 研究生以上
	var masterTeacherNumberArray = [];
	// 本科/大专
	var bachelorTeacherNumberArray = [];
	// 中专/高中
	var seniorHighSchoolTeacherNumberArray = [];
	// 初中及以下
	var juniorHighSchoolAndBelowTeacherNumberArray = [];
	

	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
			if (childrenAreaInfoTemp.city_cd === '') {
				continue;
			}
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.push(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.push(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.push(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.push("");
			}

		masterTeacherNumberArray.push(educationLevelDataMap(childrenAreaInfoTemp).tch);
		bachelorTeacherNumberArray.push(educationLevelDataMap(childrenAreaInfoTemp).clgTch);
		seniorHighSchoolTeacherNumberArray.push(educationLevelDataMap(childrenAreaInfoTemp).highSchTch);
		juniorHighSchoolAndBelowTeacherNumberArray.push(educationLevelDataMap(childrenAreaInfoTemp).mdlSchUdTch);
		
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "各行政区划信众人员文化程度分布";
		var legendData = [];
		var seriesArray = [
			{
				name: '研究生以上',
				type: 'bar',
				stack: '信众人员总数',
				data: masterTeacherNumberArray
			},
			{
				name: '本科/大专',
				type: 'bar',
				stack: '信众人员总数',
				data: bachelorTeacherNumberArray
			},{
				name: '高中/中专',
				type: 'bar',
				stack: '信众人员总数',
				data: seniorHighSchoolTeacherNumberArray
			},
			{
				name: '初中及以下',
				type: 'bar',
				stack: '信众人员总数',
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

	try {
		section4Slide1Charts1.clear();
	} catch (e) { }
	try {
		section4Slide2Charts1.clear();
	} catch (e) { }
	
	section1Slide1Charts1ShowFlag = false;
	section1Slide2Charts1ShowFlag = false;
	
	section2Slide1Charts1ShowFlag = false;
	section2Slide2Charts1ShowFlag = false;
	
	section3Slide1Charts1ShowFlag = false;
	section3Slide2Charts1ShowFlag = false;
	
	section4Slide1Charts1ShowFlag = false;
	section4Slide2Charts1ShowFlag = false;
	getReligionTeacherDistributionData();
}

function getAreaData(currentAreaCode, getAreaDataHandle) {
	var requestData = {
		adiv_cd:currentAreaCode
	};
	
	AjaxRequest("/api/rgoncd", getAreaDataHandle, requestData, "POST");
}

function areaDataMap(element) {
	var urbanArea = 0;
	var ruralArea = 0;
	if (sectTag === 1) { //总
		urbanArea += Number(element.sumurbanArea);
		ruralArea += Number(element.sumruralArea);

	} else if (sectTag === 2) { // 佛
		urbanArea += Number(element.urbanAreaBuddhism);
		ruralArea += Number(element.ruralAreaBuddhism);

	} else if (sectTag === 3) { //道
		urbanArea += Number(element.urbanAreaTaoism);
		ruralArea += Number(element.ruralAreaTaoism);

	} else if (sectTag === 4) { // 伊
		urbanArea += Number(element.urbanAreaIslamism);
		ruralArea += Number(element.ruralAreaIslamism);

	} else if (sectTag === 5) {//天
		urbanArea += Number(element.urbanAreaCatholicism);
		ruralArea += Number(element.ruralAreaCatholicism);

	} else if (sectTag === 6) {//基
		urbanArea += Number(element.urbanAreaChristianity);
		ruralArea += Number(element.ruralAreaChristianity);
	}
	return { urbanArea: urbanArea, ruralArea: ruralArea};
}

function educationLevelDataMap(element) {
	var mdlSchUdTch = 0; // 初中及以下
	var highSchTch = 0; // 高中/中专
	var clgTch = 0;// 大专/本科
	var tch = 0; // 研究生以上
	if (sectTag === 1) { //总
		mdlSchUdTch += Number(element.sumjnrMdlSchUdTch);
		highSchTch += Number(element.sumsnrHighSchTch);
		clgTch += Number(element.sumjnrClgTch);
		tch += Number(element.summastTch);

	} else if (sectTag === 2) { // 佛
		mdlSchUdTch += Number(element.bdhsmJnrmdlschUdBlvNum);
		highSchTch += Number(element.bdhsmSnrhighschBlvNum);
		clgTch += Number(element.bdhsmJnrclgBlvNum);
		tch += Number(element.bdhsmMastBlvNum);
	} else if (sectTag === 3) { //道
		mdlSchUdTch += Number(element.tsmJnrmdlschUdBlvNum);
		highSchTch += Number(element.tsmSnrhighschBlvNum);
		clgTch += Number(element.tsmJnrclgBlvNum);
		tch += Number(element.tsmMastBlvNum);

	} else if (sectTag === 4) { // 伊
		mdlSchUdTch += Number(element.islmJnrmdlschUdBlvNum);
		highSchTch += Number(element.islmSnrhighschBlvNum);
		clgTch += Number(element.islmJnrclgBlvNum);
		tch += Number(element.islmMastBlvNum);

	} else if (sectTag === 5) {//天
		mdlSchUdTch += Number(element.ctlcJnrmdlschUdBlvNum);
		highSchTch += Number(element.ctlcSnrhighschBlvNum);
		clgTch += Number(element.ctlcJnrclgBlvNum);
		tch += Number(element.ctlcMastBlvNum);

	} else if (sectTag === 6) {//基
		mdlSchUdTch += Number(element.chrstJnrmdlschUdBlvNum);
		highSchTch += Number(element.chrstSnrhighschBlvNum);
		clgTch += Number(element.chrstJnrclgBlvNum);
		tch += Number(element.chrstMastBlvNum);
	}
	return { mdlSchUdTch: mdlSchUdTch, highSchTch: highSchTch, clgTch: clgTch, tch: tch};
}

function sexDataMap(element) {
	var summaleTemp = 0;
	var sumfemaleTemp = 0;
	if (sectTag === 1) { //总
		summaleTemp = Number(element.summale);
		sumfemaleTemp = Number(element.sumfemale);
	} else if (sectTag === 2) { // 佛
		summaleTemp = Number(element.maleBuddhism);
		sumfemaleTemp = Number(element.femaleBuddhism);

	} else if (sectTag === 3) { //道
		summaleTemp = Number(element.maleTaoism);
		sumfemaleTemp = Number(element.femaleTaoism);

	} else if (sectTag === 4) { // 伊
		summaleTemp = Number(element.maleIslamism);
		sumfemaleTemp = Number(element.femaleIslamism);

	} else if (sectTag === 5) {//天
		summaleTemp = Number(element.maleCatholicism);
		sumfemaleTemp = Number(element.femaleCatholicism);

	} else if (sectTag === 6) {//基
		summaleTemp = Number(element.maleChristianity);
		sumfemaleTemp = Number(element.femaleChristianity);

	}
	return { summaleTemp: summaleTemp, sumfemaleTemp: sumfemaleTemp}
}

function ageDataMap(element) {
	var sum40 = 0;
	var sum40and60 = 0;
	var sum61 = 0;
	if (sectTag === 1) { //总
		sum40 = Number(element.sumless40);
		sum40and60 = Number(element.sumbetween41And60);
		sum61 = Number(element.summore61);
	} else if (sectTag === 2) {//佛
		sum40 = Number(element.less40Buddhism);
		sum40and60 = Number(element.between41And60Buddhism);
		sum61 = Number(element.more61Buddhism);
	} else if (sectTag === 3) {//道
		sum40 = Number(element.less40Taoism);
		sum40and60 = Number(element.between41And60Taoism);
		sum61 = Number(element.more61Taoism);
	} else if (sectTag === 4) {//伊
		sum40 = Number(element.less40Islamism);
		sum40and60 = Number(element.between41And60Islamism);
		sum61 = Number(element.more61Islamism);
	} else if (sectTag === 5) {//天
		sum40 = Number(element.less40Catholicism);
		sum40and60 = Number(element.between41And60Catholicism);
		sum61 = Number(element.more61Catholicism);
	} else if (sectTag === 6) {//基
		sum40 = Number(element.less40Christianity);
		sum40and60 = Number(element.between41And60Christianity);
		sum61 = Number(element.more61Christianity);
	}
	return { sum40: sum40, sum40and60: sum40and60, sum61: sum61};
}