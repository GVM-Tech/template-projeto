// Define the environment for the process
const ambienteProcesso = process.env.AMBIENTE_PROCESSO || 'desenvolvimento';

// Determine the path to the environment configuration file based on the environment
const caminhoEnv = ambienteProcesso === 'producao' ? '.env' : '.env.dev';

// Load environment variables from the appropriate .env file
require('dotenv').config({ path: caminhoEnv });

const express = require('express');
const cors = require('cors');
const path = require('path');

// Retrieve port and host from environment variables
const PORTA_APP = process.env.APP_PORT || 3000;
const HOST_APP = process.env.APP_HOST || 'localhost';

// Create an Express application
const app = express();

// Import routers
const indexRouter = require('./src/routes/index');
const usuarioRouter = require('./src/routes/usuarios');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Route setup
app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);

// Start the server
app.listen(PORTA_APP, () => {
    console.log(`
          _____                    _____                    _____                    _____          
         /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         
        /::\\    \\                /::\\____\\                /::\\____\\                /::\\    \\        
       /::::\\    \\              /::::|   |               /:::/    /               /::::\\    \\       
      /::::::\\    \\            /:::::|   |              /:::/    /               /::::::\\    \\      
     /:::/\\:::\\    \\          /::::::|   |             /:::/    /               /:::/\\:::\\    \\     
    /:::/  \\:::\\    \\        /:::/|::|   |            /:::/____/               /:::/__\\:::\\    \\    
   /:::/    \\:::\\    \\      /:::/ |::|   |            |::|    |               /::::\\   \\:::\\    \\   
  /:::/    / \\:::\\    \\    /:::/  |::|___|______      |::|    |     _____    /::::::\\   \\:::\\    \\  
 /:::/    /   \\:::\\ ___\\  /:::/   |::::::::\\    \\     |::|    |    /\\    \\  /:::/\\:::\\   \\:::\\____\\ 
/:::/____/  ___\\:::|    |/:::/    |:::::::::\\____\\    |::|    |   /::\\____\\/:::/  \\:::\\   \\:::|    |
\\:::\\    \\ /\\  /:::|____|\\::/    / ~~~~~/:::/    /    |::|    |  /:::/    /\\::/   |::::\\  /:::|____|
 \\:::\\    /::\\ \\::/    /  \\/____/      /:::/    /     |::|    | /:::/    /  \\/____|:::::\\/:::/    / 
  \\:::\\   \\:::\\ \\/____/               /:::/    /      |::|____|/:::/    /         |:::::::::/    /  
   \\:::\\   \\:::\\____\\                /:::/    /       |:::::::::::/    /          |::|\\::::/    /   
    \\:::\\  /:::/    /               /:::/    /        \\::::::::::/____/           |::| \\::/____/    
     \\:::\\/:::/    /               /:::/    /          ~~~~~~~~~~                 |::|  ~|          
      \\::::::/    /               /:::/    /                                      |::|   |          
       \\::::/    /               /:::/    /                                       \\::|   |          
        \\::/____/                \\::/    /                                         \\:|   |          
                                  \\/____/                                           \\|___|          
                                                                                               
    \n\n\n                                                                                                 
    O servidor está rodando! Acesse .: http://${HOST_APP}:${PORTA_APP} :. para visualizar o site\n
    \t\tA sua aplicação está rodando no ambiente de .:${process.env.AMBIENTE_PROCESSO}:.`);
});
