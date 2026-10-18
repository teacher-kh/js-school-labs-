// Предметна область: школа. Дві сутності: предмети і вчителі.

var subjects = [
  { name: 'Математика', department: 'Точні науки', hours: 175, grade: 9, room: '201', difficulty: 4, mandatory: 'Так' },
  { name: 'Українська мова', department: 'Гуманітарні науки', hours: 105, grade: 9, room: '105', difficulty: 3, mandatory: 'Так' },
  { name: 'Фізика', department: 'Природничі науки', hours: 105, grade: 9, room: '301', difficulty: 5, mandatory: 'Так' },
  { name: 'Інформатика', department: 'Точні науки', hours: 70, grade: 9, room: '210', difficulty: 3, mandatory: 'Так' },
  { name: 'Музичне мистецтво', department: 'Мистецтво', hours: 35, grade: 9, room: '401', difficulty: 1, mandatory: 'Ні' }
];

var teachers = [
  { fullName: 'Коваленко Олена Петрівна', subject: 'Математика', email: 'kovalenko@school.ua', phone: '0111111111', rate: 1, experience: 15, category: 'Вища' },
  { fullName: 'Шевченко Іван Миколайович', subject: 'Фізика', email: 'shevchenko@school.ua', phone: '0222222222', rate: 1.5, experience: 22, category: 'Вища' },
  { fullName: 'Мельник Наталія Василівна', subject: 'Українська мова', email: 'melnyk@school.ua', phone: '0333333333', rate: 1, experience: 9, category: 'Перша' },
  { fullName: 'Бондаренко Андрій Олегович', subject: 'Інформатика', email: 'bondarenko@school.ua', phone: '0444444444', rate: 0.75, experience: 4, category: 'Друга' }
];

// Які колонки є в таблицях: ключ в об'єкті і заголовок
var subjectColumns = [
  { key: 'name', title: 'Назва' },
  { key: 'department', title: 'Кафедра' },
  { key: 'hours', title: 'Годин на рік' },
  { key: 'grade', title: 'Клас' },
  { key: 'room', title: 'Кабінет' },
  { key: 'difficulty', title: 'Складність (1-5)' },
  { key: 'mandatory', title: "Обов'язковий" }
];

var teacherColumns = [
  { key: 'fullName', title: 'ПІБ' },
  { key: 'subject', title: 'Предмет' },
  { key: 'email', title: 'Email' },
  { key: 'phone', title: 'Телефон' },
  { key: 'rate', title: 'Ставка' },
  { key: 'experience', title: 'Стаж (років)' },
  { key: 'category', title: 'Категорія' }
];

// Малює таблицю з потрібним id
function renderTable(tableId, columns, rows) {
  var table = document.getElementById(tableId);
  table.innerHTML = '';

  // рядок із заголовками
  var headRow = document.createElement('tr');
  for (var i = 0; i < columns.length; i++) {
    var th = document.createElement('th');
    th.textContent = columns[i].title;
    headRow.appendChild(th);
  }
  table.appendChild(headRow);

  // рядки з даними
  for (var r = 0; r < rows.length; r++) {
    var tr = document.createElement('tr');
    for (var c = 0; c < columns.length; c++) {
      var td = document.createElement('td');
      td.textContent = rows[r][columns[c].key];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

// Перемикання табів: показуємо одну таблицю, іншу ховаємо
function showTab(name) {
  if (name === 'subjects') {
    document.getElementById('subjects-block').style.display = 'block';
    document.getElementById('teachers-block').style.display = 'none';
  } else {
    document.getElementById('subjects-block').style.display = 'none';
    document.getElementById('teachers-block').style.display = 'block';
  }
}

document.getElementById('tab-subjects').addEventListener('click', function () {
  showTab('subjects');
});
document.getElementById('tab-teachers').addEventListener('click', function () {
  showTab('teachers');
});

renderTable('subjects-table', subjectColumns, subjects);
renderTable('teachers-table', teacherColumns, teachers);
showTab('subjects');
