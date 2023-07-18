//Сортировка таблицы
export const sortTable = () => {
    const $table = document.querySelector('table'),
        $headers = $table.querySelectorAll('th'),
        $tbody = $table.querySelector('tbody');

    const directions = Array.from($headers).map(() => '');

    const transform = (type, content) => {
        switch (type) {
            case 'id':
                return parseFloat(content);
            case 'create':
            case 'update':
                return content.split('.').reverse().join('-');
            case 'fio':
            default:
                return content;
        }
    }

    const sortColumn = (index) => {
        const type = $headers[index].getAttribute('data-type'),
            $rows = $tbody.querySelectorAll('tr'),
            direction = directions[index] || 'sortUp',
            multiply = direction === 'sortUp' ? 1 : -1,
            newRows = Array.from($rows);

        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent,
                cellB = row2.querySelectorAll('td')[index].textContent,
                a = transform(type, cellA),
                b = transform(type, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;
                default:
                    break;
                case a === b:
                    return 0;
            }
        });

        [].forEach.call($rows, (row) => {
            $tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            $tbody.appendChild(newRow);
        });
    }

    [].forEach.call($headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        });
    });
}