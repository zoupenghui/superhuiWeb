
var section1Slide1Charts1;
var section1Slide2Charts1;
var section2Slide1Charts1;
var section2Slide2Charts1;

var section1Slide1Charts1ShowFlag = false;
var section1Slide2Charts1ShowFlag = false;
var section2Slide1Charts1ShowFlag = false;
var section2Slide2Charts1ShowFlag = false;

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
	
	// 加载各教派场所分布数据
	getReligionSiteDistributionData();
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

function getReligionSiteDistributionData() {
	if (section1Slide1Charts1ShowFlag || section1Slide2Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/site_num_rslt/search", getReligionSiteDistributionDataHandle, requestData, "POST", function () {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
	});
}

function getReligionSiteDistributionDataHandle(responseData) {
	if (!responseData) {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		
		return;
	}
	// responseData = $.parseJSON(responseData.rslt);
	
	$("#section1-slide1-echarts-prompts").css("display", "none");
	$("#section1-slide2-echarts-prompts").css("display", "none");
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	
	var currentAreaInfoArray = [];
	var currentAreaLevel = 0;
	var childrenAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		if (responseData.site_s_num_grp) {
			currentAreaInfoArray = responseData.site_s_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 4;
		childrenAreaInfoArray = [];
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		if (responseData.site_z_num_grp) {
			currentAreaInfoArray = responseData.site_z_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 3;
		if (responseData.site_s_num_grp) {
			childrenAreaInfoArray = responseData.site_s_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		if (responseData.site_c_num_grp) {
			currentAreaInfoArray = responseData.site_c_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 2;
		if (responseData.site_z_num_grp) {
			childrenAreaInfoArray = responseData.site_z_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		if (responseData.site_p_num_grp) {
			currentAreaInfoArray = responseData.site_p_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 1;
		if (responseData.site_c_num_grp) {
			childrenAreaInfoArray = responseData.site_c_num_grp;
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
		// 绘制宗教场所占比情况环状图
		drawReligionSiteProportionCharts(currentAreaInfo);
	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
	}
	drawReligionSiteDistributionCharts(childrenAreaInfoArray);
}

function drawReligionSiteProportionCharts(currentAreaInfo) {
	if (!section1Slide1Charts1) {
		section1Slide1Charts1 = echarts.init(document.getElementById("section1-slide1-charts1-container"), echartsTheme);
	}
	
	var echartsOption = {
		title: {
			text: "宗教场所占比情况",
			subtext: "总数：" + currentAreaInfo.site_num,
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
			data: ["佛教", "道教", "伊斯兰教", "天主教", "基督教", "民间信仰"]
		},
		series : [
			{
				name:"场所总数",
				type: "pie",
				radius : ["40%", "60%"],
				center: ["50%", "50%"],
				selectedMode: "single",
				data:[
					{value:currentAreaInfo.bdhsm_site_num, name: "佛教"},
					{value:currentAreaInfo.tsm_site_num, name: "道教"},
					{value:currentAreaInfo.islm_site_num, name: "伊斯兰教"},
					{value:currentAreaInfo.ctlc_site_num, name: "天主教"},
					{value:currentAreaInfo.chrst_site_num, name: "基督教"},
					{value:currentAreaInfo.folk_rlg_site_num, name: "民间信仰"}
				],
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
	
	section1Slide1Charts1.setOption(echartsOption, true);
	section1Slide1Charts1ShowFlag = true;
}

function drawReligionSiteDistributionCharts(childrenAreaInfoArray) {
	if (!section1Slide2Charts1) {
		section1Slide2Charts1 = echarts.init(document.getElementById("section1-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 佛教
	var buddhistSiteNumberArray = [];
	// 道教
	var taoistSiteNumberArray = [];
	// 基督教
	var christianSiteNumberArray = [];
	// 天主教
	var catholicSiteNumberArray = [];
	// 伊斯兰教
	var islamicSiteNumberArray = [];
	// 民间信仰
	var folkBeliefSiteNumberArray = [];
	
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
			
			buddhistSiteNumberArray.push(childrenAreaInfoTemp.bdhsm_site_num);
			taoistSiteNumberArray.push(childrenAreaInfoTemp.tsm_site_num);
			christianSiteNumberArray.push(childrenAreaInfoTemp.chrst_site_num);
			catholicSiteNumberArray.push(childrenAreaInfoTemp.ctlc_site_num);
			islamicSiteNumberArray.push(childrenAreaInfoTemp.islm_site_num);
			folkBeliefSiteNumberArray.push(childrenAreaInfoTemp.folk_rlg_site_num);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var echartsOption = {
			title: {
				text: '宗教场所分布',
				left: "center"
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ["佛教", "道教", "伊斯兰教", "天主教", "基督教", "民间信仰"],
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
				data: areaNameArray
			},
			series: [
				{
					name: '佛教',
					type: 'bar',
					stack: '场所总数',
					data: buddhistSiteNumberArray
				},
				{
					name: '道教',
					type: 'bar',
					stack: '场所总数',
					data: taoistSiteNumberArray
				},
				{
					name: '伊斯兰教',
					type: 'bar',
					stack: '场所总数',
					data: islamicSiteNumberArray
				},
				{
					name: '天主教',
					type: 'bar',
					stack: '场所总数',
					data: catholicSiteNumberArray
				},
				{
					name: '基督教',
					type: 'bar',
					stack: '场所总数',
					data: christianSiteNumberArray
				},
				{
					name: '民间信仰',
					type: 'bar',
					stack: '场所总数',
					data: folkBeliefSiteNumberArray
				}
			]
		};
		section1Slide2Charts1.setOption(echartsOption, true);
		section1Slide2Charts1ShowFlag = true;
	} else {
		$("#section1-slide2-echarts-prompts").css("display", "block");
		section1Slide2Charts1ShowFlag = false;
	}
}

function getReligionTeacherDistributionData() {
	if (section2Slide1Charts1ShowFlag || section2Slide2Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/tch_num_rslt/search", getReligionTeacherDistributionDataHandle, requestData, "POST", function () {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
	});
}

function getReligionTeacherDistributionDataHandle(responseData) {
	if (!responseData) {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		
		return;
	}
	// responseData = $.parseJSON(responseData.rslt);
	
	$("#section2-slide1-echarts-prompts").css("display", "none");
	$("#section2-slide2-echarts-prompts").css("display", "none");
	
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
		drawReligionTeacherProportionCharts(currentAreaInfo);
	} else {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
	}
	drawReligionTeacherDistributionCharts(childrenAreaInfoArray);
}

function drawReligionTeacherProportionCharts(currentAreaInfo) {
	if (!section2Slide1Charts1) {
		section2Slide1Charts1 = echarts.init(document.getElementById("section2-slide1-charts1-container"), echartsTheme);
	}
	
	var echartsOption = {
		title: {
			text: "宗教教职人员占比情况",
			subtext: "总数：" + currentAreaInfo.tch_num,
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
			data: ["佛教", "道教", "伊斯兰教", "天主教", "基督教", "民间信仰"]
		},
		series : [
			{
				name:"场所总数",
				type: "pie",
				radius : ["40%", "60%"],
				center: ["50%", "50%"],
				selectedMode: "single",
				data:[
					{value:currentAreaInfo.bdhsm_tch_num, name: "佛教"},
					{value:currentAreaInfo.tsm_tch_num, name: "道教"},
					{value:currentAreaInfo.islm_tch_num, name: "伊斯兰教"},
					{value:currentAreaInfo.ctlc_tch_num, name: "天主教"},
					{value:currentAreaInfo.chrst_tch_num, name: "基督教"},
					{value:currentAreaInfo.folk_rlg_tch_num, name: "民间信仰"}
				],
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
	
	section2Slide1Charts1.setOption(echartsOption, true);
	section2Slide1Charts1ShowFlag = true;
}

function drawReligionTeacherDistributionCharts(childrenAreaInfoArray) {
	if (!section2Slide2Charts1) {
		section2Slide2Charts1 = echarts.init(document.getElementById("section2-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 佛教
	var buddhistTeacherNumberArray = [];
	// 道教
	var taoistTeacherNumberArray = [];
	// 基督教
	var christianTeacherNumberArray = [];
	// 天主教
	var catholicTeacherNumberArray = [];
	// 伊斯兰教
	var islamicTeacherNumberArray = [];
	// 民间信仰
	var folkBeliefTeacherNumberArray = [];
	
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
			
			buddhistTeacherNumberArray.push(childrenAreaInfoTemp.bdhsm_tch_num);
			taoistTeacherNumberArray.push(childrenAreaInfoTemp.tsm_tch_num);
			christianTeacherNumberArray.push(childrenAreaInfoTemp.chrst_tch_num);
			catholicTeacherNumberArray.push(childrenAreaInfoTemp.ctlc_tch_num);
			islamicTeacherNumberArray.push(childrenAreaInfoTemp.islm_tch_num);
			folkBeliefTeacherNumberArray.push(childrenAreaInfoTemp.folk_rlg_tch_num);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var echartsOption = {
			title: {
				text: '宗教教职人员分布',
				left: "center"
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ["佛教", "道教", "伊斯兰教", "天主教", "基督教", "民间信仰"],
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
				data: areaNameArray
			},
			series: [
				{
					name: '佛教',
					type: 'bar',
					stack: '教职人员总数',
					data: buddhistTeacherNumberArray
				},
				{
					name: '道教',
					type: 'bar',
					stack: '教职人员总数',
					data: taoistTeacherNumberArray
				},
				{
					name: '伊斯兰教',
					type: 'bar',
					stack: '教职人员总数',
					data: islamicTeacherNumberArray
				},
				{
					name: '天主教',
					type: 'bar',
					stack: '教职人员总数',
					data: catholicTeacherNumberArray
				},
				{
					name: '基督教',
					type: 'bar',
					stack: '教职人员总数',
					data: christianTeacherNumberArray
				},
				{
					name: '民间信仰',
					type: 'bar',
					stack: '教职人员总数',
					data: folkBeliefTeacherNumberArray
				}
			]
		};
		section2Slide2Charts1.setOption(echartsOption, true);
		section2Slide2Charts1ShowFlag = true;
	} else {
		$("#section2-slide2-echarts-prompts").css("display", "block");
		section2Slide2Charts1ShowFlag = false;
	}
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
	
	section1Slide1Charts1ShowFlag = false;
	section1Slide2Charts1ShowFlag = false;
	section2Slide1Charts1ShowFlag = false;
	section2Slide2Charts1ShowFlag = false;
	
	getReligionSiteDistributionData();
	getReligionTeacherDistributionData();
}

function getAreaData(currentAreaCode, getAreaDataHandle) {
	var requestData = {
		adiv_cd:currentAreaCode
	};
	
	AjaxRequest("/api/rgoncd", getAreaDataHandle, requestData, "POST");
}

