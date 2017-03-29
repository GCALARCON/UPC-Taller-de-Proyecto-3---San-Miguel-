$(document).ready(function () {
    cargarProveedores();
    getEvaluaciones(0);
});

function cargarProveedores() {
    var params = JSON.stringify({
        "idProveedor": 0
    });
    $("#txtProveedor").kendoDropDownList({
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
                        url: wsnode + "wsCompras.svc/GetProveedorListado",
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

function getEvaluaciones(idEvaluacionProveedor) {
    $('#processingModal').modal('show');

    var params = JSON.stringify({
        "idevaluacionproveedor": idEvaluacionProveedor,
        "nroevaluacion": $("#txtNroEvaluacion").val() || '',
        "periodo": $("#txtPeriodo").val() || '',
        "proveedor": $("#txtProveedor").val(),
        "calificado": $("#CalificadoSearch").val() || ''
    });
    $("#gridEvaluacion").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetEvaluaciones_Busqueda",
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
            "<td>#: NroEvaluacion #</td>" +
            "<td>#: Proveedor.RazonSocial #</td>" +
            "<td>#: Periodo #</td>" +            
            "<td><center><input type=\"image\" src=\"#: Calificado #\" style=\"width:17px\" /></center></td>" +
            "<td><center><input type=\"image\" src=\"#: RutaVigenteXPeriodo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"SetVerEvaluacionId('#: idEvaluacionProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver</center></div></td>" +            
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: NroEvaluacion #</td>" +
            "<td>#: Proveedor.RazonSocial #</td>" +
            "<td>#: Periodo #</td>" +
            "<td><center><input type=\"image\" src=\"#: Calificado #\" style=\"width:17px\" /></center></td>" +
            "<td><center><input type=\"image\" src=\"#: RutaVigenteXPeriodo #\" style=\"width:17px\" /></center></td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"SetVerEvaluacionId('#: idEvaluacionProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver</center></div></td>" +
            "</tr>",
        columns: [
        {
            field: "NroEvaluacion",
            title: "Nro Evaluacion",
            width: 120
        },
        {
            field: "Proveedor",
            title: "Proveedor",            
        }, {
            field: "Periodo",
            title: "Periodo",
            width: 120
        },
        {
            field: "Calificado",
            title: "Calificado",
            width: 120
        }, {
            field: "VigenteXPeriodo",
            title: "VigenteXPeriodo",
            width: 120
        }, {
            title: "Acciones",
            width: 160
        }
        ]
    });
    var grid = $('#gridEvaluacion').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function SetVerEvaluacionId(idEvaluacionProveedor) {
    $('#EvaluacionModal').modal("show");
    //Clean
    $('#EvaluacionModal_header').empty();
    $('#EvaluacionModal_footer').empty();
        
    $("#txtNroEvaluacionModal").prop('disabled', true);
    $("#txtFechaModal").mask('00/00/0000');
    $("#txtFechaModal").prop('disabled', true);
    $("#imgVigenteModal").prop('disabled', true);
    $("#txtPuntajeInicialModal").prop('disabled', true);
    $("#txtProveedorModal").prop('disabled', true);
    $("#txtPeriodoModal").prop('disabled', true);
    $("#imgCalificadoModal").prop('disabled', true);    
    $("#txtPuntajeOrdenesModal").prop('disabled', true);
    $("#txtPuntajeIncidenciasModal").prop('disabled', true);
    $("#txtPuntajeTotalModal").prop('disabled', true);
    

    //Add Controls
    $('#EvaluacionModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-pencil\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Ver Detalle de Evaluación de Proveedor</label>"
    );

    var params = JSON.stringify({
        "idevaluacionproveedor": idEvaluacionProveedor,
        "nroevaluacion": '',
        "periodo": '',
        "proveedor": 0,
        "calificado": 0
    });

    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/GetEvaluaciones_Busqueda",
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
                $("#txtNroEvaluacionModal").val(response.rows[0].NroEvaluacion);
                $("#txtFechaModal").val(response.rows[0].Fecha);
                $("#imgVigenteModal").attr("src", response.rows[0].RutaVigenteXPeriodo);                
                $("#txtProveedorModal").val(response.rows[0].Proveedor.RazonSocial);
                $("#txtPeriodoModal").val(response.rows[0].Periodo);
                $("#imgCalificadoModal").attr("src", response.rows[0].Calificado);
                
                $("#txtPuntajeOrdenesModal").val(response.rows[0].PuntajeOrdenes);
                $("#txtPuntajeIncidenciasModal").val(response.rows[0].PuntajeIncidencias);
                $("#txtPuntajeTotalModal").val(response.rows[0].Puntaje);

                VerDetalleOrdenes('GetDetalleOrdenesEvaluacion', idEvaluacionProveedor);
                VerDetalleIncidencias('GetDetalleIncidenciasEvaluacion', idEvaluacionProveedor);

            }
        },
        error: function (response) {
            showError(response);
        }
    });
}

