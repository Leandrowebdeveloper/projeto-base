import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardPublic {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}

    async canActivate(): Promise<boolean> {
        return (
            (!(await this.storageService.find('token')) && true) ||
            this.router.navigate(['painel-de-controle'])
        );
    }
}
