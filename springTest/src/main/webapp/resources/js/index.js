$(document).ready(function() {
    var data = [];
    var setTitle = "";

    // DIALOG 등록
    $("div[name=inputArea]").dialog({
        width: 500,
        height: 340,
        modal: true,
        autoOpen: false,
        draggable: false,
        resizable: false
    });
    $("div[name=inputArea]").css("overflow", "hidden");

    // 등록버튼
    $("button[name=regData]").click(function() {
        // DIALOG 초기화
        $("input[name=_id]").attr("disabled", false);
        $("button[name=duplication]").show();
        $("button[name=save]").show();
        $("button[name=modSave]").hide();
        $("input[name=dupIdChk]").val("");

        $("div[name=inputArea]").dialog("option", "title", "등록화면");
        $("div[name=inputArea]").dialog("open");
    });

    // 수정버튼
    $("table[name=table01] tbody").on("click", "button[name=modBtn]", function() {
        var $_id = $(this).children("input").val();
        var setData = {};
        setData = _.reject(data, function(obj) {
            return obj._id !== $_id;
        });

        if(setData.length == 1) {
            // DIALOG 초기화
            $("input[name=_id]").attr("disabled", true);
            $("button[name=duplication]").hide();
            $("button[name=save]").hide();
            $("button[name=modSave]").show();
            $("input[name=dupIdChk]").val("N");

            // 수정할 데이터 DIALOG 세팅
            _.each($("div[name=inputArea] .form-control"), function(obj) {
                var ctrl = $(obj);
                ctrl.val(setData[0][ctrl.attr("name")]);
            });

            $("div[name=inputArea]").dialog("option", "title", "수정화면");
            $("div[name=inputArea]").dialog("open");
        } else {
            alert("데이터를 가져오는데 실패하였습니다.");
            return false;
        }
    });

    // 닫기버튼
    $("button[name=close]").click(function() {
        $("div[name=inputArea]").dialog("close");
        $("div[name=inputArea]").find("input").val("");
    });

    // X 버튼 이벤트
    $("div[name=inputArea]").bind("dialogclose", function(event) {
        $("div[name=inputArea]").find("input").val("");
    });

    // 리스트 그리기
    var renderFunction = function(data) {
    	
        /*var sData = [];
        var searchValue = $("select[name=searchBox]").val();
        var rText = searchValue.toLowerCase().replace("s", "");
        var sText = $("input[name=" + searchValue + "]").val();

        if(sText != "" && sText != undefined) {
            sData = _.reject(data, function(obj) {
                var returnValue = false;
                if(obj[rText].indexOf(sText) == -1) {
                    returnValue = true;
                }
                return returnValue;
            });
        } else {
            sData = data;
        }*/

        $("table[name=table01] tbody tr").remove();

        _.each(data, function(obj) {
            var deleteButton = "<button name=\"delete\" class=\"btn btn-sm btn-warning\">"
                +   "<i class=\"glyphicon glyphicon-trash\"> 삭제</i>"
                +   "<input type=\"hidden\" value=" + obj._id + ">"
                +   "</button>";

            var modButton = "<button name=\"modBtn\" class=\"btn btn-sm btn-info\">"
                +   "<i class=\"glyphicon glyphicon-pencil\">수정</i>"
                +   "<input type=\"hidden\" value=" + obj._id + ">"
                +   "</button>";

            var tr = $("<tr>"
            +   "<td>" + obj.name + "</td>"
            +   "<td>" + obj.role + "</td>"
            +   "<td>" + obj.rank + "</td>"
            +   "<td>" + obj.regDt + "</td>"
            +   "<td>" + deleteButton + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + modButton + "</td>"
            +   "</tr>");

            tr.appendTo($("table[name=table01] tbody"));
        });

    };

    // 조회
    $("button[name=listRender]").click(function() {
    	var getList = [];
    	
    	var sData = [];
        var searchValue = $("select[name=searchBox]").val();
        var rText = searchValue.toLowerCase().replace("s", "");
        var sText = $("input[name=" + searchValue + "]").val();
        
    	// 데이터 가져오기
        $.post("/myapp/getJsonByMap", { sColumn : rText, sText : sText }, (function(gData) {
            _.each(gData, function(obj) {
            	
            	var insertObj = {
            			_id		: "",
            			name	: "",
            			role	: "",
            			rank	: "",
            			regDt	: ""
            	};
            	
            	insertObj._id = obj.ID;
            	insertObj.name = obj.NAME;
            	insertObj.role = obj.ROLE;
            	insertObj.rank = obj.RANK;
            	insertObj.regDt = obj.REGDT;
            	getList.push(insertObj);
            });
            
            data = getList;
            renderFunction(data);
        	
        }), "json");
    });

    // 중복체크
    $("button[name=duplication]").click(function() {
        var inputVal = $("input[name=_id]").val();
        if(inputVal !== "") {
            var setVal = "";
            
            $.post("/myapp/existId", { _id : inputVal } , function(returnText) {
            	if(returnText == "Y") {
            		alert("아이디가 존재합니다. 다시 입력해 주십시오.");
                    $("input[name=_id]").val("");
                    $("input[name=_id]").focus();
                    $("input[name=dupIdChk]").val("");
            	} else {
            		alert("사용 가능한 아이디 입니다.");
                    setVal = "N";
            	}
            	$("input[name=dupIdChk]").val(setVal);
            }, "text");
        } else {
            alert("아이디를 입력해 주십시오.");
            $("input[name=_id]").focus();
        }
    });

    // 저장
    $("button[name=save]").click(function() {
        var chkIdVal = $("input[name=dupIdChk]").val();
        if(chkIdVal === "") {
            alert("중복체크를 진행하셔야 합니다.");
            $("input[name=_id]").focus();
            return false;
        } else if(chkIdVal === "Y") {
            alert("아이디가 존재합니다. 다시 입력해 주십시오.");
            $("input[name=_id]").val("")
            $("input[name=_id]").focus();
            $("input[name=dupIdChk]").val("");
            return false;
        } else if(chkIdVal === "N") {
            var now = new Date();
            var setDate = replaceDate();
            $("input[name=regDt]").val(setDate);
            if(nullChk()) {
                var rtn = {};
                _.each($(".form-control"), function(obj) {
                    var ctrl = $(obj);
                    rtn[ctrl.attr("name")] = ctrl.val();
                });
                
                $.post("/myapp/insertData", rtn, function(returnText) {
                	alert(returnText);
                	$("button[name=listRender]").trigger("click");
                }, "text");

                selectBoxInitFunction();
                $("div[name=inputArea] .form-group input").val("");
                $("input[name=dupIdChk]").val("");
                $("button[name=close]").trigger("click");
            }
        } else {
            alert("시스템 오류가 발생하였습니다.");
            return false;
        }
    });

    // 수정
    $("button[name=modSave]").click(function() {
        var modId = $("input[name=_id]").val();
        var setDate = replaceDate();
        $("input[name=regDt]").val(setDate);
        if(nullChk()) {
            // 데이터 수정하기
        	var rtn = {};
            _.each($(".form-control"), function(obj) {
                var ctrl = $(obj);
                rtn[ctrl.attr("name")] = ctrl.val();
            });
            
        	$.post("/myapp/updateData", rtn, function(returnText) {
            	alert(returnText);
            	$("button[name=listRender]").trigger("click");
            }, "text");
        	
            selectBoxInitFunction();
            $("button[name=listRender]").trigger("click");
            $("div[name=inputArea] .form-group input").val("");
            $("input[name=dupIdChk]").val("");
            $("button[name=close]").trigger("click");
        }
    });

    // 삭제
    $("table[name=table01] tbody").on("click", "button[name=delete]", function() {
        var $_id = $(this).children("input").val();

        $.post("/myapp/deleteData", { _id : $_id } , function(returnText) {
        	alert(returnText);
        	$("button[name=listRender]").trigger("click");
        }, "text");

        $("button[name=listRender]").trigger("click");
    });

    // NULL 체크
    var nullChk = function() {
        var returnVal = true;
        $("div[name=inputArea] div").each(function() {
            var inputObj = $(this).children("input");
            if(inputObj.val() === "") {
                alert(inputObj.attr("placeholder") + "(을)를 입력해 주십시오");
                inputObj.focus();
                returnVal = false;
                return returnVal;
            }
        });
        return returnVal;
    };
});

