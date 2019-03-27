import { DataSource } from '@angular/cdk/table';
import { Lesson } from '../model/lesson';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { CoursesService } from './courses.service';

export class LessonsDataSource implements DataSource<Lesson> {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private coursesService: CoursesService) {}

  loadLessons(
    courseId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.coursesService
      .findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
      .subscribe(lessons => this.lessonsSubject.next(lessons));
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {}
}
