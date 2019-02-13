
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

var curRlgIndex = 0;
!function () {

	
	// var userin = {"tx_status":"00","tx_trace_id":"","error_info":"","pagination":"","usr_vdo":{"usr_id":"18518483098","gnd_cd":"01","usr_nm":"余涛","usr_tpcd":"01","usr_lvl":"","blng_ins_id":"410000000000","blng_ins_nm":"河南省","rgs_crtfno":"","prov_cd":"410000000000","city_cd":"","zon_cd":"","str_cd":"","prov_nm":"河南省","city_nm":"","zon_nm":"","str_nm":"","land_cnt":0,"rl_id":"","rl_nm":"","usr_pic":""},"rl_grp":[{"rl_id":"RL911","rl_nm":"河南省级宗教事务部门工作人员","rl_lv":"01","blng_ins_id":"","blng_ins_nm":"","prov_cd":"","city_cd":"","zon_cd":"","str_cd":"","rl_menu_grp":[{"menu_id":"RACS050500","ahr_id":"AH069","menu_nm":"用户管理","sup_menu":"RACS050000","disp_no":"2","menu_url":"/admin/user","chnl_tp":"01"},{"menu_id":"RACS020300","ahr_id":"AH018","menu_nm":"资金监控","sup_menu":"RACS020000","disp_no":"2","menu_url":"/FM/fndsMon","chnl_tp":"01"},{"menu_id":"RACS020302","ahr_id":"AH019","menu_nm":"自有资金监控","sup_menu":"RACS020300","disp_no":"1","menu_url":"/FM/fndsMon/slfownfnds","chnl_tp":"01"},{"menu_id":"RACS020400","ahr_id":"AH020","menu_nm":"资金预警","sup_menu":"RACS020000","disp_no":"3","menu_url":"/FM/cptlwarn","chnl_tp":"01"},{"menu_id":"RACS020401","ahr_id":"AH021","menu_nm":"预警规则设置","sup_menu":"RACS020400","disp_no":"1","menu_url":"/FM/cptlwarn/rule","chnl_tp":"01"},{"menu_id":"RACS020403","ahr_id":"AH023","menu_nm":"预警结果查询","sup_menu":"RACS020400","disp_no":"3","menu_url":"/FM/cptlwarn/search","chnl_tp":"01"},{"menu_id":"RACS020501","ahr_id":"AH048","menu_nm":"财务情况监控","sup_menu":"RACS020500","disp_no":"1","menu_url":"/FM/fncMon/finace","chnl_tp":"01"},{"menu_id":"RACS050400","ahr_id":"AH068","menu_nm":"角色管理","sup_menu":"RACS050000","disp_no":"4","menu_url":"/admin/role","chnl_tp":"01"},{"menu_id":"RACS030107","ahr_id":"AH066","menu_nm":"安全检查报告查看","sup_menu":"RACS030100","disp_no":"3","menu_url":"/SM/place/viewReportWZ","chnl_tp":"01"},{"menu_id":"RACS010504","ahr_id":"AH047","menu_nm":"报表打印","sup_menu":"RACS010500","disp_no":"5","menu_url":"/IM/report/rptDnld","chnl_tp":"01"},{"menu_id":"RACS210200","ahr_id":"AH095","menu_nm":"信息查询","sup_menu":"","disp_no":"1","menu_url":"/","chnl_tp":"02"},{"menu_id":"RACS210500","ahr_id":"AH097","menu_nm":"统计分析","sup_menu":"","disp_no":"1","menu_url":"/","chnl_tp":"02"},{"menu_id":"RACS010100","ahr_id":"AH007","menu_nm":"信息维护","sup_menu":"RACS010000","disp_no":"2","menu_url":"/IM/manage","chnl_tp":"01"},{"menu_id":"RACS010107","ahr_id":"AH011","menu_nm":"院校信息维护","sup_menu":"RACS010100","disp_no":"4","menu_url":"/IM/manage/academy","chnl_tp":"01"},{"menu_id":"RACS010104","ahr_id":"AH033","menu_nm":"场所信息维护","sup_menu":"RACS010100","disp_no":"1","menu_url":"/IM/manage/siteInfo","chnl_tp":"01"},{"menu_id":"RACS010105","ahr_id":"AH034","menu_nm":"人员信息维护","sup_menu":"RACS010100","disp_no":"2","menu_url":"/IM/manage/staffInfo","chnl_tp":"01"},{"menu_id":"RACS010106","ahr_id":"AH035","menu_nm":"团体信息维护","sup_menu":"RACS010100","disp_no":"3","menu_url":"/IM/manage/orgInfo","chnl_tp":"01"},{"menu_id":"RACS010108","ahr_id":"AH036","menu_nm":"基督教原教别场所维护","sup_menu":"RACS010100","disp_no":"5","menu_url":"/IM/manage/oriSiteInfo","chnl_tp":"01"},{"menu_id":"RACS010109","ahr_id":"AH045","menu_nm":"基督教传统家庭聚会点维护","sup_menu":"RACS010100","disp_no":"6","menu_url":"/IM/manage/homePtyInfo","chnl_tp":"01"},{"menu_id":"RACS010400","ahr_id":"AH901","menu_nm":"信息采集","sup_menu":"RACS010000","disp_no":"4","menu_url":"/IM/gatherHNIndex","chnl_tp":"01"},{"menu_id":"RACS010501","ahr_id":"AH037","menu_nm":"各教别地区分布图","sup_menu":"RACS010500","disp_no":"1","menu_url":"/IM/statAnalysis/district","chnl_tp":"01"},{"menu_id":"RACS010502","ahr_id":"AH038","menu_nm":"教职人员结构分布图","sup_menu":"RACS010500","disp_no":"2","menu_url":"/IM/statAnalysis/staff","chnl_tp":"01"},{"menu_id":"RACS020100","ahr_id":"AH013","menu_nm":"财务管理","sup_menu":"RACS020000","disp_no":"1","menu_url":"/FM/finance","chnl_tp":"01"},{"menu_id":"RACS020101","ahr_id":"AH014","menu_nm":"财务检查设置","sup_menu":"RACS020100","disp_no":"1","menu_url":"/FM/finance/checkSetting","chnl_tp":"01"},{"menu_id":"RACS020102","ahr_id":"AH015","menu_nm":"财务检查录入","sup_menu":"RACS020100","disp_no":"2","menu_url":"/FM/finance/checkEnter","chnl_tp":"01"},{"menu_id":"RACS020103","ahr_id":"AH039","menu_nm":"财务检查结果","sup_menu":"RACS020100","disp_no":"3","menu_url":"/FM/finance/checkResult","chnl_tp":"01"},{"menu_id":"RACS020104","ahr_id":"AH040","menu_nm":"财务报表设置","sup_menu":"RACS020100","disp_no":"4","menu_url":"/FM/finance/reportSetting","chnl_tp":"01"},{"menu_id":"RACS020105","ahr_id":"AH016","menu_nm":"财务报表报送","sup_menu":"RACS020100","disp_no":"5","menu_url":"/FM/finance/report","chnl_tp":"01"},{"menu_id":"RACS020106","ahr_id":"AH017","menu_nm":"财务报表查询","sup_menu":"RACS020100","disp_no":"6","menu_url":"/FM/finance/search","chnl_tp":"01"},{"menu_id":"RACS080000","ahr_id":"AH080","menu_nm":"地图统计分析","sup_menu":"","disp_no":"8","menu_url":"/Map","chnl_tp":"01"},{"menu_id":"RACS030100","ahr_id":"AH024","menu_nm":"场所安全检查","sup_menu":"RACS030000","disp_no":"1","menu_url":"/SM/place","chnl_tp":"01"},{"menu_id":"RACS030201","ahr_id":"AH041","menu_nm":"事件上报","sup_menu":"RACS030200","disp_no":"1","menu_url":"/SM/control/eventReport","chnl_tp":"01"},{"menu_id":"RACS040000","ahr_id":"AH028","menu_nm":"政务管理","sup_menu":"","disp_no":"4","menu_url":"/GM/manage","chnl_tp":"01"},{"menu_id":"RACS040100","ahr_id":"AH029","menu_nm":"政策宣导","sup_menu":"RACS040000","disp_no":"1","menu_url":"/GM/manage/nationPlcy","chnl_tp":"01"},{"menu_id":"RACS210104","ahr_id":"AH102","menu_nm":"人员验真","sup_menu":"RACS210100","disp_no":"4","menu_url":"/","chnl_tp":"02"},{"menu_id":"RACS010506","ahr_id":"AH088","menu_nm":"信众结构分布图","sup_menu":"RACS010500","disp_no":"6","menu_url":"/IM/statAnalysis/statBelievers","chnl_tp":"01"},{"menu_id":"RACS010507","ahr_id":"AH089","menu_nm":"场所结构分布图","sup_menu":"RACS010500","disp_no":"7","menu_url":"/IM/statAnalysis/statSiteStructure","chnl_tp":"01"},{"menu_id":"RACS010508","ahr_id":"AH090","menu_nm":"宗教团体分布图","sup_menu":"RACS010500","disp_no":"8","menu_url":"/IM/statAnalysis/statGroup","chnl_tp":"01"},{"menu_id":"RACS010119","ahr_id":"AH092","menu_nm":"乡镇助理员管理","sup_menu":"RACS010100","disp_no":"6","menu_url":"/IM/manage/resid","chnl_tp":"01"},{"menu_id":"RACS020505","ahr_id":"AH094","menu_nm":"财务情况统计","sup_menu":"RACS020500","disp_no":"5","menu_url":"/FM/fncMon/fndsAnaysis","chnl_tp":"01"}]}],"menu_grp":[{"menu_id":"RACS010000","menu_nm":"信息管理","sup_menu":"","disp_no":"1","menu_icon":"appstore-o","chnl_tp":"01","menu_url":"/IM"},{"menu_id":"RACS010100","menu_nm":"信息维护","sup_menu":"RACS010000","disp_no":"2","menu_icon":"table","chnl_tp":"01","menu_url":"/IM/manage"},{"menu_id":"RACS010104","menu_nm":"场所信息维护","sup_menu":"RACS010100","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/siteInfo"},{"menu_id":"RACS010105","menu_nm":"人员信息维护","sup_menu":"RACS010100","disp_no":"2","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/staffInfo"},{"menu_id":"RACS010106","menu_nm":"团体信息维护","sup_menu":"RACS010100","disp_no":"3","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/orgInfo"},{"menu_id":"RACS010107","menu_nm":"院校信息维护","sup_menu":"RACS010100","disp_no":"4","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/academy"},{"menu_id":"RACS010108","menu_nm":"基督教原教别场所维护","sup_menu":"RACS010100","disp_no":"5","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/oriSiteInfo"},{"menu_id":"RACS010109","menu_nm":"基督教传统家庭聚会点维护","sup_menu":"RACS010100","disp_no":"6","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/homePtyInfo"},{"menu_id":"RACS010119","menu_nm":"乡镇助理员管理","sup_menu":"RACS010100","disp_no":"6","menu_icon":"","chnl_tp":"01","menu_url":"/IM/manage/resid"},{"menu_id":"RACS010400","menu_nm":"信息采集","sup_menu":"RACS010000","disp_no":"4","menu_icon":"form","chnl_tp":"01","menu_url":"/IM/gatherHNIndex"},{"menu_id":"RACS010500","menu_nm":"统计分析","sup_menu":"RACS010000","disp_no":"5","menu_icon":"dot-chart","chnl_tp":"01","menu_url":"/IM/statAnalysis"},{"menu_id":"RACS010501","menu_nm":"各教别地区分布图","sup_menu":"RACS010500","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/IM/statAnalysis/district"},{"menu_id":"RACS010502","menu_nm":"教职人员结构分布图","sup_menu":"RACS010500","disp_no":"2","menu_icon":"","chnl_tp":"01","menu_url":"/IM/statAnalysis/staff"},{"menu_id":"RACS010504","menu_nm":"报表打印","sup_menu":"RACS010500","disp_no":"5","menu_icon":"","chnl_tp":"01","menu_url":"/IM/report/rptDnld"},{"menu_id":"RACS010506","menu_nm":"信众结构分布图","sup_menu":"RACS010500","disp_no":"6","menu_icon":"","chnl_tp":"01","menu_url":"/IM/statAnalysis/statBelievers"},{"menu_id":"RACS010507","menu_nm":"场所结构分布图","sup_menu":"RACS010500","disp_no":"7","menu_icon":"","chnl_tp":"01","menu_url":"/IM/statAnalysis/statSiteStructure"},{"menu_id":"RACS010508","menu_nm":"宗教团体分布图","sup_menu":"RACS010500","disp_no":"8","menu_icon":"","chnl_tp":"01","menu_url":"/IM/statAnalysis/statGroup"},{"menu_id":"RACS020000","menu_nm":"资金管理","sup_menu":"","disp_no":"2","menu_icon":"pay-circle-o","chnl_tp":"01","menu_url":"/FM"},{"menu_id":"RACS020100","menu_nm":"财务管理","sup_menu":"RACS020000","disp_no":"1","menu_icon":"profile","chnl_tp":"01","menu_url":"/FM/finance"},{"menu_id":"RACS020101","menu_nm":"财务检查设置","sup_menu":"RACS020100","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/checkSetting"},{"menu_id":"RACS020102","menu_nm":"财务检查录入","sup_menu":"RACS020100","disp_no":"2","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/checkEnter"},{"menu_id":"RACS020103","menu_nm":"财务检查结果","sup_menu":"RACS020100","disp_no":"3","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/checkResult"},{"menu_id":"RACS020104","menu_nm":"财务报表设置","sup_menu":"RACS020100","disp_no":"4","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/reportSetting"},{"menu_id":"RACS020105","menu_nm":"财务报表报送","sup_menu":"RACS020100","disp_no":"5","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/report"},{"menu_id":"RACS020106","menu_nm":"财务报表查询","sup_menu":"RACS020100","disp_no":"6","menu_icon":"","chnl_tp":"01","menu_url":"/FM/finance/search"},{"menu_id":"RACS020300","menu_nm":"资金监控","sup_menu":"RACS020000","disp_no":"2","menu_icon":"line-chart","chnl_tp":"01","menu_url":"/FM/fndsMon"},{"menu_id":"RACS020302","menu_nm":"自有资金监控","sup_menu":"RACS020300","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/FM/fndsMon/slfownfnds"},{"menu_id":"RACS020400","menu_nm":"资金预警","sup_menu":"RACS020000","disp_no":"3","menu_icon":"warning","chnl_tp":"01","menu_url":"/FM/cptlwarn"},{"menu_id":"RACS020401","menu_nm":"预警规则设置","sup_menu":"RACS020400","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/FM/cptlwarn/rule"},{"menu_id":"RACS020403","menu_nm":"预警结果查询","sup_menu":"RACS020400","disp_no":"3","menu_icon":"","chnl_tp":"01","menu_url":"/FM/cptlwarn/search"},{"menu_id":"RACS020500","menu_nm":"财务监控","sup_menu":"RACS020000","disp_no":"4","menu_icon":"area-chart","chnl_tp":"01","menu_url":"/FM/fncMon"},{"menu_id":"RACS020501","menu_nm":"财务情况监控","sup_menu":"RACS020500","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/FM/fncMon/finace"},{"menu_id":"RACS020505","menu_nm":"财务情况统计","sup_menu":"RACS020500","disp_no":"5","menu_icon":"","chnl_tp":"01","menu_url":"/FM/fncMon/fndsAnaysis"},{"menu_id":"RACS030000","menu_nm":"安全管理","sup_menu":"","disp_no":"3","menu_icon":"safety","chnl_tp":"01","menu_url":"/SM"},{"menu_id":"RACS030100","menu_nm":"场所安全检查","sup_menu":"RACS030000","disp_no":"1","menu_icon":"exception","chnl_tp":"01","menu_url":"/SM/place"},{"menu_id":"RACS030107","menu_nm":"安全检查报告查看","sup_menu":"RACS030100","disp_no":"3","menu_icon":"","chnl_tp":"01","menu_url":"/SM/place/viewReportWZ"},{"menu_id":"RACS030200","menu_nm":"安全管控","sup_menu":"RACS030000","disp_no":"2","menu_icon":"bell","chnl_tp":"01","menu_url":"/SM/control"},{"menu_id":"RACS030201","menu_nm":"事件上报","sup_menu":"RACS030200","disp_no":"1","menu_icon":"","chnl_tp":"01","menu_url":"/SM/control/eventReport"},{"menu_id":"RACS040000","menu_nm":"政务管理","sup_menu":"","disp_no":"4","menu_icon":"notification","chnl_tp":"01","menu_url":"/GM/manage"},{"menu_id":"RACS040100","menu_nm":"政策宣导","sup_menu":"RACS040000","disp_no":"1","menu_icon":"flag","chnl_tp":"01","menu_url":"/GM/manage/nationPlcy"},{"menu_id":"RACS050000","menu_nm":"系统管理","sup_menu":"","disp_no":"5","menu_icon":"setting","chnl_tp":"01","menu_url":"/admin"},{"menu_id":"RACS050400","menu_nm":"角色管理","sup_menu":"RACS050000","disp_no":"4","menu_icon":"","chnl_tp":"01","menu_url":"/admin/role"},{"menu_id":"RACS050500","menu_nm":"用户管理","sup_menu":"RACS050000","disp_no":"2","menu_icon":"","chnl_tp":"01","menu_url":"/admin/user"},{"menu_id":"RACS080000","menu_nm":"地图统计分析","sup_menu":"","disp_no":"8","menu_icon":"global","chnl_tp":"01","menu_url":"/Map"}]};
	// setTimeout(function() {
	// 	areaSelectInit(userin);
	// }, 1000);
	AjaxRequest("/fetchuserinfo", areaSelectInit, "", "GET");
	
	
}();

