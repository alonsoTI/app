const express = require("express");
const router = express.Router();
const userModel = require("../models/usuarios");

/**
 * @swagger
 * components:
 *  schemas:
 *    Usuarios:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del usuario
 *        edad:
 *          type: integer
 *          description: Edad del usuario
 *        correo:
 *          type: string
 *          description: Correo del usuario
 *      required:
 *        - nombre
 *        - edad
 *        - correo
 *      example:
 *        nombre: Víctor Lliuya
 *        edad: 27
 *        correo: vlliuya@certus.edu.pe
 */

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *    summary: Crear un usuario
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#components/schemas/Usuarios'
 *    responses:
 *      200:
 *        description: Usuario creado correctamente
 */
router.post("/usuarios", (req, res) => {
    const user = userModel(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));
});


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Listar todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *        description: Usuarios listados correctamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *              $ref: '#components/schemas/Usuarios'
 *  
 */
router.get("/usuarios", (req, res) => {
    userModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    summary: Listar todos los usuarios
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del usuario a buscar
 *    responses:
 *      200:
 *        description: Usuario encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Usuarios'
 *      404:
 *        description: No existe el usuario
 */
router.get("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    userModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));
});

//Actualizar datos de un usuario
router.put("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, edad, correo} = req.body;
    userModel
        .updateOne({_id : id}, {$set : {nombre, edad, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));

});

/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *    summary: Eliminar usuario por id
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id del usuario a eliminar
 *    responses:
 *      200:
 *        description: Usuario eliminado
 *      404:
 *        description: No existe el usuario
 */
router.delete("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    userModel.deleteOne({_id : id})
        .then((data) => res.json(data))
        .catch((error) => res.json ({mensaje: error}));
});

module.exports = router;