import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ContinuityOutcomeDetails, NewContinuityOutcome, NewRegularOutcome, OutcomeOverview, OutcomeSummary, OverviewType, Page, UpdateContinuityOutcome, UpdateOutcome } from "../dto/outcome-interface";

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

    getOverview(type: OverviewType, pageNumber: number, pageSize: number, startDate?: string, endDate?: string, categoryId?: number): Observable<Page<OutcomeOverview>> {
        const url = `${this.outcomeBaseUrl}/overview`;
        let params = new HttpParams();
        params = params.append('type', OverviewType[type]);
        params = params.append('pageSize', pageSize);
        params = params.append('pageNumber', pageNumber);
        if(startDate) {
            let normalizedStartDate = new DatePipe('en-US').transform(startDate!, 'dd-MM-yyyy') as string;
            params = params.append('startDate', normalizedStartDate);
        }
        if(endDate) {
            let normalizedEndDate = new DatePipe('en-US').transform(endDate!, 'dd-MM-yyyy') as string;
            params = params.append('endDate', normalizedEndDate);
        }
        if(categoryId && categoryId > 0) {
            params = params.append('category', categoryId!);
        }

        return this.httpClient.get(url, {params: params}) as Observable<Page<OutcomeOverview>>;
    }


    getSummary(type: OverviewType, startDate?: string, endDate?: string, categoryId?: number): Observable<OutcomeSummary> {
        const url = `${this.outcomeBaseUrl}`;
        let params = new HttpParams();
        params = params.append('type', OverviewType[type]);
        if(startDate) {
            let normalizedStartDate = new DatePipe('en-US').transform(startDate!, 'dd-MM-yyyy') as string;
            params = params.append('startDate', normalizedStartDate);
        }
        if(endDate) {
            let normalizedEndDate = new DatePipe('en-US').transform(endDate!, 'dd-MM-yyyy') as string;
            params = params.append('endDate', normalizedEndDate);
        }
        if(categoryId && categoryId > 0) {
            params = params.append('category', categoryId!);
        }
        return this.httpClient.get(url, {params: params}) as Observable<OutcomeSummary>;
    }

    getOutcomesByContinuityOutcome(outcomeId: number, pageNumber: number, pageSize: number): Observable<Page<OutcomeOverview>> {
        const url = `${this.outcomeBaseUrl}/continuity/outcomes/${outcomeId}`;
        let params = new HttpParams();
        params = params.append('pageSize', pageSize);
        params = params.append('pageNumber', pageNumber);
        return this.httpClient.get(url, {params: params}) as Observable<Page<OutcomeOverview>>;
    }

    getContinuityOutcomeDetails(outcomeId: number): Observable<ContinuityOutcomeDetails> {
        const url = `${this.outcomeBaseUrl}/continuity/${outcomeId}`;
        return this.httpClient.get(url) as Observable<ContinuityOutcomeDetails>;
    }

    updateOutcome(update: UpdateOutcome): Observable<any> {
        update.date = new DatePipe('en-US').transform(update.date, 'dd.MM.yyyy')!;
        const url = `${this.outcomeBaseUrl}`;
        return this.httpClient.put(url, update);
    }

    updateContinuityOUtcome(update: UpdateContinuityOutcome): Observable<any> {
        const url = `${this.outcomeBaseUrl}/continuity`;
        return this.httpClient.put(url, update);
    }
}