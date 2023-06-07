sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/Label',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/m/MessageToast",

], function (Controller, JSONModel, Label, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("autocleaning.cashapplication.controller.match", {
        onInit: function () {

            this.onMatchingDisplay();
            this.onLoadGetcompanyCode();
            this.onLoadGetgl_account();
            this.onLoadGetcustomer();
            var oTreeTable = this.getView().byId("TreeTableBasic");

            // Get the binding information
            var oBindingInfo = oTreeTable.getBindingInfo("rows");

            // Set the expand level to the maximum value
            oBindingInfo.parameters["numberOfExpandedLevels"] = 999;

            // Rebind the rows
            oTreeTable.bindRows(oBindingInfo);


            var that = this;
            that.globalModel = that.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(that.globalModel);
            oModel.setSizeLimit(500);
            that.getView().setModel(oModel, "oModel");



        },
        onLoadGetcustomer: function () {
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
        onLoadGetgl_account: function () {
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
        onLoadGetcompanyCode: function () {
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

        onpresspost: function (oEvent) {
            // var oTreeTable = this.byId("TreeTableBasic");
            // oTreeTable.collapseAll();
            var that = this;
            that.globalModel = that.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(that.globalModel);
            oModel.setSizeLimit(500);
            that.getView().setModel(oModel, "oModel");

            var currentDate = new Date();
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy"
            });
            var formattedDate = dateFormat.format(currentDate);

            var oTable = that.getView().byId("TreeTableBasic");
            var aIndicies = oTable.getSelectedIndices();
            let alldata = [];
            let Bukrsdata = [];
            for (var i = 0; i < aIndicies.length; i++) {
                var oTableContext = oTable.getContextByIndex(aIndicies[i]).getProperty();
                let Bukrs = oTableContext.OPEN_INVOICE[0].Bukrs;
                let Agkoa = "D";
                let Agkon = oTableContext.OPEN_INVOICE[0].Kunnr;
                let Belnr = oTableContext.Belnr;
                let Blart = "DZ";
                let Bldat = oTableContext.OPEN_INVOICE[0].HBldatFormat1;
                let Budat = oTableContext.OPEN_INVOICE[0].HBudatFormat1;
                let Xblnr = oTableContext.OPEN_INVOICE[0].Xblnr;
                let Bktxt = "";
                let Waers = oTableContext.OPEN_INVOICE[0].Waers;
                let Augtx = "";
                let Bschl = "40";
                let Wrbtr1 = oTableContext.OPEN_INVOICE[0].Wrbtr;
                let Wrbtr = Number(Wrbtr1).toString();
                let Valut = formattedDate;
                let Zuonr = oTableContext.OPEN_INVOICE[0].Zuonr;
                let Sgtxt = oTableContext.OPEN_INVOICE[0].Sgtxt;
                let Hkont = "0000127515";
                let Kukey = oTableContext.BANK_DETAILS[0].Kukey;
                let Esnum = oTableContext.BANK_DETAILS[0].Esnum;

                Bukrsdata.push(oTableContext);
                alldata.push({
                    "Bukrs": Bukrs,
                    "Agkoa": Agkoa,
                    "Agkon": Agkon,
                    "Belnr": Belnr,
                    "Blart": Blart,
                    "Bldat": Bldat,
                    "Budat": Budat,
                    "Xblnr": Xblnr,
                    "Bktxt": Bktxt,
                    "Waers": Waers,
                    "Augtx": Augtx,
                    "Bschl": Bschl,
                    "Wrbtr": Wrbtr,
                    "Valut": Valut,
                    "Zuonr": Zuonr,
                    "Sgtxt": Sgtxt,
                    "Hkont": Hkont,
                    "Kukey": Kukey,
                    "Esnum": Esnum
                })

            }
            // console.log("Bukrsdata", Bukrsdata);
            console.log("alldata", alldata);
            let data = {
                // Bukrs: oTableContext.OPEN_INVOICE[0].Bukrs,
                nv_inclr1: alldata,
            }
            console.log("data", data);
            var postData = JSON.stringify(data);
            console.log("postData", postData);
            $.ajax({
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/PostCleared",
                type: 'POST',
                headers: {
                    Authorization: "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                data: postData,
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    console.log("success", response);

                    let BTPdata = [];
                    for (var i = 0; i < aIndicies.length; i++) {
                        var oTableContext = oTable.getContextByIndex(aIndicies[i]).getProperty();
                        let Bukrs = oTableContext.OPEN_INVOICE[0].Bukrs;
                        let Gjahr = oTableContext.OPEN_INVOICE[0].Gjahr;
                        let Kunnr = oTableContext.OPEN_INVOICE[0].Kunnr;
                        let Saknr = oTableContext.OPEN_INVOICE[0].Saknr;
                        let HBudat = oTableContext.OPEN_INVOICE[0].HBudatFormat;
                        let HBldat = oTableContext.OPEN_INVOICE[0].HBldatFormat;
                        let Belnr = oTableContext.OPEN_INVOICE[0].Belnr;
                        let Buzei = oTableContext.OPEN_INVOICE[0].Rsnum;
                        let Xblnr = oTableContext.OPEN_INVOICE[0].Xblnr;
                        let Prctr = oTableContext.OPEN_INVOICE[0].Prctr;
                        let Sgtxt = oTableContext.OPEN_INVOICE[0].Sgtxt;
                        let Zuonr = oTableContext.OPEN_INVOICE[0].Zuonr;
                        let Xref1 = oTableContext.OPEN_INVOICE[0].Xref1;
                        let Xref2 = oTableContext.OPEN_INVOICE[0].Xref2;
                        let Umskz = oTableContext.OPEN_INVOICE[0].Umskz;
                        let Xref3 = oTableContext.OPEN_INVOICE[0].Xref3;
                        let Dmbtr = oTableContext.OPEN_INVOICE[0].Dmbtr;
                        let Pswsl = oTableContext.OPEN_INVOICE[0].Pswsl;
                        let Wrbtr = oTableContext.OPEN_INVOICE[0].Wrbtr;
                        let Waers = oTableContext.OPEN_INVOICE[0].Waers;
                        let Svbuk = oTableContext.BANK_DETAILS[0].Bukrs
                        let Rsnum = oTableContext.BANK_DETAILS[0].Rsnum;
                        let B1doc = oTableContext.BANK_DETAILS[0].B1doc;
                        let Vwezw = oTableContext.BANK_DETAILS[0].Vwezw;
                        let Bvdat = oTableContext.BANK_DETAILS[0].HBudatFormat;
                        let Kwbtr = oTableContext.BANK_DETAILS[0].Wrbtr;
                        let Kwaer = oTableContext.BANK_DETAILS[0].Waers;
                        let Kukey = oTableContext.BANK_DETAILS[0].Kukey;
                        let Esnum = oTableContext.BANK_DETAILS[0].Esnum;
                        let BALANCE = oTableContext.Wrbtr;

                        BTPdata.push({
                            "Bukrs": Bukrs,
                            "Gjahr": Gjahr,
                            "Kunnr": Kunnr,
                            "Saknr": Saknr,
                            "HBudat": HBudat,
                            "HBldat": HBldat,
                            "Belnr": Belnr,
                            "Buzei": Buzei,
                            "Xblnr": Xblnr,
                            "Prctr": Prctr,
                            "Sgtxt": Sgtxt,
                            "Zuonr": Zuonr,
                            "Xref1": Xref1,
                            "Xref2": Xref2,
                            "Umskz": Umskz,
                            "Xref3": Xref3,
                            "Dmbtr": Dmbtr,
                            "Pswsl": Pswsl,
                            "Wrbtr": Wrbtr,
                            "Waers": Waers,
                            "Svbuk": Svbuk,
                            "Rsnum": Rsnum,
                            "B1doc": B1doc,
                            "Vwezw": Vwezw,
                            "Bvdat": Bvdat,
                            "Kwbtr": Kwbtr,
                            "Kwaer": Kwaer,
                            "Kukey": Kukey,
                            "Esnum": Esnum,
                            "BALANCE": BALANCE

                        })
                    }
                    console.log("BTPdata", BTPdata);
                    var postData = JSON.stringify(BTPdata);
                    console.log("postData", postData);
                    $.ajax({
                        url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/addcleared",
                        type: 'POST',
                        headers: {
                            Authorization: "Basic QVBJOlNpZXJyYUAyMDIy"
                        },
                        data: postData,
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            console.log("success", response);
            //                 const ok = confirm("Your items has been saved!!!");
            //                 if (ok) {

            //                     // var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            //                     // oRouter.navTo("Routeclearedlogs");
                               
            //                     that.onMatchingDisplay();
            //                     var oTreeTable = that.byId("TreeTableBasic");
            // oTreeTable.collapseAll();
            //                     // that.getView().getModel("oModel").refresh();
            //                     console.log("Ok was pressed");
            //                 }

            alert("Selected items(s) cleared successfuly!!!")
            that.onMatchingDisplay();
            // var oTreeTable = that.byId("TreeTableBasic");
            //  oTreeTable.collapseAll();

                        },
                        error: function (e) {
                            console.log("error: " + e);
                            alert("Error");
                        }
                    });

                    MessageToast.show("Selected items(s) cleared successfuly!!!");
                },
                error: function (e) {
                    console.log("error: " + e);
                }
            });

        },



        onMatchingDisplay: function () {
            var that = this;
            that.globalModel = that.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(that.globalModel);
            oModel.setSizeLimit(500);
            that.getView().setModel(oModel, "oModel");
            var that = this;

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
                    that.globalModel.matching = data;
                    that.globalModel.matchingLength = data.data.length;
                    // that.globalModel.matchingLength = data.data.OPEN_INVOICE.BANK_DETAILS.length;

                    that.globalModel.matching.data.forEach(element => {


                        if (element.OPEN_INVOICE[0].HBldat) {

                            var date = element.OPEN_INVOICE[0].HBldat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.OPEN_INVOICE[0].HBldatFormat = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBldatFormat = '';
                        }
                        if (element.BANK_DETAILS[0].HBudat) {

                            var date = element.BANK_DETAILS[0].HBudat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.BANK_DETAILS[0].HBudatFormat = format.toString();
                        } else {

                            element.BANK_DETAILS[0].HBudatFormat = '';
                        }
                        if (element.OPEN_INVOICE[0].HBudat) {

                            var date = element.OPEN_INVOICE[0].HBudat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.OPEN_INVOICE[0].HBudatFormat = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBudatFormat = '';
                        }

                        // Indian format

                        if (element.OPEN_INVOICE[0].HBldat) {

                            var date = element.OPEN_INVOICE[0].HBldat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-IN', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join(".");
                            element.OPEN_INVOICE[0].HBldatFormat1 = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBldatFormat1 = '';
                        }
                        if (element.BANK_DETAILS[0].HBudat) {

                            var date = element.BANK_DETAILS[0].HBudat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-IN', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join(".");
                            element.BANK_DETAILS[0].HBudatFormat1 = format.toString();
                        } else {

                            element.BANK_DETAILS[0].HBudatFormat1 = '';
                        }
                        if (element.OPEN_INVOICE[0].HBudat) {

                            var date = element.OPEN_INVOICE[0].HBudat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-IN', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join(".");
                            element.OPEN_INVOICE[0].HBudatFormat1 = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBudatFormat1 = '';
                        }


                    });
                    var oModelMatch = new JSONModel(data);
                    oModelMatch.setSizeLimit(500);
                    that.getView().setModel(oModelMatch, "oModelMatch");

                },



            });
           
            var count = that.getView().byId("TreeTableBasic")._getTotalRowCount()
            var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.matchingLength);
          
        },
        onSearch: function () {
            var that = this;
            that.globalModel = that.getOwnerComponent().getModel("globalModel");
            var oModel = new JSONModel(that.globalModel);
            oModel.setSizeLimit(500);
            that.getView().setModel(oModel, "oModel");

            let companyCode = this.getView().byId("companycodeget").mProperties.selectedKey;
            let customer = this.getView().byId("customerid").mProperties.selectedKey;
            let GL = this.getView().byId("glaccount").mProperties.selectedKey;

            jQuery.ajax({
                type: "GET",
                headers: {
                    Authorization: "Basic QVBJOlNpZXJyYUAyMDIy"
                },
                contentType: "application/json",
                url: "https://09f67d4dtrial-dev-gl-item-auto-clearing-srv.cfapps.us10-001.hana.ondemand.com/Listtree/" + companyCode + "/" + customer + "/" + GL,
                dataType: "json",
                async: false,
                success: function (data) {
                    that.globalModel.matchingFilter = data;

                    that.globalModel.matchingFilter.data.forEach(element => {


                        if (element.OPEN_INVOICE[0].HBldat) {

                            var date = element.OPEN_INVOICE[0].HBldat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.OPEN_INVOICE[0].HBldatFormat = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBldatFormat = '';
                        }
                        if (element.OPEN_INVOICE[0].HBudat) {

                            var date = element.OPEN_INVOICE[0].HBudat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.OPEN_INVOICE[0].HBudatFormat = format.toString();
                        } else {

                            element.OPEN_INVOICE[0].HBudatFormat = '';
                        }
                        if (element.BANK_DETAILS[0].Bvdat) {

                            var date = element.BANK_DETAILS[0].Bvdat.toString();

                            var format = new Date(+("" + date).slice(6, 19)).toLocaleString('en-US', { year: "numeric", day: "2-digit", month: "2-digit" }).split("/").join("-");
                            element.BANK_DETAILS[0].BvdatFormat = format.toString();
                        } else {

                            element.BANK_DETAILS[0].BvdatFormat = '';
                        }


                    });

                    var oModelMatch = new JSONModel(data);
                    oModelMatch.setSizeLimit(500);
                    that.getView().setModel(oModelMatch, "oModelMatch");


                },

            });
            var count = that.getView().byId("TreeTableBasic")._getTotalRowCount()
            var id = this.getView().byId("idset").setText("Records: " + count + " / " + this.globalModel.matchingLength);
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
});