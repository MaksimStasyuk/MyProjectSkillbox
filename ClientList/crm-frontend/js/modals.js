import { sendClientData } from "./clientsApi.js";
import { createClientItem } from "./main.js";
import { validateClientForm, validateContactsForm } from "./validate.js";
import { icons } from './icons.js';


//Создание контента модального окна
export const createClientsForm = () => {
    const $modalTitle = document.createElement('h2'),
        $modalClose = document.createElement('button'),
        $form = document.createElement('form'),
        $labelName = document.createElement('label'),
        $inputName = document.createElement('input'),
        $popupName = document.createElement('span'),
        $labelSurname = document.createElement('label'),
        $inputSurname = document.createElement('input'),
        $popupSurname = document.createElement('span'),
        $labelLastName = document.createElement('label'),
        $inputLastName = document.createElement('input'),
        $popupLastName = document.createElement('span'),
        $addContactBtn = document.createElement('button'),
        $addcontactBtnText = document.createElement('span'),
        $saveBtn = document.createElement('button'),
        $cancelBtn = document.createElement('button'),
        $contactsBlock = document.createElement('div'),
        //Валидация
        $errorBlock = document.createElement('div'),
        $unacceptableLetter = document.createElement('span'),
        $writeName = document.createElement('span'),
        $writeSurname = document.createElement('span'),
        $writeLastName = document.createElement('span'),
        $requiredValue = document.createElement('span'),
        $requiredContacts = document.createElement('span');


    $modalTitle.classList.add('modal__title');
    $modalClose.classList.add('modal__close', 'btn-reset');
    $form.classList.add('modal__form');
    $inputName.classList.add('modal__field');
    $inputSurname.classList.add('modal__field');
    $inputLastName.classList.add('modal__field');
    $labelName.classList.add('modal__item');
    $labelSurname.classList.add('modal__item');
    $labelLastName.classList.add('modal__item');
    $popupName.classList.add('modal__label');
    $popupSurname.classList.add('modal__label');
    $popupLastName.classList.add('modal__label');
    $addContactBtn.classList.add('modal-contact__btn', 'modal-contact__btn_active', 'btn-reset');
    $saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
    $cancelBtn.classList.add('modal__btn-cancel', 'btn-reset');
    $contactsBlock.classList.add('modal__contact', 'modal-contact');

    $errorBlock.classList.add('modal__error');
    $unacceptableLetter.id = 'unacceptableLetter';
    $writeName.id = 'writeName';
    $writeSurname.id = 'writeSurname';
    $writeLastName.id = 'writeLastName';
    $requiredValue.id = 'requiredValue';
    $requiredContacts.id = 'requiredContacts';

    $labelName.for = 'name';
    $labelSurname.for = 'surname';
    $labelLastName.for = 'lastName';
    $inputName.id = 'validationName';
    $inputName.autocomplete = 'off';
    $inputSurname.id = 'validationSurname';
    $inputSurname.autocomplete = 'off';
    $inputLastName.id = 'validationLastName';
    $inputLastName.autocomplete = 'off';
    $inputName.type = 'text';
    $inputSurname.type = 'text';
    $inputLastName.type = 'text';
    $inputName.placeholder = 'Имя';
    $inputSurname.placeholder = 'Фамилия';
    $inputLastName.placeholder = 'Отчество';
    $saveBtn.type = 'submit';

    $modalTitle.textContent = 'Новый клиент';
    $popupName.textContent = 'Имя';
    $popupSurname.textContent = 'Фамилия';
    $popupLastName.textContent = 'Отчество';
    $addcontactBtnText.textContent = 'Добавить контакт';
    $saveBtn.textContent = 'Сохранить';
    $cancelBtn.textContent = 'Отмена';

    $labelName.append($inputName, $popupName);
    $labelSurname.append($inputSurname, $popupSurname);
    $labelLastName.append($inputLastName, $popupLastName);


    $contactsBlock.append($addContactBtn);
    $addContactBtn.append($addcontactBtnText);
    $errorBlock.append(
        $writeName,
        $writeSurname,
        $writeLastName,
        $requiredValue,
        $unacceptableLetter,
        $requiredContacts
    );
    $form.append(
        $labelName,
        $labelSurname,
        $labelLastName,
        $contactsBlock,
        $errorBlock,
        $saveBtn,
        $cancelBtn
    );

    $addContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const $modalContactsItem = document.querySelectorAll('modal-contact__form');

        if ($modalContactsItem.length < 9) {
            const $contactsItem = createChoiceItem();
            $addContactBtn.before($contactsItem.$contactForm);
            $contactsBlock.style.padding = '25px 30px 17px 30px';

            if ($modalContactsItem.length >= 5) {
                document.querySelector('.modal__content').style.top = '75%';
            } else {
                document.querySelector('.modal__content').style.top = '50%';
            }
        } else {
            const $contactsItem = createChoiceItem();
            $addContactBtn.before($contactsItem.$contactForm);
            $addContactBtn.classList.remove('modal-contact__btn_active');
        }
    });

    return {
        $form,
        $modalTitle,
        $modalClose,
        $cancelBtn,
        $inputName,
        $inputSurname,
        $inputLastName,
        $contactsBlock,
        $addContactBtn
    };
}

