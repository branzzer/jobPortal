const testPost = (req, res) => {
    const { name } = req.body
    res.status(200).json({ user: name })
}


module.exports = {
    testPost
}