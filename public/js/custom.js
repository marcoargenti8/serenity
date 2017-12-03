
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


function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);