function initSelectData(selectCallback) {
	var mobileSelectDataArray = [];
	var rlgArr = ['全部', '佛教', '道教', '伊斯兰教', '天主教', '基督教'];
	for (var i = 0; i < 6; i++) {
		var mobileSelectData = new MobileSelect({
			trigger: '#trigger' + i,
			title: '教别',
			wheels: [
				{ data: rlgArr }
			],
			position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
			transitionEnd: function (indexArr, data) {
			},
			callback: function (indexArr, data) {
				var k = 0;
				// document.getElementById("trigger" + k).value = data[0];

				for (var k = 0; k < mobileSelectDataArray.length; k++) {
					document.getElementById("trigger" + k).value = data[0];
					mobileSelectDataArray[k].locatePosition(0, indexArr[0]);
				}
				selectCallback(indexArr[0], data[0]);
				// locatePositionData(indexArr[0]);
	
				
			}
		});
		mobileSelectDataArray.push(mobileSelectData);
	}
	

}


function areaSelectInit(responseData) {

	initSelectData(function (index, value) {
		rlgSelectChanged(index, value);
	});


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
	
	// 加载各教别教职人员分布数据
	getReligionTeacherDistributionData();
}

function rlgSelectChanged(index, value) {
	curRlgIndex = index;
	placeDataHandler(placeAreaData);
	// var requestData = {
	// 	prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
	// 	city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
	// 	zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	// };
	// // 主体建筑占面积和地面积
	// AjaxRequest("/api/sa/site_sbjAndCvrArea_num_rslt/search", areaDataHandler, requestData, "POST", function () {
	// 	$("#section1-slide1-echarts-prompts").css("display", "block");
	// 	$("#section1-slide2-echarts-prompts").css("display", "block");
	// 	$("#section2-slide1-echarts-prompts").css("display", "block");
	// 	$("#section2-slide2-echarts-prompts").css("display", "block");
	// 	$("#section3-slide1-echarts-prompts").css("display", "block");
	// 	$("#section3-slide2-echarts-prompts").css("display", "block");
	// 	section1Slide1Charts1ShowFlag = false;
	// 	section1Slide2Charts1ShowFlag = false;
	// 	section2Slide1Charts1ShowFlag = false;
	// 	section2Slide2Charts1ShowFlag = false;
	// 	section3Slide1Charts1ShowFlag = false;
	// 	section3Slide2Charts1ShowFlag = false;
	// });
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
	
	// AjaxRequest("/api/sa/tch_num_rslt/search", sendRequest, requestData, "POST", function () {
	// 	$("#section1-slide1-echarts-prompts").css("display", "block");
	// 	$("#section1-slide2-echarts-prompts").css("display", "block");
	// 	$("#section2-slide1-echarts-prompts").css("display", "block");
	// 	$("#section2-slide2-echarts-prompts").css("display", "block");
	// 	$("#section3-slide1-echarts-prompts").css("display", "block");
	// 	$("#section3-slide2-echarts-prompts").css("display", "block");
	// 	section1Slide1Charts1ShowFlag = false;
	// 	section1Slide2Charts1ShowFlag = false;
	// 	section2Slide1Charts1ShowFlag = false;
	// 	section2Slide2Charts1ShowFlag = false;
	// 	section3Slide1Charts1ShowFlag = false;
	// 	section3Slide2Charts1ShowFlag = false;
	// });
		// $("#section1-slide1-echarts-prompts").css("display", "block");
		// $("#section1-slide2-echarts-prompts").css("display", "block");
		// $("#section2-slide1-echarts-prompts").css("display", "block");
		// $("#section2-slide2-echarts-prompts").css("display", "block");
		// $("#section3-slide1-echarts-prompts").css("display", "block");
		// $("#section3-slide2-echarts-prompts").css("display", "block");
		// section1Slide1Charts1ShowFlag = false;
		// section1Slide2Charts1ShowFlag = false;
		// section2Slide1Charts1ShowFlag = false;
		// section2Slide2Charts1ShowFlag = false;
		// section3Slide1Charts1ShowFlag = false;
		// section3Slide2Charts1ShowFlag = false;

	// handleResponseData(tmp, site_zutimianji, site_zutimianji);
	sendRequest(0, '全部');
}