// SELECT BOX CHANGE 시 INPUT BOX 변경
function changeFunction(value) {
    $("div[name=sText]").find("input").val("");
    $("div[name=sText]").children("div").css("display", "none");
    $("input[name=" + value + "]").parent("div").css("display", "inline-block");
}

// SELECT BOX INIT
function selectBoxInitFunction() {
    $("select[name=searchBox] option:first").attr("selected", true);
    $("div[name=sText]").find("input").val("");
    $("div[name=sText]").children("div").css("display", "none");
}

// 등록 / 수정 날짜 포맷
function replaceDate() {
	var now = new Date();
	
    var year = now.getFullYear();
    var month = (now.getMonth() + 1) + "";
    var day = now.getDate() + "";
    
    var hour = now.getHours() + "";
    var minutes = now.getMinutes() + "";
    var second = now.getSeconds() + "";
    
    if(month.length == 1) month = "0" + month;
    if(day.length == 1) day = "0" + day;
    if(hour.length == 1) hour = "0" + hour;
    if(minutes.length == 1) minutes = "0" + minutes;
    if(second.length == 1) second = "0" + second;
    
    var setDate = year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + second;
    
    return setDate;
}

// 등록 / 수정 항목 길이 체크
function lengthCheck(obj, length) {
	if(obj.value != "") {
		if(obj.name == "_id") {
			if(obj.value.length != 11) {
				alert(obj.placeholder + "는 11 자여야 합니다.");
				$(obj).focus();
				return false;
			}
		} else {
			if(obj.value.length < length) {
				alert(obj.placeholder + "은 " + length + "자 이상 " + obj.maxLength + "자 이하 여야 합니다.");
				$(obj).focus();
				return false;
			}
		}
	}
}