import app from "./app";
import cors from 'cors';
//Nuestra función principal, donde configuramos nuestro servidor

const main=()=>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
}

app.use( cors({ origin: true, credentials: true  }) );


main();