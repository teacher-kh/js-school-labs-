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
// minimum і maximum - межі для чисел, requiredText - текст, який має бути в значенні,
// options - фіксований список значень, fromSubjects - список значень береться з таблиці предметів
var columns = {
  subjects: [
    { key: 'name', title: 'Назва', type: 'text' },
    { key: 'department', title: 'Кафедра', type: 'text' },
    { key: 'hours', title: 'Годин на рік', type: 'number', minimum: 1, maximum: 500 },
    { key: 'grade', title: 'Клас', type: 'number', minimum: 1, maximum: 11 },
    { key: 'room', title: 'Кабінет', type: 'text' },
    { key: 'difficulty', title: 'Складність (1-5)', type: 'number', minimum: 1, maximum: 5 },
    { key: 'mandatory', title: "Обов'язковий", type: 'text', options: ['Так', 'Ні'] }
  ],
  teachers: [
    { key: 'fullName', title: 'ПІБ', type: 'text' },
    { key: 'subject', title: 'Предмет', type: 'text', fromSubjects: true },
    { key: 'email', title: 'Email', type: 'text', requiredText: '@' },
    { key: 'phone', title: 'Телефон', type: 'text' },
    { key: 'rate', title: 'Ставка', type: 'number', minimum: 0.25, maximum: 2 },
    { key: 'experience', title: 'Стаж (років)', type: 'number', minimum: 0, maximum: 60 },
    { key: 'category', title: 'Категорія', type: 'text', options: ['Спеціаліст', 'Друга', 'Перша', 'Вища'] }
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

function findOptions(column) {
  if (column.fromSubjects) {
    return findSubjectNames();
  }

  if (column.options) {
    return column.options;
  }

  return null;
}

function hasSubject(name) {
  for (var i = 0; i < database.subjects.length; i++) {
    if (database.subjects[i].name === name) {
      return true;
    }
  }

  return false;
}

function isSubjectUsed(name) {
  for (var i = 0; i < database.teachers.length; i++) {
    if (database.teachers[i].subject === name) {
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

  row.appendChild(document.createElement('th'));
  return row;
}

function createDataCell(tableName, rowIndex, column) {
  var cell = document.createElement('td');
  cell.textContent = database[tableName][rowIndex][column.key];

  cell.addEventListener('click', function () {
    onCellClick(cell, tableName, rowIndex, column);
  });

  return cell;
}

function createDeleteCell(tableName, rowIndex) {
  var cell = document.createElement('td');
  var button = document.createElement('button');
  button.textContent = 'Видалити';

  button.addEventListener('click', function () {
    onDeleteClick(tableName, rowIndex);
  });

  cell.appendChild(button);
  return cell;
}

function createDataRow(tableName, rowIndex) {
  var row = document.createElement('tr');

  for (var i = 0; i < columns[tableName].length; i++) {
    row.appendChild(createDataCell(tableName, rowIndex, columns[tableName][i]));
  }

  row.appendChild(createDeleteCell(tableName, rowIndex));
  return row;
}

function createOption(text) {
  var option = document.createElement('option');
  option.value = text;
  option.textContent = text;
  return option;
}

function createSelect(options, selectedValue) {
  var select = document.createElement('select');

  for (var i = 0; i < options.length; i++) {
    select.appendChild(createOption(options[i]));
  }

  select.value = selectedValue;
  return select;
}

function createEditor(column, value) {
  var options = findOptions(column);
  if (options !== null) {
    return createSelect(options, value);
  }

  var input = document.createElement('input');
  input.value = value;
  return input;
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

function findRenameError(rowIndex, column, value) {
  var oldName = database.subjects[rowIndex].name;

  if (column.key !== 'name' || value === oldName) {
    return null;
  }

  if (isSubjectUsed(oldName)) {
    return 'Предмет "' + oldName + '" використовується в таблиці "Вчителі", його не можна перейменувати';
  }

  return findDuplicateError(value);
}

function findEditError(tableName, rowIndex, column, value) {
  var valueError = findValueError(column, value);
  if (valueError !== null) {
    return valueError;
  }

  if (tableName === 'subjects') {
    return findRenameError(rowIndex, column, value);
  }

  return null;
}

function findDeleteError(tableName, rowIndex) {
  if (tableName !== 'subjects') {
    return null;
  }

  var name = database.subjects[rowIndex].name;
  if (isSubjectUsed(name)) {
    return 'Не можна видалити предмет "' + name + '": його викладає вчитель з таблиці "Вчителі"';
  }

  return null;
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

function onDeleteClick(tableName, rowIndex) {
  var message = findDeleteError(tableName, rowIndex);

  if (message !== null) {
    showMessage(message);
    return;
  }

  database[tableName].splice(rowIndex, 1);
  renderAll();
}

function onCellEdit(tableName, rowIndex, column, value) {
  var message = findEditError(tableName, rowIndex, column, value);

  if (message !== null) {
    showMessage(message);
    return;
  }

  database[tableName][rowIndex][column.key] = convertValue(column, value);
}

// Клік по клітинці: показуємо поле редагування, Enter або клік повз - зберігає
function onCellClick(cell, tableName, rowIndex, column) {
  if (cell.firstChild && cell.firstChild.tagName) {
    return;
  }

  var editor = createEditor(column, String(database[tableName][rowIndex][column.key]));
  var isFinished = false;

  function onFinish() {
    if (isFinished) {
      return;
    }

    isFinished = true;
    onCellEdit(tableName, rowIndex, column, editor.value.trim());
    renderAll();
  }

  editor.addEventListener('blur', onFinish);
  editor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      onFinish();
    }
  });

  cell.textContent = '';
  cell.appendChild(editor);
  editor.focus();
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
