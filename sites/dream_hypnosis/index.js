const start = () => {
    let result = document.querySelector('#result');

    const Get__1__Num = digit => {
        switch (digit) {
            case '0':
                return '';
            case '1':
                return 'jeden';
            case '2':
                return 'dwa';
            case '3':
                return 'trzy';
            case '4':
                return 'cztery';
            case '5':
                return 'pięć';
            case '6':
                return 'sześć';
            case '7':
                return 'siedem';
            case '8':
                return 'osiem';
            case '9':
                return 'dziewięć';
        }
    }

    const Get__1x__Num = digits => {
        switch (digits) {
            case '10':
                return 'dziesięć';
            case '11':
                return 'jedenaście';
            case '12':
                return 'dwanaście';
            case '13':
                return 'trzynaście';
            case '14':
                return 'czternaście';
            case '15':
                return 'piętnaście';
            case '16':
                return 'szesnaście';
            case '17':
                return 'siedemnaście';
            case '18':
                return 'osiemnaście';
            case '19':
                return 'dziewiętnaście';
        }
    }

    const Get__2__Num = digit => {
        switch (digit) {
            case '0':
                return '';
            case '2':
                return 'dwadzieścia';
            case '3':
                return 'trzydzieści';
            case '4':
                return 'czterdzieści';
            case '5':
                return 'piędziesiąt';
            case '6':
                return 'sześćdziesiąt';
            case '7':
                return 'siedemdziesiąt';
            case '8':
                return 'osiemdziesiąt';
            case '9':
                return 'dziewięćdziesiąt';
        }

        let res = Get__1__Num(digit);
        return res + 'dziesiąt';
    }

    const Get__3__Num = digit => {
        switch (digit) {
            case '1':
                return 'sto';
            case '2':
                return 'dwieście';
            case '3':
                return 'trzysta';
            case '4':
                return 'czterysta';
            case '5':
                return 'pięćset';
            case '6':
                return 'sześćset';
            case '7':
                return 'siedemset';
            case '8':
                return 'osiemset';
            case '9':
                return 'dziewiećset';
        }

        let res = Get__1__Num(digit);
        return res + 'set';
    }

    const Get__4__Num = digit => {
        switch (digit) {
            case '1':
                return 'tysiąc';
            case '2':
                return 'dwa tysiące';
            case '3':
                return 'trzy tysiące';
            case '4':
                return 'cztery tysiące';
            case '5':
                return 'pięć tysięcy';
            case '6':
                return 'sześć tysięcy';
            case '7':
                return 'siedem tysięcy';
            case '8':
                return 'osiem tysięcy';
            case '9':
                return 'dziewięć tysięcy';
        }

        let res = Get__1__Num(digit);
        return res + ' tysięcy';
    }

    const NumToWord = num => {
        if (num > 10000) { return 'n__i__e__s__k__o__ń__c__z__o__n__o__ś__ć'; }

        let txt = num.toString();
        let index = 1;
        let result = '';
        let firstDigit = txt[txt.length - 1];

        for (let i = txt.length - 1; i >= 0; i--) {
            let digit = txt[i];

            if (index == 1) result = Get__1__Num(digit); // 1-9
            if (txt.length == 1 && index == 1 && firstDigit == '0') result = 'zero'; // zero
            if (index == 2 && digit == '1') result = Get__1x__Num(digit + firstDigit); // 10-19
            if (index == 2 && digit != '1') { // 20-99
                if (firstDigit != '0') {
                    result = Get__2__Num(digit) + ' ' + result;
                } else {
                    result = Get__2__Num(digit);
                }
            }
            if (index == 3 && !(txt.length == 4 && digit == '0')) { // 100-999
                let secondDigit = txt[txt.length - 2];
                if (secondDigit == '0' && firstDigit == '0') {
                    result = Get__3__Num(digit);
                } else {
                    result = Get__3__Num(digit) + ' ' + result;
                }
            }
            if (index == 4) { // 1000-9999
                let secondDigit = txt[txt.length - 2];
                let thirdDigit = txt[txt.length - 3];
                if (thirdDigit == '0' && secondDigit == '0' && firstDigit == '0') {
                    result = Get__4__Num(digit);
                } else {
                    result = Get__4__Num(digit) + ' ' + result;
                }
            }
            index++;
        }

        return result;
    }

    let index = 1;
    const delta = 1000;
    result.style.transition = 'all ' + (delta / 1000) + 's';
    setInterval(() => {
        result.innerHTML = NumToWord(index);
        result.style.opacity = 1;

        setTimeout(() => {
            result.style.opacity = 0;
        }, 3 * delta);

        setTimeout(() => {
            index++;
        }, 5.5 * delta);

    }, 6 * delta);
}

start();

const ColorChange = () => {
    let colors = [
        '#0088cc',
        '#a64dff',
        '#e60073',
        '#ff0000',
        '#e6b800',
        '#739900',
        '#009933',
        '#00cc7a',
    ];
    let color_rect = document.querySelector('#color_rect');
    let lastColor = null;

    const GetRandomColor = () => {
        let RandomNum = () => Math.floor(Math.random() * colors.length);

        let random = RandomNum();
        while (random == lastColor) {
            random = RandomNum();
        }
        lastColor = random;

        return colors[random];
    };

    color_rect.style.backgroundColor = GetRandomColor();

    setInterval(() => {
        color_rect.style.backgroundColor = GetRandomColor();
    }, 5000, GetRandomColor);
}
ColorChange();