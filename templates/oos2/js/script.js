/**
 * проверяем, указаны ли данные для быстрого платежа
 */
function isFastPayment() {
    return $(".fast-payment").length > 0;
}

/**
 * в случае быстрого платежа
 * заменяем id,name чтобы не было отправки данных карты, отключаем маски ввода
 */
function makeFieldFake(jQueryElem) {
    var user_agent = navigator.userAgent;
    var isAndroid = user_agent.match(/android/i);
    jQueryElem.attr("name", jQueryElem.attr("name") + "_fake");
    jQueryElem.attr("id", jQueryElem.attr("id") + "_fake");
    jQueryElem.addClass("noerror").addClass("good");
    jQueryElem.attr("disabled", "disabled");
    if (!isAndroid) {
        jQueryElem.unmask();
    }
}

/**
 * обратное преобразование, если хотим сменить карту
 */
function makeFieldActual(jQueryElem) {
    jQueryElem.attr("name", jQueryElem.attr("name").replace(/_fake$/, ''));
    jQueryElem.attr("id", jQueryElem.attr("id").replace(/_fake$/, ''));
    jQueryElem.removeClass("noerror").removeClass("good").val("");
    jQueryElem.removeAttr("disabled");
}

/**
 * после обратного преобразования, необходимо восстановить маски
 */
function ApplyMasks() {
    //$("#card").mask("?9999 9999 9999 9999 999", { placeholder: " " });
    $("#card").mask("0000 0000 0000 0000 999", { placeholder: " " });
    $("#EXP").mask("99", { autoclear: true });
    $("#EXP_YEAR").mask("99", { autoclear: true });
    $("#phone").mask("+9 (999) 999-9999", { placeholder: " " });
}

/**
 * отмечаем платежную систему, соответствующую карте
 */
function markPaySystem(jqueryElementCard, card_type) {
    //for desktop
    var _cover;
    if ($(".card-front__pslogo").width() > 0) {
        _cover = $(".card-front__pslogo");
        _cover.removeClass("visa mir mastercard maestro visaelectron upi").addClass(card_type);
        if (card_type.length == 0) return;
        _cover.addClass(card_type);
        if (card_type != "upi") {
            $("body").removeAttr("id");
        } else $("body").attr("id", "unionpay");
    }
    // desktop widget
    if ($(".card-front__pslogo__cover").width() > 0) {
        _cover = $(".card-front__pslogo__cover");
        _cover.removeClass("visa mir mastercard maestro visaelectron upi").addClass(card_type);
        if (card_type.length == 0) return;
        _cover.addClass(card_type);
        if (card_type != "upi") {
            $("body").removeAttr("id");
        } else $("body").attr("id", "unionpay");
    }
    //for mobile
    else {
        var _card_front = $(".card-front__input");
        _card_front.removeClass("visa mir mastercard maestro visaelectron upi").addClass("card-front__input");
        if (card_type.length == 0) return;
        _card_front.addClass(card_type);
        if (card_type != "upi") {
            $("body").removeAttr("id");
        } else $("body").attr("id", "unionpay");
    }
}

function clearPaySystem(jqueryElementCard) {
    //  jqueryElementCard.removeClass("visa mir mastercard maestro visaelectron upi");
    $("body").removeClass("upi");
    if ($(".card-front__pslogo").width() > 0) {
        var _cover = $(".card-front__pslogo");
        _cover.removeClass("visa mir mastercard maestro visaelectron upi");
    } else {
        var _card_front = $(".card-front__input");
        _card_front.removeClass("visa mir mastercard maestro visaelectron upi");
    }
}

/**
 * switch language on multilanguaged page elements
 * 
 */
