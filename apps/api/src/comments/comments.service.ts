import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { EUserRole, UserEntity } from '~/shared/module/user.entity';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { CommentEntity } from '~/shared/module/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export interface CommentListItem {
  author: null | { id: number; name: string };
  createAt: Date;
  id: number;
  text: string;
  updateAt: Date;
}

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

  async create(
    user: UserEntity,
    id_article: number,
    data: CreateCommentDto,
  ): Promise<CommentDto> {
    const article = await this.articRepo
      .findOne({
        where: { id: id_article },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!article) {
      throw new NotFoundException();
    }

    const comment = new CommentEntity();
    comment.text = data.text;
    comment.author = user.id;
    comment.article = article.id;

    const res = await comment.save();

    return new CommentDto(res);
  }

  async deleteById(
    id_article: number,
    id_comment: number,
    id_author: number,
  ): Promise<void> {
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

    if (!comment) {
      throw new NotFoundException();
    }

    await this.commentRepo.delete(comment.id);
  }

  async getList(id_article: number): Promise<CommentListItem[]> {
    const comments = await this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.article_id = :id_article', { id_article })
      .orderBy('comment.create_at', 'DESC')
      .getMany();

    return comments.map((comment) => {
      const author = comment.author as unknown as null | UserEntity;

      return {
        author: author ? { id: author.id, name: author.name } : null,
        createAt: comment.createAt,
        id: comment.id,
        text: comment.text,
        updateAt: comment.updateAt,
      };
    });
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

  async isCommentAuthor(
    id_article: number,
    id_comment: number,
    id_author: number,
  ): Promise<boolean> {
    const comment = await this.commentRepo.findOne({
      where: {
        article: id_article,
        author: id_author,
        id: id_comment,
      },
    });

    return !!comment;
  }

  async updateById(
    id_article: number,
    id_comment: number,
    id_author: number,
    data: UpdateCommentDto,
  ): Promise<CommentEntity | null> {
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
    });
  }
}
