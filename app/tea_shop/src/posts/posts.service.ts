import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Op } from 'sequelize';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService) {}

    async getAllPosts(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    async getOnePost(id: number): Promise<Post> {
        const post = await this.postRepository.findByPk(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName});
        return post;
    }

    async update(id: number, updatePostDto: UpdatePostDto, image: any): Promise<Post> {
        const post = await this.postRepository.findByPk(id);

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        let updatedImageName = post.image;
        if (image) {
            updatedImageName = await this.fileService.createFile(image);
        }

        await post.update({...updatePostDto, image: updatedImageName});

        return post;
    }

    async searchPosts(keyword: string): Promise<Post[]> {
        const posts = await this.postRepository.findAll({
            where: {
                title: { [Op.like]: `%${keyword}%` },
            },
        });
        return posts;
    }
}
