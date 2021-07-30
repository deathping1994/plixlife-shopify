$(document).on(`page:load page:change`, function(event) {
    if($(".step__sections .section--contact-information .layout-flex__item span").length > 0){
        $(".step__sections .section--contact-information .layout-flex__item span").text("Login to use your Plixlife Wallet Balance")
    }
    var flag_wallet_applied = false
    if ($(".tags-list .tag:last-child").length > 0) {
        $(".tags-list .tag:last-child").each(function() {
            var tag_text = $(this).find(".tag__wrapper .reduction-code span:first").text()
            var tag_new_text = "Wallet Applied"
            if (tag_text.startsWith("••••")) {
                $(this).find(".tag__wrapper .reduction-code span:first").text(tag_new_text)
                flag_wallet_applied = true
            }
            if (tag_text.startsWith("Wallet Applied")) {
                $(".farziwallet-div").hide()
                flag_wallet_applied = true
            }
            var line_text = $(".total-line.total-line--reduction:last-child span:first").text()
            if (line_text.startsWith("Gift card")) {
                $(".total-line.total-line--reduction:last-child span:first").text("Wallet")
                $(".total-line.total-line--reduction:last-child span.reduction-code").remove()
            }
        })
    }
    if ($(".farziwallet-div").length == 0) {
        var customer_id = Shopify.Checkout.customer.customer_id
        var settings = {
            "url": "https://farzipromo-api-stage.farziengineer.co/walletbalance",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": `{
            "customer_id": ` + customer_id + `
            }`,
        };
        $.ajax(settings).done(function(response) {
            var wallet_div = `<div class="farziwallet-div" style="
                margin-top: 30px;
                background: #fff;
                background-clip: padding-box;
                border: 1px solid #d9d9d9;
                border-radius: 5px;
                color: #545454;
                padding: 1.14em;
            ">
            <input type="checkbox" name="farziwallet" value="yes" id="farziwallet" style="/* -webkit-appearance: checkbox; */width: 1.3em;height: 1.3em;background-color: #ffffff;border-radius: 50%;vertical-align: middle;border: 1px solid #d9d9d9;-webkit-appearance: none;outline: none;cursor: pointer;/* padding-right: 1.75em; */">
            <label for="farziwallet" style="
                font-weight: 500;
                padding-left: .75em;
            ">Use Wallet Balance</label><br>
            <div style="padding-left: 2.3em;height: 30px;display: flex;align-items: center;"><img src="https://img.icons8.com/ios-glyphs/30/000000/wallet-app.png" style="
            "><span style="
                font-weight: 500;
                padding-left: 12px;
            ">` + "₹" + response.wallet_balance + `</span></div>
            </div>`
            $(wallet_div).insertBefore($('.section.section--payment-method'))
            if(flag_wallet_applied==true){
                $('input[type=checkbox][name=farziwallet]').prop("checked",true)
                $("input[type=checkbox][name=farziwallet]").css('background', '#03a196');
            }
            $('input[type=checkbox][name=farziwallet]').on('change' , (function() {
                $("input[type=checkbox][name=farziwallet]").css('background', '#03a196');
                if (!this.checked){
                    $(".tags-list .tag:last-child .tag__button").click()
                }
                if (this.checked && response.wallet_balance > 0) {
                    $("#checkout_reduction_code").css("color", "#ffffff")
                    $("#checkout_reduction_code")[0].value = response.gc;
                    $("#checkout_reduction_code").parent().next().removeAttr("disabled").click();
                    setTimeout(function(){
                        $("#checkout_reduction_code").removeAttr("style")
                    }, 3000);
                    var tag_list_interval = setInterval(()=>{
                        if ($(".tags-list .tag:last-child").length > 0) {
                            $(".tags-list .tag:last-child").each(function() {
                                var tag_text = $(this).find(".tag__wrapper .reduction-code span:first").text()
                                var tag_new_text = "Wallet Applied"
                                if (tag_text.startsWith("••••")) {
                                    $(this).find(".tag__wrapper .reduction-code span:first").text(tag_new_text)
                                }
                                var line_text = $(".total-line.total-line--reduction:last-child span:first").text()
                                if (line_text.startsWith("Gift card")) {
                                    $(".total-line.total-line--reduction:last-child span:first").text("Wallet")
                                    $(".total-line.total-line--reduction:last-child span.reduction-code").remove()
                                }
                            })
                        }
                    }
                    , 100);
                }
            }));
            if(event.type=="page:load"){
                $('input[type=checkbox][name=farziwallet]').click()
            }
        }).fail(function(xhr, status, error) {
            console.log(xhr.responseText)
        });
    }
});

$(document).on(`page:load`, function() {
    if ($(".farziwallet-div").length != 0 && $('input[type=checkbox][name=farziwallet]').prop("checked") == false) {
        $('input[type=checkbox][name=farziwallet]').click()
    }
})
