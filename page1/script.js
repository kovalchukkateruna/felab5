document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const formResult = document.getElementById('formResult');

    const validationRules = {
        pib: {
            pattern: /^[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ]\. [А-ЯІЇЄ]\.$/,
            message: 'ПІБ має бути у форматі "Прізвище І. Б."'
        },
        phone: {
            pattern: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
            message: 'Телефон має бути у форматі (111)-111-11-11'
        },
        id_card: {
            pattern: /^[А-ЯІЇЄ]{2} №\d{6}$/,
            message: 'ID-card має бути у форматі "АЕ №180904"'
        },
        faculty: {
            pattern: /^[А-ЯІЇЄ][А-ЯІЇЄа-яіїє]+(?:\s[А-ЯІЇЄа-яіїє]+)*$/,
            message: 'Назва факультету має починатися з великої літери'
        },
        birthday: {
            pattern: /^\d{2}-\d{2}-\d{4}$/,
            message: 'Дата має бути у форматі "01-01-2000"'
        },
    };

    function validateField(input) {
        const field = input.name;
        const value = input.value;
        const rule = validationRules[field];

        const errorElement = input.nextElementSibling;

        if (rule && !rule.pattern.test(value)) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = rule.message;
            return false;
        } else {
            input.classList.remove('error');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    }

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        form.querySelectorAll('input').forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
            formData[input.name] = input.value;
        });

        if (isValid) {
            displayResult(formData);
        }
    });

    function displayResult(data) {
        const labels = {
            pib: 'ПІБ',
            phone: 'Телефон',
            id_card: 'ID-card',
            faculty: 'Факультет',
            birthday: 'Дата народження'
        };

        formResult.innerHTML = Object.entries(data)
            .map(([key, value]) => `
                <div class="result-item">
                    <span class="result-label">${labels[key]}:</span>
                    <span class="result-value">${value}</span>
                </div>
            `)
            .join('');
    }
});
