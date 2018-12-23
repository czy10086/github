$(function () {
    $.ajaxSetup({
        headers:{
            uid:$.cookie('uid'),
            token:$.cookie('jwt')
        }

    });
    // table高度自适应
    var height=(Number($(".easyui-layout").height()))*0.9;
    $("#unitList").datagrid({
        height : height
    });
    getData(0,'');
    $(".navTab ul li").on("click",function () {
        $(this).stop().addClass("active").siblings().stop().removeClass("active");
        var type = $(this).attr("typeNum");
        getData(type,'');
    });
    function getData(type) {
        $("#unitList").datagrid({
            url:genAPI('settings/unitList'),
            method:'post',
            fitColumns:true,
            striped:true,
            nowrap:true,
            pagination:true,
            rownumbers:true,
            singleSelect:true,
            loadFilter:function (data) {
                return data.data
            },
            queryParams: {
                typeNum: type
            },
            columns:[[
                { field:'id',title:'主键ID',hidden:false},
                { field:'unitName',title:'计量单位名称',width:100}
            ]],
            toolbar:[{
                text:'添加',
                iconCls:'fa fa-plus fa-lg',
                handler:function(){
                    if(type=='0'){
                        layer.open({
                            type: 1,
                            title:'新增单计量单位',
                            skin: 'layui-layer-molv', //加上边框
                            area: ['400px', '200px'], //宽高
                            content: $('#addUnit1')
                            ,btn: ['保存', '取消']
                            ,yes: function(index, layero){
                                saveUnit();
                                layer.close(index);
                            }
                            ,btn2: function(index, layero){
                                layer.close(index);
                            }
                        })
                    }else if(type='1'){
                        layer.open({
                            type: 1,
                            title:'新增多计量单位',
                            skin: 'layui-layer-molv', //加上边框
                            area: ['500px', '300px'], //宽高
                            content: $('#addUnit2')
                            ,btn: ['保存', '取消']
                            ,yes: function(index, layero){
                                saveUnit();
                                layer.close(index);
                            }
                            ,btn2: function(index, layero){
                                layer.close(index);
                            }
                        })
                    }
                }
            },'-',{
                text:'修改',
                iconCls:'fa fa-pencil-square-o fa-lg',
                handler:function(){

                }
            }]
        });
    }

    //给input初始化绑定鼠标离开焦点事件
    $("input[name='customNum']").blur(function () {
        $(".baseUnitLabel").text($(this).val());
    })

});

function addUnitRow(obj) {

    //获取当前对象上一个平级对象里面的子元素input的值
    var unit=$(obj).prev().children("input").val();
    //Number()将对象值转为数字，否则会出现01 11 21 这种结果
    var deputyUnitText=Number($("#mod-form-rows li").length)+Number(1);
    //创建一个li对象
    var li="<li class=\"row-item\">\n" +
        "                        <div class=\"label-wrap\">\n" +
        "                            <a class=\"fa fa-trash-o fa-lg fa-ico\" title=\"删除\" onclick='delUnitRow(this)'></a>\n" +
        "                            <label id=\"deputyUnitLabel\">副单位"+deputyUnitText+"</label>\n" +
        "                        </div>\n" +
        "                        <div class=\"ctn-wrap\">\n" +
        "                            <input type=\"text\" class=\"ui-input\" />\n" +
        "                            <span class=\"descript\">=</span>\n" +
        "                            <input type=\"text\" class=\"ui-input rateNum\" />\n" +
        "                            <span class=\"descript baseUnitLabel\" class=\"baseUnitLabel\">"+unit+"</span>\n" +
        "                        </div>\n" +
        "                    </li>";
        //将这个li对象append到这个ul
        $("#mod-form-rows").append(li);
        //将单位值放到指定位置
        $(".baseUnitLabel").text(unit);
}

function delUnitRow(obj) {
    $(obj).parent().parent().remove();
}

//如果不想用行内blur事件，请看第88行代码
/*function resetUnitVal(obj) {
    $(".baseUnitLabel").text($(obj).val());
}*/


function saveUnit() {

}