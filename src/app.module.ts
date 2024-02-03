import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/auth/auth.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
