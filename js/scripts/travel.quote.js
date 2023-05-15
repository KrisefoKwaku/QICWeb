(function ($, s, u, $scope) {

    $(function () { 

        u.set_datepicker(".date");

        u.lovDropDown2("#TRAVEL_TYPE", "travlCategoryLov");

        u.lovDropDown2("#DESTINATION_TYPE", "destinationLov", null, function (result) { $scope.destination_types = result });

        $("#dependentsYn").change(function(){

            switch($(this).val()){

                case "Y":
                    $("#DEP_NUM").val("");
                    $("#DEP_NUM").prop("readonly", false);
                    break;
                    
                case "N":
                    $("#DEP_NUM").val(0);
                    $("#DEP_NUM").attr("readonly", "readonly");
                    break;

            }

        });

        $("#DOB").change(function () {


            if (u.totalYears(u.get_date(), $(this).val()) > 80) {
                u.growl_info("Sorry your age is not allowed to buy travel policies online, please contact our offices for support");
                $(this).val("");
                $("#AGE").val(0);
                return u.set_invalid_higlight();
            }

            $("#AGE").val(u.totalYears(u.get_date(), $(this).val()));

        });

        $("#submitTravelQuote").click(function(){

            if(!u.form_validation("#TravelQuoteForm"))
               return u.growl_info("All fields marked red (*) are required");

            var data = u.parse_form("#TravelQuoteForm");

            data["PLATFORM"] = "WEBSITE";

            data["START_DATE"] = u.dbDate(data["START_DATE"]);

            data["END_DATE"] = u.dbDate(data["END_DATE"]);

            data["STATUS"] = "U";

            $("#travel-loader").css('display', 'block');

            s.getTravelQuote(data, function(response){

                $("#travel-loader").css('display', 'none');

                if(!response.state)
                    return u.growl_error(response.message ?? "Something went wrong, please try again");

                reset();

                $("#quoteModalTitle").append("Travel Quotation");

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