$(document).on(`page:load page:change`, function(event) {
    var prepaid_offer_html = `<div class="section__header" style="
        background-color: #03a196;
        padding: 12px 8px;
        color: #ffffff;
        text-align: center;
        border-radius: 4px;
    ">

          <p class="section__text" style="
        margin: 0px;
    ">Avail Rs. 100 off your order with code PREPAID by paying online now  via Razorpay/Paytm/UPI</p>
        </div>`
    $(".section--payment-method").prepend(prepaid_offer_html)
    if($('input[name="checkout[payment_gateway]"]:checked').val() == "64480837791" && $(".reduction-code__text:first").text()=="PREPAIDTEST"))}
        $(".tags-list .tag:first .tag__button").click()
    }
});

$(document).on(`page:load`, function(event) {
    if($('input[name="checkout[payment_gateway]"]:checked').val() != "64480837791" && $(".reduction-code__text:first").text().length==0){
        $("#checkout_reduction_code_mobile")[0].value = "PREPAIDTEST";
        $("#checkout_reduction_code_mobile").parent().next().removeAttr("disabled").click();
    }
});
