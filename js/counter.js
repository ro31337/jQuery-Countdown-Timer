

var gTicksLeft = 60 * 10 ;

var digit1 = 0;
var digit2 = 0;
var digit3 = 0;
var digit4 = 0;

var gIntervalToken = null;

function getTicksLeft() {
    return gTicksLeft;
}

function decTicksLeft() {
    gTicksLeft--;
}

function CounterInit() {
    //alert('aa');
    init();
	// strange chrome bug workaround
	$.timeout(function() {
		gIntervalToken = $.interval(tick, 1000);
	}, 100);
}

function init() {
    calculateDigits();
    setItem(1, digit1);
    setItem(2, digit2);
    setItem(4, digit3);
    setItem(5, digit4);
}

function setItem(itemNumber, digit){
    var token = "#counter_item" + itemNumber + " :first-child";
    var element = $(token).next(); // second child

    removeAllDigits(element);
    $(element).addClass("digit" + digit);
}

function calculateDigits() {
    var minutesLeft = Math.floor(getTicksLeft() / 60);
    var secondsLeft = getTicksLeft() - minutesLeft * 60;

    digit1 = Math.floor(minutesLeft / 10);
    digit2 = minutesLeft - digit1 * 10;

    digit3 = Math.floor(secondsLeft / 10);
    digit4 = secondsLeft - digit3 * 10;

    //$("#log").text("minutes left: " + minutesLeft + " | seconds left: " + secondsLeft + " | digits: " + digit1 + digit2 + ":" + digit3 + digit4);
}

function tick()
{
    calculateDigits();

    if (digit2 == 0 && digit3 == 0 && digit4 == 0)
        switchItem(1, digit1, 5);

    if (digit3 == 0 && digit4 == 0)
        switchItem(2, digit2, 9);

    if(digit4 == 0)
        switchItem(4, digit3, 5);

    switchItem(5, digit4, 9);

    decTicksLeft();

    if (getTicksLeft() == 0) {
        clearInterval(gIntervalToken);
        $.timeout(roll_to_end, 1000);
    }
}

function roll_to_end() {
    for (var itemNumber = 1; itemNumber <= 5; itemNumber++) {

        var token = "#counter_item" + itemNumber + " :first-child";
        var element = $(token).next(); // second child

        $(element).after('<div class="digit digit_cherry" style="margin-top: 55px"></div>');

        var newElement = $(element).next();
        $(element).animate({
            "margin-top": -55
        }, 500, function () { $(element).remove(); });

        $(newElement).animate({
            "margin-top": 0
        }, 500);
    }
    $.timeout(counter_finished, 1000);
}

function counter_finished() {
    alert("time's up!");

}

function switchItem(itemNumber, digit, capacity) {
    var nextDigit = (digit == 0) ? capacity : digit - 1;

    //$("#log2").text("digit" + digit + ", next digit: " + nextDigit);
    
    var token = "#counter_item" + itemNumber + " :first-child";
    var element = $(token).next(); // second child

    removeAllDigits(element);
    $(element).addClass("digit" + digit);
    $(element).after('<div class="digit digit' + nextDigit + '" style="margin-top: 55px"></div>');

    var newElement = $(element).next();
    $(element).animate({
        "margin-top": -55
    }, 500, function () { $(element).remove(); });

    $(newElement).animate({
        "margin-top": 0
    }, 500);

    //$(newElement).removeClass("digit_cherry");
}

function removeAllDigits(element) {
    $(element).removeClass("digit0");
    $(element).removeClass("digit1");
    $(element).removeClass("digit2");
    $(element).removeClass("digit3");
    $(element).removeClass("digit4");
    $(element).removeClass("digit5");
    $(element).removeClass("digit6");
    $(element).removeClass("digit7");
    $(element).removeClass("digit8");
    $(element).removeClass("digit9");
}