function sendRequest(index, value) {
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode
	};
	
	AjaxRequest("/api/sa/sitergon_num_rslt/search", placeDataHandler, requestData, "POST", function () {
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
	// placeDataHandler(siteData);
}

var placeAreaData;
function placeDataHandler(responseData) {
	placeAreaData = responseData;
	var rlg_cd = "9999";
	if (curRlgIndex == 1) {
		rlg_cd = "0400";
	}
	else if (curRlgIndex == 2) {
		rlg_cd = "0500";
	}
	else if (curRlgIndex == 3) {
		rlg_cd = "0600";
	}
	else if (curRlgIndex == 4) {
		rlg_cd = "0300";
	}
	else if (curRlgIndex == 5) {
		rlg_cd = "0200";
	}
	var requestData = {
		prov_cd:isNullOrEmpty(AreaSelectedValue.provinceCode)?"":AreaSelectedValue.provinceCode,
		city_cd:isNullOrEmpty(AreaSelectedValue.cityCode)?"":AreaSelectedValue.cityCode,
		zon_cd:isNullOrEmpty(AreaSelectedValue.districtOrCountyCode)?"":AreaSelectedValue.districtOrCountyCode,
		rlg_cd: rlg_cd,
	};
	// 主体建筑占面积和地面积
	AjaxRequest("/api/sa/site_sbjAndCvrArea_num_rslt/search", areaDataHandler, requestData, "POST", function () {
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
	// areaDataHandler(site_zutimianji);
}

function areaDataHandler(responseData) {
	handleResponseData(placeAreaData, responseData);
}

function handleResponseData(responseData, buildingAreaData) {
	
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
		currentAreaInfoArray = responseData.site_rgon_s_num_grp ? responseData.site_rgon_s_num_grp : [];
		currentAreaLevel = 4;
		childrenAreaInfoArray = [];
    
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		currentAreaInfoArray = responseData.site_rgon_z_num_grp ? responseData.site_rgon_z_num_grp : [];
		currentAreaLevel = 3;
		childrenAreaInfoArray = responseData.site_rgon_s_num_grp ? responseData.site_rgon_s_num_grp : [];
	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		currentAreaInfoArray = responseData.site_rgon_c_num_grp ? responseData.site_rgon_c_num_grp : [];
		currentAreaLevel = 2;
		childrenAreaInfoArray = responseData.site_rgon_z_num_grp ? responseData.site_rgon_z_num_grp : [];
	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		currentAreaInfoArray = responseData.site_rgon_p_num_grp ? responseData.site_rgon_p_num_grp : [];
		currentAreaLevel = 1;
		childrenAreaInfoArray = responseData.site_rgon_c_num_grp ? responseData.site_rgon_c_num_grp : [];
	} 
	

	var currentAreaInfo;
	if (!isNullOrEmpty(currentAreaInfoArray)) {
		for (var i = 0; i < currentAreaInfoArray.length; i ++) {
			var currentAreaInfoTemp = currentAreaInfoArray[i];
			if (currentYear != currentAreaInfoTemp.year) {
				continue;
			}
			if (currentAreaLevel == 1) {
				if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd) {
					currentAreaInfo = currentAreaInfoTemp;
					break;
				} 
			} else if (currentAreaLevel == 2) {
				if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd) {
					currentAreaInfo = currentAreaInfoTemp;
					break;
				} 
			} else if (currentAreaLevel == 3) {
				if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd && AreaSelectedValue.districtOrCountyCode == currentAreaInfoTemp.zon_cd) {
					currentAreaInfo = currentAreaInfoTemp;
					break;
				} 
			} else if (currentAreaLevel == 4) {
				if (AreaSelectedValue.provinceCode == currentAreaInfoTemp.prov_cd && AreaSelectedValue.cityCode == currentAreaInfoTemp.city_cd && AreaSelectedValue.districtOrCountyCode == currentAreaInfoTemp.zon_cd && AreaSelectedValue.townOrStreetCode == currentAreaInfoTemp.str_cd) {
					currentAreaInfo = currentAreaInfoTemp;
					break;
				} 
			} 
		}
	}
	var areaData = handlerAreaData(buildingAreaData);
	if (!isNullOrEmpty(currentAreaInfo)) {
		drawReligionAreaProportionCharts(currentAreaInfo); // 区域分布图
	} else {
		$("#section1-slide1-echarts-prompts").css("display", "block");
		section1Slide1Charts1ShowFlag = false;
	}
	if (!isNullOrEmpty(areaData.currentBuildAreaInfo)) {
		drawReligionBuildAreaProportionCharts(areaData.currentBuildAreaInfo);
		drawReligionCoversAreaProportionCharts(areaData.currentBuildAreaInfo);
	} else {
		$("#section2-slide1-echarts-prompts").css("display", "block");
		$("#section3-slide1-echarts-prompts").css("display", "block");
		section2Slide1Charts1ShowFlag = false;
		section3Slide1Charts1ShowFlag = false;
	}

	drawReligionAreaDistributionCharts(childrenAreaInfoArray);
	drawReligionBuildAreaDistributionCharts(areaData.childrenBuildAreaInfoArray);
	drawReligionTeacherEducationLevelDistributionCharts(areaData.childrenBuildAreaInfoArray);
}

