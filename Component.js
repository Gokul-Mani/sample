// /**
//  * eslint-disable @sap/ui5-jsdocs/no-jsdoc
//  */

// sap.ui.define([
//         "sap/ui/core/UIComponent",
//         "sap/ui/Device",
//         "autocleaning/cashapplication/model/models"
//     ],
//     function (UIComponent, Device, models) {
//         "use strict";

//         return UIComponent.extend("autocleaning.cashapplication.Component", {
//             metadata: {
//                 manifest: "json"
//             },

//             /**
//              * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
//              * @public
//              * @override
//              */
//             init: function () {
//                 // call the base component's init function
//                 UIComponent.prototype.init.apply(this, arguments);

//                 // enable routing
//                 this.getRouter().initialize();

//                 // set the device model
//                 this.setModel(models.createDeviceModel(), "device");
//             }
//         });
//     }
// );
 
// sap.ui.define([
//         "sap/ui/core/UIComponent",
//         "sap/ui/Device",
//         "autocleaning/autocleaning/model/models"
//     ],
//     function (UIComponent, Device, models) {
//         "use strict";

//         return UIComponent.extend("autocleaning.autocleaning.Component", {
//             metadata: {
//                 manifest: "json"
//             },

//             /**
//              * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
//              * @public
//              * @override
//              */
//             init: function () {
                
//                 var jQueryScript = document.createElement('script');
//                 jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
//                 document.head.appendChild(jQueryScript);

//                 var jQueryScript = document.createElement('script');
//                 jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
//                 document.head.appendChild(jQueryScript);

//                 // call the base component's init function
//                 UIComponent.prototype.init.apply(this, arguments);

//                 // enable routing
//                 this.getRouter().initialize();

//                 // set the device model
//                 this.setModel(models.createDeviceModel(), "device");
//                 var that = this;
//                 this.globalModel = {
//                     OpenItem: []

//                 };

//                 this.setModel(this.globalModel, "globalModel");
//                 document.body.style.zoom = "90%";
//             },

          
           
            
//         });
//     }
// );
/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
   "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "autocleaning/cashapplication/model/models",
    "sap/f/library",
	"sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/base/util/UriParameters"
],
    function (UIComponent, Device, models, library, FlexibleColumnLayoutSemanticHelper, UriParameters) {
        "use strict";

        return UIComponent.extend("autocleaning.cashapplication.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                
                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
                document.head.appendChild(jQueryScript);

                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
                document.head.appendChild(jQueryScript);

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                var that = this;
                this.globalModel = {
                    OpenItem: [],
                    

                };

                this.setModel(this.globalModel, "globalModel");
                document.body.style.zoom = "80%";
            },

          
            getHelper: function () {
                var LayoutType = library.LayoutType;
                var oFCL = this.getRootControl().byId("fcl"),
                    oParams = UriParameters.fromQuery(location.search),
                    oSettings = {
                        defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                        mode: oParams.get("mode"),
                        maxColumnsCount: oParams.get("max")
                    };
    
                return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
            }
            
        });
    }
);