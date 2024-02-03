import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from '@/infra/env/env'
import { z } from 'zod'
import { base64Encode } from '@/core/utils/base64-encode'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type AuthUser = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: base64Encode(publicKey),
      algorithms: ['RS256'],
    })
  }

  async validate(payload: AuthUser) {
    return tokenPayloadSchema.parse(payload)
  }
}
