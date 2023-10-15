var ruta = require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    var users = await mostrarUsuarios();
    res.render("usuarios/mostrar", {users});
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario", subirArchivo(), async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});

ruta.get("/editarUsuario/:id", async (req, res) => {
    const user = await buscarPorId(req.params.id);
    res.render('usuarios/modificar', {user});
  });
  
  ruta.post("/editarUsuario",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    console.log("error");
    res.redirect("/");
 });

ruta.get("/borrarUsuario/:id", async (req,res)=>{
   await borrarUsuario(req.params.id);
   res.redirect("/");
})

module.exports = ruta;