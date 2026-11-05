// Предметна область: школа. Дві сутності: предмети і вчителі.

// Дані зберігаються тільки в localStorage, у коді їх немає.
// Спочатку таблиці порожні - дані додаються через форми.
var subjects = [];
var teachers = [];

// Які колонки є в таблицях: ключ в об'єкті і заголовок
// type - тип даних, min/max - межі для чисел, options - значення для вибору зі списку
var subjectColumns = [
  { key: 'name', title: 'Назва', type: 'text' },
  { key: 'department', title: 'Кафедра', type: 'text' },
  { key: 'hours', title: 'Годин на рік', type: 'number', min: 1, max: 500 },
  { key: 'grade', title: 'Клас', type: 'number', min: 1, max: 11 },
  { key: 'room', title: 'Кабінет', type: 'text' },
  { key: 'difficulty', title: 'Складність (1-5)', type: 'number', min: 1, max: 5 },
  { key: 'mandatory', title: "Обов'язковий", type: 'text', options: ['Так', 'Ні'] }
];

// Колонка "Предмет" у вчителів - це список, значення беруться з таблиці предметів (fromSubjects)
var teacherColumns = [
  { key: 'fullName', title: 'ПІБ', type: 'text' },
  { key: 'subject', title: 'Предмет', type: 'text', fromSubjects: true },
  { key: 'email', title: 'Email', type: 'text' },
  { key: 'phone', title: 'Телефон', type: 'text' },
  { key: 'rate', title: 'Ставка', type: 'number', min: 0.25, max: 2 },
  { key: 'experience', title: 'Стаж (років)', type: 'number', min: 0, max: 60 },
  { key: 'category', title: 'Категорія', type: 'text', options: ['Спеціаліст', 'Друга', 'Перша', 'Вища'] }
];

function getRows(tableName) {
  if (tableName === 'subjects') {
    return subjects;
  }
  return teachers;
}

// ---- Робота з localStorage ----
var STORAGE_KEY = 'school_data';

function saveData() {
  var data = { subjects: subjects, teachers: teachers };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Читає дані зі сховища (якщо вони там є) у змінні subjects і teachers
function loadData() {
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    var data = JSON.parse(saved);
    subjects = data.subjects;
    teachers = data.teachers;
  }
}

// Значення для випадного списку: або фіксований список, або назви предметів
function getOptions(column) {
  if (column.fromSubjects) {
    var names = [];
    for (var i = 0; i < subjects.length; i++) {
      names.push(subjects[i].name);
    }
    return names;
  }
  return column.options;
}

// Заповнює список предметів у формі додавання вчителя
function fillSubjectSelect() {
  var select = document.getElementById('teacher-subject');
  var oldValue = select.value;
  select.innerHTML = '';
  for (var i = 0; i < subjects.length; i++) {
    var option = document.createElement('option');
    option.value = subjects[i].name;
    option.textContent = subjects[i].name;
    select.appendChild(option);
  }
  select.value = oldValue;
}

// Перемальовує все на сторінці
function renderAll() {
  renderTable('subjects');
  renderTable('teachers');
  fillSubjectSelect();
}

function getColumns(tableName) {
  if (tableName === 'subjects') {
    return subjectColumns;
  }
  return teacherColumns;
}

// Малює таблицю: tableName - це 'subjects' або 'teachers'
function renderTable(tableName) {
  var table = document.getElementById(tableName + '-table');
  var columns = getColumns(tableName);
  var rows = getRows(tableName);
  table.innerHTML = '';

  var headRow = document.createElement('tr');
  for (var i = 0; i < columns.length; i++) {
    var th = document.createElement('th');
    th.textContent = columns[i].title;
    headRow.appendChild(th);
  }
  headRow.appendChild(document.createElement('th')); // колонка для хрестика
  table.appendChild(headRow);

  for (var r = 0; r < rows.length; r++) {
    var tr = document.createElement('tr');
    for (var c = 0; c < columns.length; c++) {
      addCell(tr, tableName, r, columns[c]);
    }
    addDeleteButton(tr, tableName, r);
    table.appendChild(tr);
  }
}

// Комірка з даними, по кліку її можна змінити
function addCell(tr, tableName, index, column) {
  var td = document.createElement('td');
  td.textContent = getRows(tableName)[index][column.key];
  td.addEventListener('click', function () {
    editCell(td, tableName, index, column);
  });
  tr.appendChild(td);
}

// Хрестик справа в рядку
function addDeleteButton(tr, tableName, index) {
  var td = document.createElement('td');
  var button = document.createElement('button');
  button.textContent = 'x';
  button.addEventListener('click', function () {
    deleteRow(tableName, index);
  });
  td.appendChild(button);
  tr.appendChild(td);
}

// Перевіряє, чи є предмет з такою назвою
function subjectExists(name) {
  for (var i = 0; i < subjects.length; i++) {
    if (subjects[i].name === name) {
      return true;
    }
  }
  return false;
}

// Перевіряє, чи використовується предмет у таблиці вчителів
function isSubjectUsed(name) {
  for (var i = 0; i < teachers.length; i++) {
    if (teachers[i].subject === name) {
      return true;
    }
  }
  return false;
}

// Видалення рядка
function deleteRow(tableName, index) {
  loadData(); // беремо свіжі дані (їх могла змінити інша вкладка)
  var rows = getRows(tableName);

  if (tableName === 'subjects' && isSubjectUsed(rows[index].name)) {
    alert('Предмет "' + rows[index].name + '" використовується в таблиці "Вчителі", тому його не можна видалити');
    return;
  }

  rows.splice(index, 1);
  saveData();
  renderAll();
}

