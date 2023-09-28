import { Controller, Get, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ValidationPipe } from '@lib/utils';
import { IRequest } from '@lib/utils/nest/request';
import { GithubOAuthGuard } from '@lib/core/identity/core/guards/github.guard';
import { FastifyReply } from 'fastify';
import { AuthConfig } from '@lib/config/auth.config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@lib/core/identity';

const tag = 'Identity';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/identity')
export class UserAuthController {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
    protected readonly authConfig: AuthConfig,
    protected readonly jwtService: JwtService
  ) {}

  @Get('/github')
  @ApiOperation({ tags: [tag] })
  @UseGuards(GithubOAuthGuard)
  async githubAuth(@Req() req: IRequest) {
    //
  }

  @Get('/github/callback')
  @ApiOperation({ tags: [tag] })
  @UseGuards(GithubOAuthGuard)
  async githubAuthRedirect(@Req() req: IRequest, @Res() res: FastifyReply) {
    try {
      const token = this.jwtService.sign({ userId: req.user.id });
      res.setCookie('token', token);

      return res.redirect(302, this.authConfig.redirectUri);
    } catch (e) {
      const url = `${this.authConfig.redirectUri}/error?message=${(e as Error).message}`;
      return res.redirect(302, url);
    }
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  @ApiOperation({ tags: [tag] })
  @ApiBearerAuth('authorization')
  async profile(@Req() req: IRequest) {
    return req.user;
  }
}
