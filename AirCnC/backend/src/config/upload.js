
//MULTER é um pakage node.js para manipulação multipart/form-data, usado principalmente para o upload de arquivos. 
const multer = require('multer'); 
//A palavra REQUIRE - chave é usada no Node.js para importar módulos.

const path = require('path');
// PATH modulo  usado para informar o caminho completo para o arquivo carregado

module.exports = { // exporta um objeto com varias configurações

  storage: multer.diskStorage({ //storage são as forma de salvar, diskStorage é o mecanismo de armazenamento em DISCO, Existem duas opções disponíveis destination e filename
    
    destination: path.resolve(__dirname, '..', '..', 'uploads'), //destination é usado para determinar em qual pasta os arquivos enviados devem ser armazenados.
    //__dirname é usado para indicar o diretorio atual, nesse caso acima a pasta config, dessa forma informamos que ele iniciará desta pasta pra chegar ao destino
    
    //filename é usado para determinar como o arquivo deve ser nomeado dentro da pasta
    filename: (req, file, cb) => { 
      //req: a requisição que foi feita aquela rota (normal do express);
      //file: algumas informações do arquivo que foi recebido (nome, tipo, etc);
      //cb: callback que executaremos com a resposta(no seu segundo parâmetro).
      
      const ext = path.extname(file.originalname); 
      //  path.extname é usado para manter a extensão do arquivo original
      const name = path.basename(file.originalname, ext);
      // basename é usado para nomear o arquivo, nesse caso recebe o nome original + a extenção

      cb(null, `${name}-${Date.now()}${ext}`);
      // Setamos o nome do arquivo que vai ser salvado no segundo paramêtro
      // a data é utilizada para que um arquivo com mesmo nome nao substitua outro
    },
  }),
};