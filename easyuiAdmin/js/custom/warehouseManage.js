$(function () {//ready()文档加载后
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }
    });
    $("#warehouseManage").datagrid({//easyUi的数据网格
        url:genAPI('/settings/storageList'),
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
            { field:'id',title:'仓库id',width:20},
            { field:'code',title:'仓库号',width:100,hidden:true},
            { field:'name',title:'仓库名称',width:100},
            { field:'status',title:'状态',width:100,formatter: function(value,row,index){
                    if (value=="1"){
                        return "启用";
                    } else {
                        return "禁用";
                    }
                }}
        ]],
        toolbar:[{//同linkbutton链接按钮
            text:'添加',
            iconCls:'fa fa-plus fa-lg',
            handler:function(){//?
                $("#addWareH").dialog("open");//?
                //$(".hidden-class").css("display","none");//?
            }
        },'-',{
            text:'编辑',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){
                $("#action_type").val("edit");
                var rowSelect=$("#warehouseManage").datagrid("getSelected");
                if(rowSelect){//?
                    $("#addWareH").dialog("open");
                    $("#id").val(rowSelect.id);
                    $("#name").val(rowSelect.name)
                }else{
                    layer.alert("请选中一行进行编辑",{skin:'layui-layer-molv'});
                }
            }
        },'-',{
            text:'删除',
            iconCls:'fa fa-remove fa-lg',
            handler:function(){

                var rowSelect=$("#perTeam").datagrid("getSelected");
                // console.info(rowSelect);
                if(!rowSelect){
                    //$.messager.alert('提醒','请选中一行进行删除');
                    layer.alert("请选中一行进行删除",{skin:'layui-layer-molv'});
                    return false;
                }
                var data={
                    groupId:rowSelect.id
                };
                if(rowSelect){
                    $.ajax({
                        type:"post",
                        url:genAPI('group/deleteGroup'),
                        cache:false,
                        dataType:"json",
                        headers:{
                            "uid":$.cookie('uid'),
                            "token":$.cookie('jwt')
                        },
                        data: JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                            layer.msg("删除成功！");
                            $("#perTeam").datagrid('reload');
                        }
                    })
                }


            }
        }
        ]
    })
    }
)