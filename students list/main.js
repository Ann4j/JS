
// Масссив студентов
const studentsList = [
  {
    sureName: 'Иванов',
    name: "Иван",
    fullName: 'Иванович',
    date: new Date('06.04.1997'),
    yearStudies: 2020,
    faculty: 'Высшая математика'
  },
  {
    sureName: 'Чернышева',
    name: "Анна",
    fullName: 'Сергеевна',
    date: new Date('12.05.2000'),
    yearStudies: 2019,
    faculty: 'Высшая математика'
  },
  {
    sureName: 'Петров',
    name: "Сергей",
    fullName: 'Юрьевич',
    date: new Date('02.05.2000'),
    yearStudies: 2015,
    faculty: 'Информатика'
  },
  {
    sureName: 'Иванова',
    name: "Юлия",
    fullName: 'Владимировна',
    date: new Date('12.12.2003'),
    yearStudies: 2023,
    faculty: 'Архитектура'
  },
  {
    sureName: 'Хан',
    name: "Александр",
    fullName: 'Александрович',
    date: new Date('09.05.2000'),
    yearStudies: 2023,
    faculty: 'Истории'
  }
]

// массив колонок

const columns = [
  {
    key: 'sureName',
    name: 'Фамилия',
  },
  {
    key: 'name',
    name: 'Имя',
  },
  {
    key: 'fullName',
    name: 'Отчество',
  },
  {
    key: 'date',
    name: 'Дата рождения',
    // Преобразуеум дату рождения и вычисляем возраст
    format(date = new Date) {

      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      let yy = date.getFullYear();
      if (yy < 10) yy = '0' + yy;

      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();

      if (today.getMonth() < date.getMonth() ||
        (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())) {
        age--;
      }
      return `${dd}.${mm}.${yy} (${age})`
    },

  },
  {
    key: 'yearStudies',
    name: 'Годы обучения',
    // Вычисляем годы обучения и курс
    format(yearStudies) {
      const today = new Date();
      let endStudies = yearStudies + 4;
      let courseStudies
      if (today.getFullYear() > endStudies) {
        courseStudies = 'Закончил'
      } else if (today.getFullYear() < endStudies && today.getMonth() < 9) {
        courseStudies = `${today.getFullYear() - yearStudies} курс`;
      } else {
        courseStudies = '1 курс';
      }
      return `${yearStudies} - ${endStudies} (${courseStudies})`
    },
  },
  {
    key: 'faculty',
    name: 'Факультет',
  }
]

// создаем  строку с заголовками наших столбцов на основе объекта

const header = document.getElementById("thead")
let tableRowHeader = document.createElement('tr')

for (const column of columns) {
  let tableHeader = document.createElement('th');
  tableHeader.scope = 'col';
  tableHeader.classList.add('table__th')
  tableHeader.textContent = column.name;
  // сортировка
  tableHeader.addEventListener('click', function () {
    let filterStudentsList = filter(studentsList);
    if (tableHeader.textContent === 'Годы обучения') {
      filterStudentsList.sort((a, b) => sortNumber(a.yearStudies, b.yearStudies));
    } else if (tableHeader.textContent === 'Фамилия') {
      filterStudentsList.sort((a, b) => sortString(a.sureName, b.sureName));
    } else if (tableHeader.textContent === 'Имя') {
      filterStudentsList.sort((a, b) => sortString(a.name, b.name));
    } else if (tableHeader.textContent === 'Отчество') {
      filterStudentsList.sort((a, b) => sortString(a.fullName, b.fullName));
    } else if (tableHeader.textContent === 'Дата рождения') {
      filterStudentsList.sort((a, b) => sortNumber(b.date, a.date));
    }
    tbody.innerHTML = '';
    renderTable(filterStudentsList)
  })
  thead.append(tableRowHeader);
  tableRowHeader.append(tableHeader)
}

// включаем данные из массива объектов в таблицу

const tbody = document.getElementById("tbody")

function renderTable(studentsList) {
  for (const rowStudent of studentsList) {
    let tableRowBody = document.createElement('tr')
    for (const column of columns) {
      let cellStudent = document.createElement('td')
      if (column.format) {
        cellStudent.textContent = column.format(rowStudent[column.key])
      } else {
        cellStudent.textContent = rowStudent[column.key]
      }
      tbody.append(tableRowBody)
      tableRowBody.append(cellStudent)
    }
  }
}

// создаем событие submit на кнопку и валидацию

const formAddStudents = document.getElementById("form");
const divTop = document.getElementById("div");
const allInputs = form.querySelectorAll('input');
form.addEventListener('submit', function (event) {
  event.preventDefault()

  // достаем данные из формы
  const formData = new FormData(form);
  const user = Object.fromEntries(formData);

  //выполняем валидацию
  const allInputs = form.querySelectorAll('input')
  let isValid = true;
  for (const input of allInputs) {
    input.value = input.value.trim()
    if (input.value === "") {
      input.classList.add('add__input-error');
      input.value = "Незаполнено поле";
      isValid = false;
    }
    if (input.name === 'date' && new Date(input.value) < new Date('01.01.1900')) {
      input.classList.add('add__input-error');
      isValid = false;
    }
    if (input.name === 'yearStudies') {
      user.yearStudies = new Number(input.value);
      console.log(user.yearStudies > 2023)
      if (user.yearStudies > 2023 || user.yearStudies < 2000 || isNaN(input.value)) {
        input.classList.add('add__input-error');
        input.value = "Неккоректный год обучения";
        isValid = false;
      }
    }

  }
  // добавление студента в массив
  if (isValid) {
    user.date = new Date(user.date)
    studentsList.push(user);
    tbody.innerHTML = '';
    renderTable(studentsList)
  }
})

allInputs.forEach(input => input.addEventListener('click', function () {
  input.classList.remove('add__input-error')
  input.value = "";
}));

// сортируем данные колонок
function sortNumber(a, b) {
  return a - b;
}

function sortString(a, b) {
  if (a > b) return 1; // если первое значение больше второго
  if (a == b) return 0; // если равны
  if (a < b) return -1; // если первое значение меньше второго
}

renderTable(studentsList)


//  создаем событие на изменение в форме фильтрации

const formFilterStudents = document.getElementById("filter__form");
const filterInputs = formFilterStudents.querySelectorAll('input');
let storageFilters = {};
for (let filterInput of filterInputs) {
  filterInput.addEventListener('input', function () {
    storageFilters[filterInput.name] = filterInput.value
    tbody.innerHTML = '';
    renderTable(filter(studentsList))
  });
};

function filter(studentsList) {
  let filterStudentsList = studentsList;
  if (storageFilters.fullName) {
    filterStudentsList = filterStudentsList.filter(student => names.every(name => student.name.toLowerCase().includes(name) || student.sureName.toLowerCase().includes(name) || student.fullName.toLowerCase().includes(name)))
  }
  if (storageFilters.faculty) {
    filterStudentsList = filterStudentsList.filter(student => student.faculty.toLowerCase().includes(storageFilters.faculty.toLowerCase()))
  }
  if (storageFilters.yearStudies) {
    filterStudentsList = filterStudentsList.filter(student => student.yearStudies.toString().includes(storageFilters.yearStudies))
  }
  if (storageFilters.endStudies) {
    filterStudentsList = filterStudentsList.filter(student => (student.yearStudies + 4).toString().includes(storageFilters.endStudies))
  }
  return filterStudentsList
}













