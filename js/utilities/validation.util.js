(function($, s, u, $scope) {
    u.add({
        /**
         * function to validate the code portion of an lov. 
         * this function will check if the code entered exists in the database. 
         * for a valid check the code entered must exist in the database
         * @param id the identifier for the code field you want to validate
         * @param service the name of the service that will check if the code entered is valid
         * @param target the identifier of the form control you want to store the name in
         */
        lovCodeVal: function(id, service, target, callback) {
            var self = this;
            $(id).on("blur", function() {
                var field = this;
                var code = $(this).val();
                if (s[service]) {
                    if (!self.field_empty(field)) {
                        s[service](code,
                            function(response) {
                                if (response.state) {
                                    $(target).val(response.name);
                                    self.set_valid_higlight(field);
                                    callback ? callback.call(this, code) : (function() {})();
                                } else {
                                    $(target).val("");
                                    $(id).val("");
                                    u.growl_error("The code entered does not exist.");
                                    $(field).focus();
                                    self.set_invalid_higlight(field);
                                }
                            }, u.ajax_error);
                    }

                } else {
                    u.growl_error("The service name " + service + "does not exist please enter the correct service name or check if " +
                        "its file has been referenced correctly");
                }
            });
        },

        /**
         * function to validate a code field. 
         * this function will validate the specified the code field to make sure the 
         * code entered does not exist in the database. this validation will be mostly used
         * for setting up new entities.
         * @param string id the identifier of the code field you want validated
         * @param  string service the name of the service which will validate the value entered for the code field
         */
        codeVal: function(id, service) {
            var self = this;
            $(id).on("blur", function() {
                var field = this;
                var code = $(field).val();
                if (s[service]) {
                    if (!self.field_empty(field)) {
                        s[service](code,
                            function(response) {
                                if (!response.state) {
                                    $(field).removeClass("code-error");
                                    self.set_valid_higlight(field);
                                } else {
                                    $(id).val("");
                                    $(field).addClass("code-error");
                                    u.growl_error("The Code " + code + " already exists, please enter a different code");
                                    self.set_invalid_higlight(field);
                                }
                            }, u.ajax_error);
                    }

                } else {
                    u.growl_error("The service name " + service + "does not exist please enter the correct " +
                        "service name or check if its file has been referenced correctly");
                }
            });
        },

        form_validation: function(form) {
            $scope.invalid = false;
            var that = this;

            if (Array.isArray(form)) {
                for (var i in form) {
                    $(form[i]).find("input,select,textarea").each(function() {
                        $(this).off(".validation");
                        $(this).on("blur.validation", function() {
                            that.field_check(this, $scope);
                        });
                        that.field_check(this, $scope);
                    });
                }
            } else if (typeof form === "string") {
                $(form).find("input,select,textarea").each(function() {
                    $(this).off(".validation");
                    $(this).on("blur.validation", function() {
                        that.field_check(this, $scope);
                    });
                    that.field_check(this, $scope);
                });
            }

            return !$scope.invalid;
        },

        field_check: function(field, scope) {
            if ($(field).hasClass("field-invalid")) {
                this.set_invalid_higlight(field);
                scope.invalid = true;
            } else if(($(field).prop("required") && this.field_empty(field)) || $(field).hasClass("code-error")) {
                this.set_invalid_higlight(field);
                scope.invalid = true;
                //alert($(field).prop("id"))
                //alert($(field).prop("class"))
                //alert($(field).prop("placeholder"))
            } else {
                this.set_valid_higlight(field);
            }
        },

        set_valid_higlight: function(field) {
            $(field).removeClass("field-error");
            $(field).addClass("field-valid");
        },

        set_invalid_higlight: function(field) {
            $(field).removeClass("field-valid");
            $(field).addClass("field-error");
        },

        clear_validation: function() {
            $("input,select,textarea").removeClass("field-error");
            $("input,select,textarea").removeClass("field-valid");
        },

        field_empty: function(field) {
            return /^\s*$/.test($(field).val());
        },

        contains: function(string, substring) {
            return ~string.indexOf(substring);
        },

        noSpace: function(txt) {
            while (txt.match(/\s/) != null) txt = txt.replace(/\s/, "");
            
            return txt;
        },
        percentFieldValidation: function(field) {
            $(field).on("blur", function() {
                if (parseFloat($(this).val()) > 100) {
                    u.growl_warning("Percentage value cannot be more than 100");
                    $(this).val("");
                }
            });
        },
        dob_validation: function (minAge, field, callback) {
            callback = callback || function() { }
            //age of individual must be 18 or higher
            $(field).change(function () {
                if (!u.field_empty(this)) {
                    var dob = $(this).val();
                    var currentYear = u.getYear(u.get_date());
                    var dobYear = u.getYear(dob);
                    if ((currentYear - dobYear) < minAge) {
                        u.growl_warning("You must be " + minAge + " years and above to register");
                        $(this).val("");
                        u.set_invalid_higlight(this);
                        $(this).addClass("field-invalid");
                    } else {
                        callback($(this).val());
                        u.set_valid_higlight(this);
                        $(this).removeClass("field-invalid");
                    }
                }
                
            });
        },
        email_validation: function(field) {
            //email validation
            
            $(field).blur(function () {
                
                if (!u.field_empty(this) && $(this).val().length > 0) {
                    //alert($(this).prop("name"));
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test($(this).val())) {
                        $(this).val("");
                        u.growl_warning("Invalid email address, please enter a valid email address");
                        u.set_invalid_higlight(this);
                        $(this).addClass("field-invalid");
                    } else {
                        u.set_valid_higlight(this);
                        $(this).removeClass("field-invalid");
                    }
                }
                
            });

        },

        min_lnth_validation: function(field,length) {
            $(field).blur(function() {
                var val = $(this).val();
                if (val.length < length) {
                    u.growl_warning("This field must have a minimum of " + length + " characters");
                    u.set_invalid_higlight(this)
                    $(this).addClass("field-invalid")
                } else {
                    u.set_valid_higlight(this);
                    $(this).removeClass("field-invalid")
                }
            });
        }
    });
})(window.jQuery, window.service, window.utility, {});