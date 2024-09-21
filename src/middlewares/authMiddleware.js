// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//     const token = req.headers.authorization;
//     console.log("Token:", token)
//     if (token) {
//         const access = token.split(" ")[1];
//         jwt.verify(access, 'DungLapLanh', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message)
//                 return res.status(403).json({ message: 'Token không hợp lệ' });
//             }
//             else {
//                 req.user = decodedToken;
//                 next()
//             }
//         })
//     } else res.status(401).json({ message: 'Authentication required' });
// };
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    console.log("Token:", token);

    if (token) {
        const access = token.split(" ")[1];
        jwt.verify(access, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(403).json({ message: 'Token không hợp lệ' });
            } else {
                req.user = decodedToken; // Lưu thông tin người dùng đã giải mã
                next(); // Tiếp tục với middleware tiếp theo
            }
        });
    } else {
        res.status(401).json({ message: 'Authentication required' });
    }
};
