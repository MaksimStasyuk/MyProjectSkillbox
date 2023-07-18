//Валидация формы добавления клиента
export const validateClientForm = () => {
    const $userName = document.getElementById('validationName'),
        $userSurname = document.getElementById('validationSurname'),
        $userLastName = document.getElementById('validationLastName'),
        $blockContacts = document.querySelector('.modal__contact'),
        $errorBlock = document.querySelector('.modal__error'),
        $unacceptableLetter = document.getElementById('unacceptableLetter'),
        $writeName = document.getElementById('writeName'),
        $writeSurname = document.getElementById('writeSurname'),
        $writeLastName = document.getElementById('writeLastName'),
        $requiredValue = document.getElementById('requiredValue'),
        validateArray = [$unacceptableLetter, $writeName, $writeSurname, $writeLastName, $requiredValue],
        regexp = /[^а-яА-ЯёЁ]+$/g;

    const resetStyleAfter = input => {
        input.style.borderColor = 'rgba(200, 197, 209, .5)';
        $blockContacts.style.marginBottom = '25px';
        $errorBlock.style.margin = '0px';
    }

    const resetStyleBefore = input => {
        input.style.borderColor = '#F06A4D';
        $blockContacts.style.marginBottom = '8px';
        $errorBlock.style.margin = '9px';
    }

    const onInputValue = input => {
        input.addEventListener('input', () => {
            resetStyleAfter(input);
            for (const item of validateArray) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            resetStyleAfter(input);
            for (const item of validateArray) {
                item.textContent = '';
            }
        };

        input.onchange = () => {
            resetStyleAfter(input);
            if ($userSurname.value && $userName.value && $userLastName.value) {
                for (const item of validateArray) {
                    item.textContent = '';
                }
            }
        }
    };

    onInputValue($userName);
    onInputValue($userSurname);
    onInputValue($userLastName);

    const checkRequiredName = (input, message, name) => {
        if (!input.value) {
            resetStyleBefore(input);
            message.textContent = `Введите ${name} клиента!`;
            return false;
        } else {
            message.textContent = '';
        }
        return true;
    };

    const checkByRegexp = (input, regexp) => {
        if (regexp.test(input.value)) {
            resetStyleBefore(input);
            $unacceptableLetter.textContent = 'Недопустимые символы!';
            return false;
        }
        return true;
    };

    if (!checkRequiredName($userSurname, $writeSurname, 'Фамилию')) { return false };
    if (!checkRequiredName($userName, $writeName, 'Имя')) { return false };
    if (!checkRequiredName($userLastName, $writeLastName, 'Отчество')) { return false };
    if (!checkByRegexp($userName, regexp)) { return false };
    if (!checkByRegexp($userSurname, regexp)) { return false };
    if (!checkByRegexp($userLastName, regexp)) { return false };

    return true;
}

//Валидация контактов клиента

export const validateContactsForm = ($contactType, $contactInput) => {
    const $writeValue = document.getElementById('writeName'),
        $blockContacts = document.querySelector('.modal__contact'),
        $errorBlock = document.querySelector('.modal__error'),
        onlyNumbers = /[^0-9]+$/g,
        onlyEmail = /[^a-zA-Z0-9_|@|.]+$/g;

    const onInputValue = input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'rgba(200, 197, 209, .5)';
            $writeValue.textContent = '';
            $blockContacts.style.marginBottom = '25px';
            $errorBlock.style.margin = '0px';
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'rgba(200, 197, 209, .5)';
            $writeValue.textContent = '';
            $blockContacts.style.marginBottom = '25px';
            $errorBlock.style.margin = '0px';
        };
    };

    const showErrorMessage = (message, block, input) => {
        block.textContent = message;
        input.style.borderColor = '#F06A4D';
        $blockContacts.style.marginBottom = '8px';
        $errorBlock.style.margin = '9px';
    };

    onInputValue($contactInput);

    if (!$contactInput.value) {
        showErrorMessage('Заполните все поля контактов!', $writeValue, $contactInput);
        return false;
    }

    switch ($contactType.innerHTML) {
        case 'Телефон':
            if (onlyNumbers.test($contactInput.value)) {
                showErrorMessage('Допустимы только цифры!', $writeValue, $contactInput);
                return false;
            } else if ($contactInput.value.length !== 11) {
                showErrorMessage('Номер должен состоять из 11 цифр!', $writeValue, $contactInput);
                return false;
            }
            return true;

        case 'Email':
            if (onlyEmail.test($contactInput.value)) {
                showErrorMessage('Непарвильный Email!', $writeValue, $contactInput);
                return false;
            }
            return true;

        default:
            return true;
    }
}