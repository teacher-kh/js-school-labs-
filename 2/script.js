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

// Заповнює випадний список предметів у формі додавання вчителя
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

// Перевіряє, чи є предмет з такою назвою
function subjectExists(name) {
  for (var i = 0; i < subjects.length; i++) {
    if (subjects[i].name === name) {
      return true;
    }
  }
  return false;
}

// Додавання предмета
function addSubject() {
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
  renderTable('subjects-table', subjectColumns, subjects);
  fillSubjectSelect();

  // очищаємо поля форми
  document.getElementById('subject-name').value = '';
  document.getElementById('subject-department').value = '';
  document.getElementById('subject-hours').value = '';
  document.getElementById('subject-grade').value = '';
  document.getElementById('subject-room').value = '';
  document.getElementById('subject-difficulty').value = '';
}

// Додавання вчителя
function addTeacher() {
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
    alert('Стаж не може бути від\'ємним');
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
  renderTable('teachers-table', teacherColumns, teachers);

  document.getElementById('teacher-fullName').value = '';
  document.getElementById('teacher-email').value = '';
  document.getElementById('teacher-phone').value = '';
  document.getElementById('teacher-rate').value = '';
  document.getElementById('teacher-experience').value = '';
}

document.getElementById('add-subject').addEventListener('click', addSubject);
document.getElementById('add-teacher').addEventListener('click', addTeacher);

renderTable('subjects-table', subjectColumns, subjects);
fillSubjectSelect();
renderTable('teachers-table', teacherColumns, teachers);
showTab('subjects');