function VerDetalleOrdenes(accion, idEvaluacionProveedor) {
    var params = JSON.stringify({
        "idevaluacionproveedor": idEvaluacionProveedor
    });

    $("#gridOrdenesModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/" + accion,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                            if (response.messageType != "OK")
                                showError(response.message);
                            else {
                                $('#pages').append(response.message)
                            }
                        },
                        error: function (response) {
                            showError(response);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 220,
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
            "<td>#: NroOrdenCompra #</td>" +
            "<td>#: Fecha #</td>" +
            "<td>#: Credito #</td>" +
            "<td>#: DiasCredito #</td>" +
            "<td>#: Puntaje #</td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: NroOrdenCompra #</td>" +
            "<td>#: Fecha #</td>" +
            "<td>#: Credito #</td>" +
            "<td>#: DiasCredito #</td>" +
            "<td>#: Puntaje #</td>" +
            "</tr>",
        columns: [
        {
            title: "Nro Orden",
            width: 140
        },
        {
            title: "Fecha Registro",
            width: 200
        }, {
            title: "Término de Pago",
            width: 200
        },
        {
            title: "Días Crédito",
            width: 80
        },
        {
            title: "Puntaje",
            width: 80
        },
        ]
    });
    var grid = $('#gridOrdenesModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function VerDetalleOrdenesOC(periodo, idProveedor) {



    $('#VerOCModal').modal("show");

    $('#VerOCModal_header').empty();
    $('#VerOCModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-plus\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Detalle de Órdenes de compra de Proveedor </label>"
    );

    var params = JSON.stringify({
        "periodo": periodo,
        "idProveedor": idProveedor
    });

    $("#gridOCModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetOrdenCompraxProveedor",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                            if (response.messageType != "OK")
                                showError(response.message);
                            else {
                                $('#pages').append(response.message)
                            }
                        },
                        error: function (response) {
                            showError(response);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 220,
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
            "<td>#: NroOrdenCompra #</td>" +
            "<td>#= kendo.toString(kendo.parseDate(Fecha, 'dd-MM-yyyy'), 'dd/MM/yyyy') #</td>" +
            "<td>#: TerminoPago #</td>" +
            "<td>#: DiasCredito #</td>" +
            "<td>#: Puntos #</td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: NroOrdenCompra #</td>" +
            "<td>#= kendo.toString(kendo.parseDate(Fecha, 'dd-MM-yyyy'), 'dd/MM/yyyy') #</td>" +
            "<td>#: TerminoPago #</td>" +
            "<td>#: DiasCredito #</td>" +
            "<td>#: Puntos #</td>" +
            "</tr>",
        columns: [
        {
            title: "Nro Orden",
            width: 140
        },
        {
            title: "Fecha Registro",
            width: 200
        }, {
            title: "Término de Pago",
            width: 200
        },
        {
            title: "Días Crédito",
            width: 80
        },
        {
            title: "Puntos",
            width: 80
        },
        ]
    });
    var grid = $('#gridOCModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function VerDetalleIncidencias(accion, idEvaluacionProveedor) {
    var params = JSON.stringify({
        "idevaluacionproveedor": idEvaluacionProveedor
    });

    $("#gridIncidenciasModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/" + accion,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                            if (response.messageType != "OK")
                                showError(response.message);
                            else {
                                $('#pages').append(response.message)
                            }
                        },
                        error: function (response) {
                            showError(response);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 220,
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
            "<td>#: NroIncidenciaProveedor #</td>" +
            "<td>#: Fecha #</td>" +
            "<td>#: Descripcion #</td>" +
            "<td>#: Gravedad #</td>" +
            "<td>#: Penalidad #</td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: NroIncidenciaProveedor #</td>" +
            "<td>#: Fecha #</td>" +
            "<td>#: Descripcion #</td>" +
            "<td>#: Gravedad #</td>" +
            "<td>#: Penalidad #</td>" +
            "</tr>",
        columns: [
        {
            title: "Nro Incidencia",
            width: 140
        },
        {
            title: "Fecha Registro",
            width: 200
        }, {
            title: "Descripción",
            width: 200
        },
        {
            title: "Gravedad",
            width: 80
        },
        {
            title: "Penalidad",
            width: 80
        },
        ]
    });
    var grid = $('#gridIncidenciasModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function guardar() {
    var params = JSON.stringify({
        "periodo": $("#txtPeriodoGeneradorModal").val() || ''
    });
    $.ajax({
        type: "POST",
        url: wsnode + "wsCompras.svc/GuardarEvaluacion",
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

function VerDetalleIncidenciasG(periodo, idProveedor) {

    $('#VerIPModal_header').empty();
    $('#VerIPModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-plus\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Detalle de Incidencias de Proveedor </label>"
    );

    $('#VerIPModal').modal("show");
    var params = JSON.stringify({
        "periodo" : periodo,
        "idProveedor": idProveedor
    });

    $("#gridIPModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/GetIncidenciaxProveedor",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                            if (response.messageType != "OK")
                                showError(response.message);
                            else {
                                $('#pages').append(response.message)
                            }
                        },
                        error: function (response) {
                            showError(response);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 220,
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
            "<td>#: NroIncidenciaProveedor #</td>" +
            "<td>#= kendo.toString(kendo.parseDate(Fecha, 'dd-MM-yyyy'), 'dd/MM/yyyy') #</td>" +
            "<td>#: Descripcion #</td>" +
            "<td>#: desGravedad #</td>" +
            "<td>#: Penalidad #</td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: NroIncidenciaProveedor #</td>" +
            "<td>#= kendo.toString(kendo.parseDate(Fecha, 'dd-MM-yyyy'), 'dd/MM/yyyy') #</td>" +
            "<td>#: Descripcion #</td>" +
            "<td>#: desGravedad #</td>" +
            "<td>#: Penalidad #</td>" +
            "</tr>",
        columns: [
        {
            title: "Nro Incidencia",
            width: 140
        },
        {
            title: "Fecha Registro",
            width: 200
        }, {
            title: "Descripción",
            width: 200
        },
        {
            title: "Gravedad",
            width: 80
        },
        {
            title: "Penalidad",
            width: 80
        },
        ]
    });
    var grid = $('#gridIPModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function generaEvaluacion() {
    var params = JSON.stringify({
        "periodo": $("#txtPeriodoGeneradorModal").val()
    });

    $("#gridEvaluacionesModal").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: wsnode + "wsCompras.svc/Genera_Evaluacion",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: params,
                        async: false,
                        processData: false,
                        cache: false,
                        success: function (response) {
                            options.success(response.rows);
                            $('#processingModal').modal('hide');
                            if (response.messageType != "OK")
                                showError(response.message);
                            else {
                                $('#pages').append(response.message)
                            }
                        },
                        error: function (response) {
                            showError(response);
                            $('#processingModal').modal('hide');
                        }

                    });
                },
                pageSize: 20
            }
        }
        ,
        height: 220,
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
            "<td>#: RazonSocial #</td>" +
            "<td>#: PuntTerPago #</td>" +
            "<td>#: PuntIncidencia #</td>" +
            "<td>#: PuntajeTotal #</td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerDetalleOrdenesOC('#: Periodo #','#: idProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Órdenes </center></div></td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerDetalleIncidenciasG('#: Periodo #','#: idProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Incidencias</center></div></td>" +
            "</tr>",
        altRowTemplate: "<tr>" +
            "<td>#: RazonSocial #</td>" +
            "<td>#: PuntTerPago #</td>" +
            "<td>#: PuntIncidencia #</td>" +
            "<td>#: PuntajeTotal #</td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerDetalleOrdenesOC('#: Periodo #','#: idProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Órdenes</center></div></td>" +
            "<td><div class=\"col-xs-5 home-buttom\" style=\"width:70px;margin-right:3px;height:auto !important;height: 40px;\" onclick=\"VerDetalleIncidenciasG('#: Periodo #','#: idProveedor #');return false;\" ><center><i class=\"fa fa-eye\" aria-hidden=\"true\" >&nbsp;</i> Ver Incidencias</center></div></td>" +
            "</tr>",
        columns: [
        {
            title: "Proveedor",
            width: 140
        },
        {
            title: "Puntaje Ter. Pago",
            width: 200
        }, {
            title: "Puntaje Incidencia",
            width: 200
        },
        {
            title: "Puntaje Total",
            width: 80
        }, {
            title: "",
            width: 80
        }, {
            title: "",
            width: 80
        },
        ]
    });

    var grid = $('#gridEvaluacionesModal').data('kendoGrid');
    grid.dataSource.pageSize(10);
    grid.dataSource.page(1);
    grid.dataSource.read();
}

