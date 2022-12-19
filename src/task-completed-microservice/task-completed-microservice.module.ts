import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CompletionListenerModule } from './completion-listener/completion-listener.module';

@Module({
  imports: [AppModule, CompletionListenerModule],
  providers: [],
  controllers: [],
})
export class TaskCompletedMicroserviceModule {}
