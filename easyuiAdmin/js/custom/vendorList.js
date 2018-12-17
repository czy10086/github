$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }

    });

    $("#pids").combotree({
        url:genAPI('settings/categoryList'),
        valueField:'id',
        textField:'name',
        parentField:'pid',
        panelWidth:'200',
        loadFilter:function (data) {
            return data.data
        },
        formatter:function(node){
            return node.name;
        },
        queryParams:{
            typeNum:2
        },
        onClick : function(node) {
            //console.log(node);
        },
        onBeforeExpand:function(node,param){

        },
        onLoadSuccess:function(node,data){
            console.info(node);
            console.info(data);
        }

    });

    $("#vendorList").datagrid({
        url:genAPI('settings/vendorList'),
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
        queryParams:{
            query:$("#searTxt").val(),
            category:$("#pid").val()
        },
        columns:[[
            { field:'category2',title:'供应商类别',hidden:true},
            { field:'code',title:'供应商编号',width:100},
            { field:'name',title:'供应商名称',width:200},
            { field:'contact',title:'首要联系人',width:200},
            { field:'mobile',title:'手机',width:200},
            { field:'phone',title:'座机',width:200},
            { field:'im',title:'QQ/微信/email',width:200,hidden:true},
            { field:'status',title:'状态',width:200}
        ]],
        toolbar:[{
            text:'新增',
            iconCls:'fa fa-plus fa-lg',
            handler:function(){


            }
        },'-',{
            text:'修改',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){


            }
        }]
    })
});