import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from '~/articles/articles.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly articleService: ArticlesService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    const article = await this.articleService.getById(id);
    const user = request.user;

    if (user && article && user.id === article.author?.id) {
      return true;
    }
    throw new BadRequestException(
      'You cannot edit or delete this article because you are not its author.',
    );
  }
}
