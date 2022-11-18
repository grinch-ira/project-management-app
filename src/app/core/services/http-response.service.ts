import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Board,
  BoardBody,
  Column,
  ColumnBody,
  ColumnOrderPatchBody,
  SignInBody,
  SignInResponseBody,
  SignUpBody,
  SignUpResponse,
  Task,
  TaskBody,
  TaskByIdBody,
  TaskUpdateBody,
} from '@core/models';
import { Errors } from '@core/models/http.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpResponseService {
  url = 'https://blablateam-pma.herokuapp.com';

  usersPath = '/users';

  signUpPath = '/auth/signup';

  logInPath = '/auth/signin';

  boardsPath = '/boards';

  columnsPath = '/columns';

  columnsSetPath = '/columnsSet';

  tasksPath = '/tasks';

  tasksSetPath = '/tasksSet';

  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': '*',
  };

  constructor(private http: HttpClient) {}

  private catchErrorDetailed(err: HttpErrorResponse): Observable<Errors> {
    if (err.status === 0) {
      return of({ noConnection: true });
    }
    if (err.status === 400) {
      return of({ badRequest: true });
    }
    if (err.status === 401) {
      return of({ unAuthorized: true });
    }
    if (err.status === 403) {
      return of({ notExist: true });
    }
    if (err.status === 404) {
      return of({ notFound: true });
    }
    if (err.status === 409) {
      return of({ isAlreadyExist: true });
    }
    if (err.status === 500 || err.status === 503) {
      return of({ serverError: true });
    }
    return of({ anotherError: true });
  }

  public getUsers(): Observable<SignUpResponse[] | Errors> {
    return this.http
      .get<SignUpResponse[]>(this.url + this.usersPath, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getUser(userId: string): Observable<SignUpResponse | Errors> {
    return this.http
      .get<SignUpResponse>(this.url + this.usersPath + '/' + userId, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public updateUser(
    userId: string,
    params: SignUpBody
  ): Observable<SignUpResponse | Errors> {
    return this.http
      .put<SignUpResponse>(this.url + this.usersPath + '/' + userId, params, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public deleteUser(userId: string): Observable<SignUpResponse | Errors> {
    return this.http
      .delete<SignUpResponse>(this.url + this.usersPath + '/' + userId, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public signUp(params: SignUpBody): Observable<SignUpResponse | Errors> {
    return this.http.post<SignUpResponse>(this.url + this.signUpPath, params).pipe(
      map(value => value),
      catchError(err => this.catchErrorDetailed(err))
    );
  }

  public logIn(params: SignInBody): Observable<SignInResponseBody | Errors> {
    return this.http.post<SignInResponseBody>(this.url + this.logInPath, params).pipe(
      map(value => value),
      catchError(err => this.catchErrorDetailed(err))
    );
  }

  public getAllBoards(): Observable<Board[] | Errors> {
    return this.http
      .get<Board[]>(this.url + this.boardsPath, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getBoard(boardId: string): Observable<Board | Errors> {
    return this.http
      .get<Board>(this.url + this.boardsPath + '/' + boardId, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public createBoard(params: BoardBody): Observable<Board | Errors> {
    return this.http
      .post<Board>(this.url + this.boardsPath, params, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public updateBoard(boardId: string, params: BoardBody): Observable<Board | Errors> {
    return this.http
      .put<Board>(this.url + this.boardsPath + '/' + boardId, params, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public deleteBoard(boardId: string): Observable<Board | Errors> {
    return this.http
      .delete<Board>(this.url + this.boardsPath + '/' + boardId, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getAllColumns(boardId: string): Observable<Column[] | Errors> {
    return this.http
      .get<Column[]>(this.url + this.boardsPath + '/' + boardId + this.columnsPath, {
        headers: this.headers,
      })
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getColumn(boardId: string, columnId: string): Observable<Column | Errors> {
    return this.http
      .put<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        { headers: this.headers }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public createColumn(boardId: string, params: ColumnBody): Observable<Column | Errors> {
    return this.http
      .post<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath,
        params,
        { headers: this.headers }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    params: ColumnBody
  ): Observable<Column | Errors> {
    return this.http
      .put<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        params,
        { headers: this.headers }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public deleteColumn(boardId: string, columnId: string): Observable<Column | Errors> {
    return this.http
      .delete<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        { headers: this.headers }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getAllTasks(boardId: string, columnId: string): Observable<Task[] | Errors> {
    return this.http
      .get<Task[]>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId +
          this.tasksPath,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public getTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<Task | Errors> {
    return this.http
      .get<Task>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId +
          this.tasksPath +
          '/' +
          taskId,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public createTask(
    boardId: string,
    columnId: string,
    params: TaskBody
  ): Observable<Task | Errors> {
    return this.http
      .post<Task>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId +
          this.tasksPath,
        params,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<Task | Errors> {
    return this.http
      .delete<Task>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId +
          this.tasksPath +
          '/' +
          taskId,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    params: TaskByIdBody
  ): Observable<Task | Errors> {
    return this.http
      .put<Task>(
        this.url +
          this.boardsPath +
          '/' +
          boardId +
          this.columnsPath +
          '/' +
          columnId +
          this.tasksPath +
          '/' +
          taskId,
        params,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map(value => value),
        catchError(err => this.catchErrorDetailed(err))
      );
  }

  updateSetOfColumns(arr: ColumnOrderPatchBody[]): Observable<Column[] | Errors> {
    return this.http
      .patch<Column[]>(this.url + this.columnsSetPath, arr, {
        headers: this.headers,
      })
      .pipe(catchError(err => this.catchErrorDetailed(err)));
  }

  updateSetOfTasks(arr: TaskUpdateBody[]): Observable<Task[] | Errors> {
    return this.http
      .patch<Task[]>(this.url + this.tasksSetPath, arr, {
        headers: this.headers,
      })
      .pipe(catchError(err => this.catchErrorDetailed(err)));
  }
}
