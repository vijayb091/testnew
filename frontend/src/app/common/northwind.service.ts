import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;

    private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';

    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
    }

    public query(state: any): void {
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }

    protected fetch(tableName: string, state: any): Observable<GridDataResult> {
        const queryStr = `${toODataString(state)}&$count=true`;
        this.loading = true;

        return this.http
        .get(`${this.BASE_URL}${tableName}?${queryStr}`)
            .pipe(
                map(response => (<GridDataResult>{
                    data: [{
                        "contactType": "test type",
                        "customer": "john doe",
                        "name": "john",
                        "lastname": "doe",
                        "personType": "natural Person",
                        "gender": "male",
                        "age": "22",
                        "dateOfBirth": "12-2-1995",
                        "cityOfBirth": "Mux",
                        "provinceOfBirth": "punjab",
                        "residentialAddress": "house #122, mux pakistan",
                        "residentialCity": "mux",
                        "residentialProvince": "punjab",
                        "residentialZipCode": "60000",
                        "domicileAddress": "house#123 mux, pakistan",
                        "domicileCity": "mux",
                        "domicileProvince": "punjab",
                        "domicileZipCode": "60000",
                        "complienceToMarketing": "yes",
                        "customerType": "regular",
                        "bankid": [{
                            "fidelizationPlanName": "bank information",
                            "dateOfJoin": "2-12-2012",
                            "complianceToPlan": "strict",
                            "ConsensoPerPiano": "se vieni contattatoo perche aderisci al piano"
                        }],
                        "family": [{
                            "name": "john",
                            "lastname": "doe",
                            "dateOfBirth": "12-2-1998",
                            "parentalRelationship": "any relation",
                            "contactType": "live",
                            "decisionalPowerLevel": "actual limit"
                        }],
                        "contact": [{
                            "mobile": "033312312",
                            "email": "john@doe.com",
                            "socialNetwork": [{
                                "messanger": {
                                    "id": "1",
                                    "preferredContactTime": "mmorning"
                                },
                                "twitter": {
                                    "id": "2",
                                    "preferredContactTime": "evening"
                                },
                                "facebook": {
                                    "id": "12",
                                    "preferredContactTime": "mmorning"
                                },
                                "linkedIn": {
                                    "id": "12",
                                    "preferredContactTime": "mmorning"
                                },
                                "whatsapp": {
                                    "id": "12",
                                    "preferredContactTime": "mmorning"
                                }
                            }]
                        }],
                        "riskprofile": [{
                            "id": "1",
                            "type": "test",
                            "issueDate": "12-12-2017",
                            "expiryDate": "12-2-2018",
                            "idCode": "12",
                            "releaseInstitute": "abc test"
                        }]
                    }],
                    total: parseInt("5", 10)
                })),
                tap(() => this.loading = false)
            );
    }
}

@Injectable()
export class ProductsService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'Products'); }

    public queryForCategory({ CategoryID }: { CategoryID: number }, state?: any): void {
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'CategoryID', operator: 'eq', value: CategoryID
                }],
                logic: 'and'
            }
        }));
    }

    public queryForProductName(ProductName: string, state?: any): void {
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'ProductName', operator: 'contains', value: ProductName
                }],
                logic: 'and'
            }
        }));
    }

}

@Injectable()
export class CategoriesService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'Categories'); }

    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.fetch(this.tableName, state);
    }
}
