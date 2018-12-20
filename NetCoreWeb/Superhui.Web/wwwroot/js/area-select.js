var allowAreaSelectLevel = 4;
var provinceArray = [];
var cityArray = [];
var districtOrCountyArray = [];
var townOrStreetArray = [];
var provinceArrayLoadFlag = false;
var cityArrayLoadFlag = false;
var districtOrCountyArrayLoadFlag = false;
var townOrStreetArrayLoadFlag = false;
var AreaSelectFixedValue = { province: '', provinceCode: '', city: '', cityCode: '', districtOrCounty: '', districtOrCountyCode: '', townOrStreet: '', townOrStreetCode: '' };
var AreaSelectedValue = { province: '', provinceCode: '', city: '', cityCode: '', districtOrCounty: '', districtOrCountyCode: '', townOrStreet: '', townOrStreetCode: '' };

!function (window) {
  console.log('777')
  "use strict";
  var $body = $(window.document.body);
  function AreaSelect(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, AreaSelectFixedValue, options || {});
    this.init()
  }
  AreaSelect.prototype.init = function () {
    var _this = this, options = _this.options;
    _this.createDOM();
    AreaSelectedValue = {
      province: options.province,
      provinceCode: options.provinceCode,
      city: options.city,
      cityCode: options.cityCode,
      districtOrCounty: options.districtOrCounty,
      districtOrCountyCode: options.districtOrCountyCode,
      townOrStreet: options.townOrStreet,
      townOrStreetCode: options.townOrStreetCode
    }
  };
  AreaSelect.prototype.open = function () {
    var _this = this; $body.append(_this.$mask);
    YDUI.device.isMozilla && _this.$element.blur();
    _this.$mask.on('click.com.chinamworld.areaselect.mask', function () { _this.close() });
    var $areaElement = _this.$areaElement, defaultSet = AreaSelectedValue;
    $areaElement.find('.areaselect-content').removeClass('areaselect-move-animate areaselect-next areaselect-prev');
    _this.loadProvince();
    var tag = -1;
    if (defaultSet.province) {
      if (defaultSet.province != "全区" && defaultSet.province != "请选择") { tag = 0 }
      _this.setNavTxt(0, defaultSet.province, defaultSet.provinceCode)
    } else {
      $areaElement.find('.areaselect-nav a').eq(0).addClass('crt').html('请选择')
    }
    if (allowAreaSelectLevel >= 2 && defaultSet.city) {
      if (allowAreaSelectLevel > 2 && defaultSet.city != "全区" && defaultSet.city != "请选择") { tag = 1 }
      _this.loadCity(false); _this.setNavTxt(1, defaultSet.city, defaultSet.cityCode)
    }
    if (allowAreaSelectLevel >= 3 && defaultSet.districtOrCounty) {
      if (allowAreaSelectLevel > 3 && defaultSet.districtOrCounty != "全区" && defaultSet.districtOrCounty != "请选择" && defaultSet.districtOrCounty != "市辖区") { tag = 2 }
      _this.loadDistrictOrCounty(false);
      _this.setNavTxt(2, defaultSet.districtOrCounty, defaultSet.districtOrCountyCode)
    }
    if (allowAreaSelectLevel >= 4 && defaultSet.townOrStreet) {
      if (defaultSet.townOrStreet != "全区" && defaultSet.townOrStreet != "请选择") { tag = 3 }
      _this.loadTownOrStreet(false);
      _this.ForwardView(false);
      _this.setNavTxt(3, defaultSet.townOrStreet, defaultSet.townOrStreetCode)
    } if ((tag || tag == 0) && tag >= -1 && tag <= 2) {
      var translatePercent = (-100 * (tag + 1)) + '%';
      this.$areaElement.find('.areaselect-content').css('-webkit-transform', 'translate(' + translatePercent + ', 0)');
      this.$areaElement.find('.areaselect-content').css('transform', 'translate(' + translatePercent + ', 0)')
    }
    if (tag == 0 && allowAreaSelectLevel >= 2) {
      _this.loadCity(false)
    } else if (tag == 1 && allowAreaSelectLevel >= 3) {
      _this.loadDistrictOrCounty(false)
    }
    else if (tag == 2 && allowAreaSelectLevel >= 4) {
      _this.loadTownOrStreet(false)
    } else {

    }
    $areaElement.addClass('brouce-in')
  };
  AreaSelect.prototype.close = function () {
    var _this = this; _this.$mask.remove();
    _this.$areaElement.removeClass('brouce-in').find('.areaselect-nav a').removeClass('crt').html('');
    _this.$itemBox.html('')
  };
  AreaSelect.prototype.createDOM = function () {
    var _this = this;
    _this.$mask = $('<div class="mask-black"></div>');
    _this.$areaElement = $('<div class="m-areaselect">	<div class="areaselect-header">		<div class="areaselect-title">			<div class="areaselect-cancel-area">取消</div>			<div class="areaselect-title-area">所在地区</div>			<div class="areaselect-finish-area">完成</div>		</div>		<div class="areaselect-nav">			<a href="javascript:;"></a>			<a href="javascript:;"></a>			<a href="javascript:;"></a>			<a href="javascript:;"></a>		</div>	</div>	<ul class="areaselect-content">		<li class="areaselect-item">			<div class="areaselect-item-box"></div>		</li>		<li class="areaselect-item">			<div class="areaselect-item-box"></div>		</li>		<li class="areaselect-item">			<div class="areaselect-item-box"></div>		</li>		<li class="areaselect-item">			<div class="areaselect-item-box"></div>		</li>	</ul></div>');
    $body.append(_this.$areaElement);
    _this.$itemBox = _this.$areaElement.find('.areaselect-item-box');
    _this.$areaElement.on('click.com.chinamworld.areaselect', '.areaselect-nav a', function () {
      var $this = $(this);
      $this.addClass('crt').siblings().removeClass('crt');
      $this.index() < 4 ? _this.backOffView($this.index()) : _this.ForwardView(true)
    });
    _this.$areaElement.on('click.com.chinamworld.areaselect.cancel', '.areaselect-cancel-area', function () {
      _this.close()
    });
    _this.$areaElement.on('click.com.chinamworld.areaselect.finish', '.areaselect-finish-area', function () {
      _this.getAreaSelectedValue();
      _this.returnValue()
    })
  };
  AreaSelect.prototype.getAreaSelectedValue = function () {
    var _this = this, $areaElement = _this.$areaElement;
    var $nav = $areaElement.find('.areaselect-nav a'), defaultSet = AreaSelectedValue;
    if ($nav.eq(0).html() && $nav.eq(0).html() != "请选择" && $nav.eq(0).attr("value")) {
      defaultSet.province = $nav.eq(0).html();
      defaultSet.provinceCode = $nav.eq(0).attr("value")
    } else {
      defaultSet.province = ""; defaultSet.provinceCode = ""
    }
    if ($nav.eq(1).html() && $nav.eq(1).html() != "请选择" && $nav.eq(1).attr("value")) {
      defaultSet.city = $nav.eq(1).html(); defaultSet.cityCode = $nav.eq(1).attr("value")
    }
    else {
      defaultSet.city = ""; defaultSet.cityCode = ""
    }
    if ($nav.eq(2).html() && $nav.eq(2).html() != "请选择" && $nav.eq(2).attr("value")) {
      defaultSet.districtOrCounty = $nav.eq(2).html();
      defaultSet.districtOrCountyCode = $nav.eq(2).attr("value")
    } else {
      defaultSet.districtOrCounty = ""; defaultSet.districtOrCountyCode = ""
    }
    if ($nav.eq(3).html() && $nav.eq(3).html() != "请选择" && $nav.eq(3).attr("value")) {
      defaultSet.townOrStreet = $nav.eq(3).html();
      defaultSet.townOrStreetCode = $nav.eq(3).attr("value")
    } else {
      defaultSet.townOrStreet = "";
      defaultSet.townOrStreetCode = ""
    }
  };
  AreaSelect.prototype.setNavTxt = function (index, txt, value) {
    var $nav = this.$areaElement.find('.areaselect-nav a');
    (index < 3 && txt != "全区" && txt != "请选择") && $nav.removeClass('crt');
    $nav.eq(index).html(txt); $nav.eq(index).attr("value", value);
    if (txt != "全区" && txt != "请选择") {
      if (index == 2 && txt == "市辖区") {
        $nav.eq(index).addClass('crt')
      }
      else {
        if (index + 1 < allowAreaSelectLevel) {
          $nav.eq(index + 1).addClass('crt').html('请选择')
        }
        else {
          $nav.eq(index).addClass('crt')
        }
      }
    } else {
      $nav.eq(index).addClass('crt')
    }
    $nav.eq(index + 1).removeAttr("value");
    $nav.eq(index + 2).removeClass('crt').html('');
    $nav.eq(index + 2).removeAttr("value");
    $nav.eq(index + 3).removeClass('crt').html('');
    $nav.eq(index + 3).removeAttr("value")
  };
  AreaSelect.prototype.backOffView = function (tag) {
    this.$areaElement.find('.areaselect-content').css('-webkit-transform', '');
    this.$areaElement.find('.areaselect-content').css('transform', '');
    this.$areaElement.find('.areaselect-content').removeClass('areaselect-next').addClass('areaselect-move-animate');
    if ((tag || tag == 0) && tag >= 0 && tag <= 3) {
      var translatePercent = (-100 * tag) + '%';
      this.$areaElement.find('.areaselect-content').css('-webkit-transform', 'translate(' + translatePercent + ', 0)'); this.$areaElement.find('.areaselect-content').css('transform', 'translate(' + translatePercent + ', 0)')
    }
  };
  AreaSelect.prototype.ForwardView = function (animate, tag) {
    this.$areaElement.find('.areaselect-content').removeClass('areaselect-move-animate areaselect-prev').addClass(animate ? 'areaselect-move-animate' : ''); if ((tag || tag == 0) && tag >= 0 && tag <= 2) { var translatePercent = (-100 * (tag + 1)) + '%'; this.$areaElement.find('.areaselect-content').css('-webkit-transform', 'translate(' + translatePercent + ', 0)'); this.$areaElement.find('.areaselect-content').css('transform', 'translate(' + translatePercent + ', 0)') }
  };
  AreaSelect.prototype.bindItemEvent = function (index) {
    var _this = this, $areaElement = _this.$areaElement;
    var currentItemBoxCanSelect = true;
    if (0 == index) {
      if (AreaSelectFixedValue.province || 0 === AreaSelectFixedValue.province) {
        currentItemBoxCanSelect = false
      }
    } else if (1 == index) {
      if (AreaSelectFixedValue.city || 0 === AreaSelectFixedValue.city) {
        currentItemBoxCanSelect = false
      }
    } else if (2 == index) {
      if (AreaSelectFixedValue.districtOrCounty || 0 === AreaSelectFixedValue.districtOrCounty) {
        currentItemBoxCanSelect = false
      }
    }
    else if (3 == index) {
      if (AreaSelectFixedValue.townOrStreet || 0 === AreaSelectFixedValue.townOrStreet) {
        currentItemBoxCanSelect = false
      }
    }
    else {

    }
    if (currentItemBoxCanSelect) {
      var currentAreaSelectItemBox = $areaElement.find('.areaselect-item-box').eq(index);
      currentAreaSelectItemBox.on('click.com.chinamworld.areaselect', 'a', function () {
        var $this = $(this);
        if ($this.hasClass('crt')) return;
        $this.addClass('crt').siblings().removeClass('crt');
        var tag = $this.data('tag');
        _this.setNavTxt(tag, $this.text(), $this.data('value'));
        if (tag < 3 && (tag + 1) < allowAreaSelectLevel && $this.text() && $this.text() != "全区" && $this.data('value')) {
          if (tag == 0) {
            cityArrayLoadFlag = false;
            cityArray = [];
            _this.loadCity(true)
          }
          else if (tag == 1) {
            districtOrCountyArrayLoadFlag = false;
            districtOrCountyArray = [];
            _this.loadDistrictOrCounty(true)
          } else if (tag == 2) {
            townOrStreetArrayLoadFlag = false;
            townOrStreetArray = [];
            _this.loadTownOrStreet(true)
          }
          else {

          }
        }
        else {
          _this.getAreaSelectedValue();
          _this.returnValue()
        }
      })
    }
    else {
      var areaSelectItemArray = $areaElement.find('.areaselect-item-box').eq(index).find('a');
      $.each(areaSelectItemArray, function () {
        var $this = $(this);
        if (!$this.hasClass('crt')) {
          $this.css("background-color", "#f4f4f4")
        }
      })
    }
  };
  AreaSelect.prototype.returnValue = function () {
    var _this = this, defaultSet = AreaSelectedValue;
    _this.$element.trigger($.Event('done.com.chinamworld.areaselect', {
      province: defaultSet.province,
      provinceCode: defaultSet.provinceCode,
      city: defaultSet.city,
      cityCode: defaultSet.cityCode,
      districtOrCounty: defaultSet.districtOrCounty,
      districtOrCountyCode: defaultSet.districtOrCountyCode,
      townOrStreet: defaultSet.townOrStreet,
      townOrStreetCode: defaultSet.townOrStreetCode
    }));
    _this.close(); selectedAreaChangedHandle()
  };
  AreaSelect.prototype.scrollPosition = function (index) {
    var _this = this, $itemBox = _this.$itemBox.eq(index), itemHeight = $itemBox.find('a.crt').height(), itemBoxHeight = $itemBox.parent().height(); $itemBox.parent().animate({ scrollTop: $itemBox.find('a.crt').index() * itemHeight - itemBoxHeight / 3 }, 0, function () {
      _this.bindItemEvent(index)
    })
  };
  AreaSelect.prototype.fillItems = function (index, arr) {
    var _this = this;
    _this.$itemBox.eq(index).html(arr).parent().animate({ scrollTop: 0 }, 10);
    _this.scrollPosition(index)
  };
  AreaSelect.prototype.loadProvince = function () {
    var _this = this;
    if (provinceArrayLoadFlag) {
      var arr = [];
      $.each(provinceArray, function (k, v) {
        arr.push($('<a class="' + (v.sb_adiv_cd == AreaSelectedValue.provinceCode ? 'crt' : '') + '" href="javascript:;"><span>' + v.sb_adiv_nm + '</span></a>').data({ value: v.sb_adiv_cd, tag: 0 }))
      });
      _this.fillItems(0, arr)
    }
    else {
      getAreaData("000000000000", function (responseData) {
        if (responseData.adiv_grp) {
          provinceArray = responseData.adiv_grp
        }
        else {
          provinceArray = []
        }
        provinceArrayLoadFlag = true;
        _this.loadProvince();
      })
    }
  };
  AreaSelect.prototype.loadCity = function (isClickEvent) {
    var _this = this, $areaElement = _this.$areaElement;
    if (cityArrayLoadFlag) {
      var arr = [];
      $.each(cityArray, function (k, v) {
        arr.push($('<a class="' + (v.sb_adiv_cd == AreaSelectedValue.cityCode ? 'crt' : '') + '" href="javascript:;"><span>' + v.sb_adiv_nm + '</span></a>').data({ value: v.sb_adiv_cd, tag: 1 }))
      });
      if (arr.length > 0) {
        _this.ForwardView(true, 0);
        $areaElement.find('.areaselect-item-box').eq(1).find('a').removeClass('crt'); _this.fillItems(1, arr)
      }
      else {
        if (isClickEvent) {
          _this.getAreaSelectedValue(); _this.returnValue()
        }
      }
    }
    else {
      var $nav = $areaElement.find('.areaselect-nav a');
      var selectedProvinceCode = $nav.eq(0).attr("value");
      getAreaData(selectedProvinceCode, function (responseData) {
        if (responseData.adiv_grp) {
          cityArray = responseData.adiv_grp
        }
        else {
          cityArray = []
        }
        cityArrayLoadFlag = true;
        _this.loadCity(isClickEvent)
      })
    }
  };
  AreaSelect.prototype.loadDistrictOrCounty = function (isClickEvent) {
    var _this = this, $areaElement = _this.$areaElement;
    if (districtOrCountyArrayLoadFlag) {
      var arr = [];
      $.each(districtOrCountyArray, function (k, v) {
        arr.push($('<a class="' + (v.sb_adiv_cd == AreaSelectedValue.districtOrCountyCode ? 'crt' : '') + '" href="javascript:;"><span>' + v.sb_adiv_nm + '</span></a>').data({ value: v.sb_adiv_cd, tag: 2 }))
      });
      if (arr.length > 0) {
        _this.ForwardView(true, 1);
        $areaElement.find('.areaselect-item-box').eq(2).find('a').removeClass('crt');
        _this.fillItems(2, arr)
      }
      else {
        if (isClickEvent) {
          _this.getAreaSelectedValue();
          _this.returnValue()
        }
      }
    }
    else {
      var $nav = $areaElement.find('.areaselect-nav a');
      var selectedCityCode = $nav.eq(1).attr("value");
      getAreaData(selectedCityCode, function (responseData) {
        if (responseData.adiv_grp) {
          districtOrCountyArray = responseData.adiv_grp
        }
        else {
          districtOrCountyArray = []
        }
        districtOrCountyArrayLoadFlag = true;
        _this.loadDistrictOrCounty(isClickEvent)
      })
    }
  };
  AreaSelect.prototype.loadTownOrStreet = function (isClickEvent) {
    var _this = this, $areaElement = _this.$areaElement;
    if (townOrStreetArrayLoadFlag) {
      var arr = [];
      $.each(townOrStreetArray, function (k, v) {
        arr.push($('<a class="' + (v.sb_adiv_cd == AreaSelectedValue.townOrStreetCode ? 'crt' : '') + '" href="javascript:;"><span>' + v.sb_adiv_nm + '</span></a>').data({ value: v.sb_adiv_cd, tag: 3 }))
      });
      if (arr.length > 0) {
        _this.ForwardView(true, 2);
        $areaElement.find('.areaselect-item-box').eq(3).find('a').removeClass('crt');
        _this.fillItems(3, arr)
      }
      else {
        if (isClickEvent) {
          _this.getAreaSelectedValue();
          _this.returnValue()
        }
      }
    } else {
      var $nav = $areaElement.find('.areaselect-nav a');
      var selectedDistrictOrCountyCode = $nav.eq(2).attr("value");
      getAreaData(selectedDistrictOrCountyCode, function (responseData) {
        if (responseData.adiv_grp) {
          townOrStreetArray = responseData.adiv_grp
        } else {
          townOrStreetArray = []
        }
        townOrStreetArrayLoadFlag = true;
        _this.loadTownOrStreet(isClickEvent)
      })
    }
  };
  function Plugin(option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this), areaSelect = $this.data('com.chinamworld.areaselect');
      if (!areaSelect) {
        $this.data('com.chinamworld.areaselect', (areaSelect = new AreaSelect(this, option)))
      }
      if (typeof option == 'string') {
        areaSelect[option] && areaSelect[option].apply(areaSelect, args)
      }
    })
  }
  $.fn.areaSelect = Plugin
}(window);