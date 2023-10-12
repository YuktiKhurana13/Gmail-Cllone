import mongoose from 'mongoose';

const Connection = () => {
    const DB_URI = `mongodb+srv://yuktikhurana5:codeforinterview@gmailclone.vto46ea.mongodb.net/?retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI, { usenewUrlParser: true })
        console.log('database connected successfully');
    } catch (error) {
        console.log('error while connecting with database', error);
    }
};

export default Connection;