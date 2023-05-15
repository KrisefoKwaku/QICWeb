(function($, u) {
    u.add({
        set_datepicker: function(selector) {
            //$(selector).datepicker();

            $(selector).datetimepicker({
                format: "dd/mm/yyyy",
                autoclose: true,
                minView : 2,
                templates: {
                    leftArrow: "fa fa-chevron-circle-left",
                    rightArrow: "fa fa-chevron-circle-right"
                },
                fontAwesome: true
            });
        },
        set_datepicker_noback: function(selector) {
            $(selector).datetimepicker({
                format: "dd/mm/yyyy",
                startDate: new Date(),
                autoclose: true,
                fontAwesome: true,
                minView : 2,
                templates: {
                    leftArrow: "fa fa-chevron-circle-left",
                    rightArrow: "fa fa-chevron-circle-right"
                }
            });
        }
    })
})(window.jQuery, window.utility)