const errorHandler = (err, res, req, next) => {
    console.error(err);
    res.status(err.status || 500).json({error: err.message || "Error en el servidor"});
};

module.exports = errorHandler;
