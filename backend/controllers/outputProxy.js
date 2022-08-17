const mongoose = require('mongoose');

const outputProxy = mongoose.model('OutputProxy')

const allOP = (req, res) => {
    outputProxy
        .find()
        .exec((cbError, results) => {
            if (!results) {
                return res.status(404).json({
                    "errMsg":
                        "No document found in outputProxy collection"
                });
            } else if (cbError) {
                return res.status(500).json(cbError);
            }
            res.status(200).json(results);
        });
};

module.exports = {
    allOP
}