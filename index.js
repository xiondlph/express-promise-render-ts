/**
 * express-promise-render-ts
 * Copyright(c) 2019 Shukhrat Ismailov <shukhrat@ismax.ru>
 * MIT Licensed
 */

'use strict';

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
     * that is attached to a response object
     *
     * @method promiseRender
     * @param {Object} view A string that is the file path of the view file to render
     * @param {Object} locals An object whose properties define local variables for the view
     * @return {Promise}
     */
    res.promiseRender = (view, locals) => new Promise((resolve, reject) => {
        res.render(view, locals, (err, html) => {
            if (err) {
                reject(err);
            }

            resolve(html);
        });
    });

    next();
};
