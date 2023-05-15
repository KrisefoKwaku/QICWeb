(function () {
    const service = {
        add: function (services) { for (let i in services)
                if (services.hasOwnProperty(i)) this[i] = services[i];
        },

        addName: function (namespace, services) {
            this[namespace] = {}
            for (let i in services) {
                if (services.hasOwnProperty(i)) {
                    this[namespace][i] = services[i];
                }
            }
        },

         app: "http://eportal.qicghana.com/", //UAT
         //app: "http://eportal.qicghana.com/uat/", //UAT
    
        host: "http://eportal.qicghana.com/BACKEND_UAT", //UAT

        //host: "https://eportal.qicghana.com/BACKEND", 

    };
    
    window.service = service;

})();