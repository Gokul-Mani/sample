sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("autocleaning.cashapplication.controller.home", {
        onInit: function () {
            var that = this;

            jQuery.ajax({
                type: "GET",
                headers: {
                    "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                contentType: "application/json",
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/OpenItem",
                dataType: "json",
                async: false,
                success: function (data) {
                    var oModellineitemlen = new JSONModel(data.data);
                    oModellineitemlen.setSizeLimit(500);
                    that.getView().setModel(oModellineitemlen, "oModellineitemlen");
                },
                error: function (e) {
                    console.log("error: " + e);
                },
            });

            jQuery.ajax({
                type: "GET",
                headers: {
                    "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                contentType: "application/json",
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/GettBank",
                dataType: "json",
                async: false,
                success: function (data) {
                    var oModelBanklen = new JSONModel(data.data);
                    oModelBanklen.setSizeLimit(500);
                    that.getView().setModel(oModelBanklen, "oModelBanklen");
                },
                error: function (e) {
                    console.log("error: " + e);
                },
            });

            jQuery.ajax({
                type: "GET",
                headers: {
                    Authorization: "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                contentType: "application/json",
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/Listtree",
                dataType: "json",
                async: false,
                success: function (data) {
                    var oModelMatchlen = new JSONModel(data.data);
                    oModelMatchlen.setSizeLimit(500);
                    that.getView().setModel(oModelMatchlen, "oModelMatchlen");
                },
            });

            jQuery.ajax({
                type: "GET",
                headers: {
                    Authorization: "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                contentType: "application/json",
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/getclearedtree",
                dataType: "json",
                async: false,
                success: function (data) {
                    var oModelgetclearedtreelen = new JSONModel(data.data);
                    oModelgetclearedtreelen.setSizeLimit(500);
                    that.getView().setModel(oModelgetclearedtreelen, "oModelgetclearedtreelen");
                },
                error: function (e) {
                    console.log("error" + e);
                }
            });
        }
    });
});