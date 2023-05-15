(function (s, u) {

    s.add({

        getMotorQuote: function(quote, success, error) {
            u.anonymousPost(this.host + "/api/motorpremium/calc", quote, success, error);
        },

        getTravelQuote: function (data, success, error) {
            u.anonymousPost(this.host + "/api/travelpremium/calc", data, success, error);
        },

        getPersonalAccidentQuote: function(data, success, error) {
            u.anonymousPost(this.host + "/api/personalaccidentpremium/calc", data, success, error);
        },

        getHomeQuote: function (data, success, error) {
            u.anonymousPost(this.host + "/api/homeownertarrif/calc", data, success, error);
        },

        getCurencyLov: function(success, error) {
            u.anonymousGet(this.host + "/api/currency/lov", success, error);
        },

        getMotorProductLov: function (success, error) {
            u.anonymousGet(this.host + "/api/products/motor/lov", success, error);
        },

        getRiskLov: function(prodCode, success, error) {
            u.anonymousGet(this.host + "/api/servicerisk/lov/" + prodCode, success, error);
        },

        getHomeOwnerCovers: function(prdCode,success,error) {
            u.anonymousGet(this.host + "/api/riskcovers/lov/" + prdCode, success, error);
        },

        travlCategoryLov: function(success, error) {
            u.anonymousGet(this.host + "/api/TravelCategory/lov", success, error);
        },

        destinationLov: function (success, error) {
            u.anonymousGet(this.host + "/api/DestinationCategory/lov", success, error);
        }

     });

})(window.service, window.utility);