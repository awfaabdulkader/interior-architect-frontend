import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './Admin/Auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const interceptor = new AuthInterceptor();
          // Adapt next (HttpHandlerFn) to HttpHandler for the interceptor
          const handler = { handle: next } as any;
          return interceptor.intercept(req, handler);
        }
      ])
    )
  ]
};
