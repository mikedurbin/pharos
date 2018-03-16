function activate_tabs() {
    $('#inst_show_tabs li:first').addClass('active');
    $('div.tab-content div.tab-pane:first').addClass('active');
    $('#alert_index_tabs li:first').addClass('active');
};

function dropdown() {
    $('.dropdown-toggle').dropdown();
};

function fix_search_breadcrumb() {
    $("a.btn-sm").removeClass("dropdown-toggle");
    $("span.btn-sm").removeClass("btn-disabled");
}

function addClickFunctions() {
    var buttons = $("a.btn-sm.btn-default");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            var href = $(this).attr("href");
            window.location.assign(href);
        }
    }
}

function configureDropDownLists() {
    ddl1 = document.getElementById('object_type');
    ddl2 = document.getElementById('search_field');
    var io_options = ['Object Identifier', 'Alternate Identifier', 'Bagging Group Identifier', 'Bag Name', 'Title'];
    var gf_options = ['File Identifier', 'URI'];
    var event_options = ['Event Identifier', 'Object Identifier', 'File Identifier'];
    var wi_options = ['Object Identifier', 'File Identifier', 'Name', 'Etag'];
    var dpn_options = ['Item Identifier'];

    switch (ddl1.value) {
        case 'Intellectual Objects':
            ddl2.options.length = 0;
            for (i = 0; i < io_options.length; i++) {
                createOption(ddl2, io_options[i]);
            }
            break;
        case 'Generic Files':
            ddl2.options.length = 0;
            for (i = 0; i < gf_options.length; i++) {
                createOption(ddl2, gf_options[i]);
            }
            break;
        case 'Work Items':
            ddl2.options.length = 0;
            for (i = 0; i < wi_options.length; i++) {
                createOption(ddl2, wi_options[i]);
            }
            break;
        case 'Premis Events':
            ddl2.options.length = 0;
            for (i = 0; i < event_options.length; i++) {
                createOption(ddl2, event_options[i]);
            }
            break;
        case 'DPN Items':
            ddl2.options.length = 0;
            for (i = 0; i < dpn_options.length; i++) {
                createOption(ddl2, dpn_options[i]);
            }
            break;

    }

}

function createOption(ddl, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = value;
    ddl.options.add(opt);
}

function adjustSearchField(param) {
    ddl2 = document.getElementById('search_field');
    ddl2.value = param;
}

