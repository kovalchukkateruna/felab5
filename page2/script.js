document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('myTable');
    const colorPicker = document.getElementById('colorPicker');
    const targetCell = 15;
    let cells = [];

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createTable() {
        for (let i = 0; i < 6; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 6; j++) {
                const cell = row.insertCell();
                const number = i * 6 + j + 1;
                cell.textContent = number;
                cells.push(cell);

                if (number === targetCell) {
                    cell.addEventListener('mouseover', () => {
                        cell.style.backgroundColor = getRandomColor();
                    });

                    cell.addEventListener('click', (e) => {
                        e.stopPropagation();
                        colorPicker.click();
                    });

                    cell.addEventListener('dblclick', () => {
                        const randomColor = getRandomColor();
                        for (let k = 0; k < 6; k++) {
                            const diagIndex = k * 6 + k;
                            if (cells[diagIndex]) {
                                cells[diagIndex].style.backgroundColor = randomColor;
                            }
                        }
                    });
                }
            }
        }
    }

    colorPicker.addEventListener('input', (e) => {
        cells[targetCell - 1].style.backgroundColor = e.target.value;
    });

    // Ініціалізація таблиці
    createTable();
});
