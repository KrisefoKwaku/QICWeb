(function ($, s, u, $scope) {

    $(function () { 

        $("#PaQuoteForm input[name='START_DATE']").change(function () {
            $("#PaQuoteForm input[name='END_DATE']").val(u.dateReverse(u.dateFastForward($(this).val(), 1, "year"), 1, "day"));
        });

        $("#submitPaQuote").click(function(){

            if(!u.form_validation("#PaQuoteForm"))
               return u.growl_info("All fields marked red (*) are required");

            var data = u.parse_form("#PaQuoteForm");

            data["PLATFORM"] = "WEBSITE";

            data["START_DATE"] = u.dbDate(data["START_DATE"]);

            data["END_DATE"] = u.dbDate(data["END_DATE"]);

            data["STATUS"] = "U";

            $("#pa-loader").css('display', 'block');

            s.getPersonalAccidentQuote(data, function(response){

                $("#pa-loader").css('display', 'none');

                if(!response.state)
                    return u.growl_error("Something went wrong. please try again");

                reset();

                $("#quoteModalTitle").append("Personal Accident Quotation");

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