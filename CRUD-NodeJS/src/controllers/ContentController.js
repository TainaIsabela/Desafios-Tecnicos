const connection = require('../database/connection');
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.TOKEN);

const responseModel = {
    sucess: false,
    data: null,
    error: null

};



module.exports = {
    postContent: async (req, res) => {
        const response = {
            ...responseModel
        };
        const {
            title,
            year,
            duration,
            link
        } = req.body;
        const [, affectRows] = await connection.query(`INSERT INTO content (title, year, duration, link) VALUES ('${title}', '${year}', '${duration}', '${link}')`);
        response.sucess = affectRows > 0;
        response.data = req.body;

        

        return res.json(response);
    },

    getContent: async (req, res) => {
        const response = {
            ...responseModel
        };
        const [rows] = await connection.query(`SELECT * FROM content`);
        response.sucess = rows.length > 0;
        response.data = rows;
        return res.json(response);
    }
}