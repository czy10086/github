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
        idField:'id',
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
                $('#editTab').datagrid({
                    rownumbers : true,
                    singleSelect:true,
                    idField:'id',
                    columns:[[
                        { field:'contact',
                            title:'联系人',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                         },
                        { field:'mobile',
                            title:'手机',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                         },
                        { field:'phone',
                            title:'座机',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                        },
                        { field:'mi',
                            title:'QQ/微信/Email',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                        },
                        { field:'address',
                            title:'联系地址',
                            width : 100,
                            hidden:false,
                            formatter:function () {
                              /*  $(".addressDialog .easyui-searchbox .searchbox-f .textbox-f").on("click",function () {
                                    alert(1);
                                    console.info(000)
                                })*/
                            },
                            editor : {
                                type : "searchbox"
                            }
                         },
                        { field:'first',
                            title:'首要联系人',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                        }
                    ]],
                    lastFieldFun: function (dg, index, field) {
                        console.info(index, field);
                        $('#editTab').datagrid('append', {});
                    },
                    toolbar:[{
                        id:'addEdit',
                        iconCls:'fa fa-plus fa-flg',
                        handler:function () {
                            $('#editTab').datagrid('append', {});


                        }
                    },'-', {
                        text: '删除',
                        iconCls: 'fa fa-remove fa-lg', handler: function () {
                            var row = $("#editTab").datagrid('getSelections');

                            if(row.length>0) {
                                var index = layer.confirm('你确定要删除所选记录吗？', {
                                        skin: 'layui-layer-molv',
                                        btn: ['确定', '取消'] //按钮
                                    }, function (target) {
                                        if (target) {
                                            $('#editTab').datagrid('removeit');
                                            layer.close(index);
                                        }
                                    }, function (index) {
                                        layer.close(index)
                                    });
                            }

                        }
                    }],
                    onBeforeEdit: function (rowIndex, rowData) {
                        $('#editTab').datagrid('getColumnOption',rowIndex);

                    }

                }).datagrid('enableCellEditing');


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

function doDialog(value,name){
    $(this).next().children().children().css({"text-decoration":"none","outline":"none"});
   // alert('You input: ' + value+'('+name+')');
    $.ajax({
        type:"post",
        url:"",
        
    })
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //加上边框
        area: ['680px', '288px'], //宽高
        content: $('#addressDialog')
        ,btn: ['保存', '取消']
        ,yes: function(index, layero){

            layer.close(index);
        }
        ,btn2: function(index, layero){
            layer.close(index);
        }
    })
}
