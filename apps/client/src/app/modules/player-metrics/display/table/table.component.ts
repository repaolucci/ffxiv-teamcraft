import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractMetricDisplayComponent } from '../abstract-metric-display-component';
import { ProbeSource } from '../../model/probe-source';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends AbstractMetricDisplayComponent implements OnInit {
  ProbeSource = ProbeSource;

  public columns = [
    {
      title: 'Value',
      compare: (a, b) => a.data[1] - b.data[1],
      priority: 2
    },
    {
      title: 'Source',
      compare: (a, b) => a.source - b.source,
      priority: 3
    },
    {
      title: 'Timestamp',
      compare: (a, b) => a.timestamp - b.timestamp,
      priority: 1
    }
  ];

  public sortState: Record<string, string | null> = {};

  constructor(public translate: TranslateService) {
    super();
  }

  saveSort(column: string, sort: string | null): void {
    this.sortState[column] = sort;
    localStorage.setItem(`metrics:table:sort:${this.title}`, JSON.stringify(this.sortState));
  }

  ngOnInit(): void {
    this.sortState = JSON.parse(localStorage.getItem(`metrics:table:sort:${this.title}`) || '{}');
  }
}
