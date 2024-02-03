import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { AuthUser } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest()
    return request.user
  },
)
