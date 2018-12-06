
$(function () {
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
                    } else if ($(ed.target).hasClass('textbox-f')){
                        target.textbox('textbox').focus();
                    }else  {
                        target.focus();
                    }
                   // target.bind('keydown', function(e){
                    $('.datagrid-editable .textbox,.datagrid-editable .datagrid-editable-input,.datagrid-editable .textbox-text').bind('keydown', function(e){
                        //console.info(ed.target);
                        var code = e.keyCode || e.which;
                        var opts = dg.datagrid('options');
                        if(code == 13) {
                            if(fields[colNum+1]){
                                console.info(fields[colNum+1])
                                console.info(param.index)
                                opts.onClickCell.call(dg, param.index, fields[colNum+1])
                            } else {
                                if(opts.lastFieldFun != undefined) {
                                    opts.lastFieldFun(dg, param.index, fields[colNum]);
                                }
                            }
                        }
                    });

                }else{
                    var target = $(ed.target);
                    target.blur();
                    target.datagrid('acceptChanges');
                    target.datagrid('endEdit', opts.editIndex);
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
                opts.oldOnClickCell = opts.onClickCell;
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
        }
    });

   /* $.extend($.fn.datagrid.defaults.editors, {
        searchbox: {
            init: function(container, options){
                var input = $('<input class="addressDialog easyui-searchbox" data-options="searcher:doDialog"/>').appendTo(container);
                return input.searchbox(options);
            },
            destroy: function(target){
                $(target).remove();
            },
            getValue: function(target){
                return $(target).val();
            },
            setValue: function(target, value){
                $(target).val(value);
            },
            resize: function(target, width){
                $(target).next()._outerWidth(width);
                $(target).next().children().children().removeClass('searchbox-button').addClass('fa fa-ellipsis-h fa-lg').css({"line-height":"30px","margin-top":"0","width":"20px"})
            }
        }
    });*/


})