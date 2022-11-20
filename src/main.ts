import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { SceneModule } from './app/scene/SceneModule';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(SceneModule)
  .catch(err => console.error(err));
