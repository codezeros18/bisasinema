// Ini adalah "jaring pengaman" global untuk server Anda.
// Ia akan menangkap semua error yang tidak tertangani di tempat lain.
export const errorHandler = (err, req, res, next) => {
    // Set status code dari error jika ada, jika tidak, default ke 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    // Khusus menangani error dari middleware otentikasi (express-jwt atau manual)
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Otentikasi gagal, token tidak valid atau hilang.' });
    }
    // Kirim semua error lainnya dalam format JSON yang konsisten
    res.json({
        message: err.message,
        // Tampilkan detail error (stack trace) hanya jika sedang dalam mode development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
