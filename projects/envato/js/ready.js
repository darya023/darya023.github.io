$(document).ready(function(){
    $('[type=tel]').inputmask("+7(999)999 99 99",{
        showMaskOnHover: false,
        "onincomplete": function(){
            $(this).removeClass('valid');
            $(this).addClass('invalid');
            if ($(this).val() != '') {
                $(this).addClass('notEmpty');
            }
        }
    });


    $('#name').inputmask({ showMaskOnHover: false, showMaskOnFocus: false, regex: "\\D+"});

    $('#email, #messageEmail').inputmask({
        showMaskOnHover: false,
        showMaskOnFocus: false,
        regex: "(.?)|(([0-9A-Za-z!#$%&'*+/=?^_`{|}~\.\-]+@[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]+(\.[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]+)+)",
        placeholder: '',
        "onincomplete": function(){
            $(this).removeClass('valid');
            $(this).addClass('invalid');
            if ($(this).val() != '') {
                $(this).addClass('notEmpty');
            }
        },
        greedy: false,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
    });
});
