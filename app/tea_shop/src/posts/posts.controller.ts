import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Get('search-posts')
    searchProducts(@Query('keyword') keyword: string) {
          return this.postService.searchPosts(keyword);
    }

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }
    @Get(':id')
    async getOnePost(@Param('id') id: number) {
        return this.postService.getOnePost(id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto, @UploadedFile() image) {
        return this.postService.update(id, dto, image);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image);
    }

}
