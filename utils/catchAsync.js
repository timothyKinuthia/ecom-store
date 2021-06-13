const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => res.json({error: err}))
    }
}

module.exports = catchAsync