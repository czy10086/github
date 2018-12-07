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
    $('#initDate1').datebox('calendar');
   /* $('#initDate1').datebox().datebox('calendar').calendar({
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
                    pagination:false,
                    idField:'id',
                    columns:[[
                        { field:'name',
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
                        { field:'province',
                            title:'省ID',
                            hidden:true
                        },
                        { field:'city',
                            title:'市ID',
                            hidden:true
                        },
                        { field:'district',
                            title:'区ID',
                            hidden:true
                        },
                        { field:'address',
                            title:'详细地址',
                            hidden:true
                        },
                        { field:'provinceName',
                            title:'省',
                            hidden:true
                        },
                        { field:'cityName',
                            title:'市',
                            hidden:true
                        },
                        { field:'districtName',
                            title:'区',
                            hidden:true
                        },
                        { field:'contactAddress',
                            title:'联系地址',
                            width : 100,
                            hidden:false,
                            formatter: function(value,row,index){
                                var address = row.provinceName + row.cityName + row.districtName;
                                if(address){
                                    return address;
                                }
                            },
                            editor : {
                                type : "textbox",
                                options:{
                                    buttonIcon:'fa fa-ellipsis-h fa-lg',
                                    buttonAlign:'right',
                                    onClickButton:function () {
                                        var dd = $(this);
                                        var getSelectedRow = $('#editTab').datagrid("getSelected");
                                        var gIndex = $('#editTab').datagrid("getRowIndex", getSelectedRow);
                                        var value = getSelectedRow.province+","+getSelectedRow.city+","+getSelectedRow.district+","+ getSelectedRow.address;
                                        openSelectAddress(value);
                                      var sec =  layer.open({
                                            type: 1,
                                            skin: 'layui-layer-molv', //加上边框
                                            area: ['600px', '388px'], //宽高
                                            content: $('#addressDialog')
                                            ,btn: ['保存', '取消']
                                            ,yes: function(sec, layero){
                                                layer.close(sec);
                                                var provinceId = $("#province").combobox('getValue'),
                                                    cityId = $("#city").combobox('getValue'),
                                                    districtId = $("#district").combobox('getValue');
                                                    getSelectedRow.province = provinceId;
                                                    getSelectedRow.city = cityId;
                                                    getSelectedRow.district = districtId;
                                                    getSelectedRow.provinceName = $("#province").combobox('getText');
                                                    getSelectedRow.cityName = $("#city").combobox('getText');
                                                    getSelectedRow.districtName = $("#district").combobox('getText');
                                                    getSelectedRow.address = $("#detailDistrict").val();
                                                    $('#editTab').datagrid('updateRow', {index: gIndex, row: getSelectedRow});
                                                    dd.textbox('setValue',getSelectedRow.provinceName+getSelectedRow.cityName+getSelectedRow.districtName+ getSelectedRow.address)

                                            }
                                            ,btn2: function(sec, layero){
                                                layer.close(sec);
                                            }
                                        });


                                    }

                                }
                            }
                        },

                        { field:'first',
                            title:'首要联系人',
                            width : 100,
                            hidden:false,
                            editor : {
                                type : "validatebox"
                            }
                        },

                    ]],
                    lastFieldFun: function (dg, index, field) {
                        console.info(index, field);
                        $('#editTab').datagrid('append', {});
                    },
                    toolbar:[{
                        id:'addEdit',
                        iconCls:'fa fa-plus fa-flg',
                        handler:function () {
                            var row = {
                                name:'',
                                mobile:'',
                                phone:'',
                                mi:'',
                                province:'',
                                city:'',
                                district:'',
                                contactAddress:'',
                                provinceName:'',
                                cityName:'',
                                districtName:'',
                                address:'',
                                first:''
                            };
                            $('#editTab').datagrid('append', row);
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
                    area: ['680px', '480px'], //宽高
                    content: $('#addCusDialog')
                    ,btn: ['保存', '取消']
                    ,yes: function(index, layero){
                        if($("#code").val()==''){
                            layer.alert("客户编码不能为空");
                            return false;
                        }
                        if($("#name").val()==''){
                            layer.alert("客户名称不能为空");
                            return false;
                        }
                        var rowsData = $('#editTab').datagrid('getRows');
                        console.info(rowsData);
                        var data = {
                            code:$("#code").val(),
                            name:$("#name").val(),
                            category1:$("#category1").val(),
                            initDate1:$("#initDate1").val(),
                            taxPayerNo:$("#taxPayerNo").val(),
                            bank:$("#bank").val(),
                            cardNo:$("#cardNo").val(),
                            receiveFunds1:$("#receiveFunds1").val(),
                            periodReceiveFunds1:$("#periodReceiveFunds1").val(),
                            employee:$("#employee").val(),
                            contact:rowsData
                        };

                        $.ajax({
                            type:"POST",
                            url:genAPI('settings/addCustomer'),
                            async:true,
                            contentType:"application/json",
                            data:JSON.stringify(data),
                            success:function(res){
                                if(res.code=='200'){
                                    layer.alert("保存成功！");
                                }else{

                                }
                            }
                        });


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
        }]
    })


});

function openSelectAddress(value){ //打开地址
    var ids;
    if (value){
        ids = value.split(',');
    }
    var url = genAPI('settings/district');

    $('#city').combobox('loadData', {data:[]});
    $('#district').combobox('loadData', {data:[]});
    // 省
    $("#province").combobox({
        url: url+"?key=0",
        valueField: 'id',
        textField: 'fullname',
        cache: false,
        editable: false, //只读
        loadFilter:function (res) {
            var data = res.data;
            return data
        },
        onSelect:function(record){
            if(record.cidx){
                $('#city').combobox('reload',url+"?key=1&start="+record.cidx[0]+"&end="+record.cidx[1]);
                $('#city').combobox('options').url=null;
            }

        },
        onLoadSuccess: function () {
            if(ids && ids[0]){
                $("#province").combobox("select", ids[0]);
            }
        }
    });
    $("#city").combobox({
        valueField: 'id',
        textField: 'fullname',
        cache: false,
        editable: false,
        loadFilter:function (res) {
            return res.data
        },
        onSelect:function(record){
            $('#district').combobox('clear');
            if(record.cidx){
                $('#district').combobox('reload',url+"?key=2&start="+record.cidx[0]+"&end="+record.cidx[1]);
                $('#district').combobox('options').url=null;
            }

        },
        onLoadSuccess: function () {
            if(ids && ids[1]){
                $("#city").combobox("select", ids[1]);
            }
        }
    });
    $("#district").combobox({
        valueField: 'id',
        textField: 'fullname',
        cache: false,
        editable: false,
        loadFilter:function (res) {
            return res.data
        },
        onLoadSuccess: function () {
            if(ids && ids[2]){
                $("#district").combobox("select", ids[2]);
            }
        }
    });
    $("#detailDistrict").val(ids[3] || "");
}






