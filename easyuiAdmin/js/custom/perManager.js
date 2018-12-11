
$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        },

    });

    $("#perList").datagrid({
        url:genAPI('user/list'),
        method:'post',
        fitColumns:true,
        striped:true,
        nowrap:true,
        pagination:true,
        rownumbers:true,
        singleSelect:true,
        fit:true,
        loadFilter:function (data) {
            return data.data
        },
        columns:[[
            { field:'uid',title:'uid',hidden:true},
            { field:'khdm',title:'客户代码',width:100},
            { field:'username',title:'职员编号',width:100},
            { field:'realName',title:'职员姓名',width:200},
            { field:'sex',title:'性别',width:100,formatter: function(value,row,index){
                    if (value=="1"){
                        return "男";
                    } else {
                        return "女";
                    }
                }},
            { field:'phone',title:'手机号码',width:200},
            { field:'email',title:'邮箱',width:200},
            { field:'status',title:'状态',width:200,formatter: function(value,row,index){
                    if (value=="1"){
                        return "启用";
                    } else {
                        return "禁用";
                    }
                }}
        ]],
        toolbar:[{
            text:'添加',
            iconCls:'fa fa-plus fa-lg',
            handler:function(){
                var username = $("#username").val(""),
                    password = $("#password").val(''),
                    name = $("#name").val(""),
                    sex = $("#sex").val(""),
                    phone = $("#phone").val(""),
                    email = $("#email").val("");
                $("#action_type").val("add");
                $("#addRegister").dialog('open');

            }
        },'-',{
            text:'修改',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){

                $("#action_type").val("update");

                var rowSelect=$("#perList").datagrid("getSelected");
               // console.info(rowSelect);
                var data={
                    "uid" : rowSelect.uid
                };
               if(rowSelect){
                   $("#addRegister").dialog('open');
                   $.ajax({
                       type:"post",
                       url:genAPI('user/userInfo'),
                       cache:false,
                       dataType:"json",
                       data:JSON.stringify(data),
                       contentType : "application/json;charset=UTF-8",
                       success:function (res) {
                          // console.info(res);
                           $(".hidden-class").css("display","none");
                           $("#username").val(res.data.username);
                           $("#name").val(res.data.realName);
                           $("#sex").val(res.data.sex);
                           $("#password").val(res.data.password);
                           $("#email").val(res.data.email);
                           $("#phone").val(res.data.phone);
                       },error:function () {

                       }
                   })
               }

            }
        },'-',{
            text:'重置密码',
            iconCls:'fa fa-refresh fa-lg',
            handler:function(){
                var rowSelect=$("#perList").datagrid("getSelected");
                var data = {
                    uid : rowSelect.uid
                };
                if(rowSelect){
                    $.ajax({
                        type:"post",
                        url:genAPI('user/resetPwd'),
                        cache:false,
                        dataType:"json",
                        data:JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                            //console.info(res);


                        },error:function () {

                        }
                    })
                }
            }
        },'-',{
            text:'冻结账号',
            iconCls:'fa fa-warning fa-lg',
            handler:function(){
                var rowSelect=$("#perList").datagrid("getSelected");
                var data = {
                    uid : rowSelect.uid
                };
                if(rowSelect){
                    $.ajax({
                        type:"post",
                        url:genAPI('user/freeze'),
                        cache:false,
                        dataType:"json",
                        data:JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                           // console.info(res);
                            layer.msg("成功冻结该账号");
                            $('#perList').datagrid('reload');
                        },error:function () {

                        }
                    })
                }
            }
        },'-',{
            text:'启用账号',
            iconCls:'fa fa-check-circle fa-lg',
            handler:function(){
                var rowSelect=$("#perList").datagrid("getSelected");
                var data = {
                    uid : rowSelect.uid
                };
                if(rowSelect){
                    $.ajax({
                        type:"post",
                        url:genAPI('user/unfreeze'),
                        cache:false,
                        dataType:"json",
                        data:JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                           // console.info(res);
                            layer.msg("该账号已成功启用");
                            $('#perList').datagrid('reload');
                        },error:function () {

                        }
                    })
                }
            }
        },'-',{
            text:'分配组',
            iconCls:'fa fa-users fa-lg',
            handler:function () {
                var rowSelect=$("#perList").datagrid("getSelected");
                if(!rowSelect){
                    layer.alert('请选中一行进行分配',{skin:'layui-layer-molv'});
                }
                var data = {
                    uid : rowSelect.uid
                };
                if(rowSelect){
                    $("#treeGroup").dialog('open');
                    var setting = {
                        check: {
                            enable: true ,//显示复选框
                            chkStyle : "checkbox"
                        },
                        data:{
                            simpleData: {
                                enable:true,
                                idKey: "id",
                                pIdKey: "pid",
                                rootPId: ""
                            }
                        }
                    };
                    $.ajax({
                        type:"post",
                        url:genAPI('user/userGroupTree'),
                        cache:false,
                        dataType:"json",
                        headers:{
                            "uid":$.cookie('uid'),
                            "token":$.cookie('jwt')
                        },
                        data:JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                            if(res.code==200){
                               // console.info(res.data);
                                var zTreeObj = $.fn.zTree.init($("#groupzTree"),setting,res.data);
                                var rootNode_0 = zTreeObj.getNodeByParam('pid',0,null);
                                zTreeObj.expandNode(rootNode_0, true, false, false, false);
                            }
                        }
                    });
                }
            }
        }]
    })
});

