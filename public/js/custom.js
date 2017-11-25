
$(function(){
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
});