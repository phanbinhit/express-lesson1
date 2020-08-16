$(document).ready(function(){
    $('table').on('click', 'button',function() {
        $(this).closest('tr').remove();
        var id = $(this).data("id");
        getTotal()
        $.ajax({
            url: '/cart/delete',
            type: 'POST',
            data: {id: id}
        });
    });

    getTotal();

    function getTotal() {
        var prices = [];
        var numbers = [];
        var total = 0;

        $('.price').each(function(index, data) {
            prices.push(parseInt($(this).text()));    
        });

        $('.number').each(function(index, data) {
            numbers.push(parseInt($(this).text()));    
        });

        for (var i = 0; i < prices.length; i++) {
            total += prices[i] * numbers[i];
        }

        $('.total').html("Total: " + total);
    }
});