function selected (category, filter, newpath) {
    $("#filter-"+category+" ul li").remove();
    var parent = $("#"+category+"-parent")[0];
    $(parent).addClass("facet_limit-active");
    jQuery('<li/>').appendTo("#filter-"+category+" ul");
    jQuery('<span/>', {
        class: "facet-label"
    }).appendTo("#filter-"+category+" ul li");
    jQuery('<span/>', {
        class: "selected",
        text: filter
    }).appendTo("#filter-"+category+" ul li span");
    jQuery('<a/>', {
        class: "remove",
        href: newpath
    }).appendTo("#filter-"+category+" ul li span span");
    jQuery('<span/>', {
        class: "glyphicon glyphicon-remove"
    }).appendTo("#filter-"+category+" ul li span span a");
    $("#filter-title-"+category).click();
    $("#filter-"+category).addClass("in");
    $("#filter-title-"+category).removeClass("collapsed");
    $("."+category+"-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
}

function plotGraph (statistics_array) {
    var options = {
        grid: {
            margin: {
                right: 20,
                left: 70,
                bottom: 20
            }
        },
        xaxis: {
            mode: "time",
            timeformat: "%m/%d/%y",
            minTickSize: [1, "day"]
        }
    };
    $.plot("#stats_chart", [statistics_array], options);
}

function fixFilters() {
    $("#filter-access").on('shown.bs.collapse', function () {
        $(".access-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-access").on('hidden.bs.collapse', function () {
        $(".access-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-action").on('shown.bs.collapse', function () {
        $(".action-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-action").on('hidden.bs.collapse', function () {
        $(".action-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-event_type").on('shown.bs.collapse', function () {
        $(".event_type-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-event_type").on('hidden.bs.collapse', function () {
        $(".event_type-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-format").on('shown.bs.collapse', function () {
        $(".format-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-format").on('hidden.bs.collapse', function () {
        $(".format-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-institution").on('shown.bs.collapse', function () {
        $(".institution-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-institution").on('hidden.bs.collapse', function () {
        $(".institution-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-institution").on('shown.bs.collapse', function () {
        $(".institution-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-institution").on('hidden.bs.collapse', function () {
        $(".institution-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-outcome").on('shown.bs.collapse', function () {
        $(".outcome-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-outcome").on('hidden.bs.collapse', function () {
        $(".outcome-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-stage").on('shown.bs.collapse', function () {
        $(".stage-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-stage").on('hidden.bs.collapse', function () {
        $(".stage-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-status").on('shown.bs.collapse', function () {
        $(".status-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-status").on('hidden.bs.collapse', function () {
        $(".status-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-node").on('shown.bs.collapse', function () {
        $(".node-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-node").on('hidden.bs.collapse', function () {
        $(".node-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

    $("#filter-queued").on('shown.bs.collapse', function () {
        $(".queued-carat").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });
    $("#filter-queued").on('hidden.bs.collapse', function () {
        $(".queued-carat").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });
}

function restoreRequeue(){
   $('#restore_form').removeClass('hidden');
   $('#restore_form_submit').on("click", function() {
       if ($('#state_item').is(':checked')) {
           var checked = 'true';
       } else {
           var checked = 'false';
       }
       var id = $('#work_item_id').text();
       $.get('/items/'+id+'/requeue', {delete_state_item: checked},
           function(data) {
               alert('Item has been requeued.');
           });
   });
   $('#restore_form_cancel').on("click", function() {
        $('#restore_form').addClass('hidden');
   });
}

function ingestRequeue(){
    $('#ingest_form').removeClass('hidden');
    $('#ingest_form_submit').on("click", function() {
        var stage = $('input[name="stage"]:checked').val();
        if (stage == "Fetch" || stage == "Store" || stage == "Record") {
            if (!$('#ingest_error').hasClass('hidden')) {
                $('#ingest_error').addClass('hidden');
            }
            var id = $('#work_item_id').text();
            $.get('/items/'+id+'/requeue', {item_stage: stage},
                function(data) {
                    alert('Item has been requeued.');
                });
        } else {
            $('#ingest_error').removeClass('hidden');
        }
    });
    $('#ingest_form_cancel').on("click", function() {
        $('#ingest_form').addClass('hidden');
    });
}

function dpnRequeue() {
    $('#dpn_form').removeClass('hidden');
    $('#dpn_form_submit').on("click", function () {
        var stage = $('input[name="stage"]:checked').val();
        if (stage == "Package" || stage == "Store" || stage == "Record") {
            if (!$('#ingest_error').hasClass('hidden')) {
                $('#ingest_error').addClass('hidden');
            }
            var id = $('#work_item_id').text();
            $.get('/items/' + id + '/requeue', {item_stage: stage},
                function (data) {
                    alert('Item has been requeued.');
                });
        } else {
            $('#dpn_error').removeClass('hidden');
        }
    });
    $('#dpn_form_cancel').on("click", function () {
        $('#dpn_form').addClass('hidden');
    });
}

function dpnItemRequeue() {
    $('#dpn_item_form').removeClass('hidden');
    $('#dpn_item_form_submit').on("click", function () {
        if ($('#dpn_state_item').is(':checked')) {
            var checked = 'true';
        } else {
            var checked = 'false';
        }
        var task = $('input[name="task"]:checked').val();
        if (task == "copy" || task == "validation" || task == "store" || task == 'package' || task == 'record') {
            if (!$('#dpn_item_error').hasClass('hidden')) {
                $('#dpn_item_error').addClass('hidden');
            }
            var id = $('#dpn_item_id').text();
            $.get('/dpn_items/' + id + '/requeue', {task: task, delete_state_item: checked},
                function (data) {
                    alert('DPN Item has been requeued.');
                });
        } else {
            $('#dpn_item_error').removeClass('hidden');
        }
    });
    $('#dpn_item_form_cancel').on("click", function () {
        $('#dpn_item_form').addClass('hidden');
    });
}

function tabbed_nav(controller) {
    switch (controller) {
        case 'institutions':
            $('#inst_tab').addClass('active');
            break;
        case 'intellectual_objects':
            $('#io_tab').addClass('active');
            break;
        case 'generic_files':
            $('#gf_tab').addClass('active');
            break;
        case 'work_items':
            $('#wi_tab').addClass('active');
            break;
        case 'premis_events':
            $('#pe_tab').addClass('active');
            break;
        case 'dpn_work_items':
            $('#dpn_tab').addClass('active');
            break;
        case 'reports':
            $('#rep_tab').addClass('active');
            break;
        case 'alerts':
            $('#alert_tab').addClass('active');
            break;
        case 'dpn_bags':
            $('#dpn_bag_tab').addClass('active');
            break;
    }
}

function report_nav(type) {
    switch (type) {
        case 'general':
            $('#general_tab').addClass('active');
            break;
        case 'subscriber':
            $('#subscribers_tab').addClass('active');
            break;
        case 'cost':
            $('#cost_tab').addClass('active');
            break;
        case 'timeline':
            $('#timeline_tab').addClass('active');
            break;
        case 'mimetype':
            $('#mimetype_tab').addClass('active');
            break;
        case 'breakdown':
            $('#breakdown_tab').addClass('active');
            break;
    }
}

function timeline_graph(labels, data) {
    var ctx = document.getElementById("indiv_timeline_chart").getContext('2d');
    var colors = palette('rainbow', data.length, 0, .5, 1).map(function(hex) {
        return '#' + hex;
    });
    var dark_colors = palette('rainbow', data.length, 0, 1, .5).map(function(hex) {
        return '#' + hex;
    });
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Data Stored in Bytes',
                data: data,
                backgroundColor: colors,
                borderColor: dark_colors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function individual_mimetype(stats) {
    var ctx = document.getElementById("indiv_mimetype_chart").getContext('2d');
    var labels_array = [];
    var data_array = [] ;
    Object.keys(stats).forEach(function (key) {
        var value = stats[key];
        labels_array.push(key);
        data_array.push(value)
    });
    var init_colors = palette('rainbow', data_array.length, 0, .6, .7).map(function(hex) {
        return '#' + hex;
    });
    var init_dark_colors = palette('rainbow', data_array.length, 0, 1, .5).map(function(hex) {
        return '#' + hex;
    });
    var new_colors = shuffleArray(init_colors, init_dark_colors);
    var colors = new_colors[0];
    var dark_colors = new_colors[1];
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: labels_array,
            datasets: [{
                data: data_array,
                label: 'Mimetype Usage',
                backgroundColor: colors,
                borderColor: dark_colors,
                borderWidth: .5
            }]
        },
        options: {
            cutoutPercentage: 0,
            rotation: -0.5 * Math.PI,
            circumference: 2 * Math.PI,
            animation: {
                animateRotate: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

function shuffleArray(array_one, array_two) {
    var color_array = [];
    for (var i = array_one.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp_one = array_one[i];
        array_one[i] = array_one[j];
        array_one[j] = temp_one;
        var temp_two = array_two[i];
        array_two[i] = array_two[j];
        array_two[j] = temp_two;
    }
    color_array.push(array_one);
    color_array.push(array_two);
    return color_array
}

$(document).ready(function(){
    fixFilters();
    activate_tabs();
    dropdown();
    fix_search_breadcrumb();
    addClickFunctions();
});