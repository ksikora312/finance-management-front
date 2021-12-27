import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NewContinuityOutcome, NewRegularOutcome } from "../dto/outcome-interface";

@Injectable({
    providedIn: 'root'
})
export class OutcomeService {

    private outcomeBaseUrl = `${environment.hostUrl}/outcome`;

    constructor(private httpClient: HttpClient) {
    }

    addRegularOutcome(newOutcome: NewRegularOutcome): Observable<unknown> {
        newOutcome.date = new DatePipe('en-US').transform(newOutcome.date, 'dd.MM.yyyy')!;
        const url = `${this.outcomeBaseUrl}/regular`;
        return this.httpClient.post(url, newOutcome) as Observable<unknown>;
    }
    
    addContinuityOutcome(newOutcome: NewContinuityOutcome): Observable<unknown> {
        const url = `${this.outcomeBaseUrl}/continuity`;
        return this.httpClient.post(url, newOutcome) as Observable<unknown>;
    }
}