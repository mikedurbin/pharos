function activate_tabs() {
    $('#inst_show_tabs li:first').addClass('active');
    $('div.tab-content div.tab-pane:first').addClass('active');
    $('#alert_index_tabs li:first').addClass('active');
}

function dropdown() {
    $('.dropdown-toggle').dropdown();
}

function fix_search_breadcrumb() {
    $("a.btn-sm").removeClass("dropdown-toggle");
    $("span.btn-sm").removeClass("btn-disabled");
}

function addClickFunctions() {
    var buttons = $("a.btn-sm.btn-default");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = makeButtonClickFunction(buttons[i])
    }
}

function makeButtonClickFunction(button) {
    return function () {
        var href = $(button).attr("href");
        window.location.assign(href);
    };
}

function configureDropDownLists() {
    var ddl1 = document.getElementById('object_type');
    var ddl2 = document.getElementById('search_field');
    var io_options = ['Object Identifier', 'Alternate Identifier', 'Bagging Group Identifier', 'Bag Name', 'Title'];
    var gf_options = ['File Identifier', 'URI'];
    var event_options = ['Event Identifier', 'Object Identifier', 'File Identifier'];
    var wi_options = ['Object Identifier', 'File Identifier', 'Name', 'Etag'];
    var dpn_options = ['Item Identifier'];
    var listSwitch = {
        "Intellectual Objects": function () { createOptionList(ddl2, io_options) },
        "Generic Files": function () { createOptionList(ddl2, gf_options) },
        "Work Items": function () { createOptionList(ddl2, wi_options) },
        "Premis Events": function () { createOptionList(ddl2, event_options) },
        "DPN Items": function () { createOptionList(ddl2, dpn_options) }
    };
    listSwitch[ddl1.value]();
}

function createOptionList(ddl, option_list) {
    ddl.options.length = 0;
    for (var i = 0; i < option_list.length; i++) {
        createOption(ddl, option_list[i]);
    }
}

function createOption(ddl, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = value;
    ddl.options.add(opt);
}

function adjustSearchField(param) {
    var ddl2 = document.getElementById('search_field');
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

function tabbed_nav(controller) {
    var controllerSwitch = {
        "institutions": function () { activateNavTab('inst_tab') },
        "intellectual_objects": function () { activateNavTab('io_tab') },
        "generic_files": function () { activateNavTab('gf_tab') },
        "work_items": function () { activateNavTab('wi_tab') },
        "premis_events": function () { activateNavTab('pe_tab') },
        "dpn_work_items": function () { activateNavTab('dpn_tab') },
        "reports": function () { activateNavTab('rep_tab') },
        "alerts": function () { activateNavTab('alert_tab') },
        "dpn_bags": function () { activateNavTab('dpn_bag_tab') }
    };
    controllerSwitch[controller]();
}

function report_nav(type) {
    var reportTypeSwitch = {
        "general": function () { activateNavTab('general_tab') },
        "subscriber": function () { activateNavTab('subscribers_tab') },
        "cost": function () { activateNavTab('cost_tab') },
        "timeline": function () { activateNavTab('timeline_tab') },
        "mimetype": function () { activateNavTab('mimetype_tab') },
        "breakdown": function () { activateNavTab('breakdown_tab') }
    };
    reportTypeSwitch[type]();
}

function activateNavTab(id) {
    $('#'+id).addClass('active');
}

$(document).ready(function(){
    fixFilters();
    activate_tabs();
    dropdown();
    fix_search_breadcrumb();
    addClickFunctions();
});