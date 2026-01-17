import { Module, Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectsModule } from './projects/projects.module';
import { BillingModule } from './billing/billing.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { TeamMeetsModule } from './team-meets/team-meets.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Load environment files. Prefer `.env.<NODE_ENV>` if present, otherwise fall back to `.env`.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      // allow environment variable expansion like ${VAR}
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): MongooseModuleOptions => {
        const logger = new Logger('MongoDB');
        const uri =
          config.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/websterwork';

        return {
          uri,
          connectionFactory: (connection: Connection) => {
            connection.on('connected', () =>
              logger.log(`MongoDB connected to ${connection.name}`),
            );
            connection.on('error', (err: unknown) =>
              logger.error('MongoDB connection error', err as Error),
            );
            connection.on('disconnected', () =>
              logger.warn('MongoDB disconnected'),
            );
            return connection;
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    MessagesModule,
    ProjectsModule,
    BillingModule,
    TwoFactorModule,
    TeamMeetsModule,
    HealthModule,
  ],
  controllers: [AppController], // ✅ Add this
  providers: [AppService], // ✅ Add this
})
export class AppModule {}
