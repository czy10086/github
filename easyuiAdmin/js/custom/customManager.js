$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }

    });
    $("span.combo").click(function () {
        $(".combo-p").css('z-index', '99999999999');
    });
    $('#dd').datebox('calendar');
   /* $('#dd').datebox().datebox('calendar').calendar({
        validator : function(date){
            var now = new Date();
            var d1 = new Date(now.getFullYear(),now.getMonth(),now.getDate());
            return d1 <= date;
        }
    });*/

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
            typeNum:1
        },
        onClick : function(node) {
            //console.log(node);
        },
        onBeforeExpand:function(node,param){

        },
        onLoadSuccess:function(node,data){

        }

    });


    $("#customList").datagrid({
        url:genAPI('settings/customerList'),
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
            { field:'category1',title:'客户类别',hidden:true},
            { field:'code',title:'客户编号',width:100},
            { field:'name',title:'客户名称',width:200},
            { field:'employee',title:'销售人员',width:200},
            { field:'contact',title:'首要联系人',width:200},
            { field:'mobile',title:'手机',width:200},
            { field:'phone',title:'座机',width:200},
            { field:'im',title:'QQ/微信/email',width:200,hidden:true},
            { field:'status',title:'状态',width:200}
        ]],
        toolbar:[{
            text:'添加',
            iconCls:'fa fa-plus fa-lg',
            handler:function(){
                var editRow = undefined;
                $('#editTab').datagrid({
                    rownumbers : true,
                    columns:[[
                        { field:'contact',
                            title:'联系人',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                         },
                        { field:'mobile',
                            title:'手机',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                         },
                        { field:'phone',
                            title:'座机',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                        },
                        { field:'mi',
                            title:'QQ/微信/Email',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                        },
                        { field:'address',
                            title:'联系地址',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                         },
                        { field:'contact',
                            title:'首要联系人',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox",
                                options : {
                                    required : true,
                                    validType:"contact"
                                }
                            }
                        }
                    ]],
                    toolbar:[{
                        id:'addEdit',
                        iconCls:'fa fa-plus fa-flg',
                        handler:function () {
                            if (editRow != undefined) {
                                $("#editTab").datagrid('endEdit', editRow);
                            }
                            if (editRow == undefined) {
                                $("#editTab").datagrid('insertRow', {
                                    index: 0,
                                    row: {}
                                });
                                $("#editTab").datagrid('beginEdit', 0);
                                editRow = 0;
                                $('.datagrid-editable .textbox,.datagrid-editable .datagrid-editable-input,.datagrid-editable .textbox-text').bind('keydown', function(e){
                                    console.log(e)
                                     var code = e.keyCode || e.which;
                                     if(code == 13) {


                                     }
                                });


                            }
                        }
                    },'-', {
                        text: '删除',
                        iconCls: 'fa fa-remove fa-lg', handler: function () {
                            var row = $("#editTab").datagrid('getSelections');

                            if(row.length>0) {
                                layer.confirm('你确定要删除所选记录吗？', {
                                        skin: 'layui-layer-molv',
                                        btn: ['确定', '取消'] //按钮
                                    }, function (target) {
                                        if (target) {
                                            var ids = [];
                                            for (i = 0; i < row.length; i++) {
                                                ids.push(row[i].id);
                                            }
                                            console.info(ids);
                                            console.info(ids.join(','))
                                        }
                                    }, function (index) {
                                        layer.close(index)
                                    });
                            }

                            if (editRow == undefined){return}
                            $('#editTab').datagrid('cancelEdit', editRow)
                                .datagrid('deleteRow', editRow);
                            editRow = undefined;
                        }
                    }],
                    onBeforeEdit: function (rowIndex, rowData) {

                    },



                });
                layer.open({
                    type: 1,
                    skin: 'layui-layer-molv', //加上边框
                    area: ['680px', '580px'], //宽高
                    content: $('#addCusDialog')
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){

                        layer.close(index);
                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                    }
                });

            }
        },'-',{
            text:'修改',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){


            }
        },'-',{
            text:'重置密码',
            iconCls:'fa fa-refresh fa-lg',
            handler:function(){

            }
        },'-',{
            text:'冻结账号',
            iconCls:'fa fa-warning fa-lg',
            handler:function(){

            }
        },'-',{
            text:'启用账号',
            iconCls:'fa fa-check-circle fa-lg',
            handler:function(){

            }
        },'-',{
            text:'分配组',
            iconCls:'fa fa-users fa-lg',
            handler:function () {

            }
        }]
    })
});

//新增数据
function endEditing(){
    if (editRow == undefined){return true}
    if ($('#dg').datagrid('validateRow', editRow)){
        $('#dg').datagrid('endEdit', editRow);
        editRow = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell(index, field){
    if (endEditing()){
        $('#dg').datagrid('selectRow', index)
            .datagrid('editCell', {index:index,field:field});
        editRow = index;
    }
}
