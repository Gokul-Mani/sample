
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
],
    /**
     * @param {typeof sap.ui.core.mvc.controller}  Controller
     */
    function (Controller, Fragment, JSONModel, ValueHelpDialog, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("autocleaning.cashapplication.controller.open_invoice", {
            onInit: function () {
                this.globalModel = this.getOwnerComponent().getModel("globalModel");
                var oModel = new JSONModel(this.globalModel);
                oModel.setSizeLimit(500);
                this.getView().setModel(oModel, "oModel");
                this.onOpenItemsDisplay();
                this.onLoadGetcompanyCode();
                this.onLoadGetgl_account();
                this.onLoadGetcustomer();
                this.onLoadGetcharAC();
                
                
                
                
            },
            onLoadGetcustomer:function(){
                var that = this;
                jQuery.ajax({
                    type: "GET",
                    headers: {
                        "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                    },
                    contentType: "application/json",
                    url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/getcustomer",
                    dataType: "json",
                    async: false,
                    success: function (data) {
    
    
                        var oModelgetcustomer = new JSONModel(data.data);
                        oModelgetcustomer.setSizeLimit(500);
                        that.getView().setModel(oModelgetcustomer, "oModelgetcustomer");
    
                    },
                    error: function (e) {
                        console.log("error: " + e);
                    },
    
                });
            },
            onLoadGetgl_account:function(){
                var that = this;
                    jQuery.ajax({
                        type: "GET",
                        headers: {
                            "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                        },
                        contentType: "application/json",
                        url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/getgl_account",
                        dataType: "json",
                        async: false,
                        success: function (data) {
    
    
                            var oModelgetgl_account = new JSONModel(data.data);
                            oModelgetgl_account.setSizeLimit(500);
                            that.getView().setModel(oModelgetgl_account, "oModelgetgl_account");
    
                        },
                        error: function (e) {
                            console.log("error: " + e);
                        },
    
                    });
                    
            },
            onLoadGetcompanyCode:function(){
                var that = this;
                    jQuery.ajax({
                        type: "GET",
                        headers: {
                            "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                        },
                        contentType: "application/json",
                        url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/getcompanyCode",
                        dataType: "json",
                        async: false,
                        success: function (data) {
    
    
                            var oModelcompanyCode = new JSONModel(data.data);
                            oModelcompanyCode.setSizeLimit(500);
                            that.getView().setModel(oModelcompanyCode, "oModelcompanyCode");
    
                        },
                        error: function (e) {
                            console.log("error: " + e);
                        },
    
                    });
            },
    
            onLoadGetcharAC:function(){
                var that = this;
                jQuery.ajax({
                    type: "GET",
                    headers: {
                        "Authorization": "Basic QVBJOlNpZXJyYUAyMDIy"
                    },
                    contentType: "application/json",
                    url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/getcharAC",
                    dataType: "json",
                    async: false,
                    success: function (data) {


                        var oModelgetcharAC = new JSONModel(data.data);
                        oModelgetcharAC.setSizeLimit(500);
                        that.getView().setModel(oModelgetcharAC, "oModelgetcharAC");

                    },
                    error: function (e) {
                        console.log("error: " + e);
                    },

                });
                 

            },
            onOpenItemsDisplay:function(){
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

                        that.globalModel.OpenItem = data;
                        that.globalModel.OpenItemLength = data.data.length;
                        // console.log("that.globalModel.OpenItemLength", that.globalModel.OpenItemLength);
                        that.globalModel.OpenItem.data.forEach(element => {
                            if (element.HBudat) {
                                var date = element.HBudat.toString();

                                var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                                element.HBudatFormat = format.toString();
                            } else {
                                element.HBudatFormat = '';
                            }

                            if (element.HBldat) {
                                var date = element.HBldat.toString();

                                var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                                element.HBldatFormat = format.toString();
                            } else {
                                element.HBldatFormat = '';
                            }
                        });

                        var oModelOpenItem = new JSONModel(data.data);
                        oModelOpenItem.setSizeLimit(500);
                        that.getView().setModel(oModelOpenItem, "oModelOpenItem");
                        // console.log("oModelOpenItem",oModelOpenItem);

                    },
                    error: function (e) {
                        console.log("error: " + e);
                    },

                });
                var count = that.getView().byId("persoTable").getBinding("items").getLength();
                var id = that.getView().byId("idset").setText("Records: " + count + " / " + that.globalModel.OpenItemLength);


            },

            onReset: function () {
                var oPayoutID = this.getView().byId("persoTable");
                var oItemsBinding = oPayoutID.getBinding("items");
                var oFilter = [];
                oItemsBinding.filter(oFilter);

                this.getView().byId("glaccount").setSelectedKey("");
                this.getView().byId("companycodeget").setSelectedKey("");
                this.getView().byId("customerid").setSelectedKey("");



            },
            onSearch: function () {

                var oTable = this.getView().byId("persoTable");
                var oItemsBinding = oTable.getBinding("items");

                let companyCode = this.getView().byId("companycodeget").mProperties.selectedKey;
                let customer = this.getView().byId("customerid").mProperties.selectedKey;
                let GL = this.getView().byId("glaccount").mProperties.selectedKey;

                if (!this.getView().byId("companycodeget").mProperties.selectedKey) {
                    var CompanyCode = {};
                } else {
                    var CompanyCode = new Filter("Bukrs", FilterOperator.EQ, companyCode);
                }

                if (!this.getView().byId("customerid").mProperties.selectedKey) {
                    var Customer = {};
                } else {
                    var Customer = new Filter("Kunnr", FilterOperator.EQ, customer);
                }

                if (!this.getView().byId("glaccount").mProperties.selectedKey) {
                    var glacc = {};
                } else {
                    var glacc = new Filter("Saknr", FilterOperator.EQ, GL);
                }

                var oFilter = [CompanyCode, Customer, glacc];

                oItemsBinding.filter(oFilter, false);

                var count = this.getView().byId("persoTable").getBinding("items").getLength();
                var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.OpenItemLength);

            },


        });
    });
