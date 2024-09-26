import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '@services/category.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  loadCreateCategory,
  loadCreateCategoryFailure,
  loadCreateCategorySuccess,
  loadFilteredCategories,
  loadFilteredCategoriesFailure,
  loadFilteredCategoriesSuccess,
  loadUpdateCategory,
  loadUpdateCategoryFailure,
  loadUpdateCategorySuccess,
} from './category.actions';

@Injectable()
export class CategoryEffects {
  loadFilteredCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredCategories),
      exhaustMap(({ filterCategory }) =>
        this.categoryService.getAll(filterCategory).pipe(
          map((response) => loadFilteredCategoriesSuccess({ reponseList: response })),
          catchError((error) => of(loadFilteredCategoriesFailure({ error })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreateCategory),
      exhaustMap(({ createCategory }) =>
        this.categoryService.create(createCategory).pipe(
          map((category) => loadCreateCategorySuccess({ category })),
          catchError((error) => of(loadCreateCategoryFailure({ error })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUpdateCategory),
      exhaustMap(({ id, updateCategory }) =>
        this.categoryService.update(id, updateCategory).pipe(
          map((category) => loadUpdateCategorySuccess({ category })),
          catchError((error) => of(loadUpdateCategoryFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
