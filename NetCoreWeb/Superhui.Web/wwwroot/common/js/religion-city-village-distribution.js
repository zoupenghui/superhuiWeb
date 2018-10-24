
var section1Slide1Charts1;
var section1Slide2Charts1;
var section1Slide3Charts1;
var section1Slide4Charts1;
var section1Slide5Charts1;
var section1Slide6Charts1;
var section2Slide1Charts1;
var section2Slide2Charts1;
var section2Slide3Charts1;
var section2Slide4Charts1;
var section2Slide5Charts1;
var section2Slide6Charts1;

var section1Slide1Charts1ShowFlag = false;
var section1Slide2Charts1ShowFlag = false;
var section1Slide3Charts1ShowFlag = false;
var section1Slide4Charts1ShowFlag = false;
var section1Slide5Charts1ShowFlag = false;
var section1Slide6Charts1ShowFlag = false;
var section2Slide1Charts1ShowFlag = false;
var section2Slide2Charts1ShowFlag = false;
var section2Slide3Charts1ShowFlag = false;
var section2Slide4Charts1ShowFlag = false;
var section2Slide5Charts1ShowFlag = false;
var section2Slide6Charts1ShowFlag = false;

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
	
	getReligionSiteDistributionData();
	getBelieversDistributionData();
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
	if (section1Slide1Charts1ShowFlag || section1Slide2Charts1ShowFlag || section1Slide3Charts1ShowFlag || section1Slide4Charts1ShowFlag || section1Slide5Charts1ShowFlag || section1Slide6Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/sitergon_num_rslt/search", getReligionSiteDistributionDataHandle, requestData, "POST", function () {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section1-slide3-echarts-prompts").css("display", "block");
		$("#section1-slide4-echarts-prompts").css("display", "block");
		$("#section1-slide5-echarts-prompts").css("display", "block");
		$("#section1-slide6-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section1Slide3Charts1ShowFlag = false;
		section1Slide4Charts1ShowFlag = false;
		section1Slide5Charts1ShowFlag = false;
		section1Slide6Charts1ShowFlag = false;
	});
}

