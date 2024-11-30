import { HttpInterceptorFn } from '@angular/common/http';

 export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
 	return next(req);
 };