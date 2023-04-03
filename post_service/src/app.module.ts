import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [AuthorModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
