(function($) {
"use strict";

var gTicksLeft = 0;

var digit1 = 0;
var digit2 = 0;
var digit3 = 0;
var digit4 = 0;

var gIntervalToken = null;

var getTicksLeft = function() {
    return gTicksLeft;
};

var decTicksLeft = function() {
    gTicksLeft--;
};

var removeAllDigits = function($element) {
    $element.removeClass("digit0 digit1 digit2 digit3 digit4 digit5 digit6 digit7 digit8 digit9");
};

var setItem = function(itemNumber, digit) {
    var token = "#counter_item" + itemNumber + " :first-child";
    var $element = $(token).next(); // second child

    removeAllDigits($element);
    $element.addClass("digit" + digit);
};

var calculateDigits = function() {
    var minutesLeft = Math.floor(getTicksLeft() / 60);
    var secondsLeft = getTicksLeft() - minutesLeft * 60;

    digit1 = Math.floor(minutesLeft / 10);
    digit2 = minutesLeft - digit1 * 10;

    digit3 = Math.floor(secondsLeft / 10);
    digit4 = secondsLeft - digit3 * 10;

    //$("#log").text("minutes left: " + minutesLeft + " | seconds left: " + secondsLeft + " | digits: " + digit1 + digit2 + ":" + digit3 + digit4);
};

var init = function() {
    calculateDigits();
    setItem(1, digit1);
    setItem(2, digit2);
    setItem(4, digit3);
    setItem(5, digit4);
};

var switchItem = function(itemNumber, digit, capacity) {
    var nextDigit = (digit === 0) ? capacity : (digit - 1);

    //$("#log2").text("digit" + digit + ", next digit: " + nextDigit);

    var token = "#counter_item" + itemNumber + " :first-child";
    var $element = $(token).next(); // second child

    removeAllDigits($element);
    $element.addClass("digit" + digit);
    $element.after('<div class="digit digit' + nextDigit + '" style="margin-top: 55px"></div>');

    var $newElement = $element.next();
    $element.animate({
        "margin-top": -55
    }, 500, function () { $element.remove(); });

    $newElement.animate({
        "margin-top": 0
    }, 500);

};

var counterFinished = function() {
    alert("time's up!");
};

var rollToEnd = function() {
    for (var itemNumber = 1; itemNumber <= 5; itemNumber++) {

        var token = "#counter_item" + itemNumber + " :first-child";
        var $element = $(token).next(); // second child

        $element.after('<div class="digit digit_cherry" style="margin-top: 55px"></div>');

        var $newElement = $element.next();
        $element.animate({
            "margin-top": -55
        }, 500, function () { $element.remove(); });

        $newElement.animate({
            "margin-top": 0
        }, 500);
    }
    $.timeout(counterFinished, 1000);
};

var tick = function()
{
    calculateDigits();

    if(digit4 === 0) {
        if (digit3 === 0) {
            if (digit2 === 0) {
                switchItem(1, digit1, 5);
            }
            switchItem(2, digit2, 9);
        }
        switchItem(4, digit3, 5);
    }
    switchItem(5, digit4, 9);

    decTicksLeft();

    if (getTicksLeft() === 0) {
        clearInterval(gIntervalToken);
        gIntervalToken = null;
        $.timeout(rollToEnd, 1000);
    }
};

window.CounterInit = function(ticksCount) {
    if (ticksCount === null || isNaN(ticksCount)) {
        ticksCount = 10 * 60;
    }
    gTicksLeft = ticksCount;
    init();
    if (gIntervalToken !== null) {
        clearInterval(gIntervalToken);
        gIntervalToken = null;
    }
    // strange chrome bug workaround
    $.timeout(function() {
        gIntervalToken = $.interval(tick, 1000);
    }, 100);
};



})(jQuery);
