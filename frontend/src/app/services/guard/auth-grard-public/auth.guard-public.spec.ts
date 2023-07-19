import { TestBed } from '@angular/core/testing';

import { AuthGuardPublic } from './auth.guard-public';

describe('AuthGuardPublic', () => {
    let guard: AuthGuardPublic;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(AuthGuardPublic);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
