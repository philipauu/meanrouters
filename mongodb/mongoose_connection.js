var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27500/medical', {
    useMongoClient: true
});

var contact = {
    email: String,
    cell: String
}

var contact_schema = new mongoose.Schema(contact);

var drugs = {
    drug: String,
    udage: Number
}

var drugs_schema = new mongoose.Schema(drugs);

var patient = {
    name: String,
    gender: String,
    contact: contact,
    medical: drugs
}

var PATIENTCLASS = mongoose.model('patients', patient_schema);

module.exports = PATIENTLASS;