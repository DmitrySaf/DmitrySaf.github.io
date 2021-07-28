import './dropdown-checkbox.sass';

$('#arrow-checkbox').on('click', () => {
    $('.dropdown-checkbox_content').toggleClass('show');
    if ($('.dropdown-checkbox_content').hasClass('show')) {
        $('#arrow-checkbox').css('transform', 'rotate(180deg)');
    } else {
        $('#arrow-checkbox').css('transform', 'rotate(0deg)');
    }
});