// Показує помилку і повертає в таблиці старі значення
function showError(text, tableName) {
  alert(text);
  renderTable(tableName);
}

// Редагування комірки: замість тексту з'являється поле вводу
function editCell(td, tableName, index, column) {
  if (td.querySelector('input, select')) {
    return; // вже редагується
  }

  var row = getRows(tableName)[index];
  var options = getOptions(column);
  var input;

  if (options) {
    input = document.createElement('select');
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement('option');
      option.value = options[i];
      option.textContent = options[i];
      input.appendChild(option);
    }
  } else {
    input = document.createElement('input');
    if (column.type === 'number') {
      input.type = 'number';
    }
  }
  input.value = row[column.key];

  td.textContent = '';
  td.appendChild(input);
  input.focus();

  var finished = false;
  function save() {
    if (finished) {
      return;
    }
    finished = true;
    saveCell(tableName, index, column, input.value);
  }

  // Enter або клік будь-де поза полем (blur) зберігає значення
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      save();
    }
  });
  input.addEventListener('blur', save);
}

// Перевірка і збереження нового значення комірки
function saveCell(tableName, index, column, newValue) {
  loadData(); // свіжі дані зі сховища
  var row = getRows(tableName)[index];
  newValue = newValue.trim();

  if (newValue === '') {
    showError('Поле не може бути порожнім', tableName);
    return;
  }

  if (column.type === 'number') {
    newValue = Number(newValue);
    if (isNaN(newValue) || newValue < column.min || newValue > column.max) {
      showError('Число має бути від ' + column.min + ' до ' + column.max, tableName);
      return;
    }
  }

  if (newValue === row[column.key]) {
    renderTable(tableName);
    return;
  }

  if (tableName === 'subjects' && column.key === 'name') {
    if (subjectExists(newValue)) {
      showError('Такий предмет вже є', tableName);
      return;
    }
    if (isSubjectUsed(row.name)) {
      showError('Назву не можна змінити: предмет використовується в таблиці "Вчителі"', tableName);
      return;
    }
  }

  if (tableName === 'teachers' && column.key === 'subject' && !subjectExists(newValue)) {
    showError('Такого предмета немає в таблиці "Предмети"', tableName);
    return;
  }

  row[column.key] = newValue;
  saveData();
  renderAll();
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

// Додавання предмета
function addSubject() {
  loadData();
  var name = document.getElementById('subject-name').value.trim();
  var department = document.getElementById('subject-department').value.trim();
  var hours = Number(document.getElementById('subject-hours').value);
  var grade = Number(document.getElementById('subject-grade').value);
  var room = document.getElementById('subject-room').value.trim();
  var difficulty = Number(document.getElementById('subject-difficulty').value);
  var mandatory = document.getElementById('subject-mandatory').value;

  if (name === '' || department === '' || room === '') {
    alert('Заповніть усі поля');
    return;
  }
  if (!(hours > 0) || !(grade >= 1 && grade <= 11)) {
    alert('Години мають бути більше 0, клас - від 1 до 11');
    return;
  }
  if (!(difficulty >= 1 && difficulty <= 5)) {
    alert('Складність має бути від 1 до 5');
    return;
  }
  if (subjectExists(name)) {
    alert('Такий предмет вже є');
    return;
  }

  subjects.push({
    name: name,
    department: department,
    hours: hours,
    grade: grade,
    room: room,
    difficulty: difficulty,
    mandatory: mandatory
  });
  saveData();
  renderAll();

  document.getElementById('subject-name').value = '';
  document.getElementById('subject-department').value = '';
  document.getElementById('subject-hours').value = '';
  document.getElementById('subject-grade').value = '';
  document.getElementById('subject-room').value = '';
  document.getElementById('subject-difficulty').value = '';
}

// Додавання вчителя
function addTeacher() {
  loadData();
  var fullName = document.getElementById('teacher-fullName').value.trim();
  var subject = document.getElementById('teacher-subject').value.trim();
  var email = document.getElementById('teacher-email').value.trim();
  var phone = document.getElementById('teacher-phone').value.trim();
  var rate = Number(document.getElementById('teacher-rate').value);
  var experience = document.getElementById('teacher-experience').value;
  var category = document.getElementById('teacher-category').value;

  if (fullName === '' || subject === '' || email === '' || phone === '' || experience === '') {
    alert('Заповніть усі поля');
    return;
  }
  if (!subjectExists(subject)) {
    alert('Такого предмета немає в таблиці "Предмети"');
    return;
  }
  if (email.indexOf('@') === -1) {
    alert('Email має містити @');
    return;
  }
  if (!(rate > 0 && rate <= 2)) {
    alert('Ставка має бути від 0 до 2');
    return;
  }
  if (Number(experience) < 0) {
    alert("Стаж не може бути від'ємним");
    return;
  }

  teachers.push({
    fullName: fullName,
    subject: subject,
    email: email,
    phone: phone,
    rate: rate,
    experience: Number(experience),
    category: category
  });
  saveData();
  renderAll();

  document.getElementById('teacher-fullName').value = '';
  document.getElementById('teacher-email').value = '';
  document.getElementById('teacher-phone').value = '';
  document.getElementById('teacher-rate').value = '';
  document.getElementById('teacher-experience').value = '';
}

document.getElementById('add-subject').addEventListener('click', addSubject);
document.getElementById('add-teacher').addEventListener('click', addTeacher);

// Якщо дані змінили в іншій відкритій вкладці - оновлюємо цю сторінку
window.addEventListener('storage', function (event) {
  if (event.key === STORAGE_KEY) {
    loadData();
    renderAll();
  }
});

// Старт: беремо дані з localStorage (якщо вони там є), інакше таблиці порожні
loadData();
renderAll();
showTab('subjects');
