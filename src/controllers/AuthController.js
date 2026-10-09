const USERS = [{
    name: "Joko",
    email: "joko@gmail.com",
    password: "12345678",
},
];

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // 400 bad respone browser
        // 500 server error server/database
        // 200 success
        res.status(400).json({
            status: false,
            message: "Email atau password required"
        });
    }

    const user = USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
        // 401 unauthorize login gagal
        return res.status(401).json({
            status: false,
            message: "Please check your email or password."
        });
    }

    res.status(200).json({
        status: true,
        message: "Login success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: `jwt-token-123 ${user.id} - ${Date.now()}`
        }
    });
};