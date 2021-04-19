$('body').on('click', '[data-tabs]', function(){

    id = $(this).attr('data-tabs');
    //переключатели
    $(this).toggleClass('active');
    //панели
    $('[data-pane='+id+']').toggleClass('active');
})

$('body').on('click', '.js_submit', function(e){
    e.preventDefault();

    var form = $(this).closest('.form'),
    field = form.find('.js_input'),
    url = form.attr('action'),
    form_data = form.serialize(),
    warning = form.find('.form__warning'),
    empty = 0;

    field.each(function(){
        if ($(this).val() == '') {
            $(this).addClass('invalid');
            empty++;
        }else{
            $(this).removeClass('invalid').addClass('valid');
        }
    });

    if (empty == 0) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: form_data,
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                // console.log(response);
            }
        });

    } else{
        warning.text('Please fill in all input fields');
    }
})

$('body').on('keyup blur', '.js_input', function(){
    var form = $(this).closest('.form'),
    btn = form.find('.js_submit'),
    warning = form.find('.form__warning');

    if ($(this).val() == '') {
        $(this).addClass('invalid');
        $(this).removeClass('valid');
    } else{
        $(this).removeClass('invalid').addClass('valid');
        $(this).addClass('valid');
        btn.removeClass('invalid');
        warning.text('');
    }

    if ($(this).hasClass('notEmpty')) {
        if ($(this).val() == '') {
            $(this).removeClass('notEmpty');
        }
    }

})

$('body').on('click', '.js_viewMore', function(){
    $('.gridEvents__row').removeClass('hidden');
    $(this).addClass('hidden');
})

$('body').on('click', '.js_viewMap', function(){
    $('.messageForm__box').removeClass('visible');
    $('.messageForm__box').addClass('hidden');
    $('.messageForm__box ~ .messageForm__btn').removeClass('hidden');
    $('.messageForm__box ~ .messageForm__btn').addClass('visible');
    $('.messageForm').addClass('viewOnlyButton');
})

$('body').on('click', '.js_viewForm', function(){
    $('.messageForm__box ~ .messageForm__btn').removeClass('visible');
    $('.messageForm__box ~ .messageForm__btn').addClass('hidden');
    $('.messageForm__box').removeClass('hidden');
    $('.messageForm__box').addClass('visible');
    $('.messageForm').removeClass('viewOnlyButton');
})

fontResize();
$(window).resize(function(){
    fontResize();
});

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function fontResize() {
    var windowWidth = $(window).width(),
        fontSize;
        if (windowWidth > 992) {
            fontSize = windowWidth*0.0117 + 0.241;
        } else {
            fontSize = windowWidth*0.014 + 0.241;
        }
	$('body').css('fontSize', fontSize + 'px');
}

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    var myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        controls: ['zoomControl'],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark(
            [55.76, 37.64]
        );
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}