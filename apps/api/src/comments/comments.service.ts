import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { EUserRole, UserEntity } from '~/shared/module/user.entity';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { CommentEntity } from '~/shared/module/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articRepo: Repository<ArticleEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity, id_article: number, data: CreateCommentDto) {
    const article = await this.articRepo
      .findOne({
        where: { id: id_article },
        relations: ['author'],
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const comment = new CommentEntity();
    comment.text = data.text;
    comment.author = user;
    comment.article = article;

    const res = await comment.save();

    return new CommentDto(res);
  }

  async updateById(
    id_article: number,
    id_comment: number,
    id_author: number,
    data: UpdateCommentDto,
  ) {
    const isAuthor = await this.isCommentAuthor(
      id_article,
      id_comment,
      id_author,
    );

    const isAdmin = await this.isAdmin(id_author);

    if (!isAuthor && !isAdmin) {
      throw new InternalServerErrorException(
        'Only the author or an admin can update this comment',
      );
    }

    await this.commentRepo.update({ id: id_comment }, { text: data.text });

    return this.commentRepo.findOne({
      where: { id: id_comment },
      relations: ['author', 'article'],
    });
  }

  async deleteById(id_article: number, id_comment: number, id_author: number) {
    const isAuthor = await this.isCommentAuthor(
      id_article,
      id_comment,
      id_author,
    );

    const isAdmin = await this.isAdmin(id_author);

    if (!isAuthor && !isAdmin) {
      throw new InternalServerErrorException(
        'Only the author or an admin can delete this comment',
      );
    }

    const comment = await this.commentRepo.findOne({
      where: { id: id_comment },
    });
    await this.commentRepo.delete(comment.id);
  }

  async isCommentAuthor(
    id_article: number,
    id_comment: number,
    id_author: number,
  ): Promise<boolean> {
    const comment = await this.commentRepo.findOne({
      where: {
        id: id_comment,
        article: { id: id_article },
        author: { id: id_author },
      },
    });
    return !!comment;
  }

  async isAdmin(id_author: number): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: {
        id: id_author,
        role: EUserRole.admin,
      },
    });
    return !!user;
  }
}
