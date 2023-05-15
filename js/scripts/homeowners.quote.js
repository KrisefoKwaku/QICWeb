(function ($, s, u, $scope) {

    $(function () { 

        u.lovDropDown2("#COVER_CODE", "getHomeOwnerCovers", "FP01");

        $("#HomeQuoteForm input[name='START_DATE']").change(function () {
            $("#HomeQuoteForm input[name='END_DATE']").val(u.dateReverse(u.dateFastForward($(this).val(), 1, "year"), 1, "day"));
        });

        $("#COVER_CODE").on("change", function () {
            switch ($(this).val()) {
                case "HC01"://BUILDING
                    $("#CONTENT_SI").prop("readonly", "readonly");
                    $("#CONTENT_SI").removeAttr("required");
                    $("#CONTENT_SI").val("");
                    

                    $("#PA_SI").prop("readonly", "readonly");
                    $("#PA_SI").removeAttr("required");
                    $("#PA_SI").val("");

                    $("#PL_SI").prop("readonly", "readonly");
                    $("#PL_SI").removeAttr("required");
                    $("#PL_SI").val("");

                    $("#RENT_SI").prop("readonly", "readonly");
                    $("#RENT_SI").removeAttr("required");
                    $("#RENT_SI").val("");

                    $("#buildingValueDiv").addClass("required");
                    $("#contentValueDiv").removeClass("required");
                    $("#rentValueDiv").removeClass("required");
                    $("#plValueDiv").removeClass("required");
                    $("#paValueDiv").removeClass("required");

                    break;
                case "HC02"://BUILDING CONTENT
                    $("#CONTENT_SI").removeAttr("readonly");
                    $("#CONTENT_SI").prop("required", "required");

                    $("#PL_SI").prop("readonly", "readonly");
                    $("#PL_SI").removeAttr("required");
                    $("#PL_SI").val("");

                    $("#RENT_SI").prop("readonly", "readonly");
                    $("#RENT_SI").removeAttr("required");
                    $("#RENT_SI").val("");

                    $("#PA_SI").prop("readonly", "readonly");
                    $("#PA_SI").removeAttr("required");
                    $("#PA_SI").val("");

                    $("#buildingValueDiv").addClass("required");
                    $("#contentValueDiv").addClass("required");
                    $("#rentValueDiv").removeClass("required");
                    $("#plValueDiv").removeClass("required");
                    $("#paValueDiv").removeClass("required");
                    break;
                case "HC03"://CONTENT
                    $("#CONTENT_SI").removeAttr("readonly");
                    $("#CONTENT_SI").prop("required", "required");

                    $("#PL_SI").removeAttr("required");
                    $("#PL_SI").prop("readonly", "readonly");
                    $("#PL_SI").val("");

                    $("#RENT_SI").prop("readonly", "readonly");
                    $("#RENT_SI").removeAttr("required");
                    $("#RENT_SI").val("");

                    $("#PA_SI").prop("readonly", "readonly");
                    $("#PA_SI").removeAttr("required");
                    $("#PA_SI").val("");

                    $("#BUILDING_SI").prop("readonly", "readonly");
                    $("#BUILDING_SI").removeAttr("required");
                    $("#BUILDING_SI").val("");

                    $("#buildingValueDiv").removeClass("required");
                    $("#contentValueDiv").addClass("required");
                    $("#rentValueDiv").removeClass("required");
                    $("#plValueDiv").removeClass("required");
                    $("#paValueDiv").removeClass("required");
                    break;

                case "HC05": 
                    $("#CONTENT_SI").removeAttr("readonly");
                    $("#CONTENT_SI").prop("required", "required");

                    $("#BUILDING_SI").removeAttr("readonly");
                    $("#BUILDING_SI").prop("required", "required");

                    $("#RENT_SI").removeAttr("readonly");
                    $("#RENT_SI").prop("required", "required");

                    $("#PA_SI").removeAttr("readonly");
                    $("#PA_SI").prop("required", "required");

                    $("#PL_SI").removeAttr("readonly");
                    $("#PL_SI").prop("required", "required");

                    $("#buildingValueDiv").addClass("required");
                    $("#contentValueDiv").addClass("required");
                    $("#rentValueDiv").addClass("required");
                    $("#plValueDiv").addClass("required");
                    $("#paValueDiv").addClass("required");
                    break;
                
                default:
            }
        });

        $("#BUILDING_SI").blur(function () {
            $("#TOTAL_SI").val(
                
                parseFloat($("#BUILDING_SI").val() | 0) +
                parseFloat($("#CONTENT_SI").val()| 0) +
                parseFloat($("#PL_SI").val() | 0) +
                parseFloat($("#RENT_SI").val()| 0) +
                parseFloat($("#PA_SI").val() | 0));
        });

        $("#CONTENT_SI").blur(function () {
            $("#TOTAL_SI").val(
                parseFloat($("#BUILDING_SI").val() | 0) +
                parseFloat($("#CONTENT_SI").val()| 0) +
                parseFloat($("#PL_SI").val() | 0) +
                parseFloat($("#RENT_SI").val()| 0) +
                parseFloat($("#PA_SI").val() | 0));
        });
        $("#PL_SI").blur(function () {
            $("#TOTAL_SI").val(
                parseFloat($("#BUILDING_SI").val()| 0) +
                parseFloat($("#CONTENT_SI").val()| 0) +
                parseFloat($("#PL_SI").val() | 0) +
                parseFloat($("#RENT_SI").val()| 0) +
                parseFloat($("#PA_SI").val() | 0));
        });
        $("#RENT_SI").blur(function () {
            $("#TOTAL_SI").val(
                parseFloat($("#BUILDING_SI").val() | 0) +
                parseFloat($("#CONTENT_SI").val() | 0) +
                parseFloat($("#PL_SI").val() | 0) +
                parseFloat($("#RENT_SI").val() | 0) +
                parseFloat($("#PA_SI").val() | 0));
        });
        $("#PA_SI").blur(function () {
            $("#TOTAL_SI").val(
                parseFloat($("#BUILDING_SI").val()|0) +
                parseFloat($("#CONTENT_SI").val() | 0) +
                parseFloat($("#PL_SI").val() | 0) +
                parseFloat($("#RENT_SI").val()|0) +
                parseFloat($("#PA_SI").val() | 0)
                );
        });

        $("#submitHomeQuote").click(function(){

            if(!u.form_validation("#HomeQuoteForm"))
               return u.growl_info("All fields marked red (*) are required");

            var data = u.parse_form("#HomeQuoteForm");

            data["PLATFORM"] = "WEBSITE";

            data["START_DATE"] = u.dbDate(data["START_DATE"]);

            data["END_DATE"] = u.dbDate(data["END_DATE"]);

            data["STATUS"] = "U";

            $("#home-loader").css('display', 'block');

            s.getHomeQuote(data, function(response){

                $("#home-loader").css('display', 'none');

                if(!response.state)
                    return u.growl_error("Something went wrong. please try again");

                reset();

                $("#quoteModalTitle").append("Home Owners Quotation");

                $("#currency").append(data["CURRENCY_CODE"]);

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