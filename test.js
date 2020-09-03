const fs = require("fs");

function getProperty(lineText) {
  const [_, property, ...lines] = lineText.split('`');
  const object = {};
  const line = lines.join('')
  if (line.includes('INT')) {
    object.type = 'INT'
  } else if (line.includes('VARCHAR')) {
    object.type = 'VARCHAR'
  } else if (line.includes('CHAR')) {
    object.type = 'CHAR'
  } else if (line.includes("ENUM")) {
    object.type = 'ENUM'
  }

  if(line.includes('PRIMARY KEY')) {
    object.isPrimary = true
  }
  return [property, object];
}

const getModels = pathFile => {
  const data = fs.readFileSync(pathFile, "utf8");
  
  const splitData = data.split(";");
  
  const modelos = splitData.reduce((modelos, sentencia) => {
    const row = sentencia.split("\n");
    const isTable = row.some(text => text.includes("CREATE TABLE"));
  
    if (isTable) {
      const modeloInicial = {
        database: "",
        table: "",
        properties: { }
      };
  
      const modelo = row.reduce((modelo, text) => {
        if (text.includes('CREATE')) {
          const fragments = text.split("`");
          modelo.table = fragments[fragments.length - 2];
          modelo.database = fragments[fragments.length - 4];
        } else if(text.trim().charAt(0) === "`" || text.trim().includes("PRIMARY KEY")) {
          const [property='', value={}] = getProperty(text);
          modelo.properties[property] = {...modelo.properties[property], ...value};
        } else {
          // FILTRAR Y TRATAR RELACIONES
        }
        return modelo;
      }, modeloInicial);
  
      modelos.push(modelo)
    }
  
    return modelos
  }, []);

  return modelos
}

console.log(
  getModels("./scripts/bitacora.sql")
)