// 处理面积数据
function handlerAreaData(responseAreaData) {
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	
	var currentBuildingAreaInfoArray = []; // 主体建筑面积
	var currentAreaLevel = 0;
	var childrenBuildAreaInfoArray = [];
	if (AreaSelectedValue.townOrStreet && AreaSelectedValue.townOrStreet != "请选择" && AreaSelectedValue.townOrStreet != "全区") {
		currentBuildingAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_s_grp ? responseAreaData.site_sbj_and_cvr_area_s_grp : [];
		childrenBuildAreaInfoArray = [];
	} else if (AreaSelectedValue.districtOrCounty && AreaSelectedValue.districtOrCounty != "请选择" && AreaSelectedValue.districtOrCounty != "全区") {
		currentBuildingAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_z_grp ? responseAreaData.site_sbj_and_cvr_area_z_grp : [];
		currentAreaLevel = 3;
		childrenBuildAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_s_grp ? responseAreaData.site_sbj_and_cvr_area_s_grp : [];

	} else if (AreaSelectedValue.city && AreaSelectedValue.city != "请选择" && AreaSelectedValue.city != "全区") {
		currentBuildingAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_c_grp ? responseAreaData.site_sbj_and_cvr_area_c_grp : [];
		currentAreaLevel = 2;
		childrenBuildAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_z_grp ? responseAreaData.site_sbj_and_cvr_area_z_grp : [];

	} else if (AreaSelectedValue.province && AreaSelectedValue.province != "请选择" && AreaSelectedValue.province != "全区") {
		currentBuildingAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_p_grp ? responseAreaData.site_sbj_and_cvr_area_p_grp : [];

		currentAreaLevel = 1;
		childrenBuildAreaInfoArray = responseAreaData.site_sbj_and_cvr_area_c_grp ? responseAreaData.site_sbj_and_cvr_area_c_grp : [];
	} 

	var currentBuildAreaInfo;
	if (!isNullOrEmpty(currentBuildingAreaInfoArray)) {
		for (var i = 0; i < currentBuildingAreaInfoArray.length; i ++) {
			var currentAreaInfoTemp = currentBuildingAreaInfoArray[i];
			if (currentYear == currentAreaInfoTemp.year) {
				currentBuildAreaInfo = currentAreaInfoTemp;
				break;
			} 
		}
	}

	return {
		currentBuildAreaInfo, childrenBuildAreaInfoArray, currentAreaLevel
	}
}

