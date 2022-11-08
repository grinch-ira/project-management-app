import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Board,
  BoardBody,
  Column,
  ColumnBody,
  SignInBody,
  SignInResponseBody,
  SignUpBody,
  SignUpResponse,
  TaskBody,
  TaskByIdBody,
} from '@core/models';
import { catchError, map, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';

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

  tasksPath = '/tasks';

  constructor(private http: HttpClient, private httpError: HttpErrorHandlerService) {}

  public getUsers(): Observable<SignUpResponse[] | void> {
    return this.http
      .get<SignUpResponse[]>(this.url + this.usersPath, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getUser(userId: string): Observable<SignUpResponse | void> {
    return this.http
      .get<SignUpResponse>(this.url + this.usersPath + '/' + userId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public updateUser(
    userId: string,
    params: SignUpBody
  ): Observable<SignUpResponse | void> {
    return this.http
      .put<SignUpResponse>(this.url + this.usersPath + '/' + userId, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public deleteUser(userId: string): Observable<SignUpResponse | void> {
    return this.http
      .delete<SignUpResponse>(this.url + this.usersPath + '/' + userId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public signUp(params: SignUpBody): Observable<SignUpResponse | void> {
    return this.http.post<SignUpResponse>(this.url + this.signUpPath, params).pipe(
      map(value => value),
      catchError(async err => this.httpError.catchErrors(err))
    );
  }

  public logIn(params: SignInBody): Observable<SignInResponseBody | void> {
    return this.http.post<SignInResponseBody>(this.url + this.logInPath, params).pipe(
      map(value => value),
      catchError(async err => this.httpError.catchErrors(err))
    );
  }

  public getAllBoards(): Observable<Board[] | void> {
    return this.http
      .get<Board[]>(this.url + this.boardsPath, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getBoard(boardId: string): Observable<Board | void> {
    return this.http
      .get<Board>(this.url + this.boardsPath + '/' + boardId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public createBoard(params: BoardBody): Observable<Board | void> {
    return this.http
      .post<Board>(this.url + this.boardsPath, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public updateBoard(boardId: string, params: BoardBody): Observable<Board | void> {
    return this.http
      .put<Board>(this.url + this.boardsPath + '/' + boardId, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public deleteBoard(boardId: string): Observable<Board | void> {
    return this.http
      .delete<Board>(this.url + this.boardsPath + '/' + boardId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getAllColumns(boardId: string): Observable<Column[] | void> {
    return this.http
      .get<Column[]>(this.url + this.boardsPath + '/' + boardId + this.columnsPath, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getColumn(boardId: string, columnId: string): Observable<Column | void> {
    return this.http
      .put<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public createColumn(boardId: string, params: ColumnBody): Observable<Column | void> {
    return this.http
      .post<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    params: ColumnBody
  ): Observable<Column | void> {
    return this.http
      .put<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public deleteColumn(boardId: string, columnId: string): Observable<Column | void> {
    return this.http
      .delete<Column>(
        this.url + this.boardsPath + '/' + boardId + this.columnsPath + '/' + columnId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getAllTasks(boardId: string, columnId: string): Observable<Task[] | void> {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public getTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<Task | void> {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public createTask(
    boardId: string,
    columnId: string,
    params: TaskBody
  ): Observable<Task | void> {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<Task | void> {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    params: TaskByIdBody
  ): Observable<Task | void> {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map(value => value),
        catchError(async err => this.httpError.catchErrors(err))
      );
  }
}
