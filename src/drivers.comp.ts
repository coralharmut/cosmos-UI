import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const remoteAppAngular = () => {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err))
}

export { remoteAppAngular }
