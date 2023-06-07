/*global QUnit*/

sap.ui.define([
	"autocleaning/cashapplication/controller/open_invoice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("open_invoice Controller");

	QUnit.test("I should test the open_invoice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
