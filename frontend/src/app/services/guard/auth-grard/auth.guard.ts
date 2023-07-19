import { StorageService } from './../../storage/storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}

    async canActivate(): Promise<boolean> {
        return (
            ((await this.storageService.find('token')) && true) ||
            this.router.navigate(['login'])
        );
    }
}
