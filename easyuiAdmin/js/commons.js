
$(function () {
    // 自定义的校验器
    var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
    $.extend($.fn.validatebox.defaults.rules, {
        midLength: {
            validator: function(value, param){
                return value.length >= param[0] && value.length <= param[1];
            },
            message: ''
        } ,
        equalLength : {
            validator: function(value, param){
                return value.length == param[0];
            },
            message: '密码必须为4个字符!'
        },
        phonenumber: {
            validator: function(value, param){
                return reg.test(value);
                },
            message: '手机号输入有误！'
        }
    });


    $.extend($.fn.datagrid.methods, {
        endEditing: function (jq) {
            return jq.each(function(){
                var opts = $(this).datagrid('options');
                if (opts.editIndex == undefined){return true}
                if ($(this).datagrid('validateRow', opts.editIndex)){
                    $(this).datagrid('endEdit', opts.editIndex);
                    opts.editIndex = undefined;
                    return true;
                } else {
                    return false;
                }
            })
        },
        append: function(jq, row) {
            jq.each(function(){
                var dg = $(this);
                var opts = dg.datagrid('options');
                if (dg.datagrid('endEditing')) {
                    dg.datagrid('appendRow', row);
                    opts.editIndex = dg.datagrid('getRows').length-1;
                    var fields = dg.datagrid('getColumnFields',true).concat(dg.datagrid('getColumnFields'));
                    dg.datagrid('selectRow', opts.editIndex).datagrid('editCell', {
                        index: opts.editIndex,
                        field: fields[0]
                    });
                }
            })
        },
        removeit: function(jq) {
            jq.each(function(){
                var opts = $(this).datagrid('options');
                if (opts.editIndex == undefined){return}
                $(this).datagrid('cancelEdit', opts.editIndex)
                    .datagrid('deleteRow', opts.editIndex);
                opts.editIndex = undefined;
            })
        },
        editCell: function (jq, param) {
            return jq.each(function(){
                var dg = $(this);
                var opts = dg.datagrid('options');
                opts.editIndex = param.index;
                var fields = dg.datagrid('getColumnFields',true).concat(dg.datagrid('getColumnFields'));
                //console.info(fields);
                var colNum;
                for(var i=0; i<fields.length; i++){
                    var col = dg.datagrid('getColumnOption', fields[i]);
                    col.editor1 = col.editor;
                    if (fields[i] != param.field){
                        col.editor = null;
                    } else {
                        colNum = i;
                    }
                }
                dg.datagrid('beginEdit', param.index);
                var ed = dg.datagrid('getEditor', param);
                if (ed){
                    var target = $(ed.target);
                    if($(ed.target).hasClass('textbox-text')){
                        target.focus();
                    }else if ($(ed.target).hasClass('textbox-f')){
                        target.textbox('textbox').focus();
                    }else{
                        target.focus();
                    }
                    $('.datagrid-editable .textbox,.datagrid-editable .datagrid-editable-input,.datagrid-editable .textbox-text,.datagrid-cell-c5-contactAddress .textbox-text').bind('keydown', function(e){
                        var code = e.keyCode || e.which;
                        var opts = dg.datagrid('options');
                        if(code == 13) {
                            var nextColNum = colNum + 1;
                            var nextField = dg.datagrid('getColumnOption', fields[nextColNum]);
                            console.info(nextField);
                            while(nextColNum ++, nextColNum < fields.length && nextField.editor == undefined){
                                nextField = dg.datagrid('getColumnOption', fields[nextColNum]);
                            }
                            if(nextField.editor != undefined){
                                opts.onClickCell.call(dg, param.index, nextField.field)
                            } else {
                                if(opts.lastFieldFun != undefined) {
                                    opts.lastFieldFun(dg, param.index, nextField.field);
                                }
                            }
                        }
                    });
                }
                for(var i=0; i<fields.length; i++){
                    var col = dg.datagrid('getColumnOption', fields[i]);
                    col.editor = col.editor1;
                }
            });
        },
        enableCellEditing: function(jq){
            return jq.each(function(){
                var dg = $(this);
                var opts = dg.datagrid('options');
                if(!opts.oldOnClickCell) {
                    opts.oldOnClickCell = opts.onClickCell;
                }
                opts.onClickCell = function(index, field){
                    if (opts.editIndex != undefined){
                        if (dg.datagrid('validateRow', opts.editIndex)){
                            dg.datagrid('endEdit', opts.editIndex);
                            opts.editIndex = undefined;
                        } else {
                            return;
                        }
                    }
                    dg.datagrid('selectRow', index).datagrid('editCell', {
                        index: index,
                        field: field
                    });
                    opts.editIndex = index;
                    opts.oldOnClickCell.call(this, index, field);
                }
            });
        },

        statistics: function(jq, field) {
            return jq.each(function(){
                var dg = $(this);
                var data = dg.datagrid("getData");
                var sum = 0;
                if(data.rows){
                    $.each(data.rows, function(i, n){
                        //sum += n[field]*1;
                        sum = add(sum,n[field]);
                    });
                    data.footer[0][field] = Number(String(sum).replace(/^(.*\..{4}).*$/,"$1"));
                    dg.datagrid("reloadFooter");
                }

          })
        }

    });



})



function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}



