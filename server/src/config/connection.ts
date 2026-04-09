import mongoose from 'mongoose';

export async function connectMongoDB(URL: string): Promise<void> {
    try {
        await mongoose.connect(URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}