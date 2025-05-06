import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { IdeaModule } from './modules/idea/idea.module';
import { KanbanModule } from './modules/kanban/kanban.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IdeaModule,
    AuthModule,
    PrismaModule,
    KanbanModule,
    TodoModule,
  ],
})
export class AppModule {}
