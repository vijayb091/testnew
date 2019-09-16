import { TestBed, inject } from '@angular/core/testing';

import { JqueryService } from './jquery.service';

describe('JqueryService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [JqueryService]
		});
	});

	it('should be created', inject([JqueryService], (service: JqueryService) => {
		expect(service).toBeTruthy();
	}));
});
