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

// Колонки таблиць: key - ключ в об'єкті, title - заголовок, type - тип поля,
// minimum і maximum - межі для чисел, requiredText - текст, який має бути в значенні
var columns = {
  subjects: [
    { key: 'name', title: 'Назва', type: 'text' },
    { key: 'department', title: 'Кафедра', type: 'text' },
    { key: 'hours', title: 'Годин на рік', type: 'number', minimum: 1, maximum: 500 },
    { key: 'grade', title: 'Клас', type: 'number', minimum: 1, maximum: 11 },
    { key: 'room', title: 'Кабінет', type: 'text' },
    { key: 'difficulty', title: 'Складність (1-5)', type: 'number', minimum: 1, maximum: 5 },
    { key: 'mandatory', title: "Обов'язковий", type: 'text' }
  ],
  teachers: [
    { key: 'fullName', title: 'ПІБ', type: 'text' },
    { key: 'subject', title: 'Предмет', type: 'text' },
    { key: 'email', title: 'Email', type: 'text', requiredText: '@' },
    { key: 'phone', title: 'Телефон', type: 'text' },
    { key: 'rate', title: 'Ставка', type: 'number', minimum: 0.25, maximum: 2 },
    { key: 'experience', title: 'Стаж (років)', type: 'number', minimum: 0, maximum: 60 },
    { key: 'category', title: 'Категорія', type: 'text' }
  ]
};

function showMessage(text) {
  document.getElementById('message-text').textContent = text;
  document.getElementById('message-dialog').open = true;
}

function hideMessage() {
  document.getElementById('message-dialog').open = false;
}

function findSubjectNames() {
  var names = [];

  for (var i = 0; i < database.subjects.length; i++) {
    names.push(database.subjects[i].name);
  }

  return names;
}

function hasSubject(name) {
  for (var i = 0; i < database.subjects.length; i++) {
    if (database.subjects[i].name === name) {
      return true;
    }
  }

  return false;
}

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

function createOption(text) {
  var option = document.createElement('option');
  option.value = text;
  option.textContent = text;
  return option;
}

function renderTable(tableName) {
  var table = document.getElementById(tableName + '-table');
  table.innerHTML = '';
  table.appendChild(createHeaderRow(tableName));

  for (var i = 0; i < database[tableName].length; i++) {
    table.appendChild(createDataRow(tableName, i));
  }
}

// Випадний список предметів у формі вчителя заповнюється з таблиці предметів
function renderSubjectSelect() {
  var select = document.getElementById('teachers-subject');
  var selectedValue = select.value;
  var names = findSubjectNames();
  select.innerHTML = '';

  for (var i = 0; i < names.length; i++) {
    select.appendChild(createOption(names[i]));
  }

  select.value = selectedValue;
}

function renderAll() {
  renderTable('subjects');
  renderTable('teachers');
  renderSubjectSelect();
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

function findNumberError(column, value) {
  if (column.type !== 'number') {
    return null;
  }

  var number = Number(value);
  if (isNaN(number) || number < column.minimum || number > column.maximum) {
    return 'Поле "' + column.title + '": число від ' + column.minimum + ' до ' + column.maximum;
  }

  return null;
}

function findTextError(column, value) {
  if (column.requiredText && value.indexOf(column.requiredText) === -1) {
    return 'Поле "' + column.title + '" має містити ' + column.requiredText;
  }

  return null;
}

function findValueError(column, value) {
  if (value === '') {
    return 'Заповніть поле "' + column.title + '"';
  }

  var numberError = findNumberError(column, value);
  if (numberError !== null) {
    return numberError;
  }

  return findTextError(column, value);
}

function findDuplicateError(name) {
  if (hasSubject(name)) {
    return 'Такий предмет вже є';
  }

  return null;
}

function findSubjectError(name) {
  if (!hasSubject(name)) {
    return 'Такого предмета немає в таблиці "Предмети"';
  }

  return null;
}

function findRowError(tableName, values) {
  if (tableName === 'subjects') {
    return findDuplicateError(values.name);
  }

  return findSubjectError(values.subject);
}

function findFormError(tableName, values) {
  for (var i = 0; i < columns[tableName].length; i++) {
    var column = columns[tableName][i];
    var valueError = findValueError(column, values[column.key]);
    if (valueError !== null) {
      return valueError;
    }
  }

  return findRowError(tableName, values);
}

function readFormValues(tableName) {
  var values = {};

  for (var i = 0; i < columns[tableName].length; i++) {
    var key = columns[tableName][i].key;
    values[key] = document.getElementById(tableName + '-' + key).value.trim();
  }

  return values;
}

function convertValue(column, value) {
  if (column.type === 'number') {
    return Number(value);
  }

  return value;
}

function convertRow(tableName, values) {
  var row = {};

  for (var i = 0; i < columns[tableName].length; i++) {
    var column = columns[tableName][i];
    row[column.key] = convertValue(column, values[column.key]);
  }

  return row;
}

function clearForm(tableName) {
  for (var i = 0; i < columns[tableName].length; i++) {
    var field = document.getElementById(tableName + '-' + columns[tableName][i].key);
    if (field.tagName === 'INPUT') {
      field.value = '';
    }
  }
}

function onAddClick(tableName) {
  var values = readFormValues(tableName);
  var message = findFormError(tableName, values);

  if (message !== null) {
    showMessage(message);
    return;
  }

  database[tableName].push(convertRow(tableName, values));
  renderAll();
  clearForm(tableName);
}

document.getElementById('tab-subjects').addEventListener('click', function () {
  showTab('subjects');
});

document.getElementById('tab-teachers').addEventListener('click', function () {
  showTab('teachers');
});

document.getElementById('add-subjects').addEventListener('click', function () {
  onAddClick('subjects');
});

document.getElementById('add-teachers').addEventListener('click', function () {
  onAddClick('teachers');
});

document.getElementById('message-close').addEventListener('click', hideMessage);

renderAll();
showTab('subjects');
