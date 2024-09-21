import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BackofficeService {
  private _isMobile = new BehaviorSubject<boolean>(false);
  private _isCollapse = new BehaviorSubject<boolean>(false);
  private _isMobileOpen = new BehaviorSubject<boolean>(false);

  public openMobile() {
    this._isMobileOpen.next(true);
  }

  public closeMobile() {
    this._isMobileOpen.next(false);
  }

  public isMobileOpen(): Observable<boolean> {
    return this._isMobileOpen.asObservable();
  }

  public mininized() {
    this._isCollapse.next(true);
  }

  public maximized() {
    this._isCollapse.next(false);
  }

  public isCollapse(): Observable<boolean> {
    return this._isCollapse.asObservable();
  }

  public isMobileSize() {
    this._isMobile.next(true);
  }

  public isNoMobileSize() {
    this._isMobile.next(false);
  }

  public isMobile(): Observable<boolean> {
    return this._isMobile.asObservable();
  }
}
