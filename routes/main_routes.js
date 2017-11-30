var router = require('express').Router();
var PATIENTCLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
    console.log('doing homepage');
    res.render('index');
}

//---------------------API-------------------------
router.get('/api/v8/read', do_get_all);
router.get('/api/v8/read/:_id', do_get_one);
router.post('/api/v8/create', do_create);
router.put('/api/v8/update', do_update);
router.delete('/api/v8/delete/:_id', do_delete);
//-------------------------------------------------

function do_get_all(req, res) {
    console.log('reading all patients');

    PATIENTCLASS.find({}, {
            name: 1,
            gender: 1
        })
        .then(function (patients) {
            console.log(patients);
            res.json(patients);
        });
}

function do_get_one(req, res) {
    console.log('reading single patient');
    console.log(req.params);

    PATIENTCLASS.findById(req.params._id)
        .then(function (patient) {
            console.log(patient);
            res.json(patient);
        });
}

function do_create(req, res) {
    console.log('creating patient');
    console.log(req.body);

    if (req.body.name == '' || req.body.name == null) {
        res.json({
            error: 'no name of patient'
        });
    }

    var data = {

        name: req.body.name,
        gender: req.body.gender,
        contact: {
            email: req.body.email,
            cell: req.body.cell
        },
        medical: {
            drug: req.body.drug,
            usage: req.body.usage
        }

    }

    var patient = new PATIENTCLASS(data);
    user.save().then(function (result) {
        console.log(result);
        res.json({
            message: 'backend created patient'
        });
    });
}

function do_update(req, res) {
    console.log('updating patient');
    console.log(req.body);
    var update = {
        $set: req.body.patient //FRONTEND CONTROLLER
    }

    // BACKEND CONTROLLER (MORE CHECKS):
    // {
    //     $set: {
    //         name: req.body.name,
    //         gender: req.body.gender,
    //         contact: {
    //             email: req.body.email,
    //             cell: req.body.cell
    //         },
    //         medical: {
    //             drug: req.body.drug,
    //             usage: req.body.usage
    //         }
    //     }
    // }

    PATIENTCLASS.findByIdAndUpdate(req.body.patient._id, update)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend updated patient'
            });
        });

};

function do_delete(req, res) {
    console.log('deleting patient');
    console.log(req.params._id);

    PATIENTCLASS.findByIdAndRemove(req.params._id)
        .then(function (result) {
            console.log(result);
            res.json({
                message: 'backend deleted patient'
            });
        });
}