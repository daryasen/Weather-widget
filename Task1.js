const fs = require('fs');
const xml2js = require('xml2js');

// Читаем XML-файл
const xmlData = fs.readFileSync('input.xml', 'utf-8');

// Создаем парсер
const parser = new xml2js.Parser();

// Преобразуем XML в JS-объект
parser.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Ошибка при парсинге XML:', err);
    return;
  }

  // Получаем список студентов
  const students = result.list.student;

  // Преобразуем студентов в требуемый формат
  const jsObject = {
    list: students.map(student => {
      const name = student.name[0];
      const firstName = name.first[0];
      const lastName = name.second[0];
      const lang = name.$.lang;

      return {
        name: `${firstName} ${lastName}`,
        age: Number(student.age[0]),
        prof: student.prof[0],
        lang: lang
      };
    })
  };

  // Выводим результат в консоль
  console.log(jsObject);
});

