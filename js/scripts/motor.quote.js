(function ($, s, u, $scope) {

    $(function () { 

        u.set_datepicker_noback(".no-back-date");
        //u.set_datepicker(".no-back-date");

        u.set_datepicker(".back-date");

        u.lovDropDown2(".currency", "getCurencyLov");

        u.lovDropDown2("#MOTOR_PRODUCT", "getMotorProductLov");

        $("#MOTOR_PRODUCT").change(function () {
            if (!u.field_empty("#MOTOR_PRODUCT")) {
                $("#RISK_TYPE .removable").remove();
           
                u.lovDropDown("#RISK_TYPE", "getRiskLov", $("#MOTOR_PRODUCT").val());
            }

            switch ($(this).val()) {
                case "MP01":
                    $("#VEHICAL_VAL").removeAttr("disabled");
                    $("#VEHICAL_VAL").prop("required", "required");

                    $("#BUY_BACK_EXCESS").removeAttr("disabled");
                    $("#BUY_BACK_EXCESS").prop("required", "required");

                    $("#vehicleValDiv").addClass("required");
                    $("#excessDiv").addClass("required");
                    break;
                case "MP02":

                    $("#VEHICAL_VAL").prop("disabled", "disabled");
                    $("#VEHICAL_VAL").removeAttr("required");
                    $("#VEHICAL_VAL").val("");

                    $("#BUY_BACK_EXCESS").prop("disabled", "disabled");
                    $("#BUY_BACK_EXCESS").removeAttr("required");
                    $("#VEHICAL_VAL").val("");

                    $("#vehicleValDiv").removeClass("required");
                    $("#excessDiv").removeClass("required");
                    break;
                case "MP03":
                    $("#VEHICAL_VAL").removeAttr("disabled");
                    $("#VEHICAL_VAL").prop("required", "required");

                    $("#BUY_BACK_EXCESS").removeAttr("disabled");
                    $("#BUY_BACK_EXCESS").prop("required", "required");

                    $("#vehicleValDiv").addClass("required");
                    $("#excessDiv").addClass("required");
                    break;
                default:
            }
            
        });

        var year = parseInt(u.getYear(u.get_datetime()));

        for (var i = year; i >= 1945; i--) {
            $("#YEAR_MANUFACTURE").append(`<option value='${i}'>${i}</option>`);
        }

        for (var i = year; i >= 2000; i--) {
            $("#REGISTRATION_YEAR").append(`<option value='${i}'>${i}</option>`);
        }

        $("#ADDITIONAL_TTPD_YN").on("change", function () {
            if ($(this).val() === "Y") {
                $("#ADDITIONAL_TTP").val("");
                $("#ADDITIONAL_TTP").removeAttr("disabled");
                $("#ADDITIONAL_TTP").removeAttr("readonly");
                $("#ADDITIONAL_TTP").prop("required", "required");
                $("#tppdAmountDiv").addClass("required");
            } else {
                $("#ADDITIONAL_TTP").prop("disabled", "disabled");
                $("#ADDITIONAL_TTP").removeAttr("required");
                $("#tppdAmountDiv").removeClass("required");
            }
        });

        $("#MotorQuoteForm input[name='START_DATE']").change(function () {
            $("#MotorQuoteForm input[name='END_DATE']").val(u.dateReverse(u.dateFastForward($(this).val(), 1, "year"), 1, "day"));
        });

        $("#submitMotorQuote").click(function(){

            if(!u.form_validation("#MotorQuoteForm"))
               return u.growl_info("All fields marked red (*) are required");

            var data = u.parse_form("#MotorQuoteForm");

            data["PLATFORM"] = "WEBSITE";

            data["STATUS"] = "U";

            data["START_DATE"] = u.dbDate(data["START_DATE"]);

            data["END_DATE"] = u.dbDate(data["END_DATE"]);

            $("#motor-loader").css('display', 'block');

            s.getMotorQuote(data, function(response){

                $("#motor-loader").css('display', 'none');

                if(!response.state)
                    return u.growl_error("Something went wrong. please try again");

                reset();

                $("#quoteModalTitle").append("Motor Quotation");

                $("#currency").append(data["CURRENCY"]);

                $("#quotePremium").append((response.data.NetPremFC || 0).toFixed(2));

                $("#PremiumQuoteModal").css('display', 'flex');

                $("#PremiumQuoteModal").css('opacity', '100');

            });

        });

        $(".close-overlay").click(function(){

            $("#PremiumQuoteModal").css('display', 'none');
        });

        function reset(){

            $("#quoteModalTitle").empty();

            $("#currency").empty();

            $("#quotePremium").empty();

        };

    });//end of document ready

})(window.jQuery, window.service, window.utility, {});