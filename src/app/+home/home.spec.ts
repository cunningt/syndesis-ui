import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';

import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';

import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Home } from './home.component';

describe('Home', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            BaseRequestOptions,
            MockBackend,
            {
                provide: Http,
                useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                    return new Http(backend, defaultOptions);
                },
                deps: [ MockBackend, BaseRequestOptions ]
            },
            AppState,
            Home
        ]
    }));

    it('should have default data', inject([ Home ], (home) => {
        expect(home.localState).toEqual({value: ''});
    }));

    it('should have a title', inject([ Home ], (home) => {
        expect(!!home.title).toEqual(true);
    }));

    it('should log ngOnInit', inject([ Home ], (home) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        home.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});