//Модальное окно добавление клиента
export const modalAddClient = () => {
    const $createForm = createClientsForm(),
        $modal = document.createElement('div'),
        $modalContent = document.createElement('div');

    $modal.classList.add('modal');
    $modalContent.classList.add('modal__content');
    $createForm.$form.classList.add('add-client');

    $modal.append($modalContent);
    $modalContent.append($createForm.$modalClose, $createForm.$modalTitle, $createForm.$form);

    $createForm.$form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateClientForm()) {
            return;
        }

        const $contactTypes = document.querySelectorAll('.modal-contact__name'),
            $contactValues = document.querySelectorAll('.modal-contact__field');

        let clientObj = {};
        let contactsClientArr = [];

        for (let i = 0; i < $contactTypes.length; i++) {
            if (!validateContactsForm($contactTypes[i], $contactValues[i])) {
                return;
            }
            contactsClientArr.push({
                type: $contactTypes[i].innerHTML,
                value: $contactValues[i].value
            });
        }

        clientObj.name = $createForm.$inputName.value.trim();
        clientObj.surname = $createForm.$inputSurname.value.trim();
        clientObj.lastName = $createForm.$inputLastName.value.trim();
        clientObj.contacts = contactsClientArr;
        //Добавление клиента в таблицу
        const data = await sendClientData(clientObj, 'POST');

        document.querySelector('.table__body').append(createClientItem(data));
        $modal.remove();
    });

    $createForm.$modalClose.addEventListener('click', () => $modal.remove());
    $createForm.$cancelBtn.addEventListener('click', () => $modal.remove());

    document.addEventListener('click', (e) => {
        if (e.target == $modal) $modal.remove();
    });

    return $modal;
}

