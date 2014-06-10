Parse.initialize("5zNYoISkgejDACEeVLaLGvIsbpQyOTpUtfJdzCS5", "GSxaMoGI8K9YQF6GvEwlXHoihOIsjCSFHlWHjg4O");

var addorderButton = document.getElementById('submit');
// addorderButton.onclick = handleaddorderButtonClick;


function handleaddorderButtonClick() {
  var serial 		 = document.getElementById('serial').value;
  var serialhash = document.getElementById('serialhash').value;
  var albumurl   = document.getElementById('albumurl').value;

  var Order = Parse.Object.extend("Order");
  var newOrder = new Order();
  newOrder.set("serial", serial);
  newOrder.set("serialhash", serialhash);
  newOrder.set("albumurl", albumurl);
  newOrder.save(null, {
	  success: function(newOrder) {
	    // Execute any logic that should take place after the object is saved.
			document.getElementById("contactForm").reset();
			$(".message").before(
        '<div class="alert alert-success alert-dismissable">'+
            '<button type="button" class="close" ' + 
                    'data-dismiss="alert" aria-hidden="true">' + 
                '&times;' + 
            '</button>' + 
            'Order has sented!' + 
         '</div>');			    
	  },
	  error: function(newOrder, error) {
	    // Execute any logic that should take place if the save fails.
	    
	  }
	});

}

// bootstrapValidator 
$(document).ready(function() {
    $('#contactForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            serial: {
                message: 'The serial number is not valid',
                validators: {
                    notEmpty: {
                        message: 'The serial number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: 'The serial number must be more than 6 and less than 6 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The serial number can only consist of alphabetical, number and underscore'
                    }
                }
            },
            serialhash: {
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            albumurl: {
                validators: {
                    notEmpty: {
                        message: 'The album url link is required and cannot be empty'
                    }
                }
            }
        },
        submitHandler: function(validator, form, submitButton) {
        		handleaddorderButtonClick();
        }
    });
});