function getReligionSiteDistributionDataHandle(responseData) {
	if (!responseData) {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section1-slide3-echarts-prompts").css("display", "block");
		$("#section1-slide4-echarts-prompts").css("display", "block");
		$("#section1-slide5-echarts-prompts").css("display", "block");
		$("#section1-slide6-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section1Slide3Charts1ShowFlag = false;
		section1Slide4Charts1ShowFlag = false;
		section1Slide5Charts1ShowFlag = false;
		section1Slide6Charts1ShowFlag = false;
		
		return;
	}
	// responseData = $.parseJSON(responseData.rslt);
	
	$("#section1-slide1-echarts-prompts").css("display", "none");
	$("#section1-slide2-echarts-prompts").css("display", "none");
	$("#section1-slide3-echarts-prompts").css("display", "none");
	$("#section1-slide4-echarts-prompts").css("display", "none");
	$("#section1-slide5-echarts-prompts").css("display", "none");
	$("#section1-slide6-echarts-prompts").css("display", "none");
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	
	var currentAreaInfoArray = [];
	var currentAreaLevel = 0;
	var childrenAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		if (responseData.site_rgon_s_num_grp) {
			currentAreaInfoArray = responseData.site_rgon_s_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 4;
		childrenAreaInfoArray = [];
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		if (responseData.site_rgon_z_num_grp) {
			currentAreaInfoArray = responseData.site_rgon_z_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 3;
		if (responseData.site_rgon_s_num_grp) {
			childrenAreaInfoArray = responseData.site_rgon_s_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		if (responseData.site_rgon_c_num_grp) {
			currentAreaInfoArray = responseData.site_rgon_c_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 2;
		if (responseData.site_rgon_z_num_grp) {
			childrenAreaInfoArray = responseData.site_rgon_z_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		if (responseData.site_rgon_p_num_grp) {
			currentAreaInfoArray = responseData.site_rgon_p_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 1;
		if (responseData.site_rgon_c_num_grp) {
			childrenAreaInfoArray = responseData.site_rgon_c_num_grp;
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
		drawReligionSiteCityAndVillageProportionCharts(currentAreaInfo);
		drawBuddhistSiteCityAndVillageProportionCharts(currentAreaInfo);
		drawTaoistSiteCityAndVillageProportionCharts(currentAreaInfo);
		drawChristianSiteCityAndVillageProportionCharts(currentAreaInfo);
		drawCatholicSiteCityAndVillageProportionCharts(currentAreaInfo);
		drawIslamicSiteCityAndVillageProportionCharts(currentAreaInfo);
	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		$("#section1-slide2-echarts-prompts").css("display", "block");
		$("#section1-slide3-echarts-prompts").css("display", "block");
		$("#section1-slide4-echarts-prompts").css("display", "block");
		$("#section1-slide5-echarts-prompts").css("display", "block");
		$("#section1-slide6-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
		section1Slide2Charts1ShowFlag = false;
		section1Slide3Charts1ShowFlag = false;
		section1Slide4Charts1ShowFlag = false;
		section1Slide5Charts1ShowFlag = false;
		section1Slide6Charts1ShowFlag = false;
	}
}

function drawReligionSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide1Charts1) {
		section1Slide1Charts1 = echarts.init(document.getElementById("section1-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.site_num;
	var seriesData = [
		{value:currentAreaInfo.city_site_num, name: "城市"},
		{value:currentAreaInfo.vil_site_num, name: "农村"},
		{value:currentAreaInfo.unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide1Charts1.setOption(echartsOption, true);
	section1Slide1Charts1ShowFlag = true;
}

function drawBuddhistSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide2Charts1) {
		section1Slide2Charts1 = echarts.init(document.getElementById("section1-slide2-charts1-container"), echartsTheme);
	}
	
	var titleText = "佛教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.bdhsm_site_num;
	var seriesData = [
		{value:currentAreaInfo.bdhsm_city_site_num, name: "城市"},
		{value:currentAreaInfo.bdhsm_vil_site_num, name: "农村"},
		{value:currentAreaInfo.bdhsm_unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide2Charts1.setOption(echartsOption, true);
	section1Slide2Charts1ShowFlag = true;
}

function drawTaoistSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide3Charts1) {
		section1Slide3Charts1 = echarts.init(document.getElementById("section1-slide3-charts1-container"), echartsTheme);
	}
	
	var titleText = "道教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tsm_site_num;
	var seriesData = [
		{value:currentAreaInfo.tsm_city_site_num, name: "城市"},
		{value:currentAreaInfo.tsm_vil_site_num, name: "农村"},
		{value:currentAreaInfo.tsm_unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide3Charts1.setOption(echartsOption, true);
	section1Slide3Charts1ShowFlag = true;
}

function drawIslamicSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide6Charts1) {
		section1Slide6Charts1 = echarts.init(document.getElementById("section1-slide4-charts1-container"), echartsTheme);
	}
	
	var titleText = "伊斯兰教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.islm_site_num;
	var seriesData = [
		{value:currentAreaInfo.islm_city_site_num, name: "城市"},
		{value:currentAreaInfo.islm_vil_site_num, name: "农村"},
		{value:currentAreaInfo.islm_unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide6Charts1.setOption(echartsOption, true);
	section1Slide6Charts1ShowFlag = true;
}

function drawCatholicSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide5Charts1) {
		section1Slide5Charts1 = echarts.init(document.getElementById("section1-slide5-charts1-container"), echartsTheme);
	}
	
	var titleText = "天主教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.ctlc_site_num;
	var seriesData = [
		{value:currentAreaInfo.ctlc_city_site_num, name: "城市"},
		{value:currentAreaInfo.ctlc_vil_site_num, name: "农村"},
		{value:currentAreaInfo.ctlc_unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide5Charts1.setOption(echartsOption, true);
	section1Slide5Charts1ShowFlag = true;
}

function drawChristianSiteCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section1Slide4Charts1) {
		section1Slide4Charts1 = echarts.init(document.getElementById("section1-slide6-charts1-container"), echartsTheme);
	}
	
	var titleText = "基督教场所城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.chrst_site_num;
	var seriesData = [
		{value:currentAreaInfo.chrst_city_site_num, name: "城市"},
		{value:currentAreaInfo.chrst_vil_site_num, name: "农村"},
		{value:currentAreaInfo.chrst_unkn_site_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section1Slide4Charts1.setOption(echartsOption, true);
	section1Slide4Charts1ShowFlag = true;
}

function getBelieversDistributionData() {
	if (section2Slide1Charts1ShowFlag || section2Slide2Charts1ShowFlag) {
		return;
	}
	
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/blvrgon_num_rslt/search", getBelieversDistributionDataHandle, requestData, "POST", function () {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide3-echarts-prompts").css("display", "block");
		$("#section2-slide4-echarts-prompts").css("display", "block");
		$("#section2-slide5-echarts-prompts").css("display", "block");
		$("#section2-slide6-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section2Slide3Charts1ShowFlag = false;
		section2Slide4Charts1ShowFlag = false;
		section2Slide5Charts1ShowFlag = false;
		section2Slide6Charts1ShowFlag = false;
	});
}

function getBelieversDistributionDataHandle(responseData) {
	if (!responseData) {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide3-echarts-prompts").css("display", "block");
		$("#section2-slide4-echarts-prompts").css("display", "block");
		$("#section2-slide5-echarts-prompts").css("display", "block");
		$("#section2-slide6-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section2Slide3Charts1ShowFlag = false;
		section2Slide4Charts1ShowFlag = false;
		section2Slide5Charts1ShowFlag = false;
		section2Slide6Charts1ShowFlag = false;
		
		return;
	}
	// responseData = $.parseJSON(responseData.rslt);
	
	$("#section2-slide1-echarts-prompts").css("display", "none");
	$("#section2-slide2-echarts-prompts").css("display", "none");
	$("#section2-slide3-echarts-prompts").css("display", "none");
	$("#section2-slide4-echarts-prompts").css("display", "none");
	$("#section2-slide5-echarts-prompts").css("display", "none");
	$("#section2-slide6-echarts-prompts").css("display", "none");
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	
	var currentAreaInfoArray = [];
	var currentAreaLevel = 0;
	var childrenAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		if (responseData.blv_rgon_s_num_grp) {
			currentAreaInfoArray = responseData.blv_rgon_s_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 4;
		childrenAreaInfoArray = [];
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		if (responseData.blv_rgon_z_num_grp) {
			currentAreaInfoArray = responseData.blv_rgon_z_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 3;
		if (responseData.blv_rgon_s_num_grp) {
			childrenAreaInfoArray = responseData.blv_rgon_s_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		if (responseData.blv_rgon_c_num_grp) {
			currentAreaInfoArray = responseData.blv_rgon_c_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 2;
		if (responseData.blv_rgon_z_num_grp) {
			childrenAreaInfoArray = responseData.blv_rgon_z_num_grp;
		} else {
			childrenAreaInfoArray = [];
		}
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		if (responseData.blv_rgon_p_num_grp) {
			currentAreaInfoArray = responseData.blv_rgon_p_num_grp;
		} else {
			currentAreaInfoArray = [];
		}
		currentAreaLevel = 1;
		if (responseData.blv_rgon_c_num_grp) {
			childrenAreaInfoArray = responseData.blv_rgon_c_num_grp;
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
		drawBelieversCityAndVillageProportionCharts(currentAreaInfo);
		drawBuddhistBelieversCityAndVillageProportionCharts(currentAreaInfo);
		drawTaoistBelieversCityAndVillageProportionCharts(currentAreaInfo);
		drawChristianBelieversCityAndVillageProportionCharts(currentAreaInfo);
		drawCatholicBelieversCityAndVillageProportionCharts(currentAreaInfo);
		drawIslamicBelieversCityAndVillageProportionCharts(currentAreaInfo);
	} else {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section2-slide2-echarts-prompts").css("display", "block");
		$("#section2-slide3-echarts-prompts").css("display", "block");
		$("#section2-slide4-echarts-prompts").css("display", "block");
		$("#section2-slide5-echarts-prompts").css("display", "block");
		$("#section2-slide6-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section2Slide2Charts1ShowFlag = false;
		section2Slide3Charts1ShowFlag = false;
		section2Slide4Charts1ShowFlag = false;
		section2Slide5Charts1ShowFlag = false;
		section2Slide6Charts1ShowFlag = false;
	}
}

function drawBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide1Charts1) {
		section2Slide1Charts1 = echarts.init(document.getElementById("section2-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.blv_num;
	var seriesData = [
		{value:currentAreaInfo.city_blv_num, name: "城市"},
		{value:currentAreaInfo.vil_blv_num, name: "农村"},
		{value:currentAreaInfo.unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide1Charts1.setOption(echartsOption, true);
	section2Slide1Charts1ShowFlag = true;
}

function drawBuddhistBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide2Charts1) {
		section2Slide2Charts1 = echarts.init(document.getElementById("section2-slide2-charts1-container"), echartsTheme);
	}
	
	var titleText = "佛教信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.bdhsm_blv_num;
	var seriesData = [
		{value:currentAreaInfo.bdhsm_city_blv_num, name: "城市"},
		{value:currentAreaInfo.bdhsm_vil_blv_num, name: "农村"},
		{value:currentAreaInfo.bdhsm_unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide2Charts1.setOption(echartsOption, true);
	section2Slide2Charts1ShowFlag = true;
}

function drawTaoistBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide3Charts1) {
		section2Slide3Charts1 = echarts.init(document.getElementById("section2-slide3-charts1-container"), echartsTheme);
	}
	
	var titleText = "道教信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tsm_blv_num;
	var seriesData = [
		{value:currentAreaInfo.tsm_city_blv_num, name: "城市"},
		{value:currentAreaInfo.tsm_vil_blv_num, name: "农村"},
		{value:currentAreaInfo.tsm_unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide3Charts1.setOption(echartsOption, true);
	section2Slide3Charts1ShowFlag = true;
}

function drawIslamicBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide6Charts1) {
		section2Slide6Charts1 = echarts.init(document.getElementById("section2-slide4-charts1-container"), echartsTheme);
	}
	
	var titleText = "伊斯兰教信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.islm_blv_num;
	var seriesData = [
		{value:currentAreaInfo.islm_city_blv_num, name: "城市"},
		{value:currentAreaInfo.islm_vil_blv_num, name: "农村"},
		{value:currentAreaInfo.islm_unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide6Charts1.setOption(echartsOption, true);
	section2Slide6Charts1ShowFlag = true;
}

function drawCatholicBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide5Charts1) {
		section2Slide5Charts1 = echarts.init(document.getElementById("section2-slide5-charts1-container"), echartsTheme);
	}
	
	var titleText = "天主教信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.ctlc_blv_num;
	var seriesData = [
		{value:currentAreaInfo.ctlc_city_blv_num, name: "城市"},
		{value:currentAreaInfo.ctlc_vil_blv_num, name: "农村"},
		{value:currentAreaInfo.ctlc_unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide5Charts1.setOption(echartsOption, true);
	section2Slide5Charts1ShowFlag = true;
}


function drawChristianBelieversCityAndVillageProportionCharts(currentAreaInfo) {
	if (!section2Slide4Charts1) {
		section2Slide4Charts1 = echarts.init(document.getElementById("section2-slide6-charts1-container"), echartsTheme);
	}
	
	var titleText = "基督教信众城市/农村地区分布占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.chrst_blv_num;
	var seriesData = [
		{value:currentAreaInfo.chrst_city_blv_num, name: "城市"},
		{value:currentAreaInfo.chrst_vil_blv_num, name: "农村"},
		{value:currentAreaInfo.chrst_unkn_blv_num, name: "未知区域"}
	];
	var echartsOption = getEChartsOption(titleText, titleSubtext, seriesData);
	
	section2Slide4Charts1.setOption(echartsOption, true);
	section2Slide4Charts1ShowFlag = true;
}

function getEChartsOption(titleText, titleSubtext, seriesData) {
	var echartsOption = {
		title: {
			text: titleText,
			subtext: titleSubtext,
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
			data: ["城市", "农村", "未知区域"]
		},
		series : [
			{
				name:"场所总数",
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

function selectedAreaChangedHandle() {
	try {
		section1Slide1Charts1.clear();
	} catch (e) {}
	try {
		section1Slide2Charts1.clear();
	} catch (e) {}
	try {
		section1Slide3Charts1.clear();
	} catch (e) {}
	try {
		section1Slide4Charts1.clear();
	} catch (e) {}
	try {
		section1Slide5Charts1.clear();
	} catch (e) {}
	try {
		section1Slide6Charts1.clear();
	} catch (e) {}
	
	try {
		section2Slide1Charts1.clear();
	} catch (e) {}
	try {
		section2Slide2Charts1.clear();
	} catch (e) {}
	try {
		section2Slide3Charts1.clear();
	} catch (e) {}
	try {
		section2Slide4Charts1.clear();
	} catch (e) {}
	try {
		section2Slide5Charts1.clear();
	} catch (e) {}
	try {
		section2Slide6Charts1.clear();
	} catch (e) {}
	
	section1Slide1Charts1ShowFlag = false;
	section1Slide2Charts1ShowFlag = false;
	section1Slide3Charts1ShowFlag = false;
	section1Slide4Charts1ShowFlag = false;
	section1Slide5Charts1ShowFlag = false;
	section1Slide6Charts1ShowFlag = false;
	
	section2Slide1Charts1ShowFlag = false;
	section2Slide2Charts1ShowFlag = false;
	section2Slide3Charts1ShowFlag = false;
	section2Slide4Charts1ShowFlag = false;
	section2Slide5Charts1ShowFlag = false;
	section2Slide6Charts1ShowFlag = false;
	
	getReligionSiteDistributionData();
	getBelieversDistributionData();
}

function getAreaData(currentAreaCode, getAreaDataHandle) {
	var requestData = {
		adiv_cd:currentAreaCode
	};
	
	AjaxRequest("/api/rgoncd", getAreaDataHandle, requestData, "POST");
}

