 
sap.ui.define(
  [
  "sap/ui/core/mvc/Controller",
"sap/ui/model/json/JSONModel"


  ],
  function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("autocleaning.cashapplication.controller.App", {
      onInit: function () {
        var that = this;
        this.oModelItems = {
          selectedKey: "home",
          
          navigation: [
            {
              title: "Home",
              icon: "sap-icon://home",
              key:"home"
             
            },
          {
            title: "Open Invoice Items",
            icon: "sap-icon://travel-expense-report",
            key: "open_invioce",
            expanded: false,
            
          },
          {
            title: "Bank Statements",
            icon: "sap-icon://loan",
            key: "bank_details"
          },
          {
            title: "Matching ",
            key: "match",
            icon: "sap-icon://combine",
            expanded: false,
          },
          {
            title: "Cleared logs ",
            key: "cleardlogs",
            icon: "sap-icon://clear-all",
            expanded: false,
          },
          // {
          //   title: "Auto-Clearing ",
          //   key: "auto_clearing",
          //   icon: "sap-icon://clear-all",
          //   expanded: false,
          // },
          {
            title: "Auto-Clearing Statistics",
            icon: "sap-icon://key-user-settings",
            expanded: false,
          },
          
          {
            title: "Manager Scheduled SAP Clearing",
            icon: "sap-icon://manager",
            expanded: false,
            key: "root2"
          },
          
          {
            title: "Remittance Processing Filters",
            icon: "sap-icon://filter",
            expanded: false,
            key: "root6"
          },
          {
            title: "Mass Reset and Reversals",
            icon: "sap-icon://reset",
            expanded: false,
            key: "root4"
          },
          // {
          //   title: "Test",
          //   icon: "sap-icon://newspaper",
          //   expanded: false,
          //   key: "root5"
          // },
           
          ]
        };
        
        var oModel = new JSONModel(this.oModelItems);
        oModel.setSizeLimit(500);
        this.getView().setModel(oModel, "oModel");
        this.getOwnerComponent().getRouter().navTo("Routehome");
        
      },
    
      onItemSelect: function (oEvent) {
        var that = this;
        var item = oEvent.getParameter('item');
             if (item.getKey() == "home") {
          this.getOwnerComponent().getRouter().navTo("Routehome");
        
        }
        else if (item.getKey() == "open_invioce") {
          this.getOwnerComponent().getRouter().navTo("Routeopen_invoice");
        
      }else if (item.getKey() == "bank_details") {
          this.getOwnerComponent().getRouter().navTo("RouteBank");
        
      }else if (item.getKey() == "match") {
        this.getOwnerComponent().getRouter().navTo("Routematching");
      }
      else if (item.getKey() == "cleardlogs") {
        this.getOwnerComponent().getRouter().navTo("Routeclearedlogs");
      }
     
        else if (item.getKey() == "menu") {
          this.onMenuButtonPress();
        }
        
      },
    
      onMenuButtonPress: function () {
        var toolPage = this.byId("toolPage");
        toolPage.setSideExpanded(!toolPage.getSideExpanded());
      },
    
      onSelectForm: function (oEvent) {
        var param = oEvent.getParameters();
      },
    
      onDisplayForm: function (oEvent) {
    
         
    
        var param = oEvent.getParameters();
        this.getOwnerComponent().getRouter().navTo("revenue_header");
    
         
      },
    
      onManageForm: function (oEvent) {
    
        var item = oEvent.getParameter('item');
      
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("revenue_header", {}, true);
    
         
      }
        });
      }
    );
    
    
      