import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginatorService} from './paginator.service';

export interface IBizTweakPaginator {
    skipCount: number;
    itemSize: number;
}

export class BizTweakPaginator implements IBizTweakPaginator {
    skipCount: number;
    itemSize: number;

    constructor(model?: any) {
        if (!model) {
            model = {};
        }
        this.skipCount = 0;
        this.itemSize = 50;
    }
}

@Component({
    selector: 'biztweak-paginator',
    template: `<div class="display-flex paginator-fold">
        <div class="mr-auto pt-4">
            <p class="fs-16px">
                <span class="fw-bold pr-5px">{{ startItem }} - {{ endItem }} of {{ itemSize }} </span>
                <span class="fw-bold pr-5px color-blue">(Total: {{ totalCount }} {{ totalCount > 1 ? "items" : "item" }})</span>
            </p>
        </div>
        <div class="pagination:container fold-end overflow-x-auto">
            <div class="pagination:number arrow" (click)="previousPage()" *ngIf="selectedIndex !== 1">
                <svg width="18" height="18">
                    <use xlink:href="#left" />
                </svg>
                <span class="arrow:text">Previous</span>
            </div>
            <button
                class="pagination:number "
                [disabled]="selectedIndex === item"
                (click)="setPageEvent(item)"
                *ngFor="let item of perPage"
                [ngClass]="{ 'pagination:active': selectedIndex === item }"
            >
                {{ item }}
            </button>

            <div class="pagination:number arrow" *ngIf="endItem < totalCount" (click)="nextPage()">
                <span class="arrow:text">Next</span>
                <svg width="18" height="18">
                    <use xlink:href="#right" />
                </svg>
            </div>
        </div>
        <div class="paginator-ngselect">
            <ng-select [items]="dropdownValue" (change)="changePage($event)" [(ngModel)]="itemSize" class="custom-paginator-ngselect"> </ng-select>
        </div>
    </div> `
})
export class PaginatorComponent implements OnInit {
    @Output() paginatorEvent = new EventEmitter<{ skipCount: number; itemSize: number }>();
    itemSize: number;
    currentCount = 0;
    startItem = 1;
    endItem = 51;
    dropdownValue: number[] = [];
    perPage: number[] = [];
    public selectedIndex: number;
    private _totalCount: number;

    constructor(private service: PaginatorService) {
    }


    @Input()
    get totalCount(): any {
        return this._totalCount;
    }

    set totalCount(value: number) {
        this._totalCount = value;
        this.getValue(this._totalCount);
        this.selectedIndex = this.perPage[0];
    }

    ngOnInit(): void {
    }

    getValue(totalCount: number) {
        if (totalCount < 50) {
            this.dropdownValue = [50];
        } else if (totalCount <= 100 && totalCount >= 50) {
            this.dropdownValue = [50, 100];
        } else if (totalCount <= 500 && totalCount >= 100) {
            this.dropdownValue = [50, 100, 150, 200];
        } else if (totalCount <= 1000 && totalCount >= 500) {
            this.dropdownValue = [50, 100, 250, 500, 750];
        } else if (totalCount <= 1500 && totalCount >= 1000) {
            this.dropdownValue = [50, 100, 250, 500, 750, 1000, 1250, 1500];
        } else if (totalCount <= 3000 && totalCount >= 1500) {
            this.dropdownValue = [50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];
        } else if (totalCount <= 5000 && totalCount >= 3000) {
            this.dropdownValue = [50, 100, 250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
        } else if (totalCount <= 10000 && totalCount >= 5000) {
            this.dropdownValue = [50, 100, 500, 1000, 2500, 5000, 7500, 10000];
        } else {
            this.dropdownValue = [50, 100, 500, 1000, 2000, 5000, 10000];
        }
        this.itemSize = this.dropdownValue[0];
        this.calculatePage(totalCount, this.itemSize);
    }

    calculatePage(count: number, size: number) {
        const div = count / size;
        if (div < 8) {
            this.perPage = this.generateMinPage(div);
        } else if (div >= 8 && div < 16) {
            let firstSeries: number[] = [];
            let secondSeries: number[] = [];
            firstSeries = this.generateMinPage(div).slice(0, 5);
            secondSeries = this.generateMaxPage(this.generateMinPage(div).slice(5));
            this.perPage = firstSeries.concat(secondSeries);
        } else {
            let firstSeries: number[] = [];
            let secondSeries: number[] = [];
            firstSeries = this.generateMinPage(div).slice(0, 5);
            secondSeries = this.multiplesOf(this.generateMinPage(div).slice(5), 5);
            this.perPage = firstSeries.concat(secondSeries);
        }
    }

    generateMinPage(n: number): number[] {
        let perPage: number[] = [];
        for (let i = 0; i < n; i++) {
            perPage.push(i + 1);
        }
        return perPage;
    }

    generateMaxPage(arr: number[]): number[] {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] % 2 === 1) {
                    arr.splice(j, 1);
                    break;
                }
            }
        }
        return arr;
    }

    multiplesOf(numList: number[], num: number) {
        return numList.filter(function (n) {
            return n % num === 0;
        });
    }

    changePage(e) {
        this.perPage = [];
        this.calculatePage(this._totalCount, e);
        this.provideSkipCount(this.selectedIndex);
    }

    setPageEvent(e) {
        this.provideSkipCount(e);
        this.selectedIndex = e;
    }

    provideSkipCount(s: number) {
        let size: number = this.itemSize;
        this.currentCount = (s - 1) * size;
        let value = {
            skipCount: this.currentCount,
            itemSize: this.itemSize
        };
        this.startItem = this.currentCount + 1;
        this.endItem = this.itemSize + this.currentCount;
        this.service.add(value);
        this.paginatorEvent.emit(value);
    }

    previousPage() {
        let currentPage = this.selectedIndex - 1;
        this.setPageEvent(currentPage);
    }

    nextPage() {
        let currentPage = this.selectedIndex + 1;
        this.setPageEvent(currentPage);
    }
}
