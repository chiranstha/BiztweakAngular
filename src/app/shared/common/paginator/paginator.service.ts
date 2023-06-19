import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, timer} from 'rxjs';
import {IBizTweakPaginator} from './paginator.component';

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    public data: IBizTweakPaginator = {
        skipCount: 0,
        itemSize: 50
    };


    public paginatorsSubject$: BehaviorSubject<IBizTweakPaginator> = new BehaviorSubject(this.data);
    public itemSizeSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.itemSize);
    public countSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.skipCount);

    public readonly items$: Observable<IBizTweakPaginator> = this.paginatorsSubject$.asObservable().pipe(distinctUntilChanged());
    public readonly skipCount$: Observable<number> = this.countSubject$.asObservable();
    public readonly itemSize$: Observable<number> = this.itemSizeSubject$.asObservable();

    constructor() {
    }

    get paginator(): Readonly<IBizTweakPaginator> {
        return this.data;
    }

    get skipCount(): number {
        return this.data.skipCount;
    }

    get itemSize(): number {
        return this.data.itemSize;
    }

    add(paginator: IBizTweakPaginator): Observable<IBizTweakPaginator> {
        return timer(350).pipe(map(() => {
            this.paginatorsSubject$.next(paginator);
            return paginator;
        }));
    }
}
