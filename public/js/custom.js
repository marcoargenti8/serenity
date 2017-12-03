
$(function() {
    $('#formEmail').on('submit', function(e) {
        e.preventDefault();
        var data =  $(this).serialize();
        $.post('/submit/mail', data, function(result) {
            if(result.sent == true) {
            	$('#modalEmailSuccess').show();
            } else {
            	$('#modalEmailError').show();
            }
        });
    });



    // function toggleIcon(e) {
    //     $(e.target)
    //         .prev('.panel-heading')
    //         .find(".more-less")
    //         .toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
    // };
    // $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    // $('.panel-group').on('shown.bs.collapse', toggleIcon);

    $('a').on('click', function(event) {
      // Get the element and its href attribute.
        var $element = $(event.target);
        var link = $element.attr('href');
        console.log("Redirect to external link" + link);

        if (link.substr(0, 4) == 'http') {
            // If the link starts with http, assume external link.
            // In that case, block normal behaviour, insert custom content and navigate after 5 seconds.
            var continueRedirect = confirm("Stai per lasciare il sito ed essere rediretto verso: \n" + link + "\n\nVuoi continuare?");

            if(continueRedirect){
                console.log("Redirect to external link" + link);
                document.location.href = link;
            } else {
                event.preventDefault();
            }
        }
    });
});


