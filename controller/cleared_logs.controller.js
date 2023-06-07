sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
    ],
    function (BaseController, JSONModel, Filter, FilterOperator) {
        "use strict";

        return BaseController.extend("autocleaning.cashapplication.controller.cleared_logs", {

            onInit() {
                this.onLoadGetCleared();
                this.onLoadGetcompanyCode();
                this.onLoadGetgl_account();
                this.onLoadGetcustomer();
               
                var oTreeTable = this.getView().byId("TreeTableBasic");

                
                var oBindingInfo = oTreeTable.getBindingInfo("rows");
    
                 
                oBindingInfo.parameters["numberOfExpandedLevels"] = 999;
    
               
                oTreeTable.bindRows(oBindingInfo);
            //    debugger;
            //     var count = this.getView().byId("TreeTableBasic").getBinding("items").length();
            //     var id = this.getView().byId("idset").setText("Records: " + count + "/" + this.globalModel.clearedtree1);
               
              
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

        onLoadGetCleared: function () {
            var that = this;
            that.globalModel = that.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(that.globalModel);
            oModel.setSizeLimit(500);
            that.getView().setModel(oModel, "oModel");
            
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
                    that.globalModel.clearedtree = data;
                    that.globalModel.clearedtree1 = data.data.length;
                    
                    var oModelgetclearedtree = new JSONModel(data);
                    oModelgetclearedtree.setSizeLimit(500);
                    that.getView().setModel(oModelgetclearedtree, "oModelgetclearedtree");

                },
                error: function(e){
                    console.log("error" + e);
                }

            });
        
            var count = that.getView().byId("TreeTableBasic")._getTotalRowCount()
            var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.clearedtree1);
          
            },
            
            onSearch: function () {
                var oTable = this.getView().byId("TreeTableBasic");
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
                 


               
            },
            onReset: function () {
                var oPayoutID = this.getView().byId("TreeTableBasic");
                var oItemsBinding = oPayoutID.getBinding("items");
                var oFilter = [];
                oItemsBinding.filter(oFilter);

                this.getView().byId("glaccount").setSelectedKey("");
                this.getView().byId("companycodeget").setSelectedKey("");
                this.getView().byId("customerid").setSelectedKey("");


            },
            onCollapseAll: function () {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.collapseAll();
            },
    
            onExpandFirstLevel: function () {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.expandToLevel(2);
            },

        });
    }
);