function switch_language(active_lang, target_lang) {
    if (target_lang == undefined || typeof target_lang != "string" ||
        active_lang == undefined || typeof active_lang != "string") return true;

    //перебираем элементы с имеющимися переводами на указанный язык
    var target_attribute = 'data-lang-' + target_lang;
    $('*[' + target_attribute + ']').each(function() {
        var to_replace = $(this).attr('data-lang-' + active_lang);
        //для title отдельно
        if ($(this).is("title")) {
            $(document).prop('title', $(this).attr(target_attribute));
            $(this).html($(this).attr(target_attribute));
        } else
        //для img меняем значение src
        if ($(this).is("img")) {
            $(this).attr("src", $(this).attr("src").replace(to_replace, $(this).attr(target_attribute)));
        } else
        //в некоторых случаях меняем атрибут
        if ($(this).hasClass("lang-change-attr")) {
            var attrTochange = $(this).attr("lang-change-target");
            $(this).attr(attrTochange, $(this).attr(attrTochange).replace(to_replace, $(this).attr(target_attribute)));
        } else
        //для input - меняем значение placeholder или value если первого нет
        if ($(this).is("input")) {
            if ($(this).attr('placeholder') !== undefined)
                $(this).attr("placeholder", $(this).attr("placeholder").replace(to_replace, $(this).attr(target_attribute)));
            else $(this).attr("value", $(this).attr("value").replace(to_replace, $(this).attr(target_attribute)));
        } else
        //для a
        if ($(this).is("a")) {
            // - заменяем ссылку
            if ($(this).prop("href").indexOf(to_replace) >= 0) {
                $(this).prop("href", $(this).prop("href").replace(to_replace, $(this).attr(target_attribute)));
            } else
            if ($(this).html().indexOf(to_replace) >= 0 && $(this).attr("id") != undefined) {
                $("#" + $(this).attr("id")).html($(this).html().replace(to_replace, $(this).attr(target_attribute)));
            }

        }
        //в остальных случаях меняем innerHTML - заменяем только подстроки касающиеся атрибутов
        else {
            //$(this).html($(this).html().replace(to_replace,$(this).attr(target_attribute)));
            if ($(this).is("b") && $(this).parent().is("a")) {
                to_replace = $(this).html();
                $("a b").html($(this).html().replace(to_replace, $(this).attr(target_attribute)));
            }
            if ($(this).is("b") && $(this).parent().is("")) {
                to_replace = $(this).html();
                $("a b").html($(this).html().replace(to_replace, $(this).attr(target_attribute)));
            } else if ($(this).hasClass("offert-text")) {
                $(".offert-text").html($(this).html().replace(to_replace, $(this).attr(target_attribute)));
            } else if ($(this).attr("id") == "supporttext") {
                var s = $("#supporttext").html();
                to_replace = $(this).html();
                s = s.replace(to_replace, $(this).attr(target_attribute));
                $("#supporttext").html(s);
            } else {
                //$(this)[0].innerHTML = $(this).html().replace(to_replace,$(this).attr(target_attribute));
                $(this).html($(this).html().replace(to_replace, $(this).attr(target_attribute)));
            }
        }
    });

    //в .each это не меняется, меняем вручную
    if ($(".about-the-bank").length > 0) {
        $(".about-the-bank").prop("href", $(".about-the-bank").attr(target_attribute));
    }

    //устанавливаем значение в форме, чтобы передать изменения дальше
    if ($("input[name='displayLanguage']").length > 0) {
        $("input[name='displayLanguage']").val(target_lang);
    }
}

/**
 * switch language on multilanguaged page elements
 * 
 */
function switch_language_to(target_lang) {
    if (target_lang == undefined || typeof target_lang != "string") return true;
    //язык активный на момент переключения
    //var active_lang = $(".payform-lang li.active").html().toLowerCase();
    var active_lang = $("body").attr("curlang");
    switch_language(active_lang, target_lang);
}

/**
 * detecting card type from its number
 * 
 * @param card_num
 * 
 * @returns {String}
 */
function get_card_type(card_num) {
    switch (true) {
        case (card_num.match(/^5[1-5]/) != null):
            return "mastercard";
        case (card_num.length >= 2 && (card_num.match(/^6(?!(2|011|5))/) != null || card_num.match(/^5[0,6,7,8]/) != null)):
            return "maestro";
        case (card_num.match(/^(42768[0-9]|476206|418873|447520)/) != null):
            //return "visaelectron";
            return "visa";
        case (card_num.match(/^4/) != null):
            return "visa";
        case (card_num.match(/^22/) != null):
            return "mir";
        case (card_num.match(/^62/) != null):
            return "upi";
        default:
            return "";
    }
}

function cl(Luhn) {
    var sum = 0;
    for (i = 0; i < Luhn.length; i++) {
        sum += parseInt(Luhn.substring(i, i + 1));
    }
    var delta = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (i = Luhn.length - 1; i >= 0; i -= 2) {
        var deltaIndex = parseInt(Luhn.substring(i, i + 1));
        var deltaValue = delta[deltaIndex];
        sum += deltaValue;
    }
    var mod10 = sum % 10;
    mod10 = 10 - mod10;
    if (mod10 == 10) {
        mod10 = 0;
    }
    return mod10;
}

//для полей ММ и ГГ проверяем переполнение - если есть уже две цифры, то при внесении
//третьей чистим поле, ставим введенное первым, курсор сразу после цифры
function check_mmgg_input(e, event) {

    if (!event.type == "keypress" || !(parseInt(event.key) >= 0)) return true;
    var clear_value = $(e).val().replace('_', '');
    //проверяем диапазоны:

    if ($(e).attr('name') == "EXP" && clear_value.length < 2) {
        var new_value = 0;
        if ($(e).caret().begin == 0) new_value = event.key + "" + clear_value;
        else new_value = parseInt(clear_value + "" + event.key);
        if (new_value > 12) {
            $(e).addClass('error');
        } else if (clear_value === 0 && event.key == 0) {
            $(e).addClass('error');
        } else $(e).removeClass('error');
    } else
    if (($(e).attr('name') == "EXP" && event.type == "keypress" && clear_value.length == 2 ||
            $(e).attr('name') == "EXP_YEAR" && event.type == "keypress" && clear_value.length == 2) && !isMobileAndroid) {
        $(e).unmask();
        $(e).val(event.key);
        $(e).mask("99", { autoclear: true });
        $(e).get(0).setSelectionRange(1, 1);
    }
    //return true;
}

function s() {
    var s = "";
    if (typeof document.payform.CARD !== "undefined") {
        s = document.payform.CARD.value;
        s = s.replace(/ /g, "");
        document.payform.CARD.value = s;
    }
    if (typeof document.payform.phone !== "undefined") {
        s = document.payform.phone.value;
        s = s.replace(/[ \-()]/g, "");
        if (s == "+" || s == "+7") s = "";
        document.payform.phone.value = s;
    }
    if (typeof document.payform.email !== "undefined") document.payform.email.name = "notify_email";
    return true;
}

// Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}