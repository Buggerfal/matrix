//-----------------------------------------------------------------//
// Объявляем пустой массив в который будем добавлять в будущем объекты символов.
// Так же для удобства создаем переменную со всеми настройками нашего символа

var matrix = [],
    config = {
        speeds: [5, 10, 15, 20, 25, 30, 35, 40, 6, 7, 8],
        minSize: 10,
        maxSize: 30,
        minPositionX: 1,
        maxPositionX: function () {
            var sizeWindowWidth = $(".placeForMatrix").width();
            return sizeWindowWidth - 10;
        }
    };


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//-----------------------------------------------------------------//
/*Общая функция для создания объекта (Символа) со всеми параметрами, принимает параметр inputObjMatrix
Так же этот параметр примают все фунции вызваны внутри его тела
Функция возращает временную переменную inputObjMatrix со всеми его значениями
*/

var allLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

function generate() {
    var text = allLetters[getRandomNumber(0, allLetters.length - 1)];//String.fromCharCode(48 + ~~(Math.random() * 42));
    var inputObjMatrix = {
        text: text,
        speed: config.speeds[getRandomNumber(0, config.speeds.length - 1)],
        size: getRandomNumber(config.minSize, config.maxSize),
        positionX: getRandomNumber(config.minPositionX, config.maxPositionX()),
        positionY: 0,
        elementId: text + "_" + getRandomNumber(1e4, 1e5)
    };


    matrix.push(inputObjMatrix);
};


//-----------------------------------------------------------------//
/*Функция которая генерирует n-количество(301) символов и выполняет проверку на их количество
Так же вызывается функция generate(); в теле for
*/

for (var i = 0; i < 300; i++) {
    generate();
}



//-----------------------------------------------------------------//
/* Функция которая двигает буквы в низ в зависимости от их скорости
Так же идет проверка на значение скорости, которое берется из конфига (переменная config) и задается отдельный стиль
Если координата У перевышает 750, то создаем новый обьект с помощью вызова функции ,после чего определаем его стили,а так же выводим его текст
*/

var stop = false;
var arr = "matrix".toUpperCase().split("");
var lastPositionX = 100;

function loop() {
    var allDivs = $("div");
    for (var i = 0; i < matrix.length; i++) {
        var innerObj = matrix[i];
        if (innerObj.text.toUpperCase() == arr[0] && innerObj.positionY == 400) {
            if (innerObj.positionX > lastPositionX && innerObj.positionX < lastPositionX + 50) {
                arr.splice(0, 1);
                allDivs = allDivs.not('#' + innerObj.elementId);
                $('#' + innerObj.elementId)
                    .css({
                        color: "red",
                        fontSize: config.maxSize
                    })
                    .addClass("dont_remove");
                matrix.splice(i, 1);
                lastPositionX += 50;
            }

        }
    }

    allDivs.not(".dont_remove").remove();
    for (var i = 0; i < matrix.length; i++) {
        var innerObj = matrix[i];
        innerObj.positionY += innerObj.speed;
        $("<div>").appendTo(".placeForMatrix")
            .text(innerObj.text)
            .attr("id", innerObj.elementId)
            .css({
                left: innerObj.positionX,
                top: innerObj.positionY,
                fontSize: innerObj.size
            });
        if (innerObj.positionY > 750) {
            matrix.splice(i, 1);
            generate();
        }
    }
    if (stop != true) {
        setTimeout(loop, 50);
    }

}



loop();

//Сделать слово по центру Matrix Download