const express = require('express');
const baseBook = require('../data');
const route = express.Router();
const joi = require('joi');//VALIDADOR CON ELEMENTOS PREDETERMINADOS (EN ESTE CASO AUTOR Y TITULO)

const validacion = joi.object({ //EN TEORIA CREARIAMOS UN OBJETO DE VALIDACION. 
    titulo: joi.string().required().label('titulo'),
    autor: joi.string().required().label('autor')
});

// REQUEST HTTP GET PARA LISTA DE LIBROS EXISTENTES EN LA BASE DE DATOS.

route.get('/', (req, res, next) => {
    try{res.json(baseBook);
    } catch (err){
        next (err);
    }  
    });

// REQUEST HTTP GET PARA LIBRO DE ACUERDO AL ID INSERTO EN LA RUTA.    

route.get('/:id', (req, res, next) => {
        try{
        const id = parseInt(req.params.id); 
        const book = baseBook.find((b) => b.id === id);
        
        if(!book){
            res.status(404).json({error:"Libro no encontrado"});
            throw error;} 
           res.json(book); //ESTO PODRIA SER PARTE DE UN ELSE TRANQUILAMENTE - PERO HAY QUE APRENDER A SIMPLIFICAR.  
        } 
        catch (err){
            next (err);
        }
    });

// REQUEST HTTP POST PARA CREACION DE UN LIBRO NUEVO PARA LA BASE DE DATOS.

route.post('/', (req, res, next) => {
        try{
            const { error, value } = validacion.validate(req.body); //SE VALIDA EL INGRESO POR BODY CON EL OBJETO CREADO
if (error) {
    res.status(404).json({error:"Error de validacion"});
    throw error;

          //const validationError = new Error('Error de validación'); // NEW ERROR ----> NO SE QUE SERA.
          //validationError.status = 400;
          //validationError.details = error.details.map(detail => detail.message);
          //throw validationError;

        } const {titulo, autor} = value; // ESTE SERIA EL ELSE.

const newBook = {
            id: baseBook.length+1,
            titulo,
            autor
        };
        baseBook.push(newBook);
        res.status(201).json(newBook);
    }   catch (err){
            next (err);
        }
    });

// REQUEST HTTP PUT PARA LA MODIFICACION/ACTUALIZACION DE UN LIBRO EXISTENTE EN LA BASE DE DATOS DE ACUERDO AL ID INSERTO EN LA RUTA..    
    
route.put('/:id', (req, res, next) => { 
        try{    
        const id = parseInt(req.params.id);
        const { error, value } = validacion.validate(req.body); //SE VALIDA EL INGRESO POR BODY CON EL OBJETO CREADO

        //VALIDACION DEL BODY
if (error) {
    res.status(404).json({error:"Error de validacion"});
    throw error;
           //const validationError = new Error('Error de validación'); // NEW ERROR ----> NO SE QUE SERA.
           //validationError.status = 400;
           //validationError.details = error.details.map(detail =>
           //detail.message);
           //throw validationError;//SI HAY ERROR IRIA DIRECTAMENTE AL CATCH SIN EJECUTAR EL RESTO
} const {titulo, autor} = value;


        //VALIDACION DEL ID
const modificacionId = baseBook.find((b) => b.id === id); // NO SE GUARDA EL ID, SE GUARDA EL OBJETO COMPLETO.
        if(!modificacionId){
            res.status(404).json({error:"No puede modificarse un producto cuyo ID no se encuentra en el array."});
            throw error;
        } else {
            
                modificacionId.titulo = titulo || modificacionId.titulo; 
                modificacionId.autor = autor || modificacionId.autor;
                res.json(modificacionId);
    
            }} catch (err){
                next (err);
            }  
        });
 
// REQUEST HTTP DELETE PARA LA ELIMINACION DE UN LIBRO EXISTENTE EN LA BASE DE DATOS DE ACUERDO AL ID INSERTO EN LA RUTA.        

route.delete('/:id', (req, res, next) => {
            try{
            const id = parseInt(req.params.id); 
            const eliminar = baseBook.findIndex((b) => b.id === id);
            if(eliminar===-1){
                res.status(404).json({error:"No puede eliminarse un producto cuyo ID no se encuentra en el array."});
                throw error;
            } else {
                    const productoEliminado = baseBook.splice(eliminar, 1);
                    res.json({Ok: "El libro ha sido correctamente eliminado."});
                   
        
                }}catch (err){
                    next (err);
                }   
            });
    
            module.exports = route;