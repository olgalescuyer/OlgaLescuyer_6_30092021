const Sauce = require('../models/Sauce');

const fs = require('fs');

exports.createSauce = (req, res, next) => {

    const sauceData = JSON.parse(req.body.sauce)
    delete sauceData._id;
    const sauce = new Sauce({
        ...sauceData,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: [],
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet créé !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.manageLike = (req, res, next) => {
    // grabs user id
    let userId = req.body.userId;
    // grabs sauce id
    let sauceId = req.params.id;
    // grabs 'like' in request body
    let like = req.body.like;

    if (like === 1) {
        // if user smashes the like button
        // => updates the sauce given its id
        Sauce.updateOne({ _id: sauceId }, {
                // [ mongoDB push operator ]
                // pushes userId to usersLiked: [array]
                $push: { usersLiked: userId },
                // [ mongoDB increment operator ]
                // increments likes [array]
                $inc: { likes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "Like ajouté par l'utilisateur !" })
            )
            .catch((error) => res.status(400).json({ error }));
    }

    if (like === -1) {
        // if user smashes the dislike button
        // => updates the sauce given its id
        Sauce.updateOne({ _id: sauceId }, {
                // [ mongoDB push operator ]
                // pushes userId to usersDisliked: [array]
                $push: { usersDisliked: userId },
                // [ mongoDB increment operator ]
                // increments dislikes [array]
                $inc: { dislikes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "Dislike ajouté par l'utilisateur !" })
            )
            .catch((error) => res.status(400).json({ error }));
    }

    // Remove like / dislike
    if (like === 0) {
        Sauce.findOne({
                _id: sauceId,
            })
            .then((sauce) => {
                // remove like
                // if user has already liked
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                        .then(() =>
                            res
                            .status(200)
                            .json({ message: "Like retiré par l'utilisateur !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
                // remove dislike
                // if user has already disliked
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                        .then(() =>
                            res
                            .status(200)
                            .json({ message: "Dislike retiré par l'utilisateur !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};