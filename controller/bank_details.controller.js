sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
    ],
    function (BaseController, JSONModel, Filter, FilterOperator) {
        "use strict";

        return BaseController.extend("autocleaning.cashapplication.controller.bank_details", {

            onInit() {
                this.onLoadBankDetails();
                this.onCompanyCode();
                var count = this.getView().byId("persoTable").getBinding("items").getLength();
                var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.BankDetailsLength);

            },

            onLoadBankDetails: function () {
                var that = this;
                that.globalModel = that.getOwnerComponent().getModel("globalModel");
                var oModel = new JSONModel(that.globalModel);
                oModel.setSizeLimit(500);
                that.getView().setModel(oModel, "oModel");

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
                        that.globalModel.BankDetails = data;
                        that.globalModel.BankDetailsLength = data.data.length;

                        that.globalModel.BankDetails.data.forEach(element => {
                            if (element.Eperl) {
                                element.EperlImg = "sap-icon://message-success"
                                element.EperlColor = "green"
                            } else {
                                element.EperlImg = "sap-icon://status-error"
                                element.EperlColor = "red"
                            }
                            if (element.Bvdat) {
                                var date = element.Bvdat.toString();

                                var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                                element.BvdatFormat = format.toString();
                            } else {
                                element.BvdatFormat = '';
                            }
                        });

                        var oModelBankGet = new JSONModel(data.data);
                        oModelBankGet.setSizeLimit(500);
                        that.getView().setModel(oModelBankGet, "oModelBankGet");


                    },
                    error: function (e) {
                        console.log("error: " + e);
                    },

                });

            },
            onCompanyCode: function () {
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
            onSearch: function () {
                debugger;
                var oTable = this.getView().byId("persoTable");
                var oItemsBinding = oTable.getBinding("items");

                let companyCode = this.getView().byId("companycodeget").mProperties.selectedKey;


                if (!this.getView().byId("companycodeget").mProperties.selectedKey) {
                    var CompanyCode = {};
                } else {
                    var CompanyCode = new Filter("Svbuk", FilterOperator.EQ, companyCode);
                }



                var oFilter = [CompanyCode];

                oItemsBinding.filter(oFilter, false);

                var count = this.getView().byId("persoTable").getBinding("items").getLength();
                var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.BankDetailsLength);
            },
            onReset: function () {
                var oPayoutID = this.getView().byId("persoTable");
                var oItemsBinding = oPayoutID.getBinding("items");
                var oFilter = [];
                oItemsBinding.filter(oFilter);

                this.getView().byId("companycodeget").setSelectedKey("");

            }

        });
    }
);