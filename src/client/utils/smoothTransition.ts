import * as $ from "jquery";
import "smoothstate";

var $page = $('#main'),
options = {
    debug: true,
    prefetch: true,
    cacheLength: 2,
    forms: 'form',
    ///Run once the page is about to go
    onStart: {
        duration: 500, // Duration of our animation
        render: function ($container:any) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
        }
    },
    ///Called once the old animation is ready and the new content is ready
    onReady: {
        duration: 0,
        render: function ($container: any, $newContent:any) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            //Render the new html page.
            $container.html($newContent);
        }

    }
},
smoothState = $page.smoothState(options).data('smoothState');
