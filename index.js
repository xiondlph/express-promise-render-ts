/**
 * express-promise-render-ts
 * Copyright(c) 2019 Shukhrat Ismailov <shukhrat@ismax.ru>
 * MIT Licensed
 */


/**
 * The middleware of promise render wrapper
 *
 * @param {Request} req Express request object
 * @param {Response} res Response request object
 * @param {Function} next Express next function
 */
module.exports = (req, res, next) => {

    /**
     * The method of promise render wrapper
     *
     * @method promiseRender
     * @param {Object} view Used view engine
     * @param {Object|Function} options Render options
     * @return {Promise}
     */
    res.promiseRender = (view, options) => new Promise((resolve, reject) => {
        res.render(view, options, (err, html) => {
            if (err) {
                reject(err);
            }

            resolve(html);
        });
    });

    next();
};
