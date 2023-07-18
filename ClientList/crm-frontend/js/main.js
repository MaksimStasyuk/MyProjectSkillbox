import { icons } from './icons.js';
import { getClients } from "./clientsApi.js";
import { sortTable } from "./sortTable.js";
import { modalAddClient, changeCustomerDetails, deleteClientModal } from "./modals.js";
import { createPreloader } from "./preloader.js";
import { searchClients } from "./filter.js";

//Создание шапки таблицы
const createHeader = () => {
    const $header = document.createElement('header'),
        $headerContent = document.createElement('div'),
        $logo = document.createElement('a'),
        $form = document.createElement('form'),
        $formInp = document.createElement('input');

    $logo.href = '#';
    $form.action = '#';
    $formInp.placeholder = 'введите запрос';
    $formInp.type = 'text';

    $header.classList.add('header');
    $headerContent.classList.add('header__content', 'container');
    $logo.classList.add('header__logo');
    $form.classList.add('header__form');
    $formInp.classList.add('header__input');

    $logo.innerHTML = icons.logo;

    $form.append($formInp);
    $headerContent.append($logo, $form);
    $header.append($headerContent);

    return $header;
}

// Создание секции Клиенты с таблицей
const createClientsSection = () => {
    const $main = document.createElement('main'),
        $clientsSection = document.createElement('section'),
        $clientsSectionContent = document.createElement('div'),
        $clientsSectionRequiredHeader = document.createElement('h1'),
        $clientsSectionTitle = document.createElement('h2'),
        $tableWrap = document.createElement('div'),
        $table = document.createElement('table'),
        $tableHead = document.createElement('thead'),
        $tableHeadTr = document.createElement('tr'),
        $tableHeadId = document.createElement('th'),
        $tableHeadIdArrow = document.createElement('span'),
        $tableHeadFIO = document.createElement('th'),
        $tableHeadFIOSpan = document.createElement('span'),
        $tableHeadDateTimeCreation = document.createElement('th'),
        $tableHeadDateTimeCreationArrow = document.createElement('span'),
        $tableHeadLastChanges = document.createElement('th'),
        $tableHeadLastChangesArrow = document.createElement('span'),
        $tableHeadContacts = document.createElement('th'),
        $tableHeadActions = document.createElement('th'),
        $tableBody = document.createElement('tbody'),
        $clientsSectionBtn = document.createElement('button'),
        $clientsSectionBtnText = document.createElement('span');

    //Вращение стрелок направления сортировки таблицы
    const sortingDisplayCreateArr = [
        $tableHeadId,
        $tableHeadFIO,
        $tableHeadDateTimeCreation,
        $tableHeadLastChanges
    ];

    for (const item of sortingDisplayCreateArr) {
        item.addEventListener('click', () => {
            item.classList.toggle('arrow-turn');
        });
    }

    $main.classList.add('main');
    $clientsSection.classList.add('container', 'clients');
    $clientsSectionContent.classList.add('clients__content');
    $clientsSectionRequiredHeader.classList.add('visually-hidden');
    $clientsSectionTitle.classList.add('clients__title');
    $tableWrap.classList.add('clients__table-wrap');
    $table.classList.add('clients__table', 'table');
    $tableHead.classList.add('table__head');
    $tableHeadTr.classList.add('table__head-tr');
    $tableHeadId.classList.add('table__head-th', 'table__head-th_id');
    $tableHeadFIO.classList.add('table__head-th', 'table__head-th_fio');
    $tableHeadDateTimeCreation.classList.add('table__head-th', 'table__head-th_date');
    $tableHeadLastChanges.classList.add('table__head-th', 'table__head-th_changes');
    $tableHeadContacts.classList.add('table__head-th', 'table__head-th_contacts');
    $tableHeadActions.classList.add('table__head-th', 'table__head-th_actions');
    $tableBody.classList.add('table__body');
    $clientsSectionBtn.classList.add('clients__btn', 'btn-reset');

    $tableHeadId.role, 'button';
    $tableHeadFIO.role = 'button';
    $tableHeadDateTimeCreation.role = 'button';
    $tableHeadLastChanges.role = 'button';
    $tableHeadId.tabindex = '0';
    $tableHeadFIO.tabindex = '0';
    $tableHeadDateTimeCreation.tabindex = '0';
    $tableHeadLastChanges.tabindex = '0';
    $tableHeadId.setAttribute('data-type', 'id');
    $tableHeadFIO.setAttribute('data-type', 'fio');
    $tableHeadDateTimeCreation.setAttribute('data-type', 'create');
    $tableHeadLastChanges.setAttribute('data-type', 'update');

    $clientsSectionRequiredHeader.textContent = 'Система управления контактными данными клиентов';
    $clientsSectionTitle.textContent = 'Клиенты';
    $tableHeadId.textContent = 'ID';
    $tableHeadIdArrow.textContent = '.';
    $tableHeadFIO.textContent = 'Фамилия Имя Отчество';
    $tableHeadFIOSpan.textContent = 'А-Я';
    $tableHeadDateTimeCreation.textContent = 'Дата\u00A0и\u00A0время создания';
    $tableHeadDateTimeCreationArrow.textContent = '.';
    $tableHeadLastChanges.textContent = 'Последние изменения';
    $tableHeadLastChangesArrow.textContent = '.';
    $tableHeadContacts.textContent = 'Контакты';
    $tableHeadActions.textContent = 'Действия';
    $clientsSectionBtnText.textContent = 'Добавить клиента';

    $clientsSectionBtn.innerHTML = icons.btn;

    //Вызов модального окна добавления клиента
    $clientsSectionBtn.addEventListener('click', () => {
        document.body.append(modalAddClient());
    })

    $main.append($clientsSection);
    $clientsSection.append($clientsSectionContent);
    $tableHead.append($tableHeadTr);
    $tableHeadTr.append(
        $tableHeadId,
        $tableHeadFIO,
        $tableHeadDateTimeCreation,
        $tableHeadLastChanges,
        $tableHeadContacts,
        $tableHeadActions);
    $tableHeadFIO.append($tableHeadFIOSpan);
    $tableHeadId.append($tableHeadIdArrow);
    $tableHeadDateTimeCreation.append($tableHeadDateTimeCreationArrow);
    $tableHeadLastChanges.append($tableHeadLastChangesArrow);
    $tableWrap.append($table)
    $table.append($tableHead, $tableBody);
    $tableBody.append(createPreloader());
    $clientsSectionBtn.append($clientsSectionBtnText);
    $clientsSectionContent.append(
        $clientsSectionRequiredHeader,
        $clientsSectionTitle,
        $tableWrap,
        $clientsSectionBtn);

    return { $main, $table, $tableBody }
}

