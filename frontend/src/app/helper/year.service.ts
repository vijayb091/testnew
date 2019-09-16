import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

@Injectable()
export class YearService {
	public file: any;
	public yearArray = [];

	public currentYear = 1950;
	public nextYear = 1994;
	public personalData;
	public businessData;

	constructor(
	) {}

	public yearIndex: Subject<any> = new Subject<any>();
	indexes = this.yearIndex.asObservable();

	public settingClick: Subject<any> = new Subject<any>();
	setting = this.settingClick.asObservable();

	public yearClick: Subject<any> = new Subject<any>();
	tempYearClick = this.yearClick.asObservable();

	public selectCompany: Subject<any> = new Subject<any>();
	companyClick = this.selectCompany.asObservable();

	public changeCompanySwiper() {
		const data = [];
		for (let i = 0; i <= 6; i++ ) {
			data.push(Math.floor(Math.random() * 100));
		}
		this.selectCompany.next(data);
	}

	public clickOnSettingIcon(value) {
		this.settingClick.next(value);
	}

	public clickOnYear(value) {
		this.yearClick.next(value);
	}

	public firstYear(y1) {
		this.currentYear = 1950 + y1;
		this.changeIndex();
	}

	public secondYear(y2) {
		this.nextYear = 1950 + y2;
		this.changeIndex();
	}

	public changeIndex() {
		this.changeCompanySwiper();
		if (this.currentYear < this.nextYear) {
			this.yearArray = [];
			for (let i = this.currentYear; i <= this.nextYear; i++) {
				if (this.yearArray.length <= 4) {
					this.yearArray.push({
						year: i
					});
				}
			}
			this.yearIndex.next(this.yearArray);
		} else {
			this.yearArray = [];
			// TODO: add notification for next year is lowest
		}

		if (this.currentYear === this.nextYear) {
			this.yearArray = [];
			this.yearArray.push({
				year: this.currentYear + 1950
			});
			this.yearIndex.next(this.yearArray);
		}
	}

	public createFileName(file, isPersonal) {
		if (file.nativeElement.files[0]) {
			const temp = file.nativeElement.files[0].type.substring(6);
			const rendomNumber = Math.floor(Math.random() * 1000000000);

			isPersonal ?
			this.personalData.fileName = `${rendomNumber}-${Date.now()}.${temp}` :
			this.businessData.fileName = `${rendomNumber}-${Date.now()}.${temp}`;
		}
	}


}
