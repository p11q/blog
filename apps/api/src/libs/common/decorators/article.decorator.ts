import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ArticleEntity } from '~/shared/module/article.entity';

export const Article = createParamDecorator(
  (data: keyof ArticleEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const article = request.article;
    return data ? article[data] : article;
  },
);
