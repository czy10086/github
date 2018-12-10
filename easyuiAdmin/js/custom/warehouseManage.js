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
                        return "用";
                    }
                }}
        ]],
    })
    }
)