//Модальное окно изменнение данных клиента
export const changeCustomerDetails = (client) => {
    const $changeModal = document.createElement('div'),
        $changeModalContent = document.createElement('div'),
        $changeModalTitleSpanId = document.createElement('span'),
        $createChangeForm = createClientsForm();

    $changeModal.classList.add('modal');
    $changeModalContent.classList.add('modal__content');
    $changeModalTitleSpanId.classList.add('modal__title-id')

    $createChangeForm.$modalTitle.textContent = 'Изменить данные';
    $createChangeForm.$cancelBtn.textContent = 'Удалить клиента';
    $changeModalTitleSpanId.textContent = 'ID: ' + `${client.id.substr(-6, 6)}`;
    //Закрытие модального окна
    $createChangeForm.$modalClose.addEventListener('click', () => $changeModal.remove());

    document.addEventListener('click', (e) => {
        if (e.target === $changeModal) $changeModal.remove();
    });
    //Обработчик кнопки удаления контакта
    $createChangeForm.$cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = deleteClientModal();
        document.body.append(deleteModal.$deleteModal);

        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteModal.$deleteModalBtnDelete.addEventListener('click', () => {
                deleteClientItem(client.id);
                document.getElementById(client.id).remove()
                deleteModal.$deleteModal.remove();
                $changeModal.remove();
            });
        });
    });
    //Заполнение полей формы модального окна
    $createChangeForm.$inputName.value = client.name;
    $createChangeForm.$inputSurname.value = client.surname;
    $createChangeForm.$inputLastName.value = client.lastName;

    for (const contact of client.contacts) {
        const $createContactForm = createChoiceItem();

        $createContactForm.$contactNameBtn.textContent = contact.type;
        $createContactForm.$contactField.value = contact.value;

        $createChangeForm.$contactsBlock.prepend($createContactForm.$contactForm);
        $createChangeForm.$contactsBlock.style.padding = '25px 30px 17px 30px';
    }
    //Удаление кнопки добавить при количестве контактов более 10
    if (client.contacts.length == 10) {
        $createChangeForm.$addContactBtn.classList.remove('modal-contact__btn_active');
    }
    //Сохранение изменений на сервере
    $createChangeForm.$form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateClientForm()) {
            return;
        }

        const contactTypes = document.querySelectorAll('.modal-contact__name'),
            contactValues = document.querySelectorAll('.modal-contact__field');

        let modifiedСontacts = [];
        let modifiedСlient = {};

        for (let i = 0; i < contactTypes.length; i++) {
            if (!validateContactsForm(contactTypes[i], contactValues[i])) {
                return;
            }
            modifiedСontacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            });
        }

        modifiedСlient.name = $createChangeForm.$inputName.value.trim();
        modifiedСlient.surname = $createChangeForm.$inputSurname.value.trim();
        modifiedСlient.lastName = $createChangeForm.$inputLastName.value.trim();
        modifiedСlient.contacts = modifiedСontacts;

        const changeData = await sendClientData(modifiedСlient, 'PATCH', client.id);

        document.getElementById(changeData.id).remove();
        document.querySelector('.table__body').append(createClientItem(changeData));
        $changeModal.remove();
    });

    $changeModalContent.append(
        $createChangeForm.$modalClose,
        $createChangeForm.$modalTitle,
        $createChangeForm.$form);
    $createChangeForm.$modalTitle.append($changeModalTitleSpanId)
    $changeModal.append($changeModalContent);

    return {
        $changeModal,
        $changeModalContent
    }
}

