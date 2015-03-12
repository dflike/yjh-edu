<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <script src="http://underscorejs.org/underscore-min.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
    <script src="/myapp/resources/js/index.js"></script>

    <title>우리의 첫번째 html 화일 입니다.</title>

    <style type="text/css">
        <!--
        .t-align-center { text-align : center; }
        .t-align-right { text-align : right; }
        .item-hide { display:none; }
        -->
    </style>
</head>
<body>
<div name="inputArea" class="well form-horizontal">
    <div class="form-group" style="padding-top:20px;">
        <label class="col-sm-2 control-label" for="_id">아이디</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="_id" onblur="javascript:lengthCheck(this, 11);" placeholder="아이디" style="ime-mode:disabled; text-transform:uppercase;" maxlength="11">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label" for="name">이름</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="name" onblur="javascript:lengthCheck(this, 2);" placeholder="이름" style="ime-mode:active;" maxlength="4">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label" for="role">직급</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="role" onblur="javascript:lengthCheck(this, 2);" placeholder="직급" style="ime-mode:active;" maxlength="3">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label" for="rank">등급</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" name="rank" onblur="javascript:lengthCheck(this, 2);" placeholder="등급" style="ime-mode:active;" maxlength="3">
        </div>
    </div>
    <div class="form-group">
        <input type="hidden" class="form-control" name="regDt" value="">
    </div>

    <p class="t-align-right">
        <button class="btn btn-sm btn-danger" name="duplication"><i class="glyphicon glyphicon-check"></i> 중복체크</button>
        <button class="btn btn-sm btn-success" name="save"><i class="glyphicon glyphicon-save"></i> 저장</button>
        <button class="btn btn-sm btn-success" name="modSave"><i class="glyphicon glyphicon-save"></i> 저장</button>
        <button class="btn btn-sm btn-default" name="close"> 닫기</button>
    </p>
    <input type="hidden" name="dupIdChk" value="">
</div>

<div name="listArea" class="well">
    <div name="searchGroup" class="col-xs-6">
        <div class="col-md-3">
            <div class="form-group">
                <select class="form-control" name="searchBox" onchange="changeFunction(this.value);">
                    <option value="sAll">전체</option>
                    <option value="sName">이름</option>
                    <option value="sRole">직급</option>
                    <option value="sRank">등급</option>
                </select>
            </div>
            </div>

        <div class="col-md-6" name="sText">
            <div class="form-group col-md-12 item-hide">
                <input type="text" class="form-control" name="sName" placeholder="이름" onkeydown="if(event.keyCode == '13') $('button[name=listRender]').trigger('click');">
            </div>
            <div class="form-group col-md-12 item-hide">
                <input type="text" class="form-control" name="sRole" placeholder="직급" onkeydown="if(event.keyCode == '13') $('button[name=listRender]').trigger('click');">
            </div>
            <div class="form-group col-md-12 item-hide">
                <input type="text" class="form-control" name="sRank" placeholder="등급" onkeydown="if(event.keyCode == '13') $('button[name=listRender]').trigger('click');">
            </div>
        </div>

        <div class="col-md-3">
            <p>
                <button class="btn btn-sm btn-primary" name="listRender"><i class="glyphicon glyphicon-search"> 조회</i></button>
                <button class="btn btn-sm btn-primary" name="regData"><i class="glyphicon glyphicon-user"> 등록</i></button>
            </p>
        </div>
    </div>

    <!--<div name="regArea">

    </div>-->

    <table name="table01" class="table table-bordered table-condensed table-hover table-striped">
        <colgroup>
            <col width="150px">
            <col width="150px">
            <col width="150px">
            <col width="150px">
            <col width="*">
        </colgroup>
        <thead>
        <tr>
            <th class="t-align-center" name="name">이름</th>
            <th class="t-align-center" name="role">직급</th>
            <th class="t-align-center" name="rank">등급</th>
            <th class="t-align-center" name="regDt">등록일</th>
            <th class="t-align-center" name="delete">삭제</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
</body>
</html>