(function ($,u) {
    u.add({
        
        createGuid: function () {  
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                const r = Math.random()*16|0;
                const v = c === "x" ? r : (r&0x3|0x8);  
                return v.toString(16);  
            });  
        },
        parse_form: function (form) {
            var obj = {};
            $(form).find("input,select,textarea").each(function () {
                const ele = this, name = $(this).attr("name");

                if ($(ele).attr("type") === "checkbox") {
                    obj[name] = $(ele).prop("checked") ? $(ele).val() : "N";
                } else if ($(ele).attr("type") === "radio") {

                    if (obj[name]) {
                        obj[name] = (obj[name].length <= 0) && $(ele).prop("checked") ? $(ele).val() : obj[name];
                    } else {
                        obj[name] = $(ele).prop("checked") ? $(ele).val() : "";
                    }
                    
                } else {
                    obj[name] = $(ele).hasClass("date") ? u.dbDate($(ele).val()) : $(ele).val();
                }
            });
            console.log(obj);
            return obj;
        },

        fill_form: function (data, form) {
            var ele;
            for (let i in data) {
                if (typeof data[i] == "object" && data[i] != null) {
                    this.fill_form(data[i],form);
                } else if (!Array.isArray(data[i]) && typeof data[i] != "object") {
                    ele = $(form).find("input[name='" + i + "'], select[name='" + i + "'], textarea[name='" + i + "']");
                    //check if element is a checkbox
                    if (ele.attr("type") === "checkbox") {
                        data[i] === "Y" ? ele.prop("checked", true) : ele.prop("checked", false);
                    }else if (ele.attr("type") === "radio") {
                        $("input[name='" + i + "'][value='" + data[i] + "'] ").prop("checked", true);
                    } else {
                        ele.val($(ele).hasClass("date") ? u.dateFormatUk(data[i]) : data[i]).trigger("change");
                    }
                }
            }
            return 1;
        },
        form_reset: function (form) {
            if (Array.isArray(form)) {
                for (let i in form) {
                    if ($(form[i])[0]) {
                        $(form[i])[0].reset();
                    }
                }
            } else if (typeof form === "string") {
                if ($(form)[0]) {
                    $(form)[0].reset();
                }
            }
            u.clear_validation();
            
        },
        form_disable: function (form) {
            if (Array.isArray(form)) {
                for (let i in form) {
                    if ($(form[i])) {
                        $(form[i]).find("input,select,textarea,button").each(function() {
                            $(this).prop("disabled", "disabled");
                        })  
                    }
                }
            } else if (typeof form === "string") {
                if ($(form)) {
                    $(form).find("input,select,textarea,button").each(function () {
                        $(this).prop("disabled", "disabled");
                    })
                }
            }
        }
        
    });
})(window.jQuery,window.utility);

