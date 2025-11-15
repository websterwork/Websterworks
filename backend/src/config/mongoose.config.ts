// src/config/mongoose.config.ts
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

export const MongooseConfig = MongooseModule.forRootAsync({
  useFactory: () => {
    const uri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/websterwork';
    const logger = new Logger('MongoDB');

    const connection = {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // This will only work if you create a mongoose connection manually
    import('mongoose').then((mongoose) => {
      mongoose.connection.on('connected', () =>
        logger.log(`MongoDB connected at ${uri}`),
      );
      mongoose.connection.on('error', (err) =>
        logger.error('MongoDB connection error:', err),
      );
      mongoose.connection.on('disconnected', () =>
        logger.warn('MongoDB disconnected'),
      );
    });

    return connection;
  },
});