//提交添加修改表单
function sumbit() {
    if($("#username").val()==""){
       // $.messager.alert('提醒','请输入用户名');
        layer.alert('请输入用户名',{skin:'layui-layer-molv'});
        return false;
    }
    if($("#name").val()==""){
        //$.messager.alert('提醒','请输入姓名');
        layer.alert("请输入姓名",{skin:'layui-layer-molv'});
        return false;
    }
    if($("#sex").val()==""){
        //$.messager.alert('提醒','请输入性别');
        layer.alert('请输入性别',{skin:'layui-layer-molv'});
        return false;
    }
    var actionType=$("#action_type").val();

    var url="";
    var data={};
    if(actionType == "add"){
        url=genAPI('user/register');
        data={
            username : $("#username").val(),
            password : $("#password").val(),
            realName :$("#name").val(),
            sex : $("#sex").val(),
            phone : $("#phone").val(),
            email : $("#email").val()
        };
    }else{
        var rowSelect=$("#perList").datagrid("getSelected");
        url=genAPI('user/saveUserInfo');
        data={
            uid:rowSelect.uid,
            username : rowSelect.username,
            realName :$("#name").val(),
            sex : $("#sex").val(),
            phone : $("#phone").val(),
            email : $("#email").val()
        };
    }

    $.ajax({
        type:'post',
        url:url,
        cache:false,
        dataType:"json",
        data:JSON.stringify(data),
        contentType : "application/json;charset=UTF-8",
        success:function (res) {
           // console.info(res);
            $("#addRegister").dialog('close');
            $('#perList').datagrid('reload');
        },error:function () {

        }
    })
}
function closed() {
    $("#addRegister").dialog('close');
}

function treeGroupSave() {
    var zTreeObj = $.fn.zTree.getZTreeObj("groupzTree");
    var nodes = zTreeObj.getCheckedNodes(true);
    //console.info(nodes);
    var v="";
    var arr = new Array("");
    for(var i=0;i<nodes.length;i++){
        v+=nodes[i].name + ",";
        arr.push(nodes[i].id);
    }
    //console.log(arr.join(",").substring(1)); //获取选中节点的值
    var row = $('#perList').datagrid('getSelected');
    var data = {
        uid:row.uid,
        ids:arr.join(",").substring(1)
    };
    $.ajax({
        type:'post',
        url:genAPI('user/setUserGroup'),
        cache:false,
        dataType:"json",
        data:JSON.stringify(data),
        contentType : "application/json;charset=UTF-8",
        success:function (res) {
            //console.info(res);
            $("#treeGroup").dialog('close');
            $('#perList').datagrid('reload');
        },error:function () {

        }
    })
}

function treeGroupclosed() {
    $("#treeGroup").dialog('close');
}
