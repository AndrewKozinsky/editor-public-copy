import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import ormconfig from '../ormconfig'
import { LanguageMiddleware } from './user/middlewares/language.middleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthMiddleware } from './user/middlewares/auth.middleware'


@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig),
      ServeStaticModule.forRoot({
          // String is pointing to /app/src/staticFiles
          rootPath: join(__dirname, '../../src', 'staticFiles'),
          renderPath: 'wildcard'
      }),
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LanguageMiddleware, AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}