function drawReligionAreaProportionCharts(currentAreaInfo) {
	if (!section1Slide1Charts1) {
		section1Slide1Charts1 = echarts.init(document.getElementById("section1-slide1-charts1-container"), echartsTheme);
	}
	var cityNum;
	var vilNum;
	if (curRlgIndex == 0) {
		cityNum = currentAreaInfo.city_site_num;
		vilNum = currentAreaInfo.vil_site_num;
	}
	else if (curRlgIndex == 1) {
		cityNum = currentAreaInfo.bdhsm_city_site_num;
		vilNum = currentAreaInfo.bdhsm_vil_site_num;
	}
	else if (curRlgIndex == 2) {
		cityNum = currentAreaInfo.tsm_city_site_num;
		vilNum = currentAreaInfo.tsm_vil_site_num;
	}
	else if (curRlgIndex == 3) {
		cityNum = currentAreaInfo.islm_city_site_num;
		vilNum = currentAreaInfo.islm_vil_site_num;
	}
	else if (curRlgIndex == 4) {
		cityNum = currentAreaInfo.ctlc_city_site_num;
		vilNum = currentAreaInfo.ctlc_vil_site_num;
	}
	else if (curRlgIndex == 5) {
		cityNum = currentAreaInfo.chrst_city_site_num;
		vilNum = currentAreaInfo.chrst_vil_site_num;
	}
	var titleText = "宗教活动场所区域占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.site_num;
	var legendData = [];
	var seriesName = "宗教活动场所区域占比情况";
	var seriesData = [
		{value:vilNum, name: "农村"},
		{value:cityNum, name: "城市"},
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section1Slide1Charts1.setOption(echartsOption, true);
	section1Slide1Charts1ShowFlag = true;
}

function drawReligionAreaDistributionCharts(childrenAreaInfoArray) {
	if (!section1Slide2Charts1) {
		section1Slide2Charts1 = echarts.init(document.getElementById("section1-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 城市
	var cityArray = [];
	// 农村
	var otherArray = [];

	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			if (childrenAreaInfoTemp.str_cd_desc) {// 乡镇/街道
				areaNameArray.unshift(childrenAreaInfoTemp.str_cd_desc);
			} else if (childrenAreaInfoTemp.zon_cd_desc) {// 区县
				areaNameArray.unshift(childrenAreaInfoTemp.zon_cd_desc);
			} else if (childrenAreaInfoTemp.city_cd_desc) {
				areaNameArray.unshift(childrenAreaInfoTemp.city_cd_desc);
			} else {
				areaNameArray.unshift("");
			}
			
			var cityNum;
			var vilNum;
			if (curRlgIndex == 0) {
				cityNum = childrenAreaInfoTemp.city_site_num;
				vilNum = childrenAreaInfoTemp.vil_site_num;
			}
			else if (curRlgIndex == 1) {
				cityNum = childrenAreaInfoTemp.bdhsm_city_site_num;
				vilNum = childrenAreaInfoTemp.bdhsm_vil_site_num;
			}
			else if (curRlgIndex == 2) {
				cityNum = childrenAreaInfoTemp.tsm_city_site_num;
				vilNum = childrenAreaInfoTemp.tsm_vil_site_num;
			}
			else if (curRlgIndex == 3) {
				cityNum = childrenAreaInfoTemp.islm_city_site_num;
				vilNum = childrenAreaInfoTemp.islm_vil_site_num;
			}
			else if (curRlgIndex == 4) {
				cityNum = childrenAreaInfoTemp.ctlc_city_site_num;
				vilNum = childrenAreaInfoTemp.ctlc_vil_site_num;
			}
			else if (curRlgIndex == 5) {
				cityNum = childrenAreaInfoTemp.chrst_city_site_num;
				vilNum = childrenAreaInfoTemp.chrst_vil_site_num;
			}
			
			cityArray.unshift(cityNum);
			otherArray.unshift(vilNum);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "宗教活动场所区域分布情况";
		var legendData = [];
		var seriesArray = [
			{
				name: '农村',
				type: 'bar',
				stack: '宗教活动场所区域分布情况',
				data: otherArray
			},
			{
				name: '城市',
				type: 'bar',
				stack: '宗教活动场所区域分布情况',
				data: cityArray
			},
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

function drawReligionBuildAreaProportionCharts(currentAreaInfo) {
	// console.log('currentAreaInfo', currentAreaInfo);
	if (!section2Slide1Charts1) {
		section2Slide1Charts1 = echarts.init(document.getElementById("section2-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教场所主体建筑面积占比情况";
	var titleSubtext = "总数：" + currentAreaInfo.tch_num;
	var legendData = [];
	var seriesName = "宗教场所主体建筑面积占比情况";
	var seriesData = [
		{value:currentAreaInfo.less400_total_sbj_area, name: "400平方米以下"},
		{value:currentAreaInfo.more400_total_sbj_area, name: "400平方米以上"}
	];
	for (var i = 0; i < seriesData.length; i ++) {
		legendData.push(seriesData[i].name);
	}
	var echartsOption = getPieEChartsOption(titleText, titleSubtext, legendData, seriesName, seriesData);
	
	section2Slide1Charts1.setOption(echartsOption, true);
	section2Slide1Charts1ShowFlag = true;
}

function drawReligionBuildAreaDistributionCharts(childrenAreaInfoArray) {

	if (!section2Slide2Charts1) {
		section2Slide2Charts1 = echarts.init(document.getElementById("section2-slide2-charts1-container"), echartsTheme);
	}
	
	var areaNameArray = [];
	// 400平米以下
	var less400Array = [];
	// 400平米以上
	var more400Array = [];
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			areaNameArray.unshift(childrenAreaInfoTemp.rgon_cd_desc);
			less400Array.unshift(childrenAreaInfoTemp.less400_total_sbj_area);
			more400Array.unshift(childrenAreaInfoTemp.more400_total_sbj_area);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "宗教场所主体建筑面积分布情况";
		var legendData = [];
		var seriesArray = [
			{
				name: '400平方米以下',
				type: 'bar',
				stack: '宗教场所主体建筑面积分布情况',
				data: less400Array
			},
			{
				name: '400平方米以上',
				type: 'bar',
				stack: '宗教场所主体建筑面积分布情况',
				data: more400Array
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

function drawReligionCoversAreaProportionCharts(currentAreaInfo) {
	if (!section3Slide1Charts1) {
		section3Slide1Charts1 = echarts.init(document.getElementById("section3-slide1-charts1-container"), echartsTheme);
	}
	
	var titleText = "宗教场所占地面积占比情况";
	var titleSubtext = "总数：";
	var legendData = [];
	var seriesName = "宗教场所占地面积占比情况";
	var seriesData = [
		{value:currentAreaInfo.less1334_total_cvr_area, name: "1344平方米（2亩）以下"},
		{value:currentAreaInfo.more1334_less3333_total_cvr_area, name: "1344-3333平方米（2-5亩）"},
		{value:currentAreaInfo.more3333_total_cvr_area, name: "333平方米（2亩）以上"},
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
	// 少于1334平方米
	var less1334Array = [];
	// 3333平发米以上
	var more3333Array = [];
	var in1334_3333Array = [];
	
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear() + "";
	for (var i = 0; i < childrenAreaInfoArray.length; i ++) {
		var childrenAreaInfoTemp = childrenAreaInfoArray[i];
		if (currentYear == childrenAreaInfoTemp.year) {
			areaNameArray.unshift(childrenAreaInfoTemp.rgon_cd_desc);
			less1334Array.unshift(childrenAreaInfoTemp.less1334_total_cvr_area);
			more3333Array.unshift(childrenAreaInfoTemp.more3333_total_cvr_area);
			in1334_3333Array.unshift(childrenAreaInfoTemp.more1334_less3333_total_cvr_area);
		} else {
			continue;
		}
	}
	
	if (areaNameArray.length > 0) {
		var titleText = "宗教场所占地面积分布情况";
		var legendData = [];
		var seriesArray = [
			{
				name: '1334平方米（2亩）以下',
				type: 'bar',
				stack: '各行政区划宗教教职人员文化程度分布',
				data: less1334Array
			},
			{
				name: '1334-3333平方米（2-5亩）',
				type: 'bar',
				stack: '各行政区划宗教教职人员文化程度分布',
				data: in1334_3333Array
			},
			{
				name: '3333平方米（5亩）以上',
				type: 'bar',
				stack: '各行政区划宗教教职人员文化程度分布',
				data: more3333Array
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

