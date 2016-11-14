import * as $ from "jquery";
import "smoothstate";
var $body = $('html, body'); 
var content = $('#main').smoothState({
    // onStart runs as soon as link has been activated
    onStart: {

        // Set the duration of our animation
        duration: 250,

        // Alterations to the page
        render: function () {

            // Quickly toggles a class and restarts css animations
            content.toggleAnimationClass('is-exiting');
            $body.animate({ 'scrollTop': 0 });
        }
    }
}).data('smoothState'); // makes public methods available
