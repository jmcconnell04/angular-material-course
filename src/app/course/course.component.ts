import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MatPaginator,
  MatSort,
  MatTable,
  MatTableDataSource
} from '@angular/material';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  timeout
} from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { LESSONS } from '../../../server/db-data';
import { LessonsDataSource } from '../services/lessons.datasource';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;

  dataSource = LessonsDataSource;

  displayColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    this.dataSource = new LessonsDataSource(this.coursesService);
  }

  ngAfterViewInit() {}
}
