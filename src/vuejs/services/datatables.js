
import Utils from "./utilService.js"

const gerarDataTables = function(url, columns, trataQuery = (query, d) => query){
    return jQuery.extend({}, {
        searching: true,
        lengthChange: false,
        order: [],
        columnDefs: [{ orderable: false, targets: "no-sort" }],
        ordering: true,
        processing: true,
        serverSide: true,
        columns: columns,
        ajax:  {
            url: API_URL + "api/" + url + "/pagination",
            type: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-XSRF-TOKEN", Utils.getCookie('XSRF-TOKEN'));
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: function ( d ) {
                return JSON.stringify(
                    trataQuery({
                        quantidade : d.length,
                        pagina : parseFloat((d.start / d.length) + 1).toFixed(0),
                        draw : d.draw,
                        orderBy : null,
                        orderByDirection : null,
                        search : d.search.value,
                        dados : {
                            where : { }
                        }
                    }, d)
                );
            }
        },
        language: {
            sEmptyTable: "Nenhum registro encontrado",
            sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
            sInfoFiltered: "(Filtrados de _MAX_ registros)",
            sInfoPostFix: "",
            sInfoThousands: ".",
            sLengthMenu: "_MENU_ Registros/Página",
            sLoadingRecords: "Carregando...",
            sProcessing: "Processando...",
            sZeroRecords: "Nenhum registro encontrado",
            sSearch: "",
            sSearchPlaceholder: "Pesquisar",
            oPaginate: {
                sNext: "Próximo",
                sPrevious: "Anterior",
                sFirst: "Primeiro",
                sLast: "Último"
            },
            oAria: {
                sSortAscending: ": Ordenar colunas de forma ascendente",
                sSortDescending: ": Ordenar colunas de forma descendente"
            }
        }
    })
};

export default {
    gerar : gerarDataTables
};