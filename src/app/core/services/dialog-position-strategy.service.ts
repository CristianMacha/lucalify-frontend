import {inject, Injectable} from "@angular/core";
import {GlobalPositionStrategy, OverlayPositionBuilder} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class DialogPositionStrategy {
  private positionBuilder = inject(OverlayPositionBuilder)

  centerTop(offset: string = '5rem'): GlobalPositionStrategy {
    return this.positionBuilder.global().top(offset).centerHorizontally();
  }

  center(): GlobalPositionStrategy {
    return this.positionBuilder.global().centerVertically();
  }

  rightBottom(bottom='1rem', right = '1rem'): GlobalPositionStrategy {
    return this.positionBuilder.global().bottom(bottom).right(right);
  }

  bottom(bottom = '0'): GlobalPositionStrategy {
    return this.positionBuilder.global().bottom(bottom);
  }
}
