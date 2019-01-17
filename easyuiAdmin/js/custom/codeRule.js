$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }

    });

    $('#codeRule').datagrid({
        url : genAPI(''),
        method:'post',
        striped:true,
        nowrap:true,
        pagination:true,
        rownumbers:true,
        //singleSelect:true,
        checkOnSelect:true,
        queryParams:{
        },
        loadFilter: function(data){
            return data.data
        },
        columns : [[
            {
                field : 'code',
                title : '单据类型',
                align : 'center',
                width:100
            },
            {
                field : 'name',
                title : '规则名称',
                align : 'center',
                width:100
            },
            {
                field : 'categoryName',
                title : '编号规则',
                align : 'center',
                width:100
            },
            {
                field : 'specs',
                title : '编号位数',
                align : 'center',
                width:100
            },
            {
                field : 'unitName',
                title : '起始编号',
                align : 'center',
                width:150
            },
            {
                field : 'status',
                title : '默认状态',
                align : 'center',
                width:100,
                formatter:function (value,record,index) {
                    if (value=="1"){
                        return "启用";
                    } else {
                        return "禁用";
                    }
                }
            }
        ]],
        toolbar:[{
            text:'添加',
            iconCls:'fa fa-plus fa-lg',
            handler:function(){
                layer.open({
                    type: 1,
                    title:'编码规则',
                    skin: 'layui-layer-molv', //加上边框
                    area: ['650px', '450px'], //宽高
                    content: $('#addCodeRule')
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){


                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                    },
                    end: function(index, layero){

                    }
                })

            }
        },'-',{
            text:'修改',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){
                var rowSelect = $("#codeRule").datagrid("getSelected");
                console.info(rowSelect);
                if(!rowSelect){
                    layer.alert("请选中一行进行修改",{skin:'layui-layer-molv'});
                    return false;
                }
                $("input[name='unitNum']").val(rowSelect.unitName);

                layer.open({
                    type: 1,
                    title:'',
                    skin: 'layui-layer-molv', //加上边框
                    area: ['400px', '200px'], //宽高
                    content: $('#addUnit1')
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){


                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                    },
                    end: function(index, layero){
                        $("input[name='unitNum").val("");
                    }
                })
            }
        },'-',{
            text:'删除',
            iconCls:'fa fa-pencil-square-o fa-lg',
            handler:function(){
                var rowSelect=$("#codeRule").datagrid("getSelected");
                // console.info(rowSelect);
                if(!rowSelect){
                    layer.alert("请选中一行进行删除",{skin:'layui-layer-molv'});
                    return false;
                }
                var data={
                    id:rowSelect.id
                };
                if(rowSelect){
                    $.ajax({
                        type:"post",
                        url:genAPI(''),
                        cache:false,
                        dataType:"json",
                        headers:{
                            "uid":$.cookie('uid'),
                            "token":$.cookie('jwt')
                        },
                        data: JSON.stringify(data),
                        contentType : "application/json;charset=UTF-8",
                        success:function (res) {
                            if(res.code==200){
                                layer.msg("删除成功！");

                            }else{
                                layer.msg(res.message)
                            }

                        },
                        error:function () {

                        }
                    })
                }
            }
        }],
        onLoadSuccess:function(data){

        }
    });

    //
    var myDate = new Date;
    var year = myDate.getFullYear();//获取当前年
    var yue = myDate.getMonth()+1;//获取当前月
    var day = myDate.getDate();//获取当前日
    $(".dateSelect span").on("click",function () {
        var txt="";
        if($(this).hasClass("checked")){
            $(this).removeClass("checked");
            if($("#year").parent().hasClass("checked")){
                $('#demo').val($("#startNo").val()+year);
                txt = $("#startNo").val()+year;
            }
            if($("#month").parent().hasClass("checked")){
                $('#demo').val(txt+yue);
                txt = txt+yue;
            }
            if($("#day").parent().hasClass("checked")){
                $('#demo').val(txt+day);
            }
        }else{
            $(this).addClass("checked");
            if($("#year").parent().hasClass("checked")){
                $('#demo').val($("#startNo").val()+year);
                txt = $("#startNo").val()+year;
            }
            if($("#month").parent().hasClass("checked")){
                $('#demo').val(txt+yue);
                txt = txt+yue;
            }
            if($("#day").parent().hasClass("checked")){
                $('#demo').val(txt+day);
            }
        }


    });
    $("#startNo").on('input propertychange',function () {


    });
});



