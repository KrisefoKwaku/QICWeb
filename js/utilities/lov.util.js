
//new lov code
(function ($, s, u, $scope) {
    u.add({
        /**
         * what will we need to initialize an LOV system
         * MODAL
         * GRID
         */
        pcolName: [],
        pcolMdls: [],
        lov_init: function(modalId, gridId, pagerId) {
            /*--------------------------
             * create lov modal object
             *-------------------------*/
            $scope.lov_modal = $(modalId);
            $scope.gridId = gridId;
            $scope.pagerId = pagerId;
            /*----------------------------
             * modal button click events
             *---------------------------*/
            $("#btn-modal-ok").click(function(e) {
                if ($scope.rowData) {
                    $scope.callback.call(this, $scope.rowData);
                }

                $scope.lov_modal.modal("hide");
                $scope.lov_grid.GridUnload();
            });
            $("#btn-modal-close, #myLOVModal .close").click(function(e) {
                if ($scope.rowData) {
                    $scope.callback.call(this, $scope.rowData);
                }

                $scope.lov_grid.GridUnload();
            });

            return this;
        },

        grid_builder: function() {
            /*---------------------------------
             * default column names and models
             *--------------------------------*/
            $scope.colNames = ["Code", "Name"];
            $scope.colMdls = [
                { name: "CODE", index: "CODE", id: true, sorttype: "string", editable: true, width: 90 },
                { name: "NAME", index: "NAME", editable: true, width: 300 }
            ];

            /*------------------------------------------------------------------------------
             * updating default column names and models with custome column name and models
             *-----------------------------------------------------------------------------*/
            for (var i in this.pcolName) $scope.colNames.push(this.pcolName[i]);
            for (var x in this.pcolMdls) $scope.colMdls.push(this.pcolMdls[x]);

            /*----------------------------------------------------------
             * create fresh lov grid object for the current lov button
             *--------------------------------------------------------*/
            var grid = u.default_grid($scope.gridId, $scope.pagerId, "LOV Grid", $scope.colNames, $scope.colMdls);
            //console.log($scope.lov_grid);
            $(".modal .ui-jqgrid-bdiv").attr("style", "height: 155px;");
            return grid;
        },

        call_dialog: function(gridCaption, serviceName, dialogData, serviceData, callback) {
            this.hideSearch();
            $scope.lov_grid = this.grid_builder();

            $scope.callback = callback || function() {};
            $scope.dialog_data = dialogData;
            $scope.lov_grid.setCaption(gridCaption);

            $scope.row_single_click = this.row_single_click;
            $scope.row_double_click = this.row_double_click;
            var that = this;
            //alert(service_name)
            //if (!s[serviceName]) u.growl_error("The Service " + serviceName + " doesn not exist, please make sure it has been referenced in the current page");
            if (serviceData) {

                s[serviceName](serviceData, this.lov_callback);
            } else {
                s[serviceName](this.lov_callback);
            }

            $scope.lov_modal.modal();
            this.pcolName = [];
            this.pcolMdls = [];
        },
        callSearchDialog: function(gridCaption, serviceName, dialogData, serviceData, callback) {
            this.showSearch();
            $scope.lov_grid = this.grid_builder();

            $scope.callback = callback || function() {};
            $scope.dialog_data = dialogData;
            $scope.lov_grid.setCaption(gridCaption);

            $scope.row_single_click = this.row_single_click;
            $scope.row_double_click = this.row_double_click;
            var that = this;

            $("#btnLovSearch").click(function() {

                if (!u.field_empty("#myLOVModal input.text")) {
                    var queryObj = { query: $("#myLOVModal input.text").val() };
                    u.clear_grid_data($scope.lov_grid);
                    if (serviceData) {
                        for (var i in serviceData) queryObj[i] = serviceData[i];
                    }
                    //if (!s[serviceName]) u.growl_error("The Service " + serviceName + " doesn not exist, please make sure it has been referenced in the current page");
                    if (!$scope.searching) {
                        $scope.searching = true;
                        s[serviceName](queryObj, that.lov_callback);
                    }

                } else {
                    u.growl_info("Please Enter Code or Name");
                }

            });

            $scope.lov_modal.modal();
            this.pcolName = [];
            this.pcolMdls = [];

        },
        hideSearch: function() {
            $("#btnLovSearch, #myLOVModal input.text, #myLOVModal label").hide(0);
        },
        showSearch: function() {
            $("#btnLovSearch, #myLOVModal input.text, #myLOVModal label").show(0);
        },
        lov_callback: function(typeData) {
            if (typeData && typeData.length && typeData.length > 0) {
                for (var i in typeData) {
                    $scope.lov_grid.addRowData(typeData[i].CODE, typeData[i]);
                }
                $scope.lov_grid.jqGrid("setGridParam", { onSelectRow: $scope.row_single_click });
                $scope.lov_grid.jqGrid("setGridParam", { ondblClickRow: $scope.row_double_click });

            } else if (typeData.length <= 0) {
                u.growl_info("Lov is Empty");
            } else {
                u.growl_error("Oops, we seem to be facing some issues with our servers. Please try again later.");
            }
            $scope.searching = false;
        },
        call_udw_dialog: function(gridCaption, serviceName, dialogData, serviceData) {
            $scope.dialog_data = dialogData;
            $scope.lov_grid.setCaption(gridCaption);
            var that = this;
            s[serviceName](serviceData, function(typeData) {
                if (typeData && typeData.length && typeData.length > 0) {
                    for (var i in typeData) {
                        $scope.lov_grid.addRowData(typeData[i].CODE, typeData[i]);
                    }
                    $scope.lov_grid.jqGrid("setGridParam", { onSelectRow: that.row_single_click });
                    $scope.lov_grid.jqGrid("setGridParam", { ondblClickRow: that.row_double_click });
                } else if (typeData && typeData.length && typeData.length <= 0) {
                    u.growl_info("No List of values at the moment");
                } else {
                    u.growl_error("Oops, we seem to be facing some issues with our servers. Please try again later.");
                }

            }, function(err) {
                u.growl_error("Error Fetching LOV values");
            });
        },

        row_single_click: function (id) {
            const rowData = $scope.rowData = u.getRow(id, $scope.lov_grid);
            //$(`input[name='${$scope.dialog_data.field2}'], textarea[name='${$scope.dialog_data.field2}']`).val(rowData.NAME).trigger("change");
            //$(`input[name='${$scope.dialog_data.field1}'], textarea[name='${$scope.dialog_data.field1}']`).val(rowData.CODE).trigger("change");

        },

        row_double_click: function (id) {
            const rowData = $scope.rowData = u.getRow(id, $scope.lov_grid);
            $(`input[name='${$scope.dialog_data.field2}'], textarea[name='${$scope.dialog_data.field2}']`).val(rowData.NAME).trigger("change");
            $(`input[name='${$scope.dialog_data.field1}'], textarea[name='${$scope.dialog_data.field1}']`).val(rowData.CODE).trigger("change");

            $scope.callback.call(this, rowData);
            $("#myLOVModal").modal("hide");
            $scope.lov_grid.GridUnload();
        },

        lovDropDown: function (id, service, param, callback) {
            $(id + " .removable").remove();
            callback = callback || function() {}
            if (s[service]) {
                if (param) {
                    s[service](param,
                        function(result) {
                            for (var i in result) {
                                $(id).append(`<option class="removable" value="${result[i]["CODE"]}">${result[i]["NAME"]}</option>`);
                            }

                            callback(result);
                            $(id).selectize();
                        });
                } else {
                    s[service](function(result) {
                        for (var i in result) {
                            $(id).append(`<option class="removable" value="${result[i]["CODE"]}">${result[i]["NAME"]}</option>`);
                        }
                        callback(result);
                        $(id).selectize();
                    });
                }

            } else {
                //u.growl_error(`the service ${service} specified does not exist, please check your service references`);
                console.log(`the service ${service} specified does not exist, please check your service references`);
            }

        },

        lovDropDown2: function (id, service, param, callback) {
            $(id + " .removable").remove();
            callback = callback || function () { }
            if (s[service]) {
                if (param) {
                    s[service](param,
                        function (result) {
                            for (var i in result) {
                                $(id).append(`<option class="removable" value="${result[i]["CODE"]}">${result[i]["NAME"]}</option>`);
                            }

                            callback(result);
                            //$(id).selectize();
                        });
                } else {
                    s[service](function (result) {
                        for (var i in result) {
                            $(id).append(`<option class="removable" value="${result[i]["CODE"]}">${result[i]["NAME"]}</option>`);
                        }
                        callback(result);

                    });
                }

            } else {
                //u.growl_error(`the service ${service} specified does not exist, please check your service references`);
                console.log(`the service ${service} specified does not exist, please check your service references`);
            }

        },

    });
})(window.jQuery, window.service, window.utility, {});