import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categories } from "../dto/outcome-interface";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private cateogoryUrl = `${environment.hostUrl}/outcome/category`;

    constructor(private httpClient: HttpClient) {
    }

    getCategories(): Observable<Categories> {
        return this.httpClient.get(this.cateogoryUrl) as Observable<Categories>;
    }

    addCategory(name: string): Observable<any> {
        const url = `${this.cateogoryUrl}/${name}`;
        return this.httpClient.post(url, null);
    }

}