//Создание элемента таблицы
export const createClientItem = (client) => {
    const $clientTr = document.createElement('tr'),
        $clientId = document.createElement('td'),
        $clientFIO = document.createElement('td'),
        $clientDateTimeCreation = document.createElement('td'),
        $clientDateTimeCreationWrap = document.createElement('div'),
        $clientDateTimeCreationYear = document.createElement('span'),
        $clientDateTimeCreationTime = document.createElement('span'),
        $clientLastChanges = document.createElement('td'),
        $clientLastChangesWrap = document.createElement('div'),
        $clientLastChangesYear = document.createElement('span'),
        $clientLastChangesTime = document.createElement('span'),
        $clientContacts = document.createElement('td'),
        $clientContactsList = document.createElement('ul'),
        $clientContactsListBtn = document.createElement('button'),
        $clientActions = document.createElement('td'),
        $clientActionsWrap = document.createElement('div'),
        $clientChangeBtn = document.createElement('button'),
        $clientChangeBtnSpan = document.createElement('span'),
        $clientDeleteBtn = document.createElement('button'),
        $clientDeleteBtnSpan = document.createElement('span'),
        deleteClient = deleteClientModal(),
        changeDetailsClient = changeCustomerDetails(client);

    $clientTr.classList.add('table__body-tr');
    $clientTr.id = client.id;
    $clientId.classList.add('table__body-th', 'table__body-th_id');
    $clientFIO.classList.add('table__body-th', 'table__body-th_fio');
    $clientDateTimeCreation.classList.add('table__body-th', 'table__body-th_date', 'tbody-th-date');
    $clientDateTimeCreationWrap.classList.add('tbody-th-date__wrap');
    $clientDateTimeCreationYear.classList.add('tbody-th-date__year');
    $clientDateTimeCreationTime.classList.add('tbody-th-date__time');
    $clientLastChanges.classList.add('table__body-th', 'table__body-th_changes', 'tbody-th-changes');
    $clientLastChangesWrap.classList.add('tbody-th-changes__wrap');
    $clientLastChangesYear.classList.add('tbody-th-changes__year');
    $clientLastChangesTime.classList.add('tbody-th-changes__time');
    $clientContacts.classList.add('table__body-th', 'table__body-th_contacts', 'tbody-th-contacts');
    $clientContactsList.classList.add('tbody-th-contacts__list', 'list-reset');
    $clientContactsListBtn.classList.add('tbody-th-contacts__btn', 'btn-reset');
    $clientActions.classList.add('table__body-th', 'table__body-th_actions', 'tbody-th-actions');
    $clientActionsWrap.classList.add('tbody-th-actions__wrap');
    $clientChangeBtn.classList.add('tbody-th-actions__btn-change', 'btn-reset');
    $clientDeleteBtn.classList.add('tbody-th-actions__btn-delete', 'btn-reset');

    $clientId.textContent = client.id.substr(-6, 6);
    $clientFIO.textContent = client.name + ' ' + client.surname + ' ' + client.lastName;

    let createdAtDate = new Date(client.createdAt);
    let updatedAtDate = new Date(client.updatedAt);

    $clientDateTimeCreationYear.textContent = createdAtDate.toLocaleDateString();
    $clientDateTimeCreationTime.textContent = createdAtDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    $clientLastChangesYear.textContent = updatedAtDate.toLocaleDateString();
    $clientLastChangesTime.textContent = updatedAtDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    $clientChangeBtnSpan.textContent = 'Изменить';
    $clientDeleteBtnSpan.textContent = 'Удалить';

    //Создание элемента контактов
    const createItemContact = (contactType, contactValue, icon) => {
        const $contactListItem = document.createElement('li'),
            $contactLink = document.createElement('div'),
            $contactLinkTooltip = document.createElement('div'),
            $contactLinkTooltipText = document.createElement('span'),
            $contactLinkTooltipLink = document.createElement('a');

        if (contactType === 'Телефон') {
            $contactLinkTooltipLink.href = `tel:${contactValue.trim()}`;
        } else if (contactType === 'Email') {
            $contactLinkTooltipLink.href = `mailto:${contactValue.trim()}`;
        } else {
            $contactLinkTooltipLink.href = `${contactValue.trim()}`;
            $contactLinkTooltipLink.target = '_blank';
        }

        $contactListItem.classList.add('tbody-th-contacts__item');
        $contactLink.classList.add('tbody-th-contacts__link', 'contacts-link');
        $contactLinkTooltip.classList.add('contacts-link__tooltip', 'tooltip');
        $contactLinkTooltipText.classList.add('tooltip__text');
        $contactLinkTooltipLink.classList.add('tooltip__link');

        $contactLinkTooltipText.textContent = contactType + ':' + ' ';
        $contactLinkTooltipLink.textContent = contactValue;

        $contactLink.innerHTML = icon;

        $contactLinkTooltip.append($contactLinkTooltipText);
        $contactLinkTooltip.append($contactLinkTooltipLink);
        $contactLink.append($contactLinkTooltip);
        $contactListItem.append($contactLink);

        return $contactListItem;
    }

    // Визуализация элементов контактов
    let listItemArr = [];

    for (const contactItem of client.contacts) {
        if (contactItem.type === 'Телефон') {
            const validPhone = num => {
                return num.replace(/^\+?(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1($2)$3-$4-$5')
            }

            const $contactsListItemTel = createItemContact(contactItem.type, validPhone(contactItem.value), icons.tel);
            $clientContactsList.append($contactsListItemTel);

            listItemArr.push($contactsListItemTel);
        } else if (contactItem.type === 'Email') {
            const $contactsListItemEmail = createItemContact(contactItem.type, contactItem.value, icons.email);
            $clientContactsList.append($contactsListItemEmail);

            listItemArr.push($contactsListItemEmail)
        } else if (contactItem.type === 'Facebook') {
            const $contactsListItemFb = createItemContact(contactItem.type, contactItem.value, icons.fb);
            $clientContactsList.append($contactsListItemFb);

            listItemArr.push($contactsListItemFb);
        } else if (contactItem.type === 'VK') {
            const $contactsListItemVk = createItemContact(contactItem.type, contactItem.value, icons.vk);
            $clientContactsList.append($contactsListItemVk);

            listItemArr.push($contactsListItemVk);
        } else {
            const $contactsListItemOther = createItemContact(contactItem.type, contactItem.value, icons.other);
            $clientContactsList.append($contactsListItemOther);

            listItemArr.push($contactsListItemOther);
        }
    }

    if (listItemArr.length > 5) {
        listItemArr.slice(4).forEach(item => item.style.display = 'none');
        $clientContactsList.append($clientContactsListBtn);
    }

    $clientContactsListBtn.addEventListener('click', () => {
        listItemArr.forEach(item => {
            if (item.style.display = 'none') item.style.display = 'block';
            $clientContactsListBtn.style.display = 'none';
        });
    });

    $clientContactsListBtn.textContent = `+${listItemArr.length - 4}`;

    $clientChangeBtn.innerHTML = icons.pencil;
    $clientDeleteBtn.innerHTML = icons.cencel;

    //Обработчик клика удаления клиента
    const deleteClientItemById = () => {
        import('./clientsApi.js').then(({ deleteClientItem }) => {
            deleteClient.$deleteModalBtnDelete.addEventListener('click', () => {
                deleteClientItem(client.id);
                document.getElementById(client.id).remove()
                deleteClient.$deleteModal.remove();
            });
        });
    }

    $clientDeleteBtn.addEventListener('click', () => {
        deleteClientItemById();
        document.body.append(deleteClient.$deleteModal);
    });

    //Обработчик клика изменения данных клиента
    $clientChangeBtn.addEventListener('click', () => {
        document.body.append(changeDetailsClient.$changeModal);

    });

    $clientTr.append(
        $clientId,
        $clientFIO,
        $clientDateTimeCreation,
        $clientLastChanges,
        $clientContacts,
        $clientActions
    );
    $clientDateTimeCreation.append($clientDateTimeCreationWrap);
    $clientDateTimeCreationWrap.append($clientDateTimeCreationYear, $clientDateTimeCreationTime);
    $clientLastChanges.append($clientLastChangesWrap);
    $clientLastChangesWrap.append($clientLastChangesYear, $clientLastChangesTime);
    $clientContacts.append($clientContactsList);
    // $clientContactsList.append($clientContactsListBtn);
    $clientActions.append($clientActionsWrap);
    $clientActionsWrap.append($clientChangeBtn, $clientDeleteBtn);
    $clientChangeBtn.append($clientChangeBtnSpan);
    $clientDeleteBtn.append($clientDeleteBtnSpan);

    return $clientTr;
}

//Визуализация приложения
const createApp = async () => {
    const $header = createHeader(),
        $clientsSection = createClientsSection();

    document.body.append($header);
    document.body.append($clientsSection.$main);

    const $preloader = document.querySelector('.preloader');

    try {
        const clientsArry = await getClients();
        searchClients(clientsArry);
        for (const clientObj of clientsArry) {
            document.querySelector('.table__body').append(createClientItem(clientObj));
        }

    } catch (error) {
        console.log(error);

    } finally {
        $preloader.remove();
    }
}

createApp()

//Инициализация сортировки
document.addEventListener('DOMContentLoaded', sortTable);