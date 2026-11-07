// Предметна область: школа. Дві сутності: предмети і вчителі.

var database = {
  subjects: [
    { name: 'Математика', department: 'Точні науки', hours: 175, grade: 9, room: '201', difficulty: 4, mandatory: 'Так' },
    { name: 'Українська мова', department: 'Гуманітарні науки', hours: 105, grade: 9, room: '105', difficulty: 3, mandatory: 'Так' },
    { name: 'Фізика', department: 'Природничі науки', hours: 105, grade: 9, room: '301', difficulty: 5, mandatory: 'Так' },
    { name: 'Інформатика', department: 'Точні науки', hours: 70, grade: 9, room: '210', difficulty: 3, mandatory: 'Так' },
    { name: 'Музичне мистецтво', department: 'Мистецтво', hours: 35, grade: 9, room: '401', difficulty: 1, mandatory: 'Ні' }
  ],
  teachers: [
    { fullName: 'Коваленко Олена Петрівна', subject: 'Математика', email: 'kovalenko@school.ua', phone: '0111111111', rate: 1, experience: 15, category: 'Вища' },
    { fullName: 'Шевченко Іван Миколайович', subject: 'Фізика', email: 'shevchenko@school.ua', phone: '0222222222', rate: 1.5, experience: 22, category: 'Вища' },
    { fullName: 'Мельник Наталія Василівна', subject: 'Українська мова', email: 'melnyk@school.ua', phone: '0333333333', rate: 1, experience: 9, category: 'Перша' },
    { fullName: 'Бондаренко Андрій Олегович', subject: 'Інформатика', email: 'bondarenko@school.ua', phone: '0444444444', rate: 0.75, experience: 4, category: 'Друга' }
  ]
};

// Колонки таблиць: key - ключ в об'єкті, title - заголовок
var columns = {
  subjects: [
    { key: 'name', title: 'Назва' },
    { key: 'department', title: 'Кафедра' },
    { key: 'hours', title: 'Годин на рік' },
    { key: 'grade', title: 'Клас' },
    { key: 'room', title: 'Кабінет' },
    { key: 'difficulty', title: 'Складність (1-5)' },
    { key: 'mandatory', title: "Обов'язковий" }
  ],
  teachers: [
    { key: 'fullName', title: 'ПІБ' },
    { key: 'subject', title: 'Предмет' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Телефон' },
    { key: 'rate', title: 'Ставка' },
    { key: 'experience', title: 'Стаж (років)' },
    { key: 'category', title: 'Категорія' }
  ]
};

function createHeaderRow(tableName) {
  var row = document.createElement('tr');

  for (var i = 0; i < columns[tableName].length; i++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = columns[tableName][i].title;
    row.appendChild(headerCell);
  }

  return row;
}

function createDataCell(tableName, rowIndex, column) {
  var cell = document.createElement('td');
  cell.textContent = database[tableName][rowIndex][column.key];
  return cell;
}

function createDataRow(tableName, rowIndex) {
  var row = document.createElement('tr');

  for (var i = 0; i < columns[tableName].length; i++) {
    row.appendChild(createDataCell(tableName, rowIndex, columns[tableName][i]));
  }

  return row;
}

function renderTable(tableName) {
  var table = document.getElementById(tableName + '-table');
  table.innerHTML = '';
  table.appendChild(createHeaderRow(tableName));

  for (var i = 0; i < database[tableName].length; i++) {
    table.appendChild(createDataRow(tableName, i));
  }
}

function renderAll() {
  renderTable('subjects');
  renderTable('teachers');
}

function hideTabs() {
  document.getElementById('subjects-block').style.display = 'none';
  document.getElementById('teachers-block').style.display = 'none';
}

// Перемикання табів: ховаємо всі таблиці й показуємо потрібну
function showTab(tableName) {
  hideTabs();
  document.getElementById(tableName + '-block').style.display = 'block';
}

document.getElementById('tab-subjects').addEventListener('click', function () {
  showTab('subjects');
});

document.getElementById('tab-teachers').addEventListener('click', function () {
  showTab('teachers');
});

renderAll();
showTab('subjects');
