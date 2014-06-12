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
            '您的製作資料已送出!<br/ >我們會儘快為您處理！' + 
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
                message: '購買序號不正確！',
                validators: {
                    notEmpty: {
                        message: '購買序號 需要被填寫！'
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: '購買序號長度是6個英文與數字組合！'
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
                        message: '驗證碼 資料需要被填寫！'
                    },
                    stringLength: {
                        min: 4,
                        max: 4,
                        message: '驗證碼長度是4個英文與數字組合！'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The serial number can only consist of alphabetical, number and underscore'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Email信箱 資料需要被填寫！'
                    },
                    emailAddress: {
                        message: '輸入的不是一個正確的 email address！'
                    }
                }
            },
            albumurl: {
                validators: {
                		notEmpty: {
                        message: 'facebook 相簿網址 資料需要被填寫！'
                    },
                    uri: {
                        message: '輸入的不是一個正確的 facebook 相簿網址！'
                    }
                }
            }
        },
        submitHandler: function(validator, form, submitButton) {
        		handleaddorderButtonClick();
        }
    });
});