(function($){

    // Insert the container elements
    $(document).ready(function(){
        $('body').append('<div id="container"></div>');
    });

    $.simplescroller = function(tvID){

        var currentSlide = {
            id: -1,
            time: -1
        }

        var nextSlide = {
            id: -1
        }

        /* Infinitely just go */
        while(true) {

            /* Returned JSON will be of the form:
             * '{"slides":[{"id":"3","length":"3000"},
             *             {"id":"5","length":"4000"}]}'
             * We will go through and grab the id and length for the first
             * item, and for the current item, and also the id for the next
             * item.  If we're unable to get an id for the current item, we
             * will default to the first item.
             */

            $.getJSON("/tv/" + tvID + "/array/", function(data) {

                var recieved = false;
                $.each( data.slides, function(index, value) {

                    currentSlide.time = -1;  // Reset to -1

                    if(currentSlide.id == -1){
                        /*
                         * We have just (re)started the slideshow
                         */
                        currentSlide.id = value.id;
                        currentSlide.time = value.time;

                    } else if(currentSlide.id == value.id){
                        /*
                         * This slide is scheduled to be shown now
                         */
                        currentSlide.time = value.time;

                    } else if(currentSlide.time >= 0){
                        /*
                         * We already have the current slide, so we should get
                         * the id of the next slide
                         */
                        nextSlide.id = value.id;
                        break;
                    }

                });

            });

            if(currentSlide.id == -1){        // Slideshow was empty
                setTimeout(
                    function()
                    {
                        continue;
                    }, 5000
                );
            }

            if(currentSlide.time == -1){
                /*
                 * We were not able to find the expected slide id.  We should
                 * restart at the first
                 */
                currentSlide.id = -1;
                continue;
            }

            var image = $('<img src="/slide/' + currentSlide.id + '">');

            $('#container').empty(); // Eventually replace this with transition
            $('#container').prepend(image);

            currentSlide.id = next.id;

            // Sleep until next slide
            setTimeout(
                function()
                {
                    continue;
                }, currentSlide.time
            );
        }
    }
});
