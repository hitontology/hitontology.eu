/*
RDForm Hooks-File - to hook in on certain points of application execution

Variables:
_this.rdform 	- The RDForm-class. Plublic functions can accessed like: _this.rdform.showAlert( "info", "...");
_this.$elem 	- The form element
*/
RDForm_Hooks.prototype = {
	// after model is parsed - init form handlers
	__initFormHandlers: function () {
		var _this = this;
		// example: check valid e-mail on change
		// this doesnt prevend submitting the form!
		_this.$elem.find('input[name="foaf:mbox"]').change(function () {
			$("." + _this.rdform._ID_ + "-alert").html("");
			var val = $(this).val();
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) == false) {
				_this.rdform.showAlert("warning", "Invalid E-mail Address, please try again.");
			}
		});
	},

	__beforeInsertData: function () {
		var _this = this;
		//add loading msg on insert data
		_this.rdform.alertArea.append($('<div class="alert alert-info loading rdform-loading-msg">Eigenschaften werden geladen. Bitte warten - </div>').hide());
	},

	// on insert literal value, return value
	__insertLiteral: function (uri, input, value) {
		var _this = this;

		return value;
	},

	// on insert a existing resource into the form
	// get and return i and di for asynchronus call
	// i=relation, di=index, resource=resourceUri
	__insertResource: function (i, di, resource, callback) {
		callback(i, di, resource);
	},

	// after instert existing data into the form
	__afterInsertData: function () {
		var _this = this;
	},

	// after adding a property
	__afterAddProperty: function (thisPropertyContainer) {
		var _this = this;
		var thisProperty = thisPropertyContainer.find("." + _this.rdform._ID_ + "-property").first();
	},

	// after adding a property
	__afterDuplicateProperty: function (thisPropertyContainer) {
		var _this = this;
		var thisProperty = thisPropertyContainer.find("." + _this.rdform._ID_ + "-property").first();
	},

	// after adding a property
	__beforeRemoveProperty: function (thisPropertyContainer) {
		var _this = this;
		var thisProperty = thisPropertyContainer.find("." + _this.rdform._ID_ + "-property").first();
	},

	// validate form-input on change value or on submit the form
	__userInputValidation: function (property) {
		var _this = this;
		// return false if property value is not valid
	},

	// get the the item for the result-search list on autocomplete
	__autocompleteGetItem: function (item) {
		// e.g. change the label as: item.label.value = "My val: " + item.label.value;
		return item;
	},

	// before creating the result object from the html form
	__createResult: function () {
		var _this = this;
	},

	// before creating the class properties from input values
	__createResultClassProperty: function (propertyContainer) {
		var _this = this;
	},

	// before generating the class object from input values and properties
	__createClass: function (thisClass) {
		var _this = this;
	},

	// on write the value to in input field, value could changed an returned here
	__writeWildcardValue: function (input, value) {
		var _this = this;
		return value;
	},

	// wildcard functions, too apply functions to wildcard values in your templates
	// use e.g: <input name="id" type="literal" value="{(replace)foaf:name}" /> and change the replace function below as required
	// your can also add custom functions here and use in your templates
	__wildcardFcts: function () {
		var _this = this;
		return {
			// sample replace function, replace spaces with "-" (instead "_" by default)
			replace: function (str) {
				return str.replace(/ /g, "-");
			},
			// sample base function, get base (last part) from url, e.g. base of "http://foo/bar" is "bar"
			base: function (str) {
				return str.split("/").reverse()[0];
			},
			// sample hash function, get string hash from string
			hash: function (str) {
				return (str.length * Math.random()).toString(36).slice(2);
			},
		};
	},
}; // end of hooks

/*
RDForm_Hooks class. Normally you dont need to edit this
*/
function RDForm_Hooks(rdform) {
	this.rdform = rdform;
	this.$elem = rdform.$elem;
	return this;
}
