import app from "./app";

//Nuestra función principal, donde configuramos nuestro servidor

const main=()=>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
}

main();