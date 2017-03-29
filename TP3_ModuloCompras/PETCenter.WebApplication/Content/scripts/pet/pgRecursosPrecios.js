$(document).ready(function () {
    getProveedores();

    $('#ListaModal').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });

    $('#RecursoModal').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });

    $('#CargaMasivaModal').on('shown.bs.modal', function () {
        $(document).off('focusin.modal');
    });
    
});

function DecargarPlantilla()
{
    //tableExcel
    var params = JSON.stringify({
        "idproveedor": $('#cboProveedorCargaMasiva').val(),
        "idrecurso": -1,
        "idpresentacion": 0,
        "idproveedorecurso": 0

    });
    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/GetRecursoProveedorExel",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        async: false,
        processData: false,
        cache: false,
        success: function (response) {
            $("#tableExcel").empty();
            $("#tableExcel").append(response);
            $(function () {
                $("#Plantilla").table2excel({
                    exclude: ".noExl",
                    name: "Plantilla ListaPrecios",
                    filename: "Plantilla_ListaPrecios",
                    fileext: ".xls",
                    exclude_img: true,
                    exclude_links: true,
                    exclude_inputs: true
                });
            });
        },
        error: function (response) {
            showError(response);
        }
    });
}

function CargaMasiva(){
    $('#CargaMasivaModal').modal("show");
    $('#CargaMasivaModal_header').empty();
    $('#CargaMasivaModal_footer').empty();

    $('#divProveedorCargaMasiva').empty();


    //Add Controls
    $('#CargaMasivaModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-cloud-upload\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Carga Masiva de Recursos y Precios por Proveedor</label>"
    );

    $('#divProveedorCargaMasiva').append(
    "<span class=\"input-group-addon\" style=\"width:130px\">Proveedor</span>" +
    "<input type=\"text\" class=\"form-control input-lg text-uppercase\" id=\"cboProveedorCargaMasiva\" style=\"width: 500px\" />"
    );

    getProveedoresCargaMasivaCombo();

    /*
    getProveedoresCombo();
    getRecursoCombo();
    getPresentacionRecursoCombo(-1, 0);

    var dropdownProveedorModal = $("#cboProveedorModal").data("kendoDropDownList");
    dropdownProveedorModal.bind("filtering", cboProveedorModal_filtering);
    dropdownProveedorModal.value(idproveedor);
    getRecursoProveedor(idproveedor, -1, 0, 0);
    */
}

function VerListaPreciosId(idproveedor)
{
    $('#ListaModal').modal("show");
    $('#ListaModal_header').empty();
    $('#ListaModal_footer').empty();
    
    $('#divProveedor').empty();
    
    //Add Controls
    $('#ListaModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-plus\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Lista de Recursos y Precios por Proveedor</label>"
    );

    if (idproveedor != 0)
        $('#divProveedor').append(
        "<span class=\"input-group-addon\" style=\"width:130px\">Proveedor</span>" +
        "<input type=\"text\" class=\"form-control input-lg text-uppercase\" id=\"cboProveedorModal\" style=\"width: 200px\" disabled />"
        );
    else
        $('#divProveedor').append(
        "<span class=\"input-group-addon\" style=\"width:130px\">Proveedor</span>" +
        "<input type=\"text\" class=\"form-control input-lg text-uppercase\" id=\"cboProveedorModal\" style=\"width: 200px\" />"
        );
    
    //Clean
    getProveedoresCombo();
    getRecursoCombo();
    getPresentacionRecursoCombo(-1, 0);    

    var dropdownProveedorModal = $("#cboProveedorModal").data("kendoDropDownList");
    dropdownProveedorModal.bind("filtering", cboProveedorModal_filtering);
    dropdownProveedorModal.value(idproveedor);
    
    if (idproveedor != 0)
        getRecursoProveedor(idproveedor, -1, 0, 0);
    else
        getRecursoProveedorGroup(idproveedor, -1, 0, 0);

    //Add Controls
    /*
    $('#ListaModal_footer').append(
        "<div class=\"col-xs-12 \">" +
        "<div class=\"col-xs-8\"></div>" +
        "<div class=\"col-xs-2 home-buttom\" style=\"display:block;\" onclick=\"agregarItemRecurso(); return false;\">" +
        "    <center><i class=\"fa fa-plus\">&nbsp;&nbsp;</i> Agregar</center>" +
        "</div>" +
        "<div class=\"col-xs-2 home-buttom\" style=\"display:block;\" onclick=\"insertarSolicitud(); return false;\">" +
        "    <center><i class=\"fa fa-save\">&nbsp;&nbsp;</i> Guardar</center>" +
        "</div>" +
        "</div>"
    );
    */
}

$('#cboRecursoModal').change(function () {
    getPresentacionRecursoCombo($("#cboRecursoModal").val());
});


function cboProveedorModal_filtering(e) {
    var filter = e.filter;
}

function cboProveedorLineModal_filtering(e) {
    var filter = e.filter;
}

function getRecursoCombo() {
    var params = JSON.stringify({
        "idrecurso": 0
    });
    $("#cboRecursoModal").kendoDropDownList({
        filter: "contains",
        dataTextField: "descripcion",
        dataValueField: "idrecurso",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetRecurso",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function getRecursoLineCombo() {
    var params = JSON.stringify({
        "idrecurso": 0
    });
    $("#cboRecursoLineModal").kendoDropDownList({
        filter: "contains",
        dataTextField: "descripcion",
        dataValueField: "idrecurso",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetRecurso",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function getPresentacionRecursoCombo(recurso, idpresentacion) {
    var params = JSON.stringify({
        "idrecurso": recurso,
        "idpresentacion": idpresentacion
    });
    $("#cboPresentacionModal").kendoDropDownList({
        filter: "contains",
        dataTextField: "descripcion",
        dataValueField: "idpresentacionrecurso",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetPresentacionRecurso",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function getPresentacionRecursoLineCombo(recurso, idpresentacion) {
    var params = JSON.stringify({
        "idrecurso": recurso,
        "idpresentacion": idpresentacion
    });
    $("#cboPresentacionLineModal").kendoDropDownList({
        filter: "contains",
        dataTextField: "descripcion",
        dataValueField: "idpresentacionrecurso",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetPresentacionRecurso",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function getProveedoresCargaMasivaCombo() {
    $("#cboProveedorCargaMasiva").kendoDropDownList({
        filter: "contains",
        dataTextField: "RazonSocial",
        dataValueField: "idProveedor",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetProveedores",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function getProveedoresCombo() {
    $("#cboProveedorModal").kendoDropDownList({
        filter: "contains",
        dataTextField: "RazonSocial",
        dataValueField: "idProveedor",
        width: '350px',
        value: "",
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetProveedores",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            if (response.messageType != "OK")
                                showError(response.message);
                        },
                        error: function (response) {
                            showError(response);
                        }

                    });
                }
            }
        }
    });
}

function BuscarRecursoPresentacion()
{
    getRecursoProveedor($("#cboProveedorModal").val(),$("#cboRecursoModal").val(),$("#cboPresentacionModal").val(), 0);
}

function ChangeRecursoLineModal()
{
    getPresentacionRecursoLineCombo($("#cboRecursoLineModal").val());
}

function ChangeEstado() {
    if ($("#imgEstadoLineModal").attr('src') == "../Content/images/uncheck.png")
        $("#imgEstadoLineModal").attr("src", "../Content/images/check.png");
    else
        $("#imgEstadoLineModal").attr("src", "../Content/images/uncheck.png");
}

function GrabarProveedorrecursoId()
{
    var params = JSON.stringify({
        "idRecursoProveedor": $("#hdidproveedorrecurso").val(),
        "idrecurso": 0,
        "idpresentacionrecurso": 0,
        "idProveedor": 0,
        "valorUnitario": parseFloat($("#txtPrecioLineModal").val()),
        "activo": $("#imgEstadoLineModal").attr('src') == "../Content/images/uncheck.png" ? 0 : 1

    });
    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/ActualizarRecursoProveedor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        async: false,
        processData: false,
        cache: false,
        success: function (response) {
            $("#pages").append(response);
        },
        error: function (response) {
            showError(response);
        }
    });
}

function GrabarProveedorrecursoNuevo() {
    var params = JSON.stringify({
        "idRecursoProveedor": 0,
        "idrecurso": $("#cboRecursoLineModal").val(),
        "idpresentacionrecurso": $("#cboPresentacionLineModal").val(),
        "idProveedor": $("#hdProveedor").val(),
        "valorUnitario": parseFloat($("#txtPrecioLineModal").val()),
        "activo": $("#imgEstadoLineModal").attr('src') == "../Content/images/uncheck.png" ? 0 : 1

    });
    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/ActualizarRecursoProveedor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        async: false,
        processData: false,
        cache: false,
        success: function (response) {
            $("#pages").append(response);
        },
        error: function (response) {
            showError(response);
        }
    });
}

function AgregarRecursoProveedor()
{
    $('#RecursoModal').modal('show');

    $('#RecursoModal_header').empty();
    $('#RecursoModal_footer').empty();
    $('#RecursoModal_header').append(
    "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "&nbsp;<i class=\"fa fa-plus\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Agregar Item de Recurso</label>"
    );

    $('#divProveedorRecursoModal').empty();
    $('#divProveedorRecursoModal').append("<input type=\"hidden\" id=\"hdProveedor\" value=\"" + $('#cboProveedorModal').val() + "\"/>");
    /*
    $('#divProveedorRecursoModal').empty();
    $('#divProveedorRecursoModal').append("<div class=\"col-xs-12\">" +
    " <div class=\"input-group input-group-sm\">" +
    "  <span class=\"input-group-addon\" style=\"width:130px\">Proveedor</span>" +
    "  <input id=\"cboProveedorLineModal\" class=\"form-control input-sm text-uppercase\" style=\"width: 250px\" />" +
    " </div>" +
    "</div>");
    */
    $('#cboRecursoLineModal_section').empty();
    $('#cboRecursoLineModal_section').append(
        "<input id=\"cboRecursoLineModal\" class=\"form-control input-sm text-uppercase\" style=\"width: 250px\" onchange=\"ChangeRecursoLineModal();\" />"
    );

    $('#cboPresentacionLineModal_section').empty();
    $('#cboPresentacionLineModal_section').append(
        "<input id=\"cboPresentacionLineModal\" class=\"form-control input-sm text-uppercase\" style=\"width: 250px\" />"
    );

    $('#RecursoModal_footer').append(
        "<div class=\"col-xs-12 \">" +
        "<div class=\"col-xs-7\"></div>" +
        "<div class=\"col-xs-4 home-buttom\" onclick=\"GrabarProveedorrecursoNuevo(); return false;\">" +
        "    <center><i class=\"fa fa-save\">&nbsp;&nbsp;</i> Aceptar</center>" +
        "</div></div>"
    );
    $("#txtPrecioLineModal").mask("000,000.00", { reverse: true });
    $("#txtPrecioLineModal").val(parseFloat(0).toFixed(2));
    getRecursoLineCombo();
    getPresentacionRecursoLineCombo($("#cboRecursoLineModal").val());

}

function ModificarRecursoProveedor(idproveedorrecurso)
{

    $('#RecursoModal').modal('show');    
    
    $('#divProveedorRecursoModal').empty();
    $('#divProveedorRecursoModal').append("<input type=\"hidden\" id=\"hdProveedor\"/>");
    $('#divProveedorRecursoModal').append("<input type=\"hidden\" id=\"hdidproveedorrecurso\" value=\""+idproveedorrecurso+"\"/>");

    $('#RecursoModal_header').empty();
    $('#RecursoModal_footer').empty();
    $('#RecursoModal_header').append(
    "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
    "&nbsp;<i class=\"fa fa-pencil\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Modificar Item de Recurso</label>"
    );
    $('#cboRecursoLineModal_section').empty();
    $('#cboRecursoLineModal_section').append(
        "<input id=\"cboRecursoLineModal\" class=\"form-control input-sm text-uppercase\" style=\"width: 250px\" disabled />"
    );

    $('#cboPresentacionLineModal_section').empty();
    $('#cboPresentacionLineModal_section').append(
        "<input id=\"cboPresentacionLineModal\" class=\"form-control input-sm text-uppercase\" style=\"width: 250px\" disabled />"
    );

    $('#RecursoModal_footer').append(
        "<div class=\"col-xs-12 \">" +
        "<div class=\"col-xs-7\"></div>" +
        "<div class=\"col-xs-4 home-buttom\" onclick=\"GrabarProveedorrecursoId(); return false;\">" +
        "    <center><i class=\"fa fa-save\">&nbsp;&nbsp;</i> Aceptar</center>" +
        "</div></div>"
    );

    var params = JSON.stringify({
        "idproveedor": 0,
        "idrecurso": -1,
        "idpresentacion": 0,
        "idproveedorecurso": idproveedorrecurso

    });
    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/GetRecursoProveedor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        async: false,
        processData: false,
        cache: false,
        success: function (response) {
            if (response.messageType == "ERR")
                showError(response.message);
            else if (response.messageType == "OK") {
                if (response.rows.length > 0) {
                    $("#hdProveedor").val(response.rows[0].proveedor.idProveedor);
                    $("#cboRecursoLineModal").val(response.rows[0].presentacionrecurso.recurso.descripcion);
                    $("#cboPresentacionLineModal").val(response.rows[0].presentacionrecurso.descripcion);                
                    $("#txtPrecioLineModal").mask("000,000.00", { reverse: true });
                    $("#txtPrecioLineModal").val(parseFloat(response.rows[0].valorUnitario).toFixed(2));
                    $("#imgEstadoLineModal").attr("src", response.rows[0].Estado);
                }
                
                
            }
        },
        error: function (response) {
            showError(response);
        }
    });


}

function getRecursoProveedorGroup(idproveedor, idrecurso, idpresentacion, idrecursopresentacion) {

    $('#processingModal').modal('show');
    $("#gridListaModal").empty();
    var params = JSON.stringify({
        "idproveedor": idproveedor,
        "idrecurso": idrecurso,
        "idpresentacion": idpresentacion,
        "idrecursopresentacion": idrecursopresentacion

    });
    $("#gridListaModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetRecursoProveedor",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                        },
                        error: function (err) {
                            console.log(err);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20,
                group: {
                    field: "proveedor.RazonSocial",
                    dir: "asc"
                }
            }
        }
        ,
        height: 340,
        groupable: true,
        sortable: true,
        selectable: true,
        resizable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        group: { field: "proveedor.razonsocial" },
        rowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            "<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td><center><input type=\"image\" src=\"#: desactivo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"ModificarRecursoProveedor('#: idRecursoProveedor #');\" ><center><i class=\"fa fa-pencil\" aria-hidden=\"true\" >&nbsp;</i> Modificar</center></div></td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            "<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td><center><input type=\"image\" src=\"#: desactivo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"ModificarRecursoProveedor('#: idRecursoProveedor #');\" ><center><i class=\"fa fa-pencil\" aria-hidden=\"true\" >&nbsp;</i> Modificar</center></div></td>" +
            "</tr>",
        columns: [
        {
            field: "presentacionrecurso.codigo",
            title: "Código",
            width: 140
        },
        {
            field: "presentacionrecurso.recurso.descripcion",
            title: "Recurso"
        }, {
            field: "presentacionrecurso.descripcion",
            title: "Presentación",
            width: 190
        },
        {
            field: "valorUnitario",
            title: "Valor<br>Unitario",
            width: 80
        }, {
            field: "desactivo",
            title: "Activo",
            width: 80
        }, {
            title: "Acciones",
            width: 140
        }]
    });
    var grid = $('#gridListaModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}


function getRecursoProveedor(idproveedor, idrecurso, idpresentacion, idrecursopresentacion) {

    $('#processingModal').modal('show');
    $("#gridListaModal").empty();
    var params = JSON.stringify({
        "idproveedor": idproveedor,
        "idrecurso": idrecurso,
        "idpresentacion": idpresentacion,
        "idrecursopresentacion": idrecursopresentacion

    });
    $("#gridListaModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetRecursoProveedor",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                        },
                        error: function (err) {
                            console.log(err);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 340,
        groupable: false,
        sortable: true,
        selectable: true,
        resizable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        rowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            "<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td><center><input type=\"image\" src=\"#: desactivo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"ModificarRecursoProveedor('#: idRecursoProveedor #');\" ><center><i class=\"fa fa-pencil\" aria-hidden=\"true\" >&nbsp;</i> Modificar</center></div></td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            "<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td><center><input type=\"image\" src=\"#: desactivo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"ModificarRecursoProveedor('#: idRecursoProveedor #');\" ><center><i class=\"fa fa-pencil\" aria-hidden=\"true\" >&nbsp;</i> Modificar</center></div></td>" +
            "</tr>",
        columns: [
        {
            field: "presentacionrecurso.codigo",
            title: "Código",
            width: 140
        },
        {
            field: "presentacionrecurso.recurso.descripcion",
            title: "Recurso"
        }, {
            field: "presentacionrecurso.descripcion",
            title: "Presentación",
            width: 190
        },
        {
            field: "valorUnitario",
            title: "Valor<br>Unitario",
            width: 80
        }, {
            field: "desactivo",
            title: "Activo",
            width: 80
        }, {
            title: "Acciones",
            width: 140
        }]
    });
    var grid = $('#gridListaModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function GetRecursoProveedorTempCargaMasiva() {

    $('#processingModal').modal('show');

    $("#gridCargaMasivaModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetRecursoProveedorTempCargaMasiva",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                        },
                        error: function (err) {
                            console.log(err);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 340,
        groupable: false,
        sortable: true,
        selectable: true,
        resizable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        rowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            //"<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td>#: desactivo #</td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: presentacionrecurso.codigo #</td>" +
            //"<td>#: presentacionrecurso.recurso.descripcion #</td>" +
            "<td>#: presentacionrecurso.descripcion #</td>" +
            "<td>S/. #: parseFloat(valorUnitario).toFixed(2) #</td>" +
            "<td>#: desactivo #</td>" +
            "</tr>",
        columns: [
        {
            field: "presentacionrecurso.codigo",
            title: "Código",
            width: 140
        },
        {
            field: "presentacionrecurso.descripcion",
            title: "Recurso - Presentación",
            width: 190
        },
        {
            field: "valorUnitario",
            title: "Valor<br>Unitario",
            width: 80
        }, {
            field: "desactivo",
            title: "Resultado",
            width: 280
        }]
    });
    var grid = $('#gridCargaMasivaModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function getProveedores() {

    $('#processingModal').modal('show');

    var params = JSON.stringify({
        "tipodocumento": $("#TipoDocumentoSearch").val() || '',
        "nrodocumento": $("#txtNroDocumentoSearch").val() || '',
        "codigoProveedor": $("#txtCodigoProveedor").val() || '',
        "nombreProveedor": $("#txtNombreProveedor").val() || ''
    });
    $("#gridProveedor").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetProveedores_Busqueda",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                        },
                        error: function (err) {
                            console.log(err);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 340,
        groupable: false,
        sortable: true,
        selectable: true,
        resizable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        rowTemplate: "<tr>" +
            "<td>#: Codigo #</td>" +
            "<td>#: DesTipoDocumento #</td>" +
            "<td>#: Documento #</td>" +
            "<td>#: RazonSocial #</td>" +
            //"<td>#: Estado #</td>" +
            "<td><center><input type=\"image\" src=\"#: Estado #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerListaPreciosId('#: idProveedor #');\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Lista de Precios</center></div></td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: Codigo #</td>" +
            "<td>#: DesTipoDocumento #</td>" +
            "<td>#: Documento #</td>" +
            "<td>#: RazonSocial #</td>" +
            //"<td>#: Estado #</td>" +
            "<td><center><input type=\"image\" src=\"#: Estado #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"home-buttom\" style=\"margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerListaPreciosId('#: idProveedor #');\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Lista de Precios</center></div></td>" +
            "</tr>",
        columns: [
        {
            field: "Codigo",
            title: "Código",
            width: 120
        },
        {
            field: "DesTipoDocumento",
            title: "Tipo de Documento",
            width: 180
        }, {
            field: "Documento",
            title: "Nro Documento",
            width: 120
        },
        {
            field: "RazonSocial",
            title: "Razón Social",
        }, {
            field: "Estado",
            title: "Activo",
            width: 80
        }, {
            title: "Acciones",
            width: 220
        }, {
            field: "TipoDocumento",
            hidden: true
        }, {
            field: "Documento",
            hidden: true
        }, {
            field: "Telefono",
            hidden: true
        }, {
            field: "Contacto",
            hidden: true
        }]
    });
    var grid = $('#gridProveedor').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}