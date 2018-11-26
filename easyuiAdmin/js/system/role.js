
$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }
    });

    $("#roleTable").datagrid({
        url:genAPI('role/list'),
        method:'post',
        fitColumns:true,
        striped:true,
        nowrap:true,
        fit:true,
        pagination:true,
        rownumbers:true,
        singleSelect:true,
        loadFilter:function (data) {
            return data.data
        },
        columns:[[
            { field:'id',title:'角色id',width:20},
            { field:'name',title:'角色名',width:100},
            { field:'code',title:'角色代码',width:100}
        ]],
        toolbar:[{
            text:'角色分配',
            iconCls:'fa fa-user-secret fa-lg',
            handler:function(){
                var row = $('#roleTable').datagrid('getSelected');
                // console.info(row);
                var formdata = {
                    roleId:row.id
                };
                if(row){
                    $("#treeTable").dialog('open');
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
                        url:genAPI('resource/resourceTreeByRoleId'),
                        cache:false,
                        dataType:"json",
                        headers:{
                            "uid":$.cookie('uid'),
                            "token":$.cookie('jwt')
                        },
                        data: JSON.stringify(formdata),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                            if(res.code==200){
                                //console.info(res.data);
                                var zTreeObj = $.fn.zTree.init($("#rolezTree"),setting,res.data);
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
var zTreeObj;
function roleSave() {
    var zTreeObj = $.fn.zTree.getZTreeObj("rolezTree");
    var nodes = zTreeObj.getCheckedNodes(true);
    //console.info(nodes);
    var v="";
    var arr = new Array("");
    for(var i=0;i<nodes.length;i++){
        v+=nodes[i].name + ",";
        arr.push(nodes[i].id);
    }
    console.log(arr.join(",").substring(1)); //获取选中节点的值
    var row = $('#roleTable').datagrid('getSelected');
    var formData = {
        roleId:row.id,
        ids:arr.join(",").substring(1)
    };
    $.ajax({
        type:"post",
        url:genAPI('role/setAuthority'),
        cache:false,
        dataType:"json",
        headers:{
            "uid":$.cookie('uid'),
            "token":$.cookie('jwt')
        },
        data:JSON.stringify(formData),
        contentType : "application/json;charset=UTF-8",
        success:function (res) {
            if(res.code==200){

                $("#treeTable").dialog('close');

            }
        }
    })
}
function closedRole() {
    $("#treeTable").dialog('close');
}