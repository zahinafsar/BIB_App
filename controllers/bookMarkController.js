const User = require("../models/Users");

exports.add_book_mark = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const user = req.user;
        if (!user.bookMarked.includes(bookId)) {
            await User.updateOne({_id: user._id}, {$set: { bookMarked: [...user.bookMarked, bookId] }}, {upsert: true})
            return res.status(200).json({
                message: "Book is marked successfully",
            })
        } else {
            return res.status(403).json({
                message: "Book is already marked is fevourite",
            })
        }
    } catch (error) {
        next(error);
    }
}