import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import qs from 'qs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

app.get('/api/auth/google', async (req, res) => {
    const redirect_url: string = process.env.REDIRECT_URL || '';
    const client_id: string = process.env.GOOGLE_CLIENT_ID || '';
    const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');
    const state = crypto.randomUUID();

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
        `client_id=${client_id}&` + 
        `redirect_uri=${redirect_url}&` +
        `response_type=code&` +
        `scope=${scope}&` +
        `state=${state}&` +
        `prompt=consent`;

    res.redirect(authUrl);
});

app.get('/api/auth/callback/google', async (req, res) => {
    const code = req.query.code as string;

    try {
        // 1. access_token 요청
        const requestBody = qs.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirect_uri: process.env.REDIRECT_URL || '',
            grant_type: 'authorization_code',
        });

        const tokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            requestBody,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
        );

        const {access_token, id_token} = tokenResponse.data;

        // 2. 사용자 정보 요청
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const userData = userInfoResponse.data;

        // 3. JWT 생성
        const token = jwt.sign(
            {
                sub: userData.sub,
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. 쿠키에 JWT 설정
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 전송
            sameSite: 'lax',    // or 'Strict', or 'None'
            maxAge: 3600 * 1000, // 1 hour
        });
        
        // 5. 사용자 정보와 JWT 반환(redirect)
        res.redirect('http://localhost:3000/');

    } catch (error) {
        console.error(error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({
            error: 'OAUth Failed', detail: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server listeneing on http://localhost:${PORT}`);
});