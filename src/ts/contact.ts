/// <reference path="../../typings/index.d.ts" />


/// @file contacts.ts 
/// File for getting the message of the customer and sends it to the server
import * as $ from "jquery";
require("../js/jqBootstrapValidation");

/// @function jqBootstrapValidation(custom)
/// Gets input fields, validates, then sends to server. Derives from jqBootstrap.
$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
    },
    /// @function submitSuccess 
    /// Function to run when the validation has been competed. Will get value of form and send to server.
    submitSuccess: function ($form, event) {
        $("#btnSubmit").attr("disabled", true);
        event.preventDefault();

        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var message = $("textarea#message").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
            firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $.ajax({
            url: "contactInfo",
            type: "POST",
            data: {
                name: name,
                phone: phone,
                email: email,
                message: message
            },
            cache: false,
            /// @function success 
            /// Will change the state of the form displayed to the user.
            success: function () {
                $("#btnSubmit").attr("disabled", false);
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');

                //clear all fields
                $('#contactForm').trigger("reset");
            },
            /// @function error 
            /// Will display the error message to the user if the message was not sent.
            error: function () {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                $('#success > .alert-danger').append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");
            },
        });
    },
    filter: function () {
        return $(this).is(":visible");
    },
});

$("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});