(function ($,u) {
    var ajax = {};
    
    ajax.post = function (url, data, success, error) {
        error = error || function () { };

        $.ajax({
            url: url,
            data: JSON.stringify(data),
            //crossDomain: true,
            headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(success)
            .fail(function ( jqXhr,  textStatus,  errorThrow) {
                u.ajax_error(jqXhr, textStatus, errorThrow, success);
                //console.log(err)
                error.call(this, errorThrow) || function () { }();
        });
    };
    
    ajax.anonymousPost = function (url, data, success, error) {
        error = error || function () { };

        $.ajax({
            url: url,
            data: JSON.stringify(data),
            //crossDomain: true,
            //headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(success)
            .fail(function ( jqXhr,  textStatus,  errorThrow) {
                u.ajax_error(jqXhr, textStatus, errorThrow, success);
                //console.log(err)
                error.call(this, errorThrow) || function () { }();
        });
    };

    ajax.queryPost = function (url, data, success, error) {
        error = error || function () { };

        $.ajax({
            url: url,
            data: data,
            //crossDomain: true,
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            /*beforeSend: function (request) {
                request.setRequestHeader("Authorization", `Bearer ${u.getToken()}`);
            }*/
            //headers: { "Authorization": `Bearer ${u.getToken()}`, "Access-Control-Allow-Origin":"*" }
            //dataType: "json"
        })
            .done(success)
            .fail(function ( jqXhr,  textStatus,  errorThrow) {
                u.ajax_error(jqXhr, textStatus, errorThrow, success);
                //console.log(err)
                error.call(this, errorThrow) || function () { }();
        });
    };

    ajax.tokenPost = function(url, data, success, error) {
        error = error || function() {};
        if (u.getToken()) {
            $.ajax({
                url: url,
                data: JSON.stringify(data),
                success: success,
                crossDomain: true,
                error: function(err) {
                    u.ajax_error(err);
                    //console.log(err)
                    error.call(this, err) || function() {}();
                },
                headers: { "Authorization": `Bearer ${u.getToken()}` },
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        } else {
            //token not present or invalid token
            //todo: redirect the user to the login screen if the token is not present or refresh the token if the token is invalid
        }

    };

    ajax.post_file = function (url, formData, success, error) {
        error = error || function () { };
        $.ajax({
            url: url,
            data: formData,
            header: {},
            success: success,
            headers: { "Authorization": `Bearer ${u.getToken()}` },
            error: error,
            /*error: function (err) {
            //    console.log(err)
            //    error.call(this, err) || function (){}();
            },*/
            type: "POST",
            contentType: false,
            processData: false,
            dataType: "json"
        });
    };

    ajax.postFileAsync = async function (url, formData) {

        try {
            return await $.ajax({
                url: url,
                data: formData,
                headers: { "Authorization": `Bearer ${u.getToken()}` },
                type: "POST",
                contentType: false,
                processData: false,
                dataType: "json"
            });
        } catch (e) {
            u.renderAjaxError(e);
            return { state: false, message: "Request failed" };
        }
    };


    ajax.get = function (url, success, error) {
        error = error || function () { };
        $.ajax({
            url: url,
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
                u.ajax_error(jqXHR, textStatus, errorThrown, success);
                error.call(this, jqXHR, textStatus, errorThrown) || function (){}();
            },
            headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    };


    ajax.anonymousGet = function (url, success, error) {
        error = error || function () { };
        $.ajax({
            url: url,
            success: success,
            error: function (err) {
                u.ajax_error(err);
                error.call(this, err) || function (){}();
            },
            //headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "GET",
            contentType: "application/json; charset=utf-8"
        });
    };

    ajax.put = function(url,data,success,error) {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            success: success,
            error: function (err) {
                u.ajax_error(err);
                error.call(this, err) || function (){}();
            },
            headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };

    ajax.anonymousPut = function(url,data,success,error) {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            success: success,
            error: function (err) {
                u.ajax_error(err);
                error.call(this, err) || function (){}();
            },
            //headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    ajax.delete = function(url, success, error) {
        $.ajax({
            url: url,
            success: success,
            error: function (err) {
                u.ajax_error(err);
                error.call(this, err) || function (){}();
            },
            headers: { "Authorization": `Bearer ${u.getToken()}` },
            type: "DELETE",
            contentType: "application/json; charset=utf-8"
        });
    };

    ajax.ajax_error = function (jqXhr, textStatus, errorThrow, success) {
        console.log(jqXhr);
        if (textStatus == 500) {
            u.growl_error("We seem to facing problems with our server, please try again later. Sorry for any inconvenience caused.");
        } else if (textStatus == 404) {
            u.growl_error("The resource you are requesting cannot be found on the server.");
        }else if (textStatus == 401) {
            u.growl_error("Authorization has been denied for this request.");
            window.location = "/";
        } else if (textStatus == 0 && jqXhr.readyState === 0) {
            u.growl_error("It seems you are not connected to the Internet, please check your network connection.");
        } else if (textStatus == 200 ) {
            success(textStatus);
        }
    }

    ajax.get_nocors = function (url, success, error) {
        error = error || function () { };
        $.ajax({
            url: url,
            success: success,
            error: function (err) {
                u.ajax_error(err);
                error.call(this, err) || function () { }();
            },
            type: "GET"
        });
    }

    ajax.postCors = function (url,data, success, error) {
        error = error || function () { };
        $.ajax({
            url: url,
            data: data,
            success: success,
            error: function (err) {
                u.ajax_error(err);
                //console.log(err);
                error.call(this, err) || function () { }();
            },
            type: "POST"
        });
    }

    /*----------------------------------------------------------------------------
     * add ajax utility to the global utility object by using the utility manager
     *--------------------------------------------------------------------------*/
    u.add(ajax);

})(window.jQuery,window.utility);