//Создание элемента контактов модального окна
const createChoiceItem = () => {
    const $contactForm = document.createElement('form'),
        $contactNameBtn = document.createElement('button'),
        $contactСhoiceWrapp = document.createElement('div'),
        $contactList = document.createElement('ul'),
        $contactPhone = document.createElement('li'),
        $contactVk = document.createElement('li'),
        $contactFb = document.createElement('li'),
        $contactEmail = document.createElement('li'),
        $contactOther = document.createElement('li'),
        $contactField = document.createElement('input'),
        $contactDelete = document.createElement('button'),
        $contactDeleteTooltip = document.createElement('span');

    $contactForm.classList.add('modal-contact__form');
    $contactСhoiceWrapp.classList.add('modal-contact__choice-wrapp');
    $contactNameBtn.classList.add('modal-contact__name', 'btn-reset');
    $contactList.classList.add('modal-contact__list', 'list-reset');
    $contactList.classList.add('modal-contact__list');
    $contactPhone.classList.add('modal-contact__item');
    $contactVk.classList.add('modal-contact__item');
    $contactFb.classList.add('modal-contact__item');
    $contactEmail.classList.add('modal-contact__item');
    $contactOther.classList.add('modal-contact__item');
    $contactField.classList.add('modal-contact__field');
    $contactDelete.classList.add('modal-contact__btn-delete', 'btn-reset');
    $contactDeleteTooltip.classList.add('modal-contact__tooltip');

    $contactNameBtn.textContent = 'Телефон';
    $contactPhone.textContent = 'Телефон';
    $contactVk.textContent = 'VK';
    $contactEmail.textContent = 'Email';
    $contactFb.textContent = 'Facebook';
    $contactOther.textContent = 'Другое';

    $contactForm.action = '#';
    $contactField.placeholder = 'Введите данные контакта';
    $contactDeleteTooltip.textContent = 'Удалить контакт';
    $contactField.type = 'text';

    $contactDelete.innerHTML = icons.contactDelete;

    $contactDelete.addEventListener('click', (e) => {
        e.preventDefault();
        $contactForm.remove();
        document.querySelector('.modal-contact__btn').classList.add('modal-contact__btn_active')

        const $modalContactsItem = document.getElementsByClassName('modal-contact__form');

        if ($modalContactsItem.length === 0) {
            document.querySelector('.modal__contact').style.padding = '0px 30px';
        }
    });

    $contactNameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        $contactList.classList.toggle('modal-contact__list_active');
        $contactNameBtn.classList.toggle('modal-contact__name_active');
    })

    $contactСhoiceWrapp.addEventListener('mouseleave', () => {
        $contactList.classList.remove('modal-contact__list_active');
        $contactNameBtn.classList.remove('modal-contact__name_active');
    })

    const setContactName = (type) => {
        type.addEventListener('click', () => {
            $contactNameBtn.textContent = type.textContent;
            $contactList.classList.remove('modal-contact__list_active');
            $contactNameBtn.classList.remove('modal-contact__name_active');
        });
    }

    const contactNameArr = [$contactPhone, $contactEmail, $contactVk, $contactFb, $contactOther];

    for (const type of contactNameArr) {
        setContactName(type);
    }

    $contactDelete.append($contactDeleteTooltip);
    $contactForm.append($contactСhoiceWrapp, $contactField, $contactDelete);
    $contactСhoiceWrapp.append($contactNameBtn, $contactList);
    $contactList.append($contactPhone, $contactEmail, $contactVk, $contactFb, $contactOther);

    return {
        $contactForm,
        $contactNameBtn,
        $contactField,
        $contactDelete
    }
}

//Модальное окно удаление клиента
export const deleteClientModal = () => {
    const $deleteModal = document.createElement('div'),
        $deleteModalContent = document.createElement('div'),
        $deleteModalClose = document.createElement('button'),
        $deleteModalTitle = document.createElement('h2'),
        $deleteModalDistr = document.createElement('p'),
        $deleteModalBtnDelete = document.createElement('button'),
        $deleteModalBtnCancel = document.createElement('button');

    $deleteModal.classList.add('delete-modal');
    $deleteModalContent.classList.add('delete-modal__content');
    $deleteModalDistr.classList.add('delete-modal__distr');
    $deleteModalTitle.classList.add('delete-modal__title');
    $deleteModalBtnDelete.classList.add('delete-modal__btn-delete', 'btn-reset');
    $deleteModalBtnCancel.classList.add('delete-modal__btn-cancel', 'btn-reset');
    $deleteModalClose.classList.add('delete-modal__close', 'btn-reset');

    $deleteModalTitle.textContent = 'Удалить клиента';
    $deleteModalDistr.textContent = 'Вы действительно хотите удалить данного клиента?';
    $deleteModalBtnDelete.textContent = 'Удалить';
    $deleteModalBtnCancel.textContent = 'Отмена';

    $deleteModalContent.append(
        $deleteModalClose,
        $deleteModalTitle,
        $deleteModalDistr,
        $deleteModalBtnDelete,
        $deleteModalBtnCancel
    );
    $deleteModal.append($deleteModalContent);

    $deleteModalClose.addEventListener('click', () => $deleteModal.remove());
    $deleteModalBtnCancel.addEventListener('click', () => $deleteModal.remove());

    document.addEventListener('click', (e) => {
        if (e.target === $deleteModal) $deleteModal.remove();
    });

    return {
        $deleteModal,
        $deleteModalContent,
        $deleteModalBtnDelete
    }
}
