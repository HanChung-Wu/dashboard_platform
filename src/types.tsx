// src/types.tsx
export interface TocItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: TocItem[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface PageConfig {
  tocItems: TocItem[];
  breadcrumb: BreadcrumbItem[];
  rightPanel?: React.ReactNode;
  content: React.ReactNode;
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;
export class Ok<T, _> {
  readonly type: "ok" = "ok";
  constructor(public value: T) {}
}

export class Err<_, E> {
  readonly type: "err" = "err";
  constructor(public error: E) {}
}
