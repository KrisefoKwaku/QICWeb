(function ($, u) {

    $.notifyDefaults({
        allow_dismiss: true
    });
    var settings = {
        newest_on_top: true,
        mouse_over: "pause",
        delay: 8000,
        z_index: 5000000000
    };
    u.add({
        growl_info: function (msg) {
            settings.type = "info";
            const notify = $.notify({
                // option
                icon: "ion-information-circled",
                title: "<strong>Info: </strong>",
                message: msg
            }, settings);
            //notify.update()
        },
        growl_success: function (msg) {
            settings.type = "success";
            const notify = $.notify({
                // options
                icon: "ion-checkmark-round",
                title: "<strong>Success: </strong>",
                message: msg
            }, settings);
        },
        growl_warning: function (msg) {
            settings.type = "warning";
            const notify = $.notify({
                // options
                icon: "ion-alert",
                title: "<strong>Warning: </strong>",
                message: msg
            }, settings);
        },
        growl_error: function (msg) {
            settings.type = "danger";
            const notify = $.notify({
                // options
                icon: "ion-nuclear",
                title: "<strong>Error: </strong>",
                message: msg
            }, settings);
        }
    });
})(window.jQuery, window.utility);