function generarEvaluaciones() {
    $('#GeneradorModal').modal("show");

    //Clean
    $('#GeneradorModal_header').empty();
    $('#GeneradorModal_footer').empty();

    var fecha = new Date();
    var mes
    if (fecha.getMonth() <= 9) {
        mes = '0' + fecha.getMonth();
    } else {
        mes = fecha.getMonth();
    }

    $("#txtPeriodoGeneradorModal").val(fecha.getFullYear() + "-" + mes);
    
    $("#txtPeriodoGeneradorModal").prop('disabled', true);
    
    //Add Controls
    $('#GeneradorModal_header').append(
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>" +
        "&nbsp;<i class=\"fa fa-plus\">&nbsp;&nbsp;</i><label class=\"label-md modal-title custom_align\"> Generador de evaluaciones</label>"
    );

    //Add Controls
    $('#GeneradorModal_footer').append(
        "<div class=\"col-xs-12 \">" +
        "<div class=\"col-xs-8\"></div>" +
        "<div class=\"col-xs-2 home-buttom\" style=\"display:block;\" onclick=\"guardar(); return false;\">" +
        "    <center><i class=\"fa fa-save\">&nbsp;&nbsp;</i> Guardar</center>" +
        "</div>" +
        "</div>"
    );
    guardar
    generaEvaluacion();

    //$.ajax({
    //    type: "POST",
    //    url: wsnode + "wsCompras.svc/GetEvaluaciones",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    async: false,
    //    processData: false,
    //    cache: false,
    //    success: function (response) {
    //        $("#pages").append(response);
    //    },
    //    error: function (response) {
    //        showError(response);
    //    }